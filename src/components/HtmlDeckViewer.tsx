/**
 * HtmlDeckViewer — shows a self-contained generated HTML slide deck full-screen
 * in an iframe (the deck has its own nav + arrow keys), with a header that
 * provides Download PDF, Practice hand-off and Close.
 *
 * IMPORTANT — why we fetch + validate + use srcDoc instead of `src={url}`:
 * A dev/prod SPA fallback serves index.html for any unknown path. If a deck
 * file is missing (e.g. mid-regeneration), `src="/generated-decks/…/X.html"`
 * would load the WHOLE app recursively inside the iframe (blank deck + flicker).
 * So we fetch the URL, confirm it is a real deck (contains a slide marker), and
 * render the validated HTML via `srcDoc`. A missing/invalid deck never loads the
 * app — we fall back to the AI lesson (onMissing) or show a friendly message.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Loader2 } from 'lucide-react';

interface Props {
  url: string;
  title: string;
  onClose: () => void;
  onPractice: () => void;
  /** Called when the deck file is missing/invalid so the caller can open the AI lesson instead. */
  onMissing?: () => void;
}

type Status = 'loading' | 'ready' | 'missing';

// A real generated deck always contains slide sections. The SPA index.html never does.
const DECK_MARKER = 'class="slide"';

export default function HtmlDeckViewer({ url, title, onClose, onPractice, onMissing }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setHtml('');
    (async () => {
      try {
        const res = await fetch(url, { headers: { Accept: 'text/html' } });
        const text = res.ok ? await res.text() : '';
        if (cancelled) return;
        if (res.ok && text.includes(DECK_MARKER)) {
          setHtml(text);
          setStatus('ready');
        } else {
          setStatus('missing');
        }
      } catch {
        if (!cancelled) setStatus('missing');
      }
    })();
    return () => { cancelled = true; };
  }, [url]);

  // If the deck is genuinely missing, hand back to the AI lesson automatically.
  useEffect(() => {
    if (status === 'missing' && onMissing) {
      const t = setTimeout(() => onMissing(), 1200);
      return () => clearTimeout(t);
    }
  }, [status, onMissing]);

  const handleDownload = () => {
    try {
      const win = iframeRef.current?.contentWindow;
      if (win) { win.focus(); win.print(); }
    } catch { /* sandbox guard */ }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col bg-slate-900"
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 shrink-0">
        <p className="truncate text-sm font-black text-white/90">{title}</p>
        <div className="flex items-center gap-2">
          {status === 'ready' && (
            <button onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white hover:scale-105 transition">
              <Download size={14} /> PDF
            </button>
          )}
          <button onClick={onPractice}
            className="rounded-xl bg-white px-4 py-2 text-xs font-black text-slate-800 hover:scale-105 transition">
            Practice 🎯
          </button>
          <button onClick={onClose}
            className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {status === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-slate-900 text-white/70">
          <Loader2 className="animate-spin" size={28} />
          <p className="text-xs font-bold uppercase tracking-widest">Loading lesson…</p>
        </div>
      )}

      {status === 'missing' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center text-white/80">
          <div className="text-4xl">🛠️</div>
          <p className="text-sm font-black">This slide lesson is being prepared.</p>
          <p className="max-w-sm text-xs text-white/60">
            {onMissing ? 'Opening the AI tutor lesson for this chapter instead…' : 'Please try again in a little while.'}
          </p>
          <button onClick={onClose} className="mt-2 rounded-xl bg-white/10 px-5 py-2 text-xs font-black text-white hover:bg-white/20 transition">Close</button>
        </div>
      )}

      {status === 'ready' && (
        <iframe
          ref={iframeRef}
          srcDoc={html}
          title={title}
          className="flex-1 w-full border-0 bg-white"
          // self-contained deck HTML; allow its inline nav script + print dialog.
          sandbox="allow-scripts allow-same-origin allow-modals"
        />
      )}
    </motion.div>
  );
}
