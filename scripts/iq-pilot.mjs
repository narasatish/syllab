/**
 * iq-pilot.mjs — the PILOT set of chapter-level important-questions pages.
 * Shared by generate-sitemap.mjs (runs before the app is built) and
 * generate-prerender.mjs (which pulls full chapter data from the compiled SSR
 * bundle by id). Deliberately a small, hand-picked list — post-March-2026 we
 * add substantive pages in measured batches, never programmatic floods.
 * Ids and slugs must match src/data/syllabus.ts titles (slug = lowercase,
 * & → and, non-alphanumerics → '-').
 */
export const IQ_PILOT = [
  { id: '10-math-1', chapSlug: 'real-numbers', title: 'Real Numbers' },
  { id: '10-math-2', chapSlug: 'polynomials', title: 'Polynomials' },
  { id: '10-math-3', chapSlug: 'pair-of-linear-equations-in-two-variables', title: 'Pair of Linear Equations in Two Variables' },
  { id: '10-math-4', chapSlug: 'quadratic-equations', title: 'Quadratic Equations' },
  { id: '10-math-5', chapSlug: 'arithmetic-progressions', title: 'Arithmetic Progressions' },
  { id: '10-math-6', chapSlug: 'triangles', title: 'Triangles' },
  { id: '10-math-7', chapSlug: 'coordinate-geometry', title: 'Coordinate Geometry' },
  { id: '10-math-8', chapSlug: 'introduction-to-trigonometry', title: 'Introduction to Trigonometry' },
  { id: '10-math-9', chapSlug: 'some-applications-of-trigonometry', title: 'Some Applications of Trigonometry' },
  { id: '10-math-10', chapSlug: 'circles', title: 'Circles' },
  { id: '10-math-11', chapSlug: 'areas-related-to-circles', title: 'Areas Related to Circles' },
  { id: '10-math-12', chapSlug: 'surface-areas-and-volumes', title: 'Surface Areas and Volumes' },
  { id: '10-math-13', chapSlug: 'statistics', title: 'Statistics' },
  { id: '10-math-14', chapSlug: 'probability', title: 'Probability' },
].map((c) => ({ ...c, cls: '10', subjSlug: 'mathematics', subjName: 'Mathematics' }));
