import { describe, it, expect } from 'vitest';
import { evidenceFor, mentionRegex, normalize, tierFor, buildSkillIndex } from '../lib/skillEvidence';
import { skills, experience, projects, siteBuild } from '../data/portfolio';

const sources = {
  experience: [
    { role: 'Dev', company: 'Acme', dates: '2022 — 2025 · ~3 yrs', tags: ['Ruby on Rails', 'Rspec'], bullets: ['Shipped Rails APIs.', 'Cached with Redis.'] },
  ],
  projects: [
    { title: 'Live thing', description: 'A PWA. Second sentence.', tags: ['React', 'GCP'], demo: 'https://x.app', github: 'https://github.com/x', highlights: ['Uses React Router for pages'] },
    { title: 'Idea', description: 'Built with BigQuery ML. More.', tags: ['BigQuery ML'], demo: null, github: '#' },
  ],
  site: { title: 'This site', detail: 'Tested with Vitest.', tags: ['Vitest'] },
};

describe('normalize', () => {
  it('folds aliases and case', () => {
    expect(normalize('GCP')).toBe('google cloud');
    expect(normalize('Rspec')).toBe(normalize('RSpec'));
    expect(normalize('REST API')).toBe('rest apis');
  });
});

describe('mentionRegex', () => {
  it('matches whole words only', () => {
    expect(mentionRegex('SQL').test('MySQL and PostgreSQL')).toBe(false);
    expect(mentionRegex('SQL').test('manual SQL queries')).toBe(true);
    expect(mentionRegex('Git').test('GitHub')).toBe(false);
  });

  it('matches synonyms', () => {
    expect(mentionRegex('Ruby on Rails').test('Shipped Rails features')).toBe(true);
  });
});

describe('evidenceFor', () => {
  it('finds roles by tag alias and quotes the matching bullet', () => {
    const e = evidenceFor('Redis', sources);
    expect(e.items[0]).toMatchObject({ kind: 'role', title: 'Dev', sub: 'Acme, 2022 — 2025', detail: 'Cached with Redis.' });
    expect(e.since).toBe(2022);
    expect(evidenceFor('RSpec', sources).count).toBe(1);
  });

  it('orders roles, then live apps, then this site, then other projects', () => {
    const e = evidenceFor('React', { ...sources, site: { ...sources.site, tags: ['React'] } });
    expect(e.items.map(i => i.kind)).toEqual(['live', 'site']);
  });

  it('prefers a matching highlight, else the first sentence', () => {
    expect(evidenceFor('React Router', sources).items[0].detail).toBe('Uses React Router for pages');
    expect(evidenceFor('Google Cloud', sources).items[0].detail).toBe('A PWA.');
  });

  it('drops placeholder GitHub links and routes unlinked projects to /projects', () => {
    const [item] = evidenceFor('BigQuery', sources).items;
    expect(item).toMatchObject({ kind: 'project', github: null, to: '/projects' });
  });

  it('returns an empty, honest result for unknown skills', () => {
    expect(evidenceFor('Pinecone', sources)).toEqual({ items: [], count: 0, since: null, tier: 'none' });
  });
});

describe('tierFor', () => {
  it('counts work roles double', () => {
    expect(tierFor([{ kind: 'role' }, { kind: 'role' }])).toBe('high');
    expect(tierFor([{ kind: 'role' }])).toBe('mid');
    expect(tierFor([{ kind: 'live' }])).toBe('low');
    expect(tierFor([])).toBe('none');
  });
});

describe('real portfolio data', () => {
  const index = buildSkillIndex(skills, { experience, projects, site: siteBuild });

  it('has an entry for every listed skill', () => {
    skills.forEach(g => g.items.forEach(s => expect(index[s]).toBeDefined()));
  });

  it('ranks the core production skills in the top tier', () => {
    ['Ruby on Rails', 'Python'].forEach(s => expect(index[s].tier).toBe('high'));
  });
});

describe('quote choice', () => {
  it('prefers a description sentence that names the skill over a highlight', () => {
    const e = evidenceFor('Postgres', {
      projects: [{ title: 'P', description: 'An app. Uses Postgres with RLS.', tags: [], highlights: ['Postgres demo mode'], demo: null }],
    });
    expect(e.items[0].detail).toBe('Uses Postgres with RLS.');
  });

  it('does not split sentences inside names like Next.js', () => {
    const e = evidenceFor('Supabase', { projects: [{ title: 'J', description: 'Tracker on Next.js and Supabase. More.', tags: [], demo: null }] });
    expect(e.items[0].detail).toBe('Tracker on Next.js and Supabase.');
  });
});
