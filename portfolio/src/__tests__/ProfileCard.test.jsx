import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfileCard from '../components/ProfileCard';
import { personal, about } from '../data/portfolio';

describe('ProfileCard', () => {
  beforeEach(() => render(<ProfileCard />));

  it('renders full name', () => {
    expect(screen.getByText(personal.name)).toBeInTheDocument();
  });

  it('renders job title', () => {
    expect(screen.getByText(personal.title)).toBeInTheDocument();
  });

  it('renders initials placeholder when no avatar', () => {
    expect(screen.getByText(personal.initials)).toBeInTheDocument();
  });

  it('renders the open-to-work status', () => {
    const statusFact = about.facts.find(f => f.highlight);
    expect(screen.getByText(statusFact.value)).toBeInTheDocument();
  });

  it('renders all profile stack tags', () => {
    personal.profileStack.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders location', () => {
    expect(screen.getByText(personal.locationShort)).toBeInTheDocument();
  });

  it('GitHub link has correct href', () => {
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', personal.github.url);
  });

  it('LinkedIn link has correct href', () => {
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', personal.linkedin.url);
  });

  it('Email link has correct href', () => {
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', `mailto:${personal.email}`);
  });
});
