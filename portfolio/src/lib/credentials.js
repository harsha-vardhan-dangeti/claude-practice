// Certifications from three sources, merged into one list:
//   1. Credly (live, via /api/credly)            — automatic
//   2. certifications in src/data/portfolio.js    — hand-added extras
//   3. src/data/linkedin-certifications.json      — `npm run import:linkedin`
// Pure functions only, shared by the browser, the serverless function and the
// import script.

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Credly badges.json → [{ issuer, name, date, url, image, source }] */
export function parseCredlyBadges(json) {
  return (json?.data ?? [])
    .filter(b => b.public && b.state === 'accepted')
    .map(b => ({
      issuer: b.badge_template?.issuer?.entities?.[0]?.entity?.name ?? '',
      name:   b.badge_template?.name ?? '',
      date:   b.issued_at_date ?? '',
      url:    `https://www.credly.com/badges/${b.id}`,
      image:  b.badge_template?.image_url ?? null,
      source: 'credly',
    }))
    .filter(b => b.name);
}

const CREDLY_TIMEOUT_MS = 6000;

/** Fetch every public Credly badge for a user (follows pagination). */
export async function fetchCredlyBadges(username, { maxPages = 5 } = {}) {
  let url = `https://www.credly.com/users/${encodeURIComponent(username)}/badges.json`;
  const all = [];
  for (let page = 0; url && page < maxPages; page++) {
    const res = await fetch(url, {
      headers: { Accept: 'application/json', 'User-Agent': 'portfolio-credly-sync' },
      signal: AbortSignal.timeout(CREDLY_TIMEOUT_MS),
    });
    if (!res.ok) {
      const err = new Error(`Credly ${res.status}`);
      err.status = res.status;
      throw err;
    }
    const json = await res.json();
    all.push(...parseCredlyBadges(json));
    url = json?.metadata?.next_page_url || null;
  }
  return all;
}

/** Minimal RFC 4180 CSV parser (quoted fields, escaped quotes, CRLF). */
export function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  const src = String(text).replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(v => v.trim() !== ''));
}

/** "Sep 2023" | "September 2023" | "2023-09-22" | "2023" → sortable ISO-ish string. */
export function toIsoDate(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return '';
  if (/^\d{4}(-\d{2}){0,2}$/.test(s)) return s;
  const m = s.match(/^([A-Za-z]{3})[A-Za-z]*\.?\s+(\d{4})$/);
  if (m) {
    const idx = MONTHS.indexOf(m[1].toLowerCase());
    if (idx >= 0) return `${m[2]}-${String(idx + 1).padStart(2, '0')}`;
  }
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? s : d.toISOString().slice(0, 10);
}

/** LinkedIn data export Certifications.csv → [{ issuer, name, date, url, source }] */
export function parseLinkedInCertsCsv(text) {
  const [header, ...rows] = parseCsv(text);
  if (!header) return [];
  const col = name => header.findIndex(h => h.trim().toLowerCase() === name);
  const iName = col('name'), iUrl = col('url'), iAuth = col('authority');
  const iStart = col('started on'), iEnd = col('finished on');
  if (iName < 0) throw new Error('Not a LinkedIn Certifications.csv (no "Name" column)');
  return rows
    .map(r => ({
      issuer: (r[iAuth] ?? '').trim(),
      name:   (r[iName] ?? '').trim(),
      date:   toIsoDate(r[iStart] || r[iEnd]),
      url:    (r[iUrl] ?? '').trim() || null,
      image:  null,
      source: 'linkedin',
    }))
    .filter(c => c.name);
}

const squash = s => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const urlKey = u => {
  if (!u) return null;
  try {
    const x = new URL(u);
    return (x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/+$/, '')).toLowerCase();
  } catch { return null; }
};

/**
 * Merge lists in priority order (earlier lists win on duplicates), then sort
 * newest first. Duplicates match on credential URL or on name + issuer.
 */
export function mergeCredentials(...lists) {
  const seenUrl = new Set(), seenName = new Set(), out = [];
  lists.flat().forEach(c => {
    if (!c?.name) return;
    const u = urlKey(c.url);
    const n = `${squash(c.name)}|${squash(c.issuer)}`;
    if ((u && seenUrl.has(u)) || seenName.has(n)) return;
    if (u) seenUrl.add(u);
    seenName.add(n);
    out.push(c);
  });
  return out.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

/** "2023-09-22" | "2023-09" → "Sep 2023"; "2023" → "2023"; anything else unchanged. */
export function formatCertDate(date) {
  const m = String(date ?? '').match(/^(\d{4})(?:-(\d{2}))?/);
  if (!m) return String(date ?? '');
  if (!m[2]) return m[1];
  const mon = MONTHS[Number(m[2]) - 1];
  return mon ? `${mon[0].toUpperCase()}${mon.slice(1)} ${m[1]}` : m[1];
}
