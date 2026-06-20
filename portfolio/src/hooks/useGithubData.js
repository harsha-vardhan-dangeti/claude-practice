import { useState, useEffect } from 'react';

const CACHE_KEY = 'hvd-github-stats';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const LANG_COLORS = {
  Ruby:       '#CC342D',
  Python:     '#3572A5',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  PHP:        '#4F5D95',
  HTML:       '#E34C26',
  CSS:        '#563D7C',
  Shell:      '#89E051',
  Go:         '#00ADD8',
  Rust:       '#DEA584',
  Java:       '#B07219',
  C:          '#555555',
  'C++':      '#F34B7D',
  Dockerfile: '#384D54',
};

function computeTopLangs(repos) {
  const counts = {};
  repos.forEach(r => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const total = Object.values(counts).reduce((s, n) => s + n, 0) || 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([lang, count]) => ({
      lang,
      count,
      pct: Math.round((count / total) * 100),
      color: LANG_COLORS[lang] || '#8892a8',
    }));
}

// Direct browser fetch — used as a dev/offline fallback when the serverless
// proxy (/api/github) is unavailable (e.g. plain `vite dev`). Subject to the
// 60 req/hour unauthenticated limit, which is why production prefers /api.
async function fetchDirect(username) {
  const h = { Accept: 'application/vnd.github.v3+json' };

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers: h }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`, { headers: h }),
    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers: h }),
  ]);

  if (!userRes.ok) throw new Error(`GitHub API ${userRes.status}`);

  const [user, repos, events] = await Promise.all([
    userRes.json(),
    reposRes.ok  ? reposRes.json()  : [],
    eventsRes.ok ? eventsRes.json() : [],
  ]);

  const repoList  = Array.isArray(repos)  ? repos  : [];
  const eventList = Array.isArray(events) ? events : [];

  const totalStars = repoList.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const totalForks = repoList.reduce((s, r) => s + (r.forks_count || 0), 0);

  const recentCommits = eventList
    .filter(e => e.type === 'PushEvent')
    .reduce((s, e) => s + (e.payload?.commits?.length || 0), 0);

  return {
    publicRepos:        user.public_repos,
    followers:          user.followers,
    totalStars,
    totalForks,
    recentCommits,
    totalContributions: null,
    topLangs:           computeTopLangs(repoList),
  };
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
