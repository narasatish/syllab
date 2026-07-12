/**
 * Worksheet core — shared types, A4 SVG page helpers, and a set of reusable
 * worksheet TEMPLATES (trace/write, circle, matching, sort, reading, fill-in,
 * draw & write, word search, pictograph, colour-by-key). Category builders in
 * literacy.ts / numeracy.ts / world.ts compose these into concrete worksheets.
 *
 * Everything is original SVG generated client-side (no copyrighted assets, no
 * network, no cost) and every page carries a "syllab.in" watermark.
 */

/** The 12 top-level categories the worksheet library covers. */
export type WorksheetCategory =
  | 'Letters'
  | 'Phonics'
  | 'Vocabulary'
  | 'Reading'
  | 'Writing'
  | 'Numbers & Counting'
  | 'Simple Math'
  | 'Shapes'
  | 'Colors'
  | 'Science'
  | 'Social & Emotional'
  | 'Other Activities';

export interface Worksheet {
  id: string;
  title: string;
  category: WorksheetCategory;
  band: string;      // e.g. "Pre-KG", "LKG", "Class 1"
  emoji: string;
  svg: () => string; // lazy — only build the SVG when needed
}

export const esc = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A4 portrait in points (72dpi): 595 × 842.
export const W = 595, H = 842;

export const header = (title: string) => `
  <text x="40" y="48" font-size="21" font-weight="900" fill="#0f172a" font-family="Arial, sans-serif">${esc(title)}</text>
  <text x="555" y="48" text-anchor="end" font-size="12" font-weight="900" fill="#059669" letter-spacing="1" font-family="Arial">SYLLAB.IN</text>
  <line x1="40" y1="60" x2="555" y2="60" stroke="#e2e8f0" stroke-width="1.5"/>`;

export const watermark = `
  <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="11" font-weight="900" letter-spacing="2"
        fill="rgba(5,150,105,0.45)" font-family="Arial">syllab.in · free printable worksheet</text>`;

export const page = (inner: string) =>
  `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
    <rect width="${W}" height="${H}" fill="#ffffff"/>${inner}${watermark}
  </svg>`;

/** A line (or lines) of instruction under the header. Returns the next free y. */
export function instr(lines: string | string[], startY = 95): { svg: string; nextY: number } {
  const arr = Array.isArray(lines) ? lines : [lines];
  let y = startY; let svg = '';
  for (const l of arr) { svg += `<text x="40" y="${y}" font-size="17" font-weight="700" fill="#0f172a">${esc(l)}</text>`; y += 26; }
  return { svg, nextY: y + 8 };
}

/** A dashed "trace me" character (outline only, dashed stroke). */
export function traceChar(ch: string, x: number, y: number, size: number) {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="900" fill="none"
    stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="3 7" font-family="Arial">${esc(ch)}</text>`;
}

/** Handwriting ruling: top solid, mid dashed, bottom solid. */
export function ruledRow(y: number, h: number) {
  return `<line x1="40" y1="${y}" x2="555" y2="${y}" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="40" y1="${y + h / 2}" x2="555" y2="${y + h / 2}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 5"/>
    <line x1="40" y1="${y + h}" x2="555" y2="${y + h}" stroke="#cbd5e1" stroke-width="1"/>`;
}

/** A clean row of evenly-spaced dashed glyphs to trace along a ruled line.
 *  The first glyph is a slightly darker "model"; a green dot marks where to start. */
export function traceRow(ch: string, y: number) {
  const token = esc((ch || '').trim());
  const h = 58;
  let out = ruledRow(y, h);
  out += `<circle cx="44" cy="${y + 8}" r="3.5" fill="#34d399"/>`; // start-here dot
  const count = 6, startX = 66, gap = 84;
  for (let i = 0; i < count; i++) {
    const x = startX + i * gap;
    const stroke = i === 0 ? '#9aa6b8' : '#cbd5e1';
    out += `<text x="${x}" y="${y + h - 8}" font-size="50" font-weight="700" fill="none" stroke="${stroke}" stroke-width="1.6" stroke-dasharray="2 5" font-family="Arial">${token}</text>`;
  }
  return out;
}

// ── Reusable worksheet TEMPLATES ────────────────────────────────────────────

/** Trace then write: each item gets a ruled row pre-filled with dashed text. */
export function traceWriteSheet(title: string, line: string, items: string[]): string {
  const head = instr(line);
  let body = head.svg; let y = head.nextY + 4;
  for (const it of items) {
    body += ruledRow(y, 54);
    // dashed sample at the left, blank space to copy across.
    body += `<text x="48" y="${y + 46}" font-size="46" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 6" font-family="Arial">${esc(it)}</text>`;
    y += 86;
    if (y > 760) break;
  }
  return page(`${header(title)}${body}`);
}

/** Circle the right answer(s): instruction lines, then rows of options. */
export function circleSheet(title: string, lines: string[], rows: string[][], fontSize = 30, radius = 36): string {
  const head = instr(lines);
  let body = head.svg; let y = head.nextY + 30;
  for (const row of rows) {
    const gap = Math.min(96, Math.floor(470 / Math.max(1, row.length)));
    row.forEach((opt, i) => {
      const x = 80 + i * gap;
      body += `<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 5"/>
        <text x="${x}" y="${y + fontSize / 3}" text-anchor="middle" font-size="${fontSize}" font-weight="700" fill="#0f172a">${esc(opt)}</text>`;
    });
    y += radius * 2 + 36;
    if (y > 770) break;
  }
  return page(`${header(title)}${body}`);
}

/** Matching: left items to right items (right column is pre-shuffled). */
export function matchingSheet(title: string, line: string, left: string[], right: string[]): string {
  const head = instr(line);
  let body = head.svg; const n = Math.max(left.length, right.length);
  let y = head.nextY + 24;
  for (let i = 0; i < n; i++) {
    if (left[i] !== undefined) {
      body += `<text x="70" y="${y + 8}" font-size="24" fill="#0f172a">${esc(left[i])}</text>
        <circle cx="270" cy="${y}" r="6" fill="#0f172a"/>`;
    }
    if (right[i] !== undefined) {
      body += `<circle cx="345" cy="${y}" r="6" fill="#0f172a"/>
        <text x="370" y="${y + 8}" font-size="24" fill="#0f172a">${esc(right[i])}</text>`;
    }
    y += 64;
    if (y > 770) break;
  }
  return page(`${header(title)}${body}`);
}

/** Sort items into two labelled boxes (kids write/draw each in the right box). */
export function sortSheet(title: string, line: string, binA: string, binB: string, items: string[]): string {
  const head = instr(line);
  let body = head.svg; let y = head.nextY;
  // pool of items
  items.forEach((it, i) => {
    const x = 60 + (i % 6) * 85, ry = y + Math.floor(i / 6) * 56;
    body += `<text x="${x}" y="${ry + 20}" font-size="34">${esc(it)}</text>`;
  });
  y += Math.ceil(items.length / 6) * 56 + 40;
  // two boxes
  body += `<rect x="40" y="${y}" width="245" height="320" rx="14" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="162" y="${y + 28}" text-anchor="middle" font-size="18" font-weight="900" fill="#0f172a">${esc(binA)}</text>
    <rect x="310" y="${y}" width="245" height="320" rx="14" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="432" y="${y + 28}" text-anchor="middle" font-size="18" font-weight="900" fill="#0f172a">${esc(binB)}</text>`;
  return page(`${header(title)}${body}`);
}

/** Reading: a short passage, then comprehension questions with answer space. */
export function readingSheet(title: string, passage: string[], questions: string[]): string {
  const head = instr('Read the story, then answer the questions below.');
  let body = head.svg; let y = head.nextY + 6;
  body += `<rect x="40" y="${y}" width="515" height="${24 + passage.length * 26}" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>`;
  let py = y + 28;
  for (const ln of passage) { body += `<text x="58" y="${py}" font-size="16" fill="#334155">${esc(ln)}</text>`; py += 26; }
  y = py + 28;
  questions.forEach((q, i) => {
    body += `<text x="40" y="${y}" font-size="16" font-weight="700" fill="#0f172a">${i + 1}. ${esc(q)}</text>`;
    body += `<line x1="40" y1="${y + 26}" x2="555" y2="${y + 26}" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5"/>`;
    y += 60;
    if (y > 770) return;
  });
  return page(`${header(title)}${body}`);
}

/** Fill in the blank: numbered sentences each followed by a write line. */
export function fillBlankSheet(title: string, line: string, sentences: string[]): string {
  const head = instr(line);
  let body = head.svg; let y = head.nextY + 6;
  sentences.forEach((s, i) => {
    body += `<text x="40" y="${y}" font-size="17" fill="#0f172a">${i + 1}. ${esc(s)}</text>`;
    y += 52;
    if (y > 780) return;
  });
  return page(`${header(title)}${body}`);
}

/** Draw & write: a big drawing box, then ruled writing lines for a prompt. */
export function drawWriteSheet(title: string, prompt: string): string {
  const head = instr(prompt);
  let body = head.svg;
  body += `<rect x="40" y="${head.nextY}" width="515" height="360" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="297" y="${head.nextY + 195}" text-anchor="middle" font-size="14" font-weight="700" fill="#94a3b8">✏️ Draw here</text>`;
  let y = head.nextY + 400;
  for (let i = 0; i < 4; i++) { body += ruledRow(y, 34); y += 56; }
  return page(`${header(title)}${body}`);
}

/** Word search: a letter grid with the word list. Words placed left→right. */
export function wordSearchSheet(title: string, words: string[]): string {
  const size = 11;
  const grid: string[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  words.forEach((w, wi) => {
    const word = w.toUpperCase().replace(/[^A-Z]/g, '').slice(0, size);
    const row = (wi * 2) % size;
    const startCol = (wi * 3) % Math.max(1, size - word.length + 1);
    for (let i = 0; i < word.length; i++) grid[row][startCol + i] = word[i];
  });
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    if (!grid[r][c]) grid[r][c] = ALPHA[(r * 7 + c * 3 + 5) % 26];
  }
  const cell = 40, ox = 70, oy = 130;
  let body = '';
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    body += `<text x="${ox + c * cell}" y="${oy + r * cell}" text-anchor="middle" font-size="22" font-weight="700" fill="#0f172a">${grid[r][c]}</text>`;
  }
  let list = '';
  words.forEach((w, i) => { const x = 60 + (i % 3) * 175, y = oy + size * cell + 30 + Math.floor(i / 3) * 30; list += `<text x="${x}" y="${y}" font-size="16" font-weight="700" fill="#334155">☐ ${esc(w.toUpperCase())}</text>`; });
  const head = instr('Find and circle each word. They go left to right →');
  return page(`${header(title)}${head.svg}${body}<text x="40" y="${oy + size * cell + 4}" font-size="15" font-weight="900" fill="#0f172a">Find these words:</text>${list}`);
}

/** Pictograph: count the pictures in each row and colour/write the total. */
export function pictographSheet(title: string, line: string, rows: { emoji: string; label: string; count: number }[]): string {
  const head = instr(line);
  let body = head.svg; let y = head.nextY + 10;
  for (const r of rows) {
    body += `<text x="40" y="${y + 6}" font-size="16" font-weight="700" fill="#0f172a">${esc(r.label)}</text>`;
    for (let i = 0; i < r.count; i++) body += `<text x="${175 + i * 34}" y="${y + 12}" font-size="28">${r.emoji}</text>`;
    body += `<rect x="500" y="${y - 18}" width="48" height="38" rx="8" fill="none" stroke="#94a3b8" stroke-width="2"/>`;
    y += 64;
    if (y > 770) break;
  }
  return page(`${header(title)}${body}`);
}

/** Colour-by-key grid: each cell shows a key (number/letter); colour per key. */
export function colourByKeySheet(title: string, line: string, key: { k: string; name: string; hex: string }[], cells: string[]): string {
  const head = instr(line);
  let body = head.svg;
  const y = head.nextY + 6;
  const cols = 5;
  cells.forEach((v, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = 75 + col * 90, cy = y + row * 78;
    body += `<rect x="${x}" y="${cy}" width="78" height="68" rx="8" fill="none" stroke="#0f172a" stroke-width="2"/>
      <text x="${x + 39}" y="${cy + 44}" text-anchor="middle" font-size="26" font-weight="900" fill="#0f172a">${esc(v)}</text>`;
  });
  const keyY = y + Math.ceil(cells.length / cols) * 78 + 26;
  body += `<text x="40" y="${keyY}" font-size="15" font-weight="900" fill="#0f172a">Colour Key:</text>`;
  key.forEach((k, i) => {
    const x = 60 + (i % 4) * 130, ky = keyY + 26 + Math.floor(i / 4) * 32;
    body += `<rect x="${x}" y="${ky - 18}" width="24" height="24" rx="5" fill="${k.hex}"/>
      <text x="${x + 32}" y="${ky}" font-size="14" font-weight="700" fill="#0f172a">${esc(k.k)} = ${esc(k.name)}</text>`;
  });
  return page(`${header(title)}${body}`);
}
