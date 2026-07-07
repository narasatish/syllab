/**
 * Prompt Lab — the hands-on half of Syllab's AI-literacy offering. The /ai-hub
 * articles TEACH prompting; this page lets students PRACTISE it: pick a real study
 * task, write a prompt, and get instant AI coaching on the prompt itself (what's
 * good, what to improve) plus a model prompt and the actual answer. One askTutor
 * call per attempt keeps it free. Complements — does not duplicate — the AI Tutor.
 */
import { useCallback, useMemo, useState } from 'react';
import { Sparkles, ArrowRight, Wand2, Lightbulb, RotateCcw, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import AnswerMarkdown from '../components/AnswerMarkdown';
import { askTutor } from '../lib/api';

const SITE = 'https://syllab.in';

interface Task { id: string; emoji: string; title: string; brief: string; starter: string; }

const TASKS: Task[] = [
  { id: 'explain-simple', emoji: '💡', title: 'Explain a hard topic simply', brief: 'Get AI to explain a concept in a way you actually understand.', starter: 'Explain photosynthesis to me like I am in Class 7, with one real-life example.' },
  { id: 'study-plan', emoji: '🗓️', title: 'Make a study plan', brief: 'Ask AI to plan your revision before an exam.', starter: 'Make me a 2-week revision plan for Class 10 Science before my board exam. I am weak in Chemistry.' },
  { id: 'practice-questions', emoji: '📝', title: 'Generate practice questions', brief: 'Get exam-style questions to test yourself.', starter: 'Give me 5 board-exam-style questions on Trigonometry (Class 10) with answers.' },
  { id: 'fix-mistake', emoji: '🔎', title: 'Understand your mistake', brief: 'Ask AI why an answer is wrong, not just what is right.', starter: 'I answered that the sun is a planet. Explain why that is wrong and what the sun actually is.' },
  { id: 'summarise', emoji: '📄', title: 'Summarise a chapter', brief: 'Turn a long chapter into quick revision points.', starter: 'Summarise the key points of the chapter "The French Revolution" (Class 9 History) in 8 bullet points.' },
];

// One coaching prompt: rate the student's prompt, show a better version, then answer it.
const coachPrompt = (task: Task, userPrompt: string) =>
  `You are a friendly prompt-writing coach for an Indian school student. Their task: "${task.title}". ` +
  `The prompt they wrote is:\n"""${userPrompt}"""\n\n` +
  `Reply in EXACTLY these three markdown sections, using these headings:\n` +
  `### Your prompt: what's good & what to improve\n(2-4 short, encouraging lines. Mention if it is specific, gives context like class/subject, and states the format wanted.)\n` +
  `### A stronger prompt you could use\n(rewrite their prompt as one clear, specific prompt in a code block)\n` +
  `### The answer\n(now actually answer their prompt as a helpful tutor, accurately and concisely).`;

const TIPS = [
  'Be specific — say the class, subject and chapter (e.g. "Class 10 Maths, Real Numbers").',
  'Give context — tell the AI what you already know and where you are stuck.',
  'Ask for a format — "in 5 bullet points", "with a worked example", "like I am 12".',
  'Iterate — if the answer is not quite right, reply and refine instead of starting over.',
];

export default function PromptLab({ setTab }: { setTab: (tab: string) => void }) {
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const task = useMemo(() => TASKS.find((t) => t.id === taskId) || TASKS[0], [taskId]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const pickTask = (id: string) => { setTaskId(id); setPrompt(''); setResult(null); };
  const useStarter = () => setPrompt(task.starter);

  const submit = useCallback(async () => {
    const p = prompt.trim();
    if (!p || loading) return;
    setLoading(true); setResult(null);
    try {
      const r = (await askTutor(coachPrompt(task, p))).trim();
      setResult(r || 'Could not get feedback — please try again.');
      setAttempts((n) => n + 1);
    } catch {
      setResult('Could not reach the AI right now — please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }, [prompt, loading, task]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="AI Prompt Lab — Practise Writing AI Prompts (Free) | Syllab.in"
        description="Free hands-on AI prompt practice for students. Pick a study task, write a prompt, and get instant AI coaching on how to prompt better — plus a model prompt and the answer. Learn prompt engineering by doing."
        keywords="ai prompt practice, prompt engineering for students, how to write ai prompts, learn prompting free, ai literacy for students, chatgpt prompts for studying, prompt writing practice India"
        url={`${SITE}/prompt-lab`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'LearningResource', name: 'AI Prompt Lab', description: 'Interactive practice for writing effective AI prompts, with instant AI feedback.', learningResourceType: 'Interactive tool', educationalUse: 'Practice', inLanguage: 'en-IN', isAccessibleForFree: true, url: `${SITE}/prompt-lab` }}
      />
      <PageHero emoji="🧪" title="AI Prompt Lab" subtitle="Learn to talk to AI the smart way — pick a task, write a prompt, get instant coaching." className="mb-6" />

      <div className="mb-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-sm text-indigo-900">
        <p className="flex items-start gap-2"><Lightbulb size={16} className="mt-0.5 shrink-0 text-indigo-500" /> Good prompting is a real skill for school, college and future jobs. Try a task below — the AI will rate your prompt, show a stronger version, then answer it.</p>
        <button onClick={() => setTab('ai_hub')} className="mt-2 inline-flex items-center gap-1 text-xs font-black text-indigo-600 hover:underline"><BookOpen size={13} /> Read the AI-for-students guides →</button>
      </div>

      {/* Task picker */}
      <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">Pick a task</p>
      <div className="mb-5 grid gap-2 sm:grid-cols-2">
        {TASKS.map((t) => (
          <button key={t.id} onClick={() => pickTask(t.id)}
            className={`rounded-2xl border-2 p-3 text-left transition-colors ${t.id === taskId ? 'border-primary bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
            <span className="block font-black text-slate-800">{t.emoji} {t.title}</span>
            <span className="text-xs font-medium text-slate-500">{t.brief}</span>
          </button>
        ))}
      </div>

      {/* Prompt input */}
      <label className="mb-1.5 flex items-center justify-between text-xs font-black uppercase tracking-wide text-slate-400">
        Your prompt
        <button onClick={useStarter} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600 hover:bg-slate-200"><Wand2 size={12} /> Use an example</button>
      </label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Write a prompt for: ${task.title}…`}
        rows={4}
        className="w-full resize-y rounded-2xl border-2 border-slate-100 bg-white p-3 text-sm text-slate-800 focus:border-primary focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button onClick={() => void submit()} disabled={loading || !prompt.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-600 disabled:opacity-50">
          <Sparkles size={15} /> {loading ? 'Coaching your prompt…' : 'Get AI feedback'}
        </button>
        {result ? (
          <button onClick={() => { setPrompt(''); setResult(null); }} className="inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><RotateCcw size={13} /> Try another</button>
        ) : null}
        {attempts > 0 ? <span className="text-xs font-bold text-emerald-600">🔥 {attempts} prompt{attempts > 1 ? 's' : ''} practised</span> : null}
      </div>

      {/* Result */}
      {result ? (
        <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <AnswerMarkdown text={result} />
        </div>
      ) : null}

      {/* Tips */}
      <div className="mt-8 rounded-2xl bg-slate-50 p-4">
        <p className="mb-2 text-sm font-black text-slate-800">4 rules for a great prompt</p>
        <ul className="space-y-1.5">
          {TIPS.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600"><span className="font-black text-primary">{i + 1}.</span> {t}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4">
        <p className="flex-1 text-sm font-bold text-emerald-800">Want the AI to actually tutor you on a chapter? Try the free AI Tutor.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">AI Tutor <ArrowRight size={15} /></button>
      </div>
    </div>
  );
}
