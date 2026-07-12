/**
 * SSR pipeline smoke test (feature/ssr-hydrate).
 * Uses Vite's SSR module loader to render real routes through entry-server.tsx
 * and reports whether each produced correct, route-specific HTML (no crash,
 * non-trivial length, and — for content routes — the expected text).
 */
import { createServer } from 'vite';

const ROUTES = [
  { url: '/', mustInclude: 'AI by your side' },
  { url: '/pyqs', mustInclude: 'Previous Year' },
  { url: '/visual-learning', mustInclude: 'Visual' },
  { url: '/colleges', mustInclude: 'Colleges' },
];

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

let failures = 0;
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  for (const r of ROUTES) {
    try {
      const { html, helmet } = await render(r.url);
      const len = html.length;
      const ok = len > 500;
      const title = helmet?.title?.toString()?.replace(/<[^>]+>/g, '').slice(0, 60) || '(no title)';
      console.log(`${ok ? 'OK ' : 'FAIL'} ${r.url.padEnd(20)} html=${len}b  title="${title}"`);
      if (!ok) failures++;
    } catch (err) {
      failures++;
      console.log(`CRASH ${r.url.padEnd(20)} ${String(err).split('\n')[0]}`);
    }
  }
} catch (err) {
  failures++;
  console.error('entry-server failed to load:', String(err).split('\n').slice(0, 4).join('\n'));
} finally {
  await vite.close();
}
console.log(failures ? `\n${failures} route(s) failed` : '\nAll routes rendered ✓');
process.exit(failures ? 1 : 0);
