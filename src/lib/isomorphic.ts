/**
 * SSR-safety primitives for the true-SSR + hydrateRoot effort (feature/ssr-hydrate).
 *
 * The app currently prerenders manual HTML and client-renders with createRoot.
 * Moving to real SSR (renderToString on the server, hydrateRoot on the client)
 * requires every component to render IDENTICAL markup on the server (Node, no
 * `window`) and on the first client paint. The patterns below make that safe:
 *
 *  • `isBrowser`                — guard any direct window/localStorage/document read.
 *  • `useHydrated()`            — false on the server AND on the first client render,
 *                                flips to true after mount. Use it to defer any
 *                                browser-only UI so server and first-client markup
 *                                match (no hydration mismatch), then upgrade.
 *  • `useIsomorphicLayoutEffect`— useLayoutEffect in the browser, useEffect on the
 *                                server (React warns if you use layout effects in SSR).
 *  • `readStorage` / `prefersReducedMotion` — guarded one-liners for common reads.
 *
 * Canonical fix for the 37 `useState(() => window…/localStorage…)` initializers:
 *   const [v, setV] = useState(DEFAULT);              // SSR-safe default
 *   const hydrated = useHydrated();
 *   useEffect(() => { if (hydrated) setV(readStorage('key', DEFAULT)); }, [hydrated]);
 */
import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

/**
 * SSR pathname plumbing.
 *
 * This app uses CUSTOM routing (window.history.pushState + popstate +
 * resolveTab(window.location.pathname)), not react-router <Routes>. So we can't
 * use react-router's useLocation for the initial render. Instead the server
 * render wraps the tree in <SsrPathContext.Provider value={requestUrl}> and
 * components call usePathname():
 *   • Server  → returns the request URL (correct per-route HTML).
 *   • Client  → returns window.location.pathname (current at each mount).
 * For a given URL both return the same value, so hydration markup matches and
 * client-side pushState navigation is completely unchanged.
 */
export const SsrPathContext = createContext<string | undefined>(undefined);

/** SSR-safe current pathname. Use instead of `window.location.pathname` at render. */
export function usePathname(): string {
  const ssrPath = useContext(SsrPathContext);
  if (ssrPath !== undefined) return ssrPath; // server render
  return isBrowser ? window.location.pathname : '/';
}

/** True only in a real browser environment. Safe to read at module scope. */
export const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * Returns false during SSR and on the very first client render (so the markup
 * matches what the server produced), then true after the component has mounted.
 * Gate any browser-only branch on this to avoid hydration mismatches.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

/** useLayoutEffect in the browser; useEffect on the server (avoids the SSR warning). */
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

/** Read a localStorage value with a fallback; never throws, SSR-safe. */
export function readStorage<T = string>(key: string, fallback: T): T | string {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : raw;
  } catch {
    return fallback;
  }
}

/** Read + JSON.parse a localStorage value with a typed fallback; SSR-safe. */
export function readStorageJSON<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/** SSR-safe `prefers-reduced-motion` check (returns false on the server). */
export function prefersReducedMotion(): boolean {
  if (!isBrowser || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}
