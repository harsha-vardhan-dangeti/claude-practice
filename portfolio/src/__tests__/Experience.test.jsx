import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Experience from '../components/Experience';
import { experience } from '../data/portfolio';

describe('Experience', () => {
  beforeEach(() => render(<Experience />));

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: 'Work History' })).toBeInTheDocument();
  });

  it('renders every job role', () => {
    experience.forEach(job => {
      expect(screen.getByText(job.role)).toBeInTheDocument();
    });
  });

  it('renders every company name', () => {
    experience.forEach(job => {
      expect(screen.getByText(job.company)).toBeInTheDocument();
    });
  });

  it('renders every date range', () => {
    experience.forEach(job => {
      expect(screen.getByText(job.dates)).toBeInTheDocument();
    });
  });

  it('renders all bullets for each job', () => {
    experience.forEach(job => {
      job.bullets.forEach(bullet => {
        // getAllByText handles duplicate placeholder bullets across jobs
        expect(screen.getAllByText(bullet).length).toBeGreaterThan(0);
      });
    });
  });

  it('renders all tags for each job', () => {
    experience.forEach(job => {
      job.tags.forEach(tag => {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      });
    });
  });

  it('current job dot does not have inactive class', () => {
    const dots = document.querySelectorAll('.tl-dot');
    const currentJob = experience.findIndex(j => j.current);
    expect(dots[currentJob]).not.toHaveClass('inactive');
  });

  it('past job dot has inactive class', () => {
    const dots = document.querySelectorAll('.tl-dot');
    experience.forEach((job, i) => {
      if (!job.current) expect(dots[i]).toHaveClass('inactive');
    });
  });
});
