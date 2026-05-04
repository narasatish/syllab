import React from 'react';
import { ShieldCheck, Target, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      <section className="text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Democratizing <span className="text-primary italic">Elite</span> Education.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
        >
Syllab was created to make high-quality education accessible to every student in India — from early school learning to advanced exam preparation.        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card border-none bg-primary text-white p-10 space-y-4 shadow-xl shadow-emerald-500/20">
          <Target className="text-emerald-200" size={32} />
          <h2 className="text-2xl font-black italic-serif underline decoration-emerald-300 underline-offset-4">Our Vision</h2>
          <p className="font-medium text-emerald-50/80 leading-relaxed">
            To build a world where geography and financial status are no longer barriers to academic success. By using Syllab AI, we personalize curriculum paths for millions.
          </p>
        </div>

        <div className="card space-y-4 p-10 border-slate-100 bg-white">
          <Zap className="text-primary" size={32} />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">The Technology</h2>
          <p className="font-medium text-slate-500 leading-relaxed">
            We combine pedagogical expertise with state-of-the-art Large Language Models to create a tutor that understands your mistakes better than any classroom setting could.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-2xl font-black text-slate-900 text-center">Why Students Choose Syllab</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Users, label: "Community Driven", desc: "Built by former IITians and educators." },
            { icon: ShieldCheck, label: "Trustworthy Data", desc: "Verified NCERT-aligned content." },
            { icon: Zap, label: "Instant Feedback", desc: "AI mentoring in under 2 seconds." }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100">
                <item.icon size={24} />
              </div>
              <h4 className="font-black text-slate-800">{item.label}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white">
        <h3 className="text-3xl font-black mb-4">Ready to reach your potential?</h3>
        <p className="text-slate-400 font-medium mb-8">Join thousands of students preparing for JEE & NEET 2025.</p>
        <button className="btn-primary py-4 px-10 text-sm font-black uppercase tracking-widest">
           Start Your Journey
        </button>
      </section>
    </div>
  )
}
