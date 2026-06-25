#!/usr/bin/env node
/**
 * Generates Open Graph share images (1200×630 PNG) using @resvg/resvg-js
 * (pure Wasm, no system deps). Produces:
 *   • og-image.png        — the default site card (from public/og-image.svg)
 *   • og-<section>.png     — per-page-type cards (worksheets, kids, study-room, gk, mock, coding)
 * The prerenderer points each page type at its matching card for better social CTR.
 *
 * Run: node scripts/generate-og-image.mjs   (part of `npm run build`)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Per-section cards: [filename, line1, line2, subtitle, pill, accentFrom, accentTo]
const SECTIONS = [
  ['og-worksheets', '200+ Free Printable', 'Worksheets', 'Letters · Phonics · Maths · Reading · Science · Free PDF', 'No signup needed', '#10b981', '#0ea5e9'],
  ['og-kids', 'Syllab Junior', 'Free Kids Learning', 'Alphabet · Rhymes · Moral Stories · Games · Worksheets', 'Pre-KG to Class 3', '#a855f7', '#ec4899'],
  ['og-study-room', 'AI Study Room', 'Focus, Flashcards & Music', 'Pomodoro timer, AI tutor and weak-chapter memory', 'Free study space', '#10b981', '#14b8a6'],
  ['og-gk', 'GK Questions & Quiz', 'Free for Class 5 to 12', 'History · Geography · Polity · Science · Current Affairs', 'With answers', '#6366f1', '#a855f7'],
  ['og-mock', 'Free Mock Tests', 'JEE · NEET · Boards', 'Full solutions and performance analytics, free', '100% Free', '#3b82f6', '#06b6d4'],
  ['og-coding', 'Learn to Code — Free', 'Python · Java · Web · AI', '200+ lessons, projects and challenges for students', 'Beginner friendly', '#0ea5e9', '#10b981'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function sectionSvg(line1, line2, subtitle, pill, from, to) {
  const pillW = 44 + pill.length * 12;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/><stop offset="55%" style="stop-color:#0f172a"/><stop offset="100%" style="stop-color:#0c4a6e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${from}"/><stop offset="100%" style="stop-color:${to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1060" cy="110" r="220" fill="${from}" opacity="0.10"/>
  <circle cx="120" cy="540" r="200" fill="${to}" opacity="0.09"/>
  <circle cx="120" cy="110" r="52" fill="url(#accent)"/>
  <text x="120" y="125" font-family="Arial Black, Arial, sans-serif" font-size="44" font-weight="900" fill="white" text-anchor="middle">S</text>
  <text x="195" y="126" font-family="Arial Black, Arial, sans-serif" font-size="50" font-weight="900" fill="white" letter-spacing="-1">Syllab.in</text>
  <rect x="80" y="172" width="480" height="5" fill="url(#accent)" rx="2.5"/>
  <text x="80" y="282" font-family="Arial, sans-serif" font-size="60" font-weight="800" fill="white" letter-spacing="-1.5">${esc(line1)}</text>
  <text x="80" y="356" font-family="Arial, sans-serif" font-size="60" font-weight="800" fill="white" letter-spacing="-1.5">${esc(line2)}</text>
  <text x="80" y="424" font-family="Arial, sans-serif" font-size="26" fill="#94a3b8">${esc(subtitle)}</text>
  <rect x="80" y="470" width="${pillW}" height="50" rx="25" fill="${from}" opacity="0.22"/>
  <text x="${80 + pillW / 2}" y="502" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#a7f3d0" text-anchor="middle">${esc(pill)}</text>
  <text x="80" y="575" font-family="Arial, sans-serif" font-size="22" fill="#64748b">Completely free · No subscription · syllab.in</text>
</svg>`;
}

async function main() {
  let Resvg;
  try {
    ({ Resvg } = await import('@resvg/resvg-js'));
  } catch {
    console.warn('⚠️  @resvg/resvg-js not installed. Run: npm install --save-dev @resvg/resvg-js');
    console.warn('   Then re-run: node scripts/generate-og-image.mjs');
    process.exit(0);
  }

  const render = (svg, outName) => {
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    writeFileSync(resolve(ROOT, 'public', `${outName}.png`), png);
    return png.length;
  };

  // Default card from the existing SVG.
  const baseSvg = readFileSync(resolve(ROOT, 'public', 'og-image.svg'), 'utf8');
  console.log(`✅ og-image.png (${(render(baseSvg, 'og-image') / 1024).toFixed(1)} KB)`);

  // Per-section cards.
  for (const [name, l1, l2, sub, pill, from, to] of SECTIONS) {
    const size = render(sectionSvg(l1, l2, sub, pill, from, to), name);
    console.log(`✅ ${name}.png (${(size / 1024).toFixed(1)} KB)`);
  }
}

main().catch((err) => {
  console.error('❌ OG image generation failed:', err);
  process.exit(1);
});
