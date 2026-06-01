#!/usr/bin/env node
/**
 * Sitemap generator for syllab.in
 * Outputs public/sitemap.xml with:
 *   • Static page URLs (main tabs)
 *   • Class pages 1-12
 *   • Per-language Skills Lab landing pages
 *   • Every individual topic deep link
 *
 * Run:  node scripts/generate-sitemap.mjs
 * Or:   npm run build:sitemap
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollegesManifest } from './collegesData.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, '..');
const SITE       = process.env.VITE_SITE_URL || 'https://syllab.in';
const OUT        = path.join(ROOT, 'public', 'sitemap.xml');

// ─── Read the tutorials index to discover all topics ─────────────────────────
async function readTopics() {
  const indexPath = path.join(ROOT, 'src', 'data', 'tutorials', 'index.ts');
  const src = await fs.readFile(indexPath, 'utf8');

  // Extract language ids from LANGUAGES array
  const langIds = [];
  const langMatches = src.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/gi);
  for (const m of langMatches) langIds.push(m[1]);

  // De-dupe
  const languages = [...new Set(langIds)];

  // For each topic file, read and extract topic ids
  const topicsByLang = {};
  for (const lang of languages) {
    const candidates = [
      `${lang}.ts`,
      `${lang.replace(/-/g, '')}.ts`,
      `${lang.replace(/-/g, 'L')}.ts`, // ai-learning -> aiLearning
    ];
    // Manual map for non-trivial cases
    const fileMap = {
      'ai-learning': 'aiLearning.ts',
      'data-analytics': 'dataAnalytics.ts',
      'app-dev': 'app-dev.ts',
      'game-dev': 'game-dev.ts',
    };
    const filename = fileMap[lang] || `${lang}.ts`;
    const fp = path.join(ROOT, 'src', 'data', 'tutorials', filename);
    try {
      const content = await fs.readFile(fp, 'utf8');
      const ids = [...content.matchAll(/^\s*id:\s*['"]([a-z0-9-]+)['"]/gm)].map(m => m[1]);
      topicsByLang[lang] = ids;
    } catch {
      // Skip missing files (e.g. registered but not yet created)
      topicsByLang[lang] = [];
    }
  }

  return { languages, topicsByLang };
}

// ─── Build the URL list ──────────────────────────────────────────────────────
function buildUrls({ languages, topicsByLang }) {
  const urls = [];

  // Home — top priority
  urls.push({ loc: '/',                    priority: 1.0, changefreq: 'daily' });

  // Main tabs — high (must match TAB_TO_PATH in App.tsx exactly).
  // May 2026 rename: /exams→/mock-tests, /learning-lab→/ai-tutor,
  // /skills-lab→/coding, /english-lab→/english, /progress→/dashboard,
  // /general-knowledge→/gk-quiz. (/3d-lab removed.)
  for (const p of ['/syllabus', '/practice', '/daily-challenges', '/mock-tests', '/gk-quiz',
                   '/ai-tutor', '/coding', '/english', '/updates', '/career-predictor',
                   '/preparation', '/coding-challenges', '/mini-projects']) {
    urls.push({ loc: p, priority: 0.9, changefreq: 'daily' });
  }

  // SEO landing pages — high priority (target high-volume keywords)
  for (const p of ['/coding-for-kids', '/python-for-kids', '/computer-basics',
                   '/cyber-safety', '/ai-for-students', '/web-development']) {
    urls.push({ loc: p, priority: 0.8, changefreq: 'weekly' });
  }

  // Static pages — medium
  for (const p of ['/parent', '/profile', '/about', '/contact', '/sitemap',
                   '/blog', '/dashboard', '/terms', '/privacy']) {
    urls.push({ loc: p, priority: 0.6, changefreq: 'monthly' });
  }

  // Class pages
  for (let c = 1; c <= 12; c++) {
    urls.push({ loc: `/class-${c}`, priority: 0.7, changefreq: 'weekly' });
  }

  // Skills Lab language landings (these are prerendered with unique meta).
  for (const lang of languages) {
    urls.push({ loc: `/coding/${lang}`, priority: 0.7, changefreq: 'weekly' });
  }

  // College directory: index + per-state + per-college (all prerendered).
  const { states: collegeStates, colleges } = getCollegesManifest(ROOT);
  urls.push({ loc: '/colleges', priority: 0.8, changefreq: 'weekly' });
  for (const s of collegeStates) {
    urls.push({ loc: `/colleges/${s.slug}`, priority: 0.7, changefreq: 'weekly' });
  }
  for (const c of colleges) {
    urls.push({ loc: `/colleges/${c.stateSlug}/${c.slug}`, priority: 0.6, changefreq: 'monthly' });
  }

  // Deep coding topic pages are now PRERENDERED with unique titles + a
  // self-referencing canonical (see generate-prerender.mjs), so they're valid
  // indexable URLs — list them so Google can discover the long-tail.
  for (const lang of languages) {
    for (const topicId of (topicsByLang[lang] || [])) {
      urls.push({ loc: `/coding/${lang}/${topicId}`, priority: 0.5, changefreq: 'monthly' });
    }
  }

  return urls;
}

// ─── XML serialization ───────────────────────────────────────────────────────
function toXml(urls) {
  const today = new Date().toISOString().split('T')[0];
  const items = urls.map(u =>
    `  <url>\n` +
    `    <loc>${SITE}${u.loc}</loc>\n` +
    `    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>${u.changefreq}</changefreq>\n` +
    `    <priority>${u.priority.toFixed(1)}</priority>\n` +
    `  </url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────
async function main() {
  const data = await readTopics();
  const urls = buildUrls(data);
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, toXml(urls), 'utf8');
  console.log(`✅ Sitemap written: ${OUT}`);
  console.log(`   ${urls.length} URLs across ${data.languages.length} languages`);
}

main().catch(err => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});
