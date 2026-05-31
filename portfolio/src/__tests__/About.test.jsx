import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
import { about } from '../data/portfolio';

describe('About', () => {
  beforeEach(() => render(<About />));

  it('renders the heading', () => {
    expect(screen.getByRole('heading', { name: about.heading })).toBeInTheDocument();
  });

  it('renders all bio paragraphs', () => {
    about.paragraphs.forEach(p => {
      expect(screen.getByText(p)).toBeInTheDocument();
    });
  });

  it('renders all fact labels', () => {
    about.facts.forEach(f => {
      expect(screen.getByText(f.label)).toBeInTheDocument();
    });
  });

  it('renders all fact values', () => {
    about.facts.forEach(f => {
      expect(screen.getByText(f.value)).toBeInTheDocument();
    });
  });

  it('renders highlighted fact with avail-dot class', () => {
    const highlighted = about.facts.find(f => f.highlight);
    if (highlighted) {
      const el = screen.getByText(highlighted.value);
      expect(el).toHaveClass('avail-dot');
    }
  });
});
