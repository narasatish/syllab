import { readFileSync, writeFileSync } from 'node:fs';
const g = JSON.parse(readFileSync('src/data/story-gen/_manifest.json', 'utf8'));
const chunks = [];
for (const k of Object.keys(g).sort()) {
  const e = g[k];
  chunks.push({ cls: e.cls, subject: e.subject, subjectSlug: e.subjectSlug,
    file: `class-${e.cls}-${e.subjectSlug}-fill.json`, chapters: e.chapters });
}
writeFileSync('src/data/story-gen/_chunks.json', JSON.stringify(chunks));
console.log('fill chunks:', chunks.length, '| chapters:', chunks.reduce((n,c)=>n+c.chapters.length,0));
