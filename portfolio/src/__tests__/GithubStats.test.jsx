import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GithubStats from '../components/GithubStats';
import { githubStats } from '../data/portfolio';

const mockFetch = vi.fn();
beforeEach(() => { global.fetch = mockFetch; localStorage.clear(); });
afterEach(() => vi.restoreAllMocks());

const setupFetch = () => {
  mockFetch.mockImplementation(url => {
    if (url.includes('/repos'))
      return Promise.resolve({ ok: true, json: async () => [
        { stargazers_count: 3, language: 'Ruby' },
        { stargazers_count: 5, language: 'Python' },
        { stargazers_count: 0, language: 'Ruby' },
      ]});
    if (url.includes('type:pr'))
      return Promise.resolve({ ok: true, json: async () => ({ total_count: 42 }) });
    if (url.includes('/commits'))
      return Promise.resolve({ ok: true, json: async () => ({ total_count: 210 }) });
    // default: user endpoint
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
    await waitFor(() => expect(screen.getAllByText('8').length).toBeGreaterThan(0)); // 3+5+0
  });

  it('shows live PR count', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getAllByText('42').length).toBeGreaterThan(0));
  });

  it('shows live commit count', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getAllByText('210').length).toBeGreaterThan(0));
  });

  it('renders overview card rows', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => {
      // labels appear in both highlight cards and overview rows — getAllByText handles duplicates
      expect(screen.getAllByText('Public Repos').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Total Stars').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Pull Requests').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Total Commits').length).toBeGreaterThan(0);
      expect(screen.getByText('Followers')).toBeInTheDocument();
    });
  });

  it('renders top languages after fetch', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => {
      expect(screen.getAllByText('Ruby').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
    });
  });

  it('shows error notice when API fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderGithub();
    await waitFor(() =>
      expect(screen.getByText(/could not fetch live data/i)).toBeInTheDocument()
    );
  });

  it('uses localStorage cache on second render', async () => {
    setupFetch();
    const { unmount } = renderGithub();
    await waitFor(() => screen.getAllByText('17'));
    unmount();
    mockFetch.mockClear();
    renderGithub();
    await waitFor(() => screen.getAllByText('17'));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('renders streak image', () => {
    setupFetch();
    renderGithub();
    expect(screen.getByAltText('GitHub streak')).toBeInTheDocument();
  });

  it('all highlight card labels are present', () => {
    setupFetch();
    renderGithub();
    githubStats.highlights.forEach(h => {
      expect(screen.getAllByText(h.label).length).toBeGreaterThan(0);
    });
  });
});
