import { talks } from '../data/portfolio';
import { TalkIcon } from './Icons';

export default function Talks() {
  return (
    <section id="talks" aria-label="Talks and achievements">
      <div className="container">
        <div className="section-eyebrow r">/ talks & achievements</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Talks & Achievements</h2>

        <div className="talks-list">
          {talks.map((t, i) => (
            <div key={i} className={`talk-card r d${i + 1}`}>
              <div className="talk-icon" aria-hidden="true">
                <TalkIcon name={t.icon} />
              </div>
              <div>
                <div className="talk-title">{t.title}</div>
                <div className="talk-meta">{t.meta}</div>
                <p className="talk-desc">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
