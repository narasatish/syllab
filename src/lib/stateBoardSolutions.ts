/**
 * stateBoardSolutions.ts — lazy loader for the state-board exercise-solutions bank
 * (public/data/state-board-solutions.json).
 * Bank shape: { "<Board>::<class>::<subject>::<chapter-slug>": [{ q, solution }] }
 * Board ∈ AP | TS | Karnataka | Maharashtra. Metadata is derived from the key
 * (no SYLLABUS dependency — the bank itself is the source of truth).
 */
export interface SBQA { q: string; solution: string; }
export interface SBChapter {
  key: string;
  board: string;        // raw board code (AP/TS/Karnataka/Maharashtra)
  boardLabel: string;   // display label
  boardSlug: string;    // url segment (ap/ts/karnataka/maharashtra)
  classLevel: string;
  subject: string;
  subjectSlug: string;
  slug: string;         // chapter slug
  title: string;        // display title (from slug)
}

export const BOARD_LABEL: Record<string, string> = {
  AP: 'Andhra Pradesh (SSC)', TS: 'Telangana (SSC)',
  Karnataka: 'Karnataka (SSLC)', Maharashtra: 'Maharashtra (SSC)',
};
export const boardToSlug = (b: string) => b.toLowerCase();
export const slugToBoard = (s: string): string =>
  ({ ap: 'AP', ts: 'TS', karnataka: 'Karnataka', maharashtra: 'Maharashtra' }[s.toLowerCase()] || s);

const SMALL = new Set(['of', 'and', 'in', 'the', 'to', 'at', 'a', 'an', 'for', 'with', 'on']);
export const titleize = (sl: string) =>
  sl.split('-').map((w, i) => (i > 0 && SMALL.has(w)) ? w : (w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
export const subjSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let BANK: Record<string, SBQA[]> = {};
let loaded = false;
let loading: Promise<Record<string, SBQA[]>> | null = null;

export function loadStateBoardSolutions(): Promise<Record<string, SBQA[]>> {
  if (loaded) return Promise.resolve(BANK);
  if (loading) return loading;
  loading = (typeof fetch === 'undefined'
    ? Promise.resolve({} as Record<string, SBQA[]>)
    : fetch('/data/state-board-solutions.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({})))
    .then((d: Record<string, SBQA[]>) => { BANK = d || {}; loaded = true; return BANK; });
  return loading;
}

export function qaForKey(key: string): SBQA[] { return BANK[key] || []; }

function parseKey(key: string): SBChapter | null {
  const parts = key.split('::');
  if (parts.length !== 4) return null;
  const [board, classLevel, subject, slug] = parts;
  return {
    key, board, boardLabel: BOARD_LABEL[board] || board, boardSlug: boardToSlug(board),
    classLevel, subject, subjectSlug: subjSlug(subject), slug, title: titleize(slug),
  };
}

export function allChapters(): SBChapter[] {
  return Object.keys(BANK).filter((k) => BANK[k] && BANK[k].length).map(parseKey).filter(Boolean) as SBChapter[];
}

export function findChapter(boardSlug: string, classLevel: string, subjectSlug: string, chapSlug: string): SBChapter | null {
  return allChapters().find(
    (c) => c.boardSlug === boardSlug && c.classLevel === classLevel && c.subjectSlug === subjectSlug && c.slug === chapSlug,
  ) || null;
}
