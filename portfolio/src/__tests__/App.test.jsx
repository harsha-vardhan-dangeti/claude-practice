import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App integration', () => {
  beforeEach(() => render(<App />));

  it('renders all section headings', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Background' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Work History' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Selected Work' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Technical Skills' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Talks & Achievements' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get in Touch' })).toBeInTheDocument();
  });

  it('renders nav and footer', () => {
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('all section ids are present in the DOM', () => {
    ['hero', 'about', 'experience', 'projects', 'skills', 'certifications', 'talks', 'contact'].forEach(id => {
      expect(document.getElementById(id)).not.toBeNull();
    });
  });
});
