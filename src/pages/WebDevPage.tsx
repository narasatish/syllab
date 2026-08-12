import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function WebDevPage() {
  const webTrioItems = [
    { emoji: "🏗️", title: "HTML", subtitle: "Structure", desc: "Build the skeleton of your website" },
    { emoji: "🎨", title: "CSS", subtitle: "Style", desc: "Make your website beautiful" },
    { emoji: "⚡", title: "JavaScript", subtitle: "Logic", desc: "Add interactivity and animations" }
  ];

  const projects = [
    { emoji: "💼", title: "Portfolio Website", desc: "Showcase your projects and skills" },
    { emoji: "📝", title: "Quiz App", desc: "Interactive quiz with scoring" },
    { emoji: "🧮", title: "Calculator", desc: "Build a fully functional calculator" },
    { emoji: "⏰", title: "Digital Clock", desc: "Live time display with animations" },
    { emoji: "🎯", title: "Landing Page", desc: "Professional landing page for a business" },
    { emoji: "🎮", title: "Browser Game", desc: "Create a playable web game" }
  ];

  const learningPath = [
    { phase: "Beginner", items: ["HTML basics", "CSS styling", "Forms & inputs"] },
    { phase: "Intermediate", items: ["JavaScript DOM", "Events & interactions", "Responsive design"] },
    { phase: "Advanced", items: ["React basics", "APIs & data fetching", "Deploy live websites"] }
  ];

  const companies = [
    { emoji: "🌐", role: "Frontend Developer", salary: "₹4–15 LPA" },
    { emoji: "🏗️", role: "Full-Stack Developer", salary: "₹8–25 LPA" },
    { emoji: "🎨", role: "UI/UX Designer", salary: "₹5–18 LPA" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-20 px-4">
      <SEO
        title="Free Web Development for Students | HTML CSS JavaScript | Syllab.in"
        description="Learn web development free — HTML, CSS, JavaScript and React for Indian students. Build real websites from scratch. For Class 8 to 12 and beginners."
        url="https://syllab.in/web-development"
      />

      {/* Hero */}
      <section className="text-center space-y-6 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Build Websites — <span className="text-primary">Web Development for Students</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Learn HTML, CSS, JavaScript, and React. Build real websites from scratch — no experience needed.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.location.href = '/coding'}
          className="inline-block btn-primary"
        >
          Start Web Dev Free
        </motion.button>
      </section>

      {/* The Web Dev Trio */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">The Web Development Trio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {webTrioItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-4 text-center"
            >
              <div className="text-6xl">{item.emoji}</div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                <p className="text-primary font-black uppercase text-xs tracking-widest mt-1">{item.subtitle}</p>
              </div>
              <p className="text-slate-600 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You'll Build */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">What You'll Build</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="card text-center space-y-3"
            >
              <div className="text-4xl">{project.emoji}</div>
              <h3 className="text-lg font-black text-slate-900">{project.title}</h3>
              <p className="text-xs text-slate-600 font-medium">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Your Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPath.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: (i - 1) * 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-block bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                  <span className="text-emerald-700 text-[11px] font-black uppercase tracking-widest">{phase.phase}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-primary font-black mt-0.5">→</span>
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Career Paths */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Web Dev Career Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-4"
            >
              <div className="text-4xl">{item.emoji}</div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{item.role}</h3>
                <p className="text-primary font-black text-sm mt-2">{item.salary}</p>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Build user interfaces and entire web applications
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Web Dev */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Why Learn Web Development?</h2>
        <div className="card space-y-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Everyone uses websites — huge job market",
              "See your work live on the internet immediately",
              "Freelance and earn ₹500–5,000+ per project",
              "Start your own web design business",
              "Most in-demand tech skill in 2025",
              "Build anything — from portfolios to startups"
            ].map((reason, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary font-black text-lg flex-shrink-0">✓</span>
                <span className="text-slate-700 font-medium">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technologies */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Technologies You'll Learn</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "🌐", name: "HTML5" },
            { emoji: "🎨", name: "CSS3" },
            { emoji: "⚡", name: "JavaScript" },
            { emoji: "⚛️", name: "React" },
            { emoji: "💾", name: "APIs" },
            { emoji: "🔄", name: "Git" },
            { emoji: "📱", name: "Responsive" },
            { emoji: "🚀", name: "Deployment" }
          ].map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="card text-center space-y-2"
            >
              <div className="text-3xl">{tech.emoji}</div>
              <p className="text-sm font-black text-slate-900">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-[2rem] p-10 md:p-16 text-center text-white space-y-6">
        <h2 className="text-3xl md:text-4xl font-black">Start Building Websites Today</h2>
        <p className="text-emerald-100 text-lg font-medium max-w-2xl mx-auto">
          Learn web development at your own pace. Build real projects, showcase your portfolio, and launch your tech career.
        </p>
        <button
          onClick={() => window.location.href = '/coding'}
          className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-colors"
        >
          Begin Web Development
        </button>
      </section>
    </div>
  );
}
