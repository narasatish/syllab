/**
 * Diagram Lab — Science diagrams with descriptions, key parts & image URLs.
 * Images sourced from Wikimedia Commons (CC-licensed, free to use).
 *
 * This file re-exports diagrams from subject-specific files and provides utility functions.
 */

export interface DiagramPart {
  label: string;
  description: string;
}

export interface Diagram {
  id: string;
  name: string;
  subject: 'biology' | 'physics' | 'chemistry';
  classRange: string;   // display text e.g. "Class 9–10"
  classNumber: number;  // primary class for filtering (6–12)
  imageUrl: string;
  fallbackGradient: string;
  emoji: string;
  summary: string;
  parts: DiagramPart[];
  funFact?: string;
  examTip?: string;
}

// ── Existing subject-level imports ─────────────────────────────────────────
import { biologyDiagrams }   from './diagrams/biology-diagrams';
import { physicsDiagrams }   from './diagrams/physics-diagrams';
import { chemistryDiagrams } from './diagrams/chemistry-diagrams';

// ── Class 6, 7, 8 (combined Science) ───────────────────────────────────────
import { class6Diagrams } from './diagrams/class6-science';
import { class7Diagrams } from './diagrams/class7-science';
import { class8Diagrams } from './diagrams/class8-science';

// ── Class 9 ─────────────────────────────────────────────────────────────────
import { class9BioDiagrams }  from './diagrams/class9-bio';
import { class9PhyDiagrams }  from './diagrams/class9-phy';
import { class9ChemDiagrams } from './diagrams/class9-chem';

// ── Class 10 ────────────────────────────────────────────────────────────────
import { class10BioDiagrams }  from './diagrams/class10-bio';
import { class10PhyDiagrams }  from './diagrams/class10-phy';
import { class10ChemDiagrams } from './diagrams/class10-chem';

// ── Class 11 ────────────────────────────────────────────────────────────────
import { class11BioDiagrams }  from './diagrams/class11-bio';
import { class11PhyDiagrams }  from './diagrams/class11-phy';
import { class11ChemDiagrams } from './diagrams/class11-chem';

// ── Class 12 ────────────────────────────────────────────────────────────────
import { class12BioDiagrams }  from './diagrams/class12-bio';
import { class12PhyDiagrams }  from './diagrams/class12-phy';
import { class12ChemDiagrams } from './diagrams/class12-chem';

/**
 * All diagrams combined (existing 42 + ~140 new = ~180 total).
 */
export const DIAGRAMS: Diagram[] = [
  ...biologyDiagrams,
  ...physicsDiagrams,
  ...chemistryDiagrams,
  ...class6Diagrams,
  ...class7Diagrams,
  ...class8Diagrams,
  ...class9BioDiagrams,
  ...class9PhyDiagrams,
  ...class9ChemDiagrams,
  ...class10BioDiagrams,
  ...class10PhyDiagrams,
  ...class10ChemDiagrams,
  ...class11BioDiagrams,
  ...class11PhyDiagrams,
  ...class11ChemDiagrams,
  ...class12BioDiagrams,
  ...class12PhyDiagrams,
  ...class12ChemDiagrams,
];

export type DiagramSubject = 'all' | 'biology' | 'physics' | 'chemistry';
export type DiagramClass   = 'all' | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Filter diagrams by subject AND/OR class */
export function filterDiagrams(
  subject: DiagramSubject,
  classNum: DiagramClass,
): Diagram[] {
  return DIAGRAMS.filter((d) => {
    const subjectOk = subject === 'all' || d.subject === subject;
    const classOk   = classNum === 'all' || d.classNumber === classNum;
    return subjectOk && classOk;
  });
}

/** Legacy helper — filter by subject only */
export function getDiagramsBySubject(subject: DiagramSubject): Diagram[] {
  return filterDiagrams(subject, 'all');
}

export type DiagramSubject_ = DiagramSubject; // backward compat alias
