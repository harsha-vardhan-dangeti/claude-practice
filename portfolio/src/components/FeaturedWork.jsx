import { projects } from '../data/portfolio';
import { IconGithub, IconExternal } from './Icons';

const hostOf = url => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// Live, shipped projects — the strongest evidence on the site, so they get
// real screenshots and direct "open the app" links rather than icon buttons.
export default function FeaturedWork({ heading = 'Live projects', intro }) {
  const featured = projects.filter(p => p.featured);
  const withImage = featured.filter(p => p.image);
  const compact = featured.filter(p => !p.image);

  return (
    <section id="work" className="feat" aria-label="Live projects">
      <div className="container">
        <h2 className="r d1 feat-heading">{heading}</h2>
        <p className="r d2 feat-intro">
          {intro ?? 'Built and deployed end to end. Open them, click around, read the code.'}
        </p>

        <div className="feat-list">
          {withImage.map((p, i) => (
            <article key={p.title} className={`feat-case r${i % 2 ? ' flip' : ''}`}>
              <a
                href={p.demo}
                className="feat-shot"
                target="_blank"
                rel="noopener"
                aria-label={`Open ${p.title} live site`}
              >
                <div className="feat-bar" aria-hidden="true">
                  <span /><span /><span />
                  <em>{hostOf(p.demo)}</em>
                </div>
                <img src={p.image} alt={p.imageAlt} loading="lazy" width="1040" height="650" />
              </a>

              <div className="feat-body">
                <h3 className="feat-title">{p.title}</h3>
                <p className="feat-desc">{p.description}</p>
                {p.highlights?.length > 0 && (
                  <ul className="feat-points">
                    {p.highlights.map(h => <li key={h}>{h}</li>)}
                  </ul>
                )}
                <div className="tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="feat-actions">
                  <a href={p.demo} className="btn btn-primary" target="_blank" rel="noopener">
                    <IconExternal /> Open live site
                  </a>
                  {p.github && p.github !== '#' && (
                    <a href={p.github} className="btn btn-ghost" target="_blank" rel="noopener">
                      <IconGithub /> Read the code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          {compact.map(p => (
            <article key={p.title} className="feat-compact r">
              <div>
                <h3 className="feat-title">{p.title}</h3>
                <p className="feat-desc">{p.description}</p>
                <div className="tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="feat-actions">
                {p.github && p.github !== '#' && (
                  <a href={p.github} className="btn btn-primary" target="_blank" rel="noopener">
                    <IconGithub /> Read the code
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} className="btn btn-ghost" target="_blank" rel="noopener">
                    <IconExternal /> Live (sign-in required)
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
