/**
 * routeChunks.mjs — tell the browser which page chunk a URL needs, in the HTML.
 *
 * THE PROBLEM THIS SOLVES
 *
 * Field data (CrUX, 2026-08-21) puts mobile LCP at 3.3s against a 2.5s budget.
 * TTFB is 1.2s of that and is mobile connection setup in India — nothing here
 * changes it. The rest is the critical path, and the critical path is serial:
 *
 *     HTML  ->  entry JS  ->  React boots  ->  router picks the route
 *           ->  dynamic import of the page chunk  ->  fetch it  ->  render
 *
 * #root ships a contentless grey skeleton, so nothing that counts as the LCP
 * element can paint until the very end of that chain. The page chunk is
 * discovered only after the entry has downloaded, parsed and executed — a full
 * extra round trip that the browser could have started immediately, because the
 * server knew which route it was serving before it wrote a byte.
 *
 * So: emit a <link rel="modulepreload"> for the route's own chunk. The fetch
 * starts alongside the entry rather than after it. It does not make React boot
 * faster; it removes a round trip from the front of the render.
 *
 * WHY IT IS SAFE
 *
 * A modulepreload only starts a fetch early. The worst case for a wrong guess is
 * a wasted download, so this refuses to guess: the component map is parsed out
 * of App.tsx, the chunk file is looked up on disk, and any route whose chunk
 * cannot be resolved gets no preload at all. If App.tsx is restructured, the map
 * degrades to empty rather than emitting links to files that do not exist.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Path prefix -> the tab resolveTab() in App.tsx would choose.
 *
 * Deliberately a subset. These are the clusters that carry measurable traffic in
 * Search Console, plus the homepage; a preload for a route nobody lands on is
 * bandwidth spent for nothing. Ordered longest-prefix-first so /colleges-accepting
 * is not swallowed by /colleges.
 */
const PREFIX_TO_TAB = [
  ['/state-board-solutions', 'state_board_solutions'],
  ['/difference-between', 'differences'],
  ['/medical-colleges', 'medical_colleges'],
  ['/ncert-solutions', 'ncert_solutions'],
  ['/english-writing', 'english_writing'],
  ['/revision-notes', 'revision_notes'],
  ['/formula-sheets', 'formula_sheets'],
  ['/sample-papers', 'sample_papers'],
  ['/gk-questions', 'gk_questions'],
  ['/maths-tables', 'maths_tables'],
  ['/full-forms', 'full_forms'],
  ['/glossary', 'glossary'],
  ['/concepts', 'concepts'],
  ['/colleges', 'colleges'],
];

let cache = null;

export function getRouteChunks(root) {
  if (cache) return cache;
  const out = { byTab: {}, prefixes: PREFIX_TO_TAB, home: null };
  try {
    const app = readFileSync(path.join(root, 'src', 'App.tsx'), 'utf8');

    // const XPage = lazyWithRetry(() => import('./pages/Name'), 'pages-Name')
    const componentToPage = {};
    for (const m of app.matchAll(/const (\w+) = lazyWithRetry\(\(\) => import\('\.\/pages\/([\w-]+)'\)/g)) {
      componentToPage[m[1]] = m[2];
    }
    // {activeTab === 'tab' ? <XPage ... — how the render switch picks a page
    const tabToPage = {};
    for (const m of app.matchAll(/activeTab === '(\w+)' \? <(\w+)/g)) {
      if (componentToPage[m[2]]) tabToPage[m[1]] = componentToPage[m[2]];
    }
    // The homepage is rendered through a different branch than the switch above,
    // so it is named explicitly rather than left unresolved.
    if (componentToPage.HomePage) tabToPage.home = componentToPage.HomePage;

    const assetDir = path.join(root, 'dist', 'assets');
    if (!existsSync(assetDir)) return (cache = out);
    const assets = readdirSync(assetDir);

    for (const [tab, page] of Object.entries(tabToPage)) {
      const file = assets.find((f) => new RegExp(`^${page}-[A-Za-z0-9_-]+\\.js$`).test(f));
      if (file) out.byTab[tab] = `/assets/${file}`;
    }
    out.home = out.byTab.home || null;
  } catch {
    // A parse failure must not break the build; it just means no preloads.
  }
  return (cache = out);
}

/** The chunk this URL will need, or null when we cannot be certain. */
export function chunkForPath(root, pathname) {
  const { byTab, home } = getRouteChunks(root);
  if (pathname === '/') return home;
  for (const [prefix, tab] of PREFIX_TO_TAB) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return byTab[tab] || null;
  }
  return null;
}
