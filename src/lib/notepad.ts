/**
 * notepad.ts - pure helpers for the browser Notepad.
 *
 * The critical one is sanitizeHtml. A note body is user-authored HTML that we
 * re-render into a contentEditable div. If we don't strip executable content
 * BOTH when saving AND when loading, a payload like an <img onerror=...> pasted
 * into a note would run on the next render (a stored-XSS on yourself, and worse
 * if notes ever sync/share). So: sanitize on save and on load; render list
 * previews with textContent only (stripTags), never as HTML.
 */

// Elements removed wholesale (with their contents) - never safe in a note body.
const DANGEROUS_TAGS = ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'base', 'form', 'noscript', 'template'];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Whitespace + every C0 control char. Built via new RegExp from an ASCII-only
// string so no literal control byte needs to live in this source file.
const URL_JUNK = new RegExp('[\\u0000-\\u0020]+', 'g');

/** A URL is dangerous if, once whitespace/control chars are stripped, it uses a script-y scheme. */
function isDangerousUrl(url: string): boolean {
  const cleaned = String(url).replace(URL_JUNK, '').toLowerCase();
  return /^(javascript|vbscript|data):/.test(cleaned);
}

/**
 * Return a safe subset of `html`: dangerous elements removed, every on* event
 * handler attribute removed, and javascript:/vbscript:/data: URLs neutralised.
 * Parses via the DOM (DOMParser) so it matches the browser's own parsing - a
 * regex sanitizer is unsafe for HTML. If there is no DOM (SSR), it degrades to
 * plain escaped text, which is always safe.
 */
export function sanitizeHtml(html: string): string {
  const input = String(html ?? '');
  if (!input) return '';
  if (typeof DOMParser === 'undefined') return escapeHtml(stripTags(input));

  const doc = new DOMParser().parseFromString(input, 'text/html');
  const body = doc.body;
  if (!body) return '';

  // 1. Drop dangerous elements entirely.
  body.querySelectorAll(DANGEROUS_TAGS.join(',')).forEach((el) => el.remove());

  // 2. Scrub attributes on everything that remains.
  body.querySelectorAll('*').forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value;
      if (name.startsWith('on')) { el.removeAttribute(attr.name); continue; }        // event handlers
      if (name === 'srcdoc') { el.removeAttribute(attr.name); continue; }             // iframe srcdoc (belt & braces)
      if ((name === 'href' || name === 'src' || name === 'xlink:href' || name === 'formaction' || name === 'action') && isDangerousUrl(value)) {
        el.removeAttribute(attr.name); continue;
      }
      if (name === 'style' && /expression\s*\(|javascript:|vbscript:|url\s*\(/i.test(value)) {
        el.removeAttribute(attr.name); continue;                                       // CSS-based vectors
      }
    }
  });

  return body.innerHTML;
}

/**
 * Plain-text of an HTML string (tags stripped, whitespace collapsed) - for note
 * titles/previews. Script/style contents are dropped first so their source text
 * never leaks into a preview.
 */
export function stripTags(html: string): string {
  const input = String(html ?? '');
  if (!input) return '';
  if (typeof DOMParser === 'undefined') {
    return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const doc = new DOMParser().parseFromString(input, 'text/html');
  doc.body?.querySelectorAll('script,style,template,noscript').forEach((el) => el.remove());
  return (doc.body?.textContent || '').replace(/\s+/g, ' ').trim();
}

/** Live word count of a note body (based on its visible text). */
export function wordCount(html: string): number {
  const text = stripTags(html);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/** First non-empty run of visible text, capped - used to auto-title an untitled note. */
export function previewText(html: string, max = 90): string {
  const text = stripTags(html);
  if (!text) return '';
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}
