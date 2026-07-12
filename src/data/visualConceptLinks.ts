/**
 * Curated reciprocal links between Visual Learning lessons (/visual-learning/:slug)
 * and their full concept explainer (/concepts/:slug).
 *
 * HAND-VERIFIED, exact/near-exact matches only — no fuzzy matching — so we never
 * emit a wrong internal link (which would hurt the domain quality score). Lessons
 * with no confident concept target (e.g. life-cycle-of-a-butterfly, cell-division-
 * mitosis) are intentionally omitted.
 *
 * Used by: VisualLearning.tsx + ConceptExplainers.tsx (on-page links) and
 * generate-prerender.mjs (crawlable cross-links), via entry-server re-export.
 */
export const VISUAL_TO_CONCEPT: Record<string, string> = {
  'water-cycle': 'water-cycle',
  'photosynthesis': 'photosynthesis',
  'human-heart-blood-flow': 'human-heart-and-blood-circulation',
  'human-digestive-system': 'human-digestive-system',
  'respiratory-system': 'human-respiratory-system',
  'plant-vs-animal-cell': 'the-cell-structure-and-functions',
  'simple-electric-circuit': 'electric-circuits-symbols',
  'states-of-matter': 'states-of-matter',
  'phases-of-the-moon': 'phases-of-the-moon',
  'food-chain-energy-flow': 'food-chain-and-food-web',
  'reflex-action': 'reflex-action-and-neurons',
  'nitrogen-cycle': 'nitrogen-cycle',
  'structure-of-an-atom': 'structure-of-the-atom',
  'carbon-cycle': 'carbon-cycle',
  'dispersion-of-light': 'dispersion-of-light',
  'the-solar-system': 'solar-system-planets',
  'types-of-chemical-reactions': 'types-of-chemical-reactions',
  'human-excretory-system': 'human-excretory-system',
  'the-human-eye': 'human-eye-and-defects',
  'ph-scale-acids-bases': 'ph-scale-and-indicators',
  'how-we-hear-sound': 'diagram-of-human-ear',
  'electromagnetic-induction': 'electromagnetic-induction',
  'rock-cycle': 'rock-cycle',
  'greenhouse-effect': 'greenhouse-effect',
  'refraction-of-light': 'refraction-of-light',
  'series-and-parallel-circuits': 'resistance-and-resistivity',
  'transport-in-plants': 'transportation-plants-xylem-phloem',
  'magnetic-field-lines': 'magnetic-field-and-field-lines',
};

/** Reverse lookup: concept slug → visual lesson slug (built from the map above). */
export const CONCEPT_TO_VISUAL: Record<string, string> = Object.fromEntries(
  Object.entries(VISUAL_TO_CONCEPT).map(([v, c]) => [c, v]),
);
