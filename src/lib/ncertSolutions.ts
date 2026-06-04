/**
 * ncertSolutions.ts — lazy loader for the NCERT exercise-solutions bank
 * (public/data/ncert-solutions.json, written by scripts/generate-ncert-solutions.ts).
 * Bank shape: { "<class>::<subject>::<chapter-slug>": [{ q, solution }] }.
 * Chapter display titles are derived from SYLLABUS (so the bank stays small).
 */
import { SYLLABUS } from '../data/syllabus';

export interface NcertQA { q: string; solution: string; }
export interface NcertChapter {
  key: string;
  classLevel: string;
  subject: string;
  title: string;
  slug: string;        // chapter slug
  subjectSlug: string; // subject slug
}

// Must match scripts/generate-ncert-solutions.ts slug().
export const ncertSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

let BANK: Record<string, NcertQA[]> = {};
let loaded = false;
let loading: Promise<Record<string, NcertQA[]>> | null = null;

export function loadNcertSolutions(): Promise<Record<string, NcertQA[]>> {
  if (loaded) return Promise.resolve(BANK);
  if (loading) return loading;
  loading = (typeof fetch === 'undefined'
    ? Promise.resolve({} as Record<string, NcertQA[]>)
    : fetch('/data/ncert-solutions.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({})))
    .then((d: Record<string, NcertQA[]>) => { BANK = d || {}; loaded = true; return BANK; });
  return loading;
}

export function qaForKey(key: string): NcertQA[] { return BANK[key] || []; }

/** Unique chapters that have solutions, with display metadata from SYLLABUS. */
export function chaptersWithSolutions(): NcertChapter[] {
  const seen = new Set<string>();
  const out: NcertChapter[] = [];
  for (const ch of SYLLABUS) {
    const key = `${ch.classLevel}::${ch.subject}::${ncertSlug(ch.title)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!(BANK[key] && BANK[key].length)) continue;
    out.push({
      key,
      classLevel: String(ch.classLevel),
      subject: ch.subject,
      title: ch.title,
      slug: ncertSlug(ch.title),
      subjectSlug: ncertSlug(ch.subject),
    });
  }
  return out;
}

export function findChapter(classLevel: string, subjSlug: string, chapSlug: string): NcertChapter | null {
  return chaptersWithSolutions().find(
    (c) => c.classLevel === classLevel && c.subjectSlug === subjSlug && c.slug === chapSlug,
  ) || null;
}
