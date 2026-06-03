#!/usr/bin/env node
/**
 * generate-image-sitemap.mjs — image sitemap associating Syllab's curated
 * science diagrams + India maps (with captions) to their class pages, so search
 * engines understand the visual content on each indexable class page.
 * Run via build (npm run build:images) or standalone.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = process.env.VITE_SITE_URL || 'https://syllab.in';
const OUT = path.join(ROOT, 'public', 'sitemap-images.xml');

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Pull image URL + caption + class from the diagram/social-image source files
// by regex (avoids importing TS). Each entry → an <image:image> under /class-N.
async function readImages() {
  const out = []; // { cls, url, caption }
  const files = await fs.readdir(path.join(ROOT, 'src', 'data', 'diagrams'));
  for (const f of files) {
    if (!f.endsWith('.ts')) continue;
    const src = await fs.readFile(path.join(ROOT, 'src', 'data', 'diagrams', f), 'utf8');
    // crude per-object scan: imageUrl + classNumber + name
    const objs = src.split(/\{/);
    for (const o of objs) {
      const url = o.match(/imageUrl:\s*['"]([^'"]+)['"]/);
      const cls = o.match(/classNumber:\s*(\d+)/);
      const name = o.match(/name:\s*['"]([^'"]+)['"]/);
      if (url && cls) out.push({ cls: cls[1], url: url[1], caption: name ? name[1] : '' });
    }
  }
  // Social Science images (socialImages.ts) → associate with classes 6-10 broadly via key
  try {
    const ss = await fs.readFile(path.join(ROOT, 'src', 'data', 'socialImages.ts'), 'utf8');
    for (const m of ss.matchAll(/"url":\s*"([^"]+)"[\s\S]*?"alt":\s*"([^"]+)"/g)) {
      out.push({ cls: '10', url: m[1], caption: m[2] });
    }
  } catch { /* optional */ }
  return out;
}

function toXml(images) {
  // Group by class page.
  const byClass = {};
  for (const im of images) (byClass[im.cls] ||= []).push(im);
  const urls = Object.entries(byClass).map(([cls, imgs]) => {
    const seen = new Set();
    const items = imgs.filter((i) => !seen.has(i.url) && seen.add(i.url)).slice(0, 1000).map((i) =>
      `    <image:image>\n      <image:loc>${esc(i.url)}</image:loc>\n      <image:caption>${esc(i.caption)}</image:caption>\n    </image:image>`,
    ).join('\n');
    return `  <url>\n    <loc>${SITE}/class-${cls}</loc>\n${items}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
}

const images = await readImages();
await fs.writeFile(OUT, toXml(images), 'utf8');
console.log(`✅ Image sitemap: ${images.length} images across class pages → ${OUT}`);
