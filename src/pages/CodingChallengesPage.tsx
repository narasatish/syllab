/**
 * CodingChallengesPage.tsx — /coding-challenges
 * Interactive JavaScript coding challenges with sandbox execution.
 * Includes 5 sample challenges inline for standalone operation.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  Code2,
  ChevronRight,
  Play,
  Check,
  Lightbulb,
  Trophy,
} from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';

interface CodingChallenge {
  id: string;
  title: string;
  story: string;
  task: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  xp: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  classLevels: number[];
}

const SAMPLE_CHALLENGES: CodingChallenge[] = [
  {
    id: 'hello-india',
    title: 'Hello India!',
    story: 'Your robot needs to introduce itself to India.',
    task: 'Print "Namaste India!" to the console.',
    starterCode: '// Write your code here\n',
    expectedOutput: 'Namaste India!',
    hints: ['Use console.log()', 'Put the text in quotes'],
    xp: 10,
    difficulty: 'beginner',
    classLevels: [5, 6, 7],
  },
  {
    id: 'sum-calculator',
    title: 'Cricket Score Sum',
    story: 'Virat scored 45 runs and Rohit scored 67. Find their total.',
    task: 'Declare two variables and print their sum.',
    starterCode: 'let virat = 45;\nlet rohit = 67;\n// Print their total',
    expectedOutput: '112',
    hints: ['Use let to declare variables', 'Use + to add', 'console.log(virat + rohit)'],
    xp: 15,
    difficulty: 'beginner',
    classLevels: [5, 6, 7],
  },
  {
    id: 'diwali-lights',
    title: 'Diwali Light Pattern',
    story: 'Program 5 diya lamps to light up for Diwali!',
    task: 'Use a for loop to print "🪔 Diya X lit!" for X = 1 to 5.',
    starterCode: 'for (let i = 1; i <= 5; i++) {\n  // print the message\n}',
    expectedOutput: '🪔 Diya 1 lit!\n🪔 Diya 2 lit!\n🪔 Diya 3 lit!\n🪔 Diya 4 lit!\n🪔 Diya 5 lit!',
    hints: ['Use console.log() inside the loop', 'Use template literals: `🪔 Diya ${i} lit!`'],
    xp: 25,
    difficulty: 'beginner',
    classLevels: [6, 7, 8],
  },
  {
    id: 'even-odd',
    title: 'Even or Odd Checker',
    story: 'The robot needs to sort numbers at a space station.',
    task: 'Write a function isEven(n) that returns "Even" or "Odd". Test it with 4 and 7.',
    starterCode: 'function isEven(n) {\n  // return "Even" or "Odd"\n}\nconsole.log(isEven(4));\nconsole.log(isEven(7));',
    expectedOutput: 'Even\nOdd',
    hints: ['Use the % operator (modulus)', 'if (n % 2 === 0) means even', 'Use return to send the answer back'],
    xp: 30,
    difficulty: 'intermediate',
    classLevels: [7, 8, 9],
  },
  {
    id: 'fizzbuzz-india',
    title: 'FizzBuzz for ISRO',
    story: 'ISRO needs to test rockets numbered 1–15. Print Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for both.',
    task: 'Print numbers 1-15 with Fizz/Buzz/FizzBuzz replacements.',
    starterCode: 'for (let i = 1; i <= 15; i++) {\n  // your logic here\n}',
    expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
    hints: ['Check divisible by 15 FIRST (FizzBuzz)', 'Then check 3 (Fizz)', 'Then check 5 (Buzz)', 'Otherwise print the number'],
    xp: 40,
    difficulty: 'intermediate',
    classLevels: [8, 9, 10],
  },
];

function runJSSafely(code: string): string {
  const logs: string[] = [];
  try {
    const fn = new Function('console', code);
    fn({ log: (...args: unknown[]) => logs.push(args.map(String).join(' ')) });
  } catch (e) {
    return `Error: ${(e as Error).message}`;
  }
  return logs.join('\n');
}

interface ChallengeModalProps {
  challenge: CodingChallenge;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (challengeId: string) => void;
  isCompleted: boolean;
}

function ChallengeModal({ challenge, isOpen, onClose, onComplete }: ChallengeModalProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const handleRun = () => {
    const result = runJSSafely(code);
    setOutput(result);
  };

  const handleCheck = () => {
    const trimmedOutput = output.trim();
    const trimmedExpected = challenge.expectedOutput.trim();
    if (trimmedOutput === trimmedExpected) {
      setFeedback('correct');
      onComplete(challenge.id);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleShowNextHint = () => {
    if (currentHintIndex < challenge.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    } else {
      setCurrentHintIndex(0);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCode(challenge.starterCode);
      setOutput('');
      setShowHints(false);
      setCurrentHintIndex(0);
      setFeedback('idle');
    }
  }, [isOpen, challenge.starterCode]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-3xl font-black text-slate-900">{challenge.title}</h2>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-black',
                    challenge.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-700' :
                    challenge.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  )}>
                    {challenge.difficulty}
                  </span>
                  <span className="ml-auto text-lg font-black text-yellow-500">+{challenge.xp} XP</span>
                </div>
                <p className="text-slate-600 font-medium">{challenge.story}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Task */}
            <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-sm font-semibold text-slate-600">Task</p>
              <p className="text-slate-900 font-medium mt-2">{challenge.task}</p>
            </div>

            {/* Code Editor */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-600 mb-3">Write your code:</p>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 p-4 rounded-2xl font-mono text-sm bg-slate-900 text-emerald-400 border border-slate-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Run Button */}
            <div className="mb-6">
              <button
                onClick={handleRun}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-black hover:bg-primary-dark transition-colors"
              >
                <Play size={18} />
                Run Code
              </button>
            </div>

            {/* Output */}
            {output && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-700">
                <p className="text-xs font-black text-slate-400 uppercase mb-2">Output</p>
                <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap break-words">
                  {output}
                </pre>
              </div>
            )}

            {/* Check Answer Button */}
            {output && (
              <div className="mb-6">
                <button
                  onClick={handleCheck}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-black hover:bg-emerald-600 transition-colors"
                >
                  <Check size={18} />
                  Check Answer
                </button>
              </div>
            )}

            {/* Feedback */}
            {feedback === 'correct' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200"
              >
                <p className="text-emerald-700 font-black text-lg">
                  ✅ Correct! +{challenge.xp} XP
                </p>
                <p className="text-emerald-600 text-sm mt-2">Great job! You've completed this challenge.</p>
              </motion.div>
            )}

            {feedback === 'incorrect' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200"
              >
                <p className="text-red-700 font-black text-lg">❌ Not quite. Try again.</p>
                <p className="text-red-600 text-sm mt-2">Your output doesn't match the expected output yet.</p>
              </motion.div>
            )}

            {/* Hints */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-amber-700 font-black hover:text-amber-900"
              >
                <Lightbulb size={18} />
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </button>
              {showHints && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-amber-700 mb-2">
                    Hint {currentHintIndex + 1} of {challenge.hints.length}
                  </p>
                  <p className="text-amber-600 text-sm mb-3">{challenge.hints[currentHintIndex]}</p>
                  {challenge.hints.length > 1 && (
                    <button
                      onClick={handleShowNextHint}
                      className="text-xs font-black text-amber-700 hover:text-amber-900 underline"
                    >
                      Next Hint →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface CodingChallengesPageProps {
  currentUser?: FirebaseUser | null;
}

export default function CodingChallengesPage({}: CodingChallengesPageProps) {
  const [difficulty, setDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [totalXp, setTotalXp] = useState(0);

  useEffect(() => {
    try {
      const completed = JSON.parse(localStorage.getItem('syllab_challenges_completed') || '[]');
      setCompletedChallenges(new Set(completed));
      const xp = completed.reduce((sum: number, id: string) => {
        const challenge = SAMPLE_CHALLENGES.find(c => c.id === id);
        return sum + (challenge?.xp || 0);
      }, 0);
      setTotalXp(xp);
    } catch {
      // Ignore parsing errors
    }
  }, []);

  const filteredChallenges = difficulty === 'all'
    ? SAMPLE_CHALLENGES
    : SAMPLE_CHALLENGES.filter(c => c.difficulty === difficulty);

  const handleComplete = (challengeId: string) => {
    const challenge = SAMPLE_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge || completedChallenges.has(challengeId)) return;

    const updated = new Set(completedChallenges);
    updated.add(challengeId);
    setCompletedChallenges(updated);
    setTotalXp(totalXp + challenge.xp);

    try {
      localStorage.setItem('syllab_challenges_completed', JSON.stringify(Array.from(updated)));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <>
      <SEO
        title="Free Coding Challenges for Students | JavaScript Python | Syllab.in"
        description="Practice coding with free interactive challenges for Indian students. Run JavaScript code in your browser, earn XP, and level up your programming skills."
        keywords="coding challenges for students India, JavaScript practice problems, coding games for kids, programming challenges Class 8 9 10"
      />

      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Coding Challenges 🎯</h1>
            <div className="rounded-2xl bg-yellow-100 px-4 py-2 font-black text-yellow-700">
              {totalXp} XP Earned
            </div>
          </div>
          <p className="text-lg text-slate-600 font-medium">
            Practice JavaScript with interactive, story-driven challenges. Run code in your browser and earn XP!
          </p>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {['all', 'beginner', 'intermediate', 'advanced'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d as any)}
              className={cn(
                'px-6 py-2 rounded-2xl font-black text-sm transition-all',
                difficulty === d
                  ? 'bg-primary text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredChallenges.map((challenge) => (
            <motion.button
              key={challenge.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedChallenge(challenge)}
              className={cn(
                'p-6 rounded-2xl text-left transition-all border-2',
                completedChallenges.has(challenge.id)
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-primary hover:shadow-lg hover:shadow-emerald-500/10'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-black text-slate-900">{challenge.title}</h3>
                {completedChallenges.has(challenge.id) && (
                  <Trophy size={20} className="text-emerald-600" />
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{challenge.story}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-black',
                    challenge.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-700' :
                    challenge.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  )}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-sm font-black text-yellow-600">+{challenge.xp} XP</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Code2 size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-semibold">No challenges in this category yet.</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          isOpen={!!selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          onComplete={handleComplete}
          isCompleted={completedChallenges.has(selectedChallenge.id)}
        />
      )}
    </>
  );
}
