#!/usr/bin/env node
// Import certifications from LinkedIn's official data export.
//
// LinkedIn has no public API for reading your certifications, so the
// supported route is: LinkedIn → Settings → Data privacy → Get a copy of your
// data → pick "Certifications" (or the full archive) → download the .zip.
//
// Usage:
//   npm run import:linkedin -- ~/Downloads/Basic_LinkedInDataExport_11-09-2026.zip
//   npm run import:linkedin -- path/to/Certifications.csv
//   npm run import:linkedin -- path/to/unzipped-export-folder
//   add --dry-run to preview without writing
//
// New courses are added to src/data/linkedin-certifications.json. Anything
// already shown from Credly or portfolio.js is skipped. Commit and push to
// publish.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseLinkedInCertsCsv, mergeCredentials, fetchCredlyBadges } from '../src/lib/credentials.js';
import { certifications as manualCerts, personal } from '../src/data/portfolio.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src/data/linkedin-certifications.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const input = args.find(a => !a.startsWith('--'));

if (!input) {
  console.error('Usage: npm run import:linkedin -- <LinkedIn export .zip | Certifications.csv | folder> [--dry-run]');
  process.exit(1);
}

function findCsvInDir(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      const hit = findCsvInDir(p);
      if (hit) return hit;
    } else if (/^certifications\.csv$/i.test(name)) return p;
  }
  return null;
}

function readCsv(path) {
  const abs = resolve(path.replace(/^~(?=\/|$)/, process.env.HOME ?? '~'));
  if (!existsSync(abs)) throw new Error(`Not found: ${abs}`);
  if (statSync(abs).isDirectory()) {
    const csv = findCsvInDir(abs);
    if (!csv) throw new Error(`No Certifications.csv inside ${abs}`);
    return readFileSync(csv, 'utf8');
  }
  if (/\.zip$/i.test(abs)) {
    const listing = execFileSync('unzip', ['-Z1', abs], { encoding: 'utf8' });
    const entry = listing.split('\n').find(n => /(^|\/)certifications\.csv$/i.test(n.trim()));
    if (!entry) throw new Error('This export has no Certifications.csv. Request it again with "Certifications" ticked.');
    return execFileSync('unzip', ['-p', abs, entry.trim()], { encoding: 'utf8' });
  }
  return readFileSync(abs, 'utf8');
}

try {
  const fromLinkedIn = parseLinkedInCertsCsv(readCsv(input));
  const existing = existsSync(outFile) ? JSON.parse(readFileSync(outFile, 'utf8')) : [];

  // Everything the site already shows without this file: live Credly + portfolio.js.
  let credly = [];
  try { credly = await fetchCredlyBadges(personal.credly); }
  catch { console.warn('Could not reach Credly; checking duplicates against portfolio.js only.'); }
  const elsewhere = mergeCredentials(credly, manualCerts);
  const isElsewhere = c => mergeCredentials(elsewhere, [c]).length === elsewhere.length;

  // Keep earlier imports, add new courses, drop anything already shown elsewhere.
  const finalList = mergeCredentials(existing, fromLinkedIn).filter(c => !isElsewhere(c));
  const key = c => `${c.name}|${c.issuer}`.toLowerCase();
  const before = new Set(existing.map(key));
  const added = finalList.filter(c => !before.has(key(c)));
  const skipped = fromLinkedIn.filter(isElsewhere).length;

  console.log(`LinkedIn export: ${fromLinkedIn.length} certifications`);
  console.log(`Already on the site (Credly / portfolio.js): ${skipped}`);
  console.log(added.length ? `New: ${added.length}` : 'New: none, the site is up to date');
  added.forEach(c => console.log(`  + ${c.name}${c.issuer ? ` (${c.issuer})` : ''}${c.date ? `, ${c.date}` : ''}`));

  if (dryRun) {
    console.log('\nDry run: nothing written.');
  } else if (added.length || finalList.length !== existing.length) {
    writeFileSync(outFile, JSON.stringify(finalList, null, 2) + '\n');
    console.log(`\nWrote ${finalList.length} entries to src/data/linkedin-certifications.json. Commit and push to publish.`);
  }
} catch (e) {
  console.error(`Import failed: ${e.message}`);
  process.exit(1);
}
