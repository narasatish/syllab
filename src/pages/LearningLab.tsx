import React from 'react';
import { FileText, ScanLine, GraduationCap } from 'lucide-react';
import { lazyWithRetry } from '../lib/lazyWithRetry';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';

type LabMode = 'study' | 'scan' | 'homework';

const StudyArenaPage = lazyWithRetry(() => import('./StudyArena'), 'StudyArena');
const ScanAndSolve = lazyWithRetry(() => import('./Scan'), 'Scan');
const HomeworkPage = lazyWithRetry(() => import('./Homework'), 'Homework');

export default function LearningLabPage() {
  const [mode, setMode] = React.useState<LabMode>('study');

  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="AI Tutor, Daily Homework & Scan Solve — Free Learning Lab"
        description="Your free AI tuition teacher: get personalized daily homework by class & board, upload a worksheet photo for instant AI evaluation, turn notes into flashcards & MCQs, or scan any question for step-by-step solutions."
        keywords="AI tuition teacher, daily homework, AI homework checker, worksheet evaluation, free AI tutor India, scan and solve, MCQ generator, CBSE state board homework"
        url="https://syllab.in/ai-tutor"
      />

      <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-primary">
              <FileText size={14} />
              AI learning workspace
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Learning Lab</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Get personalized daily homework from your AI tuition teacher, turn documents into study material, or scan a question and get a clear solution.
            </p>
          </div>

          <div className="grid grid-cols-3 rounded-2xl bg-slate-100 p-1">
            {[
              { id: 'homework' as const, label: 'Homework', icon: GraduationCap },
              { id: 'study' as const, label: 'Study Tools', icon: FileText },
              { id: 'scan' as const, label: 'Scan Solve', icon: ScanLine },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest transition-all',
                  mode === item.id ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800',
                )}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <React.Suspense fallback={<div className="rounded-2xl bg-white p-8 text-center text-sm font-bold text-slate-400">Loading tool...</div>}>
        {mode === 'homework' ? <HomeworkPage /> : mode === 'study' ? <StudyArenaPage /> : <ScanAndSolve />}
      </React.Suspense>
    </main>
  );
}
