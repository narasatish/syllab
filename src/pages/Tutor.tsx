import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Loader2 } from 'lucide-react';
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
}

export default function TutorPage({ currentUser }: TutorPageProps) {
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
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-[2.5rem] shadow-xl border overflow-hidden mt-4">
      <div className="p-6 border-b flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">Syllab Mentor</h2>
            <p className="text-xs text-slate-400">Online & Ready</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
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
                  'w-10 h-10 rounded-xl flex items-center justify-center text-white',
                  message.role === 'user' ? 'bg-emerald-600' : 'bg-slate-800',
                )}
              >
                {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>

              <div className="max-w-[85%]">
                <div
                  className={cn(
                    'p-4 rounded-xl border',
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

      <div className="p-6 border-t bg-slate-50">
        <div className="max-w-3xl mx-auto relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="w-full border rounded-xl py-3 pl-4 pr-20"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}