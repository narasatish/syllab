/**
 * Standalone verification for lib/lazyWithRetry, runnable with tsx.
 *
 * Exists because vitest's worker pool became unable to start on this machine
 * mid-session. The logic still has to be proven before shipping a fix for a
 * user-reported crash, so this exercises the same cases without a test runner.
 * lazyWithRetry.test.ts remains the real suite; run it once vitest recovers.
 */
import { importWithRetry, RETRY_DELAYS_MS, type RetryDeps } from '../src/lib/lazyWithRetry';

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean, extra = '') {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}

function deps(over: Partial<RetryDeps> = {}) {
  const reloaded = new Set<string>();
  const calls = { sleeps: [] as number[], reloads: 0, marks: [] as string[] };
  const d: RetryDeps = {
    sleep: async (ms) => { calls.sleeps.push(ms); },
    hasReloaded: (k) => reloaded.has(k),
    markReloaded: (k) => { reloaded.add(k); calls.marks.push(k); },
    reload: () => { calls.reloads++; },
    ...over,
  };
  return { d, calls };
}

function flaky(failures: number) {
  let n = 0;
  const fn = async () => {
    n++;
    if (n <= failures) throw new Error(`chunk fail ${n}`);
    return { default: 'ok' };
  };
  return { fn, attempts: () => n };
}

async function main() {
  console.log('lazyWithRetry verification\n');

  {
    const { d, calls } = deps();
    const f = flaky(0);
    const r = await importWithRetry(f.fn, 'home', d);
    check('succeeds first try', JSON.stringify(r) === '{"default":"ok"}');
    check('  no retry sleep', calls.sleeps.length === 0);
    check('  no reload', calls.reloads === 0);
  }

  {
    const { d, calls } = deps();
    const f = flaky(1);
    await importWithRetry(f.fn, 'home', d);
    check('recovers after 1 failure', f.attempts() === 2, `attempts=${f.attempts()}`);
    check('  did not reload', calls.reloads === 0);
  }

  {
    const { d, calls } = deps();
    const f = flaky(2);
    await importWithRetry(f.fn, 'home', d);
    check('recovers after 2 failures', f.attempts() === 3, `attempts=${f.attempts()}`);
    check('  backoff matches config', JSON.stringify(calls.sleeps) === JSON.stringify(RETRY_DELAYS_MS),
      JSON.stringify(calls.sleeps));
  }

  {
    const { d, calls } = deps();
    const f = flaky(Infinity);
    let threw = false;
    try { await importWithRetry(f.fn, 'home', d); } catch { threw = true; }
    check('gives up and throws', threw);
    check('  attempted 1+delays times', f.attempts() === RETRY_DELAYS_MS.length + 1, `attempts=${f.attempts()}`);
    check('  reloaded exactly once', calls.reloads === 1, `reloads=${calls.reloads}`);
    check('  marked the chunk', calls.marks.includes('home'));
  }

  {
    const { d, calls } = deps({ hasReloaded: () => true });
    let threw = false;
    try { await importWithRetry(flaky(Infinity).fn, 'home', d); } catch { threw = true; }
    check('does NOT reload twice (no refresh loop)', threw && calls.reloads === 0, `reloads=${calls.reloads}`);
  }

  {
    const { d, calls } = deps();
    try { await importWithRetry(flaky(Infinity).fn, 'home', d); } catch { /* expected */ }
    try { await importWithRetry(flaky(Infinity).fn, 'syllabus', d); } catch { /* expected */ }
    check('guard is per-chunk', calls.reloads === 2, `reloads=${calls.reloads}`);
  }

  {
    const { d } = deps({ hasReloaded: () => true });
    const boom = new Error('Failed to fetch dynamically imported module');
    let caught: unknown;
    try { await importWithRetry(async () => { throw boom; }, 'home', d); } catch (e) { caught = e; }
    check('rethrows the original error', caught === boom);
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

main();
