// Vercel serverless function — proxies the GitHub API server-side.
//
// Why this exists: calling GitHub from the browser is capped at 60 req/hour
// per visitor IP (unauthenticated), so the dashboard intermittently blanks
// out. Here we fetch once on the server, optionally with a GITHUB_TOKEN
// (5,000/hour + GraphQL contributions), and cache at the edge for ~1h so the
// function really runs only a handful of times per hour.
//
// Set GITHUB_TOKEN in the Vercel project env (a fine-grained PAT with public
// read scope is enough). Without it, the function still works via the REST
// API and the edge cache keeps it well under the unauthenticated limit.

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

// Real total contributions over the last year — only available via GraphQL,
// which requires a token. Returns null if no token or the call fails.
async function fetchContributions(username, token) {
  if (!token) return null;
  try {
    const query = `query($login:String!){
      user(login:$login){
        contributionsCollection{
          totalCommitContributions
          totalPullRequestContributions
          contributionCalendar{ totalContributions }
        }
      }
    }`;
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const c = json?.data?.user?.contributionsCollection;
    if (!c) return null;
    return {
      totalContributions: c.contributionCalendar?.totalContributions ?? null,
      commitContributions: c.totalCommitContributions ?? null,
      prContributions: c.totalPullRequestContributions ?? null,
    };
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const username = (req.query.user || 'harsha-vardhan-dangeti').toString();
  const token = process.env.GITHUB_TOKEN;

  const headers = { Accept: 'application/vnd.github.v3+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`, { headers }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers }),
    ]);

    if (!userRes.ok) {
      res.status(userRes.status).json({ error: `GitHub API ${userRes.status}` });
      return;
    }

    const [user, repos, events] = await Promise.all([
      userRes.json(),
      reposRes.ok  ? reposRes.json()  : [],
      eventsRes.ok ? eventsRes.json() : [],
    ]);

    const repoList  = Array.isArray(repos)  ? repos  : [];
    const eventList = Array.isArray(events) ? events : [];

    const totalStars = repoList.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const totalForks = repoList.reduce((s, r) => s + (r.forks_count || 0), 0);

    // Proxy for recent activity from the public events feed (~90d, capped).
    const recentCommits = eventList
      .filter(e => e.type === 'PushEvent')
      .reduce((s, e) => s + (e.payload?.commits?.length || 0), 0);

    const contributions = await fetchContributions(username, token);

    const payload = {
      publicRepos:  user.public_repos,
      followers:    user.followers,
      totalStars,
      totalForks,
      recentCommits,
      // Accurate last-year totals when a token is configured; null otherwise.
      totalContributions: contributions?.totalContributions ?? null,
      topLangs:     computeTopLangs(repoList),
      authed:       Boolean(token),
      generatedAt:  new Date().toISOString(),
    };

    // Edge-cache ~1h, serve stale up to a day while revalidating.
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(payload);
  } catch (e) {
    res.status(502).json({ error: e.message || 'fetch failed' });
  }
}
