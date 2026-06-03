/**
 * generated.ts — the auto-generated chapter-wise MCQ bank.
 *
 * The bank is large (several MB), so it is NOT bundled into the JS. It lives as a
 * static asset at /data/generated-mcqs.json (written by scripts/generate-mcqs.ts)
 * and is fetched ON DEMAND the first time Daily Challenges / Practice needs it.
 * This keeps every page chunk small and tab/page switches fast.
 */
import { Question } from './types';

// Map of "<classLevel>::<subject>::<chapter-slug>" → Question[].
// Empty until loadGeneratedBank() resolves; consumers fall back to the static
// bank in the meantime and re-render when the fetch completes.
export let GENERATED_BANK: Record<string, Question[]> = {};

let loaded = false;
let loading: Promise<Record<string, Question[]>> | null = null;

/** Fetch the generated MCQ bank once (cached). Safe to call repeatedly. */
export function loadGeneratedBank(): Promise<Record<string, Question[]>> {
  if (loaded) return Promise.resolve(GENERATED_BANK);
  if (loading) return loading;
  loading = (typeof fetch === 'undefined'
    ? Promise.resolve({} as Record<string, Question[]>)
    : fetch('/data/generated-mcqs.json')
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({})))
    .then((data: Record<string, Question[]>) => {
      GENERATED_BANK = data || {};
      loaded = true;
      return GENERATED_BANK;
    });
  return loading;
}

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

// Mirrors scripts/generate-mcqs.ts slug() so chapter keys line up exactly.
const chapterSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

/**
 * Generated questions for a specific class + subject + chapter title.
 * Returns the exact chapter's bank when present, else an empty array so callers
 * can broaden to subject-level. Lets Practice stay fully local (no backend call)
 * for any covered chapter.
 */
export function generatedForChapter(
  classLevel: string,
  subject: string,
  chapterTitle: string,
): Question[] {
  const key = `${classLevel}::${subject}::${chapterSlug(chapterTitle)}`;
  return GENERATED_BANK[key] ?? [];
}
