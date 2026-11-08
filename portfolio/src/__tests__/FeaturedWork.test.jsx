import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeaturedWork from '../components/FeaturedWork';
import NowSnapshot from '../components/NowSnapshot';
import HomePage from '../pages/HomePage';
import { projects, experience } from '../data/portfolio';

const featured = projects.filter(p => p.featured);

describe('FeaturedWork', () => {
  beforeEach(() => render(<FeaturedWork />));

  it('renders every featured project', () => {
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach(p => {
      expect(screen.getByRole('heading', { name: p.title })).toBeInTheDocument();
    });
  });

  it('shows a screenshot with alt text for projects that have one', () => {
    featured.filter(p => p.image).forEach(p => {
      const img = screen.getByAltText(p.imageAlt);
      expect(img).toHaveAttribute('src', p.image);
    });
  });

  it('links every featured project to its live site in a new tab', () => {
    featured.forEach(p => {
      const article = screen.getByRole('heading', { name: p.title }).closest('article');
      const live = within(article).getAllByRole('link').filter(a => a.getAttribute('href') === p.demo);
      expect(live.length).toBeGreaterThan(0);
      live.forEach(a => expect(a).toHaveAttribute('target', '_blank'));
    });
  });

  it('links to the source code when a real repo exists', () => {
    featured.filter(p => p.github && p.github !== '#').forEach(p => {
      const article = screen.getByRole('heading', { name: p.title }).closest('article');
      expect(within(article).getByRole('link', { name: /read the code/i })).toHaveAttribute('href', p.github);
    });
  });
});

describe('NowSnapshot', () => {
  it('shows the current role and its outcomes', () => {
    render(<MemoryRouter><NowSnapshot /></MemoryRouter>);
    const job = experience.find(j => j.current);
    expect(screen.getByText(job.role, { exact: false })).toBeInTheDocument();
    job.bullets.forEach(b => expect(screen.getByText(b)).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /full experience/i })).toHaveAttribute('href', '/experience');
  });
});

describe('HomePage', () => {
  it('pitches in one scroll: hero, live work, current role, contact', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Live projects' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current role' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Contact' })).toBeInTheDocument();
  });

  it('hero CTA jumps to the live projects section', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /see live projects/i })).toHaveAttribute('href', '#work');
  });
});
