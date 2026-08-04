/**
 * mcqBank.ts — pure helpers for growing the chapter-wise MCQ bank
 * (src/data/chapterMcqs.ts, which powers /mcqs and the Question Paper
 * Generator). Used by scripts/generate-chapter-mcqs.ts.
 *
 * These live here rather than beside the script so they are covered by the test
 * suite: this code decides what an AI model is allowed to write into the bank,
 * and a malformed entry would put a broken question in front of a student. The
 * module is not imported by any app code, so it never reaches the bundle.
 */

export interface BankMcq {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface BankFaq { q: string; a: string }

export interface BankChapter {
  slug: string;
  classLevel: string;
  subject: string;
  chapter: string;
  intro: string;
  mcqs: BankMcq[];
  faqs: BankFaq[];
}

export interface SyllabusLike {
  classLevel: string | number;
  subject: string;
  title: string;
}

/** URL slug for a NEW bank chapter. Existing slugs are indexed — never recompute those. */
export function mcqSlug(classLevel: string | number, subject: string, chapter: string): string {
  const part = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `class-${part(String(classLevel))}-${part(subject)}-${part(chapter)}`.slice(0, 80).replace(/-$/, '');
}

/** Identity of a chapter independent of slug spelling, so gaps aren't double-counted. */
export function chapterKey(classLevel: string | number, subject: string, chapter: string): string {
  const norm = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return `${norm(String(classLevel))}::${norm(subject)}::${norm(chapter)}`;
}

export interface Gap {
  classLevel: string;
  subject: string;
  chapter: string;
  slug: string;
  have: number;
  need: number;
}

/**
 * Chapters that need more questions, neediest first (fewest existing), so a
 * partial run always improves the worst-covered chapters rather than whichever
 * happened to sort first.
 */
export function findGaps(
  syllabus: readonly SyllabusLike[],
  existing: readonly BankChapter[],
  target: number,
  filter?: { classLevel?: string; subject?: string },
): Gap[] {
  const have = new Map<string, number>();
  for (const c of existing) {
    have.set(chapterKey(c.classLevel, c.subject, c.chapter), Array.isArray(c.mcqs) ? c.mcqs.length : 0);
  }
  const seen = new Set<string>();
  const gaps: Gap[] = [];
  for (const s of syllabus) {
    if (filter?.classLevel && String(s.classLevel) !== filter.classLevel) continue;
    if (filter?.subject && s.subject !== filter.subject) continue;
    const key = chapterKey(s.classLevel, s.subject, s.title);
    if (seen.has(key)) continue; // boards share chapters — generate once
    seen.add(key);
    const n = have.get(key) ?? 0;
    if (n >= target) continue;
    gaps.push({
      classLevel: String(s.classLevel),
      subject: s.subject,
      chapter: s.title,
      slug: mcqSlug(s.classLevel, s.subject, s.title),
      have: n,
      need: target - n,
    });
  }
  return gaps.sort((a, b) => a.have - b.have || a.classLevel.localeCompare(b.classLevel));
}

/**
 * Accept a model-produced question only if it is actually usable. Anything
 * questionable is dropped rather than repaired — a silently "fixed" question is
 * how a wrong answer key reaches a student.
 */
export function validateMcq(raw: unknown): BankMcq | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const q = typeof o.q === 'string' ? o.q.trim() : '';
  const explanation = typeof o.explanation === 'string' ? o.explanation.trim() : '';
  if (q.length < 10 || explanation.length < 10) return null;

  if (!Array.isArray(o.options)) return null;
  const options = o.options.map((x) => (typeof x === 'string' ? x.trim() : '')).filter(Boolean);
  if (options.length !== 4) return null;
  // Duplicate options make the question unanswerable.
  if (new Set(options.map((x) => x.toLowerCase())).size !== 4) return null;

  // Accept a number or a numeric string ("2"), because models emit both and
  // dropping the question over that would be wasteful. Everything else is
  // rejected outright — note Number(null) is 0, so a missing `correct` would
  // otherwise pass as "option A" and ship a wrong answer key to a student.
  const rawCorrect = o.correct;
  if (typeof rawCorrect !== 'number' && typeof rawCorrect !== 'string') return null;
  const correct = Number(rawCorrect);
  if (!Number.isInteger(correct) || correct < 0 || correct > 3) return null;

  return { q, options, correct, explanation };
}

/** Drop questions already in the chapter (or repeated within the batch). */
export function dedupeMcqs(existing: readonly BankMcq[], incoming: readonly BankMcq[]): BankMcq[] {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const seen = new Set(existing.map((m) => norm(m.q)));
  const out: BankMcq[] = [];
  for (const m of incoming) {
    const k = norm(m.q);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(m);
  }
  return out;
}

/**
 * Merge a generated batch into the bank. Existing chapters keep their slug
 * (already indexed by Google) and gain only new questions; unknown chapters are
 * appended.
 */
export function mergeChapter(
  bank: readonly BankChapter[],
  incoming: BankChapter,
): BankChapter[] {
  const key = chapterKey(incoming.classLevel, incoming.subject, incoming.chapter);
  const idx = bank.findIndex((c) => chapterKey(c.classLevel, c.subject, c.chapter) === key);
  if (idx < 0) return [...bank, incoming];

  const prev = bank[idx];
  const merged: BankChapter = {
    ...prev,
    intro: prev.intro || incoming.intro,
    mcqs: [...prev.mcqs, ...dedupeMcqs(prev.mcqs, incoming.mcqs)],
    faqs: prev.faqs.length ? prev.faqs : incoming.faqs,
  };
  const out = [...bank];
  out[idx] = merged;
  return out;
}

/** Re-emit src/data/chapterMcqs.ts with its original header preserved. */
export function serializeBank(header: string, chapters: readonly BankChapter[]): string {
  return `${header}export const MCQ_CHAPTERS: McqChapter[] = ${JSON.stringify(chapters, null, 2)};\n`;
}
