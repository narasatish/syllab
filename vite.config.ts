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
        return deps.filter((dep) => !dep.includes('vendor-charts') && !dep.includes('vendor-pdf') && !dep.includes('vendor-markdown'));
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // App-code split: the per-language tutorial data (theory/code for 700+
          // topics) is large. Give it its own chunk so it downloads in parallel
          // with the Skills Lab page code and caches independently — shrinks the
          // SkillsLab JS chunk and speeds up repeat visits.
          if (id.includes('/src/data/tutorials/') || id.includes('\\src\\data\\tutorials\\')) return 'data-tutorials';
          if (id.includes('/src/data/miniProjects') || id.includes('\\src\\data\\miniProjects')) return 'data-projects';
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('firebase')) return 'vendor-firebase';
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
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
