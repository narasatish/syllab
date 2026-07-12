/**
 * StudyChat — a text AI tutor ("Sahay") inside the Study Room. Ask anything,
 * get a clear, school-friendly answer. Uses the same askTutor backend as the
 * main AI Tutor. Context (class/subject/chapters) is fed in so answers stay
 * relevant. Read-aloud is optional via the speaker button.
 */
import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Volume2 } from 'lucide-react';
import { askTutor } from '../lib/api';

interface Msg { role: 'user' | 'bot'; text: string; }
interface Props { context?: string; }

function speak(text: string) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = 'en-IN'; u.rate = 1;
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}

export default function StudyChat({ context }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: "Hi, I'm Sahay 🤖 — your study buddy. Ask me anything about what you're studying and I'll explain it simply." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [msgs, loading]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput('');
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const prompt =
        (context ? `The student is studying: ${context}. ` : '') +
        `Question: ${q}. Answer clearly and simply for a school student in 2–5 short sentences. Use an example if it helps.`;
      const reply = await askTutor(prompt);
      setMsgs((m) => [...m, { role: 'bot', text: (reply || '').trim() || "Sorry, I couldn't answer that — try rephrasing?" }]);
    } catch {
      setMsgs((m) => [...m, { role: 'bot', text: 'I had trouble reaching the tutor. Please check your connection and try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[360px] flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><Bot size={16} /></span>
        <div>
          <p className="text-sm font-black leading-none">Ask Sahay</p>
          <p className="text-[11px] text-white/50">Your AI study tutor — type your doubt</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === 'user' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/90'}`}>
              {m.text}
              {m.role === 'bot' && i > 0 ? (
                <button onClick={() => speak(m.text)} className="ml-2 inline-flex align-middle text-white/40 hover:text-white/80" title="Read aloud"><Volume2 size={13} /></button>
              ) : null}
            </div>
          </div>
        ))}
        {loading ? <div className="flex justify-start"><div className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-white/60">Sahay is thinking…</div></div> : null}
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') void send(); }}
          placeholder="Ask a question…"
          className="flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-emerald-400"
        />
        <button onClick={() => void send()} disabled={loading || !input.trim()} className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3 py-2 text-white hover:bg-emerald-400 disabled:opacity-40"><Send size={15} /></button>
      </div>
    </div>
  );
}
