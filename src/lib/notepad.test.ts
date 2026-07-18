import { describe, it, expect } from 'vitest';
import { sanitizeHtml, stripTags, wordCount, previewText } from './notepad';

describe('sanitizeHtml — keeps safe formatting', () => {
  it('preserves basic rich-text tags', () => {
    const html = '<b>bold</b> <i>it</i> <u>u</u><h3>Head</h3><ul><li>x</li></ul>';
    const out = sanitizeHtml(html);
    expect(out).toContain('<b>bold</b>');
    expect(out).toContain('<h3>Head</h3>');
    expect(out).toContain('<li>x</li>');
  });

  it('keeps a safe http link', () => {
    const out = sanitizeHtml('<a href="https://syllab.in">link</a>');
    expect(out).toContain('href="https://syllab.in"');
  });
});

describe('sanitizeHtml — strips executable content (the XSS rule)', () => {
  it('removes <script> entirely', () => {
    const out = sanitizeHtml('<p>hi</p><script>alert(1)</script>');
    expect(out.toLowerCase()).not.toContain('<script');
    expect(out.toLowerCase()).not.toContain('alert(1)');
    expect(out).toContain('<p>hi</p>');
  });

  it('strips on* handler attributes but can keep the element', () => {
    const out = sanitizeHtml('<img src="x" onerror="alert(1)">');
    expect(out.toLowerCase()).not.toContain('onerror');
    expect(out.toLowerCase()).not.toContain('alert');
  });

  it('neutralises javascript: URLs', () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">x</a>');
    expect(out.toLowerCase()).not.toContain('javascript:');
  });

  it('neutralises obfuscated javascript: with control chars', () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">x</a>');
    expect(out.toLowerCase()).not.toContain('script:alert');
  });

  it('removes style/iframe/object/embed/link/meta/form', () => {
    const out = sanitizeHtml('<style>b{}</style><iframe src="e"></iframe><object></object><embed><link><meta><form></form><p>ok</p>');
    ['<style', '<iframe', '<object', '<embed', '<link', '<meta', '<form'].forEach((t) => {
      expect(out.toLowerCase()).not.toContain(t);
    });
    expect(out).toContain('<p>ok</p>');
  });

  it('strips svg onload handlers', () => {
    const out = sanitizeHtml('<svg><g onload="alert(1)"></g></svg>');
    expect(out.toLowerCase()).not.toContain('onload');
  });

  it('is safe on empty / nullish', () => {
    expect(sanitizeHtml('')).toBe('');
    // @ts-expect-error runtime guard
    expect(sanitizeHtml(null)).toBe('');
  });
});

describe('stripTags / preview', () => {
  it('returns visible text only, no tags', () => {
    expect(stripTags('<b>Hello</b> <i>world</i>')).toBe('Hello world');
  });

  it('does not leak script source into preview', () => {
    expect(stripTags('<script>alert(1)</script>Note body')).toBe('Note body');
  });

  it('collapses whitespace', () => {
    expect(stripTags('<p>a</p>\n\n  <p>b</p>')).toBe('a b');
  });

  it('previewText truncates with an ellipsis', () => {
    const long = '<p>' + 'x'.repeat(200) + '</p>';
    const p = previewText(long, 20);
    expect(p.length).toBeLessThanOrEqual(21);
    expect(p.endsWith('…')).toBe(true);
  });
});

describe('wordCount', () => {
  it('counts words in the visible text', () => {
    expect(wordCount('<b>one</b> two three')).toBe(3);
  });
  it('is zero for empty / tag-only', () => {
    expect(wordCount('')).toBe(0);
    expect(wordCount('<br><hr>')).toBe(0);
  });
});
