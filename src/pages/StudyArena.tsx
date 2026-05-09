import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Brain,
  LayoutGrid,
  CheckCircle,
  Loader2,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import {
  extractStudyConcepts,
  generateMoreMCQs,
  generateMoreFlashcards,
  StudyMaterial,
} from '../lib/api';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

type OutputTab = 'concepts' | 'flashcards' | 'mcqs';
type Status = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

export default function StudyArenaPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTab>('concepts');
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [data, setData] = useState<StudyMaterial | null>(null);
  const [fullContent, setFullContent] = useState<string>('');
  const [isGeneratingMoreMcqs, setIsGeneratingMoreMcqs] = useState(false);
  const [isGeneratingMoreFlashcards, setIsGeneratingMoreFlashcards] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';
    const numPages = Math.min(pdf.numPages, 20);
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = (textContent.items as { str: string }[])
        .map((item) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const processFile = async (file: File) => {
    setStatus('uploading');
    setErrorMessage(null);

    try {
      let text = '';
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        throw new Error('Unsupported file type. Upload a PDF or .txt file.');
      }

      if (!text.trim()) throw new Error('No readable text found in document.');

      setStatus('processing');
      const studyKit = await extractStudyConcepts(text);
      setFullContent(text);
      setData(studyKit);
      setStatus('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to process document. Please try again.'
      );
    }
  };

  const handleMcqSelect = (qIdx: number, oIdx: number) => {
    if (mcqAnswers[qIdx] !== undefined) return;
    setMcqAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleGenerateMoreMcqs = async () => {
    if (!fullContent || isGeneratingMoreMcqs || !data) return;
    setIsGeneratingMoreMcqs(true);
    try {
      const existingQuestions = data.mcqs.map((q) => q.question);
      const newMcqs = await generateMoreMCQs(fullContent, existingQuestions);
      setData((prev) => (prev ? { ...prev, mcqs: [...prev.mcqs, ...newMcqs] } : null));
    } catch (err) {
      console.error(err);
      alert('Failed to generate more questions. Please try again.');
    } finally {
      setIsGeneratingMoreMcqs(false);
    }
  };

  const handleGenerateMoreFlashcards = async () => {
    if (!fullContent || isGeneratingMoreFlashcards || !data) return;
    setIsGeneratingMoreFlashcards(true);
    try {
      const existingQuestions = data.flashcards.map((c) => c.question);
      const newCards = await generateMoreFlashcards(fullContent, existingQuestions);
      setData((prev) =>
        prev ? { ...prev, flashcards: [...prev.flashcards, ...newCards] } : null
      );
    } catch (err) {
      console.error(err);
      alert('Failed to generate more flashcards. Please try again.');
    } finally {
      setIsGeneratingMoreFlashcards(false);
    }
  };

  const reset = () => {
    setData(null);
    setFullContent('');
    setStatus('idle');
    setErrorMessage(null);
    setActiveTab('concepts');
    setFlippedCard(null);
    setMcqAnswers({});
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic-serif">
            Study <span className="text-primary italic">Arena</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Upload your notes and let AI generate a targeted study kit for you.
          </p>
        </div>
        {status === 'done' && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all"
          >
            <RotateCcw size={16} /> New Upload
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* IDLE — upload zone */}
        {status === 'idle' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
              }}
              className="border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col items-center justify-center space-y-6 hover:border-primary hover:bg-emerald-50/30 transition-all cursor-pointer group"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Upload size={40} />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black text-slate-900">
                  Drag &amp; Drop Your Study Material
                </h3>
                <p className="text-slate-500 font-medium mt-2">
                  Support for PDF and Text files (Max 20MB)
                </p>
              </div>
              <button className="btn-primary px-8 py-3 rounded-2xl">Browse Files</button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.txt"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: 'Core Summaries',
                  desc: 'Distill 50-page PDFs into 5-minute reads.',
                  icon: <FileText size={20} />,
                },
                {
                  title: 'Smart Flashcards',
                  desc: 'Active recall cards based on specific text.',
                  icon: <LayoutGrid size={20} />,
                },
                {
                  title: 'MCQ Generation',
                  desc: 'Practice questions with detailed logic.',
                  icon: <CheckCircle size={20} />,
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4"
                >
                  <div className="p-3 bg-slate-50 rounded-xl text-primary">{feature.icon}</div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{feature.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* LOADING */}
        {(status === 'uploading' || status === 'processing') && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 space-y-6"
          >
            <div className="relative">
              <Loader2 size={64} className="text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={24} className="text-primary-light animate-pulse" />
              </div>
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-xl font-black text-slate-900">
                {status === 'uploading'
                  ? 'Analyzing Document Intelligence...'
                  : 'Syllab AI is Synthesizing Study Modules...'}
              </h3>
              <p className="text-slate-500 font-medium mt-2">
                {status === 'uploading'
                  ? 'Our AI is reading your material to find key patterns.'
                  : 'Generating competitive exam style questions and summaries based on your content.'}
              </p>
            </div>
            <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: status === 'uploading' ? '40%' : '100%' }}
                transition={{ duration: 15, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}

        {/* ERROR */}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-8 bg-red-50 rounded-[3rem] border-2 border-red-100 space-y-6 text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center text-red-500">
              <AlertTriangle size={40} />
            </div>
            <div>
              <h3 className="text-xl font-black text-red-900">Wait, something went wrong!</h3>
              <p className="text-red-700 font-medium mt-2 max-w-sm">{errorMessage}</p>
            </div>
            <button
              onClick={reset}
              className="btn-primary bg-red-500 hover:bg-red-600 px-8 py-3 rounded-2xl"
            >
              Try Another File
            </button>
          </motion.div>
        )}

        {/* DONE — tabs + content */}
        {status === 'done' && data && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Tab Navigation */}
            <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100 max-w-md">
              {(['concepts', 'flashcards', 'mcqs'] as OutputTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2',
                    activeTab === tab
                      ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-600'
                  )}
                >
                  {tab === 'concepts' && <FileText size={14} />}
                  {tab === 'flashcards' && <LayoutGrid size={14} />}
                  {tab === 'mcqs' && <CheckCircle size={14} />}
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/20 border border-slate-100 min-h-[400px]">
              {/* CONCEPTS TAB */}
              {activeTab === 'concepts' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight italic-serif">
                    Comprehensive <span className="text-primary italic">Concept Pathways</span>
                  </h3>
                  {data.concepts.length > 0 ? (
                    <div className="space-y-8">
                      {data.concepts.map((c, i) => (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.min(i * 0.05, 0.5) }}
                          key={i}
                          className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary/30 transition-all"
                        >
                          <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shrink-0">
                              {i + 1}
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">
                                {c.title}
                              </h4>
                              <p className="text-slate-600 leading-relaxed font-medium text-sm">
                                {c.detail}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-center py-12">
                      No concepts were extracted. Try a different document.
                    </p>
                  )}
                </div>
              )}

              {/* FLASHCARDS TAB */}
              {activeTab === 'flashcards' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic-serif">
                      Active Recall <span className="text-orange-500 italic">Vault</span>
                    </h3>
                    {data.flashcards.length > 0 && (
                      <div className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100">
                        {data.flashcards.length} Cards Generated
                      </div>
                    )}
                  </div>

                  {data.flashcards.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.flashcards.map((card, i) => (
                        <div
                          key={i}
                          className="h-64 perspective cursor-pointer group"
                          onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                        >
                          <motion.div
                            className="relative w-full h-full duration-500 preserve-3d"
                            animate={{ rotateY: flippedCard === i ? 180 : 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          >
                            {/* Front (question) */}
                            <div className="absolute inset-0 backface-hidden bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-sm group-hover:shadow-md transition-shadow">
                              <Brain
                                size={32}
                                className="text-primary/40 group-hover:scale-110 transition-transform"
                              />
                              <h4 className="text-base font-black text-slate-800 leading-tight">
                                {card.question}
                              </h4>
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full">
                                Tap to reveal
                              </span>
                            </div>
                            {/* Back (answer) */}
                            <div className="absolute inset-0 backface-hidden bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center rotate-y-180 shadow-2xl">
                              <Sparkles size={32} className="text-orange-400/40 mb-4" />
                              <p className="text-white text-base font-medium leading-relaxed">
                                {card.answer}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-center py-8">
                      No flashcards yet. Click below to generate some.
                    </p>
                  )}

                  {/* Generate More Flashcards */}
                  <div className="pt-8 flex justify-center">
                    <button
                      onClick={handleGenerateMoreFlashcards}
                      disabled={isGeneratingMoreFlashcards}
                      className="btn-secondary px-8 py-4 rounded-2xl flex items-center gap-3 group relative overflow-hidden disabled:opacity-60"
                    >
                      {isGeneratingMoreFlashcards ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Synthesizing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles
                            size={20}
                            className="text-orange-500 group-hover:rotate-12 transition-transform"
                          />
                          <span>
                            {data.flashcards.length > 0
                              ? 'Generate More Flashcards'
                              : 'Generate Flashcards'}
                          </span>
                          <ChevronRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* MCQS TAB */}
              {activeTab === 'mcqs' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic-serif">
                      Adaptive <span className="text-emerald-500 italic">Assessment</span>
                    </h3>
                    {data.mcqs.length > 0 && (
                      <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        {data.mcqs.length} Questions Ready
                      </div>
                    )}
                  </div>

                  <div className="space-y-8 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                    {data.mcqs.length > 0 ? (
                      data.mcqs.map((mcq, i) => {
                        const userChoice = mcqAnswers[i];
                        const isCorrect = userChoice === mcq.correct;
                        const hasAnswered = userChoice !== undefined;

                        return (
                          <div
                            key={i}
                            className="space-y-4 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all"
                          >
                            <div className="flex gap-4">
                              <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-black shrink-0">
                                {i + 1}
                              </span>
                              <h4 className="font-black text-slate-800 text-lg leading-snug">
                                {mcq.question}
                              </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 md:pl-12">
                              {mcq.options.map((opt, idx) => {
                                const isOptionCorrect = idx === mcq.correct;
                                const isOptionSelected = userChoice === idx;

                                let statusClasses =
                                  'bg-white border-slate-100 text-slate-500 hover:border-primary/30';
                                if (hasAnswered) {
                                  if (isOptionCorrect)
                                    statusClasses =
                                      'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm';
                                  else if (isOptionSelected)
                                    statusClasses =
                                      'bg-red-50 border-red-200 text-red-700';
                                  else
                                    statusClasses =
                                      'bg-white border-slate-100 text-slate-300 opacity-60';
                                }

                                return (
                                  <button
                                    key={idx}
                                    disabled={hasAnswered}
                                    onClick={() => handleMcqSelect(i, idx)}
                                    className={cn(
                                      'p-4 rounded-2xl border-2 font-bold text-sm flex items-center gap-3 transition-all text-left',
                                      statusClasses
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        'w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors',
                                        hasAnswered && isOptionCorrect
                                          ? 'bg-emerald-200 text-emerald-800'
                                          : 'bg-slate-100 text-slate-500'
                                      )}
                                    >
                                      {String.fromCharCode(65 + idx)}
                                    </span>
                                    {opt}
                                    {hasAnswered && isOptionCorrect && (
                                      <CheckCircle
                                        size={16}
                                        className="ml-auto shrink-0 text-emerald-500"
                                      />
                                    )}
                                    {hasAnswered && isOptionSelected && !isCorrect && (
                                      <RotateCcw
                                        size={16}
                                        className="ml-auto shrink-0 text-red-500"
                                      />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                            {hasAnswered && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pl-0 md:pl-12 mt-4"
                              >
                                <div
                                  className={cn(
                                    'p-4 border rounded-2xl text-xs leading-relaxed font-semibold',
                                    isCorrect
                                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                                      : 'bg-emerald-50/50 border-emerald-100/50 text-emerald-600'
                                  )}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <Sparkles size={14} className="text-emerald-500" />
                                    <span className="font-black uppercase tracking-widest text-[9px]">
                                      {isCorrect ? 'Excellent Analysis' : 'Learning Insight'}
                                    </span>
                                  </div>
                                  {mcq.explanation}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-slate-400 italic text-center py-8">
                        No questions yet. Click below to generate some.
                      </p>
                    )}

                    {/* Generate More MCQs */}
                    <div className="pt-8 flex justify-center">
                      <button
                        onClick={handleGenerateMoreMcqs}
                        disabled={isGeneratingMoreMcqs}
                        className="btn-secondary px-8 py-4 rounded-2xl flex items-center gap-3 group relative overflow-hidden disabled:opacity-60"
                      >
                        {isGeneratingMoreMcqs ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>Synthesizing...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles
                              size={20}
                              className="text-primary group-hover:rotate-12 transition-transform"
                            />
                            <span>
                              {data.mcqs.length > 0
                                ? 'Generate 20+ More Questions'
                                : 'Generate Questions'}
                            </span>
                            <ChevronRight
                              size={18}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}
