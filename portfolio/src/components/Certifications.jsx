import { certifications } from '../data/portfolio';
import { IconExternal } from './Icons';

export default function Certifications() {
  const filled = certifications.filter(c => c.name);

  return (
    <section id="certifications" aria-label="Certifications">
      <div className="container">
        <div className="section-eyebrow r">/ certifications</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Certifications</h2>

        <div className="certs-grid">
          {filled.map((c, i) => (
            <div key={i} className={`cert-card r d${i + 1}`}>
              <div className="cert-issuer">{c.issuer}</div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-date">{c.date}</div>
              <a href={c.url} className="cert-link" target="_blank" rel="noopener">
                View credential <IconExternal />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
