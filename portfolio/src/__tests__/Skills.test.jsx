import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from '../components/Skills';
import { skills } from '../data/portfolio';

describe('Skills', () => {
  beforeEach(() => render(<Skills />));

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'Technical Skills' })).toBeInTheDocument();
  });

  it('renders every skill category', () => {
    skills.forEach(g => {
      expect(screen.getByText(g.category)).toBeInTheDocument();
    });
  });

  it('renders every skill pill', () => {
    skills.forEach(g => {
      g.items.forEach(item => {
        expect(screen.getAllByText(item).length).toBeGreaterThan(0);
      });
    });
  });

  it('renders the correct number of skill groups', () => {
    const groups = document.querySelectorAll('.skill-group');
    expect(groups.length).toBe(skills.length);
  });
});
