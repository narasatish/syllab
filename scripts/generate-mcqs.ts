/**
 * generate-mcqs.ts — Auto-generate chapter-wise MCQs into a question bank.
 *
 * Board-aware via shared chapters: because NCERT-aligned boards (CBSE/UP/Bihar/
 * Rajasthan/MP) reuse the SAME chapters, generating per unique chapter covers all
 * of them at once. AP/TS/Karnataka/Maharashtra distinct chapters get their own.
 *
 * Writes src/data/questions/generated.json as:
 *   { "<classLevel>::<subject>::<chapter-slug>": Question[] }
 * Resume-friendly: skips chapters already present (re-run to fill the rest).
 *
 * Usage:
 *   GEMINI_API_KEY=... npx tsx scripts/generate-mcqs.ts --all --per 15
 *   npx tsx scripts/generate-mcqs.ts --class 10 --subject Science --per 20
 */

import 'dotenv/config'; // load GEMINI_API_KEY from .env for scheduled/standalone runs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYLLABUS } from '../src/data/syllabus';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'src', 'data', 'questions', 'generated.json');

const args = Object.fromEntries(
  process.argv.slice(2).flatMap((a, i, arr) =>
    a.startsWith('--') ? [[a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : []),
) as Record<string, string | true>;

const PER = parseInt((args.per as string) || '15', 10);
const wantAll = !!args.all;
const limit = args.limit ? parseInt(args.limit as string, 10) : Infinity;
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const dailyCategory = (cls: string) => (['1', '2', '3', '4'].includes(cls) ? 'Classes 1-4' : 'Classes 5-10');

// Only chapters with real academic subjects (skip Financial Literacy etc. if desired).
const chapters = SYLLABUS.filter(ch => {
  if (!wantAll) {
    if (args.class && String(ch.classLevel) !== String(args.class)) return false;
    if (args.subject && ch.subject !== args.subject) return false;
  }
  return true;
});

// De-dup by content key so NCERT-aligned boards don't regenerate the same chapter.
const seen = new Set<string>();
const unique = chapters.filter(ch => {
  const k = `${ch.classLevel}::${ch.subject}::${slug(ch.title)}`;
  if (seen.has(k)) return false;
  seen.add(k); return true;
});

async function gen(ch: typeof SYLLABUS[number]): Promise<any[] | null> {
  const prompt = `Generate ${PER} high-quality multiple-choice questions for an Indian student.
Class: ${ch.classLevel}. Subject: ${ch.subject}. Chapter: "${ch.title}".
Rules: exam-relevant, factually correct, 4 options each, exactly one correct, a clear 1-2 sentence explanation. Mix difficulty (easy/medium/hard).
Return ONLY a JSON array, each item: {"question": string, "options": [4 strings], "correct": 0-3, "explanation": string, "difficulty": "easy"|"medium"|"hard"}.`;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json' } }) },
    );
    const d = await res.json();
    const txt = d?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!txt) return null;
    const arr = JSON.parse(txt);
    return Array.isArray(arr) ? arr : null;
  } catch { return null; }
}

async function main() {
  let bank: Record<string, any[]> = {};
  try { bank = JSON.parse(await fs.readFile(OUT, 'utf8')); } catch { /* fresh */ }

  // Accumulate toward TARGET MCQs per chapter across repeated runs. Each run adds
  // up to BATCH_PER_RUN new MCQs to any chapter still below TARGET, then re-run to
  // keep building (quota-limited, so 300/chapter is reached over many runs).
  const TARGET = parseInt((args.target as string) || String(PER), 10);
  const BATCH_PER_RUN = PER;
  const keyOf = (ch: typeof SYLLABUS[number]) => `${ch.classLevel}::${ch.subject}::${slug(ch.title)}`;

  const todo = unique.filter(ch => (bank[keyOf(ch)]?.length || 0) < TARGET).slice(0, limit);
  // --concurrency N: run N chapters in parallel (use once billing/paid tier is on;
  // keep at 1 on the free tier to avoid rate-limit errors).
  const CONC = Math.max(1, parseInt((args.concurrency as string) || '1', 10));
  console.log(`MCQ generator: target ${TARGET}/chapter. ${todo.length} chapters below target, +${BATCH_PER_RUN} each, concurrency ${CONC}.`);
  let ok = 0, fail = 0, done = 0;

  async function processChapter(ch: typeof SYLLABUS[number]) {
    const key = keyOf(ch);
    const existing = bank[key] || [];
    const raw = await gen(ch);
    if (!raw || !raw.length) { console.log(`• C${ch.classLevel} ${ch.subject} — ${ch.title} FAILED`); fail++; return; }
    const seenQ = new Set(existing.map((q: any) => (q.question || '').toLowerCase().trim()));
    const fresh = raw.map((q: any, i: number) => ({
      id: `gen-${key}-${existing.length + i + 1}`,
      category: dailyCategory(String(ch.classLevel)),
      subject: ch.subject,
      classLevel: String(ch.classLevel),
      question: String(q.question || '').trim(),
      options: (q.options || []).slice(0, 4).map((o: any) => String(o)),
      correct: Math.max(0, Math.min(3, Number(q.correct) || 0)),
      explanation: String(q.explanation || '').trim(),
      difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
      chapter: ch.title,
    })).filter((q: any) => q.question && q.options.length === 4 && !seenQ.has(q.question.toLowerCase()));
    bank[key] = [...existing, ...fresh].slice(0, TARGET);
    ok++;
    console.log(`• C${ch.classLevel} ${ch.subject} — ${ch.title} ✓ (${bank[key].length}/${TARGET})`);
  }

  // Simple concurrency pool: run CONC chapters at a time, checkpoint every 10.
  for (let i = 0; i < todo.length; i += CONC) {
    await Promise.all(todo.slice(i, i + CONC).map(processChapter));
    done += Math.min(CONC, todo.length - i);
    if (done % 10 < CONC) await fs.writeFile(OUT, JSON.stringify(bank, null, 0), 'utf8'); // checkpoint
  }

  await fs.writeFile(OUT, JSON.stringify(bank, null, 0), 'utf8');
  const total = Object.values(bank).reduce((s, a) => s + a.length, 0);
  console.log(`\n✅ ${ok} chapters generated, ${fail} failed. Bank now has ${total} MCQs across ${Object.keys(bank).length} chapters → ${OUT}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
