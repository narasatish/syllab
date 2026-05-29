import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function CyberSafetyPage() {
  const threats = [
    { emoji: "🎣", title: "Phishing", desc: "Fake emails pretending to be from trusted websites" },
    { emoji: "🔑", title: "Weak Passwords", desc: "Passwords that are easy to guess or crack" },
    { emoji: "😔", title: "Cyberbullying", desc: "Mean messages, harassment, or threats online" },
    { emoji: "🗞️", title: "Fake News", desc: "False information spread to mislead people" },
    { emoji: "🔓", title: "Privacy Leaks", desc: "Sharing personal info with strangers" },
    { emoji: "🔗", title: "Scam Links", desc: "Suspicious links that steal your data or money" }
  ];

  const safetyRules = [
    { num: "1", rule: "Create Strong Passwords", desc: "Mix uppercase, lowercase, numbers, and symbols" },
    { num: "2", rule: "Enable 2-Factor Authentication", desc: "Add an extra layer of security to accounts" },
    { num: "3", rule: "Never Share Personal Info", desc: "Keep your address, phone, and school name private" },
    { num: "4", rule: "Check Before You Click", desc: "Verify links and senders before opening" },
    { num: "5", rule: "Don't Meet Online Friends Offline", desc: "Be cautious about strangers you meet online" },
    { num: "6", rule: "Report & Block Bullies", desc: "Tell an adult if someone is being mean" },
    { num: "7", rule: "Respect Others Online", desc: "Be kind and don't share embarrassing content" },
    { num: "8", rule: "Think Before You Post", desc: "Remember the internet is permanent" }
  ];

  const scenarios = [
    {
      title: "The Phishing Email",
      desc: "Rajesh gets an email from 'PayPal' asking him to verify his account. He clicks the link and enters his password. Result: His account is hacked!"
    },
    {
      title: "The Fake Friend",
      desc: "Priya chats with someone claiming to be a classmate on Instagram. They ask for her school address. She almost shares it until her mom stops her."
    },
    {
      title: "The Cyberbully",
      desc: "Aditya posts a photo and receives mean comments. Instead of ignoring, he replies, making it worse. His parents help him report and block."
    }
  ];

  const quizQuestions = [
    { q: "What's a strong password?", a: "A mix of uppercase, lowercase, numbers, and symbols" },
    { q: "What should you do if a stranger asks for your address online?", a: "Never share it. Tell an adult immediately." },
    { q: "Is it safe to click links from unknown senders?", a: "No, it could be malware or phishing." }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-20 px-4">
      <SEO
        title="Cyber Safety for Students | Free Guide | Class 5–10 | Syllab.in"
        description="Free cyber safety guide for Indian students. Learn about online safety, strong passwords, phishing, privacy, and safe internet use — for Class 5 to 10."
        url="https://syllab.in/cyber-safety"
      />

      {/* Hero */}
      <section className="text-center space-y-6 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
        >
          Stay Safe Online — <span className="text-primary">Cyber Safety for Students</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Learn to protect yourself from phishing, cyberbullying, hackers, and online threats.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.location.href = '/coding'}
          className="inline-block btn-primary"
        >
          Take Cyber Safety Course Free
        </motion.button>
      </section>

      {/* Threat Cards */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Common Online Threats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {threats.map((threat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card space-y-3"
            >
              <div className="text-4xl">{threat.emoji}</div>
              <h3 className="text-lg font-black text-slate-900">{threat.title}</h3>
              <p className="text-sm text-slate-600 font-medium">{threat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Rules */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">8 Golden Rules of Cyber Safety</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyRules.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card space-y-3"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm">
                  {item.num}
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-slate-900">{item.rule}</h3>
                  <p className="text-xs text-slate-600 font-medium">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real Stories */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Real Stories from Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card space-y-4 border-l-4 border-primary"
            >
              <h3 className="text-lg font-black text-slate-900">{scenario.title}</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{scenario.desc}</p>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-primary font-black uppercase tracking-widest">LESSON LEARNED</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quiz Preview */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center">Test Your Cyber Safety Knowledge</h2>
        <div className="card space-y-6">
          {quizQuestions.map((item, i) => (
            <div key={i} className="space-y-3 pb-6 last:pb-0 border-b border-slate-100 last:border-b-0">
              <h3 className="font-black text-slate-900 text-lg">{i + 1}. {item.q}</h3>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <p className="text-emerald-700 font-bold text-sm">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-[2rem] p-10 md:p-16 text-center text-white space-y-6">
        <h2 className="text-3xl md:text-4xl font-black">Master Cyber Safety Today</h2>
        <p className="text-emerald-100 text-lg font-medium max-w-2xl mx-auto">
          Learn how to stay safe online, protect your privacy, and become a responsible digital citizen.
        </p>
        <button
          onClick={() => window.location.href = '/coding'}
          className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-colors"
        >
          Take the Course Free
        </button>
      </section>
    </div>
  );
}
