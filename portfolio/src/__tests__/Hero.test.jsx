import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero';
import { personal, hero } from '../data/portfolio';

const renderHero = () => render(<MemoryRouter><Hero /></MemoryRouter>);

describe('Hero', () => {
  beforeEach(() => renderHero());

  it('renders full name across both lines', () => {
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(personal.nameLine1);
    expect(h1).toHaveTextContent(personal.nameLine2);
  });

  it('renders the badge text', () => {
    expect(screen.getByText(hero.badge)).toBeInTheDocument();
  });

  it('renders the bold tagline part', () => {
    expect(screen.getByText(hero.tagline.bold)).toBeInTheDocument();
  });

  it('renders all stats', () => {
    hero.stats.forEach(s => {
      expect(screen.getByText(s.value)).toBeInTheDocument();
      expect(screen.getByText(s.label)).toBeInTheDocument();
    });
  });

  it('View Projects button links to /projects', () => {
    const btn = screen.getByText('View Projects').closest('a');
    expect(btn).toHaveAttribute('href', '/projects');
  });

  it('Resume PDF button links to resume', () => {
    const btn = screen.getByText('Resume PDF').closest('a');
    expect(btn).toHaveAttribute('href', personal.resumePdf);
  });

  it('renders the profile card', () => {
    expect(document.querySelector('.profile-card')).toBeInTheDocument();
  });
});
