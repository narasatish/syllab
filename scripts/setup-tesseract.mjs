/**
 * setup-tesseract.mjs — copy the Tesseract.js engine files out of node_modules
 * into public/tesseract/ and download the English language data. These assets
 * are gitignored (~55MB) but must be present in public/ at build time so they
 * get copied into dist/ and deployed (the OCR runs 100% client-side, self-hosted
 * and CSP-safe — no CDN). Run: `node scripts/setup-tesseract.mjs`.
 */
import { mkdirSync, copyFileSync, readdirSync, existsSync, statSync, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'tesseract');
const tessdataDir = join(outDir, 'tessdata');
mkdirSync(tessdataDir, { recursive: true });

// 1. Worker
copyFileSync(join(root, 'node_modules/tesseract.js/dist/worker.min.js'), join(outDir, 'worker.min.js'));

// 2. Core engine variants (wasm + loaders)
const coreDir = join(root, 'node_modules/tesseract.js-core');
for (const f of readdirSync(coreDir)) {
  if (/\.(wasm|wasm\.js|js)$/.test(f)) copyFileSync(join(coreDir, f), join(outDir, f));
}
console.log(`✅ Copied Tesseract engine → public/tesseract/ (${readdirSync(outDir).filter((f) => f !== 'tessdata').length} files)`);

// 3. English language data (~11MB)
const langFile = join(tessdataDir, 'eng.traineddata.gz');
if (existsSync(langFile) && statSync(langFile).size > 1_000_000) {
  console.log('✅ eng.traineddata.gz already present — skipping download.');
} else {
  const url = 'https://tessdata.projectnaptha.com/4.0.0/eng.traineddata.gz';
  await new Promise((resolve, reject) => {
    const get = (u) => https.get(u, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return get(res.headers.location);
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const ws = createWriteStream(langFile);
      res.pipe(ws);
      ws.on('finish', () => ws.close(resolve));
    }).on('error', reject);
    get(url);
  });
  console.log(`✅ Downloaded eng.traineddata.gz (${(statSync(langFile).size / 1e6).toFixed(1)} MB)`);
}
