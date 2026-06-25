/**
 * StudyNudge — a gentle, personal reminder built from the Study Room's local
 * memory: "You're weak in X — revise it?". Shows nothing if there's no data, so
 * it's safe to drop on the home page and dashboard. Dismissible per session.
 */
import { useMemo, useState } from 'react';
import { Brain, X, ArrowRight } from 'lucide-react';
import { weakChapters, recentChapters, masteryPct, type ChapterStat } from '../lib/studyPlan';

interface Props { onOpenStudyRoom: () => void; variant?: 'banner' | 'card'; }

export default function StudyNudge({ onOpenStudyRoom, variant = 'banner' }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const weak = useMemo<ChapterStat[]>(() => weakChapters(3), []);
  const recent = useMemo<ChapterStat[]>(() => recentChapters(5), []);

  if (dismissed) return null;
  if (variant === 'banner') {
    if (!weak.length) return null;
    const names = weak.map((c) => c.title).slice(0, 2).join(', ');
    return (
      <div className="relative mx-auto mb-4 flex max-w-5xl items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
        <Brain size={18} className="shrink-0 text-amber-600" />
        <p className="flex-1 font-medium text-amber-900">
          You&apos;ve been finding <strong>{names}</strong>{weak.length > 2 ? ` and ${weak.length - 2} more` : ''} tricky. Want to revise with quick flashcards?
        </p>
        <button onClick={onOpenStudyRoom} className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-black text-white hover:bg-amber-600">Revise <ArrowRight size={13} /></button>
        <button onClick={() => setDismissed(true)} className="shrink-0 text-amber-400 hover:text-amber-700"><X size={16} /></button>
      </div>
    );
  }

  // Card variant (dashboard) — shows progress even when nothing is weak yet.
  if (!recent.length && !weak.length) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-black text-slate-900"><Brain size={16} className="text-emerald-600" /> Study Room memory</h3>
        <button onClick={onOpenStudyRoom} className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-600">Study now <ArrowRight size={13} /></button>
      </div>
      {weak.length ? (
        <div className="mb-3">
          <p className="mb-1.5 text-[11px] font-black uppercase tracking-wide text-rose-500">Needs revision</p>
          <ul className="space-y-1">
            {weak.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-lg bg-rose-50 px-3 py-1.5 text-sm">
                <span className="truncate font-bold text-slate-700">{c.title}</span>
                <span className="shrink-0 text-xs font-black text-rose-500">{masteryPct(c)}%</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {recent.length ? (
        <div>
          <p className="mb-1.5 text-[11px] font-black uppercase tracking-wide text-slate-400">Recently studied</p>
          <ul className="space-y-1">
            {recent.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-sm">
                <span className="truncate font-bold text-slate-700">{c.completed ? '✅ ' : ''}{c.title}</span>
                <span className="shrink-0 text-xs font-bold text-slate-400">{c.total > 0 ? `${masteryPct(c)}%` : 'studied'}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
