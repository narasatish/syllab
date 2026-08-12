/**
 * lazyWithRetry.ts — React.lazy that survives a failed chunk download.
 *
 * THE BUG THIS FIXES
 * Users reported the home page intermittently showing the ErrorBoundary
 * ("Something hiccuped — just reload"), on mobile, while other tabs worked.
 *
 * The app code-splits 99 routes with React.lazy. React does NOT retry a failed
 * dynamic import: the promise rejects once and the component is permanently
 * broken until a manual reload. Two things make that reject in the real world:
 *
 *   1. A flaky mobile connection dropping a single chunk request. This is why
 *      it is intermittent and why it shows up on phones, not desktops.
 *   2. A deploy. Chunk filenames are content-hashed, so shipping a new build
 *      deletes the old ones. A tab holding stale HTML — or a service worker
 *      that fell back to its cached shell because the network hiccuped — then
 *      asks for a chunk that no longer exists and gets a 404.
 *
 * The home page takes the brunt because it is the landing route: it is the
 * first chunk every visitor downloads.
 *
 * THE FIX
 * Retry the import a couple of times with a short backoff, which clears
 * transient network failures. If it still fails, reload the page ONCE to pick
 * up fresh HTML with valid chunk hashes, which clears the stale-deploy case.
 *
 * The reload is deliberately once-per-session-per-chunk, tracked in
 * sessionStorage. Without that guard a genuinely missing chunk would reload
 * forever — an infinite refresh loop is far worse than an error screen. After
 * the one reload, the error is rethrown and the ErrorBoundary shows as before.
 *
 * Everything is injectable so the behaviour can be unit-tested without a DOM,
 * real timers, or an actual page reload.
 */
import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export interface RetryDeps {
  /** Resolves after `ms`. Injected so tests do not wait. */
  sleep: (ms: number) => Promise<void>;
  /** Has this chunk already triggered a reload this session? */
  hasReloaded: (key: string) => boolean;
  markReloaded: (key: string) => void;
  reload: () => void;
}

export const defaultDeps: RetryDeps = {
  sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
  hasReloaded: (key) => {
    try { return sessionStorage.getItem(reloadKey(key)) === '1'; } catch { return false; }
  },
  markReloaded: (key) => {
    try { sessionStorage.setItem(reloadKey(key), '1'); } catch { /* private mode */ }
  },
  reload: () => {
    try { window.location.reload(); } catch { /* non-browser */ }
  },
};

function reloadKey(key: string): string {
  return `syllab_chunk_reload_${key}`;
}

/** Backoff before each retry. Two retries: quick, then a slightly longer one. */
export const RETRY_DELAYS_MS = [350, 1200];

/**
 * Import with retries, then a single reload as a last resort.
 *
 * Exported separately from the React wrapper so the whole policy can be tested
 * as a plain async function.
 */
export async function importWithRetry<T>(
  factory: () => Promise<T>,
  key: string,
  deps: RetryDeps = defaultDeps,
  delays: number[] = RETRY_DELAYS_MS,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      return await factory();
    } catch (err) {
      lastError = err;
      if (attempt < delays.length) await deps.sleep(delays[attempt]);
    }
  }

  // Every attempt failed. If this is the first time this chunk has failed in
  // this session, the most likely cause is stale HTML pointing at chunk names
  // a deploy deleted — a reload fixes that. Only once, then give up honestly.
  if (!deps.hasReloaded(key)) {
    deps.markReloaded(key);
    deps.reload();
    // Reload is async; hang so React does not render an error screen that is
    // about to be thrown away. If reload is a no-op (tests), fall through.
    await deps.sleep(0);
  }

  throw lastError;
}

/**
 * Drop-in replacement for React.lazy.
 *
 * `key` should be stable and unique per route — it namespaces the
 * reload-once guard so one bad chunk cannot suppress the retry for another.
 */
// Mirrors React.lazy's own generic bound so this is a true drop-in for routes
// with arbitrary props. Narrowing to ComponentType<unknown> would reject most
// of them.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  key: string,
  deps: RetryDeps = defaultDeps,
): LazyExoticComponent<T> {
  return lazy(() => importWithRetry(factory, key, deps));
}
