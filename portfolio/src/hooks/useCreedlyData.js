import { useState, useEffect } from 'react';
import { certifications as staticCerts } from '../data/portfolio';

const CACHE_KEY = 'hvd-credly-badges';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

function parseBadges(data) {
  return (data?.data ?? [])
    .filter(b => b.public && b.state === 'accepted')
    .map(b => ({
      issuer: b.badge_template.issuer.entities[0]?.entity?.name ?? '',
      name:   b.badge_template.name,
      date:   b.issued_at_date,
      url:    `https://www.credly.com/badges/${b.id}`,
      image:  b.badge_template.image_url,
    }));
}

export function useCreedlyData(username) {
  const [badges,  setBadges]  = useState(staticCerts);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!username) { setLoading(false); return; }
    let cancelled = false;

    // try cache first
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const { data, ts } = JSON.parse(raw);
        if (Date.now() - ts < CACHE_TTL) {
          setBadges(data); setLoading(false); return;
        }
      }
    } catch (_) {}

    // /credly-api is proxied to credly.com in dev (vite.config.js).
    // In production (no proxy) this fetch will fail — we fall back to staticCerts.
    fetch(`/credly-api/users/${username}/badges.json`)
      .then(r => { if (!r.ok) throw new Error(`Credly ${r.status}`); return r.json(); })
      .then(json => {
        if (cancelled) return;
        const parsed = parseBadges(json);
        if (parsed.length === 0) throw new Error('no badges');
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: parsed, ts: Date.now() })); } catch (_) {}
        setBadges(parsed); setLoading(false);
      })
      .catch(e => {
        if (cancelled) return;
        // silently fall back to static data — Credly CORS blocks this in production
        setError(e.message); setLoading(false);
      });

    return () => { cancelled = true; };
  }, [username]);

  return { badges, loading, error };
}
