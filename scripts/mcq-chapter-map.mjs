/**
 * mcq-chapter-map.mjs — hand-checked bridge between two chapter vocabularies.
 *
 * WHY THIS FILE EXISTS
 * /mcqs pages are built from chapterMcqs.ts, which names chapters the way the
 * OLDER NCERT syllabus did ("The Fundamental Unit of Life", "Motion"). The
 * question bank in public/data/generated-mcqs.json follows the CURRENT NCERT
 * chapter set ("cell-the-building-block-of-life", "describing-motion-around-us").
 * 89 of the 139 pages therefore found nothing to draw on.
 *
 * Automated matching was tried first and rejected on evidence: exact slug
 * matching recovered nothing extra, and token-similarity matching produced
 * WRONG pairings — it linked "Nutrition in Animals and Plants" to
 * "nutrition-in-plants" at 0.67 similarity, which would have put plant-only
 * questions on a page that also covers animals. On the site's second-best
 * converting cluster that is worse than leaving the page short.
 *
 * So this table is written by hand and every entry is a deliberate claim that
 * the two names denote the SAME chapter content. Where that claim cannot be
 * made honestly the entry is omitted, and the page simply keeps the questions
 * it already had.
 *
 * Key format: `${classLevel}::${chapter}` from chapterMcqs.ts
 * Value:      the chapter slug used inside generated-mcqs.json (subject is
 *             ignored when resolving, because the old set files Physics,
 *             Chemistry and Biology together under "Science").
 */
export const MCQ_CHAPTER_MAP = {
  // ── Class 7 ────────────────────────────────────────────────────────────
  '7::Heat and Temperature': 'heat',
  '7::Motion and Its Types': 'motion-and-time',

  // ── Class 8 ────────────────────────────────────────────────────────────
  '8::Squares and Square Roots': 'a-square-and-a-cube',

  // ── Class 9 ────────────────────────────────────────────────────────────
  // Current NCERT renamed several Class 9 Science chapters wholesale.
  '9::The Fundamental Unit of Life': 'cell-the-building-block-of-life',
  '9::Tissues': 'tissues-in-action',
  '9::Motion': 'describing-motion-around-us',

  // ── Class 10 ───────────────────────────────────────────────────────────
  // Pure wording difference — the bank keeps the second "the".
  '10::The Human Eye and Colourful World': 'the-human-eye-and-the-colourful-world',

  // ── Content decisions taken deliberately (see the notes below) ─────────
  // The page covers BOTH halves of the topic; the bank splits them. Mapping to
  // either alone would silently drop half the chapter, so both are merged.
  // 59 + 60 questions. This is the highest-impression /mcqs page in the
  // 2026-08-13 export (42 impressions at position 8.7).
  '7::Nutrition in Animals and Plants': ['nutrition-in-plants', 'nutrition-in-animals'],

  // The bank has no "Mole Concept" chapter, but 29 of the 50 questions in
  // Some Basic Concepts of Chemistry ARE mole, molar-mass, Avogadro and
  // stoichiometry questions. Taking the whole chapter would put significant
  // figures and SI units on a page that promises the mole concept, so the
  // entry carries a topic filter and only the on-topic questions are used.
  '11::Mole Concept': {
    chapter: 'some-basic-concepts-of-chemistry',
    match: /mole|molar|avogadro|stoichiometr|empirical formula|molecular mass|percentage composition/i,
  },
};

/**
 * DELIBERATELY NOT MAPPED — recorded so nobody "helpfully" adds them later.
 *
 * Olympiad variants ("Motion Olympiad", "Gravitation Olympiad", "Atoms and
 * Molecules Olympiad", "Maths Olympiad - Number System")
 *   Olympiad pages promise harder, competition-level questions. Filling them
 *   with standard chapter MCQs would misrepresent the page to the student.
 *
 * Case-study variants ("Light (Case Study)", "Electricity (Case Study)",
 * "Life Processes (Case Study)", "Acids and Bases (Case Study)", "Probability
 * (Case Study)", "Coordinate Geometry (Case Study)", "Money and Credit
 * (Case Study)", "Trigonometry (Applications Case Study)")
 *   CBSE case-study questions are a distinct format built on a passage. Plain
 *   MCQs are not case-study questions and must not be presented as such.
 *
 * RESOLVED 2026-08-16 — "Nutrition in Animals and Plants" (Class 7) is now
 * mapped to BOTH bank chapters. The merge was always the right answer; it
 * simply needed someone to take the content decision rather than leave the
 * page short. See MCQ_CHAPTER_MAP above.
 *
 * RESOLVED 2026-08-16 — Class 11 "Mole Concept" is now mapped to
 * some-basic-concepts-of-chemistry WITH A TOPIC FILTER. The note below was
 * half-right: no bank chapter carries that name, but 29 of that chapter's 50
 * questions are squarely mole/molar/Avogadro/stoichiometry. The filter takes
 * those and leaves behind the significant-figures and SI-unit questions, which
 * belong to the chapter but not to this page.
 *
 * All Class 11 Accountancy (10 chapters)
 *   The bank has no Accountancy subject whatsoever. There is nothing to map to.
 *
 * Class 9 "Matter in Our Surroundings", "Atoms and Molecules", "Structure of
 * Atom", "Gravitation", "Diversity in Living Organisms", "Why Do We Fall Ill",
 * "Natural Resources"; Class 8 "Cell Structure and Function", "Force and
 * Motion", "Microorganisms and Disease", "Rational Numbers", "Mensuration";
 * Class 10 "Sectors of Indian Economy"; Class 11 "Mole Concept"; Class 9/10
 * Social Science ("French Revolution", "Nazism")
 *   No chapter in the bank covers the same ground. These are absent from the
 *   current NCERT set the bank was generated against, not merely renamed.
 */
export const MCQ_MAP_EXCLUSIONS_DOCUMENTED = true;

/**
 * Resolve a chapterMcqs entry to bank chapter slug(s), or null.
 *
 * A map value may be:
 *   - a string  — one bank chapter
 *   - an array  — several bank chapters merged (the page covers all of them)
 *   - an object — { chapter, match } to take only the questions in that bank
 *                 chapter whose text matches, for pages narrower than the
 *                 chapter they live in.
 *
 * Always returns { slugs: string[], match: RegExp|null } or null, so callers
 * do not have to re-handle the three shapes.
 */
export function mappedChapterSlug(classLevel, chapter) {
  const v = MCQ_CHAPTER_MAP[`${classLevel}::${chapter}`];
  if (!v) return null;
  if (typeof v === 'string') return { slugs: [v], match: null };
  if (Array.isArray(v)) return { slugs: v, match: null };
  return { slugs: [v.chapter], match: v.match ?? null };
}
