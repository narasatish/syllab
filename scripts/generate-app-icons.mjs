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
  ['icon.svg', 'icon-144', 144],           // older Android / Windows tiles
  ['icon.svg', 'icon-192', 192],           // Android / manifest
  ['icon.svg', 'icon-384', 384],           // higher-density Android
  ['icon.svg', 'icon-512', 512],           // Android / manifest / Play Store icon
  ['icon-maskable.svg', 'icon-maskable-512', 512], // adaptive/maskable
];

/**
 * Play Store feature graphic — 1024×500 PNG, a hard requirement of the Play
 * Console listing (it is shown at the top of the store page). Built from the
 * same brand gradient as the icon so the listing matches the app.
 */
const FEATURE_GRAPHIC_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="500" fill="url(#bg)"/>
  <circle cx="880" cy="90" r="180" fill="#ffffff" opacity="0.07"/>
  <circle cx="120" cy="430" r="150" fill="#ffffff" opacity="0.07"/>
  <rect x="72" y="176" width="120" height="120" rx="26" fill="#ffffff" opacity="0.95"/>
  <text x="132" y="236" text-anchor="middle" dominant-baseline="central"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
        font-size="78" font-weight="900" fill="#10b981">S</text>
  <text x="228" y="212" dominant-baseline="central"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
        font-size="66" font-weight="900" fill="#ffffff">Syllab</text>
  <text x="228" y="268" dominant-baseline="central"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
        font-size="30" font-weight="600" fill="#ffffff" opacity="0.95">Free AI learning for Class 1–12 · CBSE · JEE · NEET</text>
  <text x="228" y="318" dominant-baseline="central"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
        font-size="24" font-weight="600" fill="#ffffff" opacity="0.8">Lessons · Mock tests · Free study tools · No signup</text>
</svg>`;

function renderSvg(svg, outName, width) {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
  }).render().asPng();
  writeFileSync(resolve(ROOT, 'public', `${outName}.png`), png);
  return png.length;
}

function render(svgName, outName, size) {
  return renderSvg(readFileSync(resolve(ROOT, 'public', svgName), 'utf8'), outName, size);
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
// Play Store listing asset.
try {
  const bytes = renderSvg(FEATURE_GRAPHIC_SVG, 'play-feature-graphic', 1024);
  console.log(`✅ play-feature-graphic.png (1024×500, ${(bytes / 1024).toFixed(1)} KB)`);
} catch (e) {
  console.error('✗ play-feature-graphic.png failed:', e?.message || e);
  failed = true;
}

if (failed) process.exitCode = 1;
