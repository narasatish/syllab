/**
 * generated.ts — loads the auto-generated chapter-wise MCQ bank
 * (scripts/generate-mcqs.ts → generated.json) and exposes helpers to merge it
 * into the static CLASS_BANK. Board-aware reuse: NCERT-aligned boards share these.
 */
import raw from './generated.json';
import { Question } from './types';

// Map of "<classLevel>::<subject>::<chapter-slug>" → Question[]
export const GENERATED_BANK: Record<string, Question[]> = raw as Record<string, Question[]>;

/** All generated questions for a class (across subjects/chapters). */
export function generatedForClass(classLevel: string): Question[] {
  const prefix = `${classLevel}::`;
  return Object.entries(GENERATED_BANK)
    .filter(([k]) => k.startsWith(prefix))
    .flatMap(([, v]) => v);
}

/** Generated questions for a specific class + subject. */
export function generatedFor(classLevel: string, subject: string): Question[] {
  const prefix = `${classLevel}::${subject}::`;
  return Object.entries(GENERATED_BANK)
    .filter(([k]) => k.startsWith(prefix))
    .flatMap(([, v]) => v);
}

export const GENERATED_COUNT = Object.values(GENERATED_BANK).reduce((s, a) => s + a.length, 0);
