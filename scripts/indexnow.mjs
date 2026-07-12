#!/usr/bin/env node
/**
 * IndexNow submitter — instantly tells Bing, Yandex & other IndexNow engines about
 * our URLs so new/updated pages get crawled in hours instead of weeks. (Google
 * doesn't use IndexNow, but it covers Bing/Yandex/Naver/Seznam and is free.)
 *
 * Setup (one-time): the key file public/${KEY}.txt must be deployed and reachable
 * at https://syllab.in/${KEY}.txt — it already is (generated alongside this script).
 *
 * Run after every deploy:  node scripts/indexnow.mjs
 * Optionally submit a subset: node scripts/indexnow.mjs /worksheets /kids/stories
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = process.env.VITE_SITE_URL || 'https://syllab.in';
const HOST = SITE.replace(/^https?:\/\//, '');
const KEY = process.env.INDEXNOW_KEY || 'a3f9c1e7b8d24f06a1c5e9d3b7f08c42';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function readSitemapUrls() {
  try {
    const xml = await fs.readFile(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

async function submit(urlList) {
  // IndexNow accepts up to 10,000 URLs per POST.
  const body = { host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return res.status;
}

async function main() {
  const args = process.argv.slice(2);
  let urls;
  if (args.length) {
    urls = args.map((u) => (u.startsWith('http') ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`));
  } else {
    urls = await readSitemapUrls();
  }
  if (!urls.length) { console.error('❌ No URLs to submit (sitemap.xml empty?).'); process.exit(1); }

  // Submit in chunks of 10000 (well under the limit; we have ~1000).
  const chunkSize = 10000;
  let ok = 0;
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    try {
      const status = await submit(chunk);
      if (status >= 200 && status < 300) { ok += chunk.length; console.log(`✅ Submitted ${chunk.length} URLs (HTTP ${status}).`); }
      else console.warn(`⚠️  IndexNow returned HTTP ${status} for a batch of ${chunk.length}.`);
    } catch (e) {
      console.error(`❌ IndexNow request failed: ${e?.message || e}`);
    }
  }
  console.log(`Done. ${ok}/${urls.length} URLs accepted by IndexNow.`);
}

main();
