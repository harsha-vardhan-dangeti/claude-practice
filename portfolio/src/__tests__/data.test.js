import { describe, it, expect } from 'vitest';
import { personal, hero, about, experience, projects, skills, certifications, talks } from '../data/portfolio';

describe('personal', () => {
  it('has required identity fields', () => {
    expect(personal.name).toBeTruthy();
    expect(personal.brand).toBeTruthy();
    expect(personal.title).toBeTruthy();
    expect(personal.email).toMatch(/@/);
    expect(personal.location).toBeTruthy();
    expect(personal.resumePdf).toMatch(/^(\/|https?:\/\/)/);
  });

  it('has valid linkedin shape', () => {
    expect(personal.linkedin.url).toMatch(/linkedin\.com/);
    expect(personal.linkedin.handle).toBeTruthy();
  });

  it('has valid github shape', () => {
    expect(personal.github.url).toMatch(/github\.com/);
    expect(personal.github.handle).toBeTruthy();
  });
});

describe('hero', () => {
  it('has badge text', () => {
    expect(hero.badge).toBeTruthy();
  });

  it('has tagline with bold and rest parts', () => {
    expect(hero.tagline.bold).toBeTruthy();
    expect(hero.tagline.rest).toBeTruthy();
  });

  it('has at least one stat with value and label', () => {
    expect(hero.stats.length).toBeGreaterThan(0);
    hero.stats.forEach(s => {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
    });
  });
});

describe('about', () => {
  it('has heading and paragraphs', () => {
    expect(about.heading).toBeTruthy();
    expect(about.paragraphs.length).toBeGreaterThan(0);
    about.paragraphs.forEach(p => expect(p).toBeTruthy());
  });

  it('has facts with label and value', () => {
    expect(about.facts.length).toBeGreaterThan(0);
    about.facts.forEach(f => {
      expect(f.label).toBeTruthy();
      expect(f.value).toBeTruthy();
    });
  });
});

describe('experience', () => {
  it('has at least one job', () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it('each job has required fields', () => {
    experience.forEach(job => {
      expect(job.role).toBeTruthy();
      expect(job.company).toBeTruthy();
      expect(job.dates).toBeTruthy();
      expect(typeof job.current).toBe('boolean');
      expect(Array.isArray(job.bullets)).toBe(true);
      expect(Array.isArray(job.tags)).toBe(true);
    });
  });

  it('exactly one job is current', () => {
    const current = experience.filter(j => j.current);
    expect(current.length).toBe(1);
  });
});

describe('projects', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required fields', () => {
    projects.forEach(p => {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(Array.isArray(p.tags)).toBe(true);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.icon).toBeTruthy();
    });
  });
});

describe('skills', () => {
  it('has at least one skill group', () => {
    expect(skills.length).toBeGreaterThan(0);
  });

  it('each group has a category and items', () => {
    skills.forEach(g => {
      expect(g.category).toBeTruthy();
      expect(Array.isArray(g.items)).toBe(true);
      expect(g.items.length).toBeGreaterThan(0);
    });
  });
});

describe('certifications', () => {
  it('is an array', () => {
    expect(Array.isArray(certifications)).toBe(true);
  });

  it('filled certs have issuer, name, date, url', () => {
    const filled = certifications.filter(c => c.name);
    filled.forEach(c => {
      expect(c.issuer).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.date).toBeTruthy();
      expect(c.url).toBeTruthy();
    });
  });
});

describe('talks', () => {
  it('has at least one talk', () => {
    expect(talks.length).toBeGreaterThan(0);
  });

  it('each talk has required fields', () => {
    talks.forEach(t => {
      expect(t.title).toBeTruthy();
      expect(t.meta).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.icon).toBeTruthy();
    });
  });
});
