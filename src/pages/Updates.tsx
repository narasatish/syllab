/**
 * Updates.tsx — /updates
 * Student updates hub: CBSE, JEE, NEET, EAMCET, AI Tools, Coding Skills, Study Tips.
 * 50% evergreen (fixed) + 50% trending (updated content).
 * Full articles served from updateArticles.ts — no "coming soon".
 */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Flame,
  Search,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { getArticleBySlug, FullArticle } from '../data/updateArticles';
import autoBlogsRaw from '../data/autoBlogs.json';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  readingTime: number;
  date: string;
  riskLevel: 'low' | 'medium' | 'high';
  trending?: boolean;
  pinned?: boolean;
  emoji: string;
  coverColor: string;
  author: string;
  /** Raw article body for auto-generated posts (rendered when there's no
   *  curated FULL_ARTICLES entry). */
  autoContent?: string;
}

/* ─── Categories ─────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all',            label: 'All Updates',   emoji: '🌐', color: 'bg-slate-700 text-white' },
  { id: 'cbse',           label: 'CBSE Updates',  emoji: '📚', color: 'bg-blue-600 text-white' },
  { id: 'class-1-4',      label: 'Class 1 — 4',   emoji: '🧒', color: 'bg-rose-500 text-white' },
  { id: 'jee',            label: 'JEE Prep',      emoji: '🔬', color: 'bg-orange-600 text-white' },
  { id: 'neet',           label: 'NEET Prep',     emoji: '🧬', color: 'bg-rose-600 text-white' },
  { id: 'eamcet',         label: 'EAMCET',        emoji: '📐', color: 'bg-violet-600 text-white' },
  { id: 'ai-tools',       label: 'AI Tools',      emoji: '🤖', color: 'bg-emerald-600 text-white' },
  { id: 'coding-skills',  label: 'Coding Skills', emoji: '💻', color: 'bg-cyan-600 text-white' },
  { id: 'study-tips',     label: 'Study Tips',    emoji: '💡', color: 'bg-amber-600 text-white' },
  { id: 'finance',        label: 'Money & Markets', emoji: '💰', color: 'bg-emerald-600 text-white' },
];

/* ─── Static articles ────────────────────────────────────────────────────── */
const CURATED_ARTICLES: Article[] = [
  // ── Money & Markets (Financial Literacy) ──────────────────────────────
  {
    id: 'f1', slug: 'stock-market-basics-for-students-india', category: 'finance', riskLevel: 'low', trending: true, pinned: true,
    title: 'Stock Market Basics for Students — Explained Simply (2026)',
    summary: 'What is a share? What are Sensex and Nifty? How do prices move? A beginner-friendly guide for Indian students from Class 9 to 12, with real examples — no jargon.',
    tags: ['Stock Market', 'Investing', 'Sensex', 'Nifty', 'Financial Literacy'], readingTime: 7, date: '2026-05-30',
    emoji: '📈', coverColor: 'from-emerald-600 to-green-800', author: 'Syllab Team',
  },
  {
    id: 'f2', slug: 'money-saving-habits-for-kids-class-5-8', category: 'finance', riskLevel: 'low', trending: true,
    title: 'Teaching Money & Saving to Kids (Class 5–8) — A Parent\'s Guide',
    summary: 'Needs vs wants, pocket-money budgeting, the piggy-bank habit, and how banks pay interest — simple money lessons every Indian child should learn early, with examples.',
    tags: ['Saving', 'Money', 'Class 5', 'Class 8', 'Parenting'], readingTime: 6, date: '2026-05-29',
    emoji: '🐷', coverColor: 'from-amber-500 to-emerald-600', author: 'Syllab Team',
  },
  {
    id: 'f3', slug: 'why-petrol-gold-prices-change-commodities-explained', category: 'finance', riskLevel: 'low',
    title: 'Why Petrol & Gold Prices Change — Commodities Explained',
    summary: 'Crude oil, gold, currencies and trade decide the prices around you. A clear Class 10–12 explainer on commodities, exchange rates, and why your petrol bill moves.',
    tags: ['Commodities', 'Gold', 'Oil', 'Currency', 'Trade'], readingTime: 7, date: '2026-05-28',
    emoji: '🛢️', coverColor: 'from-yellow-500 to-orange-700', author: 'Syllab Team',
  },

  // ── Class 1 — 4 (Young Learners) ──────────────────────────────────────
  {
    id: 'k1', slug: 'class-1-4-worksheets-launched', category: 'class-1-4', riskLevel: 'low', trending: true, pinned: true,
    title: 'NEW: 130+ Free Printable Worksheets for Class 1 to 4',
    summary: 'Maths, English, and Science worksheets aligned to CBSE NCERT — instant PDF download or send to your inbox by email. Built for young learners with simple language and clear examples.',
    tags: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Worksheets', 'CBSE'], readingTime: 3, date: '2026-05-24',
    emoji: '📚', coverColor: 'from-rose-500 to-orange-500', author: 'Syllab Team',
  },
  {
    id: 'k2', slug: 'how-to-teach-young-kids-maths', category: 'class-1-4', riskLevel: 'low', trending: true,
    title: 'How to Teach Maths to Class 1 & 2 Kids — A Parent\'s Guide',
    summary: 'Counting with fingers, real-life examples, fun shapes, simple addition games — every parent\'s playbook for making early maths joyful (not stressful).',
    tags: ['Class 1', 'Class 2', 'Maths', 'Parenting Tips'], readingTime: 6, date: '2026-05-23',
    emoji: '🔢', coverColor: 'from-amber-500 to-orange-600', author: 'Syllab Team',
  },
  {
    id: 'k3', slug: 'class-3-4-science-everyday-experiments', category: 'class-1-4', riskLevel: 'low',
    title: '10 Easy Science Experiments for Class 3 & 4 at Home',
    summary: 'No lab needed — just everyday things from the kitchen. Plant growth, water cycle, sink vs float, magnets, shadows, and more. Each experiment takes under 15 minutes.',
    tags: ['Class 3', 'Class 4', 'Science', 'Experiments'], readingTime: 8, date: '2026-05-22',
    emoji: '🔬', coverColor: 'from-emerald-500 to-teal-600', author: 'Syllab Team',
  },

  // ── AI Tools (updated often) ──────────────────────────────────────────
  {
    id: 'a1', slug: 'claude-sonnet-4-5-for-students', category: 'ai-tools', riskLevel: 'low', trending: true,
    title: 'Claude Sonnet 4.5: What Students Need to Know in 2026',
    summary: 'Anthropic\'s Claude Sonnet 4.5 is faster and smarter. Here\'s how students can use it to explain NCERT concepts, write essays, debug Python code, and ace exams — completely free.',
    tags: ['Claude', 'AI Tutor', 'Students'], readingTime: 5, date: '2026-05-20',
    emoji: '🤖', coverColor: 'from-violet-600 to-purple-800', author: 'Syllab Team',
  },
  {
    id: 'a2', slug: 'chatgpt-vs-gemini-vs-claude-for-students', category: 'ai-tools', riskLevel: 'low', trending: true,
    title: 'ChatGPT vs Gemini vs Claude: Best AI Tool for Students in 2026',
    summary: 'We compared all three AI tools for homework help, exam prep, coding, and essay writing. Here\'s which one wins for Indian students — and which ones are free.',
    tags: ['ChatGPT', 'Gemini', 'Claude', 'AI Comparison'], readingTime: 7, date: '2026-05-19',
    emoji: '⚡', coverColor: 'from-emerald-500 to-teal-700', author: 'Syllab Team',
  },
  {
    id: 'a3', slug: 'best-ai-tools-students-india-2026', category: 'ai-tools', riskLevel: 'low',
    title: 'Best Free AI Tools for Indian Students in 2026 — Complete Guide',
    summary: 'Claude, Gemini, ChatGPT, Kimi, NotebookLM, Perplexity — which AI tool is best for what task? Complete guide for Indian students with free tier details.',
    tags: ['AI Tools', 'Free AI', 'NotebookLM', 'Perplexity'], readingTime: 8, date: '2026-05-15',
    emoji: '🌟', coverColor: 'from-blue-500 to-indigo-700', author: 'Syllab Team',
  },
  {
    id: 'a4', slug: 'kimi-ai-tool-for-students', category: 'ai-tools', riskLevel: 'low',
    title: 'Kimi AI: The Hidden Gem for Long Document Study in 2026',
    summary: 'Kimi AI handles 200,000 tokens — meaning it can read your entire textbook in one go. Here\'s how students use it to analyse NCERT PDFs and past papers.',
    tags: ['Kimi', 'Long Context', 'PDF Study'], readingTime: 4, date: '2026-05-17',
    emoji: '🌙', coverColor: 'from-slate-600 to-slate-800', author: 'Syllab Team',
  },
  {
    id: 'a5', slug: 'github-copilot-coding-students', category: 'ai-tools', riskLevel: 'low',
    title: 'GitHub Copilot for Students: Free Access + How to Use It for Python & Java',
    summary: 'GitHub Copilot is free for students. Learn how to use it for completing Python assignments, understanding Java OOP concepts, and writing SQL queries faster.',
    tags: ['GitHub Copilot', 'Python', 'Java', 'Coding'], readingTime: 5, date: '2026-05-16',
    emoji: '🐙', coverColor: 'from-gray-700 to-gray-900', author: 'Syllab Team',
  },

  // ── JEE (evergreen, rare changes) ────────────────────────────────────
  {
    id: 'b1', slug: 'best-books-jee-main-2026', category: 'jee', riskLevel: 'medium', pinned: true,
    title: 'Best Books for JEE Main 2026 — Subject-Wise Complete List',
    summary: 'From H.C. Verma Physics to R.D. Sharma Maths and O.P. Tandon Chemistry — here\'s the definitive book list for JEE Main 2026 with study order and tips.',
    tags: ['JEE Books', 'Physics', 'Chemistry', 'Maths'], readingTime: 8, date: '2026-04-01',
    emoji: '📖', coverColor: 'from-orange-500 to-red-700', author: 'Syllab Team',
  },
  {
    id: 'b2', slug: 'jee-main-vs-jee-advanced-differences', category: 'jee', riskLevel: 'low', pinned: true,
    title: 'JEE Main vs JEE Advanced: Key Differences Explained for Students',
    summary: 'Confused about JEE Main and JEE Advanced? We explain eligibility, syllabus differences, difficulty level, paper pattern, and how to prepare for both effectively.',
    tags: ['JEE Main', 'JEE Advanced', 'Differences'], readingTime: 6, date: '2026-03-15',
    emoji: '🔬', coverColor: 'from-amber-500 to-orange-700', author: 'Syllab Team',
  },
  {
    id: 'b3', slug: 'jee-physics-most-important-chapters', category: 'jee', riskLevel: 'low',
    title: 'JEE Physics: 10 Most Important Chapters & Weightage Analysis 2026',
    summary: 'Electrostatics, Mechanics, Optics, and Modern Physics account for 65% of JEE Physics. Here\'s the exact weightage analysis with smart preparation strategy.',
    tags: ['JEE Physics', 'Chapters', 'Weightage'], readingTime: 7, date: '2026-03-10',
    emoji: '⚛️', coverColor: 'from-blue-500 to-violet-700', author: 'Syllab Team',
  },
  {
    id: 'b4', slug: 'jee-main-2026-online-offline-mode', category: 'jee', riskLevel: 'medium',
    title: 'JEE Main 2026: Online or Offline? Exam Mode Explained',
    summary: 'JEE Main is conducted in Computer-Based Test (CBT) mode only. We explain what this means, how to practice, best mock test platforms, and exam day tips.',
    tags: ['JEE Main 2026', 'Exam Mode', 'CBT'], readingTime: 4, date: '2026-05-10',
    emoji: '💻', coverColor: 'from-cyan-500 to-blue-700', author: 'Syllab Team',
  },

  // ── NEET (evergreen) ──────────────────────────────────────────────────
  {
    id: 'c1', slug: 'best-books-neet-2026', category: 'neet', riskLevel: 'medium', pinned: true,
    title: 'Complete NEET 2026 Book Guide: Biology, Physics, Chemistry',
    summary: 'NCERT is the Bible for NEET Biology. For Physics: DC Pandey. For Chemistry: NCERT + MTG. Here\'s the full guide with month-wise study plan.',
    tags: ['NEET Books', 'Biology', 'Physics', 'Chemistry'], readingTime: 9, date: '2026-04-05',
    emoji: '🧬', coverColor: 'from-rose-500 to-pink-700', author: 'Syllab Team',
  },
  {
    id: 'c2', slug: 'neet-biology-ncert-strategy', category: 'neet', riskLevel: 'low',
    title: 'How to Score 340/360 in NEET Biology Using Only NCERT',
    summary: '90% of NEET Biology questions come directly from NCERT. Learn the exact page-reading strategy, diagram practice technique, and revision method to score 340+.',
    tags: ['NEET Biology', 'NCERT Strategy', 'Score 340'], readingTime: 8, date: '2026-03-20',
    emoji: '🌿', coverColor: 'from-emerald-500 to-green-700', author: 'Syllab Team',
  },

  // ── CBSE (mix of evergreen + updates) ────────────────────────────────
  {
    id: 'd1', slug: 'cbse-class-10-board-tips-2026', category: 'cbse', riskLevel: 'low', trending: true,
    title: 'CBSE Class 10 Board Exam 2026: Last-Month Strategy That Works',
    summary: 'With one month left, this is your complete action plan. Subject-wise priorities, NCERT revision checklist, sample paper strategy, and common mistakes to avoid.',
    tags: ['CBSE Class 10', 'Board Exam', 'Strategy'], readingTime: 7, date: '2026-05-15',
    emoji: '📝', coverColor: 'from-blue-500 to-blue-700', author: 'Syllab Team',
  },
  {
    id: 'd2', slug: 'cbse-class-12-physics-important-chapters', category: 'cbse', riskLevel: 'low',
    title: 'CBSE Class 12 Physics: Most Important Chapters for 2026 Boards',
    summary: 'Electrostatics, Current Electricity, and Optics carry 45 marks. Here\'s the full chapter-wise breakdown with tips, formulas, and free practice links.',
    tags: ['CBSE Class 12', 'Physics', 'Chapters'], readingTime: 6, date: '2026-04-20',
    emoji: '⚡', coverColor: 'from-indigo-500 to-purple-700', author: 'Syllab Team',
  },
  {
    id: 'd3', slug: 'ncert-vs-reference-books-cbse', category: 'cbse', riskLevel: 'low', pinned: true,
    title: 'NCERT or Reference Books? The Answer Every CBSE Student Needs',
    summary: 'For boards: NCERT is enough. For JEE/NEET: supplement with reference books. We break down exactly when to use which, subject by subject, for Class 9-12.',
    tags: ['NCERT', 'Reference Books', 'CBSE Strategy'], readingTime: 5, date: '2026-02-28',
    emoji: '📚', coverColor: 'from-teal-500 to-cyan-700', author: 'Syllab Team',
  },

  // ── Coding Skills (evergreen) ─────────────────────────────────────────
  {
    id: 'e1', slug: 'python-roadmap-class-6-to-12', category: 'coding-skills', riskLevel: 'low', pinned: true,
    title: 'Python Roadmap for Students: Class 6 to 12 Complete Guide',
    summary: 'From print("Hello") in Class 6 to Data Science in Class 12 — here\'s the complete Python learning roadmap for Indian school students with free resources.',
    tags: ['Python', 'Roadmap', 'Students'], readingTime: 8, date: '2026-04-10',
    emoji: '🐍', coverColor: 'from-blue-500 to-blue-800', author: 'Syllab Team',
  },
  {
    id: 'e2', slug: 'sql-basics-school-students', category: 'coding-skills', riskLevel: 'low',
    title: 'SQL for School Students: From SELECT to JOINs — Simple Guide',
    summary: 'SQL is used in every company in the world. This guide takes you from your first SELECT statement to JOINs and Aggregates in plain English with Indian examples.',
    tags: ['SQL', 'Databases', 'Beginners'], readingTime: 7, date: '2026-04-05',
    emoji: '🗄️', coverColor: 'from-indigo-500 to-indigo-800', author: 'Syllab Team',
  },
  {
    id: 'e3', slug: 'html-css-javascript-beginners', category: 'coding-skills', riskLevel: 'low',
    title: 'Build Your First Website: HTML + CSS + JavaScript in 1 Hour',
    summary: 'No experience needed. This step-by-step guide teaches you to build a real webpage from scratch using HTML structure, CSS styling, and JavaScript interactivity.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Beginners'], readingTime: 9, date: '2026-03-25',
    emoji: '🌐', coverColor: 'from-orange-500 to-orange-800', author: 'Syllab Team',
  },

  // ── Study Tips (evergreen + frequent) ────────────────────────────────
  {
    id: 'f1', slug: 'pomodoro-technique-students-india', category: 'study-tips', riskLevel: 'low', trending: true,
    title: 'The Pomodoro Technique: Why Top JEE/NEET Students Swear By It',
    summary: '25 minutes of focus, 5-minute break — repeat. We explain exactly how Indian toppers use the Pomodoro technique for board exams, JEE, and NEET with a free schedule template.',
    tags: ['Study Tips', 'Pomodoro', 'Focus'], readingTime: 5, date: '2026-05-18',
    emoji: '⏱️', coverColor: 'from-red-500 to-rose-700', author: 'Syllab Team',
  },
  {
    id: 'f2', slug: 'active-recall-vs-rereading', category: 'study-tips', riskLevel: 'low',
    title: 'Active Recall vs Re-Reading: Which is Better for CBSE Exams?',
    summary: 'Re-reading feels productive but doesn\'t work. Active recall (testing yourself) is proven by science to boost retention by 400%. Here\'s how to use it for every subject.',
    tags: ['Active Recall', 'Study Science', 'Memory'], readingTime: 6, date: '2026-05-12',
    emoji: '🧠', coverColor: 'from-purple-500 to-violet-700', author: 'Syllab Team',
  },
  {
    id: 'f3', slug: 'revision-schedule-class-12', category: 'study-tips', riskLevel: 'low',
    title: '7-Day Rapid Revision Schedule for Class 12 Board Exams',
    summary: 'With 7 days to go, here\'s the exact daily schedule for Class 12 revision — subject-wise, time-wise, with formula sheets, sample paper practice, and rest days.',
    tags: ['Class 12', 'Revision', 'Schedule'], readingTime: 5, date: '2026-05-08',
    emoji: '📅', coverColor: 'from-amber-500 to-yellow-700', author: 'Syllab Team',
  },

  // ── EAMCET ────────────────────────────────────────────────────────────
  {
    id: 'g1', slug: 'eamcet-2026-preparation-strategy', category: 'eamcet', riskLevel: 'medium', pinned: true,
    title: 'EAMCET 2026 Complete Preparation Strategy for AP & TS Students',
    summary: 'EAMCET weightage, important chapters in Physics, Chemistry, Maths/Biology, previous year analysis, and a month-wise study plan for TS EAMCET and AP EAMCET 2026.',
    tags: ['EAMCET 2026', 'TS EAMCET', 'AP EAMCET'], readingTime: 10, date: '2026-04-15',
    emoji: '📐', coverColor: 'from-violet-500 to-purple-800', author: 'Syllab Team',
  },
];

/* ─── Auto-generated articles (from scripts/generate-trending-blogs.mjs) ──────
   Merged into the canonical /updates blog so every generated post is a real,
   indexable /updates/<slug> page (prerendered via scripts/blogArticles.mjs). */
interface AutoBlog { id: string; title: string; description: string; date: string; readTime?: string; category?: string; content: string; }
const AUTO_EMOJI: Record<string, string> = {
  jee: '🔬', neet: '🧬', eamcet: '📐', cbse: '📚', 'ai-tools': '🤖',
  'coding-skills': '💻', 'study-tips': '💡', finance: '💰', 'class-1-4': '🧒',
};
const CURATED_SLUGS = new Set(CURATED_ARTICLES.map(a => a.slug));
const AUTO_BLOG_ARTICLES: Article[] = (autoBlogsRaw as AutoBlog[])
  .filter(b => b && b.id && b.title && b.content && !CURATED_SLUGS.has(b.id))
  .map(b => {
    const cat = (b.category || 'study-tips').toLowerCase();
    return {
      id: b.id,
      slug: b.id,
      title: b.title,
      summary: b.description || b.title,
      category: CATEGORIES.some(c => c.id === cat) ? cat : 'study-tips',
      tags: [],
      readingTime: parseInt(String(b.readTime || '6'), 10) || 6,
      date: b.date || '2026-01-01',
      riskLevel: 'low' as const,
      emoji: AUTO_EMOJI[cat] || '📝',
      coverColor: 'from-emerald-600 to-teal-700',
      author: 'Syllab Team',
      autoContent: b.content,
    };
  });

// Curated first, then auto-generated (deduped by slug).
const ARTICLES: Article[] = [...CURATED_ARTICLES, ...AUTO_BLOG_ARTICLES];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** Render a markdown-lite body string into React elements */
function renderBody(text: string, keyPrefix: string) {
  return text.split('\n').map((line, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!line.trim()) return <div key={key} className="h-2" />;

    // Bold heading: **text**
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
      return (
        <p key={key} className="font-black text-slate-900 mt-5 mb-1 text-base">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    }

    // Mixed inline bold — replace **..** inside text
    if (line.includes('**')) {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={key} className="text-sm leading-relaxed text-slate-700">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} className="font-black text-slate-900">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    }

    // Table row (markdown-ish | col | col |)
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.split('|').filter(c => c.trim() !== '');
      if (cells.every(c => c.trim().match(/^-+$/))) return null; // separator row
      return (
        <div key={key} className="flex gap-2 text-xs font-medium text-slate-700 font-mono bg-slate-50 px-3 py-1 rounded">
          {cells.map((c, j) => <span key={j} className="flex-1">{c.trim()}</span>)}
        </div>
      );
    }

    // Bullet / numbered
    if (/^(-|•|✅|⚠️|🟢|🔴|⭐|📌)/u.test(line) || /^\d+\./.test(line)) {
      return <p key={key} className="ml-4 text-sm font-medium text-slate-700 leading-relaxed">{line}</p>;
    }

    return <p key={key} className="text-sm leading-relaxed text-slate-700">{line}</p>;
  });
}

/* ─── Article card ───────────────────────────────────────────────────────── */
function ArticleCard({ article, onRead }: { article: Article; onRead: (a: Article) => void }) {
  const cat = CATEGORIES.find(c => c.id === article.category);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group flex flex-col rounded-[1.5rem] border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden cursor-pointer"
      onClick={() => onRead(article)}
    >
      {/* Cover */}
      <div className={cn('h-36 bg-gradient-to-br flex items-center justify-center relative', article.coverColor)}>
        <span className="text-5xl drop-shadow">{article.emoji}</span>
        {article.trending && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            <Flame size={10} /> Trending
          </span>
        )}
        {article.pinned && (
          <span className="absolute top-3 right-3 bg-white/20 text-white text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            Evergreen
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {cat && (
          <span className={cn('self-start text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3', cat.color)}>
            {cat.emoji} {cat.label}
          </span>
        )}
        <h3 className="font-black text-slate-900 text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 flex-1">
          {article.summary}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <Clock size={11} /> {article.readingTime} min read
          </div>
          <div className="flex items-center gap-1 text-[11px] font-black text-primary group-hover:gap-2 transition-all">
            Read <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── FAQ accordion ──────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <span className="font-black text-slate-900 text-sm pr-4">{q}</span>
        {open ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Full article modal ─────────────────────────────────────────────────── */
function ArticleModal({
  article,
  onClose,
  setTab,
}: {
  article: Article;
  onClose: () => void;
  setTab: (t: string) => void;
}) {
  const cat = CATEGORIES.find(c => c.id === article.category);
  const full: FullArticle | undefined = getArticleBySlug(article.slug);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden mb-8"
        >
          {/* Cover */}
          <div className={cn('h-52 bg-gradient-to-br flex items-center justify-center relative', article.coverColor)}>
            <span className="text-7xl drop-shadow">{article.emoji}</span>
            {cat && (
              <span className={cn('absolute bottom-4 left-6 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full', cat.color)}>
                {cat.emoji} {cat.label}
              </span>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all font-black text-sm"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight mb-3">
                {full?.title || article.title}
              </h1>
              <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {full?.readingTime || article.readingTime} min read
                </span>
                <span>
                  {new Date(full?.updatedAt || article.date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
                <span>By {full?.author || article.author}</span>
              </div>
            </div>

            {/* Summary / intro */}
            <p className="text-base text-slate-600 font-semibold leading-relaxed border-l-4 border-primary/40 pl-4 bg-primary/5 py-3 pr-4 rounded-r-xl">
              {full?.summary || article.summary}
            </p>

            {/* ── Full article sections ── */}
            {full ? (
              <div className="space-y-8">
                {full.sections.map((section, si) => (
                  <section key={si}>
                    <h2 className="text-lg font-black text-slate-900 mb-3 pb-2 border-b border-slate-100">
                      {section.heading}
                    </h2>
                    <div className="space-y-1">
                      {renderBody(section.body, `s${si}`)}
                    </div>
                  </section>
                ))}

                {/* FAQ */}
                {full.faq && full.faq.length > 0 && (
                  <section>
                    <h2 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-2">
                      {full.faq.map((item, fi) => (
                        <FAQItem key={fi} q={item.question} a={item.answer} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : article.autoContent ? (
              /* Auto-generated article — render its full body. */
              <div className="prose prose-slate max-w-none space-y-1">
                {renderBody(article.autoContent, 'auto')}
              </div>
            ) : (
              /* Fallback for articles not yet in FULL_ARTICLES — rich placeholder */
              <div className="space-y-6">
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
                  <p className="font-black text-amber-900 text-sm mb-1">📝 Full guide being finalised</p>
                  <p className="text-sm text-amber-700 font-medium">
                    This article is being expanded with more detail. In the meantime, explore the topic using the links below.
                  </p>
                </div>
                <div className="prose prose-slate max-w-none">
                  {renderBody(article.summary, 'fallback')}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {(full?.tags || article.tags).map(tag => (
                <span
                  key={tag}
                  className="text-[11px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Internal CTAs */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <p className="font-black text-slate-900 text-sm mb-3">Continue Learning on Syllab</p>
              <div className="flex flex-wrap gap-2">
                {(full?.relatedLinks
                  ? [
                      ...full.relatedLinks,
                      { label: 'Practice MCQs', tab: 'arena' },
                      { label: 'Mock Tests', tab: 'mock_tests' },
                    ]
                  : [
                      { label: 'Syllabus', tab: 'syllabus' },
                      { label: 'Practice MCQs', tab: 'arena' },
                      { label: 'Mock Tests', tab: 'mock_tests' },
                      { label: 'Skills Lab', tab: 'skills_lab' },
                    ]
                ).filter((l, i, arr) => arr.findIndex((x) => x.tab === l.tab && x.label === l.label) === i)
                 .map(({ label, tab }) => (
                  <button
                    key={`${tab}-${label}`}
                    onClick={() => { setTab(tab); onClose(); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:border-primary hover:text-primary transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
interface UpdatesProps { setTab: (t: string) => void; }

export default function Updates({ setTab }: UpdatesProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    try {
      // Deep link: /updates/<slug> → open that article directly (so the
      // prerendered per-article page hydrates into the full reader).
      const m = window.location.pathname.match(/^\/updates\/(.+?)\/?$/);
      if (m) {
        const a = ARTICLES.find(x => x.slug === decodeURIComponent(m[1]));
        if (a) return a;
      }
      // Auto-open a specific article when navigated from the Home page
      const id = sessionStorage.getItem('syllab_open_article');
      if (id) {
        sessionStorage.removeItem('syllab_open_article');
        return ARTICLES.find(a => a.id === id) ?? null;
      }
    } catch { /* ignore */ }
    return null;
  });

  // Open/close an article AND reflect it in the URL (/updates/<slug>) so each
  // article is a real, shareable, indexable page. The list stays at /updates.
  const openArticle = useCallback((a: Article | null) => {
    setSelectedArticle(a);
    try {
      const url = a ? `/updates/${a.slug}` : '/updates';
      if (window.location.pathname !== url) window.history.pushState({}, '', url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch { /* ignore */ }
  }, []);

  // Keep the view in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => {
      const m = window.location.pathname.match(/^\/updates\/(.+?)\/?$/);
      setSelectedArticle(m ? (ARTICLES.find(x => x.slug === decodeURIComponent(m[1])) ?? null) : null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const filtered = useMemo(() => {
    let list = ARTICLES;
    if (activeCategory !== 'all') list = list.filter(a => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const trending = useMemo(() => ARTICLES.filter(a => a.trending), []);
  const pinned = useMemo(() => ARTICLES.filter(a => a.pinned), []);

  return (
    <div className="space-y-8 pb-16">
      <SEO
        title="Student Updates — CBSE, JEE, NEET, AI Tools & Coding News | Syllab.in"
        description="Latest CBSE, NCERT, JEE, NEET, EAMCET exam updates, AI tools news (ChatGPT, Gemini, Claude, Kimi), coding skills guides and study tips for Indian students."
        url="https://syllab.in/updates"
      />

      {/* ── Hero ── */}
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl shrink-0">📡</div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-primary mb-1">Student Updates</div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">
              Exam News, AI Tools &amp; Study Guides
            </h1>
            <p className="text-white/70 font-semibold text-sm max-w-2xl leading-relaxed">
              CBSE/NCERT updates, JEE &amp; NEET preparation guides, latest AI tool news (ChatGPT, Gemini, Claude, Kimi),
              coding skills, and study strategies — all in one place for Indian students.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Articles', value: String(ARTICLES.length), emoji: '📄' },
            { label: 'Categories', value: String(CATEGORIES.length - 1), emoji: '🗂️' },
            { label: 'Updated', value: 'Daily', emoji: '⚡' },
          ].map(({ label, value, emoji }) => (
            <div key={label} className="bg-white/10 rounded-2xl px-4 py-4 text-center">
              <div className="text-xl mb-1">{emoji}</div>
              <div className="text-lg font-black">{value}</div>
              <div className="text-[11px] font-bold text-white/50 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search articles: JEE, Python, Gemini, CBSE..."
          className="w-full pl-11 pr-5 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
        />
      </div>

      {/* ── Category filters ── */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all shrink-0',
              activeCategory === cat.id
                ? cat.color
                : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
            )}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* ── Trending now (only shown when no filter/search active) ── */}
      {activeCategory === 'all' && !searchQuery && (
        <section>
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">
            <Flame size={13} className="text-red-500" /> Trending Now
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.slice(0, visibleCount).map(a => <ArticleCard key={a.slug} article={a} onRead={openArticle} />)}
          </div>
        </section>
      )}

      {/* ── Evergreen / Pinned (only when no filter/search) ── */}
      {activeCategory === 'all' && !searchQuery && (
        <section>
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">
            <Star size={13} className="text-amber-500" /> Essential Evergreen Guides
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinned.slice(0, visibleCount).map(a => <ArticleCard key={a.slug} article={a} onRead={openArticle} />)}
          </div>
        </section>
      )}

      {/* ── Filtered results ── */}
      {(activeCategory !== 'all' || searchQuery) && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500">
              <Filter size={13} />
              {filtered.length} Article{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' ? ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}` : ''}
              {searchQuery ? ` for "${searchQuery}"` : ''}
            </h2>
            {(activeCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-emerald-600 transition-colors"
              >
                Clear ✕
              </button>
            )}
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
              <p className="text-2xl mb-3">🔍</p>
              <p className="font-black text-slate-900 mb-1">No articles found</p>
              <p className="text-sm text-slate-500 font-medium">Try a different search term or category.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.slice(0, visibleCount).map(a => <ArticleCard key={a.slug} article={a} onRead={openArticle} />)}
                </AnimatePresence>
              </div>
              {filtered.length > 9 && visibleCount < filtered.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleCount(visibleCount + 9)}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* ── All articles grid (default view) ── */}
      {activeCategory === 'all' && !searchQuery && (
        <section>
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">
            <TrendingUp size={13} /> All Updates
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTICLES.slice(0, visibleCount).map(a => <ArticleCard key={a.slug} article={a} onRead={openArticle} />)}
          </div>
          {ARTICLES.length > 9 && visibleCount < ARTICLES.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(visibleCount + 9)}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                Load More Articles
              </button>
            </div>
          )}
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-50 border border-emerald-100 p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div>
          <p className="font-black text-slate-900 text-lg mb-1">Have questions about any exam or AI tool?</p>
          <p className="text-sm text-slate-500 font-medium">
            Ask our AI Tutor — it knows CBSE, JEE, NEET, and all the latest AI tools.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setTab('syllabus')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-black text-[11px] uppercase tracking-widest hover:border-primary/30 transition-all"
          >
            <BookOpen size={14} /> Syllabus
          </button>
          <button
            onClick={() => setTab('skills_lab')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Zap size={14} /> Skills Lab
          </button>
        </div>
      </div>

      {/* ── Article modal ── */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => openArticle(null)}
            setTab={setTab}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
