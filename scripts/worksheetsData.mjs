/**
 * worksheetsData.mjs — loader for the printable-worksheet catalog.
 *
 * /worksheets is indexable and its description promises "100+ free printable
 * worksheets" across twelve named categories — letters, phonics, vocabulary,
 * reading, writing, numbers, maths, shapes, colours, science, social-emotional.
 * The prerendered page named not one of them and ran to 172 words.
 *
 * Unlike every other bank on this site the catalog is not stored data: it is
 * BUILT by src/lib/worksheets.ts, which composes twelve generator modules and
 * returns 200 sheets with their titles, categories and age bands. Regexing
 * titles out of the source would not work — most are computed (`Letter ${ch} —
 * ${word}`) — so the module is compiled and called, which is also the only way
 * the count on the page can be the real count rather than a claim.
 *
 * The SVG artwork each sheet carries is deliberately dropped: it is A4 print
 * markup generated for the printer, not readable page content, and 200 of them
 * would add roughly a megabyte to one HTML file.
 */
import { createRequire } from 'node:module';
import path from 'node:path';
import os from 'node:os';
import { writeFileSync, mkdtempSync } from 'node:fs';

const require = createRequire(import.meta.url);

export function getWorksheets(root) {
  try {
    // esbuild ships with Vite, which this project builds with. If that ever
    // stops being true the catch returns an empty list and the page falls back
    // to its old body rather than failing the build.
    const esbuild = require('esbuild');
    const out = esbuild.buildSync({
      entryPoints: [path.join(root, 'src', 'lib', 'worksheets.ts')],
      bundle: true,
      format: 'cjs',
      platform: 'node',
      write: false,
      logLevel: 'silent',
    });
    const dir = mkdtempSync(path.join(os.tmpdir(), 'syllab-ws-'));
    const file = path.join(dir, 'catalog.cjs');
    writeFileSync(file, out.outputFiles[0].text);
    const catalog = require(file).buildCatalog();
    if (!Array.isArray(catalog)) return [];
    return catalog
      .filter((w) => w && w.id && w.title && w.category)
      .map((w) => ({ id: w.id, title: w.title, category: w.category, band: w.band || '', emoji: w.emoji || '' }));
  } catch {
    return [];
  }
}
