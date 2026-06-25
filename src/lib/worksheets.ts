/**
 * Printable worksheet library — aggregates every category builder into one
 * catalog. All sheets are original A4 SVGs generated client-side (no copyrighted
 * assets, no network, no cost) and carry a "syllab.in" watermark. Pairs with
 * printWorksheet() to export as PDF.
 *
 * Covers the full early-learning taxonomy:
 *   Letters · Phonics · Vocabulary · Reading · Writing ·
 *   Numbers & Counting · Simple Math · Shapes · Colors ·
 *   Science · Social & Emotional · Other Activities
 */
import type { Worksheet, WorksheetCategory } from './worksheets/core';
import { buildLetters, buildPhonics, buildVocabulary, buildReading, buildWriting } from './worksheets/literacy';
import { buildNumbers, buildMath } from './worksheets/numeracy';
import { buildShapes, buildColors, buildScience, buildSocial, buildOther } from './worksheets/world';

export type { Worksheet, WorksheetCategory };

/** The full catalog, in display order. */
export function buildCatalog(): Worksheet[] {
  return [
    ...buildLetters(),
    ...buildPhonics(),
    ...buildVocabulary(),
    ...buildReading(),
    ...buildWriting(),
    ...buildNumbers(),
    ...buildMath(),
    ...buildShapes(),
    ...buildColors(),
    ...buildScience(),
    ...buildSocial(),
    ...buildOther(),
  ];
}
