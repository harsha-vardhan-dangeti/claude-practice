import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Skills from '../components/Skills';
import { skills, strengths } from '../data/portfolio';

const renderSkills = () => render(<MemoryRouter><Skills /></MemoryRouter>);
const panel = () => screen.getByLabelText(/^Where I've used /);

describe('Skills', () => {
  beforeEach(() => renderSkills());

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: "Skills and where I've used them" })).toBeInTheDocument();
  });

  it('renders the three strengths', () => {
    strengths.forEach(s => {
      expect(screen.getByRole('heading', { name: s.title })).toBeInTheDocument();
    });
  });

  it('renders every skill category as a labelled group', () => {
    skills.forEach(g => {
      expect(screen.getByRole('group', { name: g.category })).toBeInTheDocument();
    });
  });

  it('renders every skill as a toggle button', () => {
    skills.forEach(g => {
      const group = screen.getByRole('group', { name: g.category });
      g.items.forEach(item => {
        expect(within(group).getByRole('button', { name: item })).toBeInTheDocument();
      });
    });
  });

  it('selects Ruby on Rails by default and shows its work evidence', () => {
    expect(screen.getByRole('button', { name: 'Ruby on Rails' })).toHaveAttribute('aria-pressed', 'true');
    const p = panel();
    expect(within(p).getByRole('heading', { name: 'Ruby on Rails' })).toBeInTheDocument();
    expect(within(p).getByText('In production since 2022')).toBeInTheDocument();
    expect(within(p).getAllByText('Work').length).toBeGreaterThan(0);
  });

  it('switches the proof panel when another skill is picked', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Supabase' }));
    expect(screen.getByRole('button', { name: 'Supabase' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Ruby on Rails' })).toHaveAttribute('aria-pressed', 'false');
    const p = panel();
    expect(within(p).getByRole('heading', { name: 'Supabase' })).toBeInTheDocument();
    const live = within(p).getAllByRole('link', { name: /Open live site/ });
    expect(live.length).toBeGreaterThan(0);
    live.forEach(a => expect(a).toHaveAttribute('target', '_blank'));
  });

  it('highlights the skill inside the evidence text', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'RAGAS' }));
    const marks = panel().querySelectorAll('mark');
    expect(marks.length).toBeGreaterThan(0);
    marks.forEach(m => expect(m.textContent.toLowerCase()).toBe('ragas'));
  });

  it('is honest about skills with no public evidence', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Pinecone' }));
    expect(within(panel()).getByText(/Not in a public project yet/)).toBeInTheDocument();
  });
});
