import { Link } from 'react-router-dom';
import { experience } from '../data/portfolio';

// One-glance answer to "what do you do today?" for the home page.
export default function NowSnapshot() {
  const job = experience.find(j => j.current) ?? experience[0];
  if (!job) return null;

  return (
    <section className="now" aria-label="Current role">
      <div className="container now-grid">
        <div className="r d1">
          <h2 className="now-heading">Right now</h2>
          <p className="now-role">
            {job.role}<br />
            <span>{job.company} · {job.dates}</span>
          </p>
          <Link to="/experience" className="now-link">Full experience and education</Link>
        </div>
        <ul className="now-points r d2">
          {job.bullets.map(b => <li key={b}>{b}</li>)}
        </ul>
      </div>
    </section>
  );
}
