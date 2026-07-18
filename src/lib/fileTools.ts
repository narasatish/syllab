/**
 * fileTools.ts — pure, framework-free helpers for the File Tools suite
 * (PDF Toolkit + Image Toolkit). Kept side-effect free so they can be unit
 * tested; the heavy libraries (pdf-lib, pdf.js, heic2any) are lazy-loaded in
 * the page components, never here.
 */

/** Max input sizes — bigger files freeze the browser, so we reject them. */
export const MAX_PDF_BYTES = 50 * 1024 * 1024; // ~50 MB
export const MAX_IMAGE_BYTES = 25 * 1024 * 1024; // ~25 MB

/**
 * Parse a page-range spec like "1-3,5,8-" against a document of `total` pages.
 * Returns a sorted, de-duplicated array of 1-based page numbers, clamped to
 * [1, total]. Open-ended ranges are supported: "8-" = 8..total, "-3" = 1..3.
 * Invalid tokens are ignored (so a stray character never breaks the whole spec).
 */
export function parsePageRanges(spec: string, total: number): number[] {
  const out = new Set<number>();
  if (!Number.isFinite(total) || total < 1) return [];
  for (const raw of String(spec).split(',')) {
    const part = raw.trim();
    if (!part) continue;
    const range = part.match(/^(\d+)?\s*-\s*(\d+)?$/);
    if (range) {
      let start = range[1] ? parseInt(range[1], 10) : 1;
      let end = range[2] ? parseInt(range[2], 10) : total;
      if (!Number.isFinite(start) || !Number.isFinite(end)) continue;
      if (start > end) [start, end] = [end, start];
      for (let p = Math.max(1, start); p <= Math.min(total, end); p++) out.add(p);
    } else if (/^\d+$/.test(part)) {
      const p = parseInt(part, 10);
      if (p >= 1 && p <= total) out.add(p);
    }
    // anything else (letters, junk) is silently skipped
  }
  return [...out].sort((a, b) => a - b);
}

/**
 * Fit a (w×h) box inside a (maxW×maxH) box, preserving aspect ratio and NEVER
 * upscaling (scale is capped at 1). Returns integer pixel dimensions.
 */
export function fitWithin(w: number, h: number, maxW: number, maxH: number): { width: number; height: number } {
  if (!(w > 0) || !(h > 0)) return { width: 0, height: 0 };
  const scale = Math.min(maxW > 0 ? maxW / w : 1, maxH > 0 ? maxH / h : 1, 1);
  return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
}

/** Human-readable byte size, e.g. 1536 → "1.5 KB", 1048576 → "1 MB". */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const v = bytes / Math.pow(1024, i);
  if (i === 0 || v >= 100) return `${Math.round(v)} ${units[i]}`;
  const s = v.toFixed(1);
  return `${s.endsWith('.0') ? s.slice(0, -2) : s} ${units[i]}`;
}

/** Centered crop rectangle (x,y,w,h) for a source image cropped to an aspect ratio. */
export function centeredCrop(srcW: number, srcH: number, aspectW: number, aspectH: number): { x: number; y: number; w: number; h: number } {
  if (!(srcW > 0) || !(srcH > 0) || !(aspectW > 0) || !(aspectH > 0)) return { x: 0, y: 0, w: srcW, h: srcH };
  const target = aspectW / aspectH;
  const src = srcW / srcH;
  let w = srcW, h = srcH;
  if (src > target) { w = Math.round(srcH * target); h = srcH; } // too wide → trim sides
  else { w = srcW; h = Math.round(srcW / target); }             // too tall → trim top/bottom
  return { x: Math.round((srcW - w) / 2), y: Math.round((srcH - h) / 2), w, h };
}
