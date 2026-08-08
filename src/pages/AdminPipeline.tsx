import React, { useState } from 'react';
import { Database, FileUp, Cpu, CheckCircle2, AlertTriangle, Loader2, Sparkles } from 'lucide-react';
import SEO from '../seo/SEO';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface IngestionTask {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'verifying' | 'completed' | 'failed';
  progress: number;
  type: 'OCR' | 'AI_TAGGING' | 'FIRESTORE_SYNC';
}

export default function AdminPipelinePage() {
  const [tasks, setTasks] = useState<IngestionTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const startPipeline = () => {
    setIsProcessing(true);
    const newTasks: IngestionTask[] = [
      { id: '1', name: 'OCR: Physics PYQ 2023', status: 'processing', progress: 0, type: 'OCR' },
      { id: '2', name: 'AI: Conceptual Mapping', status: 'pending', progress: 0, type: 'AI_TAGGING' },
      { id: '3', name: 'DB: Scalable Sync', status: 'pending', progress: 0, type: 'FIRESTORE_SYNC' },
    ];
    setTasks(newTasks);

    // Simulate pipeline flow
    let current = 0;
    const interval = setInterval(() => {
      setTasks(prev => prev.map((t, idx) => {
        if (idx === current) {
          const nextProgress = t.progress + 10;
          if (nextProgress >= 100) {
            current++;
            return { ...t, progress: 100, status: 'completed' };
          }
          return { ...t, progress: nextProgress };
        }
        if (idx < current) return t;
        if (idx === current + 1) return { ...t, status: 'processing' };
        return t;
      }));

      if (current >= 3) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <SEO
        title="Admin Pipeline | Syllab"
        description="Admin tooling for reviewing learning content and generation workflows."
        url="https://syllab.in/admin"
        noindex
      />
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-white rounded-full text-[10px] font-black uppercase tracking-widest">
            <Cpu size={12} /> Neural Ingestion Engine
          </div>
          <h1 className="text-5xl font-heading font-black text-secondary tracking-tight">Content <span className="italic-serif text-primary">Pipeline</span></h1>
          <p className="text-slate-500 font-medium">Automated OCR and AI ingestion for Past Year Questions (PYQs).</p>
        </div>
        
        <button 
          onClick={startPipeline}
          disabled={isProcessing}
          className={cn(
            "btn-primary px-10 py-5 text-sm font-black uppercase tracking-widest flex items-center gap-3",
            isProcessing && "opacity-50 cursor-not-allowed"
          )}
        >
          {isProcessing ? <Loader2 className="animate-spin" /> : <FileUp size={20} />}
          {isProcessing ? "Ingesting Bulk Pack..." : "Initialize New Batch"}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-black text-secondary uppercase tracking-widest text-xs flex items-center gap-2">
                  <Database size={16} className="text-primary" /> Active Queue
                </h3>
                <span className="text-[10px] font-black text-slate-400">{tasks.filter(t => t.status === 'completed').length} / {tasks.length} Completed</span>
             </div>
             
             <div className="divide-y divide-slate-50">
                {tasks.length > 0 ? tasks.map((task) => (
                  <div key={task.id} className="p-8 flex items-center gap-8">
                     <div className={cn(
                       "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                       task.status === 'completed' ? "bg-emerald-50 text-primary" : "bg-slate-50 text-slate-400"
                     )}>
                        {task.status === 'completed' ? <CheckCircle2 size={24} /> : <Loader2 className={cn("text-primary", task.status === 'processing' && "animate-spin")} size={24} />}
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-black text-secondary">{task.name}</h4>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.status}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            className="h-full bg-primary"
                          />
                        </div>
                     </div>
                  </div>
                )) : (
                  <div className="p-20 text-center space-y-4">
                    <Database size={48} className="mx-auto text-slate-200" />
                    <p className="text-slate-400 font-medium italic">No active ingestion tasks in the neural queue.</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-secondary rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <Sparkles size={100} />
              </div>
              <h3 className="text-xl font-black italic-serif">Pipeline <span className="text-primary italic">Stats</span></h3>
              
              <div className="space-y-4">
                 {[
                   { label: 'OCR Accuracy', value: '99.2%', trend: '+0.5%' },
                   { label: 'AI Tagging Speed', value: '450ms', trend: 'Fast' },
                   { label: 'DB Sync Rate', value: '1.2k / min', trend: 'Optimal' },
                 ].map((stat, i) => (
                   <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{stat.label}</span>
                      <div className="text-right">
                        <div className="font-black text-white">{stat.value}</div>
                        <div className="text-[11px] font-black uppercase text-primary">{stat.trend}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-xl font-black text-secondary flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-500" /> System Constraints
              </h3>
              <ul className="space-y-4">
                 <li className="flex gap-3 text-sm font-medium text-slate-500 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    OCR handles handwritten and printed scripts via Gemini multi-modal.
                 </li>
                 <li className="flex gap-3 text-sm font-medium text-slate-500 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    Auto-tagging maps questions to SYLLABUS.ts IDs.
                 </li>
                 <li className="flex gap-3 text-sm font-medium text-slate-500 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    Final verification requires Admin manual sign-off.
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
