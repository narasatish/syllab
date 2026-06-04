/**
 * ncertChapters.mjs — reads public/data/ncert-solutions.json and yields the
 * chapters that have solutions, as routes for prerender + sitemap. Title is
 * derived from the chapter slug (keyword-rich; the SPA shows the exact syllabus
 * title to users).
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const subjSlugOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const SMALL = new Set(['of', 'and', 'in', 'the', 'to', 'at', 'a', 'an', 'for', 'with', 'on']);
const titleize = (sl) => sl.split('-').map((w, i) => (i > 0 && SMALL.has(w)) ? w : (w.charAt(0).toUpperCase() + w.slice(1))).join(' ');

export function getNcertChapters() {
  let bank = {};
  try { bank = JSON.parse(readFileSync(path.join(ROOT, 'public', 'data', 'ncert-solutions.json'), 'utf8')); } catch { return []; }
  const out = [];
  for (const key of Object.keys(bank)) {
    const i1 = key.indexOf('::');
    const i2 = key.indexOf('::', i1 + 2);
    if (i1 < 0 || i2 < 0) continue;
    const classLevel = key.slice(0, i1);
    const subject = key.slice(i1 + 2, i2);
    const chapSlug = key.slice(i2 + 2);
    out.push({
      classLevel, subject, chapSlug,
      subjSlug: subjSlugOf(subject),
      title: titleize(chapSlug),
      count: Array.isArray(bank[key]) ? bank[key].length : 0,
    });
  }
  return out;
}
