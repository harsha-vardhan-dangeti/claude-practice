import { personal, hero } from '../data/portfolio';
import { IconArrowRight, IconDownload, IconScrollDown } from './Icons';

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-orb orb-1" aria-hidden="true" />
      <div className="hero-orb orb-2" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-badge">{hero.badge}</div>

        <h1 className="hero-name">
          {personal.nameLine1}<br />{personal.nameLine2}
        </h1>

        <p className="hero-tagline">
          <strong>{hero.tagline.bold}</strong>{hero.tagline.rest}
        </p>

        <div className="hero-ctas">
          <a href="#projects" className="btn btn-primary">
            View Projects <IconArrowRight />
          </a>
          <a href={personal.resumePdf} className="btn btn-ghost" target="_blank" rel="noopener">
            Resume PDF <IconDownload />
          </a>
        </div>

        <div className="hero-stats" aria-label="Career highlights">
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

      <div className="scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <IconScrollDown />
      </div>
    </section>
  );
}
