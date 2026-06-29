// Re-partition all story-gen class-*.json lessons into files of <=3 lessons each
// (class-xp-NNN.json) so expansion-agent writes stay under the token cap.
// Non-destructive to content: only moves lesson objects between files. Images intact.
import { readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
const DIR = 'src/data/story-gen';
const files = readdirSync(DIR).filter((f) => /^class-[\w-]+\.json$/.test(f));
const all = [];
for (const f of files) {
  try { const a = JSON.parse(readFileSync(`${DIR}/${f}`, 'utf8')); if (Array.isArray(a)) all.push(...a); } catch (e) { console.error('skip', f, e.message); }
}
// Dedupe by slug (keep first) so re-partition doesn't duplicate.
const seen = new Set();
const lessons = all.filter((l) => (l && l.slug && !seen.has(l.slug)) ? (seen.add(l.slug), true) : false);
// Remove old files, then write <=3 per partition.
for (const f of files) rmSync(`${DIR}/${f}`);
let n = 0;
for (let i = 0; i < lessons.length; i += 3) {
  n++;
  const part = lessons.slice(i, i + 3);
  const id = String(n).padStart(3, '0');
  writeFileSync(`${DIR}/class-xp-${id}.json`, JSON.stringify(part, null, 2));
}
console.log(`partitioned ${lessons.length} lessons into ${n} files (<=3 each)`);
