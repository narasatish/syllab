import { readFileSync, writeFileSync } from 'node:fs';
const slug = s => String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const csv = readFileSync('docs/syllabus-chapters.csv','utf8').split(/\r?\n/).slice(1).filter(Boolean);
const gen = readFileSync('src/data/storyLessonsGenerated.ts','utf8');
const have = new Set([...gen.matchAll(/"slug":\s*"([^"]+)"/g)].map(m=>m[1]));
const rows = csv.map(l=>{ const m=l.match(/^([^,]*),(\d+),("(?:[^"]|"")*"|[^,]*),("(?:[^"]|"")*"|[^,]*)$/); if(!m) return null; const subject=m[3].replace(/^"|"$/g,'').replace(/""/g,'"'); const chapter=m[4].replace(/^"|"$/g,'').replace(/""/g,'"'); return {cls:m[2],subject,chapter,slug:`class-${m[2]}-${slug(subject)}-${slug(chapter)}`};}).filter(Boolean);
const missing = rows.filter(r=>!have.has(r.slug));
const groups = {};
for(const r of missing){ const k=`${r.cls}__${slug(r.subject)}`; (groups[k]??={cls:r.cls,subject:r.subject,subjectSlug:slug(r.subject),chapters:[]}).chapters.push(r.chapter); }
writeFileSync('src/data/story-gen/_manifest.json', JSON.stringify(groups,null,2));
console.log('groups:',Object.keys(groups).length,'| missing chapters:',missing.length);
