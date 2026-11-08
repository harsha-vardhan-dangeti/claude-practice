import { useState, useEffect, useMemo } from 'react';
import { certifications as manualCerts } from '../data/portfolio';
import linkedinCerts from '../data/linkedin-certifications.json';
import { mergeCredentials, parseCredlyBadges } from '../lib/credentials';

const CACHE_KEY = 'hvd-credly-badges-v2';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour, matching the edge cache on /api/credly

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const { data, ts } = JSON.parse(raw);
      if (Array.isArray(data) && Date.now() - ts < CACHE_TTL) return data;
    }
  } catch { /* ignore cache errors */ }
  return null;
}

// Production: our serverless function. Dev: Vite proxies /credly-api to Credly.
const credlyUrl = username =>
  import.meta.env.DEV ? `/credly-api/users/${username}/badges.json` : '/api/credly';

/**
 * Every certification to show: live Credly badges, then hand-added entries
 * from portfolio.js, then imported LinkedIn courses, without duplicates.
 * Renders the static lists immediately; Credly fills in when it arrives.
 */
export function useCertifications(username) {
  const [credly, setCredly] = useState(() => (username && readCache()) || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || readCache() !== null) return;
    let cancelled = false;

    fetch(credlyUrl(username))
      .then(r => { if (!r.ok) throw new Error(`Credly ${r.status}`); return r.json(); })
      .then(json => {
        if (cancelled) return;
        const badges = Array.isArray(json?.badges) ? json.badges : parseCredlyBadges(json);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: badges, ts: Date.now() })); } catch { /* ignore quota errors */ }
        setCredly(badges);
      })
      .catch(e => { if (!cancelled) setError(e.message); });

    return () => { cancelled = true; };
  }, [username]);

  const certifications = useMemo(
    () => mergeCredentials(credly, manualCerts, linkedinCerts),
    [credly],
  );

  return { certifications, error };
}
