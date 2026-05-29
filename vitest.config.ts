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
    environmentMatchGlobs: [
      // Keep node environment only for pure Firebase/Node tests
      ['src/lib/firebase.test.ts', 'node'],
    ],
  },
});
