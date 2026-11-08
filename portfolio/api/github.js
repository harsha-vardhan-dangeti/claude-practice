// Vercel serverless function — proxies the GitHub API server-side.
//
// Why this exists: calling GitHub from the browser is capped at 60 req/hour
// per visitor IP (unauthenticated). Here we fetch on the server, optionally
// with a GITHUB_TOKEN (5,000/hour + GraphQL contributions), and cache at the
// edge for 5 minutes so stats stay fresh without hammering GitHub.
//
// Set GITHUB_TOKEN in the Vercel project env (a fine-grained PAT with public
// read scope is enough). Without it, the function still works via the REST
// API; total contributions just come back null.

import { fetchGithubStats, ghFetch } from '../src/lib/githubStats.js';

// Real total contributions over the last year — only available via GraphQL,
// which requires a token. Returns null if no token or the call fails.
async function fetchContributions(username, token) {
  if (!token) return null;
  try {
    const query = `query($login:String!){
      user(login:$login){
        contributionsCollection{
          contributionCalendar{ totalContributions }
        }
      }
    }`;
    const res = await ghFetch(
      'https://api.github.com/graphql',
      { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      { method: 'POST', body: JSON.stringify({ query, variables: { login: username } }) },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const username = (req.query.user || 'harsha-vardhan-dangeti').toString();
  const token = process.env.GITHUB_TOKEN;

  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const [stats, totalContributions] = await Promise.all([
      fetchGithubStats(username, headers),
      fetchContributions(username, token),
    ]);

    // Fresh for 5 min at the edge; serve stale up to 1h while revalidating.
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    res.status(200).json({
      ...stats,
      totalContributions,
      authed:      Boolean(token),
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    // Don't cache failures — the next request should retry GitHub.
    res.setHeader('Cache-Control', 'no-store');
    const timedOut = e?.name === 'TimeoutError' || e?.name === 'AbortError';
    const status = timedOut ? 504 : (e?.status >= 400 ? e.status : 502);
    res.status(status).json({ error: timedOut ? 'GitHub API timeout' : (e?.message || 'fetch failed') });
  }
}
