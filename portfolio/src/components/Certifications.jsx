import { personal } from '../data/portfolio';
import { useCreedlyData } from '../hooks/useCreedlyData';
import { IconExternal } from './Icons';

export default function Certifications() {
  const { badges } = useCreedlyData(personal.credly);

  return (
    <section id="certifications" aria-label="Certifications">
      <div className="container">
        <div className="section-eyebrow r">/ certifications</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Certifications</h2>

        <div className="certs-grid">
          {badges.map((c, i) => (
            <div key={i} className={`cert-card r d${i + 1}`}>
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
                <div className="cert-date">{c.date}</div>
                <a href={c.url} className="cert-link" target="_blank" rel="noopener">
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
