import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, BookOpen, Target, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SYLLABUS } from '../data/syllabus';
import { cn } from '../lib/utils';

interface SearchResult {
  id: string;
  title: string;
  type: 'chapter' | 'topic' | 'exam';
  subject?: string;
  classLevel?: string;
}

export default function GlobalSearch({ onSelect }: { onSelect?: (id: string, tab: string) => void }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = React.useMemo((): SearchResult[] => {
    if (query.length < 2) return [];

    return SYLLABUS.filter(chapter => {
      const matchesQuery = chapter.title.toLowerCase().includes(query.toLowerCase()) || 
                          chapter.topics.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesFilter = activeFilter === 'all' || chapter.subject === activeFilter;
      return matchesQuery && matchesFilter;
    }).slice(0, 8).map(ch => ({
      id: ch.id,
      title: ch.title,
      type: 'chapter' as const,
      subject: ch.subject,
      classLevel: ch.classLevel
    }));
  }, [query, activeFilter]);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto z-50">
      <div className={cn(
        "relative flex items-center transition-all duration-300",
        isOpen ? "scale-105" : "scale-100"
      )}>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search chapters, topics, or AI hacks..."
          className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl py-4 pl-14 pr-12 text-secondary font-medium shadow-xl shadow-slate-200/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
        />
        <SearchIcon className="absolute left-5 text-slate-400" size={24} />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query.length > 0 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] border border-slate-100 shadow-2xl overflow-hidden glass"
          >
            <div className="p-4 border-b border-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
              {['all', ...Array.from(new Set(SYLLABUS.map((chapter) => chapter.subject)))].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    activeFilter === filter 
                      ? "bg-primary text-white shadow-lg shadow-emerald-500/30" 
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
              {results.length > 0 ? (
                results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => {
                      onSelect?.(result.id, 'syllabus');
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        {result.type === 'chapter' ? <BookOpen size={20} /> : <Sparkles size={20} />}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{result.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{result.subject}</span>
                          <span className="text-[10px] font-black text-slate-300">/</span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Class {result.classLevel}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                  </button>
                ))
              ) : query.length >= 2 ? (
                <div className="p-8 text-center space-y-4">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                     <Target size={24} />
                   </div>
                   <p className="text-sm font-medium text-slate-400 italic">No exact matches found for "{query}". <br/> Try searching for broader concepts.</p>
                </div>
              ) : (
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Popular Searches</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Fractions', 'Exploring Magnets', 'Cell', 'Coordinates'].map(term => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:bg-primary/5 hover:text-primary text-left transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syllab Neural Search v2.1</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connected</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
