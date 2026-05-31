/**
 * HtmlDeckViewer — shows a self-contained generated HTML slide deck full-screen
 * in an iframe (the deck has its own nav + arrow keys), with a header that
 * provides Close and a Practice hand-off.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  url: string;
  title: string;
  onClose: () => void;
  onPractice: () => void;
}

export default function HtmlDeckViewer({ url, title, onClose, onPractice }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col bg-slate-900"
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 shrink-0">
        <p className="truncate text-sm font-black text-white/90">{title}</p>
        <div className="flex items-center gap-2">
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
      <iframe
        src={url}
        title={title}
        className="flex-1 w-full border-0 bg-white"
        // deck is our own static HTML; allow its inline script for navigation
        sandbox="allow-scripts allow-same-origin"
      />
    </motion.div>
  );
}
