import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Certifications from '../components/Certifications';
import { certifications } from '../data/portfolio';

describe('Certifications', () => {
  beforeEach(() => render(<Certifications />));

  const filled = certifications.filter(c => c.name);

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
  });

  it('renders only filled certifications', () => {
    const cards = document.querySelectorAll('.cert-card');
    expect(cards.length).toBe(filled.length);
  });

  it('renders each cert name', () => {
    filled.forEach(c => {
      expect(screen.getByText(c.name)).toBeInTheDocument();
    });
  });

  it('renders each cert issuer', () => {
    filled.forEach(c => {
      expect(screen.getAllByText(c.issuer).length).toBeGreaterThan(0);
    });
  });

  it('renders each cert date', () => {
    // Multiple certs can share the same year — just verify each date appears at least once
    filled.forEach(c => {
      expect(screen.getAllByText(c.date).length).toBeGreaterThan(0);
    });
  });

  it('each cert has a View credential link', () => {
    const links = screen.getAllByText('View credential');
    expect(links.length).toBe(filled.length);
  });
});
