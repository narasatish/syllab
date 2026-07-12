import { readFileSync, readdirSync } from 'node:fs';
const norm = (s) => String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
// Lessons now live in public/story-lessons/class-*.json (post bundle-split).
const gen = [];
for (const f of readdirSync('public/story-lessons').filter((x) => /^class-\d+\.json$/.test(x))) {
  gen.push(...JSON.parse(readFileSync('public/story-lessons/' + f, 'utf8')));
}
const idx = gen.map(l => ({ cls:String(l.classLevel).replace(/[^0-9]/g,''), subj:norm(l.subject), names:[l.chapter,...(l.chapterAliases||[])].map(norm) }));
const csv = readFileSync('docs/syllabus-chapters.csv','utf8').split(/\r?\n/).slice(1).filter(Boolean);
let covered=0; const miss=[];
for(const line of csv){ const m=line.match(/^([^,]*),(\d+),("(?:[^"]|"")*"|[^,]*),("(?:[^"]|"")*"|[^,]*)$/); if(!m) continue;
  const cls=m[2], subject=m[3].replace(/^"|"$/g,'').replace(/""/g,'"'), chapter=m[4].replace(/^"|"$/g,'').replace(/""/g,'"');
  const wantC=norm(chapter), wantS=norm(subject);
  const hit = idx.find(l => l.cls===cls && (l.subj===wantS || l.subj.startsWith(wantS.slice(0,4))) && l.names.includes(wantC));
  if(hit) covered++; else miss.push(`C${cls} ${subject} · ${chapter}`);
}
console.log('CSV chapters:',csv.length,'| COVERED:',covered,'| NOT covered:',miss.length);
miss.slice(0,20).forEach(x=>console.log('  ✗',x));
