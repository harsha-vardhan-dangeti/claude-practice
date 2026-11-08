// Builds "where have I used this?" evidence for every skill by matching skill
// names against experience and project tags and text. Pure: no React, no DOM.

// Tag spellings that mean the same skill.
const ALIASES = {
  'gcp': 'google cloud',
  'google cloud services': 'google cloud',
  'aws services': 'aws',
  'rest api': 'rest apis',
  'bigquery ml': 'bigquery',
};

// Extra words that count as a mention of a skill in prose.
const SYNONYMS = {
  'Ruby on Rails': ['Rails'],
  'Ruby': ['Rails'],
  'MCP Protocol': ['MCP', 'Model Context Protocol'],
  'LLM Observability': ['observability'],
  'REST APIs': ['REST API'],
  'Google Cloud': ['GCP'],
};

export const normalize = s => {
  const k = String(s).trim().toLowerCase();
  return ALIASES[k] ?? k;
};

const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Every term that counts as a mention of `skill` in prose. */
export const termsFor = skill => [skill, ...(SYNONYMS[skill] ?? [])];

/** Case-insensitive whole-word matcher for a skill and its synonyms. */
export function mentionRegex(skill, flags = 'i') {
  const alt = termsFor(skill)
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join('|');
  return new RegExp(`(?<![A-Za-z0-9])(?:${alt})(?![A-Za-z0-9])`, flags);
}

const hasTag = (tags = [], skill) => tags.some(t => normalize(t) === normalize(skill));

const firstSentence = s => {
  const m = String(s).match(/^.+?[.!?](\s|$)/);
  return (m ? m[0] : String(s)).trim();
};

const sentences = s => String(s).split(/(?<=[.!?])\s+/).filter(Boolean);

const startYear = dates => {
  const m = String(dates).match(/\d{4}/);
  return m ? Number(m[0]) : null;
};

// Work roles count double: production use says more than a side project.
export function tierFor(items) {
  const score = items.reduce((n, i) => n + (i.kind === 'role' ? 2 : 1), 0);
  if (score >= 4) return 'high';
  if (score >= 2) return 'mid';
  if (score === 1) return 'low';
  return 'none';
}

/**
 * Evidence for one skill, most convincing first: work roles, live apps,
 * this site, then other projects.
 */
export function evidenceFor(skill, { experience = [], projects = [], site = null } = {}) {
  const re = mentionRegex(skill);
  const items = [];

  experience.forEach(job => {
    const bullet = (job.bullets ?? []).find(b => re.test(b));
    if (!hasTag(job.tags, skill) && !bullet) return;
    items.push({
      kind: 'role',
      title: job.role,
      sub: `${job.company}, ${String(job.dates).split('·')[0].trim()}`,
      detail: bullet ?? null,
      year: startYear(job.dates),
      to: '/experience',
    });
  });

  const live = [];
  const other = [];
  projects.forEach(p => {
    const text = [p.title, p.description, ...(p.highlights ?? [])].join(' ');
    if (!hasTag(p.tags, skill) && !re.test(text)) return;
    // Best quote: a description sentence naming the skill, then a highlight
    // naming it, then the description's opening sentence.
    const sentence = sentences(p.description).find(t => re.test(t));
    const highlight = (p.highlights ?? []).find(h => re.test(h));
    const github = p.github && p.github !== '#' ? p.github : null;
    const entry = {
      title: p.title,
      detail: sentence ?? highlight ?? firstSentence(p.description),
      github,
    };
    if (p.demo) live.push({ ...entry, kind: 'live', demo: p.demo, demoLocked: !!p.demoLocked });
    else other.push({ ...entry, kind: 'project', to: '/projects' });
  });

  items.push(...live);
  if (site && (hasTag(site.tags, skill) || re.test(site.detail))) {
    items.push({ kind: 'site', title: site.title, detail: site.detail });
  }
  items.push(...other);

  const years = items.map(i => i.year).filter(Boolean);
  return {
    items,
    count: items.length,
    since: years.length ? Math.min(...years) : null,
    tier: tierFor(items),
  };
}

/** { [skill]: evidence } for every skill in the grouped skills list. */
export function buildSkillIndex(skillGroups, sources) {
  const index = {};
  skillGroups.forEach(g => g.items.forEach(skill => {
    index[skill] = evidenceFor(skill, sources);
  }));
  return index;
}
