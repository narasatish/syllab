/**
 * MasteryProgress — Khan-style mastery display.
 *
 * Shows a three-tier breakdown (Familiar · Proficient · Mastered) with:
 * - Summary counts and simple bars (mobile-first)
 * - Per-chapter badges showing mastery level
 * - Color-coded by level (gray → gold → emerald)
 */

import React, { useMemo } from 'react';
import { Award, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { getMasteryCounts, getStats, MasteryLevel } from '../lib/mastery';
import { SYLLABUS } from '../data/syllabus';

interface MasteryProgressProps {
  showChapterBadges?: boolean;
  className?: string;
}

const LEVEL_CONFIG: Record<MasteryLevel, { label: string; color: string; bgColor: string; icon: string; emoji: string }> = {
  unfamiliar: {
    label: 'Unfamiliar',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    icon: '◯',
    emoji: '🔲',
  },
  familiar: {
    label: 'Familiar',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    icon: '◐',
    emoji: '🟨',
  },
  proficient: {
    label: 'Proficient',
    color: 'text-sky-600',
    bgColor: 'bg-sky-100',
    icon: '◑',
    emoji: '🟦',
  },
  mastered: {
    label: 'Mastered',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    icon: '●',
    emoji: '✅',
  },
};

export default function MasteryProgress({ showChapterBadges = true, className = '' }: MasteryProgressProps) {
  const counts = useMemo(() => getMasteryCounts(), []);
  const total = counts.familiar + counts.proficient + counts.mastered;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Summary cards with three-tier breakdown */}
      <div className="space-y-3">
        <div className="text-sm font-black uppercase tracking-widest text-slate-400">Mastery Overview</div>

        {/* Summary text (mobile-first) */}
        <div className="flex flex-wrap gap-3 text-xs font-bold">
          {counts.familiar > 0 && (
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
              <span>{counts.familiar}</span>
              <span className="text-amber-500">◐</span>
              <span>Familiar</span>
            </div>
          )}
          {counts.proficient > 0 && (
            <div className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1.5 text-sky-700">
              <span>{counts.proficient}</span>
              <span className="text-sky-500">◑</span>
              <span>Proficient</span>
            </div>
          )}
          {counts.mastered > 0 && (
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
              <span>{counts.mastered}</span>
              <span className="text-emerald-500">●</span>
              <span>Mastered</span>
            </div>
          )}
          {total === 0 && (
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 text-slate-600 text-[11px]">
              Start practicing to build mastery
            </div>
          )}
        </div>

        {/* Simple bar chart (if total > 0) */}
        {total > 0 && (
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full flex overflow-hidden rounded-full">
              {counts.familiar > 0 && (
                <div className="bg-amber-400" style={{ width: `${(counts.familiar / total) * 100}%` }} />
              )}
              {counts.proficient > 0 && (
                <div className="bg-sky-400" style={{ width: `${(counts.proficient / total) * 100}%` }} />
              )}
              {counts.mastered > 0 && (
                <div className="bg-emerald-500" style={{ width: `${(counts.mastered / total) * 100}%` }} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Per-chapter badges (if requested and chapters available) */}
      {showChapterBadges && total > 0 && (
        <ChapterMasteryBadges />
      )}
    </div>
  );
}

/** Display mastery badges for each chapter that has progress. */
function ChapterMasteryBadges() {
  const chapters = useMemo(() => {
    const stats = new Map<string, ReturnType<typeof getStats>>();

    // Collect all chapters with any mastery progress
    for (const chapter of SYLLABUS) {
      const s = getStats(chapter.id);
      if (s.attempts > 0) {
        stats.set(chapter.id, s);
      }
    }

    return Array.from(stats.entries())
      .sort(([, a], [, b]) => {
        // Sort by level (mastered first) then by accuracy
        const levelOrder = { mastered: 0, proficient: 1, familiar: 2, unfamiliar: 3 };
        if (levelOrder[a.level] !== levelOrder[b.level]) {
          return levelOrder[a.level] - levelOrder[b.level];
        }
        return b.accuracy - a.accuracy;
      });
  }, []);

  if (chapters.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="text-xs font-black uppercase tracking-widest text-slate-400">Chapters</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {chapters.slice(0, 12).map(([chapterId, stats]) => {
          const chapter = SYLLABUS.find(c => c.id === chapterId);
          const config = LEVEL_CONFIG[stats.level];

          return (
            <div
              key={chapterId}
              className={cn(
                'rounded-2xl p-3 text-center text-xs transition-all hover:shadow-md',
                stats.level === 'mastered' ? 'bg-emerald-50 border border-emerald-200'
                  : stats.level === 'proficient' ? 'bg-sky-50 border border-sky-200'
                  : stats.level === 'familiar' ? 'bg-amber-50 border border-amber-200'
                  : 'bg-slate-50 border border-slate-200'
              )}
              title={`${chapter?.title || chapterId}: ${stats.accuracy}% accuracy`}
            >
              <div className={cn('text-lg font-black mb-1', config.color)}>
                {config.emoji}
              </div>
              <div className="font-bold text-slate-700 leading-tight line-clamp-2">
                {chapter?.title || chapterId}
              </div>
              <div className={cn('text-[10px] font-semibold mt-1', config.color)}>
                {stats.accuracy}%
              </div>
            </div>
          );
        })}
      </div>

      {chapters.length > 12 && (
        <div className="text-center text-xs text-slate-400">
          +{chapters.length - 12} more chapters
        </div>
      )}
    </div>
  );
}
