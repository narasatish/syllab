/**
 * TaskChecklist — break today's goal into 2–3 tickable tasks. Controlled by the
 * Study Room so the end-of-session recap can report how many were finished.
 */
import { useState } from 'react';
import { Plus, Check, X, ListTodo } from 'lucide-react';

export interface SessionTask { id: string; text: string; done: boolean; }

interface Props {
  tasks: SessionTask[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function TaskChecklist({ tasks, onAdd, onToggle, onRemove }: Props) {
  const [text, setText] = useState('');
  const add = () => { const t = text.trim(); if (t) { onAdd(t); setText(''); } };
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white/50"><ListTodo size={13} /> Today&apos;s tasks</span>
        {tasks.length ? <span className="text-xs font-bold text-emerald-300">{doneCount}/{tasks.length} done</span> : null}
      </div>

      <ul className="space-y-1.5">
        {tasks.map((t) => (
          <li key={t.id} className="group flex items-center gap-2">
            <button
              onClick={() => onToggle(t.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${t.done ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-white/30 hover:border-white/60'}`}
            >
              {t.done ? <Check size={13} /> : null}
            </button>
            <span className={`flex-1 text-sm ${t.done ? 'text-white/40 line-through' : 'text-white/90'}`}>{t.text}</span>
            <button onClick={() => onRemove(t.id)} className="shrink-0 text-white/30 opacity-0 transition-opacity hover:text-white/70 group-hover:opacity-100"><X size={14} /></button>
          </li>
        ))}
      </ul>

      {tasks.length < 6 ? (
        <div className="mt-2 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
            placeholder="Add a task…"
            className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white placeholder-white/40 outline-none focus:border-emerald-400"
          />
          <button onClick={add} disabled={!text.trim()} className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white disabled:opacity-40"><Plus size={16} /></button>
        </div>
      ) : null}
    </div>
  );
}
