/**
 * generate-ncert-solutions.ts — NCERT-style chapter exercise solutions, the
 * Indian equivalent of Chegg's textbook solutions (one of the highest-volume
 * student search categories). Output: public/data/ncert-solutions.json keyed by
 * "<classLevel>::<subject>::<chapter-slug>" → [{ q, solution }].
 *
 * Each entry becomes an indexable /ncert-solutions/<...> page (built separately).
 * Resume-friendly (skips chapters already at target). Uses the FREE-TIER Gemini
 * key — run with ALLOW_PAID_GEMINI=1 on a free key so it costs ₹0.
 *
 *   ALLOW_PAID_GEMINI=1 tsx scripts/generate-ncert-solutions.ts --class 10 --subject Science
 *   ALLOW_PAID_GEMINI=1 tsx scripts/generate-ncert-solutions.ts --all
 */
import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYLLABUS } from '../src/data/syllabus';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'public', 'data', 'ncert-solutions.json');
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }
if (process.env.ALLOW_PAID_GEMINI !== '1') {
  console.error('\n⛔ Disabled to prevent surprise charges. Run on a FREE-TIER key with ALLOW_PAID_GEMINI=1.\n');
  process.exit(1);
}

const args = Object.fromEntries(process.argv.slice(2).flatMap((a, i, arr) =>
  a.startsWith('--') ? [[a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : []));
const PER = parseInt((args.per as string) || '10', 10); // Q&A per chapter
const CONC = Math.max(1, parseInt((args.concurrency as string) || '2', 10));
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

// Unique academic chapters (collapse cross-board duplicates by class+subject+slug).
const ACADEMIC = new Set(['Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Science']);
const seen = new Set<string>();
let chapters = SYLLABUS.filter((ch) => {
  if (!ACADEMIC.has(ch.subject)) return false;
  if (args.class && String(ch.classLevel) !== String(args.class)) return false;
  if (args.subject && ch.subject !== args.subject) return false;
  const k = `${ch.classLevel}::${ch.subject}::${slug(ch.title)}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});
if (args.limit) chapters = chapters.slice(0, parseInt(args.limit as string, 10));

async function gen(ch: typeof SYLLABUS[number], attempt = 1): Promise<Array<{ q: string; solution: string }> | null> {
  const prompt = `You are an expert NCERT teacher. For Class ${ch.classLevel} ${ch.subject}, chapter "${ch.title}" (CBSE/NCERT syllabus), write ${PER} important exercise-style questions WITH full step-by-step solutions, like NCERT textbook back-exercise solutions.
Rules: cover the key concepts of THIS chapter; mix short and long questions; each solution must be complete, correct, and show the working/reasoning (not just the final answer); use simple language for an Indian student; include units and formulas where relevant.
Return ONLY a JSON array, each item: {"q": "the question", "solution": "the full step-by-step solution"}.`;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(90_000),
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json' } }) });
    if (!res.ok) {
      if ((res.status === 429 || res.status >= 500) && attempt <= 5) { await new Promise((r) => setTimeout(r, 2500 * attempt)); return gen(ch, attempt + 1); }
      return null;
    }
    const d: any = await res.json();
    const arr = JSON.parse(d?.candidates?.[0]?.content?.parts?.[0]?.text || 'null');
    if (!Array.isArray(arr)) return null;
    return arr
      .map((x: any) => ({ q: String(x.q || '').trim(), solution: String(x.solution || '').trim() }))
      .filter((x: { q: string; solution: string }) => x.q && x.solution);
  } catch {
    if (attempt <= 5) { await new Promise((r) => setTimeout(r, 2500 * attempt)); return gen(ch, attempt + 1); }
    return null;
  }
}

async function main() {
  let bank: Record<string, Array<{ q: string; solution: string }>> = {};
  try { bank = JSON.parse(await fs.readFile(OUT, 'utf8')); } catch { /* fresh */ }

  const keyOf = (ch: typeof SYLLABUS[number]) => `${ch.classLevel}::${ch.subject}::${slug(ch.title)}`;
  const todo = chapters.filter((ch) => (bank[keyOf(ch)]?.length || 0) < PER);
  console.log(`NCERT solutions: ${todo.length} chapters to generate (+${PER} Q&A each, concurrency ${CONC}).`);
  let ok = 0, fail = 0, done = 0;

  async function proc(ch: typeof SYLLABUS[number]) {
    const arr = await gen(ch);
    if (!arr || !arr.length) { console.log(`• C${ch.classLevel} ${ch.subject} — ${ch.title} FAILED`); fail++; return; }
    bank[keyOf(ch)] = arr.slice(0, PER);
    ok++;
    console.log(`• C${ch.classLevel} ${ch.subject} — ${ch.title} ✓ (${bank[keyOf(ch)].length})`);
  }

  for (let i = 0; i < todo.length; i += CONC) {
    await Promise.all(todo.slice(i, i + CONC).map(proc));
    done += Math.min(CONC, todo.length - i);
    if (done % 6 < CONC) await fs.writeFile(OUT, JSON.stringify(bank, null, 0), 'utf8');
  }
  await fs.writeFile(OUT, JSON.stringify(bank, null, 0), 'utf8');
  console.log(`\n✅ ${ok} chapters done, ${fail} failed. Bank: ${Object.keys(bank).length} chapters → ${OUT}`);
}
main();
