/**
 * generate-chapter-mcqs.ts — grow src/data/chapterMcqs.ts, the bank behind
 * /mcqs (the site's highest-CTR section, 14.78%) and the Question Paper
 * Generator.
 *
 * Note this is NOT scripts/generate-mcqs.ts, which writes a different bank
 * (public/data/generated-mcqs.json) used by the practice/daily-challenge flow.
 * Nothing previously wrote into chapterMcqs.ts, which is why Class 11 had 30
 * questions and Class 12 had 20, against Class 10's 442.
 *
 * Free-tier first, per the project rule: GEMINI_API_KEY_FREE is used when set;
 * the paid GEMINI_API_KEY needs an explicit ALLOW_PAID_GEMINI=1.
 *
 * Resume-friendly — re-run it and it only fills what is still short.
 *
 *   npx tsx scripts/generate-chapter-mcqs.ts --dry-run
 *   npx tsx scripts/generate-chapter-mcqs.ts --class 12 --per 10
 *   npx tsx scripts/generate-chapter-mcqs.ts --class 11 --subject Accountancy
 */
import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYLLABUS } from '../src/data/syllabus';
import {
  findGaps, validateMcq, mergeChapter, serializeBank, mcqSlug,
  type BankChapter, type BankMcq, type Gap,
} from '../src/lib/mcqBank';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BANK_FILE = path.join(ROOT, 'src', 'data', 'chapterMcqs.ts');
const MARKER = 'export const MCQ_CHAPTERS: McqChapter[] = ';

const args = Object.fromEntries(process.argv.slice(2).flatMap((a, i, arr) =>
  a.startsWith('--') ? [[a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : [],
)) as Record<string, string | true>;

const PER = parseInt((args.per as string) || '10', 10);
const LIMIT = args.limit ? parseInt(args.limit as string, 10) : Infinity;
const DRY = !!args['dry-run'];
const MODEL = (args.model as string) || 'gemini-2.5-flash';

// ── Key ladder ──────────────────────────────────────────────────────────────
const FREE_KEY = process.env.GEMINI_API_KEY_FREE;
const PAID_KEY = process.env.GEMINI_API_KEY;
const KEY = FREE_KEY || PAID_KEY;

function assertKeyAllowed() {
  if (!KEY) { console.error('Set GEMINI_API_KEY_FREE (preferred) or GEMINI_API_KEY'); process.exit(1); }
  if (FREE_KEY) { console.log('🆓 Using GEMINI_API_KEY_FREE — free tier, ₹0.'); return; }
  if (process.env.ALLOW_PAID_GEMINI !== '1') {
    console.error(`
⛔ No GEMINI_API_KEY_FREE set — this would bill every call to the PAID key.

   Add a free-tier key (AI Studio project with no billing linked) as
   GEMINI_API_KEY_FREE in .env, or re-run with ALLOW_PAID_GEMINI=1 to spend
   knowingly.
`);
    process.exit(1);
  }
  console.warn('⚠️  Running on the PAID Gemini key (ALLOW_PAID_GEMINI=1) — this will cost money.');
}

// ── Bank IO ─────────────────────────────────────────────────────────────────
async function readBank(): Promise<{ header: string; chapters: BankChapter[] }> {
  const src = await fs.readFile(BANK_FILE, 'utf8');
  const i = src.indexOf(MARKER);
  if (i < 0) throw new Error(`Could not find "${MARKER}" in ${BANK_FILE}`);
  const start = i + MARKER.length;
  let depth = 0, end = -1;
  for (let j = start; j < src.length; j++) {
    if (src[j] === '[') depth++;
    else if (src[j] === ']' && --depth === 0) { end = j + 1; break; }
  }
  if (end < 0) throw new Error('Unbalanced MCQ_CHAPTERS array');
  return { header: src.slice(0, i), chapters: JSON.parse(src.slice(start, end)) as BankChapter[] };
}

// ── Generation ──────────────────────────────────────────────────────────────
async function generate(gap: Gap, attempt = 1): Promise<BankMcq[]> {
  const prompt = `You are an expert CBSE/NCERT teacher setting objective questions.
For Class ${gap.classLevel} ${gap.subject}, chapter "${gap.chapter}", write ${gap.need} multiple-choice questions.

Rules:
- Cover the key concepts of THIS chapter only, at the right level for Class ${gap.classLevel}.
- Exactly 4 options per question, all four distinct and plausible.
- "correct" is the 0-based index of the right option.
- Every question needs an "explanation" of at least one full sentence saying WHY that option is right.
- Only settled textbook facts. If you are not certain a fact is correct, leave the question out.
- Simple language for an Indian student. Include units and formulas where relevant.

Return ONLY a JSON array of objects: {"q": string, "options": [string,string,string,string], "correct": number, "explanation": string}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(90_000),
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      },
    );
    if (!res.ok) {
      if ((res.status === 429 || res.status >= 500) && attempt <= 5) {
        await new Promise((r) => setTimeout(r, 2500 * attempt));
        return generate(gap, attempt + 1);
      }
      console.warn(`   ✗ ${res.status} ${res.statusText}`);
      return [];
    }
    const json = await res.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed)) return [];
    // Drop anything malformed rather than repairing it — see mcqBank.validateMcq.
    const kept = parsed.map(validateMcq).filter((m): m is BankMcq => m !== null);
    if (kept.length < parsed.length) {
      console.warn(`   ⚠ dropped ${parsed.length - kept.length} invalid question(s)`);
    }
    return kept;
  } catch (err) {
    if (attempt <= 3) { await new Promise((r) => setTimeout(r, 2000 * attempt)); return generate(gap, attempt + 1); }
    console.warn(`   ✗ ${(err as Error).message}`);
    return [];
  }
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const { header, chapters } = await readBank();
  const gaps = findGaps(
    SYLLABUS.map((c) => ({ classLevel: c.classLevel, subject: c.subject, title: c.title })),
    chapters,
    PER,
    { classLevel: args.class as string | undefined, subject: args.subject as string | undefined },
  );

  const before = chapters.reduce((n, c) => n + c.mcqs.length, 0);
  console.log(`Bank: ${chapters.length} chapters, ${before} questions. Target ${PER}/chapter.`);
  console.log(`Chapters short of target: ${gaps.length}${gaps.length > LIMIT ? ` (running ${LIMIT})` : ''}\n`);

  if (DRY) {
    const byGroup = new Map<string, { chapters: number; need: number }>();
    for (const g of gaps) {
      const k = `Class ${g.classLevel} ${g.subject}`;
      const agg = byGroup.get(k) ?? { chapters: 0, need: 0 };
      agg.chapters++; agg.need += g.need;
      byGroup.set(k, agg);
    }
    for (const [k, v] of [...byGroup].sort()) {
      console.log(`  ${k.padEnd(30)} ${String(v.chapters).padStart(3)} chapters, ${String(v.need).padStart(4)} questions needed`);
    }
    console.log(`\nDRY RUN — no API calls made, nothing written.`);
    return;
  }

  assertKeyAllowed();

  let bank = chapters;
  let added = 0;
  const todo = gaps.slice(0, LIMIT);
  for (const [i, gap] of todo.entries()) {
    process.stdout.write(`[${i + 1}/${todo.length}] Class ${gap.classLevel} ${gap.subject} — ${gap.chapter} (+${gap.need}) … `);
    const mcqs = await generate(gap);
    if (!mcqs.length) { console.log('skipped'); continue; }
    bank = mergeChapter(bank, {
      slug: mcqSlug(gap.classLevel, gap.subject, gap.chapter),
      classLevel: gap.classLevel,
      subject: gap.subject,
      chapter: gap.chapter,
      intro: `Practise chapter-wise MCQs for Class ${gap.classLevel} ${gap.subject} — ${gap.chapter}. Every question comes with the correct answer and an explanation.`,
      mcqs,
      faqs: [],
    });
    added += mcqs.length;
    console.log(`+${mcqs.length}`);
    // Write after every chapter so an interrupted run keeps its progress.
    await fs.writeFile(BANK_FILE, serializeBank(header, bank), 'utf8');
  }

  const after = bank.reduce((n, c) => n + c.mcqs.length, 0);
  console.log(`\nDone. ${bank.length} chapters, ${after} questions (+${added}).`);
  console.log('Next: npm run build && npm test');
}

main().catch((e) => { console.error(e); process.exit(1); });
