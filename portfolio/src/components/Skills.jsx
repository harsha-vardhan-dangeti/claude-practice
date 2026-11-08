import { Fragment, useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { skills, strengths, experience, projects, siteBuild } from '../data/portfolio';
import { buildSkillIndex, mentionRegex } from '../lib/skillEvidence';
import { IconExternal, IconGithub } from './Icons';

const DEFAULT_SKILL = 'Ruby on Rails';

const KIND_LABEL = {
  role: 'Work',
  live: 'Live app',
  site: 'This site',
  project: 'Project',
};

function useMediaQuery(query) {
  const subscribe = useCallback(cb => {
    if (typeof window.matchMedia !== 'function') return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  }, [query]);
  return useSyncExternalStore(
    subscribe,
    () => typeof window.matchMedia === 'function' && window.matchMedia(query).matches,
    () => false,
  );
}

/** Wraps mentions of the skill in <mark> so the proof is easy to spot. */
function Highlighted({ text, skill }) {
  const parts = text.split(new RegExp(`(${mentionRegex(skill).source})`, 'gi'));
  return parts.map((part, i) =>
    i % 2 === 1 ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>,
  );
}

function ProofItem({ item, skill }) {
  return (
    <li className={`sk-proof-item sk-proof-item--${item.kind}`}>
      <span className="sk-kind">{KIND_LABEL[item.kind]}</span>
      <div className="sk-proof-title">{item.title}</div>
      {item.sub && <div className="sk-proof-sub">{item.sub}</div>}
      {item.detail && (
        <p className="sk-proof-detail"><Highlighted text={item.detail} skill={skill} /></p>
      )}
      <div className="sk-proof-links">
        {item.kind === 'role' && <Link to={item.to}>Full role</Link>}
        {item.kind === 'project' && <Link to={item.to}>See project</Link>}
        {item.demo && (
          <a href={item.demo} target="_blank" rel="noopener">
            {item.demoLocked ? 'Live (sign-in required)' : 'Open live site'} <IconExternal />
          </a>
        )}
        {item.github && (
          <a href={item.github} target="_blank" rel="noopener">
            Code <IconGithub />
          </a>
        )}
      </div>
    </li>
  );
}

function ProofPanel({ skill, evidence, inline = false }) {
  const { items, count, since } = evidence;
  return (
    <div
      className={`sk-panel${inline ? ' sk-panel--inline' : ''}`}
      aria-live="polite"
      aria-label={`Where I've used ${skill}`}
    >
      <div key={skill} className="sk-panel-inner">
        <h3 className="sk-panel-title">{skill}</h3>
        <p className="sk-panel-meta">
          {count === 0
            ? <span>Not in a public project yet. Happy to talk through how I&apos;ve used it.</span>
            : <span>Used in {count} {count === 1 ? 'place' : 'places'}</span>}
          {since && <span>In production since {since}</span>}
        </p>
        {count > 0 && (
          <ul className="sk-proof">
            {items.map((item, i) => <ProofItem key={i} item={item} skill={skill} />)}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const index = useMemo(
    () => buildSkillIndex(skills, { experience, projects, site: siteBuild }),
    [],
  );
  const firstSkill = skills[0]?.items[0];
  const [selected, setSelected] = useState(index[DEFAULT_SKILL] ? DEFAULT_SKILL : firstSkill);
  const narrow = useMediaQuery('(max-width: 860px)');

  const panel = selected && (
    <ProofPanel skill={selected} evidence={index[selected]} inline={narrow} />
  );

  return (
    <section id="skills" aria-label="Technical skills">
      <div className="container">
        <h2 className="sk-heading r d1">Skills and where I&apos;ve used them</h2>
        <p className="sk-intro r d2">
          Pick any skill to see the role or project behind it, with links you can check.
        </p>

        <div className="sk-strengths r d2">
          {strengths.map(s => (
            <div key={s.title} className="sk-strength">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="sk-explorer">
          <div className="sk-groups">
            <p className="sk-hint">Brighter skills show up in more of my work, and work counts double.</p>
            {skills.map(group => {
              const id = `sk-cat-${group.category.replace(/\W+/g, '-').toLowerCase()}`;
              return (
                <div key={group.category} className="sk-group" role="group" aria-labelledby={id}>
                  <h3 id={id} className="sk-cat">{group.category}</h3>
                  <div className="sk-chips">
                    {group.items.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        className={`sk-chip sk-chip--${index[skill].tier}`}
                        aria-pressed={selected === skill}
                        onClick={() => setSelected(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {narrow && group.items.includes(selected) && panel}
                </div>
              );
            })}
          </div>

          {!narrow && <aside className="sk-aside">{panel}</aside>}
        </div>
      </div>
    </section>
  );
}
