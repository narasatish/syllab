import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function AiForStudentsPage() {
  const aiExamples = [
    { emoji: "🎬", title: "YouTube", desc: "Recommendations based on what you watch" },
    { emoji: "🌐", title: "Google Translate", desc: "Translate between 100+ languages" },
    { emoji: "🎤", title: "Siri / Google Assistant", desc: "Voice commands that understand you" },
    { emoji: "🍔", title: "Swiggy / Uber", desc: "AI predicts delivery time and surge pricing" }
  ];

  const aiSteps = [
    { num: "1", title: "Data", desc: "Collect millions of examples" },
    { num: "2", title: "Training", desc: "AI learns patterns from data" },
    { num: "3", title: "Model", desc: "AI becomes intelligent" },
    { num: "4", title: "Prediction", desc: "AI makes smart decisions" }
  ];

  const aiTopics = [
    { emoji: "🤖", title: "Machine Learning", desc: "Teach computers to learn from data" },
    { emoji: "🧠", title: "Neural Networks", desc: "AI inspired by how brains work" },
    { emoji: "💬", title: "Natural Language Processing", desc: "AI understands human language" },
    { emoji: "👁️", title: "Computer Vision", desc: "AI sees and understands images" },
    { emoji: "✨", title: "Generative AI", desc: "ChatGPT, Gemini, and creative AI" }
  ];

  const aiTools = [
    { emoji: "💬", name: "ChatGPT", use: "Answer questions, write essays, code help" },
    { emoji: "🔮", name: "Google Gemini", use: "Search with AI, create images, analyze" },
    { emoji: "⚡", name: "GitHub Copilot", use: "AI-powered coding assistant" },
    { emoji: "🎨", name: "Midjourney", use: "Generate stunning AI art" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-20 px-4">
      <SEO
        title="AI for Students — Free Artificial Intelligence Guide | Syllab.in"
        description="Free Artificial Intelligence guide for Indian students. Learn how AI, Machine Learning, ChatGPT, and Gemini work — for Class 8 to 12 and JEE/NEET aspirants."
        url="https://syllab.in/ai-for-students"
      />

      {/* Hero */}
      <section className="text-center space-y-6 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Understand AI — India's Most <span className="text-primary">In-Demand Skill</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Master Artificial Intelligence, Machine Learning, and Generative AI. Build your future in the world's fastest-growing field.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.location.href = '/coding'}
          className="inline-block btn-primary"
        >
          Start AI Learning Free
        </motion.button>
      </section>

      {/* AI is Everywhere */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">AI is Everywhere — You Use It Every Day!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiExamples.map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card text-center space-y-3"
            >
              <div className="text-5xl">{example.emoji}</div>
              <h3 className="text-lg font-black text-slate-900">{example.title}</h3>
              <p className="text-xs text-slate-600 font-medium">{example.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How AI Works */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">How Does AI Work?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {aiSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-4 text-center"
            >
              <div className="w-14 h-14 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black">
                {step.num}
              </div>
              <h3 className="text-lg font-black text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-600 font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="hidden md:block absolute left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mt-[-2rem]" />
      </section>

      {/* AI Topics */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">AI Topics You'll Master</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {aiTopics.map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="card text-center space-y-3"
            >
              <div className="text-4xl">{topic.emoji}</div>
              <h3 className="text-base font-black text-slate-900">{topic.title}</h3>
              <p className="text-xs text-slate-600 font-medium">{topic.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Tools */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">AI Tools Students Use Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiTools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{tool.emoji}</div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{tool.name}</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1">{tool.use}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Career Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">AI Career Opportunities</h2>
        <div className="card space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">AI Engineers Earn ₹8–50 LPA</h3>
            <p className="text-slate-600 font-medium">One of the highest-paying tech careers in India.</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600 font-medium">Top companies hiring AI experts:</p>
            <div className="flex flex-wrap gap-3">
              {["Google", "OpenAI", "Amazon", "Microsoft", "ISRO", "DeepMind"].map((company, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
                  <span className="text-emerald-700 font-black text-xs uppercase tracking-widest">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Learn AI */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Why Learn AI Now?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "📈", title: "Fastest Growing Field", desc: "AI is reshaping every industry globally" },
            { emoji: "💰", title: "Highest Salaries", desc: "AI engineers earn ₹8–50 LPA+ in India" },
            { emoji: "🚀", title: "Future-Proof Career", desc: "AI skills will always be in demand" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card text-center space-y-3"
            >
              <div className="text-4xl">{item.emoji}</div>
              <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-[2rem] p-10 md:p-16 text-center text-white space-y-6">
        <h2 className="text-3xl md:text-4xl font-black">Start Your AI Journey Today</h2>
        <p className="text-emerald-100 text-lg font-medium max-w-2xl mx-auto">
          Learn AI from the ground up. Master the skills that will define your future career.
        </p>
        <button
          onClick={() => window.location.href = '/coding'}
          className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-colors"
        >
          Explore AI Courses Free
        </button>
      </section>
    </div>
  );
}
