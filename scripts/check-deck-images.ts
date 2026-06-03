/**
 * check-deck-images.ts — measure the REAL user-facing outcome: how many science
 * decks render at least one working diagram (vs. falling back to all-emoji).
 * Extracts every <img class="rimg" src> from science decks, verifies the unique
 * URLs (concurrency), then reports per-deck whether ≥1 image loads.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DECKS = path.join(ROOT, 'public', 'generated-decks');
const SUBJECTS = ['Science', 'Physics', 'Chemistry', 'Biology'];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function walk(d: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await fs.readdir(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
async function status(url: string): Promise<number> {
  try { return (await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'SyllabBot/1.0 (https://syllab.in)' } })).status; }
  catch { return 0; }
}

async function main() {
  const files = (await walk(DECKS)).filter((f) => SUBJECTS.some((s) => f.split(path.sep).includes(s)));
  const deckUrls = new Map<string, string[]>();
  const all = new Set<string>();
  for (const f of files) {
    const html = await fs.readFile(f, 'utf8');
    const urls = [...html.matchAll(/<img class="rimg"[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]);
    deckUrls.set(f, urls);
    urls.forEach((u) => all.add(u));
  }
  console.log(`Science decks: ${files.length}. Unique image URLs: ${all.size}. Verifying…`);

  const ok = new Map<string, boolean>();
  const list = [...all];
  const CONC = 6;
  for (let i = 0; i < list.length; i += CONC) {
    const batch = await Promise.all(list.slice(i, i + CONC).map(async (u) => {
      let c = await status(u); if (c !== 200) { await sleep(500); c = await status(u); }
      return [u, c === 200] as [string, boolean];
    }));
    batch.forEach(([u, v]) => ok.set(u, v));
  }

  let withImg = 0, emojiOnly = 0; const emojiList: string[] = [];
  for (const [f, urls] of deckUrls) {
    const works = urls.some((u) => ok.get(u));
    if (works) withImg++;
    else { emojiOnly++; emojiList.push(path.relative(DECKS, f)); }
  }
  console.log(`\n✅ ${withImg}/${files.length} science decks show ≥1 real diagram. ${emojiOnly} are emoji-only.`);
  console.log(`Broken image URLs still referenced: ${[...ok.values()].filter((v) => !v).length}/${all.size}`);
  if (emojiList.length) { console.log('\nEmoji-only decks:'); emojiList.slice(0, 80).forEach((d) => console.log('  ' + d)); }
}
main().catch((e) => { console.error(e); process.exit(1); });
