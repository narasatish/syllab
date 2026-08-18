#!/usr/bin/env node
/**
 * audit-hydration-parity.mjs — does the crawler see what the reader sees?
 *
 * /updates/<slug> pages were INDEXABLE, prerendered 195 words, and rendered the
 * whole multi-section article once React hydrated. A reader with JavaScript got
 * the article; a crawler got a stub. That is not thin content — it is the
 * prerendered HTML and the hydrated DOM disagreeing about what the page
 * contains, which is the condition Google treats as cloaking when the gap is
 * large, and it went unnoticed for months.
 *
 * It was found by accident. Nothing would catch a recurrence, so this compares
 * the two directly: render each sampled route through the SSR bundle (the same
 * bundle the prerenderer uses), extract the visible text of both, and flag any
 * page where the hydrated view carries substantially more than the prerendered
 * file.
 *
 *     node scripts/audit-hydration-parity.mjs             # sample every cluster
 *     node scripts/audit-hydration-parity.mjs --all       # every indexable page (slow)
 *     node scripts/audit-hydration-parity.mjs --max=N     # fail above a ceiling
 *
 * Needs `npm run build` first: it reads dist/ and dist-ssr/.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/** Visible text: strip script/style outright, then all tags. */
function text(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
const words = (s) => (s ? s.split(' ').filter(Boolean).length : 0);

// ── collect indexable pages ─────────────────────────────────────────────────
const pages = [];
(function walk(dir, url = '') {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (e === 'index.html') {
      const html = readFileSync(p, 'utf8');
      if (!/content="noindex/.test(html)) pages.push({ url: url || '/', html });
    } else if (statSync(p).isDirectory() && !/^(assets|audio|data|fonts)$/.test(e)) {
      walk(p, `${url}/${e}`);
    }
  }
})(DIST);

if (!pages.length) {
  console.log('No built pages found — run `npm run build` first.');
  process.exit(0);
}

// Sample one page per cluster plus the cluster root, unless --all. Rendering
// every route through the SSR bundle takes far too long to run on each build,
// and a per-cluster sample catches a systemic gap — which is what this class of
// bug always is, since the gap comes from a route builder, not one page.
const all = process.argv.includes('--all');
let sample = pages;
if (!all) {
  const seen = new Map();
  sample = [];
  for (const p of pages) {
    const cluster = '/' + (p.url.split('/')[1] || 'root');
    const n = seen.get(cluster) || 0;
    if (n < 2) { sample.push(p); seen.set(cluster, n + 1); }
  }
}

const { render } = await import(pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href);

const gaps = [];
let compared = 0, failed = 0, unresolved = 0;
for (const p of sample) {
  let ssr;
  try {
    ({ body: ssr } = await render(p.url));
  } catch {
    failed++;
    continue;
  }
  if (!ssr || ssr.length < 200) continue;      // SSR produced nothing usable

  // Compare LIKE FOR LIKE. The prerendered file's <main> holds the body we
  // inject; the SSR output is a whole document including nav, footer and
  // marketing chrome. Comparing one against the other made every page look like
  // it was hiding thousands of words — the first run of this script reported 43
  // gaps that were almost entirely shell text.
  const ssrMain = (ssr.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [, ''])[1];
  const preMain = (p.html.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i) || [, '', ''])[2];
  if (!ssrMain || !preMain) continue;

  // Most routes lazy-load their page chunk, which SSR does not resolve: <main>
  // comes back as "Loading module...". That proves nothing either way, so it is
  // skipped and counted separately rather than reported as a gap.
  if (/Loading module/i.test(ssrMain) || words(text(ssrMain)) < 30) { unresolved++; continue; }

  const preWords = words(text(preMain));
  const ssrWords = words(text(ssrMain));
  if (preWords < 50) continue;                 // shell-only page, nothing to compare
  compared++;
  // Flag only a LARGE gap. Small differences are normal: the hydrated app adds
  // interactive controls, counters and nav that the prerendered file omits by
  // design. A hydrated view carrying more than twice the prerendered text is a
  // different thing — that is body content the crawler never receives.
  const ratio = ssrWords / preWords;
  if (ratio >= 2 && ssrWords - preWords >= 300) gaps.push({ url: p.url, preWords, ssrWords, ratio });
}

gaps.sort((a, b) => b.ratio - a.ratio);

console.log(`Pages compared (${all ? 'all' : 'sampled per cluster'}): ${compared}`);
if (failed) console.log(`SSR render failed on            : ${failed} (not counted either way)`);
if (unresolved) console.log(`SSR could not resolve the chunk : ${unresolved} (lazy-loaded page, inconclusive)`);
console.log(`Hydrated view >2x prerendered   : ${gaps.length}\n`);

for (const g of gaps.slice(0, 20)) {
  console.log(`  ${g.ratio.toFixed(1)}x  ${g.url}`);
  console.log(`        prerendered ${g.preWords} words · hydrated ${g.ssrWords}`);
}
if (!gaps.length && compared > 0) console.log('✓ no page shows the reader substantially more than the crawler.');

/**
 * Nothing compared means nothing was checked. Say so.
 *
 * Every route in this app lazy-loads its page chunk, and the SSR bundle does not
 * resolve those imports — <main> comes back as "Loading module..." for all 148
 * sampled routes. So this script, as designed, cannot measure parity here at
 * all, and printing a tick on zero comparisons would be the exact failure it
 * exists to prevent: a check that reports clean about something it never looked
 * at. Measuring this properly needs a real browser (Playwright) to hydrate the
 * page, not the SSR bundle.
 */
if (compared === 0) {
  console.log('\n✗ NOTHING WAS COMPARED — this run proves nothing.');
  console.log(`  All ${unresolved} sampled routes lazy-load their page chunk and SSR returns`);
  console.log('  "Loading module..." for <main>. Parity here needs a real browser, not SSR.');
  process.exit(1);
}

const maxArg = process.argv.find((a) => a.startsWith('--max='));
if (maxArg && gaps.length > Number(maxArg.split('=')[1])) {
  console.log(`\n✗ above the agreed ceiling of ${maxArg.split('=')[1]}.`);
  process.exit(1);
}
