import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GithubStats from '../components/GithubStats';
import { githubStats } from '../data/portfolio';

const mockFetch = vi.fn();
beforeEach(() => {
  global.fetch = mockFetch;
  sessionStorage.clear();
});
afterEach(() => vi.restoreAllMocks());

// The hook fetches the serverless proxy (/api/github) first; it falls back to
// the direct GitHub REST endpoints only if the proxy is unavailable.
const apiPayload = {
  publicRepos:        17,
  followers:          5,
  totalStars:         8,   // 3 + 5 + 0
  totalForks:         3,   // 1 + 2 + 0
  recentCommits:      4,   // 3 + 1 push-event commits
  totalContributions: null,
  topLangs: [
    { lang: 'Ruby',   pct: 67, color: '#CC342D' },
    { lang: 'Python', pct: 33, color: '#3572A5' },
  ],
};

const setupFetch = () => {
  mockFetch.mockImplementation(url => {
    if (url.includes('/api/github'))
      return Promise.resolve({ ok: true, json: async () => apiPayload });
    // Direct-fetch fallback shape (only hit if proxy fails).
    if (url.includes('/repos'))
      return Promise.resolve({ ok: true, json: async () => [
        { stargazers_count: 3, forks_count: 1, language: 'Ruby' },
        { stargazers_count: 5, forks_count: 2, language: 'Python' },
        { stargazers_count: 0, forks_count: 0, language: 'Ruby' },
      ]});
    if (url.includes('/events'))
      return Promise.resolve({ ok: true, json: async () => [
        { type: 'PushEvent', payload: { commits: [1, 2, 3] } },
        { type: 'PushEvent', payload: { commits: [1] } },
      ]});
    return Promise.resolve({ ok: true, json: async () => ({ public_repos: 17, followers: 5 }) });
  });
};

const renderGithub = () => render(<MemoryRouter><GithubStats /></MemoryRouter>);

describe('GithubStats', () => {
  it('renders the section heading', () => {
    setupFetch();
    renderGithub();
    expect(screen.getByRole('heading', { name: 'GitHub Activity' })).toBeInTheDocument();
  });

  it('shows skeleton loaders while fetching', () => {
    setupFetch();
    renderGithub();
    expect(document.querySelectorAll('.gh-skeleton').length).toBeGreaterThan(0);
  });

  it('shows live public repo count', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getAllByText('17').length).toBeGreaterThan(0));
  });

  it('shows live star count', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getAllByText('8').length).toBeGreaterThan(0));
  });

  it('shows live commit count from the proxy', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getAllByText('4').length).toBeGreaterThan(0));
  });

  it('fetches the serverless proxy, not GitHub directly', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => screen.getAllByText('17'));
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/github'));
  });

  it('labels the commit stat honestly as a 90-day window', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getAllByText('Commits (90d)').length).toBeGreaterThan(0));
  });

  it('prefers accurate yearly contributions when available', async () => {
    mockFetch.mockImplementation(url =>
      url.includes('/api/github')
        ? Promise.resolve({ ok: true, json: async () => ({ ...apiPayload, totalContributions: 1234 }) })
        : Promise.resolve({ ok: true, json: async () => ({}) })
    );
    renderGithub();
    await waitFor(() => {
      expect(screen.getAllByText('Contributions (1y)').length).toBeGreaterThan(0);
      expect(screen.getAllByText('1,234').length).toBeGreaterThan(0);
    });
  });

  it('renders overview card rows', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => {
      expect(screen.getAllByText('Public Repos').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Total Stars').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Commits (90d)').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Followers').length).toBeGreaterThan(0);
    });
  });

  it('serves from session cache without refetching on remount', async () => {
    setupFetch();
    const { unmount } = renderGithub();
    await waitFor(() => screen.getAllByText('17'));
    unmount();
    mockFetch.mockClear();
    renderGithub();
    await waitFor(() => screen.getAllByText('17'));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('renders top languages after fetch', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => {
      expect(screen.getAllByText('Ruby').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
    });
  });

  it('falls back to direct fetch when the proxy is unreachable', async () => {
    mockFetch.mockImplementation(url => {
      if (url.includes('/api/github')) return Promise.reject(new Error('no function'));
      if (url.includes('/repos'))
        return Promise.resolve({ ok: true, json: async () => [
          { stargazers_count: 3, forks_count: 1, language: 'Ruby' },
        ]});
      if (url.includes('/events'))
        return Promise.resolve({ ok: true, json: async () => [
          { type: 'PushEvent', payload: { commits: [1, 2] } },
        ]});
      return Promise.resolve({ ok: true, json: async () => ({ public_repos: 17, followers: 5 }) });
    });
    renderGithub();
    await waitFor(() => expect(screen.getAllByText('17').length).toBeGreaterThan(0));
  });

  it('shows error notice when everything fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderGithub();
    await waitFor(() =>
      expect(screen.getByText(/could not fetch live data/i)).toBeInTheDocument()
    );
  });

  it('renders streak image', () => {
    setupFetch();
    renderGithub();
    expect(screen.getByAltText('GitHub streak')).toBeInTheDocument();
  });

  it('all highlight card labels are present', async () => {
    setupFetch();
    renderGithub();
    // recentCommits resolves to a runtime label, so assert via the resolved text.
    await waitFor(() => {
      githubStats.highlights.forEach(h => {
        const label = h.key === 'recentCommits' ? 'Commits (90d)' : h.label;
        expect(screen.getAllByText(label).length).toBeGreaterThan(0);
      });
    });
  });
});
