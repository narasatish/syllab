/**
 * questionPaper.ts — pure logic for the MCQ practice-paper generator.
 *
 * Scope note (deliberate): this builds an MCQ practice paper from the REAL
 * question bank in src/data/chapterMcqs.ts. It is NOT a "CBSE sample paper" —
 * a real board paper needs 1/2/3/5-mark short- and long-answer questions, and we
 * have no verified bank of those. Inventing them would put fabricated exam
 * content in front of students, so the tool honestly does what the data supports.
 *
 * Everything here is deterministic: the same (chapters, count, seed) always
 * produces the same paper, so a teacher can re-open or re-share the same link
 * and get an identical sheet. No dependencies; fully unit-tested.
 */

export interface PaperMcq {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface SourceChapter {
  slug: string;
  classLevel: string | number;
  subject: string;
  chapter: string;
  mcqs: PaperMcq[];
}

export interface PaperQuestion extends PaperMcq {
  chapter: string;
  subject: string;
}

export interface Paper {
  questions: PaperQuestion[];
  requested: number;
  available: number;
  truncated: boolean;
  seed: number;
}

/**
 * Small deterministic PRNG (mulberry32). Math.random() can't be used because the
 * paper must be reproducible from its seed.
 */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates using the supplied rng. Returns a new array; input is untouched. */
export function shuffle<T>(input: readonly T[], rng: () => number): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Total questions available across the selected chapters. */
export function countAvailable(chapters: readonly SourceChapter[]): number {
  return chapters.reduce((n, c) => n + (Array.isArray(c.mcqs) ? c.mcqs.length : 0), 0);
}

/**
 * Build a paper of up to `count` questions, spread as evenly as possible across
 * the selected chapters (round-robin) so one big chapter can't dominate.
 * Asking for more than exists is not an error — you get everything, with
 * `truncated: true` so the UI can say so honestly.
 */
export function buildPaper(
  chapters: readonly SourceChapter[],
  count: number,
  seed = 1,
): Paper {
  const available = countAvailable(chapters);
  const requested = Math.max(0, Math.floor(Number(count) || 0));
  const target = Math.min(requested, available);
  const rng = makeRng(seed);

  // Shuffle within each chapter, and shuffle the chapter order itself, so the
  // paper isn't always "chapter 1 first".
  const pools = shuffle(
    chapters.filter((c) => Array.isArray(c.mcqs) && c.mcqs.length > 0),
    rng,
  ).map((c) => ({
    chapter: c.chapter,
    subject: c.subject,
    items: shuffle(c.mcqs, rng),
  }));

  const picked: PaperQuestion[] = [];
  let round = 0;
  while (picked.length < target) {
    let addedThisRound = false;
    for (const p of pools) {
      if (picked.length >= target) break;
      const item = p.items[round];
      if (!item) continue;
      picked.push({ ...item, chapter: p.chapter, subject: p.subject });
      addedThisRound = true;
    }
    if (!addedThisRound) break; // every pool exhausted
    round++;
  }

  return {
    questions: picked,
    requested,
    available,
    truncated: requested > available,
    seed,
  };
}

/** Answer key as 1-based question number → option letter (A, B, C…). */
export function answerKey(paper: Paper): { n: number; answer: string }[] {
  return paper.questions.map((q, i) => ({
    n: i + 1,
    answer: String.fromCharCode(65 + (Number(q.correct) || 0)),
  }));
}
