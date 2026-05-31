/**
 * DeckViewer — renders a provided slide deck (PDF) full-screen, page by page,
 * with arrow-key / button navigation and per-page read-aloud (Web Speech).
 * Pixel-perfect: shows the exact designed slides (e.g. the Gemini decks).
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// pdf.js worker (Vite resolves the URL at build time)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface Props {
  url: string;
  title: string;
  onClose: () => void;
  onPractice: () => void;
}

export default function DeckViewer({ url, title, onClose, onPractice }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const docRef = useRef<any>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const renderTaskRef = useRef<any>(null);

  // Load the document once
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(null);
    pdfjsLib.getDocument(url).promise
      .then(doc => {
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setPage(1);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) { setError('Could not load this lesson deck.'); setLoading(false); } });
    return () => { cancelled = true; if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, [url]);

  // Render the current page to the canvas
  useEffect(() => {
    const doc = docRef.current;
    if (!doc || loading) return;
    let cancelled = false;
    (async () => {
      try {
        const pg = await doc.getPage(page);
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        // Fit width to container, cap by device pixel ratio for crispness
        const container = canvas.parentElement!;
        const baseViewport = pg.getViewport({ scale: 1 });
        const scale = Math.min(
          (container.clientWidth) / baseViewport.width,
          (container.clientHeight) / baseViewport.height,
        ) * Math.min(window.devicePixelRatio || 1, 2);
        const viewport = pg.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / Math.min(window.devicePixelRatio || 1, 2)}px`;
        canvas.style.height = `${viewport.height / Math.min(window.devicePixelRatio || 1, 2)}px`;
        if (renderTaskRef.current) renderTaskRef.current.cancel();
        renderTaskRef.current = pg.render({ canvasContext: ctx, viewport });
        await renderTaskRef.current.promise;
      } catch { /* render cancelled / page change */ }
    })();
    return () => { cancelled = true; };
  }, [page, loading]);

  const stopSpeak = () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); setSpeaking(false); };

  const go = (d: number) => {
    stopSpeak();
    setPage(p => Math.max(1, Math.min(numPages, p + d)));
  };

  const readAloud = async () => {
    if (speaking) { stopSpeak(); return; }
    const doc = docRef.current;
    if (!doc || !('speechSynthesis' in window)) return;
    try {
      const pg = await doc.getPage(page);
      const content = await pg.getTextContent();
      const text = content.items.map((it: any) => it.str).join(' ').replace(/\s+/g, ' ').trim();
      if (!text) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-IN'; u.rate = 0.92;
      u.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    } catch { /* no text layer */ }
  };

  // Keyboard navigation
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Escape') { stopSpeak(); onClose(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [numPages]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 shrink-0">
        <p className="truncate text-sm font-black text-white/90">{title}</p>
        <div className="flex items-center gap-2">
          <button onClick={readAloud} title="Read this page aloud"
            className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
            {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button onClick={() => { stopSpeak(); onClose(); }}
            className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Page */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-2 sm:p-4">
        {loading && <div className="flex flex-col items-center gap-3 text-white/80"><Loader2 className="animate-spin" size={32} /><span className="text-sm font-bold">Loading lesson…</span></div>}
        {error && <div className="text-center text-rose-300 font-bold">{error}</div>}
        {!loading && !error && <canvas ref={canvasRef} className="rounded-lg shadow-2xl bg-white max-h-full" />}
      </div>

      {/* Footer nav */}
      {!loading && !error && (
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 shrink-0">
          <button onClick={() => go(-1)} disabled={page <= 1}
            className="flex items-center gap-1 rounded-2xl bg-white/10 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white disabled:opacity-30 hover:bg-white/20 transition">
            <ChevronLeft size={14} /> Back
          </button>
          <span className="text-xs font-black text-white/60">{page} / {numPages}</span>
          {page >= numPages ? (
            <button onClick={() => { stopSpeak(); onPractice(); }}
              className="flex items-center gap-1 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-slate-800 hover:scale-105 transition">
              Practice 🎯
            </button>
          ) : (
            <button onClick={() => go(1)}
              className="flex items-center gap-1 rounded-2xl bg-white/10 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-white/20 transition">
              Next <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
