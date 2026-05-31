import { projects } from '../data/portfolio';
import { ProjectIcon, IconGithub, IconExternal } from './Icons';

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects">
      <div className="container">
        <div className="section-eyebrow r">/ projects</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Selected Work</h2>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={i} className={`proj-card r d${(i % 3) + 1}`}>
              <div className="proj-top">
                <div className="proj-icon" aria-hidden="true">
                  <ProjectIcon name={p.icon} />
                </div>
                <div className="proj-links">
                  {p.github && (
                    <a href={p.github} className="proj-link" aria-label="GitHub repository" title="GitHub">
                      <IconGithub />
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} className="proj-link" aria-label="Live demo" title="Live demo" target="_blank" rel="noopener">
                      <IconExternal />
                    </a>
                  )}
                </div>
              </div>
              <div className="proj-title">{p.title}</div>
              <p className="proj-desc">{p.description}</p>
              <div className="tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
