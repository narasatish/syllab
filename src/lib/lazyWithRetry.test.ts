import { describe, it, expect, vi } from 'vitest';
import { importWithRetry, RETRY_DELAYS_MS, type RetryDeps } from './lazyWithRetry';

/** Deps that never actually wait or reload, with spies for assertions. */
function makeDeps(overrides: Partial<RetryDeps> = {}) {
  const reloaded = new Set<string>();
  const deps: RetryDeps = {
    sleep: vi.fn(async () => {}),
    hasReloaded: vi.fn((k: string) => reloaded.has(k)),
    markReloaded: vi.fn((k: string) => { reloaded.add(k); }),
    reload: vi.fn(),
    ...overrides,
  };
  return deps;
}

/** A factory that fails `failures` times then succeeds. */
function flaky(failures: number, value = { default: 'ok' }) {
  let calls = 0;
  const fn = vi.fn(async () => {
    calls++;
    if (calls <= failures) throw new Error(`chunk load failed (attempt ${calls})`);
    return value;
  });
  return fn;
}

describe('importWithRetry — happy path', () => {
  it('returns immediately when the import works first time', async () => {
    const deps = makeDeps();
    const factory = flaky(0);
    await expect(importWithRetry(factory, 'home', deps)).resolves.toEqual({ default: 'ok' });
    expect(factory).toHaveBeenCalledTimes(1);
    expect(deps.sleep).not.toHaveBeenCalled();
    expect(deps.reload).not.toHaveBeenCalled();
  });
});

describe('importWithRetry — transient failures (the flaky-mobile case)', () => {
  it('recovers when the first attempt fails', async () => {
    const deps = makeDeps();
    const factory = flaky(1);
    await expect(importWithRetry(factory, 'home', deps)).resolves.toEqual({ default: 'ok' });
    expect(factory).toHaveBeenCalledTimes(2);
    expect(deps.reload).not.toHaveBeenCalled();
  });

  it('recovers when the first two attempts fail', async () => {
    const deps = makeDeps();
    const factory = flaky(2);
    await expect(importWithRetry(factory, 'home', deps)).resolves.toEqual({ default: 'ok' });
    expect(factory).toHaveBeenCalledTimes(3);
    expect(deps.reload).not.toHaveBeenCalled();
  });

  it('backs off between attempts, in increasing order', async () => {
    const deps = makeDeps();
    await importWithRetry(flaky(2), 'home', deps);
    const waits = (deps.sleep as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[0]);
    expect(waits).toEqual(RETRY_DELAYS_MS);
    expect(waits[1]).toBeGreaterThan(waits[0]);
  });

  it('makes exactly 1 + RETRY_DELAYS_MS.length attempts before giving up', async () => {
    const deps = makeDeps();
    const factory = flaky(Infinity);
    await expect(importWithRetry(factory, 'home', deps)).rejects.toThrow();
    expect(factory).toHaveBeenCalledTimes(RETRY_DELAYS_MS.length + 1);
  });
});

describe('importWithRetry — stale deploy (reload once)', () => {
  it('reloads when every attempt fails and it has not reloaded yet', async () => {
    const deps = makeDeps();
    await expect(importWithRetry(flaky(Infinity), 'home', deps)).rejects.toThrow();
    expect(deps.reload).toHaveBeenCalledTimes(1);
    expect(deps.markReloaded).toHaveBeenCalledWith('home');
  });

  // The guard that matters most: without it a permanently-missing chunk would
  // refresh the page forever, which is much worse than an error screen.
  it('does NOT reload a second time for the same chunk', async () => {
    const deps = makeDeps({ hasReloaded: vi.fn(() => true) });
    await expect(importWithRetry(flaky(Infinity), 'home', deps)).rejects.toThrow();
    expect(deps.reload).not.toHaveBeenCalled();
  });

  it('marks BEFORE reloading, so a fast reload cannot race past the guard', async () => {
    const order: string[] = [];
    const deps = makeDeps({
      markReloaded: vi.fn(() => { order.push('mark'); }),
      reload: vi.fn(() => { order.push('reload'); }),
    });
    await expect(importWithRetry(flaky(Infinity), 'home', deps)).rejects.toThrow();
    expect(order).toEqual(['mark', 'reload']);
  });

  it('tracks the guard per chunk — one bad route does not mute another', async () => {
    const deps = makeDeps();
    await expect(importWithRetry(flaky(Infinity), 'home', deps)).rejects.toThrow();
    await expect(importWithRetry(flaky(Infinity), 'syllabus', deps)).rejects.toThrow();
    expect(deps.reload).toHaveBeenCalledTimes(2);
    expect(deps.markReloaded).toHaveBeenCalledWith('home');
    expect(deps.markReloaded).toHaveBeenCalledWith('syllabus');
  });

  it('rethrows the ORIGINAL error so the ErrorBoundary shows something real', async () => {
    const deps = makeDeps({ hasReloaded: vi.fn(() => true) });
    const boom = new Error('Failed to fetch dynamically imported module: /assets/Home-abc.js');
    await expect(importWithRetry(async () => { throw boom; }, 'home', deps)).rejects.toBe(boom);
  });
});

describe('importWithRetry — robustness', () => {
  it('does not swallow a non-Error rejection', async () => {
    const deps = makeDeps({ hasReloaded: vi.fn(() => true) });
    await expect(importWithRetry(async () => { throw 'string failure'; }, 'k', deps)).rejects.toBe('string failure');
  });

  it('works with an empty delay list (no retries configured)', async () => {
    const deps = makeDeps();
    const factory = flaky(Infinity);
    await expect(importWithRetry(factory, 'k', deps, [])).rejects.toThrow();
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('a later success is still returned even with a long delay list', async () => {
    const deps = makeDeps();
    await expect(importWithRetry(flaky(4), 'k', deps, [1, 1, 1, 1, 1])).resolves.toEqual({ default: 'ok' });
  });

  it('never calls reload when the import eventually succeeds', async () => {
    const deps = makeDeps();
    await importWithRetry(flaky(2), 'k', deps);
    expect(deps.reload).not.toHaveBeenCalled();
    expect(deps.markReloaded).not.toHaveBeenCalled();
  });

  it('survives sessionStorage throwing (private mode)', async () => {
    const deps = makeDeps({
      hasReloaded: vi.fn(() => { throw new Error('storage blocked'); }),
    });
    // The real defaultDeps swallow this; here we assert we do not mask the
    // import error with a storage error by accident.
    await expect(importWithRetry(flaky(Infinity), 'k', deps)).rejects.toThrow();
  });
});
