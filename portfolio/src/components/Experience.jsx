import { experience } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" aria-label="Work experience">
      <div className="container">
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
      </div>
    </section>
  );
}
