import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';
import { personal } from '../data/portfolio';

describe('Contact', () => {
  beforeEach(() => render(<Contact />));

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'Get in Touch' })).toBeInTheDocument();
  });

  it('renders the email card with correct href', () => {
    const link = screen.getByText(personal.email).closest('a');
    expect(link).toHaveAttribute('href', `mailto:${personal.email}`);
  });

  it('renders the LinkedIn card with correct href', () => {
    const link = screen.getByText(personal.linkedin.handle).closest('a');
    expect(link).toHaveAttribute('href', personal.linkedin.url);
  });

  it('renders the GitHub card with correct href', () => {
    const link = screen.getByText(personal.github.handle).closest('a');
    expect(link).toHaveAttribute('href', personal.github.url);
  });

  it('external links have target _blank and rel noopener', () => {
    const linkedinLink = screen.getByText(personal.linkedin.handle).closest('a');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener');

    const githubLink = screen.getByText(personal.github.handle).closest('a');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener');
  });

  it('renders 3 contact cards', () => {
    const cards = document.querySelectorAll('.contact-card');
    expect(cards.length).toBe(3);
  });
});
