/**
 * Class-based content filtering for Syllab.
 *
 * A logged-in student picks a primaryClass + zero or more selectedRanges
 * (e.g. "class_11_12"). Content tagged with classLevel(s) is filtered against
 * that set, with one of three display modes:
 *
 *   • selected_only      → only items that match the user's classes
 *   • recommended_first  → matching items first, others below
 *   • explore_all        → no filtering, all items
 *
 * Anonymous (logged-out) users see everything — same as explore_all.
 */

export type ClassFilterMode = 'selected_only' | 'recommended_first' | 'explore_all';

export type ClassTaggedContent = {
  classLevel?: number | string | null;
  classLevels?: (number | string)[];
  category?: string;
  subject?: string;
};

export const CLASS_RANGE_MAP: Record<string, number[]> = {
  class_1_2: [1, 2],
  class_3_4: [3, 4],
  class_5_6: [5, 6],
  class_7_8: [7, 8],
  class_9_10: [9, 10],
  class_11_12: [11, 12],
};

export const CLASS_RANGE_LABELS: Record<string, string> = {
  class_1_2: 'Class 1–2',
  class_3_4: 'Class 3–4',
  class_5_6: 'Class 5–6',
  class_7_8: 'Class 7–8',
  class_9_10: 'Class 9–10',
  class_11_12: 'Class 11–12',
};

/**
 * Resolve a user's effective class list from their primary class +
 * any extra ranges they ticked in their learning preferences.
 */
export function getSelectedClasses(
  primaryClass: number | string | null | undefined,
  selectedRanges: string[] = []
): number[] {
  const classes = selectedRanges.flatMap((range) => CLASS_RANGE_MAP[range] || []);
  const pc = typeof primaryClass === 'string' ? parseInt(primaryClass, 10) : primaryClass;
  if (typeof pc === 'number' && !Number.isNaN(pc) && !classes.includes(pc)) {
    classes.push(pc);
  }
  return Array.from(new Set(classes)).sort((a, b) => a - b);
}

function asNumber(v: number | string | null | undefined): number | null {
  if (v == null) return null;
  const n = typeof v === 'string' ? parseInt(v, 10) : v;
  return Number.isNaN(n) ? null : n;
}

export function itemMatchesClass(item: ClassTaggedContent, selectedClasses: number[]): boolean {
  if (!selectedClasses.length) return false;
  const single = asNumber(item.classLevel ?? null);
  if (single !== null) return selectedClasses.includes(single);
  if (Array.isArray(item.classLevels)) {
    return item.classLevels.some((c) => {
      const n = asNumber(c);
      return n !== null && selectedClasses.includes(n);
    });
  }
  return false;
}

export function filterClassContent<T extends ClassTaggedContent>(
  items: T[],
  selectedClasses: number[],
  mode: ClassFilterMode,
  isLoggedIn: boolean
): T[] {
  // Anonymous users always see all public content
  if (!isLoggedIn) return items;
  if (mode === 'explore_all') return items;
  if (!selectedClasses.length) return items; // no preference set yet

  if (mode === 'selected_only') {
    return items.filter((item) => itemMatchesClass(item, selectedClasses));
  }

  // recommended_first: matching items first, then the rest
  const recommended = items.filter((item) => itemMatchesClass(item, selectedClasses));
  const other = items.filter((item) => !itemMatchesClass(item, selectedClasses));
  return [...recommended, ...other];
}

export function isRecommendedForClass(item: ClassTaggedContent, selectedClasses: number[]): boolean {
  return itemMatchesClass(item, selectedClasses);
}

/* ─── localStorage helpers (frontend-only, no Firestore round-trip) ─────── */
const LS_RANGES = 'syllab_user_ranges';
const LS_MODE_PREFIX = 'syllab_filter_mode_';

export function getStoredRanges(): string[] {
  try {
    const raw = localStorage.getItem(LS_RANGES);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setStoredRanges(ranges: string[]): void {
  try {
    localStorage.setItem(LS_RANGES, JSON.stringify(ranges));
  } catch { /* ignore */ }
}

export function getStoredFilterMode(section: string, fallback: ClassFilterMode = 'selected_only'): ClassFilterMode {
  try {
    const v = localStorage.getItem(LS_MODE_PREFIX + section);
    if (v === 'selected_only' || v === 'recommended_first' || v === 'explore_all') return v;
  } catch { /* ignore */ }
  return fallback;
}

export function setStoredFilterMode(section: string, mode: ClassFilterMode): void {
  try {
    localStorage.setItem(LS_MODE_PREFIX + section, mode);
  } catch { /* ignore */ }
}
