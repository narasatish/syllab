// Force-restore: for every CSV chapter NOT currently covered by getStoryLesson,
// pull the matching lesson from the committed storyLessonsGenerated.ts (a known-good
// 534/534 set) into class-xp-restore.json. Backfills any chapter broken by a bad
// expansion (altered slug/title, invalid file) without losing good expansions.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const DIR = 'src/data/story-gen';

// getStoryLesson-style matcher.
const matches = (l, cls, subj, chap) => l.classLevel === cls &&
  (!subj || norm(l.subject) === norm(subj) || norm(l.subject).startsWith(norm(subj).slice(0, 4))) &&
  [l.chapter, ...(l.chapterAliases || [])].map(norm).includes(norm(chap));

// Committed known-good lessons.
let ts = execSync('git show HEAD:src/data/storyLessonsGenerated.ts', { maxBuffer: 256 * 1024 * 1024 }).toString();
ts = ts.slice(ts.indexOf('= [') + 2, ts.lastIndexOf(']') + 1);
const good = JSON.parse(ts);

// Current lessons (valid files only).
const cur = [];
for (const f of readdirSync(DIR).filter((x) => /^class-xp-[\w-]+\.json$/.test(x))) {
  try { JSON.parse(readFileSync(`${DIR}/${f}`, 'utf8')).forEach((l) => cur.push(l)); } catch { /* skip invalid */ }
}

const csv = readFileSync('docs/syllabus-chapters.csv', 'utf8').split(/\r?\n/).slice(1).filter(Boolean);
const restore = [];
const seen = new Set();
for (const line of csv) {
  const m = line.match(/^([^,]*),(\d+),("(?:[^"]|"")*"|[^,]*),("(?:[^"]|"")*"|[^,]*)$/);
  if (!m) continue;
  const cls = m[2], subject = m[3].replace(/^"|"$/g, '').replace(/""/g, '"'), chapter = m[4].replace(/^"|"$/g, '').replace(/""/g, '"');
  if (cur.some((l) => matches(l, cls, subject, chapter))) continue; // already covered
  const g = good.find((l) => matches(l, cls, subject, chapter));
  if (g && !seen.has(g.slug)) { seen.add(g.slug); restore.push(g); }
}
// Write to a name that sorts BEFORE class-xp-* so its (correct) lessons win the
// integrate dedup over any altered-title/slug duplicates still in the batch files.
if (restore.length) { writeFileSync(`${DIR}/class-aaa-restore.json`, JSON.stringify(restore, null, 2)); console.log('force-restored', restore.length, 'chapters:', restore.map((l) => l.chapter).join(' | ')); }
else console.log('nothing to force-restore');
