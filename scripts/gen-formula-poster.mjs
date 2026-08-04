#!/usr/bin/env node
/**
 * gen-formula-poster.mjs — builds the printable formula POSTERS (the site's
 * deliberate linkable assets: teachers print/share them, bloggers link to them).
 * One poster per high-demand whole-subject sheet in scripts/posters.mjs. Reads the
 * SAME data as the /formula-sheets pages (formulaSheets.ts) so it never drifts.
 *
 * Output: public/posters/{slug}-formulas.html — standalone, static, print-optimised
 * (A4) pages served directly by Firebase Hosting (physical file wins over the SPA
 * rewrite; no app integration needed).
 *
 * Regenerate after editing formulaSheets.ts or posters.mjs:  node scripts/gen-formula-poster.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSTER_SHEETS } from './posters.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Same extraction approach as studyClusters.mjs readArray().
const src = readFileSync(path.join(ROOT, 'src', 'data', 'formulaSheets.ts'), 'utf8');
const marker = 'export const FORMULA_SHEETS: FormulaSheet[] = ';
const start = src.indexOf(marker);
if (start < 0) { console.error('❌ FORMULA_SHEETS marker not found'); process.exit(1); }
const arrText = src.slice(start + marker.length);
const ALL_SHEETS = (0, eval)(arrText.slice(0, arrText.lastIndexOf(']') + 1));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function buildPoster({ slug, label, level }) {
  const sheet = ALL_SHEETS.find((s) => s.slug === slug);
  if (!sheet) { console.warn(`⚠️  poster skipped — sheet not found: ${slug}`); return null; }
  const total = sheet.sections.reduce((n, s) => n + s.formulas.length, 0);
  // Clean URL, no .html: Firebase Hosting cleanUrls 301s /x.html -> /x, and the
  // sitemap lists the clean form. A canonical pointing at the .html URL aims the
  // canonical at a redirect, which contradicts the sitemap.
  const url = `https://syllab.in/posters/${slug}-formulas`;
  const jeeNeet = level === 'Class 11' || level === 'Class 12' ? ', JEE & NEET' : '';

  const sectionsHtml = sheet.sections.map((sec) => `
    <section class="card">
      <h2>${esc(sec.heading)}</h2>
      <dl>
        ${sec.formulas.map((f) => `
        <div class="row">
          <dt>${esc(f.name)}</dt>
          <dd><code>${esc(f.formula)}</code>${f.note ? `<span class="note">${esc(f.note)}</span>` : ''}</dd>
        </div>`).join('')}
      </dl>
    </section>`).join('');

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(label)} Formula Poster (Printable PDF, Free) — All ${total} Formulas | Syllab.in</title>
<meta name="description" content="Free printable ${esc(label)} formula poster — all ${total} CBSE/NCERT formulas on one A4 sheet for fast revision before boards${jeeNeet}. Print or save as PDF, no login.">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(label)} Formula Poster — All ${total} Formulas, Free Printable">
<meta property="og:description" content="Every ${esc(label)} formula on one printable A4 poster. Free for classrooms — print it, share it, stick it on the wall.">
<meta property="og:image" content="https://syllab.in/og-image.png">
<meta property="og:url" content="${url}">
<meta name="robots" content="index,follow,max-snippet:-1">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'LearningResource',
  name: `${label} Formula Poster — All ${total} Formulas`,
  description: `Printable A4 poster with every CBSE ${label} formula, free for classroom use.`,
  educationalLevel: level, inLanguage: 'en-IN', isAccessibleForFree: true,
  learningResourceType: 'Poster', url,
  provider: { '@type': 'Organization', name: 'Syllab.in', url: 'https://syllab.in' },
})}</script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f1f5f9; color: #0f172a; line-height: 1.35; }
  .toolbar { position: sticky; top: 0; background: #059669; color: #fff; padding: 10px 16px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; z-index: 5; }
  .toolbar strong { font-size: 15px; }
  .toolbar .sp { flex: 1; }
  .toolbar button, .toolbar a.btn { background: #fff; color: #047857; border: 0; border-radius: 8px; padding: 8px 16px; font-weight: 800; font-size: 14px; cursor: pointer; text-decoration: none; }
  .page { max-width: 210mm; margin: 0 auto; background: #fff; padding: 10mm 9mm; }
  header.head { text-align: center; border-bottom: 3px solid #059669; padding-bottom: 6px; margin-bottom: 8px; }
  header.head h1 { font-size: 21px; color: #065f46; letter-spacing: .2px; }
  header.head p { font-size: 11px; color: #475569; margin-top: 2px; }
  .grid { columns: 2; column-gap: 7px; }
  .card { break-inside: avoid; border: 1.5px solid #d1fae5; border-radius: 8px; padding: 6px 8px; margin-bottom: 7px; }
  .card h2 { font-size: 12.5px; background: #ecfdf5; color: #065f46; margin: -6px -8px 5px; padding: 4px 8px; border-radius: 6px 6px 0 0; border-bottom: 1.5px solid #d1fae5; }
  .row { margin-bottom: 4px; }
  dt { font-size: 10px; font-weight: 700; color: #334155; }
  dd code { font-family: 'Cambria Math', Consolas, monospace; font-size: 10.5px; color: #0f172a; background: #f8fafc; display: inline-block; padding: 1px 4px; border-radius: 4px; }
  dd .note { display: block; font-size: 8.5px; color: #64748b; }
  footer.foot { margin-top: 6px; padding-top: 5px; border-top: 2px solid #059669; display: flex; justify-content: space-between; font-size: 9.5px; color: #475569; }
  footer.foot b { color: #065f46; }
  @media print {
    .toolbar { display: none; }
    body { background: #fff; }
    .page { max-width: none; padding: 4mm 5mm; }
    @page { size: A4 portrait; margin: 6mm; }
  }
</style>
</head>
<body>
<div class="toolbar">
  <strong>📐 Free ${esc(label)} Formula Poster</strong>
  <span class="sp"></span>
  <button onclick="window.print()">🖨️ Print / Save as PDF</button>
  <a class="btn" href="/formula-sheets">All formula sheets →</a>
</div>
<div class="page">
  <header class="head">
    <h1>CBSE ${esc(label)} — All ${total} Formulas on One Page</h1>
    <p>${esc(sheet.intro)}</p>
  </header>
  <div class="grid">${sectionsHtml}</div>
  <footer class="foot">
    <span><b>syllab.in</b> — free NCERT notes, mock tests &amp; AI tutor for Class 1–12</span>
    <span>Free to print &amp; share in classrooms · ${url.replace('https://', '')}</span>
  </footer>
</div>
</body>
</html>
`;
}

mkdirSync(path.join(ROOT, 'public', 'posters'), { recursive: true });
let n = 0;
for (const p of POSTER_SHEETS) {
  const html = buildPoster(p);
  if (!html) continue;
  writeFileSync(path.join(ROOT, 'public', 'posters', `${p.slug}-formulas.html`), html);
  n++;
}
console.log(`✅ ${n}/${POSTER_SHEETS.length} formula posters written to public/posters/`);
