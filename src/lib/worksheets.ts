/**
 * Printable worksheet generator — produces original A4 SVG worksheets (tracing
 * letters, numbers, counting, shapes) that kids/parents can download & print.
 * Everything is generated client-side as SVG (no copyrighted assets), and every
 * sheet carries a "syllab.in" watermark. Pairs with printWorksheet() to export.
 */
import { alphabetTiles } from '../data/kids/alphabet';
import { numberTiles } from '../data/kids/numbers';
import { shapeTiles } from '../data/kids/shapes';

export type WorksheetCategory = 'Alphabet' | 'Numbers' | 'Counting' | 'Shapes';

export interface Worksheet {
  id: string;
  title: string;
  category: WorksheetCategory;
  band: string;      // e.g. "Pre-KG", "LKG"
  emoji: string;
  svg: () => string; // lazy — only build the SVG when needed
}

const esc = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A4 portrait in points (72dpi): 595 × 842.
const W = 595, H = 842;
const header = (title: string) => `
  <text x="40" y="48" font-size="22" font-weight="900" fill="#0f172a" font-family="Arial, sans-serif">${esc(title)}</text>
  <text x="555" y="48" text-anchor="end" font-size="12" font-weight="900" fill="#059669" letter-spacing="1" font-family="Arial">SYLLAB.IN</text>
  <line x1="40" y1="60" x2="555" y2="60" stroke="#e2e8f0" stroke-width="1.5"/>`;
const watermark = `
  <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="11" font-weight="900" letter-spacing="2"
        fill="rgba(5,150,105,0.45)" font-family="Arial">syllab.in · free printable worksheet</text>`;
const page = (inner: string) =>
  `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
    <rect width="${W}" height="${H}" fill="#ffffff"/>${inner}${watermark}
  </svg>`;

/** A dashed "trace me" character (outline only, dashed stroke). */
function traceChar(ch: string, x: number, y: number, size: number) {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="900" fill="none"
    stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="3 7" font-family="Arial">${esc(ch)}</text>`;
}
/** A baseline ruling (top, mid dashed, bottom) for handwriting practice. */
function ruledRow(y: number, h: number) {
  return `<line x1="40" y1="${y}" x2="555" y2="${y}" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="40" y1="${y + h / 2}" x2="555" y2="${y + h / 2}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 5"/>
    <line x1="40" y1="${y + h}" x2="555" y2="${y + h}" stroke="#cbd5e1" stroke-width="1"/>`;
}
/** A row of faint dashed characters to trace along a ruled line. */
function traceRow(ch: string, y: number) {
  let out = ruledRow(y, 60);
  for (let i = 0; i < 8; i++) {
    out += `<text x="${55 + i * 62}" y="${y + 52}" font-size="58" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="2 6" font-family="Arial">${esc(ch)}</text>`;
  }
  return out;
}

function letterSheet(letter: string, lower: string, word: string, emoji: string): string {
  return page(`
    ${header(`Letter ${letter} ${lower} — Trace & Learn`)}
    ${traceChar(letter, 120, 250, 230)}
    ${traceChar(lower, 330, 250, 230)}
    <text x="40" y="320" font-size="22" font-weight="700" fill="#0f172a">“${esc(letter)}” is for ${esc(word)}</text>
    <text x="430" y="320" font-size="60">${emoji}</text>
    <text x="40" y="380" font-size="14" font-weight="700" fill="#64748b">Now trace the letters:</text>
    ${traceRow(letter + lower + ' ', 400)}
    ${traceRow(letter + lower + ' ', 490)}
    ${traceRow(letter + lower + ' ', 580)}
    <text x="40" y="690" font-size="14" font-weight="700" fill="#64748b">Colour the ${esc(word)}:</text>
    <text x="270" y="730" font-size="64">${emoji}</text>`);
}

function numberSheet(n: number, word: string, emoji: string): string {
  const dots = Array.from({ length: Math.min(n, 20) }, (_, i) =>
    `<text x="${55 + (i % 10) * 50}" y="${360 + Math.floor(i / 10) * 56}" font-size="40">${emoji}</text>`).join('');
  return page(`
    ${header(`Number ${n} (${word}) — Trace & Count`)}
    ${traceChar(String(n), 230, 250, 220)}
    <text x="40" y="320" font-size="20" font-weight="700" fill="#0f172a">Count and colour ${n} ${esc(word === 'One' ? 'thing' : 'things')}:</text>
    ${dots}
    <text x="40" y="500" font-size="14" font-weight="700" fill="#64748b">Trace the number ${n}:</text>
    ${traceRow(String(n) + ' ', 520)}
    ${traceRow(String(n) + ' ', 610)}`);
}

function countingSheet(n: number, emoji: string): string {
  const items = Array.from({ length: n }, (_, i) =>
    `<text x="${60 + (i % 8) * 60}" y="${280 + Math.floor(i / 8) * 70}" font-size="44">${emoji}</text>`).join('');
  return page(`
    ${header(`Counting — How many ${emoji}?`)}
    <text x="40" y="120" font-size="18" font-weight="700" fill="#0f172a">Count the pictures and write the number in the box.</text>
    ${items}
    <rect x="247" y="600" width="100" height="100" rx="12" fill="none" stroke="#0f172a" stroke-width="3"/>
    <text x="297" y="585" text-anchor="middle" font-size="14" font-weight="700" fill="#64748b">Write here</text>`);
}

function shapeSheet(name: string, svgShape: string): string {
  return page(`
    ${header(`Shape — ${name} (Trace & Colour)`)}
    <text x="40" y="120" font-size="18" font-weight="700" fill="#0f172a">Trace the ${esc(name.toLowerCase())}, then colour it in!</text>
    <g transform="translate(180,180) scale(1.1)" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4 8">${svgShape}</g>
    <g transform="translate(180,470) scale(1.1)" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="2 8">${svgShape}</g>
    <text x="40" y="740" font-size="14" font-weight="700" fill="#64748b">Can you find a ${esc(name.toLowerCase())} in your room? 🔎</text>`);
}

// Simple dashed shape outlines for the shape sheets.
const SHAPE_SVG: Record<string, string> = {
  Circle: '<circle cx="110" cy="110" r="100" />',
  Square: '<rect x="10" y="10" width="200" height="200" />',
  Triangle: '<polygon points="110,10 210,200 10,200" />',
  Rectangle: '<rect x="10" y="40" width="200" height="130" />',
  Star: '<polygon points="110,10 140,80 215,80 155,125 180,200 110,155 40,200 65,125 5,80 80,80" />',
  Heart: '<path d="M110 200 C20 130 40 40 110 90 C180 40 200 130 110 200 Z" />',
  Oval: '<ellipse cx="110" cy="110" rx="105" ry="75" />',
  Diamond: '<polygon points="110,5 210,110 110,215 10,110" />',
};

/** The full catalog (generated). */
export function buildCatalog(): Worksheet[] {
  const out: Worksheet[] = [];

  // Alphabet A–Z (26)
  for (const t of alphabetTiles) {
    out.push({
      id: `letter-${t.letter.toLowerCase()}`,
      title: `Letter ${t.letter}${t.lowercase} — ${t.word}`,
      category: 'Alphabet', band: 'Pre-KG', emoji: t.emoji,
      svg: () => letterSheet(t.letter, t.lowercase, t.word, t.emoji),
    });
  }
  // Numbers (from numberTiles)
  for (const t of numberTiles) {
    out.push({
      id: `number-${t.number}`,
      title: `Number ${t.number} (${t.word})`,
      category: 'Numbers', band: 'Pre-KG', emoji: t.emoji,
      svg: () => numberSheet(t.number, t.word, t.emoji),
    });
  }
  // Counting 1–10 (themed)
  const countThemes = ['🍎', '⭐', '🐶', '🎈', '🐟', '🌸', '🚗', '🍌', '🦋', '🍓'];
  for (let n = 1; n <= 10; n++) {
    out.push({
      id: `counting-${n}`,
      title: `Counting to ${n}`,
      category: 'Counting', band: 'Pre-KG', emoji: countThemes[n - 1],
      svg: () => countingSheet(n, countThemes[n - 1]),
    });
  }
  // Shapes
  for (const s of shapeTiles) {
    const shape = SHAPE_SVG[s.name];
    if (!shape) continue;
    out.push({
      id: `shape-${s.name.toLowerCase()}`,
      title: `Trace the ${s.name}`,
      category: 'Shapes', band: 'Pre-KG', emoji: '🔷',
      svg: () => shapeSheet(s.name, shape),
    });
  }
  return out;
}
