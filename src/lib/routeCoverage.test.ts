/**
 * routeCoverage.test.ts — safety net for the soft-404 fix.
 *
 * App.resolveTab() now returns a NOT_FOUND sentinel for unrecognised paths, and
 * the app emits `noindex` for those. That is only safe if EVERY real, indexable
 * URL still resolves to a known tab — if a route pattern were missing from the
 * resolver, we would silently noindex (and eventually deindex) real pages.
 *
 * So: take every URL we publish in sitemap.xml and assert none of them is
 * treated as unknown. This turns a dangerous assumption into a build-time check.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { isUnknownPath } from '../App';

const SITEMAP = resolve(__dirname, '../../public/sitemap.xml');

function sitemapPaths(): string[] {
  if (!existsSync(SITEMAP)) return [];
  const xml = readFileSync(SITEMAP, 'utf8');
  return [...xml.matchAll(/<loc>https:\/\/syllab\.in([^<]*)<\/loc>/g)]
    .map((m) => m[1] || '/')
    // Static files served directly by Hosting (posters, web stories, feeds) are
    // not SPA routes — they never reach the React router.
    .filter((p) => !p.startsWith('/posters/') && !p.startsWith('/web-stories') && !p.endsWith('.xml'));
}

describe('route coverage (soft-404 guard)', () => {
  it('has a sitemap to check', () => {
    expect(sitemapPaths().length).toBeGreaterThan(100);
  });

  it('never treats a published sitemap URL as an unknown route', () => {
    const unknown = sitemapPaths().filter((p) => isUnknownPath(p));
    // Show a sample so a regression is immediately diagnosable.
    expect({ count: unknown.length, sample: unknown.slice(0, 15) }).toEqual({ count: 0, sample: [] });
  });

  it('still flags genuinely bogus URLs as unknown', () => {
    expect(isUnknownPath('/this-page-does-not-exist-xyz123')).toBe(true);
    expect(isUnknownPath('/random/deep/nonsense')).toBe(true);
  });

  it('treats the homepage and key routes as known', () => {
    for (const p of ['/', '/syllabus', '/tools', '/mock-tests', '/compare', '/notes']) {
      expect(isUnknownPath(p)).toBe(false);
    }
  });
});
