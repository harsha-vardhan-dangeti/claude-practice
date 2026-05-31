import { personal } from '../data/portfolio';
import { IconEmail, IconLinkedIn, IconGithub } from './Icons';

export default function Contact() {
  const cards = [
    {
      href: `mailto:${personal.email}`,
      icon: <IconEmail />,
      type: 'Email',
      value: personal.email,
    },
    {
      href: personal.linkedin.url,
      icon: <IconLinkedIn />,
      type: 'LinkedIn',
      value: personal.linkedin.handle,
      external: true,
    },
    {
      href: personal.github.url,
      icon: <IconGithub size={20} />,
      type: 'GitHub',
      value: personal.github.handle,
      external: true,
    },
  ];

  return (
    <section id="contact" aria-label="Contact">
      <div className="container">
        <div className="section-eyebrow r">/ contact</div>
        <h2 className="r d1" style={{ marginBottom: '.625rem' }}>Get in Touch</h2>
        <p className="r d2" style={{ fontSize: '1.0313rem', marginBottom: '2.5rem', maxWidth: '48ch' }}>
          Interested in AI engineering roles or want to discuss RAG systems, agents, or production LLM deployment.
        </p>

        <div className="contact-grid">
          {cards.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className={`contact-card r d${i + 1}`}
              {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <div className="contact-ico" aria-hidden="true">{c.icon}</div>
              <span className="contact-type">{c.type}</span>
              <span className="contact-val">{c.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
