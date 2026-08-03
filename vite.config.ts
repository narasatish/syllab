import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // In dev, forward /api/* to the Render backend so the browser
      // never makes a cross-origin request (no CORS issues on localhost).
      '/api': {
        target: 'https://syllab-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    modulePreload: {
      resolveDependencies(_url, deps, context) {
        if (context.hostType !== 'html') return deps;
        // Don't preload heavy chunks that aren't needed for first paint/LCP — they
        // load on demand when their feature mounts. Improves mobile Core Web Vitals.
        // NOTE: no 'vendor-charts' here — recharts/d3 have no manual chunk (see
        // manualChunks below), so that name no longer exists. Listing a chunk
        // that isn't emitted is harmless but misleading.
        const SKIP = ['vendor-pdf', 'vendor-markdown', 'vendor-motion', 'vendor-firebase'];
        return deps.filter((dep) => !SKIP.some((s) => dep.includes(s)));
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Per-language tutorial data chunks: each language is a separate chunk for
          // on-demand loading. This eliminates the 2.4 MB data-tutorials bundle and
          // lets users download only the language they open.
          if (id.includes('/src/data/tutorials/python')) return 'data-python';
          if (id.includes('/src/data/tutorials/java')) return 'data-java';
          if (id.includes('/src/data/tutorials/html')) return 'data-html';
          if (id.includes('/src/data/tutorials/javascript')) return 'data-javascript';
          if (id.includes('/src/data/tutorials/sql')) return 'data-sql';
          if (id.includes('/src/data/tutorials/aiLearning')) return 'data-ai-learning';
          if (id.includes('/src/data/tutorials/ai-agents')) return 'data-ai-agents';
          if (id.includes('/src/data/tutorials/dataAnalytics')) return 'data-analytics';
          if (id.includes('/src/data/tutorials/aptitude')) return 'data-aptitude';
          if (id.includes('/src/data/tutorials/app-dev')) return 'data-app-dev';
          if (id.includes('/src/data/tutorials/cybersecurity')) return 'data-cybersecurity';
          if (id.includes('/src/data/tutorials/robotics')) return 'data-robotics';
          if (id.includes('/src/data/tutorials/game-dev')) return 'data-game-dev';
          if (id.includes('/src/data/tutorials/git-github')) return 'data-git-github';
          if (id.includes('/src/data/tutorials/prompt-engineering')) return 'data-prompt-eng';
          if (id.includes('/src/data/tutorials/cloud-computing')) return 'data-cloud';
          if (id.includes('/src/data/tutorials/data-mining')) return 'data-mining';
          if (id.includes('/src/data/tutorials/computer-basics')) return 'data-basics';

          // Keep index.ts and types.ts in the main chunk
          if (id.includes('/src/data/tutorials/') || id.includes('\\src\\data\\tutorials\\')) return undefined;

          if (id.includes('/src/data/miniProjects') || id.includes('\\src\\data\\miniProjects')) return 'data-projects';
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('firebase')) return 'vendor-firebase';
          // recharts/d3 deliberately have NO manual chunk. Forcing them into a
          // named 'vendor-charts' chunk made Rollup emit it as a STATIC import of
          // the entry and of ~100 page chunks (0 dynamic importers) — ~90KB in the
          // critical path on every page — even though recharts sits behind two
          // React.lazy boundaries (App -> ProgressPage -> Analytics). Left
          // unassigned, Rollup keeps them inside the lazy Analytics chunk.
          if (id.includes('pdfjs-dist')) return 'vendor-pdf';
          if (id.includes('react-markdown') || id.includes('remark-') || id.includes('rehype-') || id.includes('micromark')) return 'vendor-markdown';
          if (id.includes('framer-motion') || id.includes('motion')) return 'vendor-motion';
          if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
