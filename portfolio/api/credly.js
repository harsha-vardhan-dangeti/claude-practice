// Vercel serverless function: your public Credly badges as JSON.
//
// Credly blocks browser requests from other sites (no CORS), so the site calls
// this instead. The response is cached at the edge for an hour, so a badge
// accepted on Credly shows up on the portfolio within about an hour, with no
// redeploy needed.
//
// The username comes from src/data/portfolio.js, not the request, so this
// can't be used as an open proxy.

import { personal } from '../src/data/portfolio.js';
import { fetchCredlyBadges } from '../src/lib/credentials.js';

export default async function handler(req, res) {
  const username = personal.credly;
  if (!username) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(404).json({ error: 'No Credly username configured' });
  }

  try {
    const badges = await fetchCredlyBadges(username);
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ badges, generatedAt: new Date().toISOString() });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    const timedOut = e?.name === 'TimeoutError' || e?.name === 'AbortError';
    const status = timedOut ? 504 : (e?.status >= 400 ? e.status : 502);
    res.status(status).json({ error: timedOut ? 'Credly timeout' : (e?.message || 'fetch failed') });
  }
}
