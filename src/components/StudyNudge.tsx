/**
 * StudyNudge — a gentle, personal reminder built from the Study Room's local
 * memory. Two hooks, in priority order:
 *   1. Schedule-based: "You have N chapters due for revision today" (the daily
 *      spaced-repetition return hook — the strongest reason to come back).
 *   2. Weakness-based: "You're weak in X — revise it?".
 * Shows nothing if there's no data, so it's safe on the home page and dashboard.
 * Mounted-guarded so it renders client-only (localStorage) — no SSR/hydration flash.
 */
import { useEffect, useMemo, useState } from 'react';
import { Brain, X, ArrowRight, RotateCcw } from 'lucide-react';
import { weakChapters, recentChapters, masteryPct, dueForReview, type ChapterStat } from '../lib/studyPlan';

interface Props { onOpenStudyRoom: () => void; variant?: 'banner' | 'card'; }

export default function StudyNudge({ onOpenStudyRoom, variant = 'banner' }: Props) {
  const [dismissed, setDismissed] = useState(false);
  // Study memory lives in localStorage → render client-only to avoid an SSR
  // hydration mismatch on the (server-rendered) home page.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const todayISO = useMemo(() => new Date().toISOString().split('T')[0], []);
  const due = useMemo<ChapterStat[]>(() => (mounted ? dueForReview(todayISO, 5) : []), [mounted, todayISO]);
  const weak = useMemo<ChapterStat[]>(() => (mounted ? weakChapters(3) : []), [mounted]);
  const recent = useMemo<ChapterStat[]>(() => (mounted ? recentChapters(5) : []), [mounted]);

  if (!mounted || dismissed) return null;

  if (variant === 'banner') {
    // 1) Highest-priority: chapters scheduled for revision today (daily return hook).
    if (due.length) {
      return (
        <div className="relative mx-auto mb-4 flex max-w-5xl items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
          <RotateCcw size={18} className="shrink-0 text-emerald-600" />
          <p className="flex-1 font-medium text-emerald-900">
            You have <strong>{due.length} chapter{due.length > 1 ? 's' : ''} due for revision today</strong> — a 2-minute review now locks it into memory before you forget.
          </p>
          <button onClick={onOpenStudyRoom} className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-600">Revise now <ArrowRight size={13} /></button>
          <button onClick={() => setDismissed(true)} className="shrink-0 text-emerald-400 hover:text-emerald-700"><X size={16} /></button>
        </div>
      );
    }
    // 2) Fallback: chapters the student has been finding tricky.
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

  // Card variant (dashboard) — shows due, weak and recent.
  if (!due.length && !recent.length && !weak.length) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-black text-slate-900"><Brain size={16} className="text-emerald-600" /> Study Room memory</h3>
        <button onClick={onOpenStudyRoom} className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-600">Study now <ArrowRight size={13} /></button>
      </div>
      {due.length ? (
        <div className="mb-3">
          <p className="mb-1.5 flex items-center gap-1 text-[11px] font-black uppercase tracking-wide text-emerald-600"><RotateCcw size={12} /> Due for revision today</p>
          <ul className="space-y-1">
            {due.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-1.5 text-sm">
                <span className="truncate font-bold text-slate-700">{c.title}</span>
                <span className="shrink-0 text-xs font-black text-emerald-600">{masteryPct(c)}%</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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
          <p className="mb-1.5 text-[11px] font-black uppercase tracking-wide text-slate-500">Recently studied</p>
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
