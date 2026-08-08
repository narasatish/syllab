/**
 * ProjectsGalleryView — per-language mini-project gallery inside Skills Lab.
 * Shows Beginner / Intermediate / Advanced tabs, expandable cards with
 * step-by-step guide + code editor + instant AI feedback.
 */
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { miniProjects } from '../../data/miniProjects';
import { getCodingFeedback, CodingFeedback } from '../../lib/api';
import type { LanguageConfig } from '../../data/tutorials/index';

type Skill = (typeof miniProjects)[0]['skill'];
type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// Map Skills Lab language id → miniProject skill
const LANG_TO_SKILL: Partial<Record<string, Skill>> = {
  python: 'python',
  javascript: 'javascript',
  html: 'html-css',
  css: 'html-css',
  sql: 'sql',
  java: 'java' as Skill,
  'ai-learning': 'ai',
  'data-analytics': 'data-analytics',
  aptitude: 'aptitude' as Skill,
  'app-dev': 'app-dev' as Skill,
  robotics: 'robotics' as Skill,
  'game-dev': 'game-dev' as Skill,
  'git-github': 'git-github' as Skill,
  'prompt-engineering': 'prompt-engineering' as Skill,
  'cloud-computing': 'cloud-computing' as Skill,
  'data-mining': 'data-mining' as Skill,
};

// Map skill → challenge language for AI feedback
const SKILL_TO_LANG: Partial<Record<string, string>> = {
  python: 'python',
  javascript: 'javascript',
  'html-css': 'javascript',
  sql: 'sql',
  java: 'java',
  ai: 'python',
  'data-analytics': 'python',
};

const DIFF_TABS: { key: Difficulty; label: string }[] = [
  { key: 'beginner',     label: '🟢 Beginner' },
  { key: 'intermediate', label: '🟡 Mid-Level' },
  { key: 'advanced',     label: '🔴 Advanced' },
];

interface ProjectEditorState {
  code: string;
  aiFb: CodingFeedback | null;
  aiLoading: boolean;
}

interface Props {
  lang: LanguageConfig;
  activeLangId: string;
}

export default function ProjectsGalleryView({ lang, activeLangId }: Props) {
  const skill = LANG_TO_SKILL[activeLangId] ?? null;
  const codeLang = SKILL_TO_LANG[skill ?? ''] ?? 'python';

  const all = useMemo(
    () => (skill ? miniProjects.filter(p => p.skill === skill) : []),
    [skill],
  );

  const [tab, setTab] = useState<Difficulty>('beginner');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editors, setEditors] = useState<Record<string, ProjectEditorState>>({});

  const visible = useMemo(() => all.filter(p => p.difficulty === tab), [all, tab]);

  const counts: Record<Difficulty, number> = useMemo(() => ({
    beginner:     all.filter(p => p.difficulty === 'beginner').length,
    intermediate: all.filter(p => p.difficulty === 'intermediate').length,
    advanced:     all.filter(p => p.difficulty === 'advanced').length,
  }), [all]);

  const getEditor = useCallback((id: string): ProjectEditorState => {
    return editors[id] ?? { code: '', aiFb: null, aiLoading: false };
  }, [editors]);

  const setCode = useCallback((id: string, code: string) => {
    setEditors(prev => ({ ...prev, [id]: { ...getEditor(id), code, aiFb: null } }));
  }, [getEditor]);

  const doAI = useCallback(async (project: (typeof miniProjects)[0]) => {
    const state = getEditor(project.id);
    if (state.aiLoading) return;
    setEditors(prev => ({ ...prev, [project.id]: { ...state, aiLoading: true } }));
    const task = `${project.title}: ${project.whatYouBuild}. Steps: ${project.steps.join(' | ')}`;
    try {
      const fb = await getCodingFeedback({
        language: codeLang,
        code: state.code.trim() || '(empty)',
        task,
      });
      setEditors(prev => ({ ...prev, [project.id]: { ...prev[project.id], aiFb: fb, aiLoading: false } }));
    } catch {
      setEditors(prev => ({
        ...prev,
        [project.id]: {
          ...prev[project.id],
          aiFb: { score: 0, verdict: 'Error', summary: 'Could not reach AI tutor. Try again in a moment.', strengths: [], improvements: [], hint: '' },
          aiLoading: false,
        },
      }));
    }
  }, [getEditor, codeLang]);

  if (!skill) {
    return (
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-10 text-center space-y-2">
        <div className="text-4xl">🛠️</div>
        <p className="font-black text-slate-700 text-lg">{lang.name} projects coming soon!</p>
        <p className="text-sm text-slate-500 font-medium">
          We're writing guided projects for {lang.name}. Check back next update.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className={cn('rounded-2xl p-5 text-white', lang.bgClass)}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/70 mb-1">🛠️ Guided Projects</p>
        <h2 className="text-xl font-black">{lang.name} Projects</h2>
        <p className="text-sm text-white/80 font-medium mt-0.5">
          {all.length} projects · Build real things step-by-step · Instant AI feedback
        </p>
      </div>

      {/* Difficulty tabs */}
      <div className="flex gap-2 flex-wrap">
        {DIFF_TABS.map(({ key, label }) => (
          <button key={key} onClick={() => { setTab(key); setExpanded(null); }}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
              tab === key ? `${lang.bgClass} text-white shadow-sm` : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}>
            {label}
            <span className={cn('text-[11px] rounded-full px-1.5 py-0.5',
              tab === key ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-600',
            )}>{counts[key]}</span>
          </button>
        ))}
      </div>

      {/* Projects list */}
      {visible.length === 0 ? (
        <div className="text-center py-10 text-slate-400 font-bold text-sm">
          {tab} projects are coming soon — check back!
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map(p => {
            const editor = getEditor(p.id);
            const isOpen = expanded === p.id;
            return (
              <div key={p.id} className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : p.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition-all"
                >
                  <span className="text-3xl shrink-0">{p.previewEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-800 text-sm">{p.title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">{p.description}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-slate-500">⏱ ~{p.estimatedMinutes}min</span>
                      <span className="text-[11px] font-bold text-slate-500">✨ +{p.xp} XP</span>
                      {p.concepts.slice(0, 2).map(c => (
                        <span key={c} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{c}</span>
                      ))}
                    </div>
                  </div>
                  {isOpen
                    ? <ChevronUp size={16} className="text-slate-400 shrink-0" />
                    : <ChevronDown size={16} className="text-slate-400 shrink-0" />
                  }
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-5 py-5 space-y-4">
                        {/* What you'll build */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                          <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700 mb-1">🏆 What You'll Build</p>
                          <p className="text-sm font-semibold text-slate-700">{p.whatYouBuild}</p>
                        </div>

                        {/* Steps */}
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">📋 Steps</p>
                          <ol className="space-y-2">
                            {p.steps.map((step, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className={cn(
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white',
                                  lang.bgClass,
                                )}>{i + 1}</span>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed mt-0.5">{step}</p>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Concept chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {p.concepts.map(c => (
                            <span key={c} className={cn(
                              'text-[11px] font-black px-2.5 py-1 rounded-full',
                              tab === 'beginner' ? 'bg-emerald-50 text-emerald-700' :
                              tab === 'intermediate' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700',
                            )}>{c}</span>
                          ))}
                        </div>

                        {/* ── Code editor section ── */}
                        <div className="border-t border-slate-100 pt-4 space-y-3">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">
                              💻 Write Your Code
                              <span className="ml-2 normal-case font-medium text-slate-400">
                                — attempt the project, then get AI feedback
                              </span>
                            </p>
                            <textarea
                              value={editor.code}
                              onChange={e => setCode(p.id, e.target.value)}
                              rows={10}
                              spellCheck={false}
                              placeholder={`# Write your ${lang.name} code here...\n# Follow the steps above to build: ${p.title}`}
                              className="w-full bg-slate-900 text-emerald-400 rounded-xl p-4 text-sm font-mono resize-y border border-slate-700 focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                            />
                          </div>

                          {/* AI Feedback button */}
                          <button
                            onClick={() => doAI(p)}
                            disabled={editor.aiLoading}
                            className={cn(
                              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                              editor.aiLoading
                                ? 'bg-slate-100 text-slate-400 cursor-wait'
                                : 'bg-violet-600 text-white hover:bg-violet-700',
                            )}
                          >
                            <Sparkles size={13} />
                            {editor.aiLoading ? 'Checking your code…' : 'Get AI Feedback'}
                          </button>

                          {/* AI feedback result */}
                          {editor.aiFb && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="rounded-xl border border-slate-200 p-4 space-y-3"
                            >
                              <div className="flex items-center gap-3">
                                <span className={cn(
                                  'text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full',
                                  editor.aiFb.score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                  editor.aiFb.score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700',
                                )}>{editor.aiFb.verdict}</span>
                                <span className="text-sm font-black text-slate-600">{editor.aiFb.score}/100</span>
                              </div>
                              <p className="text-sm font-medium text-slate-700">{editor.aiFb.summary}</p>
                              {editor.aiFb.strengths?.length > 0 && (
                                <div>
                                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700 mb-1">✅ Strengths</p>
                                  <ul className="space-y-1">
                                    {editor.aiFb.strengths.map((s, i) => (
                                      <li key={i} className="text-sm text-slate-600 font-medium flex gap-2">
                                        <span className="text-emerald-500 shrink-0">•</span>{s}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {editor.aiFb.improvements?.length > 0 && (
                                <div>
                                  <p className="text-[11px] font-black uppercase tracking-widest text-amber-700 mb-1">💡 Improve</p>
                                  <ul className="space-y-1">
                                    {editor.aiFb.improvements.map((s, i) => (
                                      <li key={i} className="text-sm text-slate-600 font-medium flex gap-2">
                                        <span className="text-amber-500 shrink-0">•</span>{s}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {editor.aiFb.hint && (
                                <div className="bg-violet-50 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                                  <span className="font-black text-violet-700">Hint: </span>{editor.aiFb.hint}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
