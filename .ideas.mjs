import fs from 'node:fs';
const S = (v) => (v == null ? '' : String(v));
const N = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const arrS = (v) => (Array.isArray(v) ? v.map(S) : []);
const faqs = (v) => (Array.isArray(v) ? v.map((f) => ({ q: S(f.q), a: S(f.a) })) : []);
const dedupe = (a) => { const s = new Set(); return a.filter((o) => (o.slug && !s.has(o.slug) ? (s.add(o.slug), true) : false)); };
function safeRead(f) { let r = fs.readFileSync(f, 'utf8').replace(/^﻿/, '').trim(); try { return JSON.parse(r); } catch {} try { return JSON.parse(r.replace(/\\'/g, "'")); } catch (e) { console.log('FAIL', f, e.message.slice(0, 40)); return Array.isArray ? [] : {}; } }
function getArr(file, m) { const ts = fs.readFileSync(file, 'utf8'); const s = ts.indexOf(m); if (s < 0) return []; const from = s + m.length; const e = ts.indexOf('\n];', from); return JSON.parse(ts.slice(from, e + 2)); }
function setArr(file, m, arr) { let ts = fs.readFileSync(file, 'utf8'); const empty = m + '[];'; if (ts.includes(empty)) { ts = ts.replace(empty, m + JSON.stringify(arr, null, 2) + ';'); } else { const s = ts.indexOf(m) + m.length; const e = ts.indexOf('\n];', s); ts = ts.slice(0, s) + JSON.stringify(arr, null, 2) + ts.slice(e + 2); } fs.writeFileSync(file, ts, 'utf8'); }
function mergeArr(file, marker, jsonFile, norm) {
  const existing = getArr(file, marker);
  const incoming = (safeRead(jsonFile) || []).map(norm).filter((x) => x.slug);
  const merged = dedupe([...existing, ...incoming]);
  setArr(file, marker, merged);
  console.log(marker.replace('export const ', '').split(':')[0], `${existing.length} -> ${merged.length}`);
}

// 1. NCERT Exemplar -> ncert bank (object), fix 'Class X' keys
const bankPath = 'public/data/ncert-solutions.json';
const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8').replace(/^﻿/, ''));
const ex = safeRead('ncert_ex.json') || {};
let added = 0;
for (const k of Object.keys(ex)) {
  const i = k.indexOf('::'); let cls = k.slice(0, i); const rest = k.slice(i);
  if (/^Class\s+/i.test(cls)) cls = cls.replace(/^Class\s+/i, '').trim();
  const key = cls + rest;
  if (!bank[key]) added++;
  bank[key] = ex[k];
}
fs.writeFileSync(bankPath, JSON.stringify(bank), 'utf8');
console.log('NCERT bank +', added, 'exemplar keys, total', Object.keys(bank).length);

// 2. Biographies -> Static GK
mergeArr('src/data/staticGk.ts', 'export const GK_TOPICS: GkTopic[] = ', 'gk_bio.json', (g) => ({ slug: S(g.slug), title: S(g.title), category: S(g.category || 'Biography'), intro: S(g.intro), items: (Array.isArray(g.items) ? g.items : []).map((i) => ({ name: S(i.name), detail: S(i.detail) })), faqs: faqs(g.faqs) }));
// 3. Spoken English -> Vocab
mergeArr('src/data/englishVocab.ts', 'export const VOCAB_SETS: VocabSet[] = ', 'vocab_se.json', (v) => ({ slug: S(v.slug), title: S(v.title), category: S(v.category), intro: S(v.intro), items: (Array.isArray(v.items) ? v.items : []).map((i) => ({ term: S(i.term), meaning: S(i.meaning), example: S(i.example) })), faqs: faqs(v.faqs) }));
// 4. Case-study/Olympiad -> Chapter MCQs
mergeArr('src/data/chapterMcqs.ts', 'export const MCQ_CHAPTERS: McqChapter[] = ', 'mcq_ext.json', (m) => ({ slug: S(m.slug), classLevel: S(m.classLevel), subject: S(m.subject), chapter: S(m.chapter), intro: S(m.intro), mcqs: (Array.isArray(m.mcqs) ? m.mcqs : []).map((q) => ({ q: S(q.q), options: arrS(q.options), correct: N(q.correct), explanation: S(q.explanation) })), faqs: faqs(m.faqs) }));
// 5. Diagrams -> Concepts
mergeArr('src/data/conceptExplainers.ts', 'export const CONCEPT_EXPLAINERS: ConceptExplainer[] = ', 'ct_diag.json', (c) => ({ slug: S(c.slug), title: S(c.title), subject: S(c.subject), classLevel: S(c.classLevel), intro: S(c.intro), sections: (Array.isArray(c.sections) ? c.sections : []).map((s) => ({ heading: S(s.heading), body: S(s.body) })), realLife: arrS(c.realLife), examples: (Array.isArray(c.examples) ? c.examples : []).map((e) => ({ problem: S(e.problem), solution: S(e.solution) })), commonMistakes: arrS(c.commonMistakes), faqs: faqs(c.faqs) }));
// 6. Labs -> Lab Practicals (fill)
mergeArr('src/data/labPracticals.ts', 'export const LAB_PRACTICALS: LabPractical[] = ', 'labs.json', (l) => ({ slug: S(l.slug), classLevel: S(l.classLevel), subject: S(l.subject), title: S(l.title), aim: S(l.aim), materials: arrS(l.materials), theory: S(l.theory), procedure: arrS(l.procedure), observation: S(l.observation), result: S(l.result), precautions: arrS(l.precautions), viva: (Array.isArray(l.viva) ? l.viva : []).map((q) => ({ q: S(q.q), a: S(q.a) })) }));
