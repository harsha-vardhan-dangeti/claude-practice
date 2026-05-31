import { Link } from 'react-router-dom';
import { personal, hero } from '../data/portfolio';
import { IconArrowRight, IconDownload } from './Icons';
import ProfileCard from './ProfileCard';

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-orb orb-1" aria-hidden="true" />
      <div className="hero-orb orb-2" aria-hidden="true" />

      <div className="container hero-grid">

        {/* ── LEFT ── */}
        <div className="hero-left">
          <div className="hero-badge stagger s1">{hero.badge}</div>

          <h1 className="hero-name stagger s2">
            {personal.nameLine1}<br />{personal.nameLine2}
          </h1>

          <p className="hero-tagline stagger s3">
            <strong>{hero.tagline.bold}</strong>{hero.tagline.rest}
          </p>

          <div className="hero-ctas stagger s4">
            <Link to="/projects" className="btn btn-primary">
              View Projects <IconArrowRight />
            </Link>
            <a href={personal.resumePdf} className="btn btn-ghost" target="_blank" rel="noopener">
              Resume PDF <IconDownload />
            </a>
          </div>

          <div className="hero-stats stagger s5" aria-label="Career highlights">
            {hero.stats.map((s, i) => (
              <div key={i} style={{ display: 'contents' }}>
                {i > 0 && <div className="stat-divider" aria-hidden="true" />}
                <div>
                  <div className="stat-val">{s.value}</div>
                  <div className="stat-lbl">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="hero-right stagger s3">
          <ProfileCard />
        </div>

      </div>
    </section>
  );
}
