import { personal } from '../data/portfolio';

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <p>
          {personal.name} · Hyderabad, India ·{' '}
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
        </p>
      </div>
    </footer>
  );
}
