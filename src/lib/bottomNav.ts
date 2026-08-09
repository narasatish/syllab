/**
 * bottomNav.ts — which items the phone tab bar shows, and which one is active.
 *
 * Pure and DOM-free so the selection logic can be unit-tested directly. The
 * component only renders what these functions return.
 *
 * The `tab` values MUST exist in App.tsx's TAB_TO_PATH, and the `path` values
 * MUST match it exactly — canonical URLs are generated from that same map, so a
 * mismatch here would produce a nav link that disagrees with the sitemap. A
 * test asserts the pairs stay in step.
 */

export interface BottomNavItem {
  /** App tab id, passed to navigate(). */
  tab: string;
  /** Canonical path — must equal TAB_TO_PATH[tab]. */
  path: string;
  label: string;
  /** Lucide icon name, resolved by the component. */
  icon: 'home' | 'book' | 'target' | 'bot' | 'grid';
}

/**
 * Five items maximum. A phone tab bar with six or more gives touch targets
 * below the 44px guideline on a 360px-wide screen, which is most of the Indian
 * Android base.
 */
export const BOTTOM_NAV: BottomNavItem[] = [
  { tab: 'home', path: '/', label: 'Home', icon: 'home' },
  { tab: 'syllabus', path: '/syllabus', label: 'Syllabus', icon: 'book' },
  { tab: 'arena', path: '/practice', label: 'Practice', icon: 'target' },
  { tab: 'learning_lab', path: '/ai-tutor', label: 'AI Tutor', icon: 'bot' },
  { tab: 'tools_hub', path: '/tools', label: 'Tools', icon: 'grid' },
];

/**
 * Which nav item should look active for a given tab id.
 *
 * Returns -1 when the user is somewhere the bar does not cover (a blog post,
 * a college page) — the bar then shows nothing highlighted, which is honest.
 * Lighting up "Home" on an unrelated page is worse than lighting up nothing.
 */
export function activeIndexForTab(tab: string, items: BottomNavItem[] = BOTTOM_NAV): number {
  return items.findIndex((i) => i.tab === tab);
}

/**
 * Which nav item matches a URL path.
 *
 * Exact match only. Prefix matching would light up "Home" for every path, since
 * every path starts with "/".
 */
export function activeIndexForPath(path: string, items: BottomNavItem[] = BOTTOM_NAV): number {
  const clean = normalisePath(path);
  return items.findIndex((i) => i.path === clean);
}

/** Trailing slash and query/hash removed; '' becomes '/'. */
export function normalisePath(path: string): string {
  if (!path) return '/';
  const noQuery = path.split(/[?#]/)[0];
  if (noQuery === '/' || noQuery === '') return '/';
  return noQuery.endsWith('/') ? noQuery.slice(0, -1) : noQuery;
}
