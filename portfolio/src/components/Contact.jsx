import { personal } from '../data/portfolio';
import { IconEmail, IconLinkedIn, IconGithub } from './Icons';

export default function Contact() {
  return (
    <section id="contact" aria-label="Contact">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="contact-eyebrow r d1">Contact</div>

        <h2 className="r d1" style={{ marginBottom: '.625rem' }}>
          Let's build something.
        </h2>

        <p
          className="r d2"
          style={{
            fontSize: '1.0313rem',
            margin: '0 auto 2.5rem',
            maxWidth: '48ch',
          }}
        >
          Open to Full Stack & AI engineering roles — RAG pipelines,
          schema-aware agents, and production LLM infrastructure. Open to
          remote and hybrid arrangements.
        </p>

        <a
          href={`mailto:${personal.email}`}
          className="contact-email-btn r d2"
        >
          <IconEmail size={16} />
          {personal.email}
        </a>

        <div className="contact-divider r d3">
          <span className="contact-divider-line" />
          <span className="contact-divider-text">or find me on</span>
          <span className="contact-divider-line" />
        </div>

        <div className="contact-social-row r d3">
          <a
            href={personal.linkedin.url}
            className="contact-social-link"
            target="_blank"
            rel="noopener"
          >
            <IconLinkedIn size={14} />
            {personal.linkedin.handle}
          </a>
          <span className="contact-social-sep" aria-hidden="true" />
          <a
            href={personal.github.url}
            className="contact-social-link"
            target="_blank"
            rel="noopener"
          >
            <IconGithub size={14} />
            {personal.github.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
