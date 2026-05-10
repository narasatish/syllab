import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Loader2, Send, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import Markdown from 'react-markdown';
import { User as FirebaseUser } from 'firebase/auth';
import { askTutor, ChatTurn } from '../lib/api';

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface TutorPageProps {
  currentUser: FirebaseUser | null;
  floating?: boolean;
  onClose?: () => void;
}

export default function TutorPage({ currentUser, floating = false, onClose }: TutorPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `Hello ${currentUser?.displayName || 'Student'}! I'm your Syllab AI Tutor. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    const history: ChatTurn[] = messages
      .slice(1)
      .map((m) => ({ role: m.role, parts: [{ text: m.content }] }));

    try {
      const text = await askTutor(input, history);
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
