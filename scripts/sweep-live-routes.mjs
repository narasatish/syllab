/**
 * sweep-live-routes.mjs — HTTP sweep of every URL in the sitemap.
 *
 * Answers "is any page broken?" objectively, at full coverage, rather than by
 * spot-checking a handful. Checks per URL:
 *   - HTTP status (302/404/500 are all failures for a sitemap URL; a redirect
 *     means the sitemap and the canonical disagree)
 *   - the page actually carries a <title> and a body, not an empty shell
 *
 * What this does NOT check, and must not be reported as if it did: whether the
 * React app hydrates and renders correctly in a browser. These pages are
 * prerendered, so a 200 with a title proves the HTML is served, not that the
 * SPA mounts. Browser-level checks are separate.
 *
 *   node scripts/sweep-live-routes.mjs                 # all sitemap URLs
 *   node scripts/sweep-live-routes.mjs --limit 300
 *   node scripts/sweep-live-routes.mjs --base http://localhost:4178
 */
import { readFile, writeFile } from 'node:fs/promises';

const argv = process.argv.slice(2);
const arg = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i < 0 ? d : argv[i + 1];
};
const BASE = arg('base', 'https://syllab.in');
const LIMIT = parseInt(arg('limit', '100000'), 10);
const CONCURRENCY = parseInt(arg('concurrency', '12'), 10);

const xml = await readFile('public/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .slice(0, LIMIT);

console.log(`Sweeping ${urls.length} sitemap URLs against ${BASE}`);
console.log('(status + title + body presence; NOT a browser render check)\n');

const results = [];
let done = 0;

async function check(u) {
  const path = u.replace(/^https?:\/\/[^/]+/, '') || '/';
  const target = BASE + path;
  try {
    const res = await fetch(target, { redirect: 'manual', signal: AbortSignal.timeout(45_000) });
    const status = res.status;
    let title = null;
    let bodyLen = 0;
    let noindex = false;
    if (status === 200) {
      const html = await res.text();
      bodyLen = html.length;
      title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] ?? null;
      noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);
    }
    return { path, status, title, bodyLen, noindex, location: res.headers.get('location') };
  } catch (e) {
    return { path, status: 0, error: String(e).slice(0, 80) };
  } finally {
    done++;
    if (done % 200 === 0) process.stdout.write(`  ${done}/${urls.length}\r`);
  }
}

const queue = [...urls];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const u = queue.shift();
      results.push(await check(u));
    }
  }),
);

const bad = results.filter((r) => r.status !== 200);
const noTitle = results.filter((r) => r.status === 200 && !r.title);
const thin = results.filter((r) => r.status === 200 && r.bodyLen > 0 && r.bodyLen < 2000);
const noindexed = results.filter((r) => r.noindex);

console.log(`\n\n${'='.repeat(58)}`);
console.log(`  checked      ${results.length}`);
console.log(`  200 OK       ${results.length - bad.length}`);
console.log(`  NOT 200      ${bad.length}`);
console.log(`  no <title>   ${noTitle.length}`);
console.log(`  body <2KB    ${thin.length}`);
console.log(`  noindex      ${noindexed.length}`);
console.log('='.repeat(58));

const show = (label, rows, fmt) => {
  if (!rows.length) return;
  console.log(`\n${label} (${rows.length}${rows.length > 20 ? ', first 20' : ''}):`);
  for (const r of rows.slice(0, 20)) console.log('  ' + fmt(r));
};
show('NOT 200', bad, (r) => `${String(r.status).padEnd(4)} ${r.path}${r.location ? ' -> ' + r.location : ''}${r.error ? ' ' + r.error : ''}`);
show('MISSING TITLE', noTitle, (r) => r.path);
show('THIN BODY', thin, (r) => `${String(r.bodyLen).padStart(6)}B ${r.path}`);
show('NOINDEX (in sitemap!)', noindexed, (r) => r.path);

await writeFile('docs/route-sweep.json', JSON.stringify({ base: BASE, at: new Date().toISOString(), results }, null, 2));
console.log('\nFull results: docs/route-sweep.json');
process.exit(bad.length || noTitle.length ? 1 : 0);
