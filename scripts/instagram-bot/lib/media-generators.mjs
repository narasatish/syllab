/**
 * media-generators.mjs — turns a post spec into media files using the photo+Anton
 * poster engine (renderer.mjs).
 *   image    → one 1080×1350 PNG
 *   carousel → N 1080×1350 PNGs + a "Follow for more" CTA slide
 *   reel     → one 1080×1920 MP4 (ffmpeg slideshow of photo+text frames + audio)
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import { composeSlide, ctaSlide, composeOverlay } from './renderer.mjs';
import { getVideo } from './images.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MUSIC_DIR = path.join(__dirname, '..', 'assets', 'music');
const REEL_H = 1920;

// Map the content-engine theme names → renderer accent style letters.
const THEME_STYLE = { violet: 'C', indigo: 'D', emerald: 'E', amber: 'A', rose: 'B', sky: 'D', slate: 'D', cta: 'E' };
const styleOf = (theme) => THEME_STYLE[theme] || 'E';

const slideSpec = (s, page, pages, height) => ({
  kicker: s.kicker || '', headline: s.title || s.headline || '', body: s.lines || [],
  code: s.code, note: s.note,
  style: styleOf(s.theme), topic: s.topic, plain: !!s.plain, page, pages, height,
});

export async function generateImage(post, dir, idx) {
  mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${idx}-image-${slug(post)}.png`);
  // A single image must be self-complete: if the cover has no body, pull the
  // detail from the next slide so it never ships as a near-empty card.
  const s0 = post.slides[0];
  const body = (s0.lines && s0.lines.length) ? s0.lines : (post.slides[1]?.lines || []);
  const buf = await composeSlide({ ...slideSpec(s0), body });
  writeFileSync(out, buf);
  return { type: 'IMAGE', files: [out] };
}

export async function generateCarousel(post, dir, idx) {
  mkdirSync(dir, { recursive: true });
  const files = [];
  const total = post.slides.length + 1; // + CTA slide
  for (let i = 0; i < post.slides.length; i++) {
    const out = path.join(dir, `${idx}-carousel-${slug(post)}-${i + 1}.png`);
    writeFileSync(out, await composeSlide(slideSpec(post.slides[i], i, total)));
    files.push(out);
  }
  const ctaOut = path.join(dir, `${idx}-carousel-${slug(post)}-${total}.png`);
  writeFileSync(ctaOut, await ctaSlide(styleOf(post.slides[0]?.theme), post.slides[0]?.topic));
  files.push(ctaOut);
  return { type: 'CAROUSEL', files };
}

const abs = (f) => path.resolve(f).replace(/\\/g, '/');
const reelDur = (sc) => Math.max(2.8, ((sc.durationMs || 3000) / 1000) * 1.4);

export async function generateReel(post, dir, idx) {
  mkdirSync(dir, { recursive: true });
  const work = path.join(dir, `.frames-${idx}`);
  mkdirSync(work, { recursive: true });
  const scenes = (post.scenes && post.scenes.length)
    ? post.scenes
    : post.slides.map((s) => ({ text: s.title, sub: (s.lines || []).join('  •  '), durationMs: 3000, theme: s.theme }));
  const plain = !!(post.slides && post.slides[0] && post.slides[0].plain);
  const durs = scenes.map(reelDur);
  const total = durs.reduce((a, b) => a + b, 0);
  const music = pickMusic(post.audioPick != null ? post.audioPick : ((post.keys && post.keys[0]) || idx));
  const out = path.join(dir, `${idx}-reel-${slug(post)}.mp4`);

  // ── REAL VIDEO BACKGROUND (facts / GK / timeline — not plain formula/code) ──
  // Motion footage behind the text gets more reach than static photo reels.
  if (!plain) {
    try {
      const vid = await getVideo((post.slides && post.slides[0] && post.slides[0].title) || scenes[0].text, post.topic);
      if (vid && vid.buffer) {
        buildVideoReel({ scenes, durs, total, videoBuf: vid.buffer, music, work, out });
        rmSync(work, { recursive: true, force: true });
        return { type: 'REELS', files: [out], bg: 'video' };
      }
    } catch { /* fall through to photo/gradient slideshow */ }
  }

  // ── Slideshow fallback (photo / gradient frames) ──
  const frames = [];
  for (let i = 0; i < scenes.length; i++) {
    const sc = scenes[i];
    const buf = await composeSlide({
      kicker: '', headline: sc.text, body: sc.sub ? [sc.sub] : [], code: sc.code, note: sc.note,
      style: styleOf(sc.theme), topic: sc.topic, height: REEL_H, plain: plain || !!sc.code,
    });
    const f = path.join(work, `f${String(i).padStart(3, '0')}.png`);
    writeFileSync(f, buf);
    frames.push({ file: f, dur: durs[i] });
  }
  const listLines = [];
  for (const fr of frames) { listLines.push(`file '${abs(fr.file)}'`); listLines.push(`duration ${fr.dur.toFixed(2)}`); }
  listLines.push(`file '${abs(frames[frames.length - 1].file)}'`);
  const listPath = path.join(work, 'list.txt');
  writeFileSync(listPath, listLines.join('\n'), 'utf8');

  const audioInput = music ? ['-i', music] : ['-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100'];
  const audioFilter = music ? ['-af', `afade=t=in:st=0:d=1.2,afade=t=out:st=${Math.max(0, total - 1.5).toFixed(2)}:d=1.5,volume=0.85`] : [];
  execFileSync(ffmpegPath, [
    '-y', '-f', 'concat', '-safe', '0', '-i', listPath, ...audioInput,
    '-vf', 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p',
    ...audioFilter,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  rmSync(work, { recursive: true, force: true });
  return { type: 'REELS', files: [out], bg: 'slideshow' };
}

/** Compose a Reel = looping stock video bg + per-scene transparent text overlays. */
export function buildVideoReel({ scenes, durs, total, videoBuf, music, work, out }) {
  writeFileSync(path.join(work, 'bg.mp4'), videoBuf);
  const overlays = [];
  const windows = [];
  let t = 0;
  for (let i = 0; i < scenes.length; i++) {
    const sc = scenes[i];
    const buf = composeOverlay({ headline: sc.text, body: sc.sub ? [sc.sub] : [], code: sc.code, note: sc.note, style: styleOf(sc.theme), height: REEL_H });
    const f = path.join(work, `ov${i}.png`); writeFileSync(f, buf); overlays.push(f);
    windows.push([t, t + durs[i]]); t += durs[i];
  }
  const inputs = ['-stream_loop', '-1', '-i', abs(path.join(work, 'bg.mp4'))];
  overlays.forEach((f) => inputs.push('-i', abs(f)));
  if (music) inputs.push('-i', music);
  else inputs.push('-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100');
  const aIdx = overlays.length + 1;

  let fc = `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1[bg];`;
  let prev = 'bg';
  for (let i = 0; i < overlays.length; i++) {
    const [s, e] = windows[i];
    const lbl = i === overlays.length - 1 ? 'vout' : `v${i}`;
    const end = i === overlays.length - 1 ? e : e - 0.04; // avoid 1-frame double-overlay
    fc += `[${prev}][${i + 1}:v]overlay=0:0:enable='between(t,${s.toFixed(2)},${end.toFixed(2)})'[${lbl}];`;
    prev = lbl;
  }
  fc = fc.replace(/;$/, '');
  const audioMap = music
    ? ['-map', `${aIdx}:a`, '-af', `afade=t=in:st=0:d=1.2,afade=t=out:st=${Math.max(0, total - 1.5).toFixed(2)}:d=1.5,volume=0.85`]
    : ['-map', `${aIdx}:a`];

  execFileSync(ffmpegPath, [
    '-y', ...inputs,
    '-filter_complex', fc, '-map', '[vout]', ...audioMap,
    '-t', total.toFixed(2), '-r', '30',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-maxrate', '4M', '-bufsize', '8M', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
}

export async function generateMedia(post, dir, idx) {
  if (post.format === 'reel') return generateReel(post, dir, idx);
  if (post.format === 'carousel') return generateCarousel(post, dir, idx);
  return generateImage(post, dir, idx);
}

function pickMusic(seed = '') {
  try {
    if (!existsSync(MUSIC_DIR)) return null;
    // Calm tracks first so the rotation favours a calm vibe; deterministic per seed.
    const tracks = readdirSync(MUSIC_DIR)
      .filter((f) => /\.(mp3|m4a|aac|wav)$/i.test(f))
      .sort((a, b) => (a.startsWith('calm') ? 0 : 1) - (b.startsWith('calm') ? 0 : 1) || a.localeCompare(b));
    if (!tracks.length) return null;
    let n;
    if (typeof seed === 'number') {
      n = Math.abs(Math.floor(seed)) % tracks.length; // sequential → distinct per day
    } else {
      let h = 2166136261;
      for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
      n = (h >>> 0) % tracks.length;
    }
    return path.join(MUSIC_DIR, tracks[n]);
  } catch { return null; }
}
function slug(post) {
  const k = (post.keys && post.keys[0]) || 'post';
  return String(k).replace(/[^a-z0-9]+/gi, '-').slice(0, 40);
}
