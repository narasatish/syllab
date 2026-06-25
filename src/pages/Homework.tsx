/**
 * Homework.tsx — "AI Tuition Teacher" tab.
 *
 * Daily Homework: Class → Subject → Chapter (real curriculum) → AI sets
 * free-response questions (no MCQ; diagram questions for Biology). Answer by
 * typing, uploading a photo per question, OR uploading one photo of the whole
 * handwritten sheet (matched by the homework CODE). Earn XP; a new harder set
 * arrives daily per chapter until you switch chapters. Performance-aware: it
 * suggests weak chapters from your Practice/Mock/Daily results.
 */
import React from 'react';
import {
  GraduationCap, Sparkles, Upload, Loader2, CheckCircle2, XCircle, CircleDot, Flame,
  Printer, RotateCcw, Trophy, Award, FileText, Zap, X, BookOpen, Target, Camera, Hash,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { exportNcertChapterAsPDF } from '../lib/printPdf';
import { subjectsForClass, chaptersFor } from '../data/homeworkCurriculum';
import {
  generateHomework, gradeHomework, gradeFromSheet, evaluateWorksheet, buildProfile,
  getStreak, getLocalXp, buildWeeklyReport, getChapterKnowledge, getActiveAssignment,
  getRecommendedFocus, getSetByCode, normalizeCode,
  type HomeworkSet, type HomeworkResult, type HwAnswer, type FocusArea,
} from '../lib/homework';

const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const BOARDS = ['CBSE', 'ICSE', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Maharashtra', 'Other State Board'];
const OTHER = '__other__';

type Flow = 'daily' | 'worksheet';

export default function HomeworkPage() {
  const [flow, setFlow] = React.useState<Flow>('daily');
  const profile = React.useMemo(() => buildProfile(), []);
  const [streak, setStreak] = React.useState(() => getStreak());
  const [xp, setXp] = React.useState(() => getLocalXp());
  const refresh = () => { setStreak(getStreak()); setXp(getLocalXp()); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20"><GraduationCap size={26} /></div>
          <div>
            <h2 className="text-lg font-black leading-tight">Your AI Tuition Teacher</h2>
            <p className="text-xs font-semibold text-emerald-50/90">{profile.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Stat icon={<Flame size={18} className="text-amber-300" />} value={streak} label="day streak" />
          <Stat icon={<Zap size={18} className="text-yellow-300" />} value={xp} label="homework XP" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
        {[
          { id: 'daily' as const, label: 'Daily Homework', icon: Sparkles },
          { id: 'worksheet' as const, label: 'Check My Worksheet', icon: Upload },
        ].map((t) => (
          <button key={t.id} type="button" onClick={() => setFlow(t.id)}
            className={cn('flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-black uppercase tracking-wider transition-all',
              flow === t.id ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800')}>
            <t.icon size={15} />{t.label}
          </button>
        ))}
      </div>

      {flow === 'daily' ? <DailyHomework onComplete={refresh} /> : <WorksheetCheck />}
      <WeeklyReportCard />
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2">
      {icon}
      <div className="leading-none">
        <div className="text-lg font-black">{value}</div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-50/80">{label}</div>
      </div>
    </div>
  );
}

/* ───────────── Daily Homework ───────────── */

function DailyHomework({ onComplete }: { onComplete: () => void }) {
  const active = React.useMemo(() => getActiveAssignment(), []);
  const focus = React.useMemo(() => getRecommendedFocus(), []);
  const [classLevel, setClassLevel] = React.useState(active?.classLevel || 'Class 10');
  const [board, setBoard] = React.useState(active?.board || 'CBSE');
  const [subject, setSubject] = React.useState(active?.subject || '');
  const [chapter, setChapter] = React.useState(active?.chapter || '');
  const [customChapter, setCustomChapter] = React.useState(false);

  const subjects = React.useMemo(() => subjectsForClass(classLevel), [classLevel]);
  const chapters = React.useMemo(() => chaptersFor(classLevel, subject), [classLevel, subject]);

  // Keep subject valid for the chosen class.
  React.useEffect(() => {
    if (subjects.length && !subjects.includes(subject)) { setSubject(subjects[0]); setChapter(''); setCustomChapter(false); }
  }, [subjects]); // eslint-disable-line react-hooks/exhaustive-deps

  const [set, setSet] = React.useState<HomeworkSet | null>(null);
  const [answers, setAnswers] = React.useState<HwAnswer[]>([]);
  const [result, setResult] = React.useState<HomeworkResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [grading, setGrading] = React.useState(false);
  const [error, setError] = React.useState('');

  const knowledge = React.useMemo(
    () => (chapter.trim() ? getChapterKnowledge(classLevel, subject, chapter) : null),
    [classLevel, subject, chapter, result],
  );

  const applyFocus = (f: FocusArea) => {
    setClassLevel(f.classLevel); setSubject(f.subject); setChapter(f.chapter);
    setCustomChapter(!chaptersFor(f.classLevel, f.subject).includes(f.chapter));
    setSet(null); setResult(null);
  };

  const generate = async () => {
    if (!subject) { setError('Please select a subject.'); return; }
    if (!chapter.trim()) { setError('Please choose or type a chapter.'); return; }
    setError(''); setResult(null); setSet(null); setLoading(true);
    try {
      const hw = await generateHomework({ classLevel, board, subject, chapter });
      setSet(hw);
      setAnswers(hw.questions.map(() => ({})));
    } catch (e) { setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const submit = async () => {
    if (!set) return;
    if (!answers.some((a) => (a.text && a.text.trim()) || a.image)) { setError('Write or upload at least one answer first.'); return; }
    setError(''); setGrading(true);
    try { const r = await gradeHomework(set, answers); setResult(r); onComplete(); }
    catch { setError('Could not grade right now. Please try again.'); }
    finally { setGrading(false); }
  };

  const submitSheet = async (img: string) => {
    if (!set) return;
    setError(''); setGrading(true);
    try { const r = await gradeFromSheet(set, img); setResult(r); onComplete(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not read the sheet. Try a clearer photo.'); }
    finally { setGrading(false); }
  };

  const setText = (i: number, v: string) => setAnswers((a) => a.map((x, k) => (k === i ? { ...x, text: v } : x)));
  const setImage = (i: number, img: string | undefined) => setAnswers((a) => a.map((x, k) => (k === i ? { ...x, image: img } : x)));

  const printSet = () => {
    if (!set) return;
    exportNcertChapterAsPDF({
      title: `${subject} Homework — ${chapter} (Day ${set.day})  ·  Code ${set.code}`,
      classLevel: classLevel.replace('Class ', ''), subject,
      items: [
        { number: 0, question: `WRITE THIS CODE AT THE TOP OF YOUR PAPER: ${set.code}. Number each answer (1, 2, 3…), then upload a photo to get it marked.`, solution: '' },
        ...set.questions.map((q, i) => ({
          number: i + 1, question: `[${q.marks} mark${q.marks > 1 ? 's' : ''}] ${q.question}`,
          solution: result ? `Answer: ${q.answer}\n${q.explanation}` : '',
        })),
      ],
    });
  };

  return (
    <div className="space-y-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      {focus.length > 0 && !set && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700"><Target size={14} /> Based on your practice & tests, focus on</div>
          <div className="flex flex-wrap gap-2">
            {focus.map((f, i) => (
              <button key={i} type="button" onClick={() => applyFocus(f)}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-amber-800 shadow-sm transition hover:bg-amber-100">
                {f.chapter} <span className="text-amber-500">· {f.classLevel} {f.subject} ({f.accuracy}%)</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="Class" value={classLevel} onChange={(v) => { setClassLevel(v); setSet(null); }} options={CLASSES} />
        <Select label="Board" value={board} onChange={setBoard} options={BOARDS} />
        <Select label="Subject" value={subject} onChange={(v) => { setSubject(v); setChapter(''); setCustomChapter(false); setSet(null); }} options={subjects.length ? subjects : ['Mathematics']} />
        <label className="block">
          <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-400">Chapter</span>
          {customChapter || !chapters.length ? (
            <input value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="Type your chapter"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 focus:border-primary focus:outline-none" />
          ) : (
            <select value={chapters.includes(chapter) ? chapter : ''} onChange={(e) => { if (e.target.value === OTHER) { setCustomChapter(true); setChapter(''); } else { setChapter(e.target.value); } }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 focus:border-primary focus:outline-none">
              <option value="">Select chapter…</option>
              {chapters.map((c) => <option key={c} value={c}>{c}</option>)}
              <option value={OTHER}>✏️ Other (type your own)</option>
            </select>
          )}
        </label>
      </div>

      {knowledge && knowledge.attempts > 0 && (
        <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">
          <BookOpen size={14} /> Your knowledge on this chapter: {knowledge.accuracy}% · {knowledge.level}
        </div>
      )}

      <button type="button" onClick={generate} disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-primary/90 disabled:opacity-60">
        {loading ? <><Loader2 size={16} className="animate-spin" /> Preparing your homework…</> : <><Sparkles size={16} /> {set ? 'Refresh homework' : 'Get my homework'}</>}
      </button>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

      {set && !result && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-900 p-3 text-xs font-bold text-white">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1"><Hash size={12} /> {set.code}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Day {set.day}</span>
            <span className="text-slate-300">Doing it on paper? Write <b>{set.code}</b> at the top, number your answers, and upload the sheet below.</span>
          </div>
          {set.questions.map((q, i) => (
            <QuestionCard key={i} q={q} index={i} answer={answers[i] || {}} onText={(v) => setText(i, v)} onImage={(img) => setImage(i, img)} />
          ))}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={submit} disabled={grading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:opacity-60">
              {grading ? <><Loader2 size={16} className="animate-spin" /> Marking…</> : <><CheckCircle2 size={16} /> Submit typed/uploaded answers</>}
            </button>
            <button type="button" onClick={printSet} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
              <Printer size={16} /> Print
            </button>
          </div>
          <SheetUpload onSubmit={submitSheet} busy={grading} code={set.code} />
        </div>
      )}

      {result && set && <ResultView set={set} result={result} onPrint={printSet} onRetry={generate} />}

      {!set && <PreviousSheet onResult={() => onComplete()} />}
    </div>
  );
}

/** Upload one photo of the full handwritten sheet for the CURRENT homework. */
function SheetUpload({ onSubmit, busy, code }: { onSubmit: (img: string) => void; busy: boolean; code: string }) {
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => onSubmit(String(reader.result || ''));
    reader.readAsDataURL(file);
  };
  return (
    <label className={cn('flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50', busy && 'pointer-events-none opacity-60')}>
      <Camera size={16} /> Upload my handwritten sheet (code {code})
      <input type="file" accept="image/*" onChange={onFile} className="hidden" disabled={busy} />
    </label>
  );
}

/** Upload a coded sheet from a previous day (look it up by code). */
function PreviousSheet({ onResult }: { onResult: (r: HomeworkResult) => void }) {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState('');
  const [result, setResult] = React.useState<HomeworkResult | null>(null);
  const [setObj, setSetObj] = React.useState<HomeworkSet | null>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) return;
    const found = getSetByCode(code);
    if (!found) { setError(`Couldn't find homework ${normalizeCode(code) || code} on this device. Re-select the same class/subject/chapter and tap "Get my homework" to restore it, then upload.`); return; }
    setError(''); setBusy(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try { const r = await gradeFromSheet(found, String(reader.result || '')); setResult(r); setSetObj(found); onResult(r); }
      catch (err) { setError(err instanceof Error ? err.message : 'Could not read the sheet.'); }
      finally { setBusy(false); }
    };
    reader.readAsDataURL(file);
  };

  if (result && setObj) return <div className="mt-2"><ResultView set={setObj} result={result} onPrint={() => {}} onRetry={() => { setResult(null); setSetObj(null); setOpen(false); }} /></div>;

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-2 text-sm font-black text-slate-700">
        <Camera size={16} className="text-primary" /> Submitting a paper sheet from a previous day?
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          <p className="text-xs font-semibold text-slate-500">Enter the homework code you wrote on your sheet, then upload the photo.</p>
          <div className="flex flex-wrap gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="HW-7K3M"
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold uppercase text-slate-700 focus:border-primary focus:outline-none" />
            <label className={cn('flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700', (busy || !code.trim()) && 'pointer-events-none opacity-60')}>
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Upload sheet
              <input type="file" accept="image/*" onChange={onFile} className="hidden" disabled={busy || !code.trim()} />
            </label>
          </div>
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ q, index, answer, onText, onImage }: {
  q: HomeworkSet['questions'][number]; index: number; answer: HwAnswer;
  onText: (v: string) => void; onImage: (img: string | undefined) => void;
}) {
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => onImage(String(reader.result || ''));
    reader.readAsDataURL(file);
  };
  return (
    <div className={cn('rounded-xl border p-4', q.isReview ? 'border-amber-300 bg-amber-50' : 'border-slate-200')}>
      <div className="mb-2 flex items-start gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-black text-primary">{index + 1}</span>
        <div className="flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            {q.isReview && <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-800">🔁 Revision</span>}
            {q.type === 'diagram' && <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-violet-700">✏️ Draw &amp; label</span>}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-500">{q.marks} mark{q.marks > 1 ? 's' : ''}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{q.topic}</span>
          </div>
          <p className="text-sm font-bold text-slate-800">{q.question}</p>
        </div>
      </div>
      <div className="ml-8 space-y-2">
        {q.type !== 'diagram' && (
          <textarea value={answer.text || ''} onChange={(e) => onText(e.target.value)} rows={3} placeholder="Write your answer here…"
            className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none" />
        )}
        {answer.image ? (
          <div className="relative inline-block">
            <img loading="lazy" decoding="async" src={answer.image} alt="Your answer" className="max-h-44 rounded-lg border border-slate-200 object-contain" />
            <button type="button" onClick={() => onImage(undefined)} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white shadow"><X size={13} /></button>
          </div>
        ) : (
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-bold text-slate-500 transition hover:border-primary hover:text-primary">
            <Upload size={14} /> {q.type === 'diagram' ? 'Upload your diagram' : 'Or upload a photo of your answer'}
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
}

function ResultView({ set, result, onPrint, onRetry }: { set: HomeworkSet; result: HomeworkResult; onPrint: () => void; onRetry: () => void }) {
  const pct = result.percent;
  const tone = pct >= 80 ? 'emerald' : pct >= 50 ? 'amber' : 'red';
  return (
    <div className="space-y-4">
      <div className={cn('flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5', tone === 'emerald' ? 'bg-emerald-50' : tone === 'amber' ? 'bg-amber-50' : 'bg-red-50')}>
        <div className="flex items-center gap-3">
          {pct >= 80 ? <Trophy className="text-emerald-600" size={32} /> : <Award className={tone === 'amber' ? 'text-amber-600' : 'text-red-500'} size={32} />}
          <div>
            <div className={cn('text-2xl font-black', tone === 'emerald' ? 'text-emerald-700' : tone === 'amber' ? 'text-amber-700' : 'text-red-600')}>{result.score} / {result.total} marks</div>
            <div className="text-xs font-bold text-slate-500">{pct}% · {pct >= 80 ? 'Excellent work! 🎉' : pct >= 50 ? 'Good effort — review the misses.' : 'Keep going — revise and retry.'}</div>
          </div>
        </div>
        {result.xpEarned > 0 && <div className="flex items-center gap-1.5 rounded-xl bg-yellow-400/90 px-3 py-2 text-sm font-black text-yellow-950"><Zap size={16} /> +{result.xpEarned} XP</div>}
      </div>
      {set.questions.map((q, i) => {
        const it = result.items[i];
        const Icon = it.verdict === 'correct' ? CheckCircle2 : it.verdict === 'partial' ? CircleDot : XCircle;
        const color = it.verdict === 'correct' ? 'text-emerald-600' : it.verdict === 'partial' ? 'text-amber-600' : 'text-red-500';
        return (
          <div key={i} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start gap-2">
              <Icon size={18} className={cn('mt-0.5 shrink-0', color)} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-slate-800">{i + 1}. {q.question}</p>
                  <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black', color)}>{it.marks}/{it.maxMarks}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600"><span className="font-bold text-emerald-700">Correct answer:</span> {it.correctAnswer}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{it.feedback}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onRetry} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-primary/90">
          <RotateCcw size={16} /> Next homework
        </button>
        <button type="button" onClick={onPrint} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
          <Printer size={16} /> Print answer key
        </button>
      </div>
    </div>
  );
}

/* ───────────── Check My Worksheet ───────────── */

function WorksheetCheck() {
  const [preview, setPreview] = React.useState('');
  const [solution, setSolution] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please upload an image (JPG/PNG) of your worksheet.'); return; }
    if (file.size > 8 * 1024 * 1024) { setError('Image too large — please use one under 8 MB.'); return; }
    setError(''); setSolution('');
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result || ''));
    reader.readAsDataURL(file);
  };
  const evaluate = async () => {
    if (!preview) return;
    setLoading(true); setError('');
    try { setSolution(await evaluateWorksheet(preview)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not evaluate the worksheet. Please try again.'); }
    finally { setLoading(false); }
  };
  return (
    <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="rounded-xl bg-sky-50 p-4 text-xs font-semibold leading-relaxed text-sky-800">
        📸 Snap a photo of any worksheet (questions + your answers). Your AI teacher will solve it step-by-step and explain each answer so you can check your work.
      </div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-primary hover:bg-primary/5">
        <Upload size={28} className="text-slate-400" />
        <span className="text-sm font-bold text-slate-600">Tap to upload worksheet photo</span>
        <span className="text-xs text-slate-400">JPG or PNG, up to 8 MB</span>
        <input type="file" accept="image/*" onChange={onFile} className="hidden" />
      </label>
      {preview && (
        <div className="space-y-3">
          <img loading="lazy" decoding="async" src={preview} alt="Worksheet preview" className="mx-auto max-h-72 rounded-xl border border-slate-200 object-contain" />
          <button type="button" onClick={evaluate} disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:opacity-60">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Your teacher is checking…</> : <><CheckCircle2 size={16} /> Evaluate my worksheet</>}
          </button>
        </div>
      )}
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}
      {solution && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700"><FileText size={16} className="text-primary" /> Solutions &amp; feedback</div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{solution}</div>
        </div>
      )}
    </div>
  );
}

/* ───────────── Weekly parent report ───────────── */

function WeeklyReportCard() {
  const [report, setReport] = React.useState(() => buildWeeklyReport());
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => { setReport(buildWeeklyReport()); }, []);
  if (!report) return null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(report.text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-black text-slate-800"><FileText size={16} className="text-primary" /> Weekly report for parents</h3>
      <p className="mt-1 text-xs font-semibold text-slate-500">A quick summary of this week's homework — copy it to share with a parent.</p>
      <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">{report.text}</pre>
      <button type="button" onClick={copy} className="mt-3 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-900">
        {copied ? '✓ Copied!' : 'Copy report'}
      </button>
    </div>
  );
}

/* ───────────── Shared ───────────── */

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 focus:border-primary focus:outline-none">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
