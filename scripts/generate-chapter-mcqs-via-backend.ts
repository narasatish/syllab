/**
 * generate-chapter-mcqs-via-backend.ts — fill src/data/chapterMcqs.ts by calling
 * the site's OWN backend instead of Gemini directly.
 *
 * Why this exists: scripts/generate-chapter-mcqs.ts needs GEMINI_API_KEY_FREE in
 * .env, and that key only lives on Render. The deployed backend already has it
 * and already implements the whole safety stack we want — free-key-first, a
 * monthly budget cap, a daily call cap, and a Firestore cache. Routing through
 * POST /api/questions/batch reuses all of that, so a bulk run costs ₹0 and
 * cannot silently hit the paid key.
 *
 * Verified before writing this: a 3-question call moved liveCallsToday 6 -> 8
 * while spentInr stayed at 0.19, i.e. the free tier served it.
 *
 * Resume-friendly — re-run and it only fills chapters still short of target.
 *
 *   npx tsx scripts/generate-chapter-mcqs-via-backend.ts --dry-run
 *   npx tsx scripts/generate-chapter-mcqs-via-backend.ts --class 12 --subject Accountancy
 *   npx tsx scripts/generate-chapter-mcqs-via-backend.ts --class 11 --limit 5 --per 10
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYLLABUS } from '../src/data/syllabus';
import {
  findGaps, validateMcq, mergeChapter, serializeBank, mcqSlug, canonicalClassLevel,
  type BankChapter, type BankMcq, type Gap,
} from '../src/lib/mcqBank';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BANK_FILE = path.join(ROOT, 'src', 'data', 'chapterMcqs.ts');
const MARKER = 'export const MCQ_CHAPTERS: McqChapter[] = ';
const API = process.env.SYLLAB_API || 'https://syllab-backend.onrender.com';

const args = Object.fromEntries(process.argv.slice(2).flatMap((a, i, arr) =>
  a.startsWith('--') ? [[a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : [],
)) as Record<string, string | true>;

const PER = parseInt((args.per as string) || '10', 10);
const LIMIT = args.limit ? parseInt(args.limit as string, 10) : Infinity;
const DRY = !!args['dry-run'];
/** Pause between calls so a long run cannot look like abuse of our own API. */
const GAP_MS = parseInt((args.delay as string) || '1500', 10);

interface ApiQuestion {
  question_text?: string;
  options?: unknown;
  correct_index?: unknown;
  explanation?: string;
}

/**
 * Study-advice padding, not subject knowledge. When the model runs short of real
 * questions for a chapter it fills the gap with things like "What should you do
 * when a question contains unfamiliar data?" — and because the backend caches by
 * chapter, re-running just serves the same padding back. It has to be rejected
 * on the way IN, not cleaned up afterwards.
 */
const FILLER = /what should you do when a question|what is the best way to revise|best way to prepare for|how should you (revise|approach|study)|what is the most effective way to (study|revise|practice)|which study habit/i;

async function readBank(): Promise<{ header: string; chapters: BankChapter[]; footer: string }> {
  const src = await fs.readFile(BANK_FILE, 'utf8');
  const i = src.indexOf(MARKER);
  if (i < 0) throw new Error(`Could not find "${MARKER}"`);
  const start = i + MARKER.length;
  let depth = 0, end = -1;
  for (let j = start; j < src.length; j++) {
    if (src[j] === '[') depth++;
    else if (src[j] === ']' && --depth === 0) { end = j + 1; break; }
  }
  if (end < 0) throw new Error('Unbalanced MCQ_CHAPTERS array');
  // Everything after the array (MCQ_GROUPS, getMcqChapter) must be carried
  // through — dropping it silently broke the build once.
  const afterArray = src.slice(end).replace(/^;?\r?\n/, '');
  return { header: src.slice(0, i), chapters: JSON.parse(src.slice(start, end)) as BankChapter[], footer: afterArray };
}

/** Health probe — refuses to run a bulk job if the backend is not on the free key. */
async function assertFreeTier() {
  const r = await fetch(`${API}/api/ai/health`, { signal: AbortSignal.timeout(45_000) });
  if (!r.ok) throw new Error(`health check failed: ${r.status}`);
  const h = await r.json() as { ai?: Record<string, unknown> };
  const ai = h.ai ?? {};
  if (!ai.freeKeyPresent || !ai.freeFirstActive) {
    console.error(`\n⛔ Backend is NOT on the free tier (freeKeyPresent=${ai.freeKeyPresent}, freeFirstActive=${ai.freeFirstActive}).\n   Refusing to run a bulk job that would spend real money.\n`);
    process.exit(1);
  }
  if (ai.aiDisabled) { console.error('\n⛔ Backend reports aiDisabled — kill switch is on.\n'); process.exit(1); }
  console.log(`🆓 Backend free-first active. Spend so far ₹${ai.spentInr} of ₹${ai.budgetInr}, ${ai.liveCallsToday}/${ai.dailyCallCap} calls today.`);
  return Number(ai.spentInr) || 0;
}

async function fetchBatch(gap: Gap, attempt = 1): Promise<BankMcq[]> {
  try {
    const r = await fetch(`${API}/api/questions/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(180_000),
      body: JSON.stringify({
        classLevel: gap.classLevel, subject: gap.subject, chapter: gap.chapter,
        difficulty: 'mixed', count: gap.need,
      }),
    });
    if (!r.ok) {
      if ((r.status === 429 || r.status >= 500) && attempt <= 4) {
        await new Promise((s) => setTimeout(s, 4000 * attempt));
        return fetchBatch(gap, attempt + 1);
      }
      console.warn(`   ✗ ${r.status}`);
      return [];
    }
    const data = await r.json() as { questions?: ApiQuestion[] };
    const raw = Array.isArray(data.questions) ? data.questions : [];
    // Map the API shape onto the bank shape, then run the SAME validator the
    // direct-Gemini path uses — malformed questions are dropped, never repaired.
    const kept = raw
      .filter((q) => !FILLER.test(String(q.question_text ?? '')))
      .map((q) => validateMcq({
        q: q.question_text, options: q.options,
        correct: q.correct_index, explanation: q.explanation,
      }))
      .filter((m): m is BankMcq => m !== null);
    if (kept.length < raw.length) console.warn(`   ⚠ dropped ${raw.length - kept.length} (invalid or study-advice filler)`);
    return kept;
  } catch (e) {
    if (attempt <= 3) { await new Promise((s) => setTimeout(s, 3000 * attempt)); return fetchBatch(gap, attempt + 1); }
    console.warn(`   ✗ ${(e as Error).message}`);
    return [];
  }
}

/**
 * Spread correct answers evenly across A–D by rotating each question's options.
 * Deterministic (fixed seed) so re-running is stable. Questions containing an
 * "…of the above" option are left alone — moving those reads wrong.
 */
function rebalance(bank: BankChapter[]): BankChapter[] {
  let seed = 20260804;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  let slot = 0;
  return bank.map((c) => ({
    ...c,
    mcqs: c.mcqs.map((q) => {
      if (q.options.some((o) => /of the above/i.test(o))) return q;
      const want = slot++ % 4;
      if (want === q.correct) return q;
      const correctText = q.options[q.correct];
      const rest = q.options.filter((_, k) => k !== q.correct);
      for (let k = rest.length - 1; k > 0; k--) {
        const j = Math.floor(rnd() * (k + 1));
        [rest[k], rest[j]] = [rest[j], rest[k]];
      }
      return { ...q, options: [...rest.slice(0, want), correctText, ...rest.slice(want)], correct: want };
    }),
  }));
}

async function main() {
  const { header, chapters, footer } = await readBank();
  const gaps = findGaps(
    SYLLABUS.map((c) => ({ classLevel: c.classLevel, subject: c.subject, title: c.title })),
    chapters, PER,
    { classLevel: args.class as string | undefined, subject: args.subject as string | undefined },
  );
  const before = chapters.reduce((n, c) => n + c.mcqs.length, 0);
  console.log(`Bank: ${chapters.length} chapters, ${before} questions. Target ${PER}/chapter.`);
  console.log(`Short of target: ${gaps.length}${gaps.length > LIMIT ? ` (running ${LIMIT})` : ''}\n`);

  if (DRY) {
    const by = new Map<string, number>();
    for (const g of gaps) by.set(`Class ${g.classLevel} ${g.subject}`, (by.get(`Class ${g.classLevel} ${g.subject}`) ?? 0) + 1);
    for (const [k, v] of [...by].sort()) console.log(`  ${k.padEnd(30)} ${v} chapters`);
    console.log('\nDRY RUN — no API calls, nothing written.');
    return;
  }

  const spentBefore = await assertFreeTier();
  let bank = chapters, added = 0;
  const todo = gaps.slice(0, LIMIT);
  for (const [i, gap] of todo.entries()) {
    process.stdout.write(`[${i + 1}/${todo.length}] Class ${gap.classLevel} ${gap.subject} — ${gap.chapter} (+${gap.need}) … `);
    const mcqs = await fetchBatch(gap);
    if (!mcqs.length) { console.log('skipped'); continue; }
    bank = mergeChapter(bank, {
      slug: mcqSlug(gap.classLevel, gap.subject, gap.chapter),
      // The bank stores "Class N"; SYLLABUS supplies a bare number. Writing the
      // bare form here is what put `classLevel: "1"` next to `"Class 1"` in the
      // bank and tripped the classLevel-consistency test.
      classLevel: canonicalClassLevel(gap.classLevel), subject: gap.subject, chapter: gap.chapter,
      intro: `Practise chapter-wise MCQs for Class ${gap.classLevel} ${gap.subject} — ${gap.chapter}. Every question comes with the correct answer and an explanation.`,
      mcqs, faqs: [],
    });
    added += mcqs.length;
    console.log(`+${mcqs.length}`);
    await fs.writeFile(BANK_FILE, serializeBank(header, bank, footer), 'utf8'); // resumable
    await new Promise((s) => setTimeout(s, GAP_MS));
  }

  // The model favours early options — a raw Accountancy batch came back
  // A:42 B:40 C:31 D:7, which lets a student score by always picking A. Rebalance
  // the whole bank so the correct answer is spread evenly. This only moves an
  // option's POSITION; the correct answer text is untouched.
  bank = rebalance(bank);
  await fs.writeFile(BANK_FILE, serializeBank(header, bank, footer), 'utf8');

  const after = bank.reduce((n, c) => n + c.mcqs.length, 0);
  const spentAfter = await assertFreeTier();
  console.log(`\nDone. ${bank.length} chapters, ${after} questions (+${added}).`);
  console.log(`Spend delta: ₹${(spentAfter - spentBefore).toFixed(2)} (0.00 means the free tier served every call).`);
  console.log('Next: npm run build && npm test');
}

main().catch((e) => { console.error(e); process.exit(1); });
