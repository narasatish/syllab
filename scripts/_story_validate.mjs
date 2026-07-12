import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
const DIR = 'src/data/story-gen';
const files = readdirSync(DIR).filter(f => /^class-[\w-]+\.json$/.test(f));
let ok=0, bad=0, lessons=0;
for (const f of files) {
  const p = path.join(DIR, f);
  try {
    const d = JSON.parse(readFileSync(p,'utf8'));
    if (!Array.isArray(d)) { console.log('✗ '+f+' : not an array'); bad++; continue; }
    const issues = [];
    d.forEach((l,i)=>{ if(!l.slug||!l.classLevel||!l.subject||!l.chapter||!Array.isArray(l.slides)||!l.slides.length) issues.push('lesson#'+i); });
    if (issues.length) { console.log('⚠ '+f+' : '+d.length+' lessons but malformed: '+issues.join(',')); }
    else { ok++; lessons+=d.length; }
  } catch(e) {
    console.log('✗ '+f+' : INVALID JSON — '+e.message.slice(0,70)); bad++;
  }
}
console.log(`\nfiles ok:${ok} bad:${bad} | total lessons in valid files:${lessons}`);
