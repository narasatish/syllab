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
