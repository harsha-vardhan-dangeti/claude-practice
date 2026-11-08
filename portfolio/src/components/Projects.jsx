import { projects } from '../data/portfolio';
import { ProjectIcon, IconGithub, IconExternal } from './Icons';

export default function Projects() {
  // Everything that isn't a featured live project (those render in FeaturedWork).
  const otherProjects = projects.filter(p => !p.featured);
  if (otherProjects.length === 0) return null;
  return (
    <section id="projects" aria-label="Projects">
      <div className="container">
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>AI engineering work</h2>

        <div className="projects-grid">
          {otherProjects.map((p, i) => (
            <article key={i} className={`proj-card r d${(i % 3) + 1}`}>
              <div className="proj-top">
                <div className="proj-icon" aria-hidden="true">
                  <ProjectIcon name={p.icon} />
                </div>
                <div className="proj-links">
                  {p.github && p.github !== '#' && (
                    <a href={p.github} className="proj-link" aria-label="GitHub repository" title="GitHub" target="_blank" rel="noopener">
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
