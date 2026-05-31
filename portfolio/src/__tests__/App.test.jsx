import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import HomePage        from '../pages/HomePage';
import AboutPage       from '../pages/AboutPage';
import ExperiencePage  from '../pages/ExperiencePage';
import ProjectsPage    from '../pages/ProjectsPage';
import SkillsPage      from '../pages/SkillsPage';
import AchievementsPage from '../pages/AchievementsPage';
import ContactPage     from '../pages/ContactPage';

// Helper to render a page inside a router
const renderPage = (element) =>
  render(<MemoryRouter>{element}</MemoryRouter>);

describe('App routing', () => {
  it('renders nav and footer on the home route', () => {
    render(<App />);
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('home route shows hero heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});

describe('Page routes', () => {
  it('HomePage renders hero', () => {
    renderPage(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('AboutPage renders Background heading', () => {
    renderPage(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'Background' })).toBeInTheDocument();
  });

  it('ExperiencePage renders Work History heading', () => {
    renderPage(<ExperiencePage />);
    expect(screen.getByRole('heading', { name: 'Work History' })).toBeInTheDocument();
  });

  it('ProjectsPage renders Selected Work heading', () => {
    renderPage(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Selected Work' })).toBeInTheDocument();
  });

  it('SkillsPage renders Technical Skills heading', () => {
    renderPage(<SkillsPage />);
    expect(screen.getByRole('heading', { name: 'Technical Skills' })).toBeInTheDocument();
  });

  it('AchievementsPage renders Certifications and Talks headings', () => {
    renderPage(<AchievementsPage />);
    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Talks & Achievements' })).toBeInTheDocument();
  });

  it('ContactPage renders Get in Touch heading', () => {
    renderPage(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Get in Touch' })).toBeInTheDocument();
  });
});
