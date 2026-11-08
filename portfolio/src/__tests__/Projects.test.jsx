import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../components/Projects';
import { projects as allProjects } from '../data/portfolio';

// Featured live projects render in FeaturedWork; this grid shows the rest.
const projects = allProjects.filter(p => !p.featured);

describe('Projects', () => {
  beforeEach(() => render(<Projects />));

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'AI engineering work' })).toBeInTheDocument();
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

  it('renders a GitHub link for each project that has a real one', () => {
    const githubLinks = screen.queryAllByLabelText('GitHub repository');
    const projectsWithGithub = projects.filter(p => p.github && p.github !== '#');
    expect(githubLinks.length).toBe(projectsWithGithub.length);
  });

  it('does not render placeholder "#" GitHub links', () => {
    screen.queryAllByLabelText('GitHub repository').forEach(a => {
      expect(a).not.toHaveAttribute('href', '#');
    });
  });

  it('opens project links in a new tab', () => {
    [...screen.queryAllByLabelText('GitHub repository'), ...screen.queryAllByLabelText('Live demo')]
      .forEach(a => expect(a).toHaveAttribute('target', '_blank'));
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

  it('does not repeat featured projects', () => {
    allProjects.filter(p => p.featured).forEach(p => {
      expect(screen.queryByText(p.title)).not.toBeInTheDocument();
    });
  });

  it('renders the correct number of project cards', () => {
    const cards = document.querySelectorAll('.proj-card');
    expect(cards.length).toBe(projects.length);
  });
});
