// Safety net: any lesson present in the committed (HEAD) set but missing from the
// current xp files (e.g. dropped by a rebuild's slug collision) is restored as its
// original version into class-xp-restore.json so chapter coverage stays 534/534.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const DIR = 'src/data/story-gen';
const list = execSync('git ls-tree -r --name-only HEAD src/data/story-gen').toString().trim().split('\n').filter((x) => /class-[\w-]+\.json$/.test(x));
const orig = [];
for (const p of list) { try { JSON.parse(execSync('git show HEAD:' + p).toString()).forEach((l) => orig.push(l)); } catch (e) { /* skip */ } }
const cur = new Set();
for (const f of readdirSync(DIR).filter((x) => /^class-xp-[\w-]+\.json$/.test(x))) {
  try { JSON.parse(readFileSync(`${DIR}/${f}`, 'utf8')).forEach((l) => cur.add(l.slug)); } catch (e) { /* skip */ }
}
const seen = new Set();
const missing = orig.filter((l) => l && l.slug && l.slug !== 'test' && !cur.has(l.slug) && !seen.has(l.slug) && (seen.add(l.slug), true));
if (missing.length) { writeFileSync(`${DIR}/class-xp-restore.json`, JSON.stringify(missing, null, 2)); console.log('restored', missing.length, 'missing lessons:', missing.map((l) => l.slug).join(', ')); }
else console.log('none missing');
