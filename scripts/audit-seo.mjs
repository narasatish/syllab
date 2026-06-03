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

    const missing = [...sitemapPaths].filter((p) => !prerendered.has(p));
    if (missing.length) {
      fails.push(`${missing.length} sitemap URL(s) have NO prerendered page (soft-404 for crawlers): ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`);
    }
    const orphans = [...prerendered].filter((p) => !sitemapPaths.has(p));
    if (orphans.length) {
      warns.push(`${orphans.length} prerendered page(s) not in sitemap (ok if intentional): ${orphans.slice(0, 8).join(', ')}${orphans.length > 8 ? ' …' : ''}`);
    }
    console.log(`SEO audit: ${sitemapPaths.size} sitemap URLs, ${prerendered.size} prerendered pages.`);
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
