import { readFileSync, writeFileSync } from 'node:fs';
const p = 'src/data/story-gen/class-8-english-g1.json';
let t = readFileSync(p, 'utf8');
// An "example" object was mis-closed with ] instead of }. Match the solution
// string (handling escaped quotes) up to the stray ] and turn it into }.
const re = /("solution"\s*:\s*"(?:[^"\\]|\\.)*")(\s*)\]/g;
const n = (t.match(re) || []).length;
t = t.replace(re, '$1$2}');
writeFileSync(p, t);
try { const d = JSON.parse(t); console.log('file2 FIXED (' + n + ' occurrences), lessons:', d.length); }
catch (e) { console.log('still bad:', e.message.slice(0, 90)); }
