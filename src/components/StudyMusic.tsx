/**
 * StudyMusic — calm study music for the Study Room. Two ways, both ad-free for us
 * and copyright-safe (we embed, we don't host):
 *   • Paste any YouTube link → we play the AUDIO only (the video stays hidden).
 *   • Tap a curated calm/lo-fi study mix.
 * Uses the privacy-friendly youtube-nocookie embed. Device volume controls level.
 */
import { useState } from 'react';
import { Music, Play, Square, Youtube } from 'lucide-react';

interface Preset { label: string; id: string; emoji: string; }
// Long, well-known, continuously-available study streams/mixes.
const PRESETS: Preset[] = [
  { label: 'Lo-Fi Beats', id: 'jfKfPfyJRdk', emoji: '🎧' },   // lofi hip hop radio
  { label: 'Calm Piano', id: '4oStw0r33so', emoji: '🎹' },
  { label: 'Deep Focus', id: 'lTRiuFIWV54', emoji: '🧠' },
  { label: 'Nature + Rain', id: 'mPZkdNFkNps', emoji: '🌧️' },
];

/** Pull a YouTube video id out of any common YouTube URL form. */
export function extractYouTubeId(input: string): string | null {
  const s = (input || '').trim();
  if (!s) return null;
  if (/^[\w-]{11}$/.test(s)) return s; // already an id
  const patterns = [
    /[?&]v=([\w-]{11})/, /youtu\.be\/([\w-]{11})/, /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/live\/([\w-]{11})/, /youtube\.com\/shorts\/([\w-]{11})/,
  ];
  for (const p of patterns) { const m = s.match(p); if (m) return m[1]; }
  return null;
}

export default function StudyMusic() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');

  const playUrl = () => {
    const id = extractYouTubeId(url);
    if (!id) { setError('Paste a valid YouTube link (e.g. https://youtu.be/…).'); return; }
    setError(''); setVideoId(id); setLabel('Your music');
  };
  const playPreset = (p: Preset) => { setError(''); setVideoId(p.id); setLabel(`${p.emoji} ${p.label}`); };
  const stop = () => { setVideoId(null); setLabel(''); };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50">
        <Music size={13} /> Calm study music
      </div>

      {/* Curated presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => playPreset(p)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${videoId === p.id ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
          >{p.emoji} {p.label}</button>
        ))}
      </div>

      {/* Paste-a-link bar */}
      <div className="mt-3 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3">
          <Youtube size={15} className="shrink-0 text-red-400" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') playUrl(); }}
            placeholder="Paste a YouTube music link…"
            className="w-full bg-transparent py-2 text-sm text-white placeholder-white/40 outline-none"
          />
        </div>
        <button onClick={playUrl} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-black text-white hover:bg-emerald-400"><Play size={13} /> Play</button>
      </div>
      {error ? <p className="mt-1.5 text-[11px] font-bold text-amber-300">{error}</p> : null}

      {/* Now playing (audio only — the player is visually hidden) */}
      {videoId ? (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-200">
          <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Playing: {label}</span>
          <button onClick={stop} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 hover:bg-white/20"><Square size={11} /> Stop</button>
        </div>
      ) : null}

      {/* Hidden audio-only player. 1×1 so only the sound plays. */}
      {videoId ? (
        <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
          <iframe
            key={videoId}
            title="study-music"
            width="1" height="1"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1`}
            allow="autoplay"
          />
        </div>
      ) : null}
    </div>
  );
}
