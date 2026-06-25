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

const SMALL_WORDS = new Set(['and', 'of', 'the', 'a', 'an', 'to', 'in', 'on', 'for', 'with', 'its']);
function titleizeSlug(slug: string): string {
  return slug.split('-').filter(Boolean)
    .map((w, i) => (i > 0 && SMALL_WORDS.has(w)) ? w : w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Unique chapters that have solutions. Driven by the BANK keys (the JSON is the
 * source of truth) so any class/subject/chapter with solutions surfaces — this
 * keeps the page aligned with the sitemap/prerender (which also read the bank).
 * Display titles use SYLLABUS where available (nicer), else are derived from the
 * chapter slug.
 */
export function chaptersWithSolutions(): NcertChapter[] {
  const titleByKey = new Map<string, string>();
  for (const ch of SYLLABUS) {
    titleByKey.set(`${ch.classLevel}::${ch.subject}::${ncertSlug(ch.title)}`, ch.title);
  }
  const out: NcertChapter[] = [];
  for (const key of Object.keys(BANK)) {
    if (!(BANK[key] && BANK[key].length)) continue;
    const i1 = key.indexOf('::');
    const i2 = key.indexOf('::', i1 + 2);
    if (i1 < 0 || i2 < 0) continue;
    const classLevel = key.slice(0, i1);
    const subject = key.slice(i1 + 2, i2);
    const slug = key.slice(i2 + 2);
    out.push({
      key,
      classLevel,
      subject,
      title: titleByKey.get(key) || titleizeSlug(slug),
      slug,
      subjectSlug: ncertSlug(subject),
    });
  }
  return out;
}

export function findChapter(classLevel: string, subjSlug: string, chapSlug: string): NcertChapter | null {
  return chaptersWithSolutions().find(
    (c) => c.classLevel === classLevel && c.subjectSlug === subjSlug && c.slug === chapSlug,
  ) || null;
}
