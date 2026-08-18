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

/**
 * Below this word count an auto-generated post is treated as THIN: it stays
 * readable on the site but is served `noindex, follow` and kept out of the
 * sitemap. 48 of 54 auto posts were under 300 words (median 135) — exactly the
 * mass-produced thin content the March-2026 update penalises, and enough of it
 * to drag the quality signal for the other ~4,000 real pages.
 *
 * `follow` (not `nofollow`) is deliberate: the pages still pass link equity to
 * the resources they reference. This is fully reversible — raise/remove the
 * threshold and the pages return to the index.
 */
export const THIN_WORD_MIN = 300;

/** Words in a markdown string, ignoring code fences and formatting characters. */
function wordCount(md) {
  return String(md || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_>`|\-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/** True when an article is too thin to deserve indexing. Curated posts (no `words`) are never thin. */
export function isThinArticle(a) {
  return typeof a?.words === 'number' && a.words < THIN_WORD_MIN;
}

export function getBlogArticles() {
  let src = readFileSync(path.join(ROOT, 'src', 'pages', 'Updates.tsx'), 'utf8');
  // Scope to the curated ARTICLES array so we don't pick up unrelated objects.
  const start = src.indexOf('const CURATED_ARTICLES');
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

  // Auto-generated articles (autoBlogs.json) are merged into /updates too, so
  // each one also gets a prerendered, indexable /updates/<slug> page.
  try {
    const auto = JSON.parse(readFileSync(path.join(ROOT, 'src', 'data', 'autoBlogs.json'), 'utf8'));
    for (const b of Array.isArray(auto) ? auto : []) {
      if (!b || !b.id || !b.title || seen.has(b.id)) continue;
      seen.add(b.id);
      out.push({
        slug: b.id,
        title: b.title,
        summary: b.description || b.title,
        // Word count of the real article text, so callers can keep thin posts
        // out of the index. See THIN_WORD_MIN below.
        words: wordCount(b.content),
        // The article body itself. Without this the prerenderer had only the
        // summary to work with, so /updates/<slug> shipped ~160 words of a
        // 1,000-word post and the rest existed only after hydration — invisible
        // to a crawler, which is the whole point of prerendering these.
        content: b.content || '',
      });
    }
  } catch { /* autoBlogs.json optional */ }

  return out;
}

/**
 * Full article bodies from src/data/updateArticles.ts.
 *
 * The /updates/<slug> routes carried a title, a summary and JSON-LD, and no
 * bodyHtml at all — 195 words prerendered — while Updates.tsx calls
 * getArticleBySlug() and renders the whole multi-section article client-side.
 * So a reader with JavaScript got the article and a crawler got a stub, on pages
 * that are indexable. That is not merely thin: the prerendered HTML and the
 * hydrated DOM disagreed about what the page contains.
 *
 * 27 of the 38 articles here match an existing /updates route. The other 11 have
 * no route and are left alone rather than published as new pages off the back of
 * a rendering fix.
 */
export function getFullArticles() {
  try {
    const ts = readFileSync(path.join(ROOT, 'src', 'data', 'updateArticles.ts'), 'utf8').replace(/\r\n/g, '\n');
    const start = ts.indexOf('export const FULL_ARTICLES');
    if (start < 0) return [];
    const body = ts.slice(start);
    const un = (v) => String(v || '').replace(/\\'/g, "'");
    // Section objects do not reliably close with `}` straight after the body —
    // most carry a trailing comma or newline first — so anchoring on the closing
    // brace found only 5 of 38 articles. Anchor on the heading/body pair instead.
    // Headings may contain an escaped apostrophe (two do), so the capture
    // consumes \' rather than stopping at it.
    const secRe = /heading: '((?:[^'\\]|\\.)*)',\s*body: `([\s\S]*?)`/g;
    // The bank spells these `question`/`answer`; faqBlock() expects `q`/`a`.
    const faqRe = /\{\s*question: '((?:[^'\\]|\\.)*)',\s*answer: '((?:[^'\\]|\\.)*)'/g;
    const out = [];
    for (const chunk of body.split(/\n  \{\n/).slice(1)) {
      const slugM = chunk.match(/slug: '([^']+)'/);
      if (!slugM) continue;
      const sections = [...chunk.matchAll(secRe)].map((m) => ({ heading: un(m[1]), body: m[2] }));
      const fb = chunk.match(/faq:\s*\[([\s\S]*?)\n\s*\],/);
      const faq = fb ? [...fb[1].matchAll(faqRe)].map((m) => ({ q: un(m[1]), a: un(m[2]) })) : [];
      if (sections.length) out.push({ slug: slugM[1], sections, faq });
    }
    return out;
  } catch { return []; }
}
