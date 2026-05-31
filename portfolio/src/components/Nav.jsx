import { useState, useEffect } from 'react';
import { personal } from '../data/portfolio';
import { IconSun, IconMoon, IconDownload } from './Icons';

const navLinks = ['about', 'experience', 'projects', 'skills', 'contact'];

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
          <a href="#hero" className="nav-brand">{personal.brand}</a>

          <ul className="nav-links" role="list">
            {navLinks.map(id => (
              <li key={id}><a href={`#${id}`}>{id.charAt(0).toUpperCase() + id.slice(1)}</a></li>
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
        {['about','experience','projects','skills','certifications','talks','contact'].map(id => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <a href={personal.resumePdf} target="_blank" rel="noopener" className="btn btn-primary" style={{ marginTop: '.75rem', justifyContent: 'center' }} onClick={closeMenu}>
          Download Resume
        </a>
      </div>
    </>
  );
}
