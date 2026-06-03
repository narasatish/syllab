/**
 * check-diagram-urls.ts — validate every diagramLab image URL.
 *
 * Wikimedia throttles bursts, so we go SEQUENTIALLY with a small delay and
 * retry non-200 responses once (to tell a real 404 from a throttle blip).
 * Outputs scripts/diagram-url-report.json: { ok: [...], broken: [{id,name,url,status}] }
 *
 *   npx tsx scripts/check-diagram-urls.ts
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DIAGRAMS } from '../src/data/diagramLab';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'diagram-url-report.json');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function status(url: string): Promise<number> {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': 'SyllabBot/1.0 (https://syllab.in)' } });
    return res.status;
  } catch { return 0; }
}

async function check(d: typeof DIAGRAMS[number]) {
  let code = await status(d.imageUrl);
  if (code !== 200) { await sleep(600); code = await status(d.imageUrl); } // retry once (throttle vs real 404)
  return { d, code };
}

async function main() {
  const ok: string[] = [];
  const broken: { id: string; name: string; subject: string; classNumber: number; url: string; status: number }[] = [];
  const CONC = 6;
  let done = 0;
  for (let i = 0; i < DIAGRAMS.length; i += CONC) {
    const batch = await Promise.all(DIAGRAMS.slice(i, i + CONC).map(check));
    for (const { d, code } of batch) {
      if (code === 200) ok.push(d.id);
      else broken.push({ id: d.id, name: d.name, subject: d.subject, classNumber: d.classNumber, url: d.imageUrl, status: code });
    }
    done += batch.length;
    if (done % 24 < CONC) console.log(`  checked ${done}/${DIAGRAMS.length} — ${broken.length} broken so far`);
  }
  await fs.writeFile(OUT, JSON.stringify({ checkedAt: 'n/a', total: DIAGRAMS.length, okCount: ok.length, brokenCount: broken.length, broken }, null, 2), 'utf8');
  console.log(`\n✅ ${ok.length}/${DIAGRAMS.length} OK, ${broken.length} broken → ${OUT}`);
  for (const b of broken) console.log(`  ✗ [${b.status}] ${b.id} (${b.subject} C${b.classNumber}) — ${b.name}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
