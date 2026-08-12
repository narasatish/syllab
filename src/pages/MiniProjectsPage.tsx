/**
 * MiniProjectsPage.tsx — /mini-projects
 * Catalog of 24 mini coding projects with step-by-step guides.
 * Includes 6 sample projects inline for standalone operation.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Clock,
  Zap,
  ExternalLink,
} from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';

interface MiniProject {
  id: string;
  title: string;
  description: string;
  steps: string[];
  concepts: string[];
  xp: number;
  estimatedMinutes: number;
  previewEmoji: string;
  skill: 'python' | 'javascript' | 'html-css' | 'sql' | 'ai' | 'data';
}

const SAMPLE_PROJECTS: MiniProject[] = [
  {
    id: 'python-number-guessing',
    title: 'Python Number Guessing Game',
    description: 'Build a Python game where the computer picks a number 1-100 and you guess it. Get "Too High" or "Too Low" hints.',
    steps: [
      'Generate random number with random.randint(1,100)',
      'Use a while loop to keep asking for guesses',
      'Compare guess to number and print hints',
      'Count number of attempts',
      'Print "You got it in X tries!" on success',
    ],
    concepts: ['random', 'while loops', 'if/else', 'input'],
    xp: 50,
    estimatedMinutes: 25,
    previewEmoji: '🎯',
    skill: 'python',
  },
  {
    id: 'js-digital-clock',
    title: 'JavaScript Digital Clock',
    description: 'Build a live digital clock that shows current hours, minutes and seconds, updating every second.',
    steps: [
      'Create HTML with a div for the clock display',
      'Get current time using new Date()',
      'Format hours, minutes, seconds with leading zeros',
      'Use setInterval to update every 1000ms',
      'Style with CSS for a digital look',
    ],
    concepts: ['Date object', 'setInterval', 'DOM manipulation', 'CSS styling'],
    xp: 40,
    estimatedMinutes: 20,
    previewEmoji: '🕐',
    skill: 'javascript',
  },
  {
    id: 'html-portfolio',
    title: 'HTML Portfolio Page',
    description: 'Build your own personal portfolio webpage with your name, skills, and a projects section.',
    steps: [
      'Create HTML structure with header, about, skills, projects, contact sections',
      'Add your name, photo placeholder, and bio',
      'List 3-5 skills with simple badges',
      'Add a projects section with 2 sample projects',
      'Style with CSS — colors, fonts, spacing',
    ],
    concepts: ['HTML structure', 'CSS styling', 'sections', 'lists', 'forms'],
    xp: 45,
    estimatedMinutes: 30,
    previewEmoji: '🌐',
    skill: 'html-css',
  },
  {
    id: 'sql-student-db',
    title: 'SQL Student Marks DB',
    description: 'Design a database for a school with students, subjects, and marks tables. Write queries to find toppers.',
    steps: [
      'CREATE TABLE students(id, name, class)',
      'CREATE TABLE marks(student_id, subject, score)',
      'INSERT data for 5 students across 3 subjects',
      'SELECT top scorer per subject using GROUP BY',
      'JOIN students + marks to show names with scores',
    ],
    concepts: ['CREATE TABLE', 'INSERT', 'SELECT', 'JOIN', 'GROUP BY'],
    xp: 50,
    estimatedMinutes: 35,
    previewEmoji: '🗄️',
    skill: 'sql',
  },
  {
    id: 'python-password-checker',
    title: 'Python Password Checker',
    description: 'Build a tool that rates password strength as Weak/Medium/Strong based on length, uppercase, numbers, symbols.',
    steps: [
      'Check password length',
      'Check for uppercase letters',
      'Check for numbers (digits)',
      'Check for symbols (!@#$)',
      'Score 0-4 and map to Weak/Medium/Strong/Very Strong',
    ],
    concepts: ['string methods', 'if/else', 'functions', 'loops'],
    xp: 35,
    estimatedMinutes: 20,
    previewEmoji: '🔐',
    skill: 'python',
  },
  {
    id: 'js-quiz-app',
    title: 'JavaScript Quiz App',
    description: 'Build a 5-question MCQ quiz with score tracking and a results screen.',
    steps: [
      'Create an array of 5 question objects with options and correct index',
      'Show one question at a time',
      'Highlight correct/wrong on click',
      'Track score',
      'Show results: X/5 with grade',
    ],
    concepts: ['arrays of objects', 'event listeners', 'DOM manipulation', 'conditionals'],
    xp: 55,
    estimatedMinutes: 30,
    previewEmoji: '❓',
    skill: 'javascript',
  },
];

const SKILL_FILTER_TABS = [
  { id: 'all' as const, label: 'All' },
  { id: 'python' as const, label: 'Python' },
  { id: 'javascript' as const, label: 'JavaScript' },
  { id: 'html-css' as const, label: 'HTML/CSS' },
  { id: 'sql' as const, label: 'SQL' },
  { id: 'ai' as const, label: 'AI' },
  { id: 'data' as const, label: 'Data' },
];

interface ProjectModalProps {
  project: MiniProject;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onComplete: (projectId: string) => void;
}

function ProjectModal({ project, isOpen, onClose, isCompleted, onComplete }: ProjectModalProps) {
  if (!isOpen) return null;

  const skillToLab: Record<string, string> = {
    python: 'skills_lab',
    javascript: 'skills_lab',
    'html-css': 'skills_lab',
    sql: 'skills_lab',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{project.previewEmoji}</span>
                  <h2 className="text-3xl font-black text-slate-900">{project.title}</h2>
                </div>
                <p className="text-slate-600 font-medium">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-black">
                <Clock size={16} />
                ~{project.estimatedMinutes} min
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-black">
                <Zap size={16} />
                +{project.xp} XP
              </div>
              {isCompleted && (
                <div className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-black">
                  ✓ Completed
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-slate-900 mb-4">Step-by-Step Guide</h3>
              <ol className="space-y-3">
                {project.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-black text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Concepts */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-slate-900 mb-3">Concepts Covered</h3>
              <div className="flex flex-wrap gap-2">
                {project.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {skillToLab[project.skill] && (
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-black hover:bg-primary-dark transition-colors"
                >
                  <ExternalLink size={18} />
                  Open in Skills Lab
                </button>
              )}
              {!isCompleted && (
                <button
                  onClick={() => {
                    onComplete(project.id);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-black hover:bg-emerald-600 transition-colors"
                >
                  ✓ Mark as Complete
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MiniProjectsPage() {
  const [skill, setSkill] = useState<'all' | 'python' | 'javascript' | 'html-css' | 'sql' | 'ai' | 'data'>('all');
  const [selectedProject, setSelectedProject] = useState<MiniProject | null>(null);
  const [completedProjects, setCompletedProjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const completed = JSON.parse(localStorage.getItem('syllab_mini_projects_done') || '[]');
      setCompletedProjects(new Set(completed));
    } catch {
      // Ignore parsing errors
    }
  }, []);

  const filteredProjects = skill === 'all'
    ? SAMPLE_PROJECTS
    : SAMPLE_PROJECTS.filter(p => p.skill === skill);

  const handleComplete = (projectId: string) => {
    const updated = new Set(completedProjects);
    updated.add(projectId);
    setCompletedProjects(updated);
    try {
      localStorage.setItem('syllab_mini_projects_done', JSON.stringify(Array.from(updated)));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <>
      <SEO
        title="Mini Coding Projects for Students | Python JavaScript HTML | Syllab.in"
        description="Build 24 free mini coding projects in Python, JavaScript, HTML and SQL. Step-by-step guided projects for Indian students, Class 6 to 12."
        keywords="mini coding projects students India, Python projects beginners, JavaScript mini projects, HTML CSS projects Class 10 11"
      />

      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Mini Projects 🚀</h1>
          <p className="text-lg text-slate-600 font-medium">
            Build real things in 20–45 minutes. Step-by-step guides from start to finish.
          </p>
        </motion.div>

        {/* Skill Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {SKILL_FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSkill(tab.id)}
              className={cn(
                'px-4 py-2 rounded-2xl font-black text-sm transition-all',
                skill === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.button
              key={project.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(project)}
              className={cn(
                'p-6 rounded-3xl text-left transition-all border-2 flex flex-col',
                completedProjects.has(project.id)
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-primary hover:shadow-lg hover:shadow-emerald-500/10'
              )}
            >
              {/* Emoji Preview */}
              <div className="text-5xl mb-4">{project.previewEmoji}</div>

              {/* Title & Difficulty */}
              <h3 className="text-lg font-black text-slate-900 mb-2 line-clamp-2">{project.title}</h3>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-2">{project.description}</p>

              {/* Metadata */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-black">
                  <Clock size={14} className="text-slate-400" />
                  ~{project.estimatedMinutes}m
                </div>
                <span className="text-xs font-black text-yellow-600">+{project.xp} XP</span>
              </div>

              {/* Concepts */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.concepts.slice(0, 3).map((concept) => (
                  <span
                    key={concept}
                    className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black"
                  >
                    {concept}
                  </span>
                ))}
                {project.concepts.length > 3 && (
                  <span className="text-[11px] font-black text-slate-500">+{project.concepts.length - 3}</span>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between text-primary font-black text-sm">
                <span>{completedProjects.has(project.id) ? '✓ Done' : 'View Project'}</span>
                <ChevronRight size={18} />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-500 font-semibold">No projects in this category yet.</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          onComplete={handleComplete}
          isCompleted={completedProjects.has(selectedProject.id)}
        />
      )}
    </>
  );
}
