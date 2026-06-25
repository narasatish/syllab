/**
 * renderer.mjs — "factsdailyy" style poster engine (ported from the info-unlocked
 * design): REAL photo background (Pexels) + readability scrim + bold Anton headline
 * + Montserrat body, accent kicker chip, page counter, @syllab.in watermark.
 * Falls back to a premium gradient when no photo is available.
 *
 * @napi-rs/canvas for crisp custom-font text, sharp for photo composite.
 * composeSlide(spec) → PNG Buffer.   ctaSlide(...) → PNG Buffer.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';
import { getImage } from './images.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR = path.join(__dirname, '..', 'assets', 'fonts');
try {
  GlobalFonts.registerFromPath(path.join(FONT_DIR, 'Anton-Regular.ttf'), 'Anton');
  GlobalFonts.registerFromPath(path.join(FONT_DIR, 'Montserrat.ttf'), 'Montserrat');
} catch { /* falls back to system sans */ }
// Monospace for code cards — register the first available system mono (bundled
// font would be ideal but proprietary; system fonts are licensing-clean).
let HAS_MONO = false;
for (const p of [
  path.join(FONT_DIR, 'CodeMono.ttf'),
  '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf',
  'C:\\Windows\\Fonts\\consola.ttf', 'C:\\Windows\\Fonts\\cour.ttf',
]) {
  try { GlobalFonts.registerFromPath(p, 'CodeMono'); HAS_MONO = true; break; } catch { /* try next */ }
}
const MONO = HAS_MONO ? 'CodeMono' : 'monospace';

const W = 1080, H = 1350, M = 70;
const HANDLE = process.env.IG_HANDLE || 'syllab.in';
// Accent palette keyed by "style" letter (A amber, B red, C purple, D blue, E green).
const ACCENT = { A: '#F59E0B', B: '#DC2626', C: '#A855F7', D: '#2563EB', E: '#10B981', default: '#10B981' };
const GRAD = {
  A: ['#1a0e00', '#92400e'], B: ['#7f1d1d', '#dc2626'], C: ['#1e0533', '#4c1d95'],
  D: ['#0b1220', '#1e3a8a'], E: ['#052e2b', '#065f46'], default: ['#0f172a', '#1e293b'],
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function wrapMeasured(ctx, text, maxW, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = []; let cur = '';
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w;
    if (ctx.measureText(t).width <= maxW) cur = t;
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] += '…'; }
  return lines;
}
// Anton/Montserrat have no emoji glyphs → strip emoji from rendered text so we
// never get tofu boxes (captions keep their emojis; only the IMAGE text is cleaned).
function noEmoji(s) {
  return String(s ?? '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s{2,}/g, ' ').trim();
}
function wrapMono(ctx, text, maxW) {
  const s = String(text ?? '');
  if (ctx.measureText(s).width <= maxW) return [s];
  const out = []; let cur = '';
  for (const ch of s) {
    if (ctx.measureText(cur + ch).width > maxW && cur) { out.push(cur); cur = ch; }
    else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}
function spacedWidth(ctx, text, sp) { let w = 0; for (const ch of text) w += ctx.measureText(ch).width + sp; return w - sp; }
function drawSpaced(ctx, text, x, y, sp) { let cx = x; for (const ch of text) { ctx.fillText(ch, cx, y); cx += ctx.measureText(ch).width + sp; } }

function gradientBuf(style, h = H) {
  const [c1, c2] = GRAD[style] || GRAD.default;
  const cv = createCanvas(W, h); const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, W, h); g.addColorStop(0, c1); g.addColorStop(1, c2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, h);
  // subtle vignette + corner glow
  const rg = ctx.createRadialGradient(W / 2, h * 0.25, 50, W / 2, h * 0.25, h);
  rg.addColorStop(0, 'rgba(255,255,255,0.10)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = rg; ctx.fillRect(0, 0, W, h);
  return cv.toBuffer('image/png');
}

/** Draw the text overlay (transparent) for a slide. */
function drawOverlay({ kicker, headline, body, code, note, style, page, pages, hasPhoto, scrimBoost = 0, h = H }) {
  const cv = createCanvas(W, h); const ctx = cv.getContext('2d');
  const accent = ACCENT[style] || ACCENT.default;
  const maxW = W - 2 * M;
  const b = Math.max(0, Math.min(0.4, scrimBoost));

  // Scrim — heavier on photos; light on gradients (which are already dark).
  const g = ctx.createLinearGradient(0, 0, 0, h);
  if (hasPhoto) {
    g.addColorStop(0, `rgba(0,0,0,${Math.min(0.98, 0.34 + b * 0.6)})`);
    g.addColorStop(0.45, `rgba(0,0,0,${Math.min(0.9, 0.22 + b * 0.6)})`);
    g.addColorStop(1, `rgba(0,0,0,${Math.min(0.98, 0.66 + b)})`);
  } else {
    g.addColorStop(0, 'rgba(0,0,0,0.10)'); g.addColorStop(1, 'rgba(0,0,0,0.30)');
  }
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, h);

  // Headline (Anton, upper area, auto-shrink).
  const upper = noEmoji(headline).toUpperCase();
  let headFont = 100, lines;
  for (;;) {
    ctx.font = `${headFont}px "Anton"`;
    lines = wrapMeasured(ctx, upper, maxW, 5);
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width), 0);
    const headH = lines.length * headFont * 1.04;
    if ((widest <= maxW && headH <= h * 0.42) || headFont <= 44) break;
    headFont -= 4;
  }
  const headLH = headFont * 1.04;
  const headTop = M + 96;
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,0.65)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 3;
  lines.forEach((ln, i) => ctx.fillText(ln, M, headTop + headFont * 0.84 + i * headLH));
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

  // Accent rule under headline.
  let y = headTop + lines.length * headLH + 28;
  ctx.fillStyle = accent; roundRect(ctx, M, y, 120, 8, 4); ctx.fill();
  y += 52;

  // ── CODE card: dark terminal-style block + monospace code ────────────────
  if (code) {
    const codeFont = 38, codeLH = 50;
    ctx.font = `${codeFont}px "${MONO}"`;
    const codeLines = String(code).split('\n').flatMap((ln) => wrapMono(ctx, ln, maxW - 56));
    const boxH = codeLines.length * codeLH + 88;
    ctx.fillStyle = 'rgba(2,6,23,0.92)'; roundRect(ctx, M, y, maxW, boxH, 22); ctx.fill();
    // mac-style window dots
    const dots = ['#ff5f56', '#ffbd2e', '#27c93f'];
    dots.forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(M + 34 + i * 34, y + 36, 9, 0, Math.PI * 2); ctx.fill(); });
    ctx.font = `${codeFont}px "${MONO}"`; ctx.fillStyle = '#7ee787';
    codeLines.forEach((ln, i) => ctx.fillText(ln, M + 28, y + 84 + i * codeLH));
    y += boxH + 40;
    if (note) {
      ctx.font = '36px "Montserrat"'; ctx.fillStyle = 'rgba(255,255,255,0.92)';
      for (const wl of wrapMeasured(ctx, noEmoji(note), maxW, 4)) { ctx.fillText(wl, M, y + 30); y += 50; }
    }
  }

  // Body lines (Montserrat).
  const bodyArr = code ? [] : (body || []).filter(Boolean);
  if (bodyArr.length) {
    const bodyFont = bodyArr.length > 5 ? 36 : 42, bodyLH = bodyFont + 16;
    ctx.font = `${bodyFont}px "Montserrat"`;
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
    for (const line of bodyArr) {
      const wrapped = wrapMeasured(ctx, noEmoji(line), maxW, 3);
      for (const wl of wrapped) { ctx.fillText(wl, M, y + bodyFont * 0.82); y += bodyLH; }
      y += 6;
    }
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  }

  // Kicker chip (top-left).
  if (kicker) {
    const text = noEmoji(kicker).toUpperCase();
    ctx.font = '26px "Montserrat"';
    const chipW = spacedWidth(ctx, text, 3) + 50;
    ctx.fillStyle = accent; roundRect(ctx, M, M, chipW, 56, 12); ctx.fill();
    ctx.fillStyle = '#ffffff'; drawSpaced(ctx, text, M + 25, M + 38, 3);
  }
  // Page counter (top-right).
  if (pages && pages > 1) {
    ctx.font = '30px "Montserrat"'; ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.textAlign = 'right'; ctx.fillText(`${page + 1}/${pages}`, W - M, M + 40); ctx.textAlign = 'left';
  }
  // Swipe hint on cover.
  if (pages && page === 0) {
    ctx.font = '30px "Montserrat"'; ctx.fillStyle = accent; ctx.textAlign = 'right';
    ctx.fillText('Swipe →', W - M, h - 100); ctx.textAlign = 'left';
  }
  // Watermark (bottom-right).
  ctx.font = '26px "Montserrat"'; ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 5; ctx.shadowOffsetY = 1;
  ctx.textAlign = 'right'; ctx.fillText('@' + HANDLE, W - M, h - 44); ctx.textAlign = 'left';
  ctx.shadowColor = 'transparent';

  return cv.toBuffer('image/png');
}

/** Compose a finished slide → PNG Buffer (photo or gradient + overlay). */
export async function composeSlide(spec) {
  const { style = 'E', query, topic, height = H } = spec;
  const plain = spec.plain || !!spec.code;
  const h = height;
  let base, hasPhoto = false, scrim = 0;
  try {
    // `plain` slides (formulas, concepts, tips, MCQs, code) render on a clean
    // gradient card — photos make formulas/code/lists hard to read. Facts/GK use
    // real photos.
    const buf = plain ? null : await getImage(spec.headline, topic || query, { query });
    if (buf) {
      base = await sharp(buf).resize(W, h, { fit: 'cover', position: 'attention' }).toBuffer();
      hasPhoto = true;
      try {
        const st = await sharp(base).extract({ left: 0, top: Math.round(h * 0.5), width: W, height: Math.round(h * 0.5) }).stats();
        const c = st.channels; const lum = 0.299 * c[0].mean + 0.587 * c[1].mean + 0.114 * c[2].mean;
        scrim = Math.max(0, Math.min(0.4, (lum - 95) / 255));
      } catch { /* default scrim */ }
    }
  } catch { /* gradient */ }
  if (!base) base = gradientBuf(style, h);
  const overlay = drawOverlay({ ...spec, hasPhoto, scrimBoost: scrim, h });
  return sharp(base).composite([{ input: overlay, top: 0, left: 0 }]).png().toBuffer();
}

/** Transparent text overlay (scrim + text, no background) for compositing over
 *  a real video clip in a Reel. Always uses the photo-style scrim for readability. */
export function composeOverlay(spec) {
  return drawOverlay({ ...spec, hasPhoto: true, scrimBoost: 0.22, h: spec.height || H });
}

/** Follow-CTA slide for the end of a carousel. */
export async function ctaSlide(style = 'E', topic = 'knowledge') {
  let base;
  try {
    const buf = await getImage('students learning success', topic, {});
    base = buf ? await sharp(buf).resize(W, H, { fit: 'cover', position: 'attention' }).toBuffer() : gradientBuf(style);
  } catch { base = gradientBuf(style); }
  const accent = ACCENT[style] || ACCENT.default;
  const cv = createCanvas(W, H); const ctx = cv.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0.74)'; ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.fillStyle = accent; ctx.font = '40px "Montserrat"'; ctx.fillText('LEARN MORE — 100% FREE', W / 2, H * 0.30);
  ctx.fillStyle = '#ffffff'; ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
  ctx.font = '116px "Anton"'; ctx.fillText('FOLLOW', W / 2, H * 0.44); ctx.fillText('FOR MORE', W / 2, H * 0.44 + 118);
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.font = '46px "Montserrat"';
  const handle = '@' + HANDLE; const pillW = ctx.measureText(handle).width + 80, pillX = (W - pillW) / 2, pillY = H * 0.62;
  ctx.fillStyle = accent; roundRect(ctx, pillX, pillY, pillW, 86, 16); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.fillText(handle, W / 2, pillY + 58);
  ctx.fillStyle = accent; ctx.font = '38px "Montserrat"'; ctx.fillText('SAVE  ·  COMMENT  ·  SHARE', W / 2, H * 0.80);
  ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.font = '30px "Montserrat"'; ctx.fillText('Free learning for every Indian student', W / 2, H * 0.80 + 50);
  ctx.textAlign = 'left';
  return sharp(base).composite([{ input: cv.toBuffer('image/png'), top: 0, left: 0 }]).png().toBuffer();
}
