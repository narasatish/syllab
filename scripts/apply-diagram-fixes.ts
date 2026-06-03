/**
 * apply-diagram-fixes.ts — apply resolved URL fixes everywhere.
 *
 * Reads scripts/diagram-url-fixes.json and, for each fix, replaces the dead URL
 * with the verified one (1) across all src/data/diagrams/*.ts source files and
 * (2) across every already-generated deck in public/generated-decks (so existing
 * decks stop falling back to emoji). Deterministic string replacement — old URLs
 * are unique. No Gemini calls.
 *
 *   npx tsx scripts/apply-diagram-fixes.ts          (apply)
 *   npx tsx scripts/apply-diagram-fixes.ts --dry     (report only)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FIXES = path.join(__dirname, 'diagram-url-fixes.approved.json');
const DIAGRAMS_DIR = path.join(ROOT, 'src', 'data', 'diagrams');
const DECKS_DIR = path.join(ROOT, 'public', 'generated-decks');
const DRY = process.argv.includes('--dry');

async function walk(dir: string, ext: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(fp, ext));
    else if (e.name.endsWith(ext)) out.push(fp);
  }
  return out;
}

async function replaceInFiles(files: string[], map: Map<string, string>) {
  let changedFiles = 0, totalHits = 0;
  for (const fp of files) {
    let html = await fs.readFile(fp, 'utf8');
    let hits = 0;
    for (const [oldU, newU] of map) {
      if (html.includes(oldU)) { html = html.split(oldU).join(newU); hits++; }
    }
    if (hits) { changedFiles++; totalHits += hits; if (!DRY) await fs.writeFile(fp, html, 'utf8'); }
  }
  return { changedFiles, totalHits };
}

async function main() {
  const { fixes } = JSON.parse(await fs.readFile(FIXES, 'utf8'));
  const map = new Map<string, string>(fixes.map((f: any) => [f.old, f.new]));
  console.log(`${DRY ? '[dry] ' : ''}Applying ${map.size} URL fixes…`);

  const srcFiles = await walk(DIAGRAMS_DIR, '.ts');
  const src = await replaceInFiles(srcFiles, map);
  console.log(`  source: ${src.totalHits} URLs replaced in ${src.changedFiles} diagram files`);

  const deckFiles = await walk(DECKS_DIR, '.html');
  const decks = await replaceInFiles(deckFiles, map);
  console.log(`  decks:  ${decks.totalHits} URLs replaced in ${decks.changedFiles} generated decks`);
  console.log(`✅ ${DRY ? 'WOULD APPLY' : 'Applied'}.`);
}
main().catch((e) => { console.error(e); process.exit(1); });
