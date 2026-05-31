import { personal, about } from '../data/portfolio';
import { IconGithub, IconLinkedIn, IconEmail } from './Icons';

export default function ProfileCard() {
  const statusFact = about.facts.find(f => f.highlight);

  return (
    <div className="profile-card">
      <div className="pc-top">
        <div className="pc-avatar-ring">
          {personal.avatar ? (
            <img src={personal.avatar} alt={personal.name} className="pc-avatar-img" />
          ) : (
            <div className="pc-avatar-inner">{personal.initials}</div>
          )}
        </div>
        <div className="pc-name">
          <h3>{personal.name}</h3>
          <span>{personal.title}</span>
        </div>
      </div>

      <div className="pc-row">
        <div className="pc-label">Status</div>
        <span className="pc-status-dot">{statusFact?.value}</span>
      </div>

      <div className="pc-row">
        <div className="pc-label">Stack</div>
        <div className="pc-tags">
          {personal.profileStack.map(t => (
            <span key={t} className="pc-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="pc-row">
        <div className="pc-label">Location</div>
        <div className="pc-value">{personal.locationShort}</div>
      </div>

      <div className="pc-social">
        <a href={personal.github.url} className="social-btn" title="GitHub" target="_blank" rel="noopener" aria-label="GitHub">
          <IconGithub size={14} />
        </a>
        <a href={personal.linkedin.url} className="social-btn" title="LinkedIn" target="_blank" rel="noopener" aria-label="LinkedIn">
          <IconLinkedIn size={14} />
        </a>
        <a href={`mailto:${personal.email}`} className="social-btn" title="Email" aria-label="Email">
          <IconEmail size={14} />
        </a>
      </div>
    </div>
  );
}
