import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { personal } from '../data/portfolio';

describe('Footer', () => {
  beforeEach(() => render(<Footer />));

  it('renders the full name', () => {
    expect(screen.getByRole('contentinfo')).toHaveTextContent(personal.name);
  });

  it('renders the email as a mailto link', () => {
    const link = screen.getByText(personal.email);
    expect(link).toHaveAttribute('href', `mailto:${personal.email}`);
  });
});
