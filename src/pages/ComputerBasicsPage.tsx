import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function ComputerBasicsPage() {
  const topics = [
    { emoji: "💻", title: "What is a Computer", level: "Class 3" },
    { emoji: "🔧", title: "Parts of a Computer", level: "Class 4" },
    { emoji: "⌨️", title: "Input & Output Devices", level: "Class 4" },
    { emoji: "🧠", title: "CPU", level: "Class 5" },
    { emoji: "📦", title: "RAM & Storage", level: "Class 5" },
    { emoji: "⚙️", title: "Operating System", level: "Class 6" },
    { emoji: "🌐", title: "What is Internet", level: "Class 6" },
    { emoji: "✉️", title: "Email & Web", level: "Class 6" },
    { emoji: "🛡️", title: "Cyber Safety", level: "Class 7" },
    { emoji: "🔐", title: "Privacy & Security", level: "Class 7" },
    { emoji: "📱", title: "Devices & Networks", level: "Class 8" },
    { emoji: "💾", title: "Cloud Computing", level: "Class 8" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-20 px-4">
      <SEO
        title="Computer Basics for Kids | Class 3–8 CBSE | Syllab.in"
        description="Free computer basics for Class 3 to 8 CBSE students. Learn parts of a computer, hardware, software, internet, email, and cyber safety — interactive and free."
        url="https://syllab.in/computer-basics"
      />

      {/* Hero */}
      <section className="text-center space-y-6 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Computer Basics — Your <span className="text-primary">Digital Foundation</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Master the fundamentals of computers, internet, and digital safety from Class 3 to 8.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.location.href = '/coding'}
          className="inline-block btn-primary"
        >
          Explore Topics Free
        </motion.button>
      </section>

      {/* Topics Grid */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Topics You'll Learn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="card space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{topic.emoji}</div>
                <span className="bg-emerald-50 border border-emerald-200 rounded-full px-2 py-1 text-emerald-700 text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                  {topic.level}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">{topic.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Learn */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Why Learn Computer Basics?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Pass Your Exams", desc: "Master CBSE computer science concepts and score higher" },
            { title: "Digital Literacy", desc: "Become confident with computers and the internet" },
            { title: "Future Skills", desc: "Build foundational knowledge for coding and tech careers" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-4"
            >
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="text-slate-600 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">What You'll Learn</h2>
        <div className="card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-3 text-slate-700 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Hardware vs Software — What's the difference?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>CPU, RAM, Storage — How computers work inside</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Operating Systems — Windows, Mac, Linux, Android</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Internet & Web — How data travels across the world</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Email & Communication — Safe online messaging</span>
              </li>
            </ul>
            <ul className="space-y-3 text-slate-700 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Cyber Safety — Protect yourself online</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Privacy & Passwords — Keep your data safe</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Digital Etiquette — Be respectful online</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Cloud Computing — Store and access files anywhere</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">✓</span>
                <span>Networks & Connectivity — How devices talk</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-[2rem] p-10 md:p-16 text-center text-white space-y-6">
        <h2 className="text-3xl md:text-4xl font-black">Start Your Computer Basics Journey</h2>
        <p className="text-emerald-100 text-lg font-medium max-w-2xl mx-auto">
          Learn at your own pace with free, interactive lessons. Perfect for CBSE exams and real-world digital skills.
        </p>
        <button
          onClick={() => window.location.href = '/coding'}
          className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-colors"
        >
          Explore Topics Now
        </button>
      </section>
    </div>
  );
}
