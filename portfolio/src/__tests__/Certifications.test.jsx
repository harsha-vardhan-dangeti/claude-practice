import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Certifications from '../components/Certifications';
import { certifications } from '../data/portfolio';
import linkedinCerts from '../data/linkedin-certifications.json';
import { mergeCredentials, formatCertDate } from '../lib/credentials';

const expected = mergeCredentials(certifications, linkedinCerts);

describe('Certifications (Credly unreachable)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    render(<Certifications />);
  });
  afterEach(() => vi.restoreAllMocks());

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
  });

  it('falls back to the static and imported certifications', () => {
    expect(document.querySelectorAll('.cert-card').length).toBe(expected.length);
    expected.forEach(c => expect(screen.getByText(c.name)).toBeInTheDocument());
  });

  it('renders each issuer and a readable date', () => {
    expected.forEach(c => {
      expect(screen.getAllByText(c.issuer).length).toBeGreaterThan(0);
      if (c.date) expect(screen.getAllByText(formatCertDate(c.date)).length).toBeGreaterThan(0);
    });
  });

  it('lists newest first', () => {
    const names = [...document.querySelectorAll('.cert-name')].map(n => n.textContent);
    expect(names).toEqual(expected.map(c => c.name));
  });

  it('gives every card a working credential link', () => {
    const links = screen.getAllByText('View credential').map(t => t.closest('a'));
    expect(links.length).toBe(expected.length);
    links.forEach(a => expect(a.getAttribute('href')).toMatch(/^https:\/\//));
  });
});

describe('Certifications (live Credly)', () => {
  afterEach(() => vi.restoreAllMocks());

  it('adds a new Credly badge without dropping hand-added entries', async () => {
    localStorage.clear();
    const fresh = { issuer: 'Google', name: 'Brand New Badge', date: '2026-11-01', url: 'https://www.credly.com/badges/new', image: null, source: 'credly' };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ badges: [fresh] }) });
    render(<Certifications />);
    expect(await screen.findByText('Brand New Badge')).toBeInTheDocument();
    await waitFor(() => {
      certifications.forEach(c => expect(screen.getByText(c.name)).toBeInTheDocument());
    });
    expect(document.querySelector('.cert-name').textContent).toBe('Brand New Badge');
  });
});
