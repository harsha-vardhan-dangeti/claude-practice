import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../components/Projects';
import { projects } from '../data/portfolio';

describe('Projects', () => {
  beforeEach(() => render(<Projects />));

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'Selected Work' })).toBeInTheDocument();
  });

  it('renders every project title', () => {
    projects.forEach(p => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it('renders every project description', () => {
    projects.forEach(p => {
      expect(screen.getByText(p.description)).toBeInTheDocument();
    });
  });

  it('renders a GitHub link for each project that has one', () => {
    const githubLinks = screen.getAllByLabelText('GitHub repository');
    const projectsWithGithub = projects.filter(p => p.github);
    expect(githubLinks.length).toBe(projectsWithGithub.length);
  });

  it('renders a demo link only for projects that have one', () => {
    const demoLinks = screen.queryAllByLabelText('Live demo');
    const projectsWithDemo = projects.filter(p => p.demo);
    expect(demoLinks.length).toBe(projectsWithDemo.length);
  });

  it('renders all tags for each project', () => {
    projects.forEach(p => {
      p.tags.forEach(tag => {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      });
    });
  });

  it('renders the correct number of project cards', () => {
    const cards = document.querySelectorAll('.proj-card');
    expect(cards.length).toBe(projects.length);
  });
});
