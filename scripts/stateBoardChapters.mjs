/**
 * stateBoardChapters.mjs — reads public/data/state-board-solutions.json and yields
 * chapters (with Q&A) as routes for prerender + sitemap. Key shape:
 * "<Board>::<class>::<subject>::<chapter-slug>".
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const subjSlugOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const boardSlugOf = (b) => b.toLowerCase();
const SMALL = new Set(['of', 'and', 'in', 'the', 'to', 'at', 'a', 'an', 'for', 'with', 'on']);
const titleize = (sl) => sl.split('-').map((w, i) => (i > 0 && SMALL.has(w)) ? w : (w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
const BOARD_LABEL = { AP: 'Andhra Pradesh (SSC)', TS: 'Telangana (SSC)', Karnataka: 'Karnataka (SSLC)', Maharashtra: 'Maharashtra (SSC)' };

export function getStateBoardChapters() {
  let bank = {};
  try { bank = JSON.parse(readFileSync(path.join(ROOT, 'public', 'data', 'state-board-solutions.json'), 'utf8')); } catch { return []; }
  const out = [];
  for (const key of Object.keys(bank)) {
    const parts = key.split('::');
    if (parts.length !== 4) continue;
    const [board, classLevel, subject, chapSlug] = parts;
    const qa = Array.isArray(bank[key]) ? bank[key] : [];
    if (!qa.length) continue;
    out.push({
      board, boardLabel: BOARD_LABEL[board] || board, boardSlug: boardSlugOf(board),
      classLevel, subject, subjSlug: subjSlugOf(subject), chapSlug,
      title: titleize(chapSlug), qa,
    });
  }
  return out;
}
