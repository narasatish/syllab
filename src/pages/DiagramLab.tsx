/**
 * Diagram Lab — Science diagrams with images, key parts, and explanations.
 * Supports filtering by both Subject and Class (6–12).
 */
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  filterDiagrams,
  type Diagram,
  type DiagramSubject,
  type DiagramClass,
} from '../data/diagramLab';
import { cn } from '../lib/utils';

const SUBJECT_TABS: { id: DiagramSubject; label: string; icon: string; color: string }[] = [
  { id: 'all',       label: 'All',       icon: '🔬', color: 'bg-slate-600' },
  { id: 'biology',   label: 'Biology',   icon: '🧬', color: 'bg-emerald-600' },
  { id: 'physics',   label: 'Physics',   icon: '⚡', color: 'bg-amber-600' },
  { id: 'chemistry', label: 'Chemistry', icon: '🧪', color: 'bg-violet-600' },
];

const CLASS_TABS: { id: DiagramClass; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 6,  label: 'Class 6' },
  { id: 7,  label: 'Class 7' },
  { id: 8,  label: 'Class 8' },
  { id: 9,  label: 'Class 9' },
  { id: 10, label: 'Class 10' },
  { id: 11, label: 'Class 11' },
  { id: 12, label: 'Class 12' },
];

const SUBJECT_COLORS: Record<Diagram['subject'], { card: string; badge: string; text: string }> = {
  biology:   { card: 'border-emerald-200 bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-700' },
  physics:   { card: 'border-amber-200 bg-amber-50',     badge: 'bg-amber-100 text-amber-700',     text: 'text-amber-700' },
  chemistry: { card: 'border-violet-200 bg-violet-50',   badge: 'bg-violet-100 text-violet-700',   text: 'text-violet-700' },
};

export default function DiagramLab() {
  const [activeSubject, setActiveSubject] = useState<DiagramSubject>('all');
  const [activeClass,   setActiveClass]   = useState<DiagramClass>('all');
  const [selected,      setSelected]      = useState<Diagram | null>(null);
  const [imgErrors,     setImgErrors]     = useState<Set<string>>(new Set());

  const allDiagrams = filterDiagrams(activeSubject, activeClass);
  // Show all diagrams — broken image URLs fall back to the emoji defined on each diagram
  const diagrams = allDiagrams;

  if (selected) {
    return <DiagramDetail diagram={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <section className="space-y-4">
      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        {SUBJECT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubject(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all text-white',
              activeSubject === tab.id ? `${tab.color} shadow-lg` : 'bg-slate-200 !text-slate-600 hover:bg-slate-300',
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Class filter */}
      <div className="flex flex-wrap gap-1.5">
        {CLASS_TABS.map((tab) => (
          <button
            key={String(tab.id)}
            type="button"
            onClick={() => setActiveClass(tab.id)}
            className={cn(
              'rounded-xl px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest transition-all',
              activeClass === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
        {diagrams.length} diagram{diagrams.length !== 1 ? 's' : ''} found
      </p>

      {diagrams.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 py-16 text-center">
          <p className="text-5xl mb-3">🔬</p>
          <p className="text-sm font-bold text-slate-400">No diagrams for this filter combination yet.</p>
          <p className="text-xs text-slate-300 mt-1">Try a different class or subject.</p>
        </div>
      ) : (
        /* Grid */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diagrams.map((diagram) => {
            const colors = SUBJECT_COLORS[diagram.subject];
            const imgFailed = imgErrors.has(diagram.id);
            return (
              <button
                key={diagram.id}
                type="button"
                onClick={() => setSelected(diagram)}
                className={cn(
                  'group rounded-2xl border-2 bg-white shadow overflow-hidden text-left transition-all hover:-translate-y-1 hover:shadow-xl',
                  colors.card,
                )}
              >
                {/* Image — falls back to a beautiful gradient + emoji illustration */}
                <div className={cn('relative h-44 overflow-hidden bg-gradient-to-br', diagram.fallbackGradient)}>
                  {!imgFailed && diagram.imageUrl ? (
                    <img
                      src={diagram.imageUrl}
                      alt={diagram.name}
                      onError={() => setImgErrors((prev) => new Set([...prev, diagram.id]))}
                      className="absolute inset-0 h-full w-full object-contain p-2 transition-transform group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-transform group-hover:scale-105">
                      <span className="text-7xl drop-shadow-md" aria-hidden="true">{diagram.emoji}</span>
                      <p className="px-3 text-center text-[11px] font-black text-slate-700 uppercase tracking-widest line-clamp-1">
                        {diagram.name}
                      </p>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-black uppercase tracking-widest', colors.badge)}>
                          {diagram.subject}
                        </span>
                        <span className="rounded-full px-2 py-0.5 text-[11px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-700">
                          Class {diagram.classNumber}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-base font-black text-slate-800 leading-tight">{diagram.name}</h3>
                    </div>
                    <span className="text-slate-300 group-hover:text-slate-500 transition-colors mt-1">
                      <ChevronRight size={18} />
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed">{diagram.summary}</p>
                  <p className={cn('mt-2 text-[11px] font-black', colors.text)}>{diagram.parts.length} labelled parts →</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ─── Detail view ──────────────────────────────────────────────────────── */
function DiagramDetail({ diagram, onBack }: { diagram: Diagram; onBack: () => void }) {
  const colors = SUBJECT_COLORS[diagram.subject];
  const [imgError, setImgError] = useState(false);
  const [openParts, setOpenParts] = useState<Set<number>>(new Set());

  const togglePart  = (i: number) => setOpenParts((prev) => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  const expandAll   = () => setOpenParts(new Set(diagram.parts.map((_, i) => i)));
  const collapseAll = () => setOpenParts(new Set());

  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200"
      >
        ← Back to Diagram Lab
      </button>

      <div className={cn('rounded-2xl border-2 overflow-hidden', colors.card)}>
        <div className={cn('relative h-64 sm:h-80 bg-gradient-to-br', diagram.fallbackGradient)}>
          {!imgError ? (
            <img
              src={diagram.imageUrl}
              alt={diagram.name}
              onError={() => setImgError(true)}
              className="absolute inset-0 h-full w-full object-contain p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-9xl">{diagram.emoji}</div>
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className={cn('rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest', colors.badge)}>
              {diagram.subject}
            </span>
            <span className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-700">
              Class {diagram.classNumber} · {diagram.classRange}
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">{diagram.name}</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{diagram.summary}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-black text-slate-900">Labelled Parts ({diagram.parts.length})</h3>
          <div className="flex gap-2">
            <button onClick={expandAll}   className="text-[11px] font-black uppercase tracking-widest text-indigo-600 hover:underline">Expand all</button>
            <span className="text-slate-300">|</span>
            <button onClick={collapseAll} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:underline">Collapse</button>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {diagram.parts.map((part, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => togglePart(i)}
                className="flex w-full items-center gap-3 px-6 py-3.5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white',
                  `bg-gradient-to-br ${colors.card.includes('emerald') ? 'from-emerald-400 to-teal-500' : colors.card.includes('amber') ? 'from-amber-400 to-orange-500' : 'from-violet-400 to-purple-500'}`)}>
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-black text-slate-800">{part.label}</span>
                {openParts.has(i) ? <ChevronDown size={16} className="text-slate-400 shrink-0" /> : <ChevronRight size={16} className="text-slate-400 shrink-0" />}
              </button>
              {openParts.has(i) && (
                <div className="px-6 pb-4 pt-1">
                  <p className="ml-10 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-600">{part.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {diagram.funFact && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-amber-700 mb-2">🤩 Fun Fact</p>
          <p className="text-sm font-medium leading-relaxed text-slate-700">{diagram.funFact}</p>
        </div>
      )}

      {diagram.examTip && (
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 p-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-indigo-700 mb-2">🎯 Exam Tip</p>
          <p className="text-sm font-bold leading-relaxed text-slate-800">{diagram.examTip}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onBack}
        className="w-full rounded-2xl bg-slate-100 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200"
      >
        ← Back to All Diagrams
      </button>
    </section>
  );
}
