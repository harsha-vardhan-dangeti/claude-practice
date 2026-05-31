import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { personal } from '../data/portfolio';
import { IconSun, IconMoon, IconDownload } from './Icons';

const pages = [
  { path: '/',             label: 'Home',         end: true },
  { path: '/about',        label: 'About' },
  { path: '/experience',   label: 'Experience' },
  { path: '/projects',     label: 'Projects' },
  { path: '/skills',       label: 'Skills' },
  { path: '/achievements', label: 'Achievements' },
  { path: '/contact',      label: 'Contact' },
];

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Primary navigation">
        <div className="container nav-inner">
          <Link to="/" className="nav-brand">{personal.brand}</Link>

          <ul className="nav-links" role="list">
            {pages.map(p => (
              <li key={p.path}>
                <NavLink to={p.path} end={p.end ?? false}>
                  {p.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <button className="theme-btn" onClick={onToggleTheme} aria-label="Toggle light/dark theme">
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>

            <a href={personal.resumePdf} className="btn btn-primary nav-resume" target="_blank" rel="noopener" style={{ fontSize: '.8rem', padding: '.45rem 1rem' }}>
              Resume <IconDownload />
            </a>

            <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mob-menu${menuOpen ? ' open' : ''}`} role="navigation" aria-label="Mobile navigation">
        {pages.map(p => (
          <NavLink key={p.path} to={p.path} end={p.end ?? false} onClick={closeMenu}>
            {p.label}
          </NavLink>
        ))}
        <a href={personal.resumePdf} target="_blank" rel="noopener" className="btn btn-primary" style={{ marginTop: '.75rem', justifyContent: 'center' }} onClick={closeMenu}>
          Download Resume
        </a>
      </div>
    </>
  );
}
