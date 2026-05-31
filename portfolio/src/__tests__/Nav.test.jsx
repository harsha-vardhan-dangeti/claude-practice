import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../components/Nav';
import { personal } from '../data/portfolio';

const renderNav = (theme = 'dark') =>
  render(
    <MemoryRouter>
      <Nav theme={theme} onToggleTheme={vi.fn()} />
    </MemoryRouter>
  );

describe('Nav', () => {
  it('renders the brand name', () => {
    renderNav();
    expect(screen.getByText(personal.brand)).toBeInTheDocument();
  });

  it('renders all desktop nav links', () => {
    renderNav();
    ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Achievements', 'GitHub', 'Contact'].forEach(label => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('renders the Resume button', () => {
    renderNav();
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('calls onToggleTheme when theme button clicked', () => {
    const onToggle = vi.fn();
    render(<MemoryRouter><Nav theme="dark" onToggleTheme={onToggle} /></MemoryRouter>);
    fireEvent.click(screen.getByLabelText('Toggle light/dark theme'));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('mobile menu is hidden by default', () => {
    renderNav();
    const mobMenu = document.querySelector('.mob-menu');
    expect(mobMenu).not.toHaveClass('open');
  });

  it('opens mobile menu on hamburger click', () => {
    renderNav();
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    const mobMenu = document.querySelector('.mob-menu');
    expect(mobMenu).toHaveClass('open');
  });

  it('closes mobile menu when a link is clicked', () => {
    renderNav();
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    const mobMenu = document.querySelector('.mob-menu');
    expect(mobMenu).toHaveClass('open');
    fireEvent.click(mobMenu.querySelector('a'));
    expect(mobMenu).not.toHaveClass('open');
  });

  it('adds scrolled class when window scrolls past 12px', () => {
    renderNav();
    const nav = document.querySelector('.nav');
    expect(nav).not.toHaveClass('scrolled');
    Object.defineProperty(window, 'scrollY', { value: 20, configurable: true });
    fireEvent.scroll(window);
    expect(nav).toHaveClass('scrolled');
  });
});
