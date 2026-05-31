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
    reposRes.ok   ? reposRes.json()   : [],
    prsRes.ok     ? prsRes.json()     : { total_count: 0 },
    commitsRes.ok ? commitsRes.json() : { total_count: 0 },
  ]);

  const repoList = Array.isArray(repos) ? repos : [];
  const totalStars = repoList.reduce((s, r) => s + (r.stargazers_count || 0), 0);

  return {
    publicRepos:  user.public_repos,
    followers:    user.followers,
    totalStars,
    totalPRs:     prs.total_count     || 0,
    totalCommits: commits.total_count || 0,
    topLangs:     computeTopLangs(repoList),
  };
}

export function useGithubData(username) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const { stats, ts } = JSON.parse(raw);
        if (Date.now() - ts < CACHE_TTL) {
          setData(stats); setLoading(false); return;
        }
      }
    } catch (_) {}

    fetchAll(username)
      .then(stats => {
        if (cancelled) return;
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ stats, ts: Date.now() })); } catch (_) {}
        setData(stats); setLoading(false);
      })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [username]);

  return { data, loading, error };
}
