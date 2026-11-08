import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchGithubStats, fetchRecentCommits } from '../lib/githubStats';
import handler from '../../api/github.js';

const mockFetch = vi.fn();
beforeEach(() => { global.fetch = mockFetch; });
afterEach(() => { vi.restoreAllMocks(); delete process.env.GITHUB_TOKEN; });

const ok = body => Promise.resolve({ ok: true, json: async () => body });

const happyGithub = url => {
  if (url.includes('/search/commits')) return ok({ total_count: 69 });
  if (url.includes('/repos')) return ok([
    { stargazers_count: 4, forks_count: 1, language: 'TypeScript' },
    { stargazers_count: 5, forks_count: 0, language: 'Python' },
  ]);
  return ok({ public_repos: 21, followers: 7 });
};

describe('fetchRecentCommits', () => {
  it('queries commit search for the last 90 days and returns total_count', async () => {
    mockFetch.mockImplementation(happyGithub);
    expect(await fetchRecentCommits('octo', {})).toBe(69);
    const url = decodeURIComponent(mockFetch.mock.calls[0][0]);
    expect(url).toContain('/search/commits?q=author:octo author-date:>=');
  });

  it('returns null when search fails', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 403 });
    expect(await fetchRecentCommits('octo', {})).toBeNull();
  });
});

describe('fetchGithubStats', () => {
  it('aggregates user, repo and commit data without the events feed', async () => {
    mockFetch.mockImplementation(happyGithub);
    const stats = await fetchGithubStats('octo', {});
    expect(stats).toMatchObject({
      publicRepos: 21, followers: 7, totalStars: 9, totalForks: 1, recentCommits: 69,
    });
    expect(mockFetch.mock.calls.some(([u]) => u.includes('/events'))).toBe(false);
  });

  it('throws with the GitHub status when the user lookup fails', async () => {
    mockFetch.mockImplementation(url =>
      url.includes('/search') || url.includes('/repos')
        ? happyGithub(url)
        : Promise.resolve({ ok: false, status: 404 }));
    await expect(fetchGithubStats('nobody', {})).rejects.toMatchObject({ status: 404 });
  });
});

describe('api/github handler', () => {
  const mockRes = () => {
    const res = { headers: {} };
    res.setHeader = (k, v) => { res.headers[k] = v; };
    res.status = code => { res.statusCode = code; return res; };
    res.json = body => { res.body = body; return res; };
    return res;
  };

  it('returns stats with a short edge cache', async () => {
    mockFetch.mockImplementation(happyGithub);
    const res = mockRes();
    await handler({ query: {} }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ recentCommits: 69, authed: false, totalContributions: null });
    expect(res.headers['Cache-Control']).toContain('s-maxage=300');
  });

  it('returns 504 and does not cache when GitHub times out', async () => {
    mockFetch.mockRejectedValue(Object.assign(new Error('timed out'), { name: 'TimeoutError' }));
    const res = mockRes();
    await handler({ query: {} }, res);
    expect(res.statusCode).toBe(504);
    expect(res.headers['Cache-Control']).toBe('no-store');
  });
});
