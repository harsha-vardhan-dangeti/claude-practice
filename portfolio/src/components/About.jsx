import { about, personal } from '../data/portfolio';

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
            {/* Banner photo */}
            <div className="about-banner">
              <img
                src={personal.avatar}
                alt={personal.name}
                className="about-banner-img"
              />
              <div className="about-banner-gradient" />
              <div className="about-banner-badge">Open to AI/ML roles</div>
            </div>

            {/* Info body */}
            <div className="about-body">
              <div className="about-person-name">{personal.name}</div>
              <div className="about-person-role">Software Developer → AI Engineer</div>
              {about.facts.filter(f => !f.highlight).map((f, i) => (
                <div key={i} className="about-row">
                  <div className="row-lbl">{f.label}</div>
                  <div className="row-val">{f.value}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
