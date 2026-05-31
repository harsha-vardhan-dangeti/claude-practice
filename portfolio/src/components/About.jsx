import { about } from '../data/portfolio';
import Avatar from './Avatar';

export default function About() {
  return (
    <section id="about" aria-label="About">
      <div className="container">
        <div className="section-eyebrow r">/ about</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>{about.heading}</h2>

        <div className="about-grid">
          <div className="about-text">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={`r d${i + 1}`}>{p}</p>
            ))}
          </div>

          <aside className="about-card r d2" aria-label="Quick facts">
            <Avatar />
            {about.facts.map((f, i) => (
              <div key={i} className="about-row">
                <div className="row-lbl">{f.label}</div>
                <div className="row-val">
                  {f.highlight
                    ? <span className="avail-dot">{f.value}</span>
                    : f.value}
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
