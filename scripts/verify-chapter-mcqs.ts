/**
 * verify-chapter-mcqs.ts — independent second opinion on the answer key.
 *
 * Why: spot-reading 15 freshly generated Class 12 Commerce questions turned up a
 * real factual error — "primary function of a stock exchange" was keyed to
 * "facilitating new issues" when a stock exchange IS the secondary market. One
 * wrong key in 15 is far too high to ship hundreds of questions on trust, and no
 * structural test can catch it: the question was perfectly well-formed.
 *
 * How: re-ask the model each question COLD (no stored answer shown) via
 * POST /api/chat, which runs on the same free-first ladder. Where its answer
 * disagrees with the stored key, the question is flagged for a human to read.
 * A disagreement is not proof the bank is wrong — it is a shortlist worth the
 * few minutes it takes to check by hand.
 *
 * Never edits the bank. Writes a report only.
 *
 *   npx tsx scripts/verify-chapter-mcqs.ts --class 12 --subject Economics
 *   npx tsx scripts/verify-chapter-mcqs.ts --class 12 --limit 40
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BANK_FILE = path.join(ROOT, 'src', 'data', 'chapterMcqs.ts');
const MARKER = 'export const MCQ_CHAPTERS: McqChapter[] = ';
const API = process.env.SYLLAB_API || 'https://syllab-backend.onrender.com';
const OUT = path.join(ROOT, 'docs', 'mcq-verification-report.md');

const args = Object.fromEntries(process.argv.slice(2).flatMap((a, i, arr) =>
  a.startsWith('--') ? [[a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : [],
)) as Record<string, string | true>;

const LIMIT = args.limit ? parseInt(args.limit as string, 10) : Infinity;
const BATCH = parseInt((args.batch as string) || '10', 10);

interface Mcq { q: string; options: string[]; correct: number; explanation: string }
interface Chapter { slug: string; classLevel: string; subject: string; chapter: string; mcqs: Mcq[] }

async function readBank(): Promise<Chapter[]> {
  const src = await fs.readFile(BANK_FILE, 'utf8');
  const i = src.indexOf(MARKER) + MARKER.length;
  let depth = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === '[') depth++;
    else if (src[j] === ']' && --depth === 0) return JSON.parse(src.slice(i, j + 1)) as Chapter[];
  }
  throw new Error('Unbalanced MCQ_CHAPTERS');
}

async function ask(prompt: string, attempt = 1): Promise<string> {
  try {
    const r = await fetch(`${API}/api/chat`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(120_000), body: JSON.stringify({ message: prompt }),
    });
    if (!r.ok) {
      if ((r.status === 429 || r.status >= 500) && attempt <= 4) {
        await new Promise((s) => setTimeout(s, 4000 * attempt));
        return ask(prompt, attempt + 1);
      }
      return '';
    }
    return ((await r.json()) as { text?: string }).text ?? '';
  } catch {
    if (attempt <= 3) { await new Promise((s) => setTimeout(s, 3000 * attempt)); return ask(prompt, attempt + 1); }
    return '';
  }
}

async function main() {
  const bank = await readBank();
  const target = bank.filter((c) =>
    (!args.class || String(c.classLevel) === args.class) &&
    (!args.subject || c.subject === args.subject));
  const items = target.flatMap((c) => c.mcqs.map((q) => ({ c, q }))).slice(0, LIMIT);
  console.log(`Verifying ${items.length} questions from ${target.length} chapters via ${API}\n`);

  const disagreements: { c: Chapter; q: Mcq; said: string }[] = [];
  let checked = 0, unparsed = 0;

  for (let i = 0; i < items.length; i += BATCH) {
    const slice = items.slice(i, i + BATCH);
    // Cold: the stored key is deliberately NOT shown.
    const prompt = `You are a CBSE subject expert. Answer each multiple-choice question independently.
Reply with ONLY a JSON array of the correct option letters, in order, e.g. ["A","C","B"].
No explanation, no other text.

${slice.map((s, n) => `${n + 1}. [Class ${s.c.classLevel} ${s.c.subject}] ${s.q.q}\n${s.q.options.map((o, k) => `   ${'ABCD'[k]}) ${o}`).join('\n')}`).join('\n\n')}`;

    const raw = await ask(prompt);
    const m = raw.match(/\[[\s\S]*?\]/);
    let letters: string[] = [];
    try { letters = m ? JSON.parse(m[0]) as string[] : []; } catch { letters = []; }
    if (letters.length !== slice.length) { unparsed += slice.length; }
    else {
      slice.forEach((s, n) => {
        checked++;
        const said = String(letters[n] ?? '').trim().toUpperCase().slice(0, 1);
        if (said && said !== 'ABCD'[s.q.correct]) disagreements.push({ c: s.c, q: s.q, said });
      });
    }
    process.stdout.write(`  ${Math.min(i + BATCH, items.length)}/${items.length} — ${disagreements.length} to review\r`);
    await new Promise((s) => setTimeout(s, 1200));
  }

  const pct = checked ? ((disagreements.length / checked) * 100).toFixed(1) : '0';
  const lines = [
    '# MCQ verification report',
    '',
    `Generated ${new Date().toISOString().slice(0, 10)} — an INDEPENDENT re-answer of each question,`,
    'asked cold without showing the stored key. A disagreement is a shortlist item for a human,',
    'not proof the bank is wrong.',
    '',
    `- questions checked: **${checked}**`,
    `- model disagreed with the stored key: **${disagreements.length}** (${pct}%)`,
    `- unparseable batches (not checked): ${unparsed}`,
    '',
    '## To review',
    '',
  ];
  for (const d of disagreements) {
    lines.push(`### ${d.c.subject} — ${d.c.chapter}`);
    lines.push(`**Q:** ${d.q.q}`);
    d.q.options.forEach((o, k) => {
      const tag = k === d.q.correct ? ' ← **bank says**' : ('ABCD'[k] === d.said ? ' ← *model says*' : '');
      lines.push(`- ${'ABCD'[k]}) ${o}${tag}`);
    });
    lines.push(`> bank's reasoning: ${d.q.explanation}`, '');
  }
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, lines.join('\n'), 'utf8');
  console.log(`\n\nChecked ${checked}. Disagreements: ${disagreements.length} (${pct}%).`);
  console.log(`Report: ${path.relative(ROOT, OUT)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
