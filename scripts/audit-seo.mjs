/**
 * audit-seo.mjs — lightweight SEO regression guard, wired into `npm test` and
 * `npm run build`. Fails the build (exit 1) on real SEO regressions so a bad
 * change can't ship silently.
 *
 * Checks:
 *  1. sitemap.xml is well-formed: every <url> has a <loc>, all locs are absolute
 *     https://syllab.in URLs, no duplicates, and there are a sane number of them.
 *  2. robots.txt references the sitemap; llms.txt exists.
 *  3. If a prerendered build exists (dist/), EVERY sitemap URL must have a
 *     matching prerendered dist/{route}/index.html — a sitemap entry with no
 *     prerendered page is a soft-404 for crawlers (FAIL). Prerendered pages that
 *     aren't in the sitemap are reported as a WARNING (may be intentional, e.g.
 *     /admin), not a failure.
 *
 * Usage:  node scripts/audit-seo.mjs   (exit 0 = pass, 1 = fail)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://syllab.in';
const MIN_URLS = 100; // sitemap should always have at least this many
// How many built pages to open and check head tags on. Sampled evenly across all
// prerendered routes so every page template is covered without reading ~4,250
// files on every build. Raise for a stricter (slower) gate.
const HEAD_SAMPLE_SIZE = 300;

const fails = [];
const warns = [];

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function main() {
  // ── 1. sitemap.xml structure ──
  const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml');
  if (!(await exists(sitemapPath))) {
    fails.push('public/sitemap.xml is missing.');
    return done();
  }
  const xml = await fs.readFile(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length < MIN_URLS) fails.push(`sitemap has only ${locs.length} URLs (expected >= ${MIN_URLS}).`);

  const urlCount = (xml.match(/<url>/g) || []).length;
  if (urlCount !== locs.length) fails.push(`sitemap has ${urlCount} <url> blocks but ${locs.length} <loc> — every <url> needs exactly one <loc>.`);

  const seen = new Set();
  const sitemapPaths = new Set();
  for (const loc of locs) {
    if (!loc.startsWith(SITE)) fails.push(`Non-canonical sitemap URL (must start with ${SITE}): ${loc}`);
    const rel = loc.replace(SITE, '');
    // Malformed = whitespace, angle brackets/quotes, a double-slash, or a path
    // SEGMENT that is literally "undefined"/"null" (the JS-stringify bug).
    // (Don't match "null"/"undefined" as substrings — slugs like
    // "sql-null-coalesce" are legitimate.)
    if (/\s|[<>"]|\/\//.test(rel) || rel.split('/').some((seg) => seg === 'undefined' || seg === 'null')) {
      fails.push(`Malformed sitemap URL: ${loc}`);
    }
    if (seen.has(loc)) fails.push(`Duplicate sitemap URL: ${loc}`);
    seen.add(loc);
    const p = loc.replace(SITE, '') || '/';
    sitemapPaths.add(p.replace(/\/$/, '') || '/');
  }

  // ── 2. robots.txt + llms.txt ──
  const robotsPath = path.join(ROOT, 'public', 'robots.txt');
  if (await exists(robotsPath)) {
    const robots = await fs.readFile(robotsPath, 'utf8');
    if (!/sitemap\.xml/i.test(robots)) fails.push('robots.txt does not reference sitemap.xml.');
  } else {
    fails.push('public/robots.txt is missing.');
  }
  if (!(await exists(path.join(ROOT, 'public', 'llms.txt')))) warns.push('public/llms.txt is missing (AI-crawler hint file).');

  // ── 3. sitemap ↔ prerendered output (only if a build exists) ──
  const distDir = path.join(ROOT, 'dist');
  if (await exists(distDir)) {
    const prerendered = new Set();
    async function walk(dir) {
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        const fp = path.join(dir, e.name);
        if (e.isDirectory()) await walk(fp);
        else if (e.name === 'index.html') {
          const rel = path.relative(distDir, path.dirname(fp)).split(path.sep).join('/');
          prerendered.add(rel === '' ? '/' : '/' + rel);
        }
      }
    }
    await walk(distDir);

    // Static files served directly by Hosting (e.g. posters, web stories) aren't
    // prerendered SPA routes — they're valid as long as the physical file exists
    // in dist/. Hosting runs cleanUrls, so the sitemap lists them WITHOUT the
    // .html extension (listing the .html form would make every such URL a 301 in
    // the sitemap); accept the extensionless form when dist/<path>.html exists.
    const missing = [];
    for (const p of sitemapPaths) {
      if (prerendered.has(p)) continue;
      if (p.endsWith('.html') && (await exists(path.join(distDir, p)))) continue;
      if (!p.endsWith('.html') && (await exists(path.join(distDir, `${p}.html`)))) continue;
      missing.push(p);
    }
    if (missing.length) {
      fails.push(`${missing.length} sitemap URL(s) have NO prerendered page (soft-404 for crawlers): ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`);
    }
    const orphans = [...prerendered].filter((p) => !sitemapPaths.has(p));
    if (orphans.length) {
      warns.push(`${orphans.length} prerendered page(s) not in sitemap (ok if intentional): ${orphans.slice(0, 8).join(', ')}${orphans.length > 8 ? ' …' : ''}`);
    }
    // ── Head-tag regression gate ────────────────────────────────────────────
    // Every bug below actually shipped to production once. These assertions run
    // on the BUILT HTML so a refactor cannot silently undo the fixes:
    //   • duplicate title/description/canonical (react-helmet-async + React 19
    //     both emitted head tags → 2 titles, 3 descriptions, 2 canonicals)
    //   • self-only hreflang clusters (en-IN + en + x-default all → same URL)
    //   • JSON-LD HTML-escaped into &quot; (JSX children instead of
    //     dangerouslySetInnerHTML) — silently invalid structured data
    //   • missing canonical / OG tags
    // Sampled across a spread of routes (not all ~4,250) to keep the build fast
    // while still covering every page template.
    const sample = [...prerendered].sort();
    const step = Math.max(1, Math.floor(sample.length / HEAD_SAMPLE_SIZE));
    const toCheck = sample.filter((_, i) => i % step === 0).slice(0, HEAD_SAMPLE_SIZE);
    const dupes = { title: [], description: [], canonical: [] };
    const noCanonical = [];
    const noOg = [];
    const badLd = [];
    const selfHreflang = [];

    for (const p of toCheck) {
      const file = path.join(distDir, p === '/' ? '' : p, 'index.html');
      let html;
      try { html = await fs.readFile(file, 'utf8'); } catch { continue; }
      const head = html.slice(0, html.indexOf('</head>') + 1 || html.length);

      const count = (re) => (head.match(re) || []).length;
      const nTitle = count(/<title[\s>]/gi);
      const nDesc = count(/<meta[^>]+name="description"/gi);
      const nCanon = count(/<link[^>]+rel="canonical"/gi);
      if (nTitle !== 1) dupes.title.push(`${p} (${nTitle})`);
      if (nDesc !== 1) dupes.description.push(`${p} (${nDesc})`);
      if (nCanon !== 1) dupes.canonical.push(`${p} (${nCanon})`);
      if (nCanon === 0) noCanonical.push(p);
      if (!/<meta[^>]+property="og:title"/i.test(head)) noOg.push(p);
      if (/&quot;@context&quot;|&quot;@type&quot;/.test(head)) badLd.push(p);

      // hreflang must point somewhere OTHER than this page; a cluster whose every
      // href is the page itself is meaningless and auditors flag the repeated href.
      const hrefs = [...head.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="[^"]*"[^>]+href="([^"]+)"/gi)].map((m) => m[1]);
      if (hrefs.length > 0 && new Set(hrefs).size === 1) selfHreflang.push(p);
    }

    const dupMsg = (kind, list) => {
      if (list.length) fails.push(`${list.length}/${toCheck.length} sampled page(s) do not have exactly ONE <${kind}>: ${list.slice(0, 5).join(', ')}${list.length > 5 ? ' …' : ''}`);
    };
    dupMsg('title', dupes.title);
    dupMsg('meta name="description"', dupes.description);
    dupMsg('link rel="canonical"', dupes.canonical);
    if (noOg.length) fails.push(`${noOg.length} sampled page(s) missing og:title: ${noOg.slice(0, 5).join(', ')}`);
    if (badLd.length) fails.push(`${badLd.length} page(s) have HTML-escaped JSON-LD (use dangerouslySetInnerHTML): ${badLd.slice(0, 5).join(', ')}`);
    if (selfHreflang.length) fails.push(`${selfHreflang.length} page(s) have a self-only hreflang cluster (every href is the page itself): ${selfHreflang.slice(0, 5).join(', ')}`);

    // Canonicals must not point at a URL that redirects. Firebase Hosting
    // `cleanUrls` 301s /x.html -> /x, and the sitemap lists the clean form — so a
    // canonical ending in .html aims the canonical at a redirect and contradicts
    // the sitemap. This walks EVERY built page rather than the head-tag sample,
    // because the pages that had this (183 web stories + 9 posters) are
    // standalone files the sample never reaches.
    const redirectCanonicals = [];
    async function scanCanonicals(dir) {
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        const fp = path.join(dir, e.name);
        if (e.isDirectory()) { await scanCanonicals(fp); continue; }
        if (!e.name.endsWith('.html')) continue;
        const head = (await fs.readFile(fp, 'utf8')).slice(0, 8000);
        const m = head.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
        if (m && m[1].endsWith('.html')) {
          redirectCanonicals.push(`${path.relative(distDir, fp).replace(/\\/g, '/')} → ${m[1]}`);
        }
      }
    }
    await scanCanonicals(distDir);
    if (redirectCanonicals.length) {
      fails.push(`${redirectCanonicals.length} page(s) have a canonical pointing at a .html URL, which cleanUrls 301-redirects: ${redirectCanonicals.slice(0, 5).join(', ')}${redirectCanonicals.length > 5 ? ' …' : ''}`);
    }

    console.log(`SEO audit: ${sitemapPaths.size} sitemap URLs, ${prerendered.size} prerendered pages, ${toCheck.length} head-tag samples.`);
  } else {
    console.log(`SEO audit: ${sitemapPaths.size} sitemap URLs (prerender check skipped — no dist/ yet).`);
  }

  done();
}

function done() {
  for (const w of warns) console.warn('  ⚠ ' + w);
  if (fails.length) {
    console.error('\n❌ SEO audit FAILED:');
    for (const f of fails) console.error('  ✗ ' + f);
    process.exit(1);
  }
  console.log('✅ SEO audit passed' + (warns.length ? ` (${warns.length} warning${warns.length > 1 ? 's' : ''})` : '') + '.');
  process.exit(0);
}

main().catch((e) => { console.error('SEO audit crashed:', e); process.exit(1); });
