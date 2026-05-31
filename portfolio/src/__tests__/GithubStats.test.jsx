import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GithubStats from '../components/GithubStats';
import { githubStats } from '../data/portfolio';

const mockApiData = {
  public_repos: 17,
  followers: 5,
  total_count: 42,
};

const mockFetch = vi.fn();
beforeEach(() => {
  global.fetch = mockFetch;
  localStorage.clear();
});
afterEach(() => vi.restoreAllMocks());

const setupFetch = () => {
  mockFetch.mockImplementation((url) => {
    if (url.includes('/users/') && !url.includes('/repos')) {
      return Promise.resolve({ ok: true, json: async () => ({ public_repos: 17, followers: 5 }) });
    }
    if (url.includes('/repos')) {
      return Promise.resolve({ ok: true, json: async () => [{ stargazers_count: 3 }, { stargazers_count: 5 }] });
    }
    if (url.includes('type:pr')) {
      return Promise.resolve({ ok: true, json: async () => ({ total_count: 42 }) });
    }
    if (url.includes('/commits')) {
      return Promise.resolve({ ok: true, json: async () => ({ total_count: 210 }) });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  });
};

const renderGithub = () =>
  render(<MemoryRouter><GithubStats /></MemoryRouter>);

describe('GithubStats', () => {
  it('renders the section heading', () => {
    setupFetch();
    renderGithub();
    expect(screen.getByRole('heading', { name: 'GitHub Activity' })).toBeInTheDocument();
  });

  it('renders all highlight card labels', () => {
    setupFetch();
    renderGithub();
    githubStats.highlights.forEach(h => {
      expect(screen.getByText(h.label)).toBeInTheDocument();
    });
  });

  it('shows skeleton loaders while fetching', () => {
    setupFetch();
    renderGithub();
    expect(document.querySelectorAll('.gh-skeleton').length).toBeGreaterThan(0);
  });

  it('shows live repo count after fetch', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getByText('17')).toBeInTheDocument());
  });

  it('shows live star count after fetch', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getByText('8')).toBeInTheDocument()); // 3+5
  });

  it('shows live PR count after fetch', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getByText('42')).toBeInTheDocument());
  });

  it('shows live commit count after fetch', async () => {
    setupFetch();
    renderGithub();
    await waitFor(() => expect(screen.getByText('210')).toBeInTheDocument());
  });

  it('shows error message when API fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderGithub();
    await waitFor(() =>
      expect(screen.getByText(/could not fetch live data/i)).toBeInTheDocument()
    );
  });

  it('serves from localStorage cache on second render', async () => {
    setupFetch();
    const { unmount } = renderGithub();
    await waitFor(() => screen.getByText('17'));
    unmount();

    // Second render — fetch should NOT be called again
    mockFetch.mockClear();
    renderGithub();
    await waitFor(() => screen.getByText('17'));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('renders 3 stats images', () => {
    setupFetch();
    renderGithub();
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(3);
  });

  it('renders view GitHub profile link', () => {
    setupFetch();
    renderGithub();
    expect(screen.getByText('View GitHub Profile').closest('a'))
      .toHaveAttribute('href', expect.stringContaining('github.com'));
  });
});
