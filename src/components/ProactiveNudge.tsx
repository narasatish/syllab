/**
 * ProactiveNudge.tsx — Proactive AI tutoring nudge.
 *
 * Surfaces the student's weakest topic (lowest mastery level) and encourages
 * practice or AI tutor engagement. Driven by mastery data + mistake records.
 * Dismissible per day (localStorage flag).
 */

import React, { useEffect, useState } from 'react';
import { getAllStats, getStats, MasteryLevel } from '../lib/mastery';
import { SYLLABUS } from '../data/syllabus';
import { Lightbulb, X, ArrowRight } from 'lucide-react';

interface ProactiveNudgeProps {
  mistakes: Array<{ chapterId?: string }>;
  setTab: (tab: string) => void;
}

interface WeakArea {
  chapterId: string;
  chapterTitle: string;
  masteryLevel: MasteryLevel;
  mistakeCount: number;
}

const NUDGE_DISMISSED_KEY = 'syllab:nudge:dismissed:v1';

function getDismissalFlag(chapterId: string): string {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return `${NUDGE_DISMISSED_KEY}:${chapterId}:${today}`;
}

function isNudgeDismissed(chapterId: string): boolean {
  try {
    return localStorage.getItem(getDismissalFlag(chapterId)) === 'true';
  } catch {
    return false;
  }
}

function dismissNudge(chapterId: string): void {
  try {
    localStorage.setItem(getDismissalFlag(chapterId), 'true');
  } catch {
    // Ignore localStorage errors
  }
}

function findWeakestArea(mistakes: Array<{ chapterId?: string }>): WeakArea | null {
  // Get all mastery stats grouped by level
  const allStats = getAllStats();

  // Prioritize "familiar" (needs work), then "proficient" (can improve)
  const weakCandidates = [...allStats.familiar, ...allStats.proficient];

  if (weakCandidates.length === 0) {
    return null;
  }

  // Build mistake count per chapter
  const mistakeCounts: Record<string, number> = {};
  mistakes.forEach((m) => {
    const key = m.chapterId || 'general';
    mistakeCounts[key] = (mistakeCounts[key] || 0) + 1;
  });

  // Find the weakest: prefer those with both low mastery AND high mistakes
  const scored = weakCandidates.map((chapterId) => {
    const stats = getStats(chapterId);
    const mistakeCount = mistakeCounts[chapterId] || 0;

    // Score: low accuracy + high mistakes = high priority.
    // Guard against NaN/corrupted localStorage so sort() stays well-defined.
    const acc = Number.isFinite(stats.recentAccuracy) ? stats.recentAccuracy : 0;
    const score = (1 - acc / 100) + (mistakeCount / 10);

    return {
      chapterId,
      score,
      masteryLevel: stats.level,
      mistakeCount,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  const weakest = scored[0];

  // Find chapter title
  const chapter = SYLLABUS.find((c) => c.id === weakest.chapterId);
  const chapterTitle = chapter?.title || weakest.chapterId;

  return {
    chapterId: weakest.chapterId,
    chapterTitle,
    masteryLevel: weakest.masteryLevel,
    mistakeCount: weakest.mistakeCount,
  };
}

function getLevelLabel(level: MasteryLevel): string {
  const labels: Record<MasteryLevel, string> = {
    unfamiliar: 'Never attempted',
    familiar: 'Just getting started',
    proficient: 'Building strength',
    mastered: 'Expert level',
  };
  return labels[level];
}

export default function ProactiveNudge({ mistakes, setTab }: ProactiveNudgeProps) {
  const [weakArea, setWeakArea] = useState<WeakArea | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Check if user has any mastery data
    const allStats = getAllStats();
    const totalData = allStats.familiar.length + allStats.proficient.length + allStats.mastered.length;

    setHasData(totalData > 0);

    if (totalData === 0) {
      // New user — show encouragement variant, not a nudge
      setIsVisible(true);
      return;
    }

    // Find weakest area
    const weak = findWeakestArea(mistakes);

    if (weak && !isNudgeDismissed(weak.chapterId)) {
      setWeakArea(weak);
      setIsVisible(true);
    }
  }, [mistakes]);

  const handleDismiss = () => {
    if (weakArea) {
      dismissNudge(weakArea.chapterId);
    }
    setIsVisible(false);
  };

  const handlePractice = () => {
    if (weakArea) {
      // Navigate to practice with weak chapter pre-selected
      // The Arena/Practice component can read this from context or URL param
      setTab('arena');
      // Optional: you could emit a custom event or use a context to pre-select the chapter
    }
  };

  const handleAITutor = () => {
    setTab('ai-tutor');
  };

  if (!isVisible) {
    return null;
  }

  // New user variant
  if (!hasData) {
    return (
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <Lightbulb className="text-blue-500 flex-shrink-0 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 mb-1">
              Ready to learn?
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Start practicing questions to unlock personalized tutoring tips and see your progress soar.
            </p>
            <button
              onClick={handlePractice}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition"
            >
              Start First Practice
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Existing user with weak area
  if (!weakArea) {
    return null;
  }

  return (
    <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 mb-1">
              Let's fix a weak spot 📊
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              You're at <span className="font-semibold">{getLevelLabel(weakArea.masteryLevel)}</span> in{' '}
              <span className="font-semibold">{weakArea.chapterTitle}</span>.{' '}
              {weakArea.mistakeCount > 0 && (
                <span>You've had {weakArea.mistakeCount} mistake{weakArea.mistakeCount !== 1 ? 's' : ''} here.</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handlePractice}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-lg font-medium text-xs hover:bg-amber-700 transition"
              >
                Practice Now
                <ArrowRight size={14} />
              </button>
              <button
                onClick={handleAITutor}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-300 text-amber-900 rounded-lg font-medium text-xs hover:bg-amber-50 transition"
              >
                Ask AI Tutor
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-600 flex-shrink-0 transition"
          aria-label="Dismiss"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
