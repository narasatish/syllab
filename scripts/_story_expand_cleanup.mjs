// Post-expansion cleanup:
//  1. Strip invented image URLs (any url not in the original committed set) so no 404s.
//  2. Rebuild any invalid-JSON xp file from the original lessons (deterministic split) so no chapter is lost.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const DIR = 'src/data/story-gen';

// Original lessons (committed HEAD, old structure) — deduped by slug, in stable order.
const list = execSync('git ls-tree -r --name-only HEAD src/data/story-gen').toString().trim().split('\n').filter((x) => /class-[\w-]+\.json$/.test(x)).sort();
const origLessons = [];
const origUrls = new Set();
for (const p of list) {
  try { const a = JSON.parse(execSync('git show HEAD:' + p).toString());
    for (const l of a) { origLessons.push(l); for (const s of (l.slides || [])) if (s.image && s.image.url) origUrls.add(s.image.url); }
  } catch (e) { /* skip */ }
}
const seen = new Set();
const orderedOrig = origLessons.filter((l) => l && l.slug && !seen.has(l.slug) ? (seen.add(l.slug), true) : false);

let stripped = 0, rebuilt = 0, fixedFiles = 0;
for (const f of readdirSync(DIR).filter((x) => /^class-xp-\d+\.json$/.test(x))) {
  const fp = `${DIR}/${f}`;
  let a;
  try { a = JSON.parse(readFileSync(fp, 'utf8')); }
  catch (e) {
    // Rebuild from original deterministic partition (3 lessons per file, by file index).
    const idx = parseInt(f.match(/(\d+)/)[1], 10) - 1;
    a = orderedOrig.slice(idx * 3, idx * 3 + 3);
    rebuilt++;
  }
  let changed = false;
  for (const l of a) for (const s of (l.slides || [])) {
    if (s.image && s.image.url && !origUrls.has(s.image.url)) { delete s.image.url; if (s.image.q) delete s.image.q; stripped++; changed = true; }
  }
  if (changed || rebuilt) { writeFileSync(fp, JSON.stringify(a, null, 2)); fixedFiles++; }
}
console.log(`stripped invented urls: ${stripped} | rebuilt-from-original files: ${rebuilt} | files written: ${fixedFiles}`);
