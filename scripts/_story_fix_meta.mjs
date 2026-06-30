// Restore exact chapter/subject titles on every lesson from the CSV (by slug).
// Fixes agents that truncate titles like "Interest — How Money Grows in a Bank" -> "Interest",
// which would break getStoryLesson's title match. Fast: CSV + local files only, no git.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const DIR = 'src/data/story-gen';
const csv = readFileSync('docs/syllabus-chapters.csv', 'utf8').split(/\r?\n/).slice(1).filter(Boolean);
const map = new Map();
for (const line of csv) {
  const m = line.match(/^([^,]*),(\d+),("(?:[^"]|"")*"|[^,]*),("(?:[^"]|"")*"|[^,]*)$/);
  if (!m) continue;
  const subject = m[3].replace(/^"|"$/g, '').replace(/""/g, '"');
  const chapter = m[4].replace(/^"|"$/g, '').replace(/""/g, '"');
  map.set(`class-${m[2]}-${slug(subject)}-${slug(chapter)}`, { subject, chapter });
}
let fixed = 0;
for (const f of readdirSync(DIR).filter((x) => /^class-xp-[\w-]+\.json$/.test(x))) {
  const p = `${DIR}/${f}`;
  let a; try { a = JSON.parse(readFileSync(p, 'utf8')); } catch { continue; }
  let changed = false;
  for (const l of a) {
    const meta = l && l.slug && map.get(l.slug);
    if (meta && (l.chapter !== meta.chapter || l.subject !== meta.subject)) { l.chapter = meta.chapter; l.subject = meta.subject; fixed++; changed = true; }
  }
  if (changed) writeFileSync(p, JSON.stringify(a, null, 2));
}
console.log('meta restored on', fixed, 'lessons');
