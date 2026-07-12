/**
 * HistoryTimeline — a vertical, tap-to-expand timeline for History lessons.
 * Mobile-first: each event is a card on an alternating rail; tap to reveal the
 * full detail. Pure presentational, no API cost.
 */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { HistoryTimeline as TL } from '../data/timelines';

export default function HistoryTimeline({ timeline }: { timeline: TL }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="relative pl-6">
      {/* vertical rail */}
      <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-gradient-to-b from-primary via-emerald-300 to-primary" aria-hidden />
      <ol className="space-y-4">
        {timeline.events.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="relative">
              <span className="absolute -left-[22px] top-3 h-4 w-4 rounded-full border-2 border-white bg-primary shadow dark:border-slate-900" aria-hidden />
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-black text-primary">{e.year}</span>
                    <span className="font-black text-slate-900 dark:text-slate-100">{e.title}</span>
                  </div>
                  <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <p className="mt-3 leading-relaxed text-sm text-slate-600 dark:text-slate-300">{e.detail}</p>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
