import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  parseCredlyBadges, fetchCredlyBadges, parseCsv, toIsoDate,
  parseLinkedInCertsCsv, mergeCredentials, formatCertDate,
} from '../lib/credentials';
import handler from '../../api/credly.js';

const badge = (id, name, extra = {}) => ({
  id, public: true, state: 'accepted', issued_at_date: '2023-09-22',
  badge_template: { name, image_url: `https://img/${id}.png`, issuer: { entities: [{ entity: { name: 'IBM' } }] } },
  ...extra,
});

afterEach(() => vi.restoreAllMocks());

describe('parseCredlyBadges', () => {
  it('keeps public accepted badges and maps fields', () => {
    const out = parseCredlyBadges({ data: [
      badge('a', 'Docker'),
      badge('b', 'Hidden', { public: false }),
      badge('c', 'Pending', { state: 'pending' }),
    ] });
    expect(out).toEqual([{
      issuer: 'IBM', name: 'Docker', date: '2023-09-22',
      url: 'https://www.credly.com/badges/a', image: 'https://img/a.png', source: 'credly',
    }]);
  });

  it('survives malformed input', () => {
    expect(parseCredlyBadges(null)).toEqual([]);
    expect(parseCredlyBadges({ data: [{ id: 'x', public: true, state: 'accepted' }] })).toEqual([]);
  });
});

describe('fetchCredlyBadges', () => {
  it('follows pagination', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: [badge('a', 'One')], metadata: { next_page_url: 'https://www.credly.com/p2' } }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: [badge('b', 'Two')], metadata: { next_page_url: null } }) });
    const out = await fetchCredlyBadges('me');
    expect(out.map(b => b.name)).toEqual(['One', 'Two']);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe('https://www.credly.com/users/me/badges.json');
  });

  it('throws with the HTTP status on failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 404 });
    await expect(fetchCredlyBadges('me')).rejects.toMatchObject({ status: 404 });
  });
});

describe('parseCsv', () => {
  it('handles quotes, escaped quotes, commas, CRLF and a BOM', () => {
    const csv = '\uFEFFName,Url\r\n"Agents, Part 1","say ""hi"""\r\nPlain,\r\n';
    expect(parseCsv(csv)).toEqual([['Name', 'Url'], ['Agents, Part 1', 'say "hi"'], ['Plain', '']]);
  });
});

describe('toIsoDate', () => {
  it('normalises LinkedIn and ISO dates', () => {
    expect(toIsoDate('Sep 2023')).toBe('2023-09');
    expect(toIsoDate('September 2023')).toBe('2023-09');
    expect(toIsoDate('2023-09-22')).toBe('2023-09-22');
    expect(toIsoDate('2021')).toBe('2021');
    expect(toIsoDate('')).toBe('');
  });
});

describe('parseLinkedInCertsCsv', () => {
  const csv = [
    'Name,Url,Authority,Started On,Finished On,License Number',
    '"AI Agents, Part 1",https://ex.com/c/1,DeepLearning.AI,Oct 2026,,X1',
    'No Url Course,,Coursera,,Nov 2026,',
    ',,,,,',
  ].join('\n');

  it('maps rows and falls back to Finished On for the date', () => {
    expect(parseLinkedInCertsCsv(csv)).toEqual([
      { issuer: 'DeepLearning.AI', name: 'AI Agents, Part 1', date: '2026-10', url: 'https://ex.com/c/1', image: null, source: 'linkedin' },
      { issuer: 'Coursera', name: 'No Url Course', date: '2026-11', url: null, image: null, source: 'linkedin' },
    ]);
  });

  it('rejects files that are not a certifications export', () => {
    expect(() => parseLinkedInCertsCsv('Foo,Bar\n1,2')).toThrow(/Certifications\.csv/);
  });
});

describe('mergeCredentials', () => {
  it('dedupes by URL or name + issuer, earlier lists win, newest first', () => {
    const credly = [{ name: 'Docker Essentials', issuer: 'IBM', date: '2023-09-22', url: 'https://www.credly.com/badges/a', source: 'credly' }];
    const manual = [
      { name: 'Docker Essentials', issuer: 'IBM', date: '2023-09-22', url: 'https://credly.com/badges/a/', source: 'manual' },
      { name: 'PromptWars', issuer: 'Google', date: '2026-06-02', url: null },
    ];
    const linkedin = [
      { name: 'docker essentials', issuer: 'ibm', date: '2023-09', url: null, source: 'linkedin' },
      { name: 'LangGraph', issuer: 'DeepLearning.AI', date: '2026-10', url: null },
    ];
    const out = mergeCredentials(credly, manual, linkedin);
    expect(out.map(c => c.name)).toEqual(['LangGraph', 'PromptWars', 'Docker Essentials']);
    expect(out.find(c => c.name === 'Docker Essentials').source).toBe('credly');
  });
});

describe('formatCertDate', () => {
  it('formats for display', () => {
    expect(formatCertDate('2023-09-22')).toBe('Sep 2023');
    expect(formatCertDate('2026-11')).toBe('Nov 2026');
    expect(formatCertDate('2021')).toBe('2021');
    expect(formatCertDate('')).toBe('');
  });
});

describe('api/credly handler', () => {
  const res = () => {
    const r = { headers: {} };
    r.setHeader = (k, v) => { r.headers[k] = v; };
    r.status = code => { r.code = code; return r; };
    r.json = body => { r.body = body; return r; };
    return r;
  };

  it('returns parsed badges with an edge cache header', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ data: [badge('a', 'Docker')], metadata: {} }) });
    const r = res();
    await handler({ query: {} }, r);
    expect(r.code).toBe(200);
    expect(r.body.badges[0].name).toBe('Docker');
    expect(r.headers['Cache-Control']).toMatch(/s-maxage=3600/);
  });

  it('does not cache failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 503 });
    const r = res();
    await handler({ query: {} }, r);
    expect(r.code).toBe(503);
    expect(r.headers['Cache-Control']).toBe('no-store');
  });
});
