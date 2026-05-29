import React from 'react';
import { Code2, Lightbulb, Rocket, Smile } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function CodingForKidsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-20 px-4">
      <SEO
        title="Free Coding for Kids in India | Class 3–8 | Syllab.in"
        description="Learn coding free for kids in India. Python, JavaScript, HTML and game development for Class 3 to 8. Fun coding games, mini projects, and challenges — all free on Syllab.in."
        url="https://syllab.in/coding-for-kids"
      />

      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <div className="inline-block bg-emerald-50 rounded-full px-4 py-2 border border-emerald-200">
          <span className="text-emerald-700 text-[11px] font-black uppercase tracking-widest">For Class 3 to 8</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Start Coding Today — It's Free!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Learn Python, JavaScript, HTML, and game development. Build real projects while having fun.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.location.href = '/coding'}
          className="inline-block btn-primary"
        >
          Start Learning Free
        </motion.button>
      </section>

      {/* Why Coding for Kids */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Why Learn Coding?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Lightbulb, title: "Boost Creativity", desc: "Build games, apps, and websites from your imagination." },
            { icon: Code2, title: "Solve Problems", desc: "Learn logic and break down complex challenges into simple steps." },
            { icon: Rocket, title: "Future-Ready Career", desc: "Coding skills open doors to lucrative tech careers." },
            { icon: Smile, title: "Have Fun!", desc: "Create cool projects, play with code, and enjoy learning." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-4"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-primary border border-emerald-200">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="text-slate-600 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Python Basics", desc: "Variables, loops, functions, and build mini games" },
            { title: "Web Pages with HTML", desc: "Create your first website with proper structure" },
            { title: "JavaScript Games", desc: "Make interactive games that run in the browser" },
            { title: "Computer Basics", desc: "Understand how computers and the internet work" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-2"
            >
              <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-sm font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "1", title: "Pick a Skill", desc: "Choose from Python, HTML, JavaScript, or more" },
            { num: "2", title: "Learn with Examples", desc: "Follow step-by-step tutorials with real code" },
            { num: "3", title: "Build a Project", desc: "Create your own game or app from scratch" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black">
                {item.num}
              </div>
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="text-slate-600 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Grid */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Skills You'll Master</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "🐍", name: "Python", desc: "The easiest language to learn" },
            { emoji: "🌐", name: "HTML", desc: "Build the foundation of web pages" },
            { emoji: "⚡", name: "JavaScript", desc: "Make websites interactive and fun" },
            { emoji: "💻", name: "Computer Basics", desc: "Master fundamental concepts" },
            { emoji: "🛡️", name: "Cyber Safety", desc: "Stay secure online while learning" },
            { emoji: "🎮", name: "Game Dev", desc: "Create your own games" }
          ].map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="card text-center space-y-3"
            >
              <div className="text-4xl">{skill.emoji}</div>
              <h3 className="text-lg font-black text-slate-900">{skill.name}</h3>
              <p className="text-xs text-slate-600 font-medium">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary rounded-[2rem] p-10 md:p-16 text-center text-white space-y-6">
        <h2 className="text-3xl md:text-4xl font-black">Ready to Code?</h2>
        <p className="text-emerald-100 text-lg font-medium max-w-2xl mx-auto">
          Join thousands of Indian kids learning to code for free. No credit card needed. Start now!
        </p>
        <button
          onClick={() => window.location.href = '/coding'}
          className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-colors"
        >
          Start Your Coding Journey
        </button>
      </section>
    </div>
  );
}
