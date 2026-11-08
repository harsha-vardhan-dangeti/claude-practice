import { useState, useEffect } from 'react';
import { fetchGithubStats } from '../lib/githubStats';

const CACHE_KEY = 'hvd-github-stats';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes — matches the edge cache

// Direct browser fetch — fallback when the serverless proxy (/api/github) is
// unavailable or failing (e.g. plain `vite dev`, or GitHub timing out from
// Vercel). Subject to the 60 req/hour per-visitor unauthenticated limit.
async function fetchDirect(username) {
  const stats = await fetchGithubStats(username, { Accept: 'application/vnd.github+json' });
  return { ...stats, totalContributions: null };
}

// Prefer the serverless proxy (token-authed + edge-cached + accurate yearly
// contributions). Fall back to a direct browser fetch if it isn't there.
async function fetchStats(username) {
  try {
    const res = await fetch(`/api/github?user=${encodeURIComponent(username)}`);
    if (res.ok) return await res.json();
  } catch {
    /* fall through to direct fetch */
  }
  return fetchDirect(username);
}

// Read fresh stats from the session cache, or null if absent/stale/broken.
// Lets the hook hydrate synchronously on mount and skip refetching on every
// in-app navigation.
function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL) return data;
    }
  } catch { /* ignore cache errors */ }
  return null;
}

export function useGithubData(username) {
  const [data,    setData]    = useState(readCache);
  const [loading, setLoading] = useState(() => readCache() === null);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!username) return;
    // Already hydrated from a fresh session cache — no network needed.
    if (readCache() !== null) return;

    let cancelled = false;
    fetchStats(username)
      .then(stats => {
        if (cancelled) return;
        if (stats?.error) throw new Error(stats.error);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: stats, ts: Date.now() }));
        } catch { /* ignore quota errors */ }
        setData(stats);
        setLoading(false);
      })
      .catch(e => {
        if (!cancelled) { setError(e.message); setLoading(false); }
      });

    return () => { cancelled = true; };
  }, [username]);

  return { data, loading, error };
}
