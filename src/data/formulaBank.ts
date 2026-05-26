/**
 * Formula Bank — Maths, Physics, Chemistry, Aptitude
 * Main export file — types and aggregation
 */

// Types
export interface FormulaItem {
  name: string;
  formula: string;
  variables: string;
  example?: string;
}

export interface FormulaTopic {
  topic: string;
  items: FormulaItem[];
}

export interface FormulaClassSection {
  classLabel: string;
  topics: FormulaTopic[];
}

export interface FormulaSubject {
  id: 'maths' | 'physics' | 'chemistry' | 'aptitude';
  label: string;
  icon: string;
  gradient: string;
  textColor: string;
  sections: FormulaClassSection[];
}

// Import all subject formulas
import { mathsFormulaData } from './formulas/maths-formulas';
import { physicsFormulaData } from './formulas/physics-formulas';
import { chemistryFormulaData } from './formulas/chemistry-formulas';
import { aptitudeFormulaData } from './formulas/aptitude-formulas';

// Aggregate all subjects
export const FORMULA_BANK: FormulaSubject[] = [
  mathsFormulaData,
  physicsFormulaData,
  chemistryFormulaData,
  aptitudeFormulaData,
];

// Helper function to get a specific subject
export function getSubject(id: FormulaSubject['id']): FormulaSubject | undefined {
  return FORMULA_BANK.find((s) => s.id === id);
}
