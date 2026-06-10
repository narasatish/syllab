import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import autoBlogsRaw from '../data/autoBlogs.json';

interface AutoBlog {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  category?: string;
  content: string;
}

interface WhatsNewProps {
  onNavigate: (tab: string) => void;
  onOpenArticle: (articleId: string) => void;
}

export default function WhatsNew({ onNavigate, onOpenArticle }: WhatsNewProps) {
  // Get the 3-4 latest blog posts from autoBlogs.json
  const latestPosts = (autoBlogsRaw as AutoBlog[])
    .slice(0, 3)
    .map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      date: post.date,
      readTime: post.readTime || '5 min read',
      category: post.category || 'Study Tips',
    }));

  // New features to highlight
  const newFeatures = [
    {
      icon: '📚',
      title: 'AI Study Room',
      description: 'Focus timer, study music, exam countdowns & a voice AI tutor — like a tuition teacher',
      href: '/study-room',
    },
    {
      icon: '📸',
      title: 'Photo Doubt Solver',
      description: 'Snap any homework question → instant free step-by-step solution',
      href: '/doubt-solver',
    },
    {
      icon: '⚡',
      title: '5-Min Microlearning',
      description: 'Learn any concept in 5 minutes — quick explainer + instant quiz',
      href: '/micro',
    },
    {
      icon: '📖',
      title: 'NCERT Solutions',
      description: 'Complete step-by-step NCERT solutions, chapter by chapter',
      href: '/ncert-solutions',
    },
    {
      icon: '🔴',
      title: 'Live Quiz',
      description: 'Kahoot-style real-time quizzes — host with a PIN, free',
      href: '/live-quiz',
    },
    {
      icon: '🧸',
      title: 'Kids Zone (Pre-KG–3)',
      description: 'Alphabet, rhymes, numbers & coloring for little learners',
      href: '/kids',
    },
    {
      icon: '🎯',
      title: 'Free Alternatives',
      description: 'Free alternatives to BYJU\'S, Unacademy, Kahoot & more',
      href: '/free-alternatives',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-4">
          <Sparkles size={13} />
          What's New
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
          Fresh content & features.
        </h2>
        <p className="text-slate-600 font-medium">
          Latest blog posts, new tools, and exciting updates from Syllab.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Latest Blog Posts */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
            📝 Latest Posts
          </h3>
          <div className="space-y-3">
            {latestPosts.map(post => (
              <button
                key={post.id}
                onClick={() => onOpenArticle(post.id)}
                className="w-full text-left rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500 font-medium line-clamp-1">
                      {post.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-primary/60 group-hover:text-primary transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => onNavigate('updates')}
            className="mt-5 w-full text-center text-xs font-black text-primary hover:text-emerald-600 uppercase tracking-widest transition-colors"
          >
            View All Posts →
          </button>
        </div>

        {/* New Features */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
            ✨ New Features
          </h3>
          <div className="space-y-3">
            {newFeatures.map(feature => (
              <a
                key={feature.href}
                href={feature.href}
                className="block rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 hover:border-primary hover:from-primary/5 hover:to-primary/10 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0 mt-0.5">{feature.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 text-sm group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
