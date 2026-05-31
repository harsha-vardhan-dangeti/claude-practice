import { experience, education } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" aria-label="Work experience and education">
      <div className="container">

        {/* ── Work History ── */}
        <div className="section-eyebrow r">/ experience</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Work History</h2>

        <div className="timeline">
          {experience.map((job, i) => (
            <article key={i} className={`tl-item r d${i + 1}`}>
              <div className={`tl-dot${job.current ? '' : ' inactive'}`} />
              <div className="tl-role">{job.role}</div>
              <div className="tl-meta">
                <span className="tl-company">{job.company}</span>
                <span className="tl-dates">{job.dates}</span>
              </div>
              <ul className="tl-bullets">
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <div className="tags">
                {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>

        {/* ── Education ── */}
        <div className="edu-divider r" />
        <div className="section-eyebrow r" style={{ marginTop: '3.5rem' }}>/ education</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Education</h2>

        <div className="timeline">
          {education.map((edu, i) => (
            <article key={i} className={`tl-item r d${i + 1}`}>
              <div className="tl-dot inactive" />
              <div className="tl-role">{edu.degree}</div>
              <div className="tl-meta">
                <span className="tl-company">{edu.institution}</span>
                {edu.location && <span className="tl-dates">{edu.location}</span>}
                <span className="tl-dates">{edu.dates}</span>
              </div>
              {(edu.field || edu.grade) && (
                <ul className="tl-bullets" style={{ marginBottom: edu.highlights.length ? '.875rem' : 0 }}>
                  {edu.field && <li>{edu.field}</li>}
                  {edu.grade && <li>{edu.grade}</li>}
                </ul>
              )}
              {edu.highlights.length > 0 && (
                <ul className="tl-bullets">
                  {edu.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
