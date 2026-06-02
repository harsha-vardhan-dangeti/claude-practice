import { useState, useEffect } from 'react';

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

  const totalStars   = repoList.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const totalForks   = repoList.reduce((s, r) => s + (r.forks_count || 0), 0);

  // Count pushes from recent public events as a proxy for commits
  const recentCommits = eventList
    .filter(e => e.type === 'PushEvent')
    .reduce((s, e) => s + (e.payload?.commits?.length || 0), 0);

  // Count PR events
  const recentPRs = eventList.filter(e => e.type === 'PullRequestEvent').length;

  return {
    publicRepos:   user.public_repos,
    followers:     user.followers,
    totalStars,
    totalForks,
    recentCommits,
    recentPRs,
    topLangs:      computeTopLangs(repoList),
  };
}

export function useGithubData(username) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchAll(username)
      .then(stats => {
        if (!cancelled) { setData(stats); setLoading(false); }
      })
      .catch(e => {
        if (!cancelled) { setError(e.message); setLoading(false); }
      });

    return () => { cancelled = true; };
  }, [username]);

  return { data, loading, error };
}
