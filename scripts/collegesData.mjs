/**
 * collegesData.mjs — parses src/data/colleges.ts (one object per line) so the
 * sitemap & prerender scripts (.mjs, can't import .ts) can enumerate the
 * /colleges, /colleges/:state and /colleges/:state/:slug routes with real meta.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

// A quoted string field. The value may contain an ESCAPED apostrophe — several
// `about` texts read `One of India\'s largest ...` — so the capture must consume
// `\'` rather than treat it as the closing quote. The naive `'([^']*)'` stopped
// dead at the backslash and shipped "One of India\" as the college's entire
// description on the live page.
function field(line, key) {
  const m = line.match(new RegExp(`${key}: '((?:[^'\\\\]|\\\\.)*)'`));
  return m ? m[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\') : '';
}
// Unquoted numeric field (e.g. `nirf: 12,`); returns null for `nirf: null` or absent.
function numField(line, key) {
  const m = line.match(new RegExp(`${key}:\\s*(\\d+)`));
  return m ? Number(m[1]) : null;
}
// Array field written either as `key: J('a', 'b')` or `key: ['a', 'b']`.
// Robust to parentheses/brackets INSIDE the quoted values (e.g.
// `admissionSteps: J('JAC Delhi (women) registration', ...)`): we match a run of
// quoted strings (honouring \' escapes), which naturally stops at the closing
// `)`/`]` — a plain `[^)]*` capture would truncate at the first inner paren.
function arrField(line, key) {
  const m = line.match(new RegExp(`${key}:\\s*(?:J\\(|\\[)((?:\\s*'(?:[^'\\\\]|\\\\.)*'\\s*,?)*)`));
  if (!m) return [];
  return [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => x[1].replace(/\\'/g, "'"));
}

export function getCollegesManifest(root) {
  const txt = readFileSync(path.join(root, 'src', 'data', 'colleges.ts'), 'utf8');
  const states = [];
  const colleges = [];

  for (const line of txt.split('\n')) {
    if (!/slug: '/.test(line)) continue;
    const slug = field(line, 'slug');
    if (line.includes('emoji:') && line.includes('blurb:')) {
      states.push({ slug, name: field(line, 'name'), emoji: field(line, 'emoji'), blurb: field(line, 'blurb') });
    } else if (line.includes('city:') && line.includes('state:')) {
      colleges.push({
        slug,
        name: field(line, 'name'),
        shortName: field(line, 'shortName') || field(line, 'name'),
        city: field(line, 'city'),
        stateName: field(line, 'state'),
        type: field(line, 'type'),
        established: numField(line, 'established'),
        nirf: numField(line, 'nirf'),
        // Below rank 100 NIRF publishes a BAND, not a position. Projecting only
        // `nirf` would drop the band and render "—" for 50 colleges that do have
        // a published standing.
        nirfBand: field(line, 'nirfBand'),
        feesPerYear: field(line, 'feesPerYear'),
        feesTotal: field(line, 'feesTotal'),
        hostelPerYear: field(line, 'hostelPerYear'),
        accommodation: field(line, 'accommodation'),
        cutoff: field(line, 'cutoff'),
        placementAvg: field(line, 'placementAvg'),
        placementHighest: field(line, 'placementHighest'),
        placementRate: field(line, 'placementRate'),
        about: field(line, 'about'),
        website: field(line, 'website'),
        exams: arrField(line, 'exams'),
        topBranches: arrField(line, 'topBranches'),
        recruiters: arrField(line, 'recruiters'),
        admissionSteps: arrField(line, 'admissionSteps'),
      });
    }
  }

  const nameToSlug = Object.fromEntries(states.map(s => [s.name, s.slug]));
  for (const c of colleges) c.stateSlug = nameToSlug[c.stateName] || 'national';
  return { states, colleges };
}
