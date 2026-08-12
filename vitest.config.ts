import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    // Use jsdom for all tests by default (needed for React components and
    // browser-API code like window.setTimeout, window.SpeechSynthesis, etc.)
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],

    // Threads, not the default forks pool.
    //
    // The forks pool silently DROPS test files on this machine: runs reported
    // 682 / 706 / 717 / 780 tests from an unchanged suite that actually has
    // 818, failing with "[vitest-pool-runner]: Timeout waiting for worker to
    // respond" while still exiting 0. A dropped file is not reported as a
    // failure — the summary just shows a smaller number — so a green run could
    // be hiding two entire files that never executed.
    //
    // Threads has been stable where forks was not. If a run ever looks
    // suspicious, do NOT trust the totals: compare files-on-disk to
    // files-that-ran, which is the only check that catches this:
    //
    //   npx vitest run --reporter=json --outputFile=.vt.json
    //   # then diff the testResults names against src/**/*.test.ts*
    pool: 'threads',
    // environmentMatchGlobs is valid at runtime but not in this vitest version's
    // exported config type — cast to keep the typecheck clean.
    ...( {
      environmentMatchGlobs: [
        // Keep node environment only for pure Firebase/Node tests
        ['src/lib/firebase.test.ts', 'node'],
      ],
    } as Record<string, unknown> ),
  },
});
