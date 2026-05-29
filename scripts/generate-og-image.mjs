#!/usr/bin/env node
/**
 * Generates public/og-image.png (1200×630) from public/og-image.svg
 * using @resvg/resvg-js (pure Wasm, no system dependencies needed).
 *
 * Install once: npm install --save-dev @resvg/resvg-js
 * Run: node scripts/generate-og-image.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

async function main() {
  let Resvg;
  try {
    ({ Resvg } = await import('@resvg/resvg-js'));
  } catch {
    console.warn('⚠️  @resvg/resvg-js not installed. Run: npm install --save-dev @resvg/resvg-js');
    console.warn('   Then re-run: node scripts/generate-og-image.mjs');
    process.exit(0);
  }

  const svgPath = resolve(ROOT, 'public', 'og-image.svg');
  const pngPath = resolve(ROOT, 'public', 'og-image.png');

  const svg = readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  writeFileSync(pngPath, pngBuffer);

  console.log(`✅ og-image.png generated: ${pngPath}`);
  console.log(`   Size: ${(pngBuffer.length / 1024).toFixed(1)} KB`);
}

main().catch(err => {
  console.error('❌ OG image generation failed:', err);
  process.exit(1);
});
