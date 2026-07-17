/**
 * generate-app-icons.mjs — rasterise the app icon SVGs into the PNG sizes that
 * real devices and app stores require.
 *
 * Why this exists: iOS does NOT support SVG for `apple-touch-icon`, so an
 * SVG-only setup gives iPhone users a blank home-screen icon. Android/Play
 * Store (TWA) packaging also expects PNG 192/512 (plus a maskable variant).
 *
 * Uses @resvg/resvg-js (already a dependency, same as the OG image script).
 * Text in the SVG is converted with the system sans-serif font, so the render
 * is checked for a non-trivial byte size to catch a missing-font blank square.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/** src SVG → [outName, pixel size] */
const TARGETS = [
  ['icon.svg', 'apple-touch-icon', 180],   // iOS home screen (PNG only!)
  ['icon.svg', 'icon-192', 192],           // Android / manifest
  ['icon.svg', 'icon-512', 512],           // Android / manifest / store listing
  ['icon-maskable.svg', 'icon-maskable-512', 512], // adaptive/maskable
];

function render(svgName, outName, size) {
  const svg = readFileSync(resolve(ROOT, 'public', svgName), 'utf8');
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
  }).render().asPng();
  writeFileSync(resolve(ROOT, 'public', `${outName}.png`), png);
  return png.length;
}

let failed = false;
for (const [src, out, size] of TARGETS) {
  try {
    const bytes = render(src, out, size);
    // A gradient-only square (missing-font blank) compresses very small; a real
    // icon with the "S" glyph is comfortably bigger. Warn loudly if suspicious.
    const kb = (bytes / 1024).toFixed(1);
    if (bytes < 1000) {
      console.warn(`⚠️  ${out}.png is only ${kb} KB — the glyph may not have rendered (font missing?)`);
      failed = true;
    } else {
      console.log(`✅ ${out}.png (${size}×${size}, ${kb} KB)`);
    }
  } catch (e) {
    console.error(`✗ ${out}.png failed:`, e?.message || e);
    failed = true;
  }
}
if (failed) process.exitCode = 1;
