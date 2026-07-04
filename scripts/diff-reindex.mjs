/**
 * diff-reindex.mjs — the CURATED allowlist of difference-between comparisons we
 * re-index (remove noindex + add to sitemap). Post-March-2026 we noindexed the
 * whole /difference-between/* cluster as thin. GSC then showed a handful earning
 * real impressions + clicks (genuine study intent, position 8–10). We deepen ONLY
 * those with a factual FAQ (so they're substantive, not thin) and let them index.
 *
 * Shared by generate-prerender.mjs (sets noindex:false + injects FAQ + FAQPage
 * schema) and generate-sitemap.mjs (adds the URLs). FAQ answers are textbook-
 * factual — no fabrication. Slugs MUST match differencesData.mjs entries that
 * are actually earning impressions (verified in the 2026-07 GSC export).
 */
export const DIFF_REINDEX = [
  {
    slug: 'saturated-vs-unsaturated-solution',
    faqs: [
      { q: 'What is the main difference between a saturated and an unsaturated solution?', a: 'A saturated solution holds the maximum amount of solute that can dissolve at a given temperature — no more will dissolve. An unsaturated solution holds less than that maximum, so it can still dissolve more solute.' },
      { q: 'How can you tell if a solution is saturated?', a: 'Add a little more solute and stir. If it dissolves, the solution is unsaturated; if the extra solute settles undissolved at the bottom, the solution is saturated.' },
      { q: 'Does temperature affect whether a solution is saturated?', a: 'Yes. For most solids, solubility rises with temperature, so a solution that is saturated at a low temperature can become unsaturated when heated — allowing more solute to dissolve.' },
    ],
  },
  {
    slug: 'transpiration-and-translocation',
    faqs: [
      { q: 'What is the difference between transpiration and translocation?', a: 'Transpiration is the loss of water vapour from the aerial parts of a plant (mainly the leaves) through stomata. Translocation is the transport of food (sugars made in the leaves) to other parts of the plant through the phloem.' },
      { q: 'Which tissues are involved in transpiration and translocation?', a: 'Transpiration involves water moving up through the xylem and evaporating from the leaves. Translocation moves prepared food through the phloem.' },
      { q: 'Does translocation move food only downwards?', a: 'No. Translocation moves food from the source (leaves) to sinks such as roots, fruits and growing tips — it can travel both upward and downward as the plant needs.' },
    ],
  },
  {
    slug: 'physical-and-political-map',
    faqs: [
      { q: 'What is the main difference between a physical and a political map?', a: 'A physical map shows natural features — mountains, rivers, plateaus, deserts and oceans — usually shaded by elevation. A political map shows human-made features — country and state boundaries, capitals and cities.' },
      { q: 'What do the colours on a physical map mean?', a: 'Physical maps usually use green for plains and lowlands, brown or yellow for mountains and highlands, and blue for water bodies such as rivers, lakes and seas.' },
      { q: 'Which map shows country and state borders?', a: 'A political map shows country and state borders, capital cities and major towns, drawn with clear boundary lines.' },
    ],
  },
  {
    slug: 'evaporation-and-sublimation',
    faqs: [
      { q: 'Is sublimation different from evaporation?', a: 'Yes. In evaporation a liquid turns into vapour (liquid → gas) at its surface, below the boiling point. In sublimation a solid turns directly into vapour (solid → gas) without first becoming a liquid.' },
      { q: 'Give examples of evaporation and sublimation.', a: 'Evaporation: wet clothes drying, water drying up from a puddle. Sublimation: camphor, naphthalene balls and dry ice (solid carbon dioxide) turning directly into vapour.' },
      { q: 'Does sublimation skip the liquid state?', a: 'Yes — that is the key point. Sublimation goes straight from solid to gas without passing through the liquid state, while evaporation starts from a liquid.' },
    ],
  },
  {
    slug: 'weathering-vs-erosion',
    faqs: [
      { q: 'What is the difference between weathering and erosion?', a: 'Weathering is the breaking down of rocks into smaller pieces at their original place (in situ), without being moved. Erosion is the removal and transport of those broken pieces to a new location by wind, water or ice.' },
      { q: 'Does weathering involve movement of rock?', a: 'No. Weathering breaks rock in place; the transport of the broken material to a new place is erosion.' },
      { q: 'What are the main agents of erosion?', a: 'The main agents of erosion are running water (rivers), wind, glaciers (ice) and sea waves.' },
    ],
  },
];

export const DIFF_REINDEX_SLUGS = new Set(DIFF_REINDEX.map((d) => d.slug));
