/**
 * collegesData.mjs — parses src/data/colleges.ts (one object per line) so the
 * sitemap & prerender scripts (.mjs, can't import .ts) can enumerate the
 * /colleges, /colleges/:state and /colleges/:state/:slug routes with real meta.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

function field(line, key) {
  const m = line.match(new RegExp(`${key}: '([^']*)'`));
  return m ? m[1] : '';
}
// Unquoted numeric field (e.g. `nirf: 12,`); returns null for `nirf: null` or absent.
function numField(line, key) {
  const m = line.match(new RegExp(`${key}:\\s*(\\d+)`));
  return m ? Number(m[1]) : null;
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
        nirf: numField(line, 'nirf'),
        feesPerYear: field(line, 'feesPerYear'),
        cutoff: field(line, 'cutoff'),
        placementAvg: field(line, 'placementAvg'),
      });
    }
  }

  const nameToSlug = Object.fromEntries(states.map(s => [s.name, s.slug]));
  for (const c of colleges) c.stateSlug = nameToSlug[c.stateName] || 'national';
  return { states, colleges };
}
