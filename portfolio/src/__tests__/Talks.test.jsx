import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Talks from '../components/Talks';
import { talks } from '../data/portfolio';

describe('Talks', () => {
  beforeEach(() => render(<Talks />));

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'Talks & Achievements' })).toBeInTheDocument();
  });

  it('renders every talk title', () => {
    talks.forEach(t => {
      expect(screen.getByText(t.title)).toBeInTheDocument();
    });
  });

  it('renders every talk meta line', () => {
    talks.forEach(t => {
      expect(screen.getByText(t.meta)).toBeInTheDocument();
    });
  });

  it('renders every talk description', () => {
    talks.forEach(t => {
      expect(screen.getByText(t.description)).toBeInTheDocument();
    });
  });

  it('renders the correct number of talk cards', () => {
    const cards = document.querySelectorAll('.talk-card');
    expect(cards.length).toBe(talks.length);
  });
});
