import React from 'react';
import { BarChart3, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, Clock, Home, Menu, Trophy, X } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import jeeMock1Raw from '../data/jee/mocks/full/mock1.json?raw';
import { MockAnswerStatus, MockAttemptQuestion, recordMockAttempt } from '../lib/mockTestAnalytics';

type MockQuestion = MockAttemptQuestion & {
  difficulty?: string;
  year?: number;
  source?: string;
  exam?: string;
};

type MockPaper = {
  id: string;
  title: string;
  duration: number;
  questions: MockQuestion[];
};

interface MockTestsPageProps {
  currentUser: FirebaseUser | null;
  setTab: (tab: string) => void;
  onExamModeChange: (enabled: boolean) => void;
  onReward: (summary: { scoreGained: number; xpGained: number }) => Promise<void>;
}

const JEE_MOCK_1 = JSON.parse(jeeMock1Raw) as MockPaper;
const EXAM_SECONDS = 180 * 60;

const statusStyle: Record<MockAnswerStatus, string> = {
  answered: 'bg-emerald-500 text-white',
  review: 'bg-amber-400 text-slate-900',
  unanswered: 'bg-rose-500 text-white',
  not_visited: 'bg-white text-slate-500 border border-slate-200',
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${String(m).padStart(2, '0')}:${s}`;
}

function scoreAttempt(questions: MockQuestion[], answers: Record<string, number>) {
  return questions.reduce(
    (acc, question) => {
      const answer = answers[question.id];
      if (answer === undefined) {
        acc.unanswered += 1;
        return acc;
      }
      if (answer === question.correctAnswer) {
        acc.correct += 1;
        acc.score += question.marks || 4;
      } else {
        acc.incorrect += 1;
        acc.score += question.negativeMarks || -1;
      }
      return acc;
    },
    { score: 0, correct: 0, incorrect: 0, unanswered: 0 },
  );
}

function mockXpFor(correct: number, total: number) {
  const accuracy = total ? correct / total : 0;
  const base = 100;
  const correctXp = correct * 5;
  const bonus = accuracy >= 0.9 ? 150 : accuracy >= 0.8 ? 100 : accuracy >= 0.7 ? 50 : 0;
  return base + correctXp + bonus;
}

export default function MockTestsPage({ currentUser, setTab, onExamModeChange, onReward }: MockTestsPageProps) {
  const paper = JEE_MOCK_1;
  const [started, setStarted] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [reviewMode, setReviewMode] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | undefined>(undefined);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [statuses, setStatuses] = React.useState<Record<string, MockAnswerStatus>>({});
  const [timeLeft, setTimeLeft] = React.useState(EXAM_SECONDS);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [xpAward, setXpAward] = React.useState(0);

  const current = paper.questions[currentIndex];
  const result = scoreAttempt(paper.questions, answers);
  const maxScore = paper.questions.reduce((total, question) => total + (question.marks || 4), 0);
  const isLastQuestion = currentIndex === paper.questions.length - 1;
  const accuracy = Math.round((result.correct / paper.questions.length) * 100);

  React.useEffect(() => () => onExamModeChange(false), [onExamModeChange]);

  const visitQuestion = React.useCallback((index: number) => {
    const target = paper.questions[index];
    if (!target) return;
    setCurrentIndex(index);
    setSelected(answers[target.id]);
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [target.id]: currentStatuses[target.id] || 'unanswered',
    }));
  }, [answers, paper.questions]);

  const submitTest = React.useCallback(async (answersToSubmit = answers, statusesToSubmit = statuses) => {
    if (submitted) return;
    const finalStatuses = paper.questions.reduce<Record<string, MockAnswerStatus>>((acc, question) => {
      acc[question.id] = statusesToSubmit[question.id] || 'not_visited';
      return acc;
    }, {});
    const finalResult = scoreAttempt(paper.questions, answersToSubmit);
    recordMockAttempt({
      userId: currentUser?.uid || 'guest',
      exam: 'JEE',
      mockId: paper.id,
      title: paper.title,
      elapsedSeconds: EXAM_SECONDS - timeLeft,
      score: finalResult.score,
      maxScore,
      correct: finalResult.correct,
      incorrect: finalResult.incorrect,
      unanswered: finalResult.unanswered,
      answers: answersToSubmit,
      statuses: finalStatuses,
      questions: paper.questions.map((question) => ({
        id: question.id,
        subject: question.subject,
        chapter: question.chapter,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        marks: question.marks || 4,
        negativeMarks: question.negativeMarks || -1,
      })),
    });
    const gainedXp = mockXpFor(finalResult.correct, paper.questions.length);
    setXpAward(gainedXp);
    await onReward({ scoreGained: Math.max(0, finalResult.score), xpGained: gainedXp });
    setStatuses(finalStatuses);
    setAnswers(answersToSubmit);
    setSubmitted(true);
    setReviewMode(false);
    onExamModeChange(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }, [answers, currentUser?.uid, maxScore, onExamModeChange, onReward, paper, statuses, submitted, timeLeft]);

  React.useEffect(() => {
    if (!started || submitted) return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, submitted]);

  React.useEffect(() => {
    if (started && !submitted && timeLeft === 0) {
      void submitTest();
    }
  }, [started, submitted, submitTest, timeLeft]);

  const saveAndNext = () => {
    const nextAnswers = selected === undefined ? answers : { ...answers, [current.id]: selected };
    const nextStatuses = { ...statuses, [current.id]: selected === undefined ? 'unanswered' as const : 'answered' as const };
    setAnswers(nextAnswers);
    setStatuses(nextStatuses);
    if (isLastQuestion) {
      void submitTest(nextAnswers, nextStatuses);
      return;
    }
    const nextIndex = Math.min(paper.questions.length - 1, currentIndex + 1);
    setCurrentIndex(nextIndex);
    setSelected(nextAnswers[paper.questions[nextIndex].id]);
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [paper.questions[nextIndex].id]: currentStatuses[paper.questions[nextIndex].id] || 'unanswered',
    }));
  };

  const markForReview = () => {
    const nextAnswers = selected === undefined ? answers : { ...answers, [current.id]: selected };
    setAnswers(nextAnswers);
    setStatuses((currentStatuses) => ({ ...currentStatuses, [current.id]: 'review' }));
    const nextIndex = Math.min(paper.questions.length - 1, currentIndex + 1);
    setCurrentIndex(nextIndex);
    setSelected(nextAnswers[paper.questions[nextIndex].id]);
    setStatuses((currentStatuses) => ({
      ...currentStatuses,
      [paper.questions[nextIndex].id]: currentStatuses[paper.questions[nextIndex].id] || 'unanswered',
    }));
  };

  const startTest = () => {
    setStarted(true);
    onExamModeChange(true);
    visitQuestion(0);
    document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  const clearResponse = () => {
    const nextAnswers = { ...answers };
    delete nextAnswers[current.id];
    setAnswers(nextAnswers);
    setSelected(undefined);
    setStatuses((currentStatuses) => ({ ...currentStatuses, [current.id]: 'unanswered' }));
  };

  if (!started) {
    return (
      <main className="space-y-8 pb-12">
        <SEO
          title="JEE Full Mock Test"
          description="Attempt a 75-question, 180-minute JEE full mock test with review palette and instant analysis."
          keywords="JEE full mock test, JEE Main mock test, online JEE MCQ test"
          url="https://YOUR_DOMAIN_HERE/mock-tests"
        />
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary">
              <ClipboardList size={14} />
              Full test mode
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Mock Tests</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Start with the uploaded JEE paper: 75 questions, 25 per subject, 180 minutes, +4 and -1 marking.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{paper.title}</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Physics, Chemistry, Mathematics. Your submitted answers will be available in Progress Hub analysis.
              </p>
            </div>
            <button
              type="button"
              onClick={startTest}
              className="rounded-2xl bg-primary px-7 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20"
            >
              Start JEE Mock
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-4 bg-slate-100 p-3 sm:p-4">
      <SEO
        title={`${paper.title} | Mock Test`}
        description="Take a JEE full mock test with Physics, Chemistry, and Mathematics questions, timed exam mode, scoring, explanations, and analysis."
        url="https://YOUR_DOMAIN_HERE/mock-tests"
      />

      {submitted && !reviewMode ? (
        <ResultScreen
          title={paper.title}
          result={result}
          maxScore={maxScore}
          totalQuestions={paper.questions.length}
          elapsedSeconds={EXAM_SECONDS - timeLeft}
          accuracy={accuracy}
          xpAward={xpAward}
          onReview={() => {
            setReviewMode(true);
            visitQuestion(0);
          }}
          onAnalysis={() => setTab('progress')}
          onHome={() => setTab('home')}
        />
      ) : (
      <>
      <section className="sticky top-0 z-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-slate-900">{paper.title}</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Question {currentIndex + 1} / {paper.questions.length} · {current.subject}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn('flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black', timeLeft < 600 ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-700')}>
              <Clock size={17} />
              {formatTime(timeLeft)}
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              className="rounded-2xl bg-slate-100 p-3 text-slate-600 lg:hidden"
              aria-label="Toggle question palette"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {submitted ? (
              <button type="button" onClick={() => setReviewMode(false)} className="rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
                Score
              </button>
            ) : (
            <button type="button" onClick={() => void submitTest()} className="rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
              Submit
            </button>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <article className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
              {current.subject}
            </span>
            {current.chapter ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {current.chapter}
              </span>
            ) : null}
          </div>

          <h2 className="max-w-4xl text-[17px] font-semibold leading-7 text-slate-900 sm:text-lg">
            {currentIndex + 1}. {current.question}
          </h2>

          <div className="mt-6 grid gap-3">
            {current.options.map((option, optionIndex) => {
              const isSelected = selected === optionIndex;
              const isCorrect = submitted && current.correctAnswer === optionIndex;
              const isWrong = submitted && answers[current.id] === optionIndex && optionIndex !== current.correctAnswer;
              return (
                <button
                  key={`${current.id}-${optionIndex}`}
                  type="button"
                  disabled={submitted}
                  onClick={() => setSelected(optionIndex)}
                  className={cn(
                    'flex items-start gap-3 rounded-2xl border p-4 text-left text-sm font-medium leading-6 transition-all',
                    isSelected ? 'border-primary bg-emerald-50 text-slate-900' : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-primary/40',
                    isCorrect && 'border-emerald-500 bg-emerald-50 text-emerald-800',
                    isWrong && 'border-rose-500 bg-rose-50 text-rose-700',
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-slate-500">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {submitted ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm font-medium leading-7 text-slate-600">
              <div className="mb-2 font-black text-slate-900">
                Solution · Correct option {String.fromCharCode(65 + current.correctAnswer)}
              </div>
              {current.explanation}
            </div>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => visitQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 disabled:opacity-40"
              >
                <ChevronLeft size={15} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => visitQuestion(Math.min(paper.questions.length - 1, currentIndex + 1))}
                disabled={currentIndex === paper.questions.length - 1}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 disabled:opacity-40"
              >
                Next
                <ChevronRight size={15} />
              </button>
            </div>
            {!submitted ? (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={clearResponse} className="rounded-2xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600">
                Clear
              </button>
              <button type="button" onClick={markForReview} className="rounded-2xl bg-amber-400 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-900">
                Mark Review
              </button>
              <button type="button" onClick={saveAndNext} className="rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
                {isLastQuestion ? 'Submit Test' : 'Save & Next'}
              </button>
            </div>
            ) : null}
          </div>
        </article>

        <aside className={cn('rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 lg:block', sidebarOpen ? 'block' : 'hidden')}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Questions</h2>
            <span className="text-xs font-black text-slate-400">{Object.keys(answers).length} saved</span>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
            <Legend color="bg-emerald-500" label="Saved" />
            <Legend color="bg-amber-400" label="Review" />
            <Legend color="bg-rose-500" label="Unanswered" />
            <Legend color="bg-white border border-slate-200" label="Not visited" />
          </div>
          <div className="max-h-[calc(100dvh-300px)] overflow-y-auto pr-1">
            {['Physics', 'Chemistry', 'Mathematics'].map((subject) => (
              <div key={subject} className="mb-5">
                <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{subject}</div>
                <div className="grid grid-cols-5 gap-2">
                  {paper.questions.map((question, questionIndex) => question.subject === subject ? (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => visitQuestion(questionIndex)}
                      className={cn(
                        'flex aspect-square items-center justify-center rounded-xl text-xs font-black transition-all',
                        statusStyle[statuses[question.id] || 'not_visited'],
                        currentIndex === questionIndex && 'ring-2 ring-slate-900 ring-offset-2',
                      )}
                    >
                      {questionIndex + 1}
                    </button>
                  ) : null)}
                </div>
              </div>
            ))}
          </div>
          {submitted ? (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
              <CheckCircle2 className="mb-2" size={20} />
              Review your saved answers and explanations.
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-700">
              <CheckCircle2 className="mb-2" size={20} />
              Save answers before moving if you want them counted.
            </div>
          )}
        </aside>
      </section>
      </>
      )}
    </main>
  );
}

function ResultScreen({
  title,
  result,
  maxScore,
  totalQuestions,
  elapsedSeconds,
  accuracy,
  xpAward,
  onReview,
  onAnalysis,
  onHome,
}: {
  title: string;
  result: { score: number; correct: number; incorrect: number; unanswered: number };
  maxScore: number;
  totalQuestions: number;
  elapsedSeconds: number;
  accuracy: number;
  xpAward: number;
  onReview: () => void;
  onAnalysis: () => void;
  onHome: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl flex-col justify-center rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-10">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-emerald-500/20">
        <Trophy size={30} />
      </div>
      <div className="text-center">
        <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-primary">Test submitted</div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Your attempt has been saved. You can review detailed solutions here or from Progress Hub.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6">
        {[
          { label: 'Score', value: `${result.score}/${maxScore}` },
          { label: 'Accuracy', value: `${accuracy}%` },
          { label: 'Correct', value: result.correct },
          { label: 'Incorrect', value: result.incorrect },
          { label: 'Unanswered', value: result.unanswered },
          { label: 'XP Earned', value: `+${xpAward}` },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</div>
            <div className="mt-1 text-2xl font-black text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-center text-sm font-bold text-slate-500">
        Time taken: {formatTime(elapsedSeconds)} · Questions: {totalQuestions}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button onClick={onAnalysis} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-xs font-black uppercase tracking-widest text-white">
          <BarChart3 size={17} />
          Go to Analysis
        </button>
        <button onClick={onReview} className="rounded-2xl bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white">
          Review Solutions
        </button>
        <button onClick={onHome} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-600">
          <Home size={17} />
          Exit
        </button>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-3 w-3 rounded', color)} />
      {label}
    </div>
  );
}
