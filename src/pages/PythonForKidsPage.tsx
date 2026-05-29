import React from 'react';
import { Gamepad2, Zap, Code, Database } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function PythonForKidsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-20 px-4">
      <SEO
        title="Learn Python Free for Kids & Students | Class 6–10 | Syllab.in"
        description="Free Python tutorials for kids and students in India. Learn Python from basics to projects — variables, loops, functions, games. Ideal for Class 6 to 10 CBSE students."
        url="https://syllab.in/python-for-kids"
      />

      {/* Hero */}
      <section className="text-center space-y-6 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Python — The #1 Language for <span className="text-primary">Future Builders</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Master the world's most beginner-friendly programming language. Build games, apps, and AI projects.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.location.href = '/coding'}
          className="inline-block btn-primary"
        >
          Start Python Free
        </motion.button>
      </section>

      {/* What is Python */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Why Python?</h2>
        <div className="card space-y-6">
          <p className="text-slate-700 text-lg font-medium leading-relaxed">
            Python is the easiest programming language to learn and the most powerful. Used by Google, NASA, and top AI companies, Python is your gateway to a ₹5–30 LPA career in tech.
          </p>
          <ul className="space-y-3 text-slate-600 font-medium">
            <li>✓ Easy-to-read syntax (like English, not complex symbols)</li>
            <li>✓ Build games, web apps, AI, and data science projects</li>
            <li>✓ Used by professionals at Google, Amazon, Meta, and ISRO</li>
            <li>✓ Perfect for Class 6 to 10 and competitive exam prep</li>
          </ul>
        </div>
      </section>

      {/* What You Can Build */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">What You Can Build</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: "🎮", title: "Guessing Game", desc: "Build a number guessing game with logic" },
            { emoji: "🧮", title: "Calculator", desc: "Create a smart calculator app" },
            { emoji: "📝", title: "Quiz App", desc: "Make an interactive quiz with scoring" },
            { emoji: "🤖", title: "Chatbot", desc: "Build a simple AI-powered chatbot" },
            { emoji: "🌐", title: "Web Scraper", desc: "Extract data from websites" },
            { emoji: "🧠", title: "AI Model", desc: "Train your first machine learning model" }
          ].map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card text-center space-y-3"
            >
              <div className="text-4xl">{project.emoji}</div>
              <h3 className="text-lg font-black text-slate-900">{project.title}</h3>
              <p className="text-sm text-slate-600 font-medium">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Python Topics */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Python Topics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Code, title: "Variables", desc: "Store and manage data" },
            { icon: Database, title: "Data Types", desc: "Strings, numbers, lists, dictionaries" },
            { icon: Zap, title: "Loops", desc: "Repeat code efficiently" },
            { icon: Code, title: "Functions", desc: "Organize code into reusable blocks" },
            { icon: Database, title: "Lists", desc: "Store multiple values" },
            { icon: Code, title: "Dictionaries", desc: "Key-value data storage" }
          ].map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card space-y-3"
            >
              <topic.icon className="text-primary" size={28} />
              <h3 className="text-lg font-black text-slate-900">{topic.title}</h3>
              <p className="text-sm text-slate-600 font-medium">{topic.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Career Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Career Opportunities</h2>
        <div className="card space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Python Engineers Earn ₹5–30 LPA</h3>
            <p className="text-slate-600 font-medium">Learn Python now, secure your future in tech.</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600 font-medium">Top companies hiring Python engineers:</p>
            <div className="flex flex-wrap gap-3">
              {["Google", "Amazon", "Microsoft", "ISRO", "JPMorgan", "Goldman Sachs"].map((company, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
                  <span className="text-emerald-700 font-black text-xs uppercase tracking-widest">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-[2rem] p-10 md:p-16 text-center text-white space-y-6">
        <h2 className="text-3xl md:text-4xl font-black">Start Your Python Journey Today</h2>
        <p className="text-emerald-100 text-lg font-medium max-w-2xl mx-auto">
          Learn Python from scratch with free interactive tutorials. Build projects, master coding, and open doors to a thriving tech career.
        </p>
        <button
          onClick={() => window.location.href = '/coding'}
          className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-colors"
        >
          Learn Python Free
        </button>
      </section>
    </div>
  );
}
