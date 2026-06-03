/**
 * blogArticles.mjs — single source of blog-article metadata for the build
 * scripts (prerender + sitemap). Reads the ARTICLES array out of
 * src/pages/Updates.tsx so each article can get its own prerendered,
 * indexable /updates/<slug> page. No new data file to keep in sync.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function getBlogArticles() {
  let src = readFileSync(path.join(ROOT, 'src', 'pages', 'Updates.tsx'), 'utf8');
  // Scope to the ARTICLES array so we don't pick up unrelated objects.
  const start = src.indexOf('const ARTICLES');
  if (start !== -1) src = src.slice(start);
  // Each article block has slug → title → summary in order.
  const re = /slug:\s*'([^']+)'[\s\S]*?title:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?summary:\s*'((?:[^'\\]|\\.)*)'/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    const slug = m[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    const unescape = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    out.push({ slug, title: unescape(m[2]), summary: unescape(m[3]) });
  }
  return out;
}
