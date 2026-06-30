// Fast safety net (single git read): any lesson present in the committed
// storyLessonsGenerated.ts but missing from the current VALID xp files — because it
// was dropped (slug collision) or its file is invalid JSON — is restored as its
// committed version into class-xp-restore.json, keeping chapter coverage whole.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const DIR = 'src/data/story-gen';
let ts = execSync('git show HEAD:src/data/storyLessonsGenerated.ts', { maxBuffer: 256 * 1024 * 1024 }).toString();
ts = ts.slice(ts.indexOf('= [') + 2, ts.lastIndexOf(']') + 1);
const orig = JSON.parse(ts);
const cur = new Set();
for (const f of readdirSync(DIR).filter((x) => /^class-xp-[\w-]+\.json$/.test(x))) {
  try { JSON.parse(readFileSync(`${DIR}/${f}`, 'utf8')).forEach((l) => cur.add(l.slug)); } catch { /* invalid file -> its lessons count as missing */ }
}
const seen = new Set();
const missing = orig.filter((l) => l && l.slug && l.slug !== 'test' && !cur.has(l.slug) && !seen.has(l.slug) && (seen.add(l.slug), true));
if (missing.length) { writeFileSync(`${DIR}/class-xp-restore.json`, JSON.stringify(missing, null, 2)); console.log('restored', missing.length, 'lessons:', missing.map((l) => l.slug).join(', ')); }
else console.log('none missing');
