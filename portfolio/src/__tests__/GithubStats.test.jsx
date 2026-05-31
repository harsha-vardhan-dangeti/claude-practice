import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GithubStats from '../components/GithubStats';
import { githubStats } from '../data/portfolio';

// Mock fetch so tests don't hit the network
const mockFetch = vi.fn();
beforeEach(() => { global.fetch = mockFetch; });
afterEach(() => { vi.restoreAllMocks(); });

const renderGithub = () =>
  render(<MemoryRouter><GithubStats /></MemoryRouter>);

describe('GithubStats', () => {
  it('renders the section heading', () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ public_repos: 17 }) });
    renderGithub();
    expect(screen.getByRole('heading', { name: 'GitHub Activity' })).toBeInTheDocument();
  });

  it('renders all highlight card labels', () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ public_repos: 17 }) });
    renderGithub();
    githubStats.highlights.forEach(h => {
      expect(screen.getByText(h.label)).toBeInTheDocument();
    });
  });

  it('renders the highlight stat values', () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ public_repos: 17 }) });
    renderGithub();
    // Non-folder highlights show their static value from portfolio.js
    githubStats.highlights.filter(h => h.icon !== 'folder').forEach(h => {
      expect(screen.getByText(h.value)).toBeInTheDocument();
    });
  });

  it('renders 3 stats card images (overview, languages, streak)', () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ public_repos: 17 }) });
    renderGithub();
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThanOrEqual(3);
  });

  it('renders view GitHub profile link', () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ public_repos: 17 }) });
    renderGithub();
    expect(screen.getByText('View GitHub Profile').closest('a'))
      .toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  it('renders GitHub username link in description', () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ public_repos: 17 }) });
    renderGithub();
    expect(screen.getByText(`@${githubStats.username}`)).toBeInTheDocument();
  });
});
