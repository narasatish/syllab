#!/usr/bin/env node
/**
 * ping-search-engines.mjs — submits sitemap URLs for faster search engine indexing.
 *
 * IMPORTANT: Google deprecated its sitemap ping endpoint in 2023. This script uses
 * IndexNow (supported by Bing, Yandex, Seznam) for actual URL submission.
 * Google indexing relies on the sitemap in robots.txt and Search Console.
 *
 * Environment:
 *   INDEXNOW_KEY — optional; if not set, a helpful setup message is printed and exit 0 gracefully.
 *
 * Setup (one-time):
 *   1. Create an IndexNow key: https://www.bing.com/indexnow
 *   2. Host the key file at https://syllab.in/<key>.txt (raw text, just the key)
 *   3. Set env var INDEXNOW_KEY=<key>
 *   4. (Re)run this script
 *
 * For Google: no API call needed. Google crawls robots.txt automatically.
 * Ensure /public/robots.txt lists the sitemap URL.
 * Verify via Google Search Console: https://search.google.com/search-console
 *
 * Usage: node scripts/ping-search-engines.mjs
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap.xml');
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

/** Parse <loc> URLs from sitemap.xml */
async function readSitemapUrls() {
  try {
    const xml = await fs.readFile(SITEMAP_PATH, 'utf-8');
    const locMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    return locMatches.map((m) => m.replace(/<\/?loc>/g, ''));
  } catch (e) {
    console.error(`✗ Error reading sitemap at ${SITEMAP_PATH}:`, e.message);
    process.exit(1);
  }
}

/** Submit URLs to IndexNow API */
async function submitToIndexNow(urls) {
  if (!INDEXNOW_KEY) {
    console.log(`
⚠ IndexNow key not configured. URLs will not be submitted for indexing.

SETUP (one-time):
  1. Create an IndexNow key: https://www.bing.com/indexnow
  2. Host the key at https://syllab.in/{key}.txt (raw text file with just the key)
  3. Set env var: export INDEXNOW_KEY=<your-key>
  4. Re-run this script

GOOGLE: No API needed. Ensure robots.txt lists the sitemap, and verify in Search Console.
    `);
    process.exit(0);
  }

  // Extract host from first URL
  const host = new URL(urls[0]).hostname;
  const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;

  // Batch URLs (IndexNow max 10000 per request)
  const batches = [];
  for (let i = 0; i < urls.length; i += 10000) {
    batches.push(urls.slice(i, i + 10000));
  }

  let totalSubmitted = 0;
  for (const batch of batches) {
    try {
      const body = JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: batch,
      });

      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (res.ok) {
        totalSubmitted += batch.length;
        console.log(`✓ Submitted batch of ${batch.length} URLs to IndexNow`);
      } else {
        const text = await res.text();
        console.warn(`✗ IndexNow returned HTTP ${res.status}:`, text.slice(0, 200));
      }
    } catch (e) {
      console.error(`✗ Error submitting to IndexNow:`, e.message);
      process.exit(1);
    }
  }

  return totalSubmitted;
}

(async () => {
  const urls = await readSitemapUrls();
  console.log(`📄 Found ${urls.length} URLs in sitemap.xml`);

  const submitted = await submitToIndexNow(urls);
  if (submitted > 0) {
    console.log(`✅ IndexNow: ${submitted} URLs submitted for indexing (Bing, Yandex, Seznam)`);
    console.log(`📌 Google indexing: relies on sitemap in robots.txt + Search Console verification`);
  }
})();
