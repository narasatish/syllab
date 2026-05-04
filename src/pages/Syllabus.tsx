import React, { useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, X, Zap, PlayCircle, Lightbulb, ArrowRight, Crown, Bot, Target, Pin } from 'lucide-react';
import { Chapter, Subject, ClassLevel, Concept } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CONCEPTS } from '../data/concepts';
import SEO from '../components/SEO';

interface SyllabusPageProps {
  setTab: (tab: string) => void;
  syllabus: Chapter[];
  setPracticeConfig: (config: Record<string, unknown>) => void;
}

function ConceptView({ concept, onClose, onNext }: { concept: Concept; onClose: () => void; onNext?: () => void }) {
  const [activeTab, setActiveTab] = useState<'visuals' | 'examples' | 'technical'>('visuals');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        className="relative bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Sidebar Nav */}
        <div className="w-full md:w-24 bg-slate-900 flex flex-row md:flex-col items-center justify-center py-4 md:py-12 gap-6 md:gap-8 shrink-0">
          <button 
            onClick={() => setActiveTab('visuals')}
            title="Visual Intuition"
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              activeTab === 'visuals' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            <Sparkles size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('technical')}
            title="Formulas & Hacks"
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              activeTab === 'technical' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            <Zap size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('examples')}
            title="Real World"
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              activeTab === 'examples' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            <Lightbulb size={24} />
          </button>
          <div className="hidden md:block flex-1" />
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-2xl flex items-center justify-center transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-8 md:p-12 space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary/10">
                  {concept.subject} • Master Module
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight italic-serif">
                  {concept.title}
                </h2>
                <div className="flex items-center gap-4 pt-2">
                   <div className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/3" />
                   </div>
                   <span className="text-[10px] font-black text-slate-400">33% Mastered</span>
                </div>
              </div>
              
              {onNext && (
                <button 
                  onClick={onNext}
                  className="btn-primary group flex items-center gap-3 px-8 py-4 text-xs font-black uppercase tracking-widest"
                >
                  Next Concept <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </header>

            {activeTab === 'visuals' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {concept.visuals.map((v, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm group hover:-translate-y-1 transition-all">
                      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block p-4 bg-slate-50 rounded-2xl">{v.icon}</div>
                      <h4 className="text-lg font-black text-slate-900 mb-2">{v.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group aspect-video shadow-2xl">
                   <div className="absolute inset-0 opacity-40">
                     <video src={concept.videoUrl} autoPlay loop muted className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                        <PlayCircle size={48} fill="currentColor" />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'technical' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
                      <h4 className="text-xl font-black text-primary italic-serif flex items-center gap-3">
                        <ArrowRight size={20} /> Key Formulas
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {(concept.formulas || ["E = mc²", "F = ma", "v = u + at"]).map((f, i) => (
                          <div key={i} className="px-6 py-4 bg-slate-50 rounded-2xl font-mono text-lg font-black text-slate-900 border border-slate-100 flex items-center justify-center min-w-[120px]">
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-rose-50 p-10 rounded-[2rem] border border-rose-100 shadow-sm space-y-4">
                      <h4 className="text-xl font-black text-rose-600 italic-serif">Common Mistakes</h4>
                      <ul className="space-y-3">
                         {(concept.commonMistakes || ["Forgetting sign conventions", "Unit conversion errors", "Misinterpreting the question scope"]).map((m, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm font-bold text-rose-700">
                             <div className="w-2 h-2 rounded-full bg-rose-400" /> {m}
                           </li>
                         ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-10 rounded-[2rem] border border-amber-100 shadow-sm space-y-6">
                    <h4 className="text-xl font-black text-amber-700 italic-serif flex items-center gap-3">
                      <Sparkles size={20} /> Exam Hacks
                    </h4>
                    <div className="space-y-6">
                      {(concept.examTricks || ["Use dimensional analysis to eliminate options", "Identify symmetry in the problem", "Check boundary conditions first"]).map((t, i) => (
                        <div key={i} className="space-y-2">
                           <div className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Hack #{i+1}</div>
                           <p className="text-sm font-bold text-amber-900 leading-relaxed">{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'examples' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {concept.examples.map((ex, i) => (
                    <div key={i} className="flex flex-col p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-emerald-500/30 transition-all">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <Zap size={28} fill="currentColor" />
                      </div>
                      <h5 className="text-xl font-black text-slate-900 mb-4">{ex.scenario}</h5>
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">{ex.details}</p>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 group-hover:gap-4 transition-all">
                        View Step-by-Step Solution <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SyllabusPage({ setTab, syllabus, setPracticeConfig }: SyllabusPageProps) {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>('All');
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [pinnedChapters, setPinnedChapters] = useState<string[]>(() => {
    const saved = localStorage.getItem('syllab_pinned_chapters');
    return saved ? JSON.parse(saved) : [];
  });

  const togglePin = (chapterId: string) => {
    setPinnedChapters(prev => {
      const next = prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId];
      localStorage.setItem('syllab_pinned_chapters', JSON.stringify(next));
      return next;
    });
  };

  // Subjects derived dynamically from syllabus — handles Class 5–9 subjects
  // like English, EVS, World Around Us etc. without needing hardcoded list
  const subjects: (Subject | 'All')[] = React.useMemo(() => {
    const pool = selectedClass === 'All'
      ? syllabus
      : syllabus.filter(c => c.classLevel === selectedClass);
    const unique = Array.from(new Set(pool.map(c => c.subject))).sort();
    return ['All', ...unique] as (Subject | 'All')[];
  }, [syllabus, selectedClass]);
  const classes: (ClassLevel | 'All')[] = ['All', '5', '6', '7', '8', '9', '10', '11', '12'];

  // If selected subject is no longer valid for the selected class, reset it
  React.useEffect(() => {
    if (!subjects.includes(selectedSubject)) {
      setSelectedSubject('All');
    }
  }, [subjects, selectedSubject]);

  const filteredChapters = syllabus.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(search.toLowerCase()) || 
                         chapter.topics.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesSubject = selectedSubject === 'All' || chapter.subject === selectedSubject;
    const matchesClass = selectedClass === 'All' || chapter.classLevel === selectedClass;
    return matchesSearch && matchesSubject && matchesClass;
  });

  const handlePractice = (chapter: Chapter) => {
    setPracticeConfig({
      classLevel: chapter.classLevel,
      subject: chapter.subject,
      chapterId: chapter.id,
    });
    setTab('arena');
  };

  const [conceptLoading, setConceptLoading] = useState(false);

  const handleConcept = async (chapter: Chapter) => {
    // 1. Check static CONCEPTS data first (don't change existing content)
    const staticConcept = CONCEPTS.find(c => c.chapterId === chapter.id);
    if (staticConcept) {
      setActiveConcept(staticConcept);
      return;
    }

    // 2. Check localStorage cache for previously AI-generated concepts
    const cacheKey = `padhai:concept:${chapter.id}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setActiveConcept(JSON.parse(cached) as Concept);
        return;
      }
    } catch { /* ignore */ }

    // 3. Fetch from AI backend
    setConceptLoading(true);
    try {
      const API_BASE: string = (() => {
        if (typeof window !== 'undefined' && (window as any).__PADHAI_API__) return (window as any).__PADHAI_API__;
        try {
          // @ts-ignore - Vite
          const v = import.meta?.env?.VITE_API_BASE;
          if (v) return v;
        } catch { /* not Vite */ }
        return 'http://localhost:5000';
      })();

      const res = await fetch(`${API_BASE}/api/concept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classLevel: chapter.classLevel,
          subject: chapter.subject,
          chapterTitle: chapter.title,
          chapterId: chapter.id,
        }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (!data.concept) throw new Error('No concept returned');

      const concept: Concept = data.concept;
      // Cache for next time
      try { localStorage.setItem(cacheKey, JSON.stringify(concept)); } catch { /* quota */ }
      setActiveConcept(concept);
    } catch (err) {
      console.error('[handleConcept]', err);
      alert(`Could not load concept for "${chapter.title}". Please check your backend connection.`);
    } finally {
      setConceptLoading(false);
    }
  };

  const handleNextConcept = () => {
    if (!activeConcept) return;
    const currentIndex = CONCEPTS.findIndex(c => c.id === activeConcept.id);
    const nextConcept = CONCEPTS[currentIndex + 1];
    if (nextConcept) {
      setActiveConcept(nextConcept);
    } else {
      setActiveConcept(null);
    }
  };

  const totalQuestions = syllabus.length * 300;

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title={activeConcept ? `${activeConcept.title} | Concept Learning` : "Explore Detailed Syllabus for JEE/NEET"} 
        description={activeConcept ? activeConcept.summary : "Browse through a highly enriched syllabus for Class 10, 11, and 12 subjects including Physics, Chemistry, Biology, and Mathematics with real-world examples."}
      />
      <AnimatePresence>
        {conceptLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-4 max-w-xs text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center animate-pulse">
                <Sparkles size={26} />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg">Preparing concept...</p>
                <p className="text-xs font-semibold text-slate-500 mt-1">Please wait, this may take a few seconds.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeConcept && (
          <ConceptView 
            concept={activeConcept} 
            onClose={() => setActiveConcept(null)} 
            onNext={handleNextConcept}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-black mb-1 tracking-tight">📚 Curriculum Vault</h2>
          <p className="text-slate-500 font-medium text-sm">
            Deep dive into concepts and practice with <span className="text-primary font-black">{totalQuestions.toLocaleString()}+</span> questions.
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" size={18} />
          <input 
            type="text" 
            placeholder="Search curricula..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Filter size={16} className="text-slate-400 mr-2" />
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {classes.map(c => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                selectedClass === c ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
              )}
            >
              Class {c === 'All' ? 'All' : c}
            </button>
          ))}
        </div>
        <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block" />
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s as Subject | 'All')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                selectedSubject === s ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter) => (
          <motion.div 
            layout
            key={chapter.id} 
            className="card group flex flex-col h-full translate-y-0 border-none shadow-xl shadow-emerald-500/[0.02] p-8 hover:shadow-2xl transition-all bg-white rounded-[2.5rem]"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => togglePin(chapter.id)}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    pinnedChapters.includes(chapter.id) ? "text-primary bg-primary/10" : "text-slate-300 hover:text-slate-400"
                  )}
                >
                  <Pin size={14} fill={pinnedChapters.includes(chapter.id) ? "currentColor" : "none"} />
                </button>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                  chapter.subject === 'Physics' ? "bg-blue-50 text-blue-600 border-blue-100" :
                  chapter.subject === 'Chemistry' ? "bg-orange-50 text-orange-600 border-orange-100" :
                  chapter.subject === 'Biology' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  "bg-violet-50 text-violet-600 border-violet-100"
                )}>
                  {chapter.subject} • Class {chapter.classLevel}
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors text-slate-900 tracking-tight leading-tight">
              {chapter.title}
            </h3>

            <div className="space-y-4 flex-1 mb-8">
              {chapter.explanation && (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">Concept Summary</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{chapter.explanation}</p>
                </div>
              )}
              
              {<div className="space-y-4 flex-1 mb-8">
  {chapter.explanation && (
    <div className="space-y-1">
      <p className="text-sm font-bold text-slate-800">Concept Summary</p>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">
        {chapter.explanation}
      </p>
    </div>
  )}
</div>}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <button 
                onClick={() => void handleConcept(chapter)}
                className="flex items-center justify-center gap-2 py-3.5 bg-slate-50 hover:bg-white hover:text-primary border border-slate-100 hover:border-primary/20 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest text-slate-500 shadow-sm"
              >
                <BookOpen size={14} />
                Learn
              </button>
              <button 
                onClick={() => setTab('tutor')}
                className="flex items-center justify-center gap-2 py-3.5 bg-slate-50 hover:bg-white hover:text-primary border border-slate-100 hover:border-primary/20 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest text-slate-500 shadow-sm"
              >
                <Bot size={14} className="text-primary" />
                AI Tutor
              </button>
            </div>

            <button 
              onClick={() => handlePractice(chapter)}
              className="flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl transition-all font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:scale-95 group/btn w-full"
            >
              <Target size={16} fill="currentColor" />
              Practice Concepts
            </button>
          </motion.div>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border border-slate-100">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No curricula found matching filters.</p>
        </div>
      )}
    </div>
  );
}