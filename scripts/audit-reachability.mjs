#!/usr/bin/env node
/**
 * audit-reachability.mjs — can a crawler walk to every indexable page?
 *
 * 286 indexable pages had no path from the homepage through prerendered HTML.
 * Not stragglers — whole clusters: /maths-tables (43), /updates (35),
 * /colleges (34), /ai-hub (20), /timelines (20), /english-grammar (16),
 * /gk-questions (9), /scholarships. The homepage table naming the site's
 * sections was hand-maintained and simply did not mention them.
 *
 * Nothing caught it. audit-seo checks that a page is IN the sitemap, which is
 * discovery, and a sitemap entry is not a link: PageRank travels along links,
 * and a page reachable only by sitemap is a page the crawler is told about
 * rather than led to. audit-dark-banks asks whether content reaches a page.
 * Neither asks whether a page reaches a reader.
 *
 * So: walk the link graph from / using only the links in the prerendered
 * <main>, and fail on any indexable page the walk never arrives at.
 *
 *     node scripts/audit-reachability.mjs            # report
 *     node scripts/audit-reachability.mjs --strict   # exit 1 if any are unreachable
 *
 * Scope, stated plainly: this measures the PRERENDERED surface only. The
 * hydrated React app carries a fuller nav, so a JavaScript-executing crawler
 * sees more than this walk does. The prerendered surface is the one this whole
 * build strategy exists to serve, which is why it is the one gated here.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.log('No dist/ — run `npm run build` first.');
  process.exit(0);
}

const pages = new Map();   // url -> { body, noindex }
(function walk(dir, url = '') {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (entry === 'index.html') {
      const html = readFileSync(p, 'utf8');
      const m = html.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i);
      pages.set(url || '/', { body: m ? m[2] : '', noindex: /content="noindex/.test(html) });
    } else if (statSync(p).isDirectory() && !/^(assets|audio|data|fonts|images|icons|posters|web-stories)$/.test(entry)) {
      walk(p, `${url}/${entry}`);
    }
  }
})(DIST);

if (!pages.size) {
  console.log('No built pages found — run `npm run build` first.');
  process.exit(0);
}

/** Outgoing links that land on a page this build actually wrote. */
const linksFrom = (url) => {
  const seen = new Set();
  for (const m of (pages.get(url)?.body || '').matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1].replace(/\/$/, '') || '/';
    if (pages.has(href)) seen.add(href);
  }
  return seen;
};

// Breadth-first from the homepage. noindex pages are traversed but not
// required: they ship noindex,follow, so a crawler passes through them.
const reached = new Set(['/']);
const queue = ['/'];
while (queue.length) {
  for (const next of linksFrom(queue.shift())) {
    if (!reached.has(next)) { reached.add(next); queue.push(next); }
  }
}

const indexable = [...pages].filter(([, v]) => !v.noindex).map(([u]) => u);
const unreachable = indexable.filter((u) => !reached.has(u));

console.log(`Indexable pages           : ${indexable.length}`);
console.log(`Reachable from / by links : ${indexable.length - unreachable.length}`);
console.log(`UNREACHABLE               : ${unreachable.length}\n`);

if (unreachable.length) {
  const byCluster = {};
  for (const u of unreachable) (byCluster['/' + u.split('/')[1]] ||= []).push(u);
  console.log('A page no link leads to is a page only the sitemap knows about:');
  for (const [c, list] of Object.entries(byCluster).sort((a, b) => b[1].length - a[1].length).slice(0, 20)) {
    console.log(`  ${String(list.length).padStart(4)}  ${c}${list.length === 1 ? '' : `   e.g. ${list[0]}`}`);
  }
} else {
  console.log('✓ every indexable page is reachable from the homepage by prerendered links.');
}

if (process.argv.includes('--strict') && unreachable.length) process.exit(1);
const maxArg = process.argv.find((a) => a.startsWith('--max='));
if (maxArg && unreachable.length > Number(maxArg.split('=')[1])) {
  console.log(`\n✗ above the agreed ceiling of ${maxArg.split('=')[1]}.`);
  process.exit(1);
}
