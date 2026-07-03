/**
 * Server entry for true SSR (feature/ssr-hydrate).
 *
 * Renders the real React app to an HTML string for a given route, so crawlers
 * AND users get fully-formed markup that the client then hydrates (instead of
 * the current manual-HTML prerender + full client re-render).
 *
 * Mirrors the client provider stack in main.tsx, with two SSR swaps:
 *   • BrowserRouter → StaticRouter (no window/history on the server)
 *   • <SsrPathContext.Provider value={url}> so usePathname() returns the
 *     requested route (correct per-route content, matches client hydration).
 */
import React from 'react';
// React 19 static SSG: prerender() resolves ALL Suspense/React.lazy boundaries
// before returning, so lazily-loaded route components render their real content
// (renderToString is sync and would only emit the Suspense fallback).
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { SsrPathContext } from './lib/isomorphic';

// Re-exported for generate-prerender.mjs: it imports the compiled SSR bundle
// and uses the REAL syllabus + question generator to build substantive static
// bodies for chapter-level important-questions pages (single source of truth).
export { SYLLABUS } from './data/syllabus';
export { generateExamQuestions } from './lib/importantQuestions';

export interface RenderResult {
  /** Full prerender output (hoisted metadata + body). */
  html: string;
  /** Just the app body (root div onward) — for injecting into #root for hydration.
   *  The per-route <head> SEO is produced separately by generate-prerender.mjs, so
   *  the React-hoisted <title>/<meta> at the top of `html` are intentionally dropped. */
  body: string;
  helmet?: HelmetServerState;
}

/** App root marker — React 19 hoists metadata ABOVE this; everything from here is body. */
const APP_ROOT_RE = /<div class="flex min-h-screen/;

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

/** Render a single route (pathname, e.g. "/pyqs/class-10-...") to full HTML. */
export async function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const { prelude } = await prerender(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <SsrPathContext.Provider value={url}>
              <App />
            </SsrPathContext.Provider>
          </StaticRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
  const html = await streamToString(prelude as ReadableStream<Uint8Array>);
  const m = APP_ROOT_RE.exec(html);
  const body = m ? html.slice(m.index) : html;
  return { html, body, helmet: helmetContext.helmet };
}
