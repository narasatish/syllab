/**
 * generate-rss.mjs — Generate RSS 2.0 feed for Syllab.in blog updates
 * Reads blog articles from blogArticles.mjs and writes public/feed.xml
 * Run: node scripts/generate-rss.mjs
 */

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getBlogArticles } from './blogArticles.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FEED_PATH = path.join(ROOT, 'public', 'feed.xml');

/**
 * XML-escape special characters in text content
 */
function xmlEscape(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format date as RFC 2822 for RSS pubDate
 * RFC 2822: "Fri, 08 Jun 2025 10:00:00 +0000"
 */
function toRFC2822(date) {
  const d = new Date(date);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${days[d.getUTCDay()]}, ${String(d.getUTCDate()).padStart(2, '0')} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')} +0000`;
}

/**
 * Generate RSS 2.0 feed
 */
function generateRSS() {
  const articles = getBlogArticles();
  const baseURL = 'https://syllab.in';
  const lastBuildDate = toRFC2822(new Date());

  const items = articles
    .map(({ slug, title, summary }) => {
      const link = `${baseURL}/updates/${slug}`;
      return `  <item>
    <title>${xmlEscape(title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <description>${xmlEscape(summary)}</description>
  </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated RSS feed for Syllab.in blog updates. Regenerate with: node scripts/generate-rss.mjs -->
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Syllab.in — Free Learning for Indian Students (Class 1–12)</title>
    <link>https://syllab.in/updates</link>
    <description>Free NCERT solutions, mock tests, AI tutor, and exam prep news for Indian students across Class 1 to 12. Comprehensive study resources for CBSE, JEE, NEET, and more.</description>
    <language>en-in</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  writeFileSync(FEED_PATH, rss, 'utf8');
  return articles.length;
}

try {
  const count = generateRSS();
  console.log(`✓ RSS feed generated: ${FEED_PATH} (${count} items)`);
} catch (err) {
  console.error('✗ Failed to generate RSS feed:', err.message);
  process.exit(1);
}
