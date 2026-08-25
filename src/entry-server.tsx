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
import { Writable } from 'node:stream';
/**
 * renderToPipeableStream + onAllReady, NOT prerender().
 *
 * prerender() from react-dom/static is documented as resolving every
 * Suspense/React.lazy boundary before returning. On this app it did not: it
 * POSTPONED the route boundary instead, and the shipped HTML carried
 * `<!--$~-->` and `<template id="B:0">` around the loading spinner. A postponed
 * boundary in a prelude can only be finished by a server-side resume(), so the
 * browser hydrated, sat on the fallback for ever, never rendered the lazy route
 * component and never even requested its chunk. Confirmed in real Chrome on a
 * cold load: <main> held 17 characters and no Home chunk was fetched. Crawlers
 * still got content from the hidden divs, which is why Search Console never
 * flagged it and it took a human noticing a spinner to find. SSR was switched
 * off for every route on 2026-08-04 and has been off since.
 *
 * onAllReady is the fix, and it is a different guarantee: it fires only once
 * every boundary has actually resolved, so the HTML that reaches the client is
 * complete and hydratable with nothing left to resume. It is also the Node
 * pipeable API rather than the web-stream one, which is what this build targets.
 *
 * Anything still unresolved at RENDER_TIMEOUT_MS is abandoned rather than
 * shipped half-formed — the caller falls back to the static path for that route,
 * which is the behaviour that has been serving the site safely for months.
 */
import { renderToPipeableStream } from 'react-dom/server';
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
// Rich competitive-exam data → prerender renders substantive exam-guide bodies
// (about, pattern, subjects, tips, FAQs) instead of the old thin BreadcrumbList-only pages.
export { MOCK_EXAMS } from './data/mockExams';
// Full visual-learning lessons (incl. memoryHook/realLifeExample/cruxNotes/recall)
// → prerender renders substantive "visual notes" bodies + FAQ schema.
export { VISUAL_LESSONS } from './data/visualLessons';
// Curated reciprocal visual-lesson ↔ concept links → prerender cross-links both ways.
export { VISUAL_TO_CONCEPT, CONCEPT_TO_VISUAL } from './data/visualConceptLinks';

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

/** A route that has not finished in this long is not worth shipping. */
const RENDER_TIMEOUT_MS = 20_000;

/**
 * Render to a complete HTML string, waiting for every Suspense boundary.
 *
 * Rejects rather than resolving on a shell error or a timeout: the caller in
 * generate-prerender.mjs treats a rejection as "use the static body for this
 * route", so a route that cannot render cleanly is never shipped half-formed.
 */
function renderFully(tree: React.ReactElement): Promise<string> {
  return new Promise((resolve, reject) => {
    let out = '';
    let settled = false;
    const sink = new Writable({
      write(chunk, _enc, cb) { out += chunk.toString('utf8'); cb(); },
    });
    sink.on('finish', () => { if (!settled) { settled = true; clearTimeout(timer); resolve(out); } });
    sink.on('error', (e) => { if (!settled) { settled = true; clearTimeout(timer); reject(e); } });

    const { pipe, abort } = renderToPipeableStream(tree, {
      // Not onShellReady: that fires as soon as the shell is up and would ship
      // the very Suspense fallbacks this exists to avoid.
      onAllReady() { pipe(sink); },
      onShellError(err) { if (!settled) { settled = true; clearTimeout(timer); reject(err); } },
      onError(err) { lastRenderError = err; },
    });

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      try { abort(); } catch { /* already torn down */ }
      reject(new Error(`SSR render exceeded ${RENDER_TIMEOUT_MS}ms`));
    }, RENDER_TIMEOUT_MS);
  });
}

/** Last error React reported during a render; surfaced for the build log. */
let lastRenderError: unknown = null;

/** Render a single route (pathname, e.g. "/pyqs/class-10-...") to full HTML. */
export async function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};
  lastRenderError = null;
  const html = await renderFully(
    // No StrictMode here. It double-invokes render on the server for no benefit
    // — there is no client state to check — and doubles the cost of a build that
    // renders thousands of routes.
    <ErrorBoundary>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <SsrPathContext.Provider value={url}>
            <App />
          </SsrPathContext.Provider>
        </StaticRouter>
      </HelmetProvider>
    </ErrorBoundary>,
  );

  // The failure that shipped a spinner to every visitor for weeks. A postponed
  // or still-pending boundary leaves these markers, and the client cannot
  // resolve either — so refuse the render and let the caller fall back rather
  // than publish HTML that hydrates into a permanent loading state.
  // React's own error first: it is the cause, and the markers below are only
  // the symptom it leaves behind. Reporting the symptom first sent one
  // investigation chasing Suspense semantics when a component had simply thrown.
  if (lastRenderError) throw lastRenderError instanceof Error ? lastRenderError : new Error(String(lastRenderError));

  // SSR_DEBUG=1 returns the markup instead of refusing it, so the actual output
  // can be read when a check disagrees with what React produced.
  const debug = typeof process !== 'undefined' && process.env?.SSR_DEBUG === '1';
  if (!debug) {
    /**
     * Two different things look alike here, and confusing them is what made the
     * last investigation give up.
     *
     * `<!--$~-->` is a POSTPONED boundary. Only a server-side resume() can
     * finish it, so shipping one guarantees a permanent fallback in the browser.
     * That is what prerender() produced and what put a spinner on every page.
     *
     * `<!--$?-->` with a `<template id="B:n">` is ordinary streaming. It looks
     * alarming and it is not: the real markup follows in `<div hidden id="S:n">`
     * and an inline `$RC("B:n","S:n")` script swaps it in while the document is
     * still parsing. No server, no round trip. A <main> holding "Loading
     * module…" at that point in the byte stream is expected, not broken — the
     * v288 note recorded exactly that symptom and read it as the disease.
     *
     * So: reject postponement outright, and reject a placeholder only when its
     * content never arrived.
     */
    const postponed = /<!--\$~-->/.exec(html);
    if (postponed) {
      const ctx = html.slice(Math.max(0, postponed.index - 200), postponed.index + 200).replace(/\s+/g, ' ');
      throw new Error(`SSR postponed a boundary in ${url} — only a server resume() can finish it, so this would hydrate into a permanent fallback. Context: …${ctx}…`);
    }
    const placeholders = (html.match(/<template id="B:\d/g) || []).length;
    const completions = (html.match(/\$RC\(/g) || []).length;
    if (placeholders > completions) {
      throw new Error(`SSR left ${placeholders - completions} of ${placeholders} boundary placeholder(s) in ${url} with no content and no $RC completion — the client has nothing to swap in.`);
    }
  }
  const m = APP_ROOT_RE.exec(html);
  const body = m ? html.slice(m.index) : html;
  return { html, body, helmet: helmetContext.helmet };
}
