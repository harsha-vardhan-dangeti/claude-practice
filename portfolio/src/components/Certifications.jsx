import { personal } from '../data/portfolio';
import { useCertifications } from '../hooks/useCertifications';
import { formatCertDate } from '../lib/credentials';
import { IconExternal } from './Icons';

// LinkedIn courses without their own credential URL link to the profile list.
const linkedinCertsPage = `${personal.linkedin.url.replace(/\/+$/, '')}/details/certifications/`;

export default function Certifications() {
  const { certifications } = useCertifications(personal.credly);

  return (
    <section id="certifications" aria-label="Certifications">
      <div className="container">
        <div className="section-eyebrow r">/ certifications</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Certifications</h2>

        <div className="certs-grid">
          {certifications.map((c, i) => (
            <div key={c.url || `${c.name}-${c.issuer}`} className={`cert-card r d${(i % 4) + 1}`}>
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name}
                  className="cert-badge-img"
                  loading="lazy"
                />
              ) : c.badge ? (
                <div className="cert-badge-emoji">{c.badge}</div>
              ) : null}
              <div className="cert-body">
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-name">{c.name}</div>
                {c.date && <div className="cert-date">{formatCertDate(c.date)}</div>}
                <a href={c.url || linkedinCertsPage} className="cert-link" target="_blank" rel="noopener">
                  View credential <IconExternal />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
