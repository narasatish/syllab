/**
 * Formula Bank — Class-wise formulas for Maths, Physics, Chemistry, Aptitude.
 * Rendered as a section within the Exams Hub.
 */
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import { FORMULA_BANK, type FormulaSubject } from '../data/formulaBank';
import { cn } from '../lib/utils';

type SubjectId = FormulaSubject['id'];

export default function FormulaBank() {
  const [activeSubject, setActiveSubject] = useState<SubjectId>('maths');
  const [activeClass, setActiveClass] = useState(0);
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const subject = FORMULA_BANK.find((s) => s.id === activeSubject)!;
  const section = subject.sections[activeClass];

  // When subject changes, reset class index
  const handleSubjectChange = (id: SubjectId) => {
    setActiveSubject(id);
    setActiveClass(0);
    setOpenTopics(new Set());
    setSearchQuery('');
  };

  const toggleTopic = (key: string) => {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Search: filter across all sections of the active subject
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const results: { topic: string; items: typeof section.topics[0]['items'] }[] = [];
    subject.sections.forEach((sec) => {
      sec.topics.forEach((t) => {
        const matched = t.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.formula.toLowerCase().includes(q) ||
            item.variables.toLowerCase().includes(q),
        );
        if (matched.length) results.push({ topic: `[${sec.classLabel}] ${t.topic}`, items: matched });
      });
    });
    return results;
  }, [searchQuery, subject]);

  return (
    <section className="space-y-6">
      {/* Subject picker */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FORMULA_BANK.map((sub) => (
          <button
            key={sub.id}
            type="button"
            onClick={() => handleSubjectChange(sub.id)}
            className={cn(
              'rounded-2xl p-4 text-left transition-all border-2',
              activeSubject === sub.id
                ? `bg-gradient-to-br ${sub.gradient} text-white border-transparent shadow-lg`
                : 'bg-white border-slate-100 hover:border-slate-200 shadow',
            )}
          >
            <div className="text-2xl mb-1">{sub.icon}</div>
            <div className={cn('text-xs font-black uppercase tracking-widest', activeSubject === sub.id ? 'text-white/80' : 'text-slate-400')}>
              {sub.label}
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${subject.label} formulas…`}
          className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 pl-10 pr-10 text-sm font-medium focus:border-indigo-400 outline-none"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search results */}
      {searchResults !== null ? (
        <div className="space-y-3">
          {searchResults.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-sm font-bold text-slate-400 shadow">No formulas found for "{searchQuery}"</div>
          ) : (
            searchResults.map((group) => (
              <div key={group.topic} className="rounded-2xl bg-white shadow p-5">
                <p className={cn('mb-3 text-[11px] font-black uppercase tracking-widest', subject.textColor)}>{group.topic}</p>
                <FormulaGrid items={group.items} subject={subject} />
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          {/* Class range tabs */}
          <div className="flex flex-wrap gap-2">
            {subject.sections.map((sec, i) => (
              <button
                key={sec.classLabel}
                type="button"
                onClick={() => { setActiveClass(i); setOpenTopics(new Set()); }}
                className={cn(
                  'rounded-2xl px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all',
                  activeClass === i
                    ? `bg-gradient-to-r ${subject.gradient} text-white shadow`
                    : 'bg-white text-slate-500 shadow hover:bg-slate-50',
                )}
              >
                {sec.classLabel}
              </button>
            ))}
          </div>

          {/* Topics */}
          <div className="space-y-3">
            {section.topics.map((topicData, ti) => {
              const key = `${activeSubject}-${activeClass}-${ti}`;
              const isOpen = openTopics.has(key);
              return (
                <div key={key} className="rounded-2xl bg-white shadow overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleTopic(key)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('h-2 w-2 rounded-full', `bg-gradient-to-r ${subject.gradient}`)} />
                      <span className="text-base font-black text-slate-800">{topicData.topic}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-500">
                        {topicData.items.length} formulas
                      </span>
                    </div>
                    {isOpen ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 px-6 pb-5 pt-4">
                      <FormulaGrid items={topicData.items} subject={subject} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

function FormulaGrid({
  items,
  subject,
}: {
  items: { name: string; formula: string; variables: string; example?: string }[];
  subject: FormulaSubject;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm"
        >
          <p className={cn('mb-2 text-[11px] font-black uppercase tracking-widest', subject.textColor)}>
            {item.name}
          </p>
          <div className={cn(
            'rounded-lg px-4 py-2.5 font-mono text-sm font-black text-center',
            `bg-gradient-to-r ${subject.gradient} text-white`,
          )}>
            {item.formula}
          </div>
          {item.variables && (
            <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">{item.variables}</p>
          )}
          {item.example && (
            <p className="mt-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 border border-amber-100">
              💡 {item.example}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
