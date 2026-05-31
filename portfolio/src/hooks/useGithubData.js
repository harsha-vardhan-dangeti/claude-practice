import { useState, useEffect } from 'react';

const CACHE_KEY = 'hvd-github-stats';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function fetchAll(username) {
  const h = { Accept: 'application/vnd.github.v3+json' };

  const [userRes, reposRes, prsRes, commitsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers: h }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, { headers: h }),
    fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`, { headers: h }),
    fetch(`https://api.github.com/search/commits?q=author:${username}&per_page=1`, { headers: h }),
  ]);

  if (!userRes.ok) throw new Error(`GitHub API ${userRes.status}`);

  const [user, repos, prs, commits] = await Promise.all([
    userRes.json(),
    reposRes.ok  ? reposRes.json()  : [],
    prsRes.ok    ? prsRes.json()    : { total_count: 0 },
    commitsRes.ok ? commitsRes.json() : { total_count: 0 },
  ]);

  const totalStars = Array.isArray(repos)
    ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
    : 0;

  return {
    publicRepos: user.public_repos,
    followers:   user.followers,
    totalStars,
    totalPRs:     prs.total_count    || 0,
    totalCommits: commits.total_count || 0,
  };
}

export function useGithubData(username) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    // Serve from cache if still fresh
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const { stats, ts } = JSON.parse(raw);
        if (Date.now() - ts < CACHE_TTL) {
          setData(stats);
          setLoading(false);
          return;
        }
      }
    } catch (_) { /* ignore bad cache */ }

    fetchAll(username)
      .then(stats => {
        if (cancelled) return;
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ stats, ts: Date.now() })); } catch (_) {}
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
