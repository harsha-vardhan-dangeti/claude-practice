// GitHub stats fetching shared by the serverless proxy (api/github.js) and the
// browser fallback in useGithubData — one implementation so they can't drift.

export const LANG_COLORS = {
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

export function computeTopLangs(repos) {
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

// GitHub occasionally hangs for 10s+ on unauthenticated calls from shared
// cloud IPs. Fail fast so callers can fall back instead of stalling the page.
const TIMEOUT_MS = 6000;

export function ghFetch(url, headers, init = {}) {
  return fetch(url, { ...init, headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
}

// Commits authored in the last `days` days, via the commit search API.
// (GitHub's public events feed no longer includes per-push commit lists, so
// counting PushEvent payloads always yields 0.) Covers default branches of
// public repos. Returns null if the search fails.
export async function fetchRecentCommits(username, headers, days = 90) {
  const since = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  const q = encodeURIComponent(`author:${username} author-date:>=${since}`);
  try {
    const res = await ghFetch(`https://api.github.com/search/commits?q=${q}&per_page=1`, headers);
    if (!res.ok) return null;
    const json = await res.json();
    return typeof json?.total_count === 'number' ? json.total_count : null;
  } catch {
    return null;
  }
}

// Core stats from the REST API. Throws (with .status when GitHub answered)
// if the user lookup fails; repos and commit count degrade gracefully.
export async function fetchGithubStats(username, headers) {
  const base = `https://api.github.com/users/${encodeURIComponent(username)}`;

  const [userRes, reposRes, recentCommits] = await Promise.all([
    ghFetch(base, headers),
    ghFetch(`${base}/repos?per_page=100&type=owner&sort=updated`, headers).catch(() => null),
    fetchRecentCommits(username, headers),
  ]);

  if (!userRes.ok) {
    const err = new Error(`GitHub API ${userRes.status}`);
    err.status = userRes.status;
    throw err;
  }

  const [user, repos] = await Promise.all([
    userRes.json(),
    reposRes?.ok ? reposRes.json() : [],
  ]);
  const repoList = Array.isArray(repos) ? repos : [];

  return {
    publicRepos:   user.public_repos,
    followers:     user.followers,
    totalStars:    repoList.reduce((s, r) => s + (r.stargazers_count || 0), 0),
    totalForks:    repoList.reduce((s, r) => s + (r.forks_count || 0), 0),
    recentCommits,
    topLangs:      computeTopLangs(repoList),
  };
}
