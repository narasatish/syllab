/**
 * Image generator — renders a 1080×1080 SVG branded post and converts to PNG.
 * Uses @resvg/resvg-js (already in devDependencies) — no external services.
 * Each template type gets its own visual style.
 */

import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const SIZE = 1080;

/* Helper to escape XML special chars in text */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/* Truncate text to a max char length with ellipsis */
function clip(s, max) {
  const str = String(s ?? '').trim();
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + '…';
}

/* Wrap text into multiple <tspan> lines. Uses `dy` (relative offset) so the
 * first line inherits the parent <text> element's `y` attribute. Subsequent
 * lines step down by `lineHeight`.
 */
function wrapText(text, maxCharsPerLine = 32, x = 90, lineHeight = 60) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxCharsPerLine) {
      if (current) lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines.map((line, i) =>
    `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`
  ).join('');
}

/* Build an SVG for the given template + content */
function buildSvg(template, content) {
  const [c1, c2] = template.bgGradient;
  const txt = template.textColor || '#FFFFFF';

  // Per-type body content
  let body = '';
  if (template.type === 'question' || template.type === 'gk') {
    const q = content.question || '';
    const a = content.a || ''; const b = content.b || '';
    const cc = content.c || ''; const d = content.d || '';
    body = `
      <text x="90" y="380" font-family="Inter, sans-serif" font-size="48" font-weight="700" fill="${txt}">
        ${wrapText(q, 32, 90, 60)}
      </text>
      <text x="90" y="720" font-family="Inter, sans-serif" font-size="34" font-weight="500" fill="${txt}" opacity="0.95">
        <tspan x="90">A) ${esc(a)}</tspan>
        <tspan x="90" dy="50">B) ${esc(b)}</tspan>
        <tspan x="90" dy="50">C) ${esc(cc)}</tspan>
        <tspan x="90" dy="50">D) ${esc(d)}</tspan>
      </text>`;
  } else if (template.type === 'puzzle') {
    body = `
      <text x="90" y="360" font-family="Inter, sans-serif" font-size="44" font-weight="700" fill="${txt}">
        ${wrapText(content.puzzle, 32, 90, 60)}
      </text>
      <rect x="90" y="780" width="900" height="3" fill="${txt}" opacity="0.3"/>
      <text x="90" y="850" font-family="Inter, sans-serif" font-size="32" font-weight="500" fill="${txt}" opacity="0.9">
        💡 Hint:
      </text>
      <text x="90" y="900" font-family="Inter, sans-serif" font-size="30" font-weight="400" fill="${txt}" opacity="0.85">
        ${wrapText(content.hint, 38, 90, 45)}
      </text>`;
  } else if (template.type === 'info' || template.type === 'motivation') {
    // For info/motivation: main text fills upper area (cap ~140 chars = 5 lines @ 28cpl),
    // sub goes in lower area (cap ~90 chars = 3 lines).
    const main = clip(content.tip || content.body || content.headline || '', 140);
    const sub  = clip(content.why || content.action || '', 90);
    body = `
      <text x="90" y="380" font-family="Inter, sans-serif" font-size="42" font-weight="800" fill="${txt}">
        ${wrapText(main, 30, 90, 58)}
      </text>
      <text x="90" y="780" font-family="Inter, sans-serif" font-size="28" font-weight="400" fill="${txt}" opacity="0.85">
        ${wrapText(sub, 38, 90, 44)}
      </text>`;
  } else if (template.type === 'news') {
    const headline = clip(content.headline || '', 80);
    const summary = clip(content.summary || '', 140);
    body = `
      <text x="90" y="380" font-family="Inter, sans-serif" font-size="50" font-weight="900" fill="${txt}">
        ${wrapText(headline, 22, 90, 64)}
      </text>
      <text x="90" y="760" font-family="Inter, sans-serif" font-size="28" font-weight="400" fill="${txt}" opacity="0.9">
        ${wrapText(summary, 40, 90, 42)}
      </text>`;
  } else if (template.type === 'coding') {
    body = `
      <text x="90" y="380" font-family="Inter, sans-serif" font-size="44" font-weight="700" fill="${txt}">
        ${wrapText(content.tip, 30, 90, 60)}
      </text>
      <rect x="80" y="620" width="920" height="280" rx="20" fill="#0F172A" opacity="0.7"/>
      <text x="120" y="690" font-family="'Courier New', monospace" font-size="30" font-weight="500" fill="#34D399">
        ${wrapText(content.code, 40, 120, 45)}
      </text>`;
  } else {
    // Generic
    body = `
      <text x="90" y="500" font-family="Inter, sans-serif" font-size="50" font-weight="700" fill="${txt}">
        ${wrapText(JSON.stringify(content).slice(0, 200), 30, 90, 65)}
      </text>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#overlay)"/>

  <!-- Top brand row -->
  <text x="90" y="120" font-family="Inter, sans-serif" font-size="36" font-weight="900" fill="${txt}" opacity="0.95">
    Syllab.in
  </text>
  <text x="${SIZE - 90}" y="120" text-anchor="end" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="${txt}" opacity="0.85">
    ${esc(template.emoji + ' ' + template.title)}
  </text>

  <!-- Divider -->
  <rect x="90" y="170" width="900" height="3" fill="${txt}" opacity="0.4"/>

  <!-- Type heading -->
  <text x="90" y="270" font-family="Inter, sans-serif" font-size="44" font-weight="900" fill="${txt}">
    ${esc(template.title)}
  </text>

  ${body}

  <!-- Footer -->
  <rect x="90" y="${SIZE - 130}" width="900" height="3" fill="${txt}" opacity="0.4"/>
  <text x="90" y="${SIZE - 70}" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="${txt}" opacity="0.95">
    syllab.in · free for every student
  </text>
  <text x="${SIZE - 90}" y="${SIZE - 70}" text-anchor="end" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="${txt}" opacity="0.85">
    @syllab.in
  </text>
</svg>`;
}

/**
 * Render the template + content into a PNG file.
 * @param {object} template - from post-templates.json
 * @param {object} content - filled content variables
 * @param {string} outDir - output directory (created if missing)
 * @returns {string} absolute path to generated PNG
 */
export function generateImage(template, content, outDir) {
  mkdirSync(outDir, { recursive: true });
  const svg = buildSvg(template, content);
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE } });
  const png = resvg.render().asPng();
  const filename = `${template.id}-${Date.now()}.png`;
  const outPath = path.join(outDir, filename);
  writeFileSync(outPath, png);
  return outPath;
}

// CLI test
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  import('./content-generator.mjs').then(async ({ generateContent }) => {
    const { template, content } = await generateContent(process.argv[2]);
    const outDir = path.join(process.cwd(), '.instagram-bot-output');
    const out = generateImage(template, content, outDir);
    console.log('Generated image:', out);
  });
}
