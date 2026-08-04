/**
 * generate-coding-mcqs.ts — per-topic "Quick Check" MCQs for every coding
 * tutorial topic across all 17 languages. Output: public/data/coding-mcqs.json
 * keyed by topic id → CodingMcq[]. Resume-friendly (skips topics already done).
 *
 *   npx tsx scripts/generate-coding-mcqs.ts            (all)
 *   npx tsx scripts/generate-coding-mcqs.ts --lang python
 */
import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUAGES, TOPICS_BY_LANGUAGE } from '../src/data/tutorials/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'public', 'data', 'coding-mcqs.json');
const FREE_KEY = process.env.GEMINI_API_KEY_FREE;
// Free-tier first: GEMINI_API_KEY is the PAID key (see syllab-backend/aiService.js),
// so ALLOW_PAID_GEMINI=1 on its own used to mean 'spend money' even though it was
// documented as the way to run this for free.
const KEY = FREE_KEY || process.env.GEMINI_API_KEY;
if (!KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }
// Cost guard: calls the Gemini API (paid on a billed key). Disabled by default.
if (!FREE_KEY && process.env.ALLOW_PAID_GEMINI !== '1') {
  console.error('\n⛔ generate-coding-mcqs is disabled to prevent surprise charges.\n   Coding MCQs are already generated — you likely do NOT need to run this.\n   To run intentionally on a FREE-TIER key: set ALLOW_PAID_GEMINI=1\n');
  process.exit(1);
}

const args = Object.fromEntries(process.argv.slice(2).flatMap((a, i, arr) =>
  a.startsWith('--') ? [[a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : []));
const PER = parseInt((args.per as string) || '4', 10);
const CONC = Math.max(1, parseInt((args.concurrency as string) || '4', 10));

async function gen(lang: string, topic: any, attempt = 1): Promise<any[] | null> {
  const theory = (topic.theory || []).join(' ').slice(0, 1200);
  const prompt = `Generate ${PER} multiple-choice "quick check" questions for a student who just learned this ${lang} programming topic.
Topic: "${topic.title}". Lesson summary: ${theory}
Rules: test understanding of THIS topic, beginner-friendly, 4 options each, exactly one correct, a 1-sentence explanation. Practical/code-aware where relevant.
Return ONLY a JSON array, each: {"q": string, "options": [4 strings], "correct": 0-3, "explanation": string}.`;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(90_000),
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json' } }) });
    if (!res.ok) {
      if ((res.status === 429 || res.status >= 500) && attempt <= 5) { await new Promise((r) => setTimeout(r, 2000 * attempt)); return gen(lang, topic, attempt + 1); }
      return null;
    }
    const d: any = await res.json();
    const arr = JSON.parse(d?.candidates?.[0]?.content?.parts?.[0]?.text || 'null');
    return Array.isArray(arr) ? arr : null;
  } catch { if (attempt <= 5) { await new Promise((r) => setTimeout(r, 2000 * attempt)); return gen(lang, topic, attempt + 1); } return null; }
}

async function main() {
  let bank: Record<string, any[]> = {};
  try { bank = JSON.parse(await fs.readFile(OUT, 'utf8')); } catch { /* fresh */ }

  const langFilter = args.lang as string | undefined;
  const jobs: { lang: string; topic: any }[] = [];
  for (const l of LANGUAGES) {
    if (langFilter && l.id !== langFilter) continue;
    for (const t of (TOPICS_BY_LANGUAGE[l.id] || [])) {
      if (!bank[t.id] || bank[t.id].length === 0) jobs.push({ lang: l.name, topic: t });
    }
  }
  console.log(`Coding Quick-Check MCQs: ${jobs.length} topics to generate (+${PER} each, concurrency ${CONC}).`);
  let ok = 0, fail = 0, done = 0;

  async function run(job: { lang: string; topic: any }) {
    const raw = await gen(job.lang, job.topic);
    if (!raw || !raw.length) { fail++; console.log(`• ${job.lang} — ${job.topic.title} FAILED`); return; }
    bank[job.topic.id] = raw.map((q: any) => ({
      q: String(q.q || '').trim(),
      options: (q.options || []).slice(0, 4).map((o: any) => String(o)),
      correct: Math.max(0, Math.min(3, Number(q.correct) || 0)),
      explanation: String(q.explanation || '').trim(),
    })).filter((q: any) => q.q && q.options.length === 4);
    ok++; console.log(`• ${job.lang} — ${job.topic.title} ✓ (${bank[job.topic.id].length})`);
  }

  for (let i = 0; i < jobs.length; i += CONC) {
    await Promise.all(jobs.slice(i, i + CONC).map(run));
    done += Math.min(CONC, jobs.length - i);
    if (done % 20 < CONC) await fs.writeFile(OUT, JSON.stringify(bank), 'utf8');
  }
  await fs.writeFile(OUT, JSON.stringify(bank), 'utf8');
  const total = Object.values(bank).reduce((s, a) => s + a.length, 0);
  console.log(`\n✅ ${ok} topics done, ${fail} failed. Bank: ${total} MCQs across ${Object.keys(bank).length} topics → ${OUT}`);
  console.log('CODING-MCQS-DONE');
}
main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
