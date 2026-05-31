import { skills } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" aria-label="Technical skills">
      <div className="container">
        <div className="section-eyebrow r">/ skills</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Technical Skills</h2>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <div key={i} className={`skill-group r d${(i % 3) + 1}`}>
              <div className="skill-grp-title">{group.category}</div>
              <div className="skill-pills">
                {group.items.map(item => (
                  <span key={item} className="skill-pill">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
