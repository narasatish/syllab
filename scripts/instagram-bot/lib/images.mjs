/**
 * images.mjs — real photo backgrounds from Pexels (free). Ported from the
 * info-unlocked engine. Returns a Buffer for poster.js to composite text over.
 *
 * Needs a free PEXELS_API_KEY (https://www.pexels.com/api/). Without it, getImage
 * returns null and the renderer uses a premium gradient instead (still on-brand).
 * No paid AI calls — budget-safe.
 */
// Read at call time so a .env loaded after import still applies.
const pexelsKey = () => (process.env.PEXELS_API_KEY || '').trim();

const STOP = new Set(('a an the and or but of to in on at for with from by is are was were be been being this that these those your you our their his her its it they we i as so if then than over under more most can could will would should may might do does did has have had not no yes about into out up down off again why how what when where who which whom whose').split(' '));

function singular(w) {
  if (/(ss|us|is|as|os)$/.test(w)) return w;
  if (/ies$/.test(w)) return w.replace(/ies$/, 'y');
  if (/ses$/.test(w)) return w.replace(/ses$/, 's');
  if (/s$/.test(w)) return w.replace(/s$/, '');
  return w;
}

const TOPIC_TERMS = {
  history: 'ancient monument india', geography: 'mountains landscape earth',
  polity: 'indian parliament flag', static: 'library books knowledge',
  'current-affairs': 'newspaper india', science: 'science laboratory',
  india: 'india culture', maths: 'mathematics geometry', mathematics: 'mathematics geometry',
  physics: 'physics galaxy', chemistry: 'chemistry lab', biology: 'biology nature cells',
  'social science': 'india heritage', english: 'books reading library',
  general: 'study desk books', exam: 'student studying exam',
};

export function topicTerm(topic) {
  const t = String(topic || '').toLowerCase();
  for (const k of Object.keys(TOPIC_TERMS)) if (t.includes(k)) return TOPIC_TERMS[k];
  return 'study desk books';
}

export function queryFromText(text, fallbackTopic) {
  const words = String(text || '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP.has(w) && !/^\d+$/.test(w));
  const pick = words.slice(0, 2).map(singular);
  return (pick[0] || '').trim() || topicTerm(fallbackTopic) || 'colorful abstract background';
}

async function rfetchJson(url, headers) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers });
      if (!r.ok) return null;
      return await r.json();
    } catch { await new Promise((res) => setTimeout(res, 400 * (i + 1))); }
  }
  return null;
}

async function pexelsPhoto(query, offset = 0) {
  const PEXELS_KEY = pexelsKey(); if (!PEXELS_KEY || !query) return null;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=portrait&size=medium&per_page=15`;
  const j = await rfetchJson(url, { Authorization: pexelsKey() });
  const photos = (j && j.photos) || [];
  if (!photos.length) return null;
  const p = photos[(new Date().getUTCHours() + offset) % photos.length];
  const src = p.src?.portrait || p.src?.large2x || p.src?.large || p.src?.original;
  if (!src) return null;
  try {
    const r = await fetch(src);
    if (!r.ok) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    return buf.length > 5000 ? buf : null;
  } catch { return null; }
}

/**
 * Fetch a free Pexels stock VIDEO clip (portrait) for motion behind a Reel.
 * Returns { buffer, duration } or null. Picks a light ~540–720px file.
 */
export async function getVideo(text, topic) {
  if (!pexelsKey()) return null;
  const queries = [queryFromText(text, topic), topicTerm(topic), 'abstract motion background', 'study'];
  const tried = new Set();
  for (const q of queries) {
    if (!q || tried.has(q.toLowerCase())) continue;
    tried.add(q.toLowerCase());
    try {
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&orientation=portrait&size=medium&per_page=15`;
      const j = await rfetchJson(url, { Authorization: pexelsKey() });
      const vids = (j && j.videos || []).filter((v) => v.video_files && v.video_files.length);
      if (!vids.length) continue;
      const v = vids[new Date().getUTCHours() % vids.length];
      const files = v.video_files.filter((f) => f.link && f.width).sort((a, b) => a.width - b.width);
      const pick = files.find((f) => f.width >= 540 && f.width <= 720) || files.find((f) => f.width <= 1080) || files[0];
      if (!pick) continue;
      const r = await fetch(pick.link);
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length > 10000) return { buffer: buf, duration: v.duration || 15 };
    } catch { /* try next query */ }
  }
  return null;
}

/** Best photo buffer for a piece of text. Returns Buffer or null (→ gradient). */
export async function getImage(text, topic, opts = {}) {
  if (!pexelsKey()) return null;
  const cascade = [opts.query, queryFromText(text, topic), topicTerm(topic), 'colorful abstract background'];
  const tried = new Set();
  let i = 0;
  for (const q of cascade) {
    if (!q || tried.has(q.toLowerCase())) { i++; continue; }
    tried.add(q.toLowerCase());
    const buf = await pexelsPhoto(q, i);
    if (buf) return buf;
    i++;
  }
  return null;
}
