import { readFileSync } from 'node:fs';
const norm = (s) => String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
// Parse the generated TS as JSON (strip import line + export prefix + trailing ;)
let ts = readFileSync('src/data/storyLessonsGenerated.ts','utf8');
ts = ts.slice(ts.indexOf('= [')+2, ts.lastIndexOf(']')+1);
const gen = JSON.parse(ts);
// Build lookup index like getStoryLesson: class + subject(4-char) + chapter/alias title
const idx = gen.map(l => ({ cls:String(l.classLevel).replace(/[^0-9]/g,''), subj:norm(l.subject), names:[l.chapter,...(l.chapterAliases||[])].map(norm) }));
const csv = readFileSync('docs/syllabus-chapters.csv','utf8').split(/\r?\n/).slice(1).filter(Boolean);
let covered=0; const miss=[];
for(const line of csv){ const m=line.match(/^([^,]*),(\d+),("(?:[^"]|"")*"|[^,]*),("(?:[^"]|"")*"|[^,]*)$/); if(!m) continue;
  const cls=m[2], subject=m[3].replace(/^"|"$/g,'').replace(/""/g,'"'), chapter=m[4].replace(/^"|"$/g,'').replace(/""/g,'"');
  const wantC=norm(chapter), wantS=norm(subject);
  const hit = idx.find(l => l.cls===cls && (l.subj===wantS || l.subj.startsWith(wantS.slice(0,4))) && l.names.includes(wantC));
  if(hit) covered++; else miss.push(`C${cls} ${subject} · ${chapter}`);
}
console.log('CSV chapters:',csv.length,'| COVERED by getStoryLesson:',covered,'| NOT covered:',miss.length);
miss.slice(0,20).forEach(x=>console.log('  ✗',x));
