import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Bot, User, Loader2, Send, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import Markdown from 'react-markdown';
import { User as FirebaseUser } from 'firebase/auth';
import { askTutor, ChatTurn } from '../lib/api';
import { weakChapters, recentChapters, masteryPct, loadLastPlan } from '../lib/studyPlan';

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface TutorPageProps {
  currentUser: FirebaseUser | null;
  userClass?: string;
  floating?: boolean;
  onClose?: () => void;
}

/**
 * Builds a personalised profile for the logged-in student from what Syllab
 * already knows locally — their class + Study Room memory (weak chapters,
 * recent activity, mastery). This is prepended to the tutor prompt so answers
 * adapt to the student's level and struggles, WITHOUT any backend change.
 * Returns null when there's nothing personal to say (fresh / logged-out user).
 */
interface TutorProfile {
  /** Hidden context prepended to the prompt sent to the AI (not shown in chat). */
  preamble: string;
  /** One-line greeting extension shown in the chat, or ''. */
  greetingLine: string;
  /** Suggested quick-start questions based on weak chapters. */
  suggestions: string[];
}

function buildTutorProfile(userClass?: string): TutorProfile | null {
  let weak: ReturnType<typeof weakChapters> = [];
  let recent: ReturnType<typeof recentChapters> = [];
  let lastPlan: ReturnType<typeof loadLastPlan> = null;
  try {
    weak = weakChapters(3);
    recent = recentChapters(4);
    lastPlan = loadLastPlan();
  } catch { /* storage unavailable — treat as no profile */ }

  // Best available class signal: explicit prop → last study plan → recent memory.
  const cls = userClass || (lastPlan?.classLevel ? String(lastPlan.classLevel) : '') || recent[0]?.classLevel || '';
  if (!cls && !weak.length && !recent.length) return null;

  const facts: string[] = [];
  if (cls) facts.push(`The student is in Class ${cls} (CBSE / NCERT syllabus, India).`);
  if (weak.length) {
    const list = weak.map((c) => `${c.title} (${masteryPct(c)}% mastery)`).join(', ');
    facts.push(`They are currently WEAK in: ${list}. Explain these areas extra carefully and check understanding.`);
  }
  if (recent.length) {
    facts.push(`Recently studied: ${recent.map((c) => c.title).join(', ')}.`);
  }

  const preamble =
    `[STUDENT PROFILE — use this to personalise your answer; do not repeat it back verbatim. ` +
    facts.join(' ') +
    ` Match your explanation to a Class ${cls || 'school'} level, use simple language and real-life Indian examples, ` +
    `and connect new ideas to what they already know. Keep it warm, encouraging and interactive.]`;

  const greetingLine = cls
    ? `I'm tuned to your **Class ${cls}** syllabus${weak.length ? ` — and I know **${weak[0].title}** has been tricky, so we can start there.` : '.'}`
    : (weak.length ? `I remember **${weak[0].title}** was tricky for you — want to start there?` : '');

  const suggestions = weak.slice(0, 2).map((c) => `Explain ${c.title} simply with an example`);
  if (cls) suggestions.push(`Give me a quick quiz for Class ${cls}`);

  return { preamble, greetingLine, suggestions };
}

export default function TutorPage({ currentUser, userClass, floating = false, onClose }: TutorPageProps) {
  const displayName = currentUser?.displayName?.split(' ')[0] || 'Student';
  const profile = useMemo(
    () => (currentUser ? buildTutorProfile(userClass) : null),
    [currentUser, userClass],
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `Hello ${displayName}! I'm your Syllab AI Tutor. ${profile?.greetingLine || 'How can I help you today?'}`,
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  // If auth / study memory resolves after mount and the chat is still on its
  // opening line, refresh the greeting so returning students see it personalise.
  useEffect(() => {
    if (!profile?.greetingLine) return;
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0].role !== 'model') return prev;
      return [{
        ...prev[0],
        content: `Hello ${displayName}! I'm your Syllab AI Tutor. ${profile.greetingLine}`,
      }];
    });
  }, [profile, displayName]);

  const send = async (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = { role: 'user', content: trimmed, timestamp: new Date() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    const history: ChatTurn[] = messages
      .slice(1)
      .map((m) => ({ role: m.role, parts: [{ text: m.content }] }));

    // Personalise only the FIRST question (once the AI has the profile it carries
    // through history); the visible chat always shows the student's raw words.
    const isFirstQuestion = messages.length <= 1;
    const outbound = profile && isFirstQuestion ? `${profile.preamble}\n\n${trimmed}` : trimmed;

    try {
      const text = await askTutor(outbound, history);
      setMessages([...nextMessages, { role: 'model', content: text, timestamp: new Date() }]);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Server error';
      setMessages([
        ...nextMessages,
        { role: 'model', content: `⚠️ ${msg}`, timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => send(input);

  return (
    <div className={cn(
      'flex flex-col bg-white shadow-xl border overflow-hidden',
      floating
        ? 'h-full rounded-3xl'
        : 'h-[calc(100vh-140px)] rounded-[2.5rem] mt-4',
    )}>
      <div className={cn('border-b flex items-center justify-between bg-slate-50', floating ? 'p-4' : 'p-6')}>
        <div className="flex items-center gap-4">
          <div className={cn('bg-primary rounded-2xl flex items-center justify-center text-white', floating ? 'h-10 w-10' : 'w-12 h-12')}>
            <Bot size={floating ? 20 : 24} />
          </div>
          <div>
            <h2 className={cn('font-black text-slate-800', floating ? 'text-base' : 'text-xl')}>Syllab Mentor</h2>
            <p className="text-xs text-slate-400">Online & Ready</p>
          </div>
        </div>
        {floating && onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-white hover:text-slate-800"
            aria-label="Close AI tutor"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div ref={scrollRef} className={cn('flex-1 overflow-y-auto space-y-6', floating ? 'p-4' : 'p-6')}>
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex gap-4',
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row',
              )}
            >
              <div
                className={cn(
                  'h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-white',
                  message.role === 'user' ? 'bg-emerald-600' : 'bg-slate-800',
                )}
              >
                {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>

              <div className="max-w-[85%]">
                <div
                  className={cn(
                    'rounded-xl border text-sm leading-relaxed',
                    floating ? 'p-3' : 'p-4',
                    message.role === 'user' ? 'bg-primary text-white' : 'bg-white text-slate-700',
                  )}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800 text-white flex items-center justify-center rounded-xl">
                <Bot size={20} />
              </div>
              <div className="bg-white border p-4 rounded-xl flex items-center gap-2">
                <Loader2 className="animate-spin" />
                Thinking...
              </div>
            </div>
          )}
        </div>
      </div>

      {profile && profile.suggestions.length > 0 && messages.length <= 1 ? (
        <div className={cn('border-t bg-slate-50/60', floating ? 'px-4 pt-3' : 'px-6 pt-4')}>
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
            {profile.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                disabled={isTyping}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className={cn('border-t bg-slate-50', floating ? 'p-4' : 'p-6')}>
        <div className="max-w-3xl mx-auto relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="w-full border rounded-xl py-3 pl-4 pr-14 text-sm outline-none focus:border-primary"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 flex h-8 w-10 items-center justify-center rounded-lg bg-primary text-white disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
