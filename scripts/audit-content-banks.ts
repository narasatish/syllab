/**
 * audit-content-banks.ts — run the published-content guards across every bank.
 *
 * The MCQ sweep found a 0.31% defect rate: 11 unanswerable questions, 3 with
 * duplicate options, 1 leaking model reasoning. Those guards had never been run
 * against PYQs, solved examples, revision-note FAQs or sample papers, which are
 * ~2,800 further items already published. This checks the same failure modes.
 *
 *   npx tsx scripts/audit-content-banks.ts
 */
import { PYQ_CHAPTERS } from '../src/data/pyqs';
import { REVISION_NOTES } from '../src/data/revisionNotes';
import { SOLVED_SETS } from '../src/data/solvedExamples';

/** Model scratchpad that escaped into a published answer. */
const LEAK = /wait,|let me (recalculate|recompute|recheck|verify|reconsider)|i'll mark|assuming (a )?typo|none of the options|but the option says|hmm,|this doesn't match|as an ai|i think the answer|which contradicts|error in given data|doesn't yield/i;
/** Promises material the page has no field to render, so it cannot be answered. */
const DANGLING = /\b(the|given) (passage|diagram|figure|graph|extract)\b|shown (above|below)/i;
/** A stub left in published content. */
const STUB = /lorem ipsum|\bTODO\b|\bFIXME\b|\bTBD\b|\[insert\b/i;

interface Item { q: string; a: string; where: string; }

function scan(name: string, items: Item[]) {
  const hits: Record<string, Item[]> = { leak: [], dangling: [], stub: [], thin: [] };
  for (const it of items) {
    if (LEAK.test(it.a)) hits.leak.push(it);
    if (DANGLING.test(it.q)) hits.dangling.push(it);
    if (STUB.test(it.q + it.a)) hits.stub.push(it);
    if (it.a.trim().length < 25) hits.thin.push(it);
  }
  const total = Object.values(hits).reduce((n, v) => n + v.length, 0);
  const pct = items.length ? ((100 * total) / items.length).toFixed(2) : '0.00';
  console.log(
    `${name.padEnd(17)} ${String(items.length).padStart(6)} items  ` +
    `leak ${hits.leak.length}  dangling ${hits.dangling.length}  ` +
    `stub ${hits.stub.length}  thin ${hits.thin.length}   = ${total} (${pct}%)`,
  );
  for (const [kind, list] of Object.entries(hits)) {
    for (const it of list.slice(0, 3)) {
      console.log(`    ${kind.toUpperCase().padEnd(9)} ${it.where} :: ${it.q.slice(0, 68)}`);
    }
    if (list.length > 3) console.log(`    ${kind.toUpperCase().padEnd(9)} ...and ${list.length - 3} more`);
  }
  return total;
}

const pyqs: Item[] = (PYQ_CHAPTERS as any[]).flatMap((c) =>
  (c.questions ?? []).map((q: any) => ({ q: String(q.q ?? ''), a: String(q.answer ?? ''), where: c.slug })));

const solved: Item[] = (SOLVED_SETS as any[]).flatMap((c) =>
  (c.examples ?? []).map((e: any) => ({ q: String(e.problem ?? ''), a: String(e.solution ?? ''), where: c.slug })));

const notes: Item[] = (REVISION_NOTES as any[]).flatMap((r) =>
  (r.faqs ?? []).map((f: any) => ({ q: String(f.q ?? ''), a: String(f.a ?? ''), where: r.slug })));

console.log('PUBLISHED-CONTENT AUDIT — same guards that caught 15 broken MCQs\n');
let total = 0;
total += scan('pyqs', pyqs);
total += scan('solved-examples', solved);
total += scan('revision-note FAQs', notes);

const all = pyqs.length + solved.length + notes.length;
console.log(`\nTOTAL: ${total} defects across ${all} published items (${((100 * total) / all).toFixed(2)}%)`);
process.exit(total > 0 ? 1 : 0);
