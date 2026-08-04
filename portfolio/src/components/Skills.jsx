import { useState } from 'react';
import { skills } from '../data/portfolio';

const DICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

/* Skills that have an official Devicon SVG */
const DEVICON = {
  'Python':                `${DICON}/python/python-original.svg`,
  'Ruby':                  `${DICON}/ruby/ruby-original.svg`,
  'TypeScript':            `${DICON}/typescript/typescript-original.svg`,
  'JavaScript':            `${DICON}/javascript/javascript-original.svg`,
  'Ruby on Rails':         `${DICON}/rails/rails-original-wordmark.svg`,
  'FastAPI':               `${DICON}/fastapi/fastapi-original.svg`,
  'MySQL':                 `${DICON}/mysql/mysql-original.svg`,
  'Redis':                 `${DICON}/redis/redis-original.svg`,
  'Docker':                `${DICON}/docker/docker-original.svg`,
  'Git':                   `${DICON}/git/git-original.svg`,
  'GitHub Actions':        `${DICON}/github/github-original.svg`,
  'Google Cloud Services': `${DICON}/googlecloud/googlecloud-original.svg`,
  'AWS Services':          `${DICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  'React':                 `${DICON}/react/react-original.svg`,
  'Vite':                  `${DICON}/vitejs/vitejs-original.svg`,
};

/* Emoji badges for AI/ML tools and others without a Devicon.
   Emoji renders at full size inside the colored badge square —
   much more recognisable than 2-letter abbreviations. */
const EMOJI_BADGE = {
  'LangChain':         { emoji: '🦜', color: '#f97316' },
  'LlamaIndex':        { emoji: '🦙', color: '#a855f7' },
  'LangGraph':         { emoji: '🔗', color: '#3b82f6' },
  'RAGAS':             { emoji: '📊', color: '#22c55e' },
  'HyDE':              { emoji: '💡', color: '#ec4899' },
  'Graph RAG':         { emoji: '🕸️', color: '#f59e0b' },
  'Embeddings':        { emoji: '🔮', color: '#6366f1' },
  'MCP Protocol':      { emoji: '⚙️', color: '#14b8a6' },
  'LLM Observability': { emoji: '🔭', color: '#8b5cf6' },
  'Vector Search':     { emoji: '🔍', color: '#0ea5e9' },
  'Pinecone':          { emoji: '🌲', color: '#10b981' },
  'SQL':               { emoji: '🗄️', color: '#64748b' },
  'REST APIs':         { emoji: '🔌', color: '#64748b' },
  'React Router':      { emoji: '🧭', color: '#CA4245' },
  'HTML/CSS':          { emoji: '🎨', color: '#E34C26' },
  'RSpec':             { emoji: '🧪', color: '#DC143C' },
  'Vitest':            { emoji: '⚡', color: '#6E9F18' },
  'React Testing Library': { emoji: '🔬', color: '#E33332' },
};

/* Per-category config */
const CATEGORY_META = {
  'AI / ML':          { icon: '🤖', featured: true },
  'Languages':        { icon: '💻', featured: false },
  'Frontend':         { icon: '🖥️', featured: false },
  'Backend':          { icon: '⚡', featured: false },
  'Testing':          { icon: '🧪', featured: false },
  'Cloud & Data':     { icon: '☁️', featured: false },
  'Tools & Protocol': { icon: '🔧', featured: false },
};

function TechIcon({ name }) {
  const src = DEVICON[name];
  const emoji = EMOJI_BADGE[name];
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = src && !imgFailed;

  return (
    <div className="tech-icon">
      {showImg ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : emoji ? (
        <div
          className="tech-icon-badge tech-icon-badge--emoji"
          style={{ background: emoji.color }}
          title={name}
        >
          {emoji.emoji}
        </div>
      ) : (
        <div className="tech-icon-badge" style={{ background: '#64748b' }} title={name}>
          {name.slice(0, 3).toUpperCase()}
        </div>
      )}
      <span className="tech-icon-label">{name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-label="Technical skills">
      <div className="container">
        <div className="section-eyebrow r">/ skills</div>
        <h2 className="r d1" style={{ marginBottom: '2.5rem' }}>Technical Skills</h2>

        <div className="spotlight-grid">
          {skills.map((group, i) => {
            const meta = CATEGORY_META[group.category] ?? { icon: '📦', featured: false };
            return (
              <div
                key={group.category}
                className={`spotlight-card r d${(i % 4) + 1}${meta.featured ? ' featured' : ''}`}
              >
                {/* Header */}
                <div className="spotlight-hdr">
                  <div className="spotlight-cat-icon">{meta.icon}</div>
                  <div className="spotlight-cat-meta">
                    <div className="spotlight-cat-name">{group.category}</div>
                    <div className="spotlight-count">{group.items.length} technologies</div>
                  </div>
                </div>

                <div className="spotlight-divider" />

                {/* Icon grid */}
                <div className="spotlight-icons">
                  {group.items.map(item => (
                    <TechIcon key={item} name={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
