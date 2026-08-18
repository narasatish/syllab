#!/usr/bin/env node
/**
 * Static meta-tag pre-renderer for Syllab.in
 *
 * Runs AFTER `vite build`. For each known public route, copies dist/index.html
 * into dist/{route}/index.html with the correct per-page <title>, description,
 * canonical, OG tags and JSON-LD injected into the <head>.
 *
 * Why: Firebase Hosting serves physical files before falling through to the
 * SPA rewrite. So dist/syllabus/index.html is served statically for /syllabus —
 * Googlebot gets proper meta tags even without running JavaScript.
 *
 * Run: node scripts/generate-prerender.mjs  (called by npm run build automatically)
 */

import { promises as fs, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollegesManifest } from './collegesData.mjs';
import { ownershipLabel, recognitionLabel, eligibility as collegeEligibility, coursesOffered, documentsRequired, typicalFacilities, scholarships as collegeScholarships, newsLinks as collegeNewsLinks, comparisonSet } from './collegeEnrich.mjs';
import { getMedicalManifest } from './medicalColleges.mjs';
import { getBlogArticles, isThinArticle } from './blogArticles.mjs';
import { getNcertChapters } from './ncertChapters.mjs';
import { getStateBoardChapters } from './stateBoardChapters.mjs';
import { getAiHubTopics } from './aiHubTopics.mjs';
import { IQ_PILOT } from './iq-pilot.mjs';
import { getDifferences } from './differencesData.mjs';
import { DIFF_REINDEX, DIFF_REINDEX_SLUGS } from './diff-reindex.mjs';
import { mappedChapterSlug } from './mcq-chapter-map.mjs';
import { CONCEPT_FAQ } from './concept-faq.mjs';
import { POSTER_SHEETS, posterHref } from './posters.mjs';
import { HINDI_CONCEPTS } from './hindi-concepts.mjs';
import { EXAM_LIST, EXAM_CATEGORIES } from './exam-slugs.mjs';
const HINDI_CONCEPT_SLUGS = new Set(HINDI_CONCEPTS.map((c) => c.slug));
import { getFullForms, getGlossary, getRevisionNotes, getSamplePapers, getMathsTables, getEnglishWriting, getChapterMcqs, getStaticGk, getEnglishVocab, getEnglishLiterature, getConcepts, getSolvedExamples, getLabPracticals, getVisualLessons, getTimelines, getWhatToStudy, getPyqs, getFormulaSheets } from './studyClusters.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://syllab.in';

// ─── Per-route SEO data (must stay in sync with App.tsx PAGE_SEO) ──────────
// Keys are the URL paths (without leading slash where used as dir names).
/**
 * Duplicate URLs retired after the cannibalisation audit, keyed by cluster.
 *
 * 48 groups of pages shipped an IDENTICAL <title>. Two pages targeting one
 * query split their signals and each holds part of the material.
 *
 * THE KEEPER IN EACH GROUP WAS CHOSEN BY EVIDENCE, NOT BY SLUG STYLE, and that
 * matters: /revision-notes kept class-11-chemistry-structure-of-atom (5,929
 * words) over structure-atom (544), but kept class-11-physics-laws-motion
 * (5,659) over laws-of-motion (615). Opposite slug shapes. Any rule like
 * "prefer the shorter slug" would have retired a 5,929-word page — three of
 * these groups contain chapters deepened earlier the same day.
 *
 * Retired URLs still RESOLVE and ship noindex,follow: deleting them would 404
 * inbound links for no benefit, while noindex ends the competition. The keeper
 * always holds at least as much content, so nothing is lost from the index.
 *
 * KEEP IN STEP with the mirror in generate-sitemap.mjs, and re-run
 * `npm run audit:cannibalisation` before editing.
 */
const RETIRED_SLUGS = {
  '/formula-sheets': new Set([
    'class-10-chemistry-acids-bases-salts',
    'class-10-chemistry-carbon-its-compounds',
    'class-10-chemistry-chemical-reactions-equations',
    'class-10-physics-light-reflection-refraction',
    // Class 10 shipped FOUR trigonometry sheets for NCERT's TWO chapters. The
    // formulas from these two are merged into the sheets that match real
    // chapters — Introduction to Trigonometry (Ch 8) and Some Applications of
    // Trigonometry (Ch 9) — which gained the explicit sin/cos standard-value
    // tables the keeper previously told students to "memorize" without listing.
    'class-10-maths-trigonometry',
    'class-10-maths-applications-of-trigonometry',
  ]),
  '/mcqs': new Set([
    'class-10-maths-real-numbers-mcq',
    'class-10-maths-polynomials-mcq',
    'class-10-maths-triangles-mcq',
    'class-10-maths-trigonometry-mcq',
    'class-10-maths-circles-mcq',
    'class-10-sst-nationalism-india-mcq',
    'class-9-science-matter-mcq',
    'class-9-science-atoms-molecules-mcq',
    'class-9-science-cell-mcq',
    'class-10-science-heredity-mcq',
    'class-10-science-our-environment-mcq',
  ]),
  '/revision-notes': new Set([
    'class-10-maths-pair-linear-equations',
    'class-10-maths-surface-areas-and-volumes',
    'class-10-social-science-agriculture',
    'class-10-sst-nationalism-in-europe',
    'class-11-chemistry-structure-atom',
    'class-11-physics-laws-of-motion',
    'class-11-physics-units-measurements',
    'class-8-maths-squares-and-square-roots',
    'class-8-science-force-and-pressure',
    'class-8-science-reproduction-in-animals',
    'class-9-science-atoms-and-molecules',
    'class-9-science-force-and-laws-of-motion',
    'class-9-science-is-matter-around-us-pure',
    'class-9-science-matter-in-our-surroundings',
    'class-9-science-structure-of-the-atom',
    'class-9-science-the-fundamental-unit-of-life',
    'class-9-science-work-and-energy',
    'class-9-social-science-climate',
    'class-9-social-science-constitutional-design',
  ]),
  '/pyqs': new Set([
    'class-11-chemistry-basic-concepts',
    'class-11-chemistry-chemical-bonding-and-molecular-structure',
    'class-11-chemistry-structure-of-atom',
    'class-11-physics-laws-of-motion',
    'class-11-physics-units-measurements',
    'class-9-science-matter-surroundings',
  ]),
  '/solved-examples': new Set([
    'class-10-maths-statistics-numericals',
    'class-11-gravitation-numericals',
    'class-11-physics-work-power-energy-numericals',
    'class-11-sequences-series-numericals',
    'class-11-thermodynamics-chemistry-numericals',
    'class-11-thermodynamics-numericals',
    'class-9-maths-herons-formula-numericals',
    'class-9-physics-sound-numericals',
    'class-10-maths-arithmetic-progressions-numericals',
    'class-10-maths-coordinate-geometry-numericals',
    'class-10-maths-probability-numericals',
    'class-10-maths-surface-areas-volumes-numericals',
    'class-11-chemistry-mole-concept-numericals',
    'class-12-physics-current-electricity-numericals',
    'class-12-probability-numericals',
    'class-9-maths-polynomials-numericals',
    'class-9-physics-gravitation-numericals',
    'class-9-physics-work-and-energy-numericals',
  ]),
  '/colleges': new Set([
    // Six institutions were each published TWICE under different slugs, with
    // contradicting fees, NIRF ranks and cutoffs - a family comparing Amity saw
    // Rs 3-4 L/yr on one page and Rs 9 L/yr on the other. The RICHER record of
    // each pair survives; these thinner twins are retired rather than merged, so
    // no fee figure has to be invented to reconcile them.
    'iit-bhu',
    'amity-noida',
    'jss-noida',
    'kiet-ghaziabad',
    'thapar-patiala',
    'lpu-jalandhar',
  ]),
  '/medical-colleges': new Set([
    // Amrita's Kochi medical school was published twice. The retired record
    // stored Rs 25,00,000/yr against a Rs 2,50,00,000 total (the 10x pattern)
    // and NIRF #5; the keeper stores a self-consistent Rs 12,20,000/yr over
    // Rs 61,00,000. Neither figure is verifiable, so the record whose own two
    // numbers agree is the one kept.
    'amrita-institute-kochi',
  ]),
  '/concepts': new Set([
    'periodic-table-periodicity',
  ]),
  '/gk-facts': new Set([
    'currency-of-countries',
  ]),
};
const isRetired = (base, slug) => Boolean(RETIRED_SLUGS[base] && RETIRED_SLUGS[base].has(slug));

const ROUTES = [
  {
    // Homepage — without this, dist/index.html ships with no <link rel="canonical">,
    // which is exactly what GSC reported ("User-declared canonical: None").
    // route.path "/" → split/filter(Boolean) is [] → writes dist/index.html. ✓
    path: '/',
    title: 'Syllab.in — Free AI Learning for CBSE, NCERT, JEE & NEET | Class 1–12',
    description: 'India\'s free AI learning platform for Class 1–12. NCERT chapters, MCQ practice, JEE/NEET/EAMCET mock tests, coding, daily GK, AI tutor, career & college predictor — free for every Indian student.',
    keywords: 'free learning app India, AI tutor free India, NCERT solutions free, CBSE notes free Class 1-12, JEE preparation free 2026, NEET preparation free, EAMCET mock test, career predictor free, free education India',
    // SoftwareApplication / EducationalOrganization / WebSite are NOT declared
    // here. index.html already ships richer versions of all three (logo, sameAs,
    // contactPoint, screenshot), and they now survive only on the home page —
    // declaring them again here produced duplicate, conflicting entities on the
    // single most important URL on the site (2× SoftwareApplication,
    // 2× EducationalOrganization, 3× WebSite).
    //
    // NB: no aggregateRating anywhere — fabricated review counts violate Google's
    // structured-data policy (manual-penalty risk). Add only with real data.
    jsonLd: [],
  },
  {
    path: '/syllabus',
    title: 'Class 1–12 NCERT Syllabus + Free Financial Literacy | CBSE Chapters | Syllab.in',
    description: 'Browse NCERT chapters for every class and subject. AI-powered summaries, concept notes, practice questions, and learning guides for Class 1 to 12 CBSE students.',
    keywords: 'NCERT syllabus, CBSE syllabus Class 1 to 12, chapter notes, NCERT chapters, subject-wise chapters',
  },
  {
    path: '/practice',
    title: 'Practice — Free Chapter-wise MCQs for CBSE NCERT | Syllab.in',
    description: 'Practice timed chapter-wise MCQs for NCERT CBSE with instant scoring, explanations, and AI mistake tracking. Free for all Class 1–12 students.',
    keywords: 'CBSE MCQ practice, NCERT questions, chapter wise quiz, online MCQ test, timed practice, CBSE exam prep, free MCQ India, practice arena alternative',
  },
  {
    path: '/story-lessons',
    title: 'Story-Based Learning for CBSE Classes 1–12 — NCERT Chapters as Stories | Syllab.in',
    description: 'Free story-based learning for CBSE NCERT chapters Class 1-12. Every chapter becomes an engaging story. 569 lessons, 534 chapters, voice narration, 100% free for Indian students.',
    keywords: 'story based learning CBSE, NCERT chapters as stories, engaging learning for kids, memory techniques CBSE, narrative learning, free learning stories India, CBSE Class 1-12 stories',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is story-based learning?', acceptedAnswer: { '@type': 'Answer', text: 'Story-based learning transforms NCERT chapters into engaging narratives. Students learn through stories that illustrate key concepts, making them 3-4x more memorable and enjoyable.' } },
          { '@type': 'Question', name: 'Is story-based learning really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, 100% free forever. All 569 story lessons are available to every Indian student at no cost — no signup required, no ads, no hidden charges.' } },
          { '@type': 'Question', name: 'Which classes are covered?', acceptedAnswer: { '@type': 'Answer', text: 'Story lessons are available for Class 1 through Class 12, covering all subjects following the official NCERT curriculum.' } },
          { '@type': 'Question', name: 'Does it follow NCERT exactly?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every story maps 1:1 to NCERT chapters, covering 534 chapters across all subjects and classes.' } },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'Story-Based Learning for CBSE Classes 1–12',
        description: 'Free story-based learning platform for NCERT chapters — every chapter as an engaging narrative for better retention.',
        learningResourceType: 'Story-based lesson',
        isAccessibleForFree: true,
        educationalLevel: 'CBSE Class 1-12',
        inLanguage: 'en-IN',
        url: 'https://syllab.in/story-lessons',
      },
    ],
  },
  {
    path: '/daily-challenges',
    title: 'Daily Challenge — JEE NEET EAMCET & School Daily Quiz | Syllab.in',
    description: 'Take a daily quiz challenge for JEE, NEET, EAMCET, and school aptitude with live rankings and streak tracking. Same quiz for all users — compete with friends. Practice every day, improve your rank.',
    keywords: 'daily challenge free India, daily quiz, JEE daily practice, NEET daily questions, EAMCET quiz, daily challenge app, quiz competition, daily dose CBSE',
  },
  {
    path: '/mock-tests',
    title: 'Mock Tests — Free JEE, NEET, EAMCET & State Exam Papers | Syllab.in',
    description: 'Free mock tests for JEE Main, NEET, EAMCET, VIT, BITSAT, and all state engineering entrance exams (WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE). 10+ mocks each. Math & Science Olympiads included.',
    keywords: 'JEE Main mock test 2026 free, NEET mock test 2026 free, EAMCET mock test free, VIT mock test, BITSAT mock test free, WBJEE mock test free, TNEA mock test, UPSEE 2026 free, MHT-CET mock test free, KCET 2026 mock test, COMEDK UGET practice, GUJCET practice free, OJEE mock test free, state engineering entrance exams, full length mock test free India, board exam practice test Class 10, Math Olympiad free, Science Olympiad practice, sample paper CBSE 2026, previous year question paper, engineering entrance exam preparation free',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Free Mock Tests for JEE, NEET, EAMCET & State Exams',
        description: 'Practice with full mock tests for JEE Mains, NEET, EAMCET, BITSAT, WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE and Olympiads — 200+ mocks total, all free',
        provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        educationalLevel: 'Class 9 to Class 12',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Syllab Mock Tests',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        isAccessibleForFree: true,
        description: '200+ full-length mock tests for JEE, NEET, EAMCET and state engineering exams',
      },
    ],
  },
  {
    path: '/ai-tutor',
    title: 'AI Tutor — Free AI Homework Helper, Notes & Doubt Solver | Syllab.in',
    description: 'Free AI Tutor for Indian students. Generate AI concept notes, flashcards, practice MCQs. Scan & solve homework problems step-by-step. 24/7 doubt solving — no subscription, free for Class 1-12.',
    keywords: 'AI tutor free India, AI homework helper India free, AI notes generator free, flashcard maker free, question paper generator AI, AI tutor homework, concept notes generator AI, AI doubt solver free, scan and solve homework, photo question solver India, ChatGPT alternative for students free, Gemini tutor free, AI math solver India',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Free AI Tutor for Indian Students',
      description: 'AI-powered tutoring with notes generation, flashcards, scan-and-solve, and 24/7 doubt clearing for CBSE NCERT students',
      provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      educationalLevel: 'Class 1 to Class 12',
    },
  },
  {
    path: '/coding',
    title: 'Coding — Free Python, JavaScript, SQL & AI for Students | Syllab.in',
    description: 'Free coding courses for Indian students Class 5-12. Learn Python, JavaScript, SQL, Java, AI basics, Data Analytics, App Dev, Robotics, Game Dev, Git, Cloud, and Prompt Engineering. Build Mini Projects with instant AI feedback.',
    keywords: 'free coding India students, learn coding free India, Python for students India free, Python course Class 10, JavaScript basics free India, SQL basics free, SQL tutorial students, AI basics for students, data science course free India, coding skills students, competitive programming free India, HackerRank alternative free, LeetCode alternative free India, Python tutorial Class 10 11 India, Java basics free, coding course India free, free coding bootcamp India',
  },
  {
    path: '/coding/aptitude',
    title: 'Free Aptitude Training for Students India | Skills Lab | Syllab.in',
    description: 'Master quantitative aptitude, logical reasoning, and verbal ability free. Practice for TCS, Infosys, JEE, NEET, and all competitive exams.',
    keywords: 'aptitude training free India, aptitude for placement, competitive exam aptitude, TCS aptitude questions, NEET aptitude, JEE reasoning free',
  },
  {
    path: '/coding/app-dev',
    title: 'Free App Development Course for Students India | Syllab.in',
    description: 'Learn web and mobile app development — HTML, CSS, JavaScript, React, and build real projects. Free for Class 5–12 students.',
    keywords: 'app development for students India, HTML CSS JavaScript free, learn web development, mobile app development beginners, React tutorial free',
  },
  {
    path: '/coding/robotics',
    title: 'Free Robotics Course for Students India | Arduino, Sensors | Syllab.in',
    description: 'Learn robotics from scratch — Arduino programming, sensors, actuators, line followers, and robot arms. Perfect for Class 8–12 students.',
    keywords: 'robotics for students India, Arduino tutorial, robotics course free, line follower robot, robotics projects students, WRO preparation',
  },
  {
    path: '/coding/game-dev',
    title: 'Free Game Development Course for Students India | Syllab.in',
    description: 'Learn game development with p5.js — interactive graphics, physics, collision detection, and build mini games. Free for Class 5–12.',
    keywords: 'game development for students, p5.js tutorial, game design course free, learn game development, interactive graphics free',
  },
  {
    path: '/coding/git-github',
    title: 'Free Git & GitHub Course for Developers | Version Control | Syllab.in',
    description: 'Master version control with Git and GitHub — essential for every developer. Learn branching, merging, pull requests, and open source contribution.',
    keywords: 'Git tutorial free, GitHub for students, version control learning, Git commands guide, GitHub pages free, open source contribution',
  },
  {
    path: '/coding/prompt-engineering',
    title: 'Free Prompt Engineering Course | ChatGPT, Claude AI | Syllab.in',
    description: 'Learn to communicate with AI models — craft prompts that get precise results. Master ChatGPT, Claude, and LLM applications.',
    keywords: 'prompt engineering for students, ChatGPT prompts tutorial, AI prompt guide, Claude AI prompts, LLM applications free learning',
  },
  {
    path: '/coding/cloud-computing',
    title: 'Free Cloud Computing Course for Students India | AWS, Azure, GCP | Syllab.in',
    description: 'Learn cloud platforms — AWS, Azure, GCP. Deploy apps, understand cloud services, and get cloud-certified. Free for Class 8–12 students.',
    keywords: 'cloud computing for students India, AWS course free, cloud certification, deploy website cloud, cloud engineer training',
  },
  {
    path: '/coding/data-mining',
    title: 'Free Data Mining Course for Students India | Python Analytics | Syllab.in',
    description: 'Discover patterns in large datasets — classification, clustering, association rules, and predictive analytics with Python.',
    keywords: 'data mining for students, data mining tutorial free, machine learning basics, Python data analysis, predictive analytics learning',
  },
  {
    path: '/coding/dsa',
    title: 'Free DSA Course — Data Structures & Algorithms for Placements | Syllab.in',
    description: 'Learn Data Structures & Algorithms free — arrays, hashing, linked lists, stacks, queues, recursion, sorting, searching, trees, heaps, graphs and dynamic programming, with Python examples and practice. The #1 skill for coding interviews.',
    keywords: 'DSA course free, data structures and algorithms tutorial, DSA for placements, DSA in Python, LeetCode preparation free, arrays linked list tree graph dynamic programming, coding interview preparation India, competitive programming basics',
  },
  {
    path: '/coding/c-cpp',
    title: 'Free C & C++ Course — From Basics to OOP & STL | Syllab.in',
    description: 'Learn C and C++ free — variables, control flow, functions, arrays, pointers, structs, dynamic memory, and full C++ OOP (classes, inheritance, polymorphism) plus the STL. Deep, correct examples with practice for college and placements.',
    keywords: 'C programming course free, C++ tutorial free, learn C and C++ online, pointers in C, C++ OOP classes inheritance polymorphism, STL vector map, C++ for placements India, engineering C programming',
  },
  {
    path: '/coding/excel',
    title: 'Free Excel & Google Sheets Course — Formulas, VLOOKUP, Pivot Tables | Syllab.in',
    description: 'Master Excel and Google Sheets free — SUM, IF, VLOOKUP/XLOOKUP, SUMIFS, data cleaning, pivot tables, charts and data validation. The highest-ROI office and data skill for Indian jobs, with real formulas and hands-on practice.',
    keywords: 'Excel course free, Google Sheets tutorial, VLOOKUP XLOOKUP tutorial, pivot table tutorial free, Excel formulas for jobs, SUMIF COUNTIF, Excel for data analyst India, spreadsheet skills',
  },
  {
    path: '/coding/finance',
    title: 'Free Financial Literacy Course — Budgeting, SIP, Stock Market Basics | Syllab.in',
    description: 'Learn money skills free — budgeting (50/30/20), compound interest, banking, mutual funds & SIPs, how the stock market works, risk & diversification, insurance and India income-tax basics. Educational only, not financial advice.',
    keywords: 'financial literacy course free, personal finance for students India, budgeting 50/30/20, compound interest, mutual funds SIP basics, stock market for beginners India, income tax basics, money management skills',
  },
  {
    path: '/coding/digital-marketing',
    title: 'Free Digital Marketing Course — SEO, Ads, Social & Analytics | Syllab.in',
    description: 'Learn digital marketing free — the full funnel: SEO, content, social media, email, Google & Meta ads, and analytics (CPC, ROAS, conversion rate). A degree-optional, high-demand career skill with real examples and practice.',
    keywords: 'digital marketing course free, learn SEO free, social media marketing, Google Ads Meta Ads basics, email marketing, marketing analytics ROAS CPC, digital marketing career India, performance marketing',
  },
  {
    path: '/coding/react',
    title: 'Free React Course — Build Modern Web Apps (React 19 & Hooks) | Syllab.in',
    description: 'Learn React 19 free — JSX, components & props, hooks (useState, useEffect, useContext), forms, lists, fetching APIs and deploying with Vite. Function components and hooks only, with real JSX examples and practice for frontend jobs.',
    keywords: 'React course free, learn React 19, React hooks tutorial, useState useEffect, JSX components props, frontend development India, React for placements, build web apps React Vite',
  },
  {
    path: '/coding/machine-learning',
    title: 'Free Machine Learning Course — scikit-learn, Regression to Neural Nets | Syllab.in',
    description: 'Learn machine learning free — supervised vs unsupervised learning, preprocessing, linear & logistic regression, evaluation metrics, overfitting & regularization, decision trees, random forests, K-Means and intro neural networks, with real scikit-learn code.',
    keywords: 'machine learning course free, ML tutorial scikit-learn, learn machine learning India, linear regression logistic regression, decision trees random forest, K-means clustering, neural networks basics, data science course free',
  },
  {
    path: '/coding/power-bi',
    title: 'Free Power BI Course — Dashboards, DAX & Data Visualization | Syllab.in',
    description: 'Learn Power BI free — connect & clean data with Power Query, model relationships (star schema), choose the right charts, write DAX (measures, CALCULATE, SUMX), add slicers & drill-through, and publish dashboards. A fast route into a data-analyst career.',
    keywords: 'Power BI course free, learn Power BI, DAX tutorial, data visualization course, Power Query, business intelligence India, data analyst dashboard, Power BI for jobs',
  },
  {
    path: '/coding/spoken-english',
    title: 'Free Spoken English Course — Speak Fluently & Confidently | Syllab.in',
    description: 'Learn spoken English free — overcome hesitation, everyday conversation, fix common grammar mistakes, build vocabulary, improve pronunciation, professional communication, self-introduction & interviews, and a 30-day fluency plan for Indian students.',
    keywords: 'spoken English course free, learn English speaking India, English fluency, English grammar mistakes Indians make, English for interviews, improve pronunciation, self introduction English, communication skills',
  },
  {
    path: '/coding/linux',
    title: 'Free Linux & Command Line Course — Terminal, Bash & SSH | Syllab.in',
    description: 'Learn Linux free — navigate the filesystem, manage files, permissions (chmod), pipes & grep, processes, package management, shell scripting and SSH. Essential for developer, data, DevOps and cybersecurity careers, with real commands and practice.',
    keywords: 'Linux course free, learn command line, bash scripting tutorial, Linux terminal commands, chmod permissions, grep pipes, SSH tutorial, Linux for DevOps India',
  },
  {
    path: '/coding/reasoning',
    title: 'Free Logical Reasoning & Verbal Ability Course — Placement Prep | Syllab.in',
    description: 'Learn logical reasoning & verbal ability free — series & patterns, coding-decoding, blood relations, direction sense, syllogisms, seating puzzles, logical deduction, reading comprehension and verbal ability, with reliable techniques for placements & competitive exams.',
    keywords: 'logical reasoning course free, verbal ability, aptitude reasoning for placements, syllogisms coding decoding, blood relations direction sense, seating arrangement puzzles, reasoning for TCS Infosys, competitive exam reasoning',
  },
  {
    path: '/coding/interview-prep',
    title: 'Free Resume & Interview Preparation Course — Land the Offer | Syllab.in',
    description: 'Learn resume & interview prep free — build a strong one-page resume, write achievement bullets, beat the ATS, craft your LinkedIn & cover letter, answer "tell me about yourself", master the STAR method, and handle salary & tricky questions. For Indian freshers.',
    keywords: 'resume building course free, interview preparation India, ATS friendly resume, STAR method interview, tell me about yourself answer, fresher interview tips, LinkedIn profile, HR interview questions',
  },
  {
    path: '/coding/entrepreneurship',
    title: 'Free Entrepreneurship & Startup Course — Idea to Business | Syllab.in',
    description: 'Learn entrepreneurship free — the founder mindset, validating a problem, market research, business models (Business Model Canvas), building an MVP (lean startup), unit economics & break-even, first customers, funding and scaling in the Indian startup ecosystem.',
    keywords: 'entrepreneurship course free, how to start a startup India, business model canvas, MVP lean startup, unit economics break-even, startup funding bootstrapping, customer validation, Indian startup ecosystem',
  },
  {
    path: '/coding/public-speaking',
    title: 'Free Public Speaking Course — Present with Confidence | Syllab.in',
    description: 'Learn public speaking free — overcome stage fear, structure a talk (hook, body, close), tell engaging stories, master body language and voice, design clean slides, handle Q&A, present online, and follow a 30-day improvement plan. For students & professionals.',
    keywords: 'public speaking course free, overcome stage fear, presentation skills, storytelling for speeches, body language voice, slide design, Q&A handling, communication skills India',
  },
  {
    path: '/coding/graphic-design',
    title: 'Free Graphic Design Course with Canva — Learn Design from Scratch | Syllab.in',
    description: 'Learn graphic design free with Canva — elements of design, colour theory, typography, layout & hierarchy, the CRAP principles, designing for social media, and making resumes, posters and logos. No expensive software or prior skill needed.',
    keywords: 'graphic design course free, Canva tutorial, learn design from scratch, colour theory typography, design principles CRAP, social media design, make a logo poster resume, freelance design India',
  },
  {
    path: '/coding/vedic-maths',
    title: 'Free Vedic & Mental Maths Course — Fast Calculation Tricks | Syllab.in',
    description: 'Learn Vedic & mental maths free — fast addition & subtraction, multiplication tricks (by 11, near a base, criss-cross), squaring, quick division, divisibility rules and mental shortcuts for exams. Learn why each trick works, with worked examples and practice.',
    keywords: 'vedic maths course free, mental maths tricks, fast calculation techniques, multiplication tricks, squaring numbers fast, divisibility rules, speed maths for exams, vedic maths for JEE CAT bank',
  },
  {
    path: '/english',
    title: 'English — Free AI Speaking, Grammar & Vocabulary Practice | Syllab.in',
    description: 'Practice English daily with AI speaking coach, grammar challenges, reading passages, NCERT story guides, vocabulary builder, and IELTS prep — all free for Indian students.',
    keywords: 'English speaking practice free India, IELTS preparation free, English grammar CBSE Class 10, English vocabulary app free, spoken English practice app, NCERT English Class 9 10, English reading comprehension free, AI English teacher free India, free English coach India, spoken English course free, learn English online free India',
  },
  {
    path: '/preparation',
    title: 'JEE NEET EAMCET Board Exam Preparation Guides | Syllab.in',
    description: 'Comprehensive preparation guides for JEE Mains, NEET, EAMCET, and CBSE boards — chapter weightage, study plans, important formulas, and tips from top scorers.',
    keywords: 'JEE preparation guide, NEET study plan, EAMCET tips, board exam preparation, CBSE study strategy',
  },
  {
    path: '/about',
    title: 'About Syllab.in — Free AI Education for Every Indian Student',
    description: 'Syllab.in is on a mission to make AI-powered, high-quality education completely free for every Indian student from Class 1 to 12.',
    keywords: 'about Syllab, AI education India, free edtech, Indian student app, mission free learning',
  },
  {
    path: '/contact',
    title: 'Contact Syllab.in — Student Support & Partnership Enquiries',
    description: 'Get help from Syllab.in support for learning issues, platform questions, school partnerships, and academic queries.',
    keywords: 'contact Syllab, student support, help center, school partnership, edtech support India',
  },
  {
    path: '/blog',
    title: 'Study Tips & Guides for CBSE JEE NEET Students | Syllab.in Blog',
    description: 'Free study tips, chapter guides, exam strategies, and preparation advice for CBSE Class 5–12, JEE Mains, NEET, and EAMCET students. Auto-updated weekly with trending topics.',
    keywords: 'study tips CBSE students, JEE preparation strategy 2026, NEET exam guide, board exam tips Class 10, how to score high, important chapters high weightage, exam strategy blog, free NCERT notes Class 10, JEE NEET EAMCET 2026 preparation, best free coding platforms India students, CBSE Class 10 board exam tips 2026',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Syllab.in Blog',
      description: 'Free study tips, exam guides, and preparation strategies for Indian students Class 1-12. Auto-refreshed with trending topics every week.',
      url: 'https://syllab.in/blog',
      publisher: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      inLanguage: 'en-IN',
    },
  },
  {
    path: '/updates',
    title: 'Blog — Latest CBSE, JEE, NEET, AI & Study Tips for Indian Students | Syllab.in',
    description: 'Daily updates for Indian students: CBSE notifications 2026, JEE Mains updates, NEET 2026 news, EAMCET schedule, AI tool launches (ChatGPT, Claude, Gemini), coding trends, study tips. Aggregated from top edtech sources, refreshed daily.',
    keywords: 'CBSE updates 2025 2026, CBSE notification 2026, JEE Mains 2026 news, JEE Mains January 2026 dates, NEET latest news 2026, NEET 2026 schedule, EAMCET 2026 notification, AI tools for students 2026, ChatGPT for students, Claude AI tutor, Gemini AI study, coding skills India trending, student news updates India, edtech news India, NCERT updates 2026, board exam news 2026, free education news India, daily student news, education news today India',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: 'Syllab.in Updates',
      description: 'Daily-updated education news for Indian students Class 1-12 covering CBSE, JEE, NEET, EAMCET, AI tools, and coding trends',
      url: 'https://syllab.in/updates',
      publisher: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      inLanguage: 'en-IN',
    },
  },
  {
    path: '/coding-challenges',
    title: 'Free Coding Challenges for Students | JavaScript Python | Syllab.in',
    description: 'Practice coding with free interactive challenges for Indian students. Run JavaScript code in your browser, earn XP, and level up your programming skills.',
    keywords: 'competitive programming India free, coding practice students free, LeetCode alternative free India, HackerRank free students, JavaScript practice problems, Python coding challenges, programming contests free',
  },
  {
    path: '/mini-projects',
    title: 'Mini Coding Projects for Students | Python JavaScript HTML | Syllab.in',
    description: 'Build 24 free mini coding projects in Python, JavaScript, HTML and SQL. Step-by-step guided projects for Indian students, Class 6 to 12.',
    keywords: 'mini coding projects students India, Python projects beginners, JavaScript projects, HTML CSS projects Class 10 11',
  },
  {
    path: '/coding-for-kids',
    title: 'Free Coding for Kids India | Class 3–8 Programming | Syllab.in',
    description: 'Learn coding for free with fun games and challenges designed for Indian kids Class 3 to 8. Start with Scratch basics, Python, and JavaScript — no prior experience needed.',
    keywords: 'coding for kids India, free coding Class 3 4 5 6 7 8, kids programming India, learn coding children, coding games for kids free',
  },
  {
    path: '/python-for-kids',
    title: 'Free Python for Kids India | Class 6–10 Python Basics | Syllab.in',
    description: 'Learn Python programming free for Indian students Class 6 to 10. Easy Python tutorials, projects, and practice — the most popular coding language for careers in AI and data science.',
    keywords: 'Python for kids India, free Python Class 6 7 8 9 10, Python beginners students, learn Python free India, Python projects students',
  },
  {
    path: '/computer-basics',
    title: 'Free Computer Basics for Class 3–8 | CBSE ICT Notes | Syllab.in',
    description: 'Learn computer basics free — hardware, software, internet, cyber safety for CBSE Class 3 to 8 students. Aligned with NCERT ICT syllabus with fun quizzes.',
    keywords: 'computer basics Class 3 4 5 6 7 8, CBSE computer science, free ICT notes students India, hardware software basics, computer parts kids',
  },
  {
    path: '/cyber-safety',
    title: 'Free Cyber Safety for Students India | Class 5–10 | Syllab.in',
    description: 'Learn internet safety, cyberbullying awareness, and online privacy for free. Essential cyber safety course for Indian students Class 5 to 10 by Syllab.in.',
    keywords: 'cyber safety for students India, internet safety kids, cyberbullying awareness Class 8 9 10, online safety free course India, digital literacy students',
  },
  {
    path: '/ai-for-students',
    title: 'Free AI for Students India | Class 8–12 Artificial Intelligence | Syllab.in',
    description: 'Learn Artificial Intelligence free for Indian students Class 8 to 12. AI basics, machine learning, ChatGPT, and career paths — free course at Syllab.in.',
    keywords: 'AI for students India, artificial intelligence Class 8 9 10 11 12, machine learning students free, ChatGPT for students, AI career India',
  },
  {
    path: '/web-development',
    title: 'Free Web Development for Students India | HTML CSS JavaScript | Syllab.in',
    description: 'Learn web development free — HTML, CSS, JavaScript projects for Indian students Class 8 to 12. Build real websites and launch your tech career.',
    keywords: 'web development for students India, free HTML CSS JavaScript Class 10 11 12, website building beginners India, front-end development students free',
  },
  {
    path: '/gk-quiz',
    title: 'GK Quiz — Free General Knowledge MCQs for Indian Students | Syllab.in',
    description: 'Practice 150+ GK quiz questions on Indian history, geography, polity, static GK, current affairs 2025-26, and science. Free daily GK quiz for Class 5-12 students. Same quiz for all users daily.',
    keywords: 'GK questions India free, general knowledge MCQ free India, Indian history MCQ Class 8 9 10, geography questions India, current affairs 2026 India, GK quiz Class 5 6 7 8 9 10, CBSE GK questions free, competitive exam GK preparation, polity questions UPSC SSC, daily GK quiz India, static GK MCQ, Indian constitution MCQ, GK for SSC banking, GK Olympiad questions, NTSE GK preparation, Indian states capitals quiz, ISRO missions GK, awards 2026 India',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Free General Knowledge Quiz for Indian Students',
        description: '150+ GK MCQs on Indian history, geography, polity, current affairs and science — free daily quiz for Class 5-12',
        provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        educationalLevel: 'Class 5 to Class 12',
        teaches: 'Indian History, Geography, Polity, Static GK, Current Affairs, Science GK',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syllab.in/' },
          { '@type': 'ListItem', position: 2, name: 'General Knowledge', item: 'https://syllab.in/gk-quiz' },
        ],
      },
    ],
  },
  {
    path: '/career-predictor',
    title: 'Free Career Predictor: JEE/NEET Rank & College Predictor, Career Quiz & Exam Dates | Syllab.in',
    description: 'Free career predictor for Indian students — JEE Main & state (EAMCET/KCET/MHT-CET/WBJEE) rank & college predictor, NEET marks-to-rank & MBBS college predictor (all categories), career explorer with salaries, an interest quiz to find your stream, the 2026 exam calendar and scholarships. Indicative estimates from 2024 data.',
    keywords: 'career predictor free India, JEE rank predictor free, JEE Main percentile to rank, JEE college predictor free, NEET rank predictor free, NEET college predictor, MBBS college predictor India, EAMCET rank predictor, KCET college predictor, MHT-CET predictor, WBJEE predictor, career quiz after 10th, which stream after 10th, career options after 12th India, career salary India, 2026 exam dates JEE NEET CUET, scholarships for students India, JoSAA cutoff predictor',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Syllab Career & College Predictor',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        isAccessibleForFree: true,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syllab.in/' },
          { '@type': 'ListItem', position: 2, name: 'Career & Predictor', item: 'https://syllab.in/career-predictor' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is the Syllab career & college predictor free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the JEE/NEET rank predictor, college predictor, career explorer, interest quiz, exam calendar and scholarships list are 100% free for all Indian students, with no sign-up required.' } },
          { '@type': 'Question', name: 'How accurate is the JEE / NEET rank predictor?', acceptedAnswer: { '@type': 'Answer', text: 'It gives an indicative estimate based on publicly reported 2024 JoSAA/MCC/NTA data. Real cutoffs change every year with exam difficulty, number of applicants and category, so always confirm on the official counselling website before any decision.' } },
          { '@type': 'Question', name: 'Which entrance exams does the predictor cover?', acceptedAnswer: { '@type': 'Answer', text: 'JEE Main, BITSAT, AP & TS EAPCET (EAMCET), KCET, MHT-CET, WBJEE for engineering, plus NEET UG for MBBS/medical colleges. Reservation categories (General, EWS, OBC, SC, ST) are supported.' } },
          { '@type': 'Question', name: 'Can it help me choose a stream after Class 10?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — take the free 6-question interest quiz to get a best-fit stream (Science PCM/PCB, Commerce or Arts), then explore careers with salary ranges, education paths and the exams you would need.' } },
        ],
      },
    ],
  },
  {
    path: '/terms',
    title: 'Terms of Service | Syllab.in',
    description: 'Read the Terms of Service for Syllab.in — India\'s free AI learning platform for Class 1 to 12 students.',
    keywords: 'Syllab terms of service, terms and conditions',
    noindex: true,
    bodyHtml: `
      <p style="font-size:0.8rem;color:#666;">Last updated: 11 June 2026</p>
      <p>By using Syllab.in you agree to these terms. Please read them. If you do not agree, please do not use the service.</p>
      <h2>1. The service</h2>
      <p>Syllab provides free educational content and tools (syllabus notes, practice, mock tests, an AI tutor, a career &amp; college predictor, worksheets and more) for students in India. Features may change or improve over time.</p>
      <h2>2. Eligibility</h2>
      <p>Syllab is intended for school students. If you are under 18, you should use Syllab with the involvement and consent of a parent or guardian.</p>
      <h2>3. Acceptable use</h2>
      <p>Use Syllab for learning. Do not misuse it — no attempts to break, overload or reverse-engineer the service, no scraping at scale, no uploading unlawful or harmful content, and no using the AI features to generate abusive or unsafe content.</p>
      <h2>4. Educational guidance only</h2>
      <p>All content — including AI answers, rank/college predictions, cut-offs, fees and placement figures — is indicative and for guidance only, and may contain errors. Always verify important decisions against official sources (NCERT/CBSE, the exam board, JoSAA/MCC/NTA, and college websites). Syllab does not provide professional, legal, medical or financial advice.</p>
      <h2>5. Intellectual property</h2>
      <p>Syllab's name, design and original content belong to Syllab. You may use the content for personal, non-commercial learning. Third-party names and trademarks belong to their owners.</p>
      <h2>6. Disclaimers &amp; liability</h2>
      <p>The service is provided "as is", without warranties. To the extent permitted by law, Syllab is not liable for any loss arising from reliance on the content or from interruptions to the free service.</p>
      <h2>7. Changes, termination &amp; law</h2>
      <p>We may update these terms and may suspend accounts that misuse the service. These terms are governed by the laws of India. Questions? Email <a href="mailto:narasatish966@gmail.com">narasatish966@gmail.com</a>.</p>
    `,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Syllab.in',
    description: 'Read the Privacy Policy for Syllab.in. We are committed to protecting student data and your privacy.',
    keywords: 'Syllab privacy policy, data protection, student privacy',
    noindex: true,
    bodyHtml: `
      <p style="font-size:0.8rem;color:#666;">Last updated: 11 June 2026</p>
      <p>Syllab.in ("Syllab", "we", "us") is a free learning platform for students in India. We respect your privacy and keep data collection to the minimum needed to run the service. This policy explains what we collect, why, and your choices.</p>
      <h2>1. Information we collect</h2>
      <ul>
        <li><strong>Account details</strong> (optional): if you sign in, your name, email and class/board — to save your progress.</li>
        <li><strong>Learning activity</strong>: quizzes, practice, study sessions and progress, so we can show your dashboard.</li>
        <li><strong>On-device storage</strong>: your browser's local storage (cached answers, preferences) — this stays on your device.</li>
        <li><strong>Basic analytics</strong>: anonymised usage data to improve the product. We do not sell your data.</li>
      </ul>
      <h2>2. How we use it</h2>
      <p>To provide and improve learning features, save your progress, personalise content to your class/board, and keep the service secure. We do not sell or rent personal data, and we do not show third-party behavioural ads to children.</p>
      <h2>3. Children's privacy</h2>
      <p>Syllab is used by school students, including those under 18. We collect only what is necessary for learning. In line with India's Digital Personal Data Protection (DPDP) Act, 2023, we expect a parent or guardian to provide consent for a child's account. Parents can request access to or deletion of a child's data by contacting us.</p>
      <h2>4. Service providers</h2>
      <p>We use trusted providers to run Syllab — Google Firebase (authentication, database, hosting) and AI APIs that generate explanations. They process data only to provide their service, under their own security and privacy terms.</p>
      <h2>5. Data security &amp; retention</h2>
      <p>We use reasonable technical safeguards (encrypted connections, access rules) to protect data. We keep account and progress data only while your account is active, or as required by law.</p>
      <h2>6. Your rights</h2>
      <p>You can access, correct or delete your personal data, and withdraw consent, at any time. To do so, email us and we'll act on your request promptly.</p>
      <h2>7. Changes &amp; contact</h2>
      <p>We may update this policy and will revise the date above. Questions or requests? Email <a href="mailto:narasatish966@gmail.com">narasatish966@gmail.com</a>.</p>
    `,
  },
];

// Class pages with rich Course JSON-LD
const CLASS_SUBJECTS = {
  1: ['Mathematics', 'EVS', 'English', 'Hindi'],
  2: ['Mathematics', 'EVS', 'English', 'Hindi'],
  3: ['Mathematics', 'EVS', 'English', 'Hindi'],
  4: ['Mathematics', 'EVS', 'English', 'Hindi'],
  5: ['Mathematics', 'EVS', 'English', 'Hindi'],
  6: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
  7: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
  8: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
  9: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  10: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  11: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Accountancy', 'Business Studies'],
  12: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Accountancy', 'Business Studies'],
};

// Chapters grouped by class, so each /class-N hub can link straight into its own
// NCERT-solution chapter pages. Before this the class hubs linked only to generic
// section landings (23 links, none deeper than a hub) — so they were a dead end:
// no authority reached the ~300 chapter pages that actually target long-tail
// queries, and a student landing on /class-10 had no route to Class 10 content.
const CHAPTERS_BY_CLASS = {};
for (const ch of getNcertChapters()) {
  (CHAPTERS_BY_CLASS[ch.classLevel] ||= {});
  (CHAPTERS_BY_CLASS[ch.classLevel][ch.subject] ||= []).push(ch);
}

/** Crawlable per-subject chapter lists for a class hub. Empty string when we have no chapters. */
function classChapterMesh(c) {
  const bySubject = CHAPTERS_BY_CLASS[String(c)];
  if (!bySubject) return '';
  const subjects = Object.keys(bySubject).sort();
  let html = `<h2>Class ${c} chapter-wise NCERT solutions</h2>`;
  html += `<p>Every Class ${c} chapter below has step-by-step NCERT solutions, free and without signup. Pick a subject and jump straight to the chapter you are studying.</p>`;
  for (const subj of subjects) {
    const list = bySubject[subj];
    html += `<h3>Class ${c} ${esc(subj)}</h3><ul>`;
    for (const ch of list) {
      html += `<li><a href="/ncert-solutions/class-${ch.classLevel}/${ch.subjSlug}/${ch.chapSlug}">${esc(ch.title)} — NCERT Solutions</a></li>`;
    }
    html += `</ul>`;
  }
  // Related study formats for the same class (hubs, not per-chapter, to stay honest
  // about what exists).
  html += `<h2>More free Class ${c} resources</h2><ul>`;
  html += `<li><a href="/ncert-solutions">All NCERT solutions</a> — every class and subject.</li>`;
  html += `<li><a href="/revision-notes">Revision notes</a> — quick last-minute recaps.</li>`;
  html += `<li><a href="/mcqs">Chapter-wise MCQs</a> — practice with instant answers.</li>`;
  html += `<li><a href="/sample-papers">Sample papers</a> and <a href="/pyqs">previous-year questions</a>.</li>`;
  if (c >= 9) html += `<li><a href="/formula-sheets">Formula sheets</a> — printable, subject-wise.</li>`;
  if (c === 10 || c === 12) html += `<li><a href="/mock-tests">Board &amp; entrance mock tests</a> — full-length, timed.</li>`;
  html += `</ul>`;
  return html;
}

for (let c = 1; c <= 12; c++) {
  const isBoard = c === 10 || c === 12;
  const isJeeNeet = c === 11 || c === 12;
  const subjects = CLASS_SUBJECTS[c].join(', ');
  const examSuffix = isJeeNeet ? ', JEE and NEET foundation' : isBoard ? ' and Board exam preparation' : '';
  const boardKeywords = isBoard ? `, CBSE board exam Class ${c}, NCERT solutions Class ${c}, ${isBoard && c === 10 ? 'board exam preparation Class 10, CBSE Class 10 Maths, CBSE Class 10 Science, board exam tips Class 10' : 'board exam preparation Class 12, JEE NEET preparation Class 12'}` : '';
  const jeeNeetKeywords = isJeeNeet ? `, JEE preparation Class ${c}, NEET preparation Class ${c}, competitive exam Class ${c}` : '';
  ROUTES.push({
    path: `/class-${c}`,
    title: `Class ${c} NCERT Syllabus${isBoard ? ', Board Exam Guide' : ''} | Syllab.in`,
    description: `Class ${c} CBSE NCERT complete study guide covering ${subjects}. Free practice questions, chapter notes${examSuffix} — all free on Syllab.in.`,
    keywords: `Class ${c} NCERT, Class ${c} CBSE, Class ${c} syllabus, free NCERT notes Class ${c}, CBSE chapter-wise notes Class ${c}${boardKeywords}${jeeNeetKeywords}`,
    bodyHtml: classChapterMesh(c),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `Class ${c} CBSE NCERT Full Course`,
      description: `Complete CBSE NCERT curriculum for Class ${c} covering ${subjects}.`,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Syllab.in',
        url: SITE,
      },
      url: `${SITE}/class-${c}`,
      educationalLevel: `Grade ${c}`,
      inLanguage: 'en-IN',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      hasCourseInstance: CLASS_SUBJECTS[c].map(sub => ({
        '@type': 'CourseInstance',
        name: `Class ${c} ${sub}`,
        courseMode: 'online',
        isAccessibleForFree: true,
      })),
    },
  });
}

// ─── College pages (/colleges, /colleges/:state, /colleges/:state/:slug) ─────
const { states: COLLEGE_STATES_M, colleges: COLLEGES_M } = getCollegesManifest(ROOT);
// COLLEGES_M still generates a page for every slug (retired duplicates keep
// resolving, they just carry noindex). LISTINGS must use COLLEGES_LIVE, or the
// same institution appears twice in the same ranked table at the same rank.
const COLLEGES_LIVE = COLLEGES_M.filter((c) => !isRetired('/colleges', c.slug));

// ── (H) Data study: Top engineering colleges by NIRF 2025 (crawlable, linkable asset,
//    computed from the verified college directory — no fabricated numbers) ──────────
const toLPA = (v) => {
  const s = String(v ?? '');
  const cr = s.match(/([\d.]+)\s*Cr/i); if (cr) return parseFloat(cr[1]) * 100;
  const lpa = s.match(/([\d.]+)\s*LPA/i); if (lpa) return parseFloat(lpa[1]);
  const n = Number(s.replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(n) || n <= 0) return null;
  return n > 1000 ? n / 100000 : n; // raw rupees → LPA, else assume already LPA
};
const rankedColleges = COLLEGES_LIVE
  .filter((c) => Number.isFinite(Number(c.nirf)) && Number(c.nirf) > 0)
  .sort((a, b) => Number(a.nirf) - Number(b.nirf))
  .slice(0, 30);
const _iitCount = rankedColleges.filter((c) => c.type === 'IIT').length;
const _pkgs = rankedColleges.map((c) => toLPA(c.placementAvg)).filter((n) => n && n < 200);
const _avgPkg = _pkgs.length ? (_pkgs.reduce((a, b) => a + b, 0) / _pkgs.length).toFixed(1) : null;
const _studyRows = rankedColleges.map((c, i) => `<tr><td>${i + 1}</td><td><a href="/colleges/${c.stateSlug}/${c.slug}">${esc(c.name)}</a></td><td>${esc(c.city || '')}</td><td>${esc(c.type)}</td><td>#${c.nirf}</td><td>${esc(c.placementAvg || '—')}</td></tr>`).join('');
const collegesDataStudy = `
  <h2>Data Study: Top ${rankedColleges.length} Engineering Colleges in India by NIRF 2025</h2>
  <p class="speakable">Compiled from Syllab's directory of ${COLLEGES_M.length}+ engineering colleges. The ranking uses official NIRF 2025 Engineering ranks; fees and placement figures are indicative and should be verified on each college's official website.</p>
  <ul>
    <li><strong>${_iitCount} of the top ${rankedColleges.length}</strong> engineering colleges in India are IITs.</li>
    ${_avgPkg ? `<li>The average placement package across these top colleges is about <strong>₹${_avgPkg} LPA</strong> (indicative).</li>` : ''}
    <li>Admission to the top ranks is via <a href="/mock-tests/jee-advanced">JEE Advanced</a> (IITs) and <a href="/mock-tests/jee-main">JEE Main</a> (NITs/IIITs).</li>
  </ul>
  <table><thead><tr><th>#</th><th>College</th><th>City</th><th>Type</th><th>NIRF 2025</th><th>Avg. package (indicative)</th></tr></thead><tbody>${_studyRows}</tbody></table>
  <p>Browse the full directory by state below, or try the free <a href="/college-predictor">college predictor</a> and <a href="/medical-colleges">medical colleges</a>.</p>`;

ROUTES.push({
  path: '/colleges',
  title: 'Top Engineering Colleges in India 2026 — Fees, NIRF Rank, Cutoffs & Admission | Syllab.in',
  description: 'Browse top engineering colleges across India by state — IITs, NITs and the best government & private colleges in Tamil Nadu, Karnataka, Maharashtra, Telangana, Andhra Pradesh, Delhi-NCR & West Bengal. Compare fees, NIRF rank, cutoffs, placements and the full admission process. Free.',
  keywords: 'top engineering colleges India 2026, best engineering colleges by state, engineering college fees, NIRF ranking engineering 2024, top colleges by placement, college cutoff 2026, engineering admission process, IIT NIT cutoff, college predictor India',
  bodyHtml: collegesDataStudy,
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Top Engineering Colleges in India', url: `${SITE}/colleges` },
});

for (const s of COLLEGE_STATES_M) {
  const inState = COLLEGES_LIVE.filter(c => c.stateSlug === s.slug);
  ROUTES.push({
    path: `/colleges/${s.slug}`,
    title: `Top ${inState.length} Engineering Colleges in ${s.name} 2026 — Fees, Cutoff & Ranking | Syllab.in`,
    description: `Best engineering colleges in ${s.name} 2026 — NIRF rank, B.Tech fees, cutoffs, placements and admission process. ${s.blurb}`,
    keywords: `top engineering colleges ${s.name}, best engineering colleges ${s.name} 2026, ${s.name} engineering college fees, engineering admission ${s.name}, college cutoff ${s.name}`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'ItemList', name: `Top Engineering Colleges in ${s.name}`,
      itemListElement: inState.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE}/colleges/${s.slug}/${c.slug}` })),
    },
  });
}

// Indian-format a rupee amount from a raw number/string ("300000" → "₹3,00,000").
const inr = (v) => { const n = Number(String(v).replace(/[^0-9.]/g, '')); return Number.isFinite(n) && n > 0 ? `₹${n.toLocaleString('en-IN')}` : null; };
const lakh = (v) => { const n = Number(String(v).replace(/[^0-9.]/g, '')); return Number.isFinite(n) && n > 0 ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} lakh` : null; };
for (const c of COLLEGES_M) {
  // Data-driven body from the manifest (fees/cutoff/placement all present for every
  // college). 4-year B.Tech tuition = per-year × 4; hostel/mess noted as separate
  // (we don't hold that figure, so we never invent one). GSC shows real research
  // intent here ("<college> fees for 4 years with hostel", "<college> placement 2026").
  const feeYr = inr(c.feesPerYear);
  // Four-year tuition, derived from the annual figure — but ONLY when the
  // record's own two fee fields agree that it is a four-year course.
  //
  // 16 colleges contradict themselves, in opposite directions: 11 Odisha
  // records store feesTotal as perYear x 10 (the ROUND annual figure was typed,
  // the total is wrong), while 5 Gujarat records store perYear as feesTotal / 6
  // — two of them hold 91,667 and 83,333, which are exactly a total divided by
  // six. For that second group, multiplying the annual figure by four
  // understates the course fee against the total actually on record.
  //
  // Deciding which field is true needs the real fee schedules. A fee is a
  // number a family budgets on, so where the record contradicts itself this
  // emits NO four-year figure at all rather than a plausible wrong one. The
  // per-year fee, hostel charge and cutoff are all still published.
  const fee4 = (() => {
    const y = Number(String(c.feesPerYear).replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(y) || y <= 0) return null;
    const t = Number(String(c.feesTotal ?? '').replace(/[^0-9.]/g, ''));
    const totalIsNumeric = Number.isFinite(t) && t > 0 && !/[₹L–]/.test(String(c.feesTotal ?? ''));
    if (totalIsNumeric && Math.abs(t / y - 4) > 0.15) return null; // self-contradictory
    return inr(y * 4);
  })();
  const pkg = inr(c.placementAvg);
  const hi = inr(c.placementHighest);
  const branches = (c.topBranches || []);
  const recruiters = (c.recruiters || []);
  const exams = (c.exams || []);
  const steps = (c.admissionSteps || []);
  const cmpSet = comparisonSet(c, COLLEGES_LIVE);
  const cmpHasPeers = cmpSet.length > 1;
  const good = (() => {
    const bits = [];
    if (c.nirf) bits.push(`ranked #${c.nirf} in India (NIRF Engineering 2025)`);
    else if (c.nirfBand) bits.push(`a place in the ${c.nirfBand} band of NIRF Engineering 2025`);
    if (pkg) bits.push(`an average package of about ${pkg}`);
    if (c.placementRate) bits.push(`a placement rate of around ${c.placementRate}`);
    return bits.length ? `${c.shortName} is a well-regarded choice — it has ${bits.join(', ')}. Whether it is "good for you" depends on your rank, budget and preferred branch (${branches.slice(0, 3).join(', ') || 'engineering'}).` : `${c.shortName} is one of the engineering colleges in ${c.stateName}. Compare its fees, cutoff and placements below to judge fit for your rank and budget.`;
  })();
  const faqs = [
    feeYr && { q: `What is the B.Tech fee at ${c.shortName}?`, a: `The B.Tech tuition fee at ${c.name}, ${c.city} is about ${feeYr} per year${lakh(c.feesPerYear) ? ` (${lakh(c.feesPerYear)} per year)` : ''}. Hostel and mess are charged separately.` },
    fee4 && { q: `What is the total 4-year B.Tech fee at ${c.shortName}?`, a: `Over the full four-year B.Tech course, tuition works out to roughly ${fee4}${lakh(Number(String(c.feesPerYear).replace(/[^0-9.]/g, '')) * 4) ? ` (${lakh(Number(String(c.feesPerYear).replace(/[^0-9.]/g, '')) * 4)})` : ''}, excluding hostel, mess and one-time charges.` },
    c.cutoff && { q: `What is the cutoff / admission requirement for ${c.shortName}?`, a: `${c.cutoff}. Admission is through ${exams.join(' / ') || 'the relevant entrance exam'} followed by counselling.` },
    pkg && { q: `What is the average placement package at ${c.shortName}?`, a: `The average placement package at ${c.name} is around ${pkg} per annum${lakh(c.placementAvg) ? ` (${lakh(c.placementAvg)} LPA)` : ''}${hi ? `, with the highest package reported around ${hi}` : ''}.` },
    exams.length && { q: `Which entrance exam is needed for admission to ${c.shortName}?`, a: `Admission to B.Tech at ${c.name} is based on ${exams.join(', ')}${c.cutoff ? ` — indicatively, ${c.cutoff.toLowerCase()}` : ''}.` },
    { q: `What is the eligibility for B.Tech at ${c.shortName}?`, a: collegeEligibility(c) },
    { q: `Is ${c.shortName} a good college?`, a: good },
    branches.length && { q: `Which branches / courses does ${c.shortName} offer?`, a: `Popular B.Tech branches include ${branches.join(', ')}.${(c.type === 'IIT' || c.type === 'NIT/IIIT' || c.type === 'Government') ? ' Postgraduate (M.Tech) and research (Ph.D.) programmes are also offered.' : ''}` },
  ].filter(Boolean);
  const cmpTable = cmpHasPeers ? `
    <h2>${esc(c.shortName)} vs Top ${esc(c.type)} Colleges — Comparison</h2>
    <p>How ${esc(c.shortName)} compares with peer colleges on the key numbers students weigh (all figures indicative, 2024).</p>
    <table><thead><tr><th>College</th><th>NIRF</th><th>Fees / year</th><th>Avg package</th><th>Placement rate</th></tr></thead><tbody>
      ${cmpSet.map((o) => `<tr><td>${o.slug === c.slug ? `<strong>${esc(o.shortName)}</strong>` : `<a href="/colleges/${o.stateSlug}/${o.slug}">${esc(o.shortName)}</a>`}</td><td>${o.nirf ? '#' + o.nirf : o.nirfBand ? esc(o.nirfBand) : '—'}</td><td>${esc(inr(o.feesPerYear) || o.feesPerYear || '—')}</td><td>${esc(inr(o.placementAvg) || o.placementAvg || '—')}</td><td>${esc(o.placementRate || '—')}</td></tr>`).join('')}
    </tbody></table>` : '';
  const news = collegeNewsLinks(c);
  const scholes = collegeScholarships(c);
  const body = `
    <p class="speakable"><strong>${esc(c.name)}</strong>${c.shortName && c.shortName !== c.name ? ` (${esc(c.shortName)})` : ''} is a ${esc(ownershipLabel(c.type))} in ${esc(c.city)}, ${esc(c.stateName)}${c.established ? `, established in ${c.established}` : ''}.${feeYr ? ` B.Tech tuition is about ${esc(feeYr)}/year${fee4 ? ` (≈ ${esc(fee4)} for 4 years)` : ''}` : ''}${pkg ? `, with an average placement package of around ${esc(pkg)}` : ''}. Admission is through ${esc(exams.join(' / ') || 'the relevant entrance exam')}.</p>
    ${c.about ? `<p>${esc(c.about)}</p>` : ''}

    <h2>${esc(c.shortName)} — Quick Facts</h2>
    <table><tbody>
      <tr><td>Type / ownership</td><td>${esc(ownershipLabel(c.type))}</td></tr>
      ${c.established ? `<tr><td>Established</td><td>${c.established}</td></tr>` : ''}
      <tr><td>Location</td><td>${esc(c.city)}, ${esc(c.stateName)}</td></tr>
      ${c.nirf ? `<tr><td>NIRF Engineering rank (2025)</td><td>#${c.nirf}</td></tr>` : c.nirfBand ? `<tr><td>NIRF Engineering 2025</td><td>rank band ${esc(c.nirfBand)}</td></tr>` : ''}
      <tr><td>Recognition</td><td>${esc(recognitionLabel(c.type))}</td></tr>
      <tr><td>Entrance exam(s)</td><td>${esc(exams.join(', ') || '—')}</td></tr>
      ${c.website ? `<tr><td>Official website</td><td><a href="https://${esc(c.website)}" rel="nofollow noopener">${esc(c.website)}</a></td></tr>` : ''}
    </tbody></table>

    <h2>Courses Offered at ${esc(c.shortName)}</h2>
    <ul>${coursesOffered(c).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>

    <h2>${esc(c.shortName)} B.Tech Fees (2026)</h2>
    <table><tbody>
      ${feeYr ? `<tr><td>Tuition fee (per year)</td><td>${esc(feeYr)}</td></tr>` : ''}
      ${fee4 ? `<tr><td>Total tuition (4 years, B.Tech)</td><td>${esc(fee4)}</td></tr>` : ''}
      ${c.hostelPerYear ? `<tr><td>Hostel &amp; mess (per year)</td><td>${esc(c.hostelPerYear)} (indicative)</td></tr>` : `<tr><td>Hostel &amp; mess</td><td>Charged separately (varies by room type)</td></tr>`}
    </tbody></table>

    <h2>Admission &amp; Eligibility</h2>
    <p>${esc(collegeEligibility(c))}</p>
    <p><strong>Indicative cutoff:</strong> ${esc(c.cutoff || '—')}</p>
    ${steps.length ? `<h3>Admission process (step by step)</h3><ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
    <h3>Documents required</h3>
    <ul>${documentsRequired(c).map((d) => `<li>${esc(d)}</li>`).join('')}</ul>

    <h2>${esc(c.shortName)} Placements (2026)</h2>
    <table><tbody>
      ${pkg ? `<tr><td>Average package</td><td>${esc(pkg)} per annum</td></tr>` : ''}
      ${hi ? `<tr><td>Highest package</td><td>${esc(hi)}</td></tr>` : ''}
      ${c.placementRate ? `<tr><td>Placement rate</td><td>${esc(c.placementRate)}</td></tr>` : ''}
    </tbody></table>
    ${recruiters.length ? `<p><strong>Top recruiters:</strong> ${esc(recruiters.join(', '))}.</p>` : ''}

    ${c.accommodation ? `<h2>Campus &amp; Hostel</h2><p>${esc(c.accommodation)}</p>` : '<h2>Campus &amp; Facilities</h2>'}
    <p><strong>Typical facilities</strong> (verify specifics with the college): ${typicalFacilities().join(', ')}.</p>

    <h2>Scholarships</h2>
    <ul>${scholes.map((s) => `<li><strong>${esc(s.name)}:</strong> ${esc(s.desc)}${s.url ? ` <a href="${s.url}" rel="nofollow noopener">${esc(s.url.replace('https://', ''))}</a>` : ''}</li>`).join('')}</ul>

    ${cmpTable}

    <h2>Latest News &amp; Official Notices</h2>
    <p>For current admission dates, cut-offs and notifications, check the official and news sources directly:</p>
    <ul>${news.map((n) => `<li><a href="${n.url}" rel="nofollow noopener">${esc(n.label)}</a></li>`).join('')}</ul>

    <h2>Frequently Asked Questions</h2>
    ${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}

    <p><a href="/colleges/${c.stateSlug}">More engineering colleges in ${esc(c.stateName)} →</a> · <a href="/college-predictor">Free college predictor →</a> · <a href="/colleges">All colleges by state →</a></p>
    <p><em>All figures (fees, NIRF rank, cutoffs, placements) are indicative for guidance and should be verified on the official college / counselling website before any decision.</em></p>`;
  ROUTES.push({
    path: `/colleges/${c.stateSlug}/${c.slug}`,
    ...(isRetired('/colleges', c.slug) ? { noindex: true } : {}),
    title: `${c.shortName} Fees 2026 — B.Tech Fees, Cutoff & Placements | Syllab.in`,
    description: `${c.name}, ${c.city}: B.Tech tuition ${feeYr || c.feesPerYear}/yr${fee4 ? ` (≈${fee4} for 4 years)` : ''}, ${c.cutoff} Average package ${pkg || c.placementAvg}. Full fees, cutoff & placements — free.`,
    keywords: `${c.name} fees, ${c.shortName} fees for 4 years, ${c.shortName} cutoff 2026, ${c.shortName} placements, ${c.name} admission process, ${c.city} engineering college`,
    bodyHtml: body,
    jsonLd: [
      {
        '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name: c.name,
        url: `${SITE}/colleges/${c.stateSlug}/${c.slug}`,
        address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: c.stateName, addressCountry: 'IN' },
      },
      ...(faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
    ],
  });
}

// City college hubs — "Top Engineering Colleges in {City}" (cities with 2+ colleges).
const cityHubMap = new Map();
for (const c of COLLEGES_M) {
  const slug = c.city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const e = cityHubMap.get(slug) || { city: c.city, slug, state: c.stateName, list: [] };
  e.list.push(c);
  cityHubMap.set(slug, e);
}
for (const ci of cityHubMap.values()) {
  if (ci.list.length < 2) continue;
  const sorted = [...ci.list].sort((a, b) => (a.nirf ?? 999) - (b.nirf ?? 999));
  ROUTES.push({
    path: `/colleges/city/${ci.slug}`,
    title: `Top ${ci.list.length} Engineering Colleges in ${ci.city} 2026 — Fees, Cutoff & Ranking | Syllab.in`,
    description: `Best engineering colleges in ${ci.city}, ${ci.state} 2026 — NIRF rank, B.Tech fees, cutoffs, placements and admission process. Compare the top engineering colleges in ${ci.city}.`,
    keywords: `top engineering colleges in ${ci.city}, best engineering colleges in ${ci.city}, engineering colleges in ${ci.city} fees, ${ci.city} btech admission, ${ci.city} college cutoff 2026`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'ItemList', name: `Top Engineering Colleges in ${ci.city}`,
      itemListElement: sorted.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE}/colleges/${c.stateSlug}/${c.slug}` })),
    },
  });
}

// ─── NCERT Solutions: index + per-chapter pages (high-volume "NCERT solutions") ─
const today = new Date().toISOString().split('T')[0];
const NCERT_CHAPTERS = getNcertChapters();
// Static link hub: list every chapter as a real <a> so crawlers discover the
// chapter pages from the index without running JS (internal linking + PageRank flow).
const ncertHubBody = (() => {
  const byCls = {};
  for (const c of NCERT_CHAPTERS) { (byCls[c.classLevel] ||= {}); (byCls[c.classLevel][c.subject] ||= []).push(c); }
  let html = '<h2>NCERT Solutions by Class &amp; Subject</h2>';
  for (const cls of Object.keys(byCls).sort((a, b) => Number(a) - Number(b))) {
    for (const subj of Object.keys(byCls[cls]).sort()) {
      html += `<h3>Class ${cls} ${esc(subj)}</h3><ul>`;
      for (const c of byCls[cls][subj]) html += `<li><a href="/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}">${esc(c.title)} — Class ${c.classLevel} ${esc(c.subject)} NCERT Solutions</a></li>`;
      html += '</ul>';
    }
  }
  return html;
})();
ROUTES.push({
  path: '/ncert-solutions',
  title: 'Free NCERT Solutions for Class 6–12 (CBSE 2026-27) — Chapter-wise PDF | Syllab.in',
  description: 'Free NCERT solutions for CBSE Class 6 to 12 — chapter-wise, step-by-step answers to textbook exercises in Science, Maths, Physics, Chemistry & Biology for Indian students.',
  keywords: 'NCERT solutions free, NCERT solutions Class 10, NCERT solutions Class 9, NCERT solutions Class 12, CBSE NCERT solutions chapter wise, free textbook solutions India',
  bodyHtml: ncertHubBody,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'NCERT Solutions for Class 6–12', url: `${SITE}/ncert-solutions` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are NCERT solutions free on Syllab?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All NCERT solutions on Syllab are completely free for Class 6 to 12 — chapter-wise, step-by-step answers with no subscription.' } },
      { '@type': 'Question', name: 'Which classes and subjects are covered?', acceptedAnswer: { '@type': 'Answer', text: 'Syllab covers NCERT solutions for Class 6–12 in Science, Mathematics, Physics, Chemistry, Biology and Social Science, aligned to the CBSE/NCERT syllabus.' } },
      { '@type': 'Question', name: 'Are these solutions aligned to the CBSE board exam?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the solutions follow the NCERT textbook exercises used by CBSE and most state boards, so they map directly to board exam preparation.' } },
    ] },
  ],
});
/**
 * The actual NCERT answers, for the page body.
 *
 * WHY THIS EXISTS: public/data/ncert-solutions.json holds 2,207 worked answers
 * — roughly 287,000 words. getNcertChapters() reads that same file but keeps
 * only `count`, throwing every question and answer away. So these routes were
 * pushed with a title, a description and JSON-LD and NO bodyHtml at all, and a
 * crawler saw ~536 words of nav, footer and boot skeleton per page. Against
 * byjus.com's 3,386 on the comparable chapter that is not a content gap, it is
 * a plumbing bug: the content was written, stored and then not rendered.
 *
 * /ncert-solutions is also the site's BEST-converting cluster (3.32% CTR in the
 * 2026-08 GSC export, against 0.06% on /full-forms), so it was the worst place
 * on the site to be shipping an empty body.
 */
const NCERT_BANK = (() => {
  try {
    return JSON.parse(readFileSync(path.join(ROOT, 'public', 'data', 'ncert-solutions.json'), 'utf8'));
  } catch {
    return {};
  }
})();

/**
 * Minimal markdown → HTML for blog article bodies.
 *
 * Deliberately mirrors what src/pages/Blog.tsx renders, so the crawled HTML and
 * the hydrated page agree: '##'/'###' headings, '- ' bullets, '1. ' numbered
 * lists, inline **bold** and [text](/url) links. Escaping runs FIRST, so any
 * angle bracket in the prose is neutralised before markup is introduced.
 */
function mdToHtml(md) {
  const inline = (s) => esc(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return String(md || '').split(/\n{2,}/).map((block) => {
    const b = block.trim();
    if (!b) return '';
    if (b.startsWith('###')) return `<h3>${inline(b.replace(/^###\s*/, ''))}</h3>`;
    if (b.startsWith('##')) return `<h2>${inline(b.replace(/^##\s*/, ''))}</h2>`;
    if (b.startsWith('- ')) {
      return `<ul>${b.split('\n').map((l) => `<li>${inline(l.replace(/^-\s*/, ''))}</li>`).join('')}</ul>`;
    }
    if (/^\d+\.\s/.test(b)) {
      return `<ol>${b.split('\n').map((l) => `<li>${inline(l.replace(/^\d+\.\s*/, ''))}</li>`).join('')}</ol>`;
    }
    return `<p>${inline(b)}</p>`;
  }).join('');
}

/** Answers are stored with markdown-style **bold**; convert AFTER escaping. */
function ncertRich(s) {
  return esc(String(s ?? ''))
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

/**
 * Chapter MCQs, keyed identically to the solutions bank.
 *
 * public/data/generated-mcqs.json holds 11,623 MCQs — question, four options,
 * correct index AND a written explanation — under the very same
 * `class::Subject::chap-slug` keys, covering 242 of the 304 chapters. Like the
 * solutions themselves, none of it was reaching the page. Surfacing it is not
 * padding: a worked answer plus practice questions with explanations is what a
 * student revising this chapter actually wants, and it is what the competitor
 * pages carry.
 */
const NCERT_MCQS = (() => {
  try {
    return JSON.parse(readFileSync(path.join(ROOT, 'public', 'data', 'generated-mcqs.json'), 'utf8'));
  } catch {
    return {};
  }
})();

/** Enough MCQs to give the chapter real revision value without dumping all 50. */
const MCQ_PER_CHAPTER = 20;

/**
 * Guards against publishing a broken question.
 *
 * An audit of the 4,835 MCQs actually reaching these pages found 15 defects
 * (0.31%): 11 questions referencing a graph or figure the page has no way to
 * render — so they are unanswerable as printed — 3 with two identical options,
 * which gives them two correct answers, and 1 carrying leaked model reasoning.
 * A low rate is not a safe rate when the page is teaching method: a student who
 * cannot answer a question assumes the fault is theirs.
 *
 * These reject rather than repair, and the pool holds up to 50 per chapter
 * against the 20 published, so dropping a few costs nothing.
 */
const MCQ_DANGLING = /\b(the|given) (passage|diagram|figure|graph|extract)\b|shown (above|below)/i;
const MCQ_LEAK = /wait,|let me (recalculate|recompute|recheck|verify|reconsider)|i'll mark|assuming (a )?typo|none of the options|but the option says|hmm,|this doesn't match|as an ai|i think the answer/i;

function mcqIsSound(m) {
  const opts = m.options || [];
  if (opts.length !== 4) return false;
  if (!Number.isInteger(m.correct) || m.correct < 0 || m.correct >= opts.length) return false;
  // Two identical options means two correct answers.
  if (new Set(opts.map((o) => String(o).trim().toLowerCase())).size !== opts.length) return false;
  if (MCQ_DANGLING.test(String(m.question ?? ''))) return false;
  if (MCQ_LEAK.test(String(m.explanation ?? ''))) return false;
  if (String(m.explanation ?? '').trim().length < 15) return false;
  return true;
}

function ncertMcqHtml(key, title) {
  const all = NCERT_MCQS[key];
  if (!Array.isArray(all) || !all.length) return '';
  const picked = all.filter(mcqIsSound).slice(0, MCQ_PER_CHAPTER);
  if (!picked.length) return '';
  const body = picked.map((m, i) => {
    const opts = (m.options || []).map((o, j) =>
      `<li>${'ABCD'[j] ? `${'ABCD'[j]}. ` : ''}${esc(o)}</li>`).join('');
    const ans = (m.options || [])[m.correct];
    return `<h4>MCQ ${i + 1}. ${esc(m.question)}</h4><ul>${opts}</ul>` +
      `<p><strong>Answer: ${'ABCD'[m.correct] ?? '?'}${ans ? `. ${esc(ans)}` : ''}</strong>` +
      `${m.explanation ? ` — ${esc(m.explanation)}` : ''}</p>`;
  }).join('');
  return `<h2>${esc(title)} — Practice MCQs with Answers</h2>
    <p>Attempt these ${picked.length} multiple-choice questions after working through the solutions above. Each carries the correct option and the reasoning behind it, so a wrong answer tells you which idea to revisit.</p>
    ${body}`;
}

function ncertBody(c) {
  const key = `${c.classLevel}::${c.subject}::${c.chapSlug}`;
  const items = NCERT_BANK[key];
  if (!Array.isArray(items) || !items.length) return '';
  const qa = items.map((it, i) =>
    `<h3>Q${i + 1}. ${esc(it.q)}</h3><p>${ncertRich(it.solution)}</p>`,
  ).join('');
  const mcqs = ncertMcqHtml(key, c.title);
  return `
    <p class="speakable"><strong>NCERT Solutions for Class ${c.classLevel} ${esc(c.subject)} — ${esc(c.title)}.</strong>
    Step-by-step answers to all ${items.length} textbook questions from this chapter, written for CBSE board preparation and free to use.</p>
    <h2>${esc(c.title)} — All ${items.length} Questions Solved</h2>
    ${qa}
    ${mcqs}
    <h2>How to Use These Solutions</h2>
    <p>Attempt each question yourself first and only then compare with the worked answer. Marks in the CBSE board exam are awarded for the METHOD as much as the final result, so reproduce the steps rather than memorising the last line. Where a solution states a law, a formula or a definition, learn that wording — examiners look for it.</p>
    <p>Related practice for this chapter: <a href="/mcqs">chapter MCQs</a>, <a href="/pyqs">previous-year questions</a>, <a href="/revision-notes">revision notes</a> and <a href="/sample-papers">sample papers</a>.</p>
    <p><a href="/ncert-solutions">All NCERT Solutions, Class 6–12 →</a></p>`;
}

for (const c of NCERT_CHAPTERS) {
  const today = new Date().toISOString().split('T')[0];
  const items = NCERT_BANK[`${c.classLevel}::${c.subject}::${c.chapSlug}`] || [];
  ROUTES.push({
    bodyHtml: ncertBody(c),
    path: `/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`,
    title: `${c.title} — Class ${c.classLevel} ${c.subject} NCERT Solutions (Free) | Syllab.in`,
    description: `Free step-by-step NCERT solutions for Class ${c.classLevel} ${c.subject} chapter "${c.title}" — ${c.count} important questions with detailed answers for CBSE board exam preparation.`,
    keywords: `${c.title} NCERT solutions, Class ${c.classLevel} ${c.subject} NCERT solutions, CBSE ${c.title} questions and answers free`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: `${c.title} — Class ${c.classLevel} ${c.subject} NCERT Solutions`,
      url: `${SITE}/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`,
      inLanguage: 'en-IN', isAccessibleForFree: true,
      author: { '@type': 'Organization', name: 'Syllab.in', url: SITE },
      publisher: { '@type': 'Organization', name: 'Syllab.in', logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` } },
      datePublished: today,
      dateModified: today,
    },
  });
}

// ─── Live Quiz landing (the game itself is dynamic/private) ───────────────────
ROUTES.push({
  path: '/live-quiz',
  title: 'Live Quiz — Free Multiplayer Classroom Quiz Game (Kahoot-style) | Syllab.in',
  description: 'Host a free live multiplayer quiz for your class — students join with a PIN and compete on a real-time leaderboard. Free GK, Science, Maths, Reasoning & English quiz games for Indian students.',
  keywords: 'live quiz game free, multiplayer classroom quiz, kahoot alternative India, online quiz competition for students, live quiz with PIN, school quiz game free',
  jsonLd: [
    {
      '@context': 'https://schema.org', '@type': 'WebApplication',
      name: 'Syllab Live Quiz', applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web', url: `${SITE}/live-quiz`, inLanguage: 'en-IN',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is the live quiz game free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Syllab Live Quiz is completely free with no player limit and no paid tiers.' } },
      { '@type': 'Question', name: 'How many students can join a live quiz?', acceptedAnswer: { '@type': 'Answer', text: 'There is no limit — any number of students can join a game using the 6-digit PIN from their phone or computer browser.' } },
      { '@type': 'Question', name: 'Do students need an app or account to join?', acceptedAnswer: { '@type': 'Answer', text: 'No. Students just open the live quiz page in any browser and enter the PIN — no app to install and no account needed to join.' } },
    ] },
  ],
});

// ─── Free-alternatives pages (high-intent "alternative to X" SEO) ─────────────
ROUTES.push({
  path: '/free-alternatives',
  title: "Free Alternatives to BYJU'S, Unacademy, Kahoot & Vedantu (2026) | Syllab.in",
  description: "Looking for a free alternative to BYJU'S, Unacademy, Vedantu, Toppr or Kahoot? Syllab gives Indian students free NCERT solutions, mock tests, an AI tutor and live quizzes for Class 1–12 — no subscription.",
  keywords: 'free alternative to byjus, unacademy free alternative, kahoot alternative India, vedantu free alternative, toppr alternative, free learning app India',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Alternatives to Top Learning Apps', url: `${SITE}/free-alternatives` },
});
for (const a of [
  { slug: 'kahoot-alternative', brand: 'Kahoot!' },
  { slug: 'byjus-alternative', brand: "BYJU'S" },
  { slug: 'unacademy-alternative', brand: 'Unacademy' },
  { slug: 'vedantu-alternative', brand: 'Vedantu' },
  { slug: 'toppr-alternative', brand: 'Toppr' },
]) {
  ROUTES.push({
    path: `/${a.slug}`,
    title: `Free Alternative to ${a.brand} — Syllab.in (2026)`,
    description: `Looking for a free alternative to ${a.brand}? Syllab gives Indian students free NCERT solutions, mock tests, an AI tutor and live quizzes for Class 1–12 — no subscription needed.`,
    keywords: `free alternative to ${a.brand}, ${a.brand} free alternative, ${a.brand} vs Syllab, free learning app like ${a.brand}`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: `Free Alternative to ${a.brand}`, url: `${SITE}/${a.slug}`, inLanguage: 'en-IN', isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: SITE } },
  });
}

// ─── Kids / Pre-school (Pre-KG → Class 3) — high-volume early-learning SEO ─────
ROUTES.push({
  path: '/kids',
  title: 'Syllab Junior — Free Pre-KG, LKG & UKG Learning, Rhymes & Coloring | Syllab.in',
  description: 'Free playful learning for Indian kids (Pre-KG to Class 3): alphabet & phonics, numbers, shapes & colors, nursery rhymes and printable coloring pages — fun, safe and free.',
  keywords: 'free kids learning India, Pre-KG LKG UKG activities, nursery rhymes for kids, free kids coloring pages, phonics for kindergarten, preschool worksheets free',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Syllab Junior — Kids Learning', url: `${SITE}/kids`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const k of [
  { slug: 'alphabet', name: 'Alphabet & Phonics', kw: 'learn alphabet, phonics for kids, abcd for kids free' },
  { slug: 'numbers', name: 'Numbers & Counting', kw: 'numbers for kids, counting 1 to 20, maths for LKG' },
  { slug: 'shapes', name: 'Shapes & Colors', kw: 'shapes and colors for kids, learn colours, basic shapes' },
  { slug: 'rhymes', name: 'Nursery Rhymes', kw: 'nursery rhymes lyrics, kids rhymes free, twinkle twinkle' },
  { slug: 'coloring', name: 'Coloring Pages', kw: 'free coloring pages for kids, printable colouring, kids drawing' },
]) {
  ROUTES.push({
    path: `/kids/${k.slug}`,
    title: `${k.name} for Kids — Free & Printable | Syllab Junior`,
    description: `Free ${k.name.toLowerCase()} for Pre-KG, LKG, UKG and early-primary kids — playful, mobile-friendly and free on Syllab Junior.`,
    keywords: k.kw,
    jsonLd: { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${k.name} for Kids`, url: `${SITE}/kids/${k.slug}`, inLanguage: 'en-IN', isAccessibleForFree: true, educationalLevel: 'Preschool' },
  });
}

// Junior "tap & listen" GK picture topics — high-intent "X for kids" searches.
for (const t of [
  { slug: 'animals', name: 'Animals & Their Sounds', kw: 'animals and their sounds for kids, animal names for kids, domestic and wild animals' },
  { slug: 'birds', name: 'Birds', kw: 'birds name for kids, birds for kindergarten, list of birds' },
  { slug: 'fruits', name: 'Fruits', kw: 'fruits name for kids, fruits for LKG, fruit names list' },
  { slug: 'vegetables', name: 'Vegetables', kw: 'vegetables name for kids, vegetables for kids, vegetable names list' },
  { slug: 'body', name: 'Body Parts', kw: 'body parts for kids, parts of the body for kids, human body for kindergarten' },
  { slug: 'colours', name: 'Colours', kw: 'colours name for kids, learn colors for kids, colours for LKG' },
  { slug: 'opposites', name: 'Opposites', kw: 'opposites for kids, opposite words for kids, opposite words list' },
  { slug: 'transport', name: 'Vehicles & Transport', kw: 'means of transport for kids, vehicles name for kids, modes of transport' },
  { slug: 'helpers', name: 'Community Helpers', kw: 'community helpers for kids, names of community helpers, helpers around us' },
  { slug: 'habits', name: 'Good Habits', kw: 'good habits for kids, healthy habits for children, good manners for kids' },
  { slug: 'wild', name: 'Wild Animals', kw: 'wild animals name for kids, wild animals for kindergarten' },
  { slug: 'water', name: 'Water Animals', kw: 'water animals for kids, sea animals name for kids, aquatic animals' },
  { slug: 'insects', name: 'Insects', kw: 'insects name for kids, insects for kindergarten, types of insects' },
  { slug: 'flowers', name: 'Flowers', kw: 'flowers name for kids, flower names for kids, types of flowers' },
  { slug: 'family', name: 'My Family', kw: 'family members name for kids, my family for kids, family for LKG' },
  { slug: 'days', name: 'Days of the Week', kw: 'days of the week for kids, seven days for kids, weekdays names' },
  { slug: 'seasons', name: 'Seasons', kw: 'seasons for kids, seasons in India for kids, types of seasons' },
  { slug: 'national', name: 'National Symbols of India', kw: 'national symbols of India for kids, national bird animal flower of India, GK for kids India' },
  { slug: 'festivals', name: 'Festivals of India', kw: 'festivals of India for kids, Indian festivals names, festivals for kids' },
  { slug: 'hindi-swar', name: 'Hindi Varnamala Swar (Vowels)', kw: 'hindi varnamala for kids, hindi swar, hindi vowels for kids, hindi alphabet learning' },
  { slug: 'hindi-vyanjan', name: 'Hindi Varnamala Vyanjan (Consonants)', kw: 'hindi vyanjan for kids, hindi consonants, hindi varnamala ka kha ga, learn hindi alphabet' },
  { slug: 'hindi-numbers', name: 'Hindi Numbers (१–१०)', kw: 'hindi numbers for kids, hindi ginti 1 to 10, hindi counting for kids' },
  { slug: 'tamil-vowels', name: 'Tamil Vowels (Uyir Ezhuthu)', kw: 'tamil letters for kids, tamil vowels, tamil alphabet uyir ezhuthu, learn tamil' },
  { slug: 'telugu-vowels', name: 'Telugu Vowels (Achchulu)', kw: 'telugu letters for kids, telugu vowels achchulu, telugu alphabet, learn telugu' },
  { slug: 'kannada-vowels', name: 'Kannada Vowels (Swaragalu)', kw: 'kannada letters for kids, kannada vowels swaragalu, kannada alphabet, learn kannada' },
  { slug: 'tamil-consonants', name: 'Tamil Consonants (Mei Ezhuthu)', kw: 'tamil consonants for kids, tamil mei ezhuthu, tamil alphabet consonants, learn tamil letters' },
  { slug: 'telugu-consonants', name: 'Telugu Consonants (Hallulu)', kw: 'telugu consonants for kids, telugu hallulu, telugu alphabet consonants, learn telugu letters' },
  { slug: 'kannada-consonants', name: 'Kannada Consonants (Vyanjanagalu)', kw: 'kannada consonants for kids, kannada vyanjana, kannada alphabet consonants, learn kannada letters' },
]) {
  ROUTES.push({
    path: `/kids/learn/${t.slug}`,
    title: `${t.name} for Kids — Free Learning (Tap & Listen) | Syllab Junior`,
    description: `Learn ${t.name.toLowerCase()} the fun way — tap each picture to hear it. Free GK for Pre-KG, LKG, UKG and Class 1 kids in India.`,
    keywords: t.kw,
    jsonLd: { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${t.name} for Kids`, url: `${SITE}/kids/learn/${t.slug}`, inLanguage: 'en-IN', isAccessibleForFree: true, educationalLevel: 'Preschool' },
  });
}

// Moral stories, action rhymes, matching games — big evergreen kid searches.
ROUTES.push({
  path: '/kids/stories',
  title: 'Moral Stories for Kids — Short Bedtime Stories with Morals | Syllab Junior',
  description: 'Free short moral stories for kids — Thirsty Crow, Lion and the Mouse, Hare and the Tortoise and more Panchatantra & Aesop favourites, read aloud. For Pre-KG to Class 3.',
  keywords: 'moral stories for kids, short stories with morals, panchatantra stories for kids, bedtime stories for children, thirsty crow story, hare and tortoise story',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Moral Stories for Kids', url: `${SITE}/kids/stories`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
ROUTES.push({
  path: '/kids/action-rhymes',
  title: 'Action Rhymes for Kids — Sing & Move | Syllab Junior',
  description: 'Free action rhymes for preschoolers — Head Shoulders Knees and Toes, Wheels on the Bus, Itsy Bitsy Spider and more, with simple actions to do. For Pre-KG to Class 1.',
  keywords: 'action rhymes for kids, action songs for preschool, head shoulders knees and toes, wheels on the bus, nursery rhymes with actions',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Action Rhymes for Kids', url: `${SITE}/kids/action-rhymes`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
ROUTES.push({
  path: '/kids/games',
  title: 'Matching Games for Kids — Free Fun Learning Games | Syllab Junior',
  description: 'Free matching games for kids — match animals to sounds, capital to small letters, numbers to counts, fruits to colours and more. Fun learning for Pre-KG to Class 2.',
  keywords: 'matching games for kids, free learning games for kids, match the following for kids, educational games for children, free online kids games',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Matching Games for Kids', url: `${SITE}/kids/games`, inLanguage: 'en-IN', isAccessibleForFree: true },
});

// ─── Microlearning: index + bite-sized module pages ──────────────────────────
ROUTES.push({
  path: '/micro',
  title: 'Microlearning — Free 5-Minute Revision Modules for Class 6–12 | Syllab.in',
  description: 'Learn any concept in 5 minutes — free bite-sized modules with a quick explanation, worked example and instant quiz. Mobile-friendly, low-data revision for Indian students.',
  keywords: 'microlearning India, 5 minute revision, quick revision Class 10, bite sized learning, learn fast, short lessons students free',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Microlearning — 5-Minute Modules', url: `${SITE}/micro`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const m of ['quadratic-formula','newtons-first-law','trigonometry-ratios','photosynthesis','periodic-table-trends','probability-basics','linear-equations','surface-area-volume','acids-bases','fractions-decimals','imperialism-colonialism','plate-tectonics','english-tenses','photosynthesis-respiration','mean-median-mode']) {
  const mname = m.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  ROUTES.push({
    path: `/micro/${m}`,
    title: `${mname} in 5 Minutes — Free Quick Revision | Syllab.in`,
    description: `Learn ${mname} in about 5 minutes — a free bite-sized module with a clear explanation, a worked example and a quick quiz for Indian students.`,
    keywords: `${mname} in 5 minutes, ${mname} quick revision, learn ${mname} fast`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${mname} — 5-Minute Module`, url: `${SITE}/micro/${m}`, inLanguage: 'en-IN', isAccessibleForFree: true, learningResourceType: 'Microlearning module' },
  });
}

// ─── GK Questions — programmatic SEO cluster (index + per class) ─────────────
ROUTES.push({
  path: '/gk-questions',
  title: 'GK Questions for Students — Class 5 to 12 (Free, with Answers) | Syllab.in',
  description: 'Free General Knowledge questions and answers for Indian students Class 5 to 12 — history, geography, polity, science, static GK and current affairs, with clear explanations.',
  keywords: 'gk questions with answers, general knowledge for students, gk for class 5 6 7 8 9 10, gk questions india, static gk, current affairs for students',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'GK Questions for Students', url: `${SITE}/gk-questions`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const c of [5, 6, 7, 8, 9, 10, 11, 12]) {
  ROUTES.push({
    path: `/gk-questions/class-${c}`,
    title: `GK Questions for Class ${c} with Answers (Free) | Syllab.in`,
    description: `Free General Knowledge questions and answers for Class ${c} — GK across history, geography, polity, science and current affairs, with clear explanations for Indian students.`,
    keywords: `gk questions for class ${c}, general knowledge for class ${c}, gk for class ${c} with answers, class ${c} gk quiz, gk questions india class ${c}`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'GK Questions', item: `${SITE}/gk-questions` },
      { '@type': 'ListItem', position: 2, name: `Class ${c}`, item: `${SITE}/gk-questions/class-${c}` },
    ] },
  });
}

// ─── Important Questions — programmatic cluster (Class 6–12, per subject) ─────
const IQ_SUBJECTS = {
  '6': ['mathematics', 'science', 'social-science', 'english'],
  '7': ['mathematics', 'science', 'social-science', 'english'],
  '8': ['mathematics', 'science', 'social-science', 'english'],
  '9': ['mathematics', 'science', 'social-science', 'english'],
  '10': ['mathematics', 'science', 'social-science', 'english'],
  '11': ['physics', 'chemistry', 'biology', 'mathematics'],
  '12': ['physics', 'chemistry', 'biology', 'mathematics'],
};
const subjName = (s) => s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
ROUTES.push({
  path: '/important-questions',
  title: 'Important Questions for Class 6 to 12 — Chapter-wise (Free) | Syllab.in',
  description: 'Free chapter-wise important questions and key chapters for Class 6 to 12 — Maths, Science, Physics, Chemistry, Biology, Social Science & more, CBSE/NCERT-aligned for Indian students.',
  keywords: 'important questions, important questions class 10, important questions class 9, cbse important questions, ncert important questions, important chapters',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Important Questions for Class 6–12', url: `${SITE}/important-questions`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const [c, subs] of Object.entries(IQ_SUBJECTS)) {
  ROUTES.push({
    path: `/important-questions/class-${c}`,
    title: `Important Questions for Class ${c} — All Subjects (Free) | Syllab.in`,
    description: `Chapter-wise important questions and key chapters for Class ${c} — pick a subject. Free, CBSE/NCERT-aligned practice for Indian students.`,
    keywords: `important questions class ${c}, class ${c} important chapters, cbse class ${c} important questions`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Important Questions', item: `${SITE}/important-questions` },
      { '@type': 'ListItem', position: 2, name: `Class ${c}`, item: `${SITE}/important-questions/class-${c}` },
    ] },
  });
  for (const s of subs) {
    ROUTES.push({
      path: `/important-questions/class-${c}/${s}`,
      title: `Important Questions for Class ${c} ${subjName(s)} (Chapter-wise, Free) | Syllab.in`,
      description: `Important questions and high-weightage chapters for Class ${c} ${subjName(s)} — chapter-wise key topics with free practice. CBSE/NCERT-aligned.`,
      keywords: `important questions class ${c} ${s.replace(/-/g, ' ')}, class ${c} ${s.replace(/-/g, ' ')} important chapters, cbse class ${c} ${s.replace(/-/g, ' ')}`,
      jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Important Questions', item: `${SITE}/important-questions` },
        { '@type': 'ListItem', position: 2, name: `Class ${c}`, item: `${SITE}/important-questions/class-${c}` },
        { '@type': 'ListItem', position: 3, name: subjName(s), item: `${SITE}/important-questions/class-${c}/${s}` },
      ] },
    });
  }
}

// ─── Chapter-level important-questions PILOT (substantive, hand-picked) ──────
// Pulls the REAL syllabus data + deterministic question generator from the
// compiled SSR bundle (single source of truth — no duplicated question logic).
// The bundle exists whenever this script runs inside `npm run build`
// (vite build --ssr runs immediately before). Standalone runs without the
// bundle skip these routes with a warning (the SEO audit will then flag the
// sitemap mismatch, which is the correct failure mode).
{
  const iqBundlePath = path.join(ROOT, 'dist-ssr', 'entry-server.js');
  let iqData = null;
  if (existsSync(iqBundlePath)) {
    try {
      const { pathToFileURL } = await import('node:url');
      const mod = await import(pathToFileURL(iqBundlePath).href);
      if (mod.SYLLABUS && mod.generateExamQuestions) iqData = mod;
    } catch (e) {
      console.warn(`⚠️  Could not load SSR bundle for IQ chapter pages: ${e.message}`);
    }
  }
  if (!iqData) {
    console.warn('⚠️  IQ chapter pilot pages SKIPPED (no SSR bundle) — run the full `npm run build`.');
  } else {
    const { SYLLABUS, generateExamQuestions } = iqData;
    for (let i = 0; i < IQ_PILOT.length; i++) {
      const p = IQ_PILOT[i];
      const ch = SYLLABUS.find((x) => x.id === p.id);
      if (!ch) { console.warn(`⚠️  IQ pilot chapter not in SYLLABUS: ${p.id}`); continue; }
      const qs = generateExamQuestions({ title: ch.title, subject: String(ch.subject), topics: ch.topics });
      const url = `${SITE}/important-questions/class-${p.cls}/${p.subjSlug}/${p.chapSlug}`;
      const chapterNo = i + 1;
      const prev = IQ_PILOT[i - 1];
      const next = IQ_PILOT[i + 1];
      const marksOf = (m) => qs.filter((q) => q.marks === m).length;
      const topicsHtml = ch.topics?.length
        ? `<h2>Key Topics in ${esc(ch.title)}</h2><ul>${ch.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
        : '';
      const qListHtml = `<h2>Class ${p.cls} Maths Chapter ${chapterNo} — ${esc(ch.title)} Important Questions</h2><ol>${
        qs.map((q) => `<li><strong>${esc(q.q)}</strong> <em>(${q.marks} marks)</em></li>`).join('')
      }</ol>`;
      const marksTable = `
        <h2>Marks Distribution</h2>
        <table><thead><tr><th>Question type</th><th>Count</th></tr></thead><tbody>
          <tr><td>2-mark (very short answer)</td><td>${marksOf(2)}</td></tr>
          <tr><td>3-mark (short answer)</td><td>${marksOf(3)}</td></tr>
          <tr><td>4–5-mark (long answer)</td><td>${marksOf(4) + marksOf(5)}</td></tr>
          <tr><td><strong>Total questions</strong></td><td><strong>${qs.length}</strong></td></tr>
        </tbody></table>`;
      const prevNext = `<nav style="display:flex;justify-content:space-between;gap:1rem;margin:1.5rem 0;">
        ${prev ? `<a href="/important-questions/class-${prev.cls}/${prev.subjSlug}/${prev.chapSlug}">← Ch ${chapterNo - 1}: ${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a href="/important-questions/class-${next.cls}/${next.subjSlug}/${next.chapSlug}">Ch ${chapterNo + 1}: ${esc(next.title)} →</a>` : '<span></span>'}
      </nav>`;
      const howToPrep = `
        <h2>How to Prepare "${esc(ch.title)}" for the Board Exam</h2>
        <ol>
          <li><strong>Master the NCERT examples first</strong> — most board questions in ${esc(ch.title)} follow NCERT in-text and exercise patterns.</li>
          <li><strong>Practise every question above on paper</strong>, timed: allow ~3 minutes per 2-mark, ~5 minutes per 3-mark and ~8 minutes per 5-mark question.</li>
          <li><strong>Use the free AI tutor</strong> on this page to get a board-style model answer for any question you get stuck on.</li>
          <li><strong>Finish with a mock test</strong> to check speed and accuracy under exam conditions.</li>
        </ol>`;
      ROUTES.push({
        path: `/important-questions/class-${p.cls}/${p.subjSlug}/${p.chapSlug}`,
        title: `${ch.title} Class ${p.cls} Important Questions (Maths Ch ${chapterNo}) — Free | Syllab.in`,
        description: `Class ${p.cls} Maths "${ch.title}" important questions — ${qs.length} board-exam-style questions (2, 3 & 5 marks) with free AI model answers. CBSE/NCERT 2026-27 aligned, no login.`,
        keywords: `${ch.title.toLowerCase()} class ${p.cls} important questions, class ${p.cls} maths chapter ${chapterNo} important questions, ${p.chapSlug.replace(/-/g, ' ')} extra questions, cbse class ${p.cls} maths ${ch.title.toLowerCase()}`,
        bodyHtml: `
          <p class="speakable">Practise <strong>${qs.length} important questions from "${esc(ch.title)}"</strong> (Class ${p.cls} Mathematics, Chapter ${chapterNo}) — exam-pattern 2, 3 and 5-mark questions covering ${esc((ch.topics || []).slice(0, 4).join(', '))}. Every question has a free AI-written board-style model answer.</p>
          ${topicsHtml}
          ${qListHtml}
          ${marksTable}
          ${howToPrep}
          ${prevNext}
          <p><a href="/important-questions/class-${p.cls}/${p.subjSlug}">All Class ${p.cls} Maths important questions →</a> · <a href="/ncert-solutions">NCERT Solutions →</a> · <a href="/mock-tests">Free mock tests →</a></p>`,
        jsonLd: [
          { '@context': 'https://schema.org', '@type': 'Article',
            headline: `${ch.title} — Class ${p.cls} Maths Important Questions`,
            url, inLanguage: 'en-IN', isAccessibleForFree: true,
            author: { '@type': 'Organization', name: 'Syllab.in', url: SITE },
            publisher: { '@type': 'Organization', name: 'Syllab.in', logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` } },
            datePublished: today, dateModified: today },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Important Questions', item: `${SITE}/important-questions` },
            { '@type': 'ListItem', position: 2, name: `Class ${p.cls}`, item: `${SITE}/important-questions/class-${p.cls}` },
            { '@type': 'ListItem', position: 3, name: p.subjName, item: `${SITE}/important-questions/class-${p.cls}/${p.subjSlug}` },
            { '@type': 'ListItem', position: 4, name: ch.title, item: url },
          ] },
        ],
      });
    }
    // Crawl discovery: link every pilot chapter from its subject hub page.
    const hub = ROUTES.find((r) => r.path === `/important-questions/class-10/mathematics`);
    if (hub && !hub.bodyHtml) {
      hub.bodyHtml = `<h2>Class 10 Maths — Chapter-wise Important Questions</h2><ol>${
        IQ_PILOT.map((c) => `<li><a href="/important-questions/class-${c.cls}/${c.subjSlug}/${c.chapSlug}">${esc(c.title)} — Class 10 Maths Important Questions</a></li>`).join('')
      }</ol>`;
    }
  }
}

// ─── SEO landing clusters: mock-test exams, English grammar, career guides ────
const tcSlug = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
// Competitive-exam guide pages (/mock-tests/{slug}) — render the REAL exam data
// (about, pattern, subjects, prep tips, FAQs) from mockExams.ts so crawlers get the
// substantive content the app shows, not a thin BreadcrumbList. Content is read from
// the compiled SSR bundle (single source of truth); routes come from exam-slugs.mjs.
{
  const examBundlePath = path.join(ROOT, 'dist-ssr', 'entry-server.js');
  let MOCK_EXAMS_DATA = null;
  if (existsSync(examBundlePath)) {
    try {
      const { pathToFileURL } = await import('node:url');
      const mod = await import(pathToFileURL(examBundlePath).href);
      if (Array.isArray(mod.MOCK_EXAMS)) MOCK_EXAMS_DATA = mod.MOCK_EXAMS;
    } catch (e) { console.warn(`⚠️  Could not load SSR bundle for exam pages: ${e.message}`); }
  }
  const byExamSlug = new Map((MOCK_EXAMS_DATA || []).map((e) => [e.slug, e]));

  // Category-grouped hub body for /mock-tests (the competitive-exams hub).
  const hubRoute = ROUTES.find((r) => r.path === '/mock-tests');
  if (hubRoute) {
    let hub = '<p class="speakable">Free exam guides and practice for India\'s top competitive &amp; entrance exams — engineering, medical, university (CUET), government jobs and law. Each guide covers the exam pattern, syllabus, eligibility, preparation tips and FAQs.</p>';
    for (const cat of EXAM_CATEGORIES) {
      const inCat = EXAM_LIST.filter((e) => e.category === cat);
      if (!inCat.length) continue;
      hub += `<h2>${esc(cat)} Exams</h2><ul>${inCat.map((e) => `<li><a href="/mock-tests/${e.slug}">${esc(e.name)} — pattern, syllabus &amp; preparation guide</a></li>`).join('')}</ul>`;
    }
    hubRoute.bodyHtml = hub;
  }

  const EXAM_COUNSELLING = {
    'neet': 'MCC (mcc.nic.in) for the 15% All-India Quota, plus your state counselling authority for state-quota seats',
    'jee-main': 'JoSAA (josaa.nic.in) for NITs, IIITs and CFTIs, followed by CSAB special rounds',
    'jee-advanced': 'JoSAA (josaa.nic.in) for admission to the IITs',
    'clat': 'the CLAT Consortium (consortiumofnlus.ac.in) for the participating National Law Universities',
    'ailet': "National Law University (NLU) Delhi's own admission portal",
    'ipmat': "IIM Indore's admission process (and other participating IIMs)",
    'nata': 'the Council of Architecture and the relevant state/institute counselling for B.Arch admission',
    'bitsat': 'the BITS Pilani admissions portal (bitsadmission.com)',
    'viteee': "VIT's own rank-based counselling across its campuses",
    'srmjeee': "SRM's own rank-based counselling across its campuses",
    'comedk-uget': 'the COMEDK counselling portal for private Karnataka colleges',
    'cuet': "the CUET-participating universities' own CSAS/admission portals",
    'ap-eapcet': 'the AP state counselling authority (APSCHE)',
    'ts-eapcet': 'the Telangana state counselling authority (TSCHE)',
    'kcet': 'the Karnataka Examinations Authority (KEA) counselling',
    'mht-cet': 'the Maharashtra CET Cell (CAP rounds)',
    'wbjee': 'the West Bengal Joint Entrance Examinations Board counselling',
    'gujcet': 'the Gujarat ACPC counselling',
  };
  const counsellingFor = (slug) => EXAM_COUNSELLING[slug] || "the official conducting body's counselling / admission process";
  for (const ex of EXAM_LIST) {
    const d = byExamSlug.get(ex.slug);
    const isMock = ex.category === 'Engineering' || ex.category === 'Medical' || ex.category === 'Olympiad';
    const route = {
      path: `/mock-tests/${ex.slug}`,
      title: `${ex.name} 2026 — ${isMock ? 'Free Mock Test, ' : ''}Exam Pattern, Syllabus & Preparation | Syllab.in`,
      description: d ? `${d.about.slice(0, 155).trim()}…` : `${ex.name} exam pattern, syllabus, eligibility and free preparation guide for Indian students on Syllab.in.`,
      keywords: `${ex.name} 2026, ${ex.name} exam pattern, ${ex.name} syllabus, ${ex.name} eligibility, ${ex.name} cutoff, ${ex.name} result, ${ex.name} counselling, ${ex.name} preparation guide${isMock ? `, ${ex.name} mock test free` : ''}`,
      jsonLd: [
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Competitive Exams', item: `${SITE}/mock-tests` },
          { '@type': 'ListItem', position: 2, name: ex.name, item: `${SITE}/mock-tests/${ex.slug}` },
        ] },
      ],
    };
    if (d) {
      const patternRows = [['Total questions', d.pattern.questions], ['Duration', `${d.pattern.durationMin} minutes`], ['Marking scheme', d.pattern.marking]];
      route.bodyHtml = `
        <p class="speakable"><strong>${esc(d.name)} (${esc(d.fullName)}):</strong> ${esc(d.about)}</p>
        <h2>${esc(d.name)} Exam Pattern</h2>
        <table><tbody>${patternRows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(String(v))}</td></tr>`).join('')}</tbody></table>
        <h3>Sections</h3><ul>${d.pattern.sections.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <h2>Subjects Covered in ${esc(d.name)}</h2><p>${d.subjects.map(esc).join(' · ')}</p>
        <h2>How to Prepare for ${esc(d.name)}</h2><ol>${d.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
        <h2>${esc(d.name)} Result, Cutoff &amp; Counselling</h2>
        <p><strong>How to check the result:</strong> Once the ${esc(d.name)} result is declared, log in to the official conducting body's website with your application number and password / date of birth, then download your scorecard or rank card.</p>
        <p><strong>Understanding the cutoff:</strong> The ${esc(d.name)} cutoff is the minimum rank or score needed to get a seat. It changes every year with the number of candidates, the paper's difficulty and the seats available, and it differs by category (General / OBC / SC / ST / EWS) and quota — so always check the latest official cutoff.</p>
        <p><strong>Counselling &amp; admission:</strong> Admission is through ${esc(counsellingFor(ex.slug))}. You register, fill your college and branch choices by rank, and report for document verification and seat confirmation.</p>
        <h2>${esc(d.name)} — Frequently Asked Questions</h2>${d.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
        <p style="margin-top:1rem;padding:0.85rem 1rem;background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;">📌 Exam patterns, dates, cutoffs and counselling are announced officially each year — always verify the latest details on the official website before applying.</p>
        <p><a href="/mock-tests">← All competitive exams</a> · <a href="/practice">Free practice →</a> · <a href="/important-questions">Important questions →</a></p>`;
      route.jsonLd.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: d.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
    }
    ROUTES.push(route);
  }
  if (!MOCK_EXAMS_DATA) console.warn('⚠️  Exam guide bodies SKIPPED (no SSR bundle) — run the full `npm run build`.');
  else console.log(`📝 Competitive-exam pages: ${EXAM_LIST.length} (rich bodies from ${MOCK_EXAMS_DATA.length} exam records).`);
}
const ENGLISH_TOPIC_SLUGS = ['tenses', 'parts-of-speech', 'nouns', 'pronouns', 'verbs', 'adjectives', 'adverbs', 'articles', 'prepositions', 'active-passive-voice', 'direct-indirect-speech', 'subject-verb-agreement', 'essay-writing', 'letter-writing', 'reading-comprehension'];
ROUTES.push({ path: '/english-grammar', title: 'English Grammar for Students — Free Lessons, Examples & Practice | Syllab.in', description: 'Learn English grammar free — tenses, parts of speech, articles, prepositions, voice, narration, essay & letter writing and more, with examples and practice for Indian students.', keywords: 'english grammar for students, learn english grammar free, grammar rules with examples, english practice', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'English Grammar for Students', url: `${SITE}/english-grammar`, inLanguage: 'en-IN', isAccessibleForFree: true } });
for (const slug of ENGLISH_TOPIC_SLUGS) {
  const T = tcSlug(slug);
  ROUTES.push({
    path: `/english-grammar/${slug}`,
    title: `${T} — English Grammar Rules, Examples & Practice (Free) | Syllab.in`,
    description: `Learn ${T} in English grammar with simple rules, clear examples, common mistakes and free practice questions for students.`,
    keywords: `${T.toLowerCase()} english grammar, ${T.toLowerCase()} rules examples, ${T.toLowerCase()} practice for students`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'English Grammar', item: `${SITE}/english-grammar` },
      { '@type': 'ListItem', position: 2, name: T, item: `${SITE}/english-grammar/${slug}` },
    ] },
  });
}
const CAREER_GUIDE_SLUGS = ['which-stream-after-10th', 'which-stream-after-12th', 'how-to-become-engineer', 'how-to-become-doctor', 'how-to-become-data-scientist', 'how-to-become-software-engineer', 'how-to-become-chartered-accountant', 'how-to-become-lawyer', 'how-to-become-ias-officer', 'careers-after-12th-commerce', 'careers-after-12th-arts', 'careers-after-12th-science'];
ROUTES.push({ path: '/career', title: 'Career Guidance for Students — Streams, Courses & Roadmaps (Free) | Syllab.in', description: 'Free career guidance for Indian students — which stream after 10th/12th, how to become an engineer, doctor, data scientist, CA, lawyer and more, with courses, exams, skills and roadmaps.', keywords: 'career guidance students india, which stream after 10th, which stream after 12th, career options after 12th', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Career Guidance for Students', url: `${SITE}/career`, inLanguage: 'en-IN', isAccessibleForFree: true } });
for (const slug of CAREER_GUIDE_SLUGS) {
  const T = tcSlug(slug);
  ROUTES.push({
    path: `/career/${slug}`,
    title: `${T} — Courses, Exams, Skills & Roadmap | Syllab.in`,
    description: `${T}: subjects to focus on, courses, entrance exams, skills, an indicative salary range and a step-by-step roadmap for Indian students.`,
    keywords: `${T.toLowerCase()}, ${slug.replace(/-/g, ' ')}, career roadmap india`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Career Guidance', item: `${SITE}/career` },
      { '@type': 'ListItem', position: 2, name: T, item: `${SITE}/career/${slug}` },
    ] },
  });
}

// ─── College Predictor landing pages (JEE/NEET/EAMCET/KCET/MHT-CET/WBJEE/BITSAT) ─
const CP_EXAMS = { 'jee-main': 'JEE Main', 'neet': 'NEET', 'ts-eapcet': 'TS EAPCET', 'ap-eapcet': 'AP EAPCET', 'kcet': 'KCET', 'mht-cet': 'MHT-CET', 'wbjee': 'WBJEE', 'bitsat': 'BITSAT' };
ROUTES.push({ path: '/college-predictor', title: 'Free College Predictor 2026 — JEE Main, NEET, EAMCET, KCET & More | Syllab.in', description: 'Free college predictors for Indian students — predict your colleges by rank for JEE Main, NEET, TS/AP EAPCET, KCET, MHT-CET, WBJEE and BITSAT, with category and quota. Indicative & free.', keywords: 'college predictor free, jee main college predictor, neet college predictor, eamcet college predictor, college predictor by rank', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'College Predictors', url: `${SITE}/college-predictor`, inLanguage: 'en-IN', isAccessibleForFree: true } });
for (const [slug, name] of Object.entries(CP_EXAMS)) {
  ROUTES.push({
    path: `/college-predictor/${slug}`,
    title: `${name} College Predictor 2026 — Predict Colleges by Rank (Free) | Syllab.in`,
    description: `Free ${name} college predictor — estimate the colleges you can get by rank, category and quota. Indicative and free for Indian students on Syllab.in.`,
    keywords: `${name.toLowerCase()} college predictor, ${name.toLowerCase()} college predictor by rank, ${name.toLowerCase()} rank predictor, ${name.toLowerCase()} college predictor 2026 free`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'College Predictor', item: `${SITE}/college-predictor` },
      { '@type': 'ListItem', position: 2, name: `${name} Predictor`, item: `${SITE}/college-predictor/${slug}` },
    ] },
  });
}

// ─── Previous Year Questions (PYQ) & Sample Papers cluster ────────────────────
const PYQ_GUIDES = { 'cbse-class-10': 'CBSE Class 10', 'cbse-class-12': 'CBSE Class 12', 'jee-main': 'JEE Main', 'neet': 'NEET', 'ts-eamcet': 'TS EAMCET', 'ap-eamcet': 'AP EAMCET', 'cbse-class-9': 'CBSE Class 9', 'kcet': 'KCET', 'mht-cet': 'MHT-CET', 'wbjee': 'WBJEE', 'bitsat': 'BITSAT', 'cuet': 'CUET' };
ROUTES.push({ path: '/previous-year-papers', title: 'Previous Year Question Papers & Sample Papers (Free) — CBSE, JEE, NEET, EAMCET | Syllab.in', description: 'Free guides to previous year question papers (PYQ) & sample papers for CBSE Class 10 & 12, JEE Main, NEET and EAMCET — exam pattern, high-weightage topics, how to use PYQs, and free mock tests for Indian students.', keywords: 'previous year question papers, sample papers, cbse previous year papers, jee main pyq, neet previous year papers, eamcet previous papers', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Previous Year Question Papers & Sample Papers', url: `${SITE}/previous-year-papers`, inLanguage: 'en-IN', isAccessibleForFree: true } });
// Map each guide to the classes whose real chapter-wise PYQs we link to.
const PYQ_ALL = getPyqs(ROOT);
const PYQ_BY_CLASS = {};
for (const p of PYQ_ALL) (PYQ_BY_CLASS[p.classLevel] ||= []).push(p);
const GUIDE_CLASSES = {
  'cbse-class-10': ['Class 10'], 'cbse-class-12': ['Class 12'], 'cbse-class-9': ['Class 9'],
  'jee-main': ['Class 11', 'Class 12'], 'neet': ['Class 11', 'Class 12'], 'ts-eamcet': ['Class 11', 'Class 12'],
  'ap-eamcet': ['Class 11', 'Class 12'], 'kcet': ['Class 11', 'Class 12'], 'mht-cet': ['Class 11', 'Class 12'],
  'wbjee': ['Class 11', 'Class 12'], 'bitsat': ['Class 11', 'Class 12'], 'cuet': ['Class 12'],
};
for (const [slug, name] of Object.entries(PYQ_GUIDES)) {
  const pyqs = (GUIDE_CLASSES[slug] || []).flatMap((c) => PYQ_BY_CLASS[c] || []);
  const bySubj = {};
  for (const p of pyqs) (bySubj[p.subject] ||= []).push(p);
  const listHtml = Object.keys(bySubj).sort().map((subj) =>
    `<h3>${esc(name)} ${esc(subj)} — Chapter-wise PYQs</h3><ul>${bySubj[subj].slice(0, 30).map((p) => `<li><a href="/pyqs/${p.slug}">${esc(p.chapter)} — Previous Year Questions with solutions</a></li>`).join('')}</ul>`,
  ).join('');
  const bodyHtml = pyqs.length
    ? `<p class="speakable">Practice <strong>${name} previous year questions (PYQs)</strong> chapter-by-chapter with full step-by-step solutions — free, no login. Solving PYQs is the single highest-ROI revision: the same question patterns repeat every year.</p>
       <h2>${esc(name)} Previous Year Questions — by Chapter</h2>${listHtml}
       <p><a href="/mock-tests">Take a free ${esc(name)} mock test →</a> · <a href="/pyqs">Browse all PYQs →</a> · <a href="/sample-papers">Sample papers →</a></p>`
    : undefined;
  const route = {
    path: `/previous-year-papers/${slug}`,
    title: `${name} Previous Year Question Papers (PYQ) — Chapter-wise with Solutions (Free) | Syllab.in`,
    description: `Free ${name} previous year questions (PYQ) — chapter-wise with full solutions, exam pattern, most-repeated topics & free mock tests. No login. ${pyqs.length}+ solved chapters.`,
    keywords: `${name.toLowerCase()} previous year papers, ${name.toLowerCase()} pyq, ${name.toLowerCase()} sample papers, ${name.toLowerCase()} question paper, ${name.toLowerCase()} exam pattern`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Previous Year Papers', item: `${SITE}/previous-year-papers` },
      { '@type': 'ListItem', position: 2, name: `${name} Previous Year Papers`, item: `${SITE}/previous-year-papers/${slug}` },
    ] },
  };
  if (bodyHtml) route.bodyHtml = bodyHtml;
  ROUTES.push(route);
}

// ─── Formula Sheets (free PDF revision assets — strong linkable/backlink magnet) ─
const FORMULA_SHEETS_DATA = getFormulaSheets(ROOT);
ROUTES.push({ path: '/formula-sheets', title: 'Free Formula Sheets (PDF) — Maths, Physics & Chemistry Class 9–12 | Syllab.in', description: `Free downloadable formula sheets for CBSE Class 9–12 — ${FORMULA_SHEETS_DATA.length}+ chapter & subject sheets in Maths, Physics & Chemistry. Every formula on one page for fast revision before boards, JEE & NEET. Free PDF, no signup.`, keywords: 'formula sheet pdf, class 12 physics formula sheet, class 10 maths formulas, class 11 chemistry formulas, all formulas pdf free download', bodyHtml: `<div style="margin:1rem 0;padding:1rem;background:#ecfdf5;border:2px solid #059669;border-radius:8px;"><h2 style="margin:0 0 .5rem 0;font-size:1.05rem;color:#065f46;">🖨️ Free Printable Formula Posters (A4 PDF)</h2><p style="margin:0 0 .5rem 0;">Every formula for a subject on one printable sheet — free to print &amp; share in classrooms:</p><ul style="margin:0;padding-left:1.25rem;line-height:1.9;">${POSTER_SHEETS.map((p) => `<li><a href="${posterHref(p.slug)}" style="color:#047857;font-weight:700;">${esc(p.label)} Formula Poster →</a></li>`).join('')}</ul></div>`, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Formula Sheets for Class 9–12', url: `${SITE}/formula-sheets`, inLanguage: 'en-IN', isAccessibleForFree: true } });
// Group for sibling internal links (same class+subject).
const FS_BY_GROUP = {};
for (const s of FORMULA_SHEETS_DATA) (FS_BY_GROUP[`${s.classLevel}|${s.subject}`] ||= []).push(s);
for (const s of FORMULA_SHEETS_DATA) {
  const flat = (s.sections || []).flatMap((sec) => sec.formulas || []);
  const formulaHtml = (s.sections || []).map((sec) => `<h2>${esc(sec.heading)}</h2><table><thead><tr><th>Formula</th><th>Expression</th></tr></thead><tbody>${(sec.formulas || []).map((fm) => `<tr><td>${esc(fm.name)}</td><td>${esc(fm.formula)}${fm.note ? ` — ${esc(fm.note)}` : ''}</td></tr>`).join('')}</tbody></table>`).join('');
  const faqHtml = (s.faqs || []).length ? `<h2>FAQs</h2>${s.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
  const sibs = (FS_BY_GROUP[`${s.classLevel}|${s.subject}`] || []).filter((y) => y.slug !== s.slug).slice(0, 6);
  const relHtml = sibs.length ? `<h2>More Class ${esc(s.classLevel)} ${esc(s.subject)} Formula Sheets</h2><ul>${sibs.map((y) => `<li><a href="/formula-sheets/${y.slug}">${esc(y.title)}</a></li>`).join('')}</ul>` : '';
  ROUTES.push({
    path: `/formula-sheets/${s.slug}`,
    // /formula-sheets builds its routes here rather than through
    // STUDY_CLUSTERS, so the retirement check has to be applied explicitly.
    ...(isRetired('/formula-sheets', s.slug) ? { noindex: true } : {}),
    title: `${s.title} (PDF) — All Important Formulas Free | Syllab.in`,
    description: `Free ${s.title.toLowerCase()} — all ${flat.length} key formulas on one page, downloadable as PDF for fast revision before CBSE board exams${Number(s.classLevel) >= 11 ? ', JEE & NEET' : ''}. No signup.`,
    keywords: `${s.title.toLowerCase()}, ${s.title.toLowerCase()} pdf, formula sheet, all formulas`,
    bodyHtml: `<p class="speakable">${esc(s.intro)}</p>${formulaHtml}${faqHtml}${relHtml}<p><a href="/formula-sheets">See all formula sheets →</a></p>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Formula Sheets', item: `${SITE}/formula-sheets` },
      { '@type': 'ListItem', position: 2, name: s.title, item: `${SITE}/formula-sheets/${s.slug}` },
    ] },
  });
}

// ─── State Board Solutions (AP/TS/Karnataka/Maharashtra) — index + per-chapter ──
const SB_CHAPTERS = getStateBoardChapters();
const sbHubBody = (() => {
  const byBoard = {};
  for (const c of SB_CHAPTERS) { ((byBoard[c.boardLabel] ||= {})[c.classLevel] ||= {})[c.subject] ||= []; byBoard[c.boardLabel][c.classLevel][c.subject].push(c); }
  let html = '<h2>State Board Solutions by Board, Class &amp; Subject</h2>';
  for (const bl of Object.keys(byBoard)) {
    for (const cls of Object.keys(byBoard[bl]).sort()) {
      for (const subj of Object.keys(byBoard[bl][cls]).sort()) {
        html += `<h3>${esc(bl)} — Class ${cls} ${esc(subj)}</h3><ul>`;
        for (const c of byBoard[bl][cls][subj]) html += `<li><a href="/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}">${esc(c.title)}</a></li>`;
        html += '</ul>';
      }
    }
  }
  return html;
})();
ROUTES.push({ path: '/state-board-solutions', title: 'State Board Solutions — AP, Telangana, Karnataka & Maharashtra (Free) | Syllab.in', description: 'Free chapter-wise textbook solutions for AP (SSC), Telangana (SSC), Karnataka (SSLC) and Maharashtra (SSC) — Class 9 & 10 Maths and Science, step-by-step answers for board exam prep.', keywords: 'AP SSC solutions, TS SSC solutions, Karnataka SSLC solutions, Maharashtra SSC solutions, state board maths science solutions free', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'State Board Solutions', url: `${SITE}/state-board-solutions`, inLanguage: 'en-IN', isAccessibleForFree: true }, bodyHtml: sbHubBody });
for (const c of SB_CHAPTERS) {
  const u = `${SITE}/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`;
  const lim = Math.min(5, c.qa.length);
  let body = '<div style="margin-top:1.5rem;">';
  for (let i = 0; i < lim; i++) body += `<div style="margin-bottom:1.25rem;padding:1rem;background:#f9f9f9;border-left:3px solid #0066cc;"><h3 style="margin:0 0 .5rem;font-size:1.02rem;">Q${i + 1}: ${esc(c.qa[i].q)}</h3><div style="font-size:.95rem;color:#555;line-height:1.5;white-space:pre-line;">${esc(c.qa[i].solution).slice(0, 500)}${c.qa[i].solution.length > 500 ? '…' : ''}</div></div>`;
  if (c.qa.length > lim) body += `<p style="color:#666;font-size:.9rem;font-style:italic;">Showing ${lim} of ${c.qa.length} questions — full solutions on the page.</p>`;
  body += '</div>';
  ROUTES.push({
    path: `/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`,
    title: `${c.title} — ${c.boardLabel} Class ${c.classLevel} ${c.subject} Solutions (Free) | Syllab.in`,
    description: `Free step-by-step ${c.boardLabel} Class ${c.classLevel} ${c.subject} solutions for "${c.title}" — important questions with detailed answers, download PDF for board exam preparation.`,
    keywords: `${c.title} ${c.board} solutions, ${c.boardLabel} class ${c.classLevel} ${c.subject.toLowerCase()} ${c.title.toLowerCase()}, state board ${c.title.toLowerCase()} answers free`,
    bodyHtml: body,
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'Article', headline: `${c.title} — ${c.boardLabel} Class ${c.classLevel} ${c.subject} Solutions`, url: u, inLanguage: 'en-IN', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in', url: SITE } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'State Board Solutions', item: `${SITE}/state-board-solutions` },
        { '@type': 'ListItem', position: 2, name: `${c.boardLabel} Class ${c.classLevel} ${c.subject}`, item: `${SITE}/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}` },
        { '@type': 'ListItem', position: 3, name: c.title, item: u },
      ] },
    ],
  });
}

// ─── AI Hub ("AI for Students" guides — rides the AI search trend) ────────────
// Read every /ai-hub guide straight from src/data/aiHub.ts so prerender never
// drifts from the app's actual AI-hub pages.
const AI_HUB = getAiHubTopics(ROOT).map((t) => [t.slug, t.title, t.desc]);
ROUTES.push({ path: '/ai-hub', title: 'AI for Students — Free Guides: ChatGPT, AI Tools, AI Careers | Syllab.in', description: 'Free, simple AI guides for students & teachers — what is AI & ChatGPT, best free AI study tools 2026, AI prompts for studying, is AI cheating, and how to become an AI engineer in India.', keywords: 'AI for students, what is ChatGPT, best free AI tools for students, AI prompts for studying, how to become AI engineer India', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI for Students Hub', url: `${SITE}/ai-hub`, inLanguage: 'en-IN', isAccessibleForFree: true } });
// AI Prompt Lab — hands-on prompt-writing practice (interactive, complements /ai-hub guides).
ROUTES.push({
  path: '/prompt-lab',
  title: 'AI Prompt Lab — Practise Writing AI Prompts (Free) | Syllab.in',
  description: 'Free hands-on AI prompt practice for students. Pick a study task, write a prompt, and get instant AI coaching on how to prompt better — plus a model prompt and the answer. Learn prompt engineering by doing.',
  keywords: 'ai prompt practice, prompt engineering for students, how to write ai prompts, learn prompting free, ai literacy for students, chatgpt prompts for studying, prompt writing practice India',
  bodyHtml: `
    <p class="speakable">The <strong>AI Prompt Lab</strong> is a free, hands-on way for students to learn <strong>prompt engineering</strong> — the skill of asking AI clearly to get useful answers. Pick a real study task, write your prompt, and Syllab's AI coaches your prompt: what's good, how to make it stronger, and then it answers the improved prompt.</p>
    <h2>What you can practise</h2>
    <ul>
      <li>Explaining a hard topic simply (e.g. "explain photosynthesis like I'm in Class 7")</li>
      <li>Making a revision/study plan before an exam</li>
      <li>Generating exam-style practice questions</li>
      <li>Understanding why an answer is wrong</li>
      <li>Summarising a chapter into quick revision points</li>
    </ul>
    <h2>4 rules for a great AI prompt</h2>
    <ol>
      <li><strong>Be specific</strong> — name the class, subject and chapter.</li>
      <li><strong>Give context</strong> — say what you already know and where you're stuck.</li>
      <li><strong>Ask for a format</strong> — "in 5 bullet points", "with a worked example", "like I'm 12".</li>
      <li><strong>Iterate</strong> — refine your prompt instead of starting over.</li>
    </ol>
    <p>Prompting well is a real skill for school, college and future jobs. <a href="/ai-hub">Read the free AI-for-students guides →</a> · <a href="/ai-tutor">Try the free AI Tutor →</a></p>`,
  jsonLd: { '@context': 'https://schema.org', '@type': 'LearningResource', name: 'AI Prompt Lab', description: 'Interactive practice for writing effective AI prompts, with instant AI feedback.', learningResourceType: 'Interactive tool', educationalUse: 'Practice', inLanguage: 'en-IN', isAccessibleForFree: true, url: `${SITE}/prompt-lab` },
});
for (const [slug, title, desc] of AI_HUB) {
  ROUTES.push({
    path: `/ai-hub/${slug}`,
    title: `${title} | AI for Students — Syllab.in`,
    description: desc,
    keywords: `${title.toLowerCase()}, AI for students, artificial intelligence students india`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AI for Students', item: `${SITE}/ai-hub` },
      { '@type': 'ListItem', position: 2, name: title, item: `${SITE}/ai-hub/${slug}` },
    ] },
  });
}

// ─── Difference Between (/difference-between, /difference-between/:slug) ───────
const DIFFS = getDifferences(ROOT);
ROUTES.push({
  path: '/difference-between',
  title: 'Difference Between — Topic-wise Comparisons for Students | Syllab.in',
  description: `Free 'difference between' comparison tables for Class 6–12 — ${DIFFS.length}+ side-by-side comparisons across Biology, Physics, Chemistry, Maths and more, with key points and FAQs. CBSE/NCERT aligned.`,
  keywords: 'difference between, comparison table, mitosis and meiosis, speed and velocity, mass and weight, acid and base, CBSE difference between, NCERT comparison',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Difference Between — Student Comparisons', url: `${SITE}/difference-between`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
const DIFF_BY_CAT = {};
for (const x of DIFFS) (DIFF_BY_CAT[x.category] ||= []).push(x);
const DIFF_REINDEX_FAQ = new Map(DIFF_REINDEX.map((d) => [d.slug, d.faqs]));

/**
 * Deep bodies for the GSC-proven winners (public/diff-deep.json).
 *
 * WHY: the 2026-08-13 GSC export showed these 17 indexed comparisons pulling
 * 22,725 impressions at an average position of ~8 — but converting at 0.42%.
 * They were ranking on page 1 with roughly 400 crawl-time words against
 * competitors running 1,500–3,400 on the same query. This adds ~1,150 words of
 * real teaching content per page (explainers, worked examples, exam mistakes,
 * a self-check quiz, extra FAQs), which is what closes that gap.
 *
 * Read from public/ rather than imported so the same file can be fetched by the
 * React page at runtime — one source of truth, and zero JS-bundle cost.
 */
const DIFF_DEEP = (() => {
  try {
    return JSON.parse(readFileSync(path.join(ROOT, 'public', 'diff-deep.json'), 'utf8')).topics || {};
  } catch {
    return {};
  }
})();

/** Render one deep topic to crawlable HTML. Returns '' when there is no deep entry. */
function diffDeepHtml(slug, d) {
  const t = DIFF_DEEP[slug];
  if (!t) return '';
  const P = (arr) => (arr || []).map((p) => `<p>${esc(p)}</p>`).join('');
  const parts = [];

  for (const e of t.explainers || []) {
    parts.push(`<h2>${esc(e.term)}</h2>${P(e.paras)}`);
  }
  for (const s of t.sections || []) {
    parts.push(`<h2>${esc(s.h)}</h2>${P(s.paras)}${
      (s.bullets || []).length ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''
    }`);
  }
  if ((t.examples || []).length) {
    parts.push(`<h2>${esc(d.termA)} vs ${esc(d.termB)} — Worked Examples</h2><ul>${
      t.examples.map((x) => `<li><strong>${esc(x.t)}</strong> — ${esc(x.d)}</li>`).join('')
    }</ul>`);
  }
  if ((t.mistakes || []).length) {
    parts.push(`<h2>Common Mistakes Students Make</h2><ul>${
      t.mistakes.map((m) => `<li>${esc(m)}</li>`).join('')
    }</ul>`);
  }
  // Diagrams. NOTE the deliberate exception: d.svg is injected RAW, not esc()'d,
  // because it is markup by design. Safe because diff-deep.json is authored in
  // this repo and never accepts user input — do not point this at outside data.
  // Inline SVG over raster on purpose: ~2 KB instead of ~80 KB, labels are
  // crawlable text, crisp at any DPI, themes via currentColor, no extra request
  // (so no CSP issue), and no CLS because every one carries a viewBox.
  if ((t.diagrams || []).length) {
    parts.push(`<h2>Diagrams</h2>${t.diagrams.map((g) =>
      `<figure><div class="diagram">${g.svg}</div><figcaption>${esc(g.caption)}</figcaption></figure>`,
    ).join('')}`);
  }
  if ((t.applications || []).length) {
    parts.push(`<h2>Where This Shows Up in Real Life</h2>${
      t.applications.map((a) => `<h3>${esc(a.h)}</h3><p>${esc(a.d)}</p>`).join('')
    }`);
  }
  if ((t.numericals || []).length) {
    parts.push(`<h2>Solved Numericals — Step by Step</h2>${t.numericals.map((n, i) =>
      `<div><p><strong>Problem ${i + 1}. ${esc(n.q)}</strong></p><ol>${
        n.steps.map((s) => `<li>${esc(s)}</li>`).join('')
      }</ol><p><strong>Answer: ${esc(n.answer)}</strong></p></div>`,
    ).join('')}`);
  }
  if ((t.boardQuestions || []).length) {
    parts.push(`<h2>Board-Style Questions with Model Answers</h2>${t.boardQuestions.map((b) =>
      `<h3>${esc(b.q)} <em>(${esc(b.marks)} marks)</em></h3><p>${esc(b.a)}</p>`,
    ).join('')}`);
  }
  if ((t.assertionReason || []).length) {
    parts.push(`<h2>Assertion–Reason Questions (CBSE Format)</h2><p>For each question choose: (a) both A and R are true and R is the correct explanation of A; (b) both are true but R is not the correct explanation; (c) A is true but R is false; (d) A is false but R is true.</p>${
      t.assertionReason.map((x, i) =>
        `<div><p><strong>${i + 1}. Assertion (A):</strong> ${esc(x.assertion)}<br><strong>Reason (R):</strong> ${esc(x.reason)}</p><p><strong>Answer: (${esc(x.answer)})</strong> — ${esc(x.why)}</p></div>`,
      ).join('')
    }`);
  }
  if ((t.quiz || []).length) {
    parts.push(`<h2>Quick Self-Check</h2>${t.quiz.map((q, i) =>
      `<div><p><strong>Q${i + 1}. ${esc(q.q)}</strong></p><ul>${
        q.options.map((o, j) => `<li>${'ABCD'[j]}. ${esc(o)}</li>`).join('')
      }</ul><p><strong>Answer: ${'ABCD'[q.correct]}. ${esc(q.options[q.correct])}</strong> — ${esc(q.why)}</p></div>`,
    ).join('')}`);
  }
  if ((t.glossary || []).length) {
    parts.push(`<h2>Key Terms Glossary</h2><dl>${
      t.glossary.map((g) => `<dt><strong>${esc(g.term)}</strong></dt><dd>${esc(g.def)}</dd>`).join('')
    }</dl>`);
  }
  if ((t.revision || []).length) {
    parts.push(`<h2>One-Minute Revision</h2><ul>${
      t.revision.map((r) => `<li>${esc(r)}</li>`).join('')
    }</ul>`);
  }
  if (t.ncertRef) {
    parts.push(`<p><em>Syllabus reference: ${esc(t.ncertRef)}</em></p>`);
  }
  return parts.join('');
}

for (const d of DIFFS) {
  const rows = (d.table || []).slice(0, 12);
  const tableHtml = rows.length
    ? `<table><thead><tr><th>Basis</th><th>${esc(d.termA)}</th><th>${esc(d.termB)}</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.aspect)}</td><td>${esc(r.a)}</td><td>${esc(r.b)}</td></tr>`).join('')}</tbody></table>`
    : '';
  const kp = (d.keyPoints || []).slice(0, 6);
  const kpHtml = kp.length ? `<h2>Key Points</h2><ul>${kp.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : '';
  const sib = (DIFF_BY_CAT[d.category] || []).filter((x) => x.slug !== d.slug).slice(0, 6);
  const relHtml = sib.length ? `<h2>More ${esc(d.category)} Comparisons</h2><ul>${sib.map((x) => `<li><a href="/difference-between/${x.slug}">${esc(x.title)}</a></li>`).join('')}</ul>` : '';
  // Curated re-index: GSC-proven winners get a factual FAQ (substantive, not thin)
  // and are allowed to index; everything else stays noindex.
  const reFaqs = DIFF_REINDEX_FAQ.get(d.slug);
  // Deep entries carry extra FAQs; they join the on-page list AND the FAQPage schema.
  const allFaqs = reFaqs ? [...reFaqs, ...((DIFF_DEEP[d.slug] || {}).extraFaqs || [])] : null;
  const faqHtml = allFaqs ? `<h2>Frequently Asked Questions</h2>${allFaqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
  const deepHtml = diffDeepHtml(d.slug, d);
  const bodyHtml = `
    <p class="speakable"><strong>The main difference between ${esc(d.termA)} and ${esc(d.termB)}:</strong> ${esc(d.intro)}</p>
    <h2>${esc(d.termA)} vs ${esc(d.termB)} — Comparison Table</h2>
    ${tableHtml}
    ${kpHtml}
    ${deepHtml}
    ${faqHtml}
    ${relHtml}
    <p><a href="/difference-between">See all difference-between comparisons →</a></p>`;
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Difference Between', item: `${SITE}/difference-between` },
    { '@type': 'ListItem', position: 2, name: d.title, item: `${SITE}/difference-between/${d.slug}` },
  ] };
  ROUTES.push({
    path: `/difference-between/${d.slug}`,
    bodyHtml,
    title: `${d.termA} vs ${d.termB} — Difference (with Table & FAQs) | Syllab.in`,
    description: d.intro,
    keywords: `difference between ${d.termA.toLowerCase()} and ${d.termB.toLowerCase()}, ${d.termA.toLowerCase()} vs ${d.termB.toLowerCase()}, ${d.category.toLowerCase()} comparison, ${d.classLevel.toLowerCase()}`,
    // Re-indexed winners are deepened (table + key points + FAQ); the rest stay
    // noindex under the post-March-2026 thin-content policy.
    noindex: !DIFF_REINDEX_SLUGS.has(d.slug),
    jsonLd: allFaqs
      ? [breadcrumb, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: allFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }]
      : breadcrumb,
  });
}

// ─── Full Forms (/full-forms, /full-forms/:slug) ──────────────────────────────
const FULL_FORMS_DATA = getFullForms(ROOT);
ROUTES.push({
  path: '/full-forms',
  title: 'Full Forms — A to Z List for Students (NCERT, CPU, NEET…) | Syllab.in',
  description: `Free A-to-Z full forms list — ${FULL_FORMS_DATA.length}+ abbreviations across education, computer, science, medical and banking with meanings.`,
  keywords: 'full form, full forms list, NCERT full form, CPU full form, NEET full form, RAM full form, IFSC full form, abbreviations for students',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Full Forms for Students', url: `${SITE}/full-forms`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
// Lookups for internal linking (related abbreviations + same-category siblings).
const FF_BY_TERM = new Map(FULL_FORMS_DATA.map((x) => [String(x.term).toUpperCase(), x]));
const FF_BY_CAT = {};
for (const x of FULL_FORMS_DATA) (FF_BY_CAT[x.category] ||= []).push(x);

for (const f of FULL_FORMS_DATA) {
  const t = f.term;
  const answer = `${t} stands for ${f.fullForm}.`;
  let desc = `${answer} ${f.description}`;
  if (desc.length > 158) desc = desc.slice(0, 156).replace(/\s+\S*$/, '') + '…';
  // Internal links: related abbreviations first, then same-category siblings (≤8).
  const rel = [];
  const seen = new Set([f.slug]);
  for (const r of (f.related || [])) { const x = FF_BY_TERM.get(String(r).toUpperCase()); if (x && !seen.has(x.slug)) { rel.push(x); seen.add(x.slug); } }
  for (const x of (FF_BY_CAT[f.category] || [])) { if (rel.length >= 8) break; if (!seen.has(x.slug)) { rel.push(x); seen.add(x.slug); } }
  const relHtml = rel.length
    ? `<h2>Related Full Forms</h2><ul>${rel.map((x) => `<li><a href="/full-forms/${x.slug}">${esc(x.term)} Full Form</a> — ${esc(x.fullForm)}</li>`).join('')}</ul>`
    : '';
  const bodyHtml = `
    <p class="speakable"><strong>${esc(t)} stands for ${esc(f.fullForm)}.</strong></p>
    <p>${esc(f.description)}</p>
    <h2>${esc(t)} Full Form in Detail</h2>
    <p>The abbreviation <strong>${esc(t)}</strong> expands to <strong>${esc(f.fullForm)}</strong>${f.category ? ` and is commonly used in ${esc(f.category)}` : ''}. Knowing what ${esc(t)} stands for helps you read questions, notes and notices faster.</p>
    ${relHtml}
    <p><a href="/full-forms">Browse all full forms (A–Z) →</a></p>`;
  ROUTES.push({
    path: `/full-forms/${f.slug}`,
    bodyHtml,
    // CTR-first title: leads with the exact query, promises MORE than the bare
    // expansion (which Google answers inline) so there's a reason to click.
    title: `${t} Full Form — Meaning, Definition & Uses | Syllab.in`,
    description: desc,
    keywords: `${t.toLowerCase()} full form, full form of ${t.toLowerCase()}, what does ${t.toLowerCase()} stand for, ${t.toLowerCase()} meaning, ${t.toLowerCase()} abbreviation`,
    noindex: true, // Post-March-2026 update: thin templated content (1–2 sentences) drags domain quality.
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Full Forms', item: `${SITE}/full-forms` },
        { '@type': 'ListItem', position: 2, name: `${t} Full Form`, item: `${SITE}/full-forms/${f.slug}` },
      ] },
      // Per-page FAQ → eligible for the "People also ask" / featured snippet.
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: `What is the full form of ${t}?`, acceptedAnswer: { '@type': 'Answer', text: `${answer} ${f.description}`.slice(0, 320) } },
        { '@type': 'Question', name: `What does ${t} stand for?`, acceptedAnswer: { '@type': 'Answer', text: answer } },
      ] },
    ],
  });
}

// ─── Glossary (/glossary, /glossary/:slug) ────────────────────────────────────
// ── Rich crawlable body builders: surface the REAL Q&A / notes / examples that
//    currently render client-side only, so Google sees substantive pages. ──
const faqBlock = (faqs) => (faqs && faqs.length) ? `<h2>Frequently Asked Questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
const sibLabel = (s) => s.chapter || s.title || s.term || s.slug;
const relBlock = (sibs, base, heading) => (sibs && sibs.length) ? `<h2>${esc(heading)}</h2><ul>${sibs.map((s) => `<li><a href="${base}/${s.slug}">${esc(sibLabel(s))}</a></li>`).join('')}</ul>` : '';
const aiCta = `<p>🤖 <a href="/ai-tutor">Stuck on any of these? Ask Syllab's free AI Tutor to explain step by step →</a></p>`;
const nl2br = (t) => esc(String(t || '')).replace(/\n/g, '<br>');
const faqJsonLd = (faqs) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.slice(0, 6).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
function pyqBody(x, sibs, base) {
  const qs = (x.questions || []).map((q) => `<div class="qa"><h3>Q${q.year ? ` (${esc(String(q.year))}, ${esc(String(q.marks || ''))} mark${Number(q.marks) > 1 ? 's' : ''})` : ''}: ${esc(q.q)}</h3><p><strong>Answer:</strong> ${nl2br(q.answer)}</p></div>`).join('');
  return `<p class="speakable">${esc(x.intro)}</p><h2>${esc(x.chapter)} — Previous Year Questions with Solutions</h2>${qs}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.classLevel)} ${esc(x.subject)} PYQs`)}${aiCta}`;
}
/**
 * Find the question bank for a /mcqs page.
 *
 * Two lookups, in order. First the chapter name slugified directly, which
 * covers the chapters both datasets happen to name identically. Then the
 * hand-checked table in mcq-chapter-map.mjs, which bridges the cases where the
 * current NCERT set renamed a chapter ("The Fundamental Unit of Life" is now
 * "cell-the-building-block-of-life").
 *
 * Subject is IGNORED on purpose: chapterMcqs files everything under "Science"
 * while the bank splits Physics / Chemistry / Biology. Class plus chapter slug
 * is unique enough, and requiring the subject to agree was itself blocking
 * legitimate matches.
 */
function mcqBankFor(x) {
  const direct = String(x.chapter || '').toLowerCase()
    .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const prefix = `${x.classLevel}::`;
  const pull = (slug) => {
    const suffix = `::${slug}`;
    for (const key of Object.keys(NCERT_MCQS)) {
      if (key.startsWith(prefix) && key.endsWith(suffix) && Array.isArray(NCERT_MCQS[key])) {
        return NCERT_MCQS[key];
      }
    }
    return [];
  };

  // An exact name match on the bank always wins.
  const hit = pull(direct);
  if (hit.length) return hit;

  // Otherwise fall back to the hand-verified map, which may merge several bank
  // chapters (a page covering more ground than one bank entry) and may carry a
  // topic filter (a page narrower than the bank chapter it sits in). See
  // scripts/mcq-chapter-map.mjs — the exclusions there are deliberate, and
  // Olympiad and case-study pages must stay unmapped because standard MCQs
  // would misrepresent what those pages promise the student.
  const mapped = mappedChapterSlug(x.classLevel, x.chapter);
  if (!mapped) return [];
  const merged = mapped.slugs.flatMap(pull);
  return mapped.match
    ? merged.filter((m) => mapped.match.test(`${m.question ?? ''} ${m.explanation ?? ''}`))
    : merged;
}

function mcqBody(x, sibs, base) {
  // Case-study questions carry a `case` id resolving to a passage. The passage
  // is printed once, immediately before the first question that uses it, so a
  // question saying "the passage" always has one directly above it. A CBSE
  // case-study question without its passage is unanswerable, which is the whole
  // reason these pages were previously left unmapped rather than topped up with
  // ordinary chapter MCQs.
  const cases = new Map((x.caseStudies || []).map((c) => [c.id, c]));
  const qs = (x.mcqs || []).map((m, i, arr) => {
    const opts = (m.options || []).map((o, j) => `<li>${esc(o)}${j === m.correct ? ' ✓ (correct)' : ''}</li>`).join('');
    const startsCase = m.case && cases.has(m.case) && (i === 0 || arr[i - 1].case !== m.case);
    const head = startsCase
      ? `<div class="case-study"><h3>Case Study: ${esc(cases.get(m.case).title)}</h3><p>${esc(cases.get(m.case).passage)}</p></div>`
      : '';
    return `${head}<div class="qa"><h3>Q${i + 1}. ${esc(m.q)}</h3><ol type="A">${opts}</ol>${m.explanation ? `<p><strong>Explanation:</strong> ${esc(m.explanation)}</p>` : ''}</div>`;
  }).join('');
  // Top up from the generated bank.
  //
  // /mcqs is the site's second-best converting cluster (13.97% CTR in the
  // 2026-08 GSC export) and its pages carry a median of 595 words, because
  // chapterMcqs.ts holds roughly ten questions each. generated-mcqs.json holds
  // up to FIFTY for the same chapters, keyed as `class::Subject::chap-slug`
  // instead of by page slug — 27,143 questions in total, none of which reached
  // these pages. Same oversight as the NCERT solutions, different file.
  //
  // Everything added passes mcqIsSound(), and anything already present in
  // x.mcqs is skipped so a question is never asked twice on one page.
  const seen = new Set((x.mcqs || []).map((m) => String(m.q || '').trim().toLowerCase()));
  const extraPool = mcqBankFor(x);
  const extra = (Array.isArray(extraPool) ? extraPool : [])
    .filter(mcqIsSound)
    .filter((m) => !seen.has(String(m.question || '').trim().toLowerCase()))
    .slice(0, 30);
  const extraHtml = extra.length
    ? `<h2>More Practice Questions on ${esc(x.chapter)}</h2>
       <p>Another ${extra.length} questions on the same chapter, each with the correct option and the reasoning behind it. Work through these once you are comfortable with the set above.</p>`
      + extra.map((m, i) => {
        const opts = (m.options || []).map((o, j) => `<li>${esc(o)}${j === m.correct ? ' ✓ (correct)' : ''}</li>`).join('');
        return `<div class="qa"><h3>Q${qs ? (x.mcqs || []).length + i + 1 : i + 1}. ${esc(m.question)}</h3><ol type="A">${opts}</ol>`
          + `${m.explanation ? `<p><strong>Explanation:</strong> ${esc(m.explanation)}</p>` : ''}</div>`;
      }).join('')
    : '';

  return `<p class="speakable">${esc(x.intro)}</p><h2>${esc(x.chapter)} MCQs with Answers &amp; Explanations</h2>${qs}${extraHtml}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.classLevel)} ${esc(x.subject)} MCQs`)}${aiCta}`;
}
function solvedBody(x, sibs, base) {
  const ex = (x.examples || []).map((e, i) => `<div class="qa"><h3>Example ${i + 1}: ${esc(e.problem)}</h3><p><strong>Solution:</strong> ${nl2br(e.solution)}</p></div>`).join('');
  const tips = (x.tips || []).length ? `<h2>Tips</h2><ul>${x.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p><h2>${esc(x.chapter)} — Solved Numerical Examples (Step by Step)</h2>${ex}${tips}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.subject)} Solved Examples`)}${aiCta}`;
}
function litBody(x, sibs, base) {
  const summary = x.summary ? `<h2>${esc(x.chapter)} — Summary</h2><p>${nl2br(x.summary)}</p>` : '';
  const chars = (x.characters || []).length ? `<h2>Characters</h2><ul>${x.characters.map((c) => `<li><strong>${esc(c.name)}:</strong> ${esc(c.description)}</li>`).join('')}</ul>` : '';
  const themes = (x.themes || []).length ? `<h2>Themes</h2><ul>${x.themes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
  // Poetic/literary devices and the NCERT exercise answered. These are what a
  // student searching "<chapter> question answers" or "<poem> poetic devices"
  // is actually after, and /english-literature converts at 3.44 clicks per
  // page — the best answer-and-practice cluster on the site — on pages that
  // previously carried only a summary, themes and two FAQs.
  const devices = (x.devices || []).length
    ? `<h2>Poetic and Literary Devices</h2><dl>${x.devices.map((d) => `<dt><strong>${esc(d.name)}</strong></dt><dd>${esc(d.example)}</dd>`).join('')}</dl>` : '';
  const tbq = (x.textbookQA || []).length
    ? `<h2>NCERT Textbook Questions — Answered</h2>${x.textbookQA.map((q, i) => `<h3>Q${i + 1}. ${esc(q.q)}</h3><p>${esc(q.a)}</p>`).join('')}` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${summary}${chars}${themes}${devices}${tbq}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.classLevel)} English Chapters`)}${aiCta}`;
}
function labBody(x, sibs, base) {
  const list = (arr, h) => (arr || []).length ? `<h2>${esc(h)}</h2><ul>${arr.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';
  const theory = x.theory ? `<h2>Theory</h2><p>${nl2br(x.theory)}</p>` : '';
  const proc = (x.procedure || []).length ? `<h2>Procedure</h2><ol>${x.procedure.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : '';
  const obs = x.observation ? `<h2>Observation</h2><p>${nl2br(x.observation)}</p>` : '';
  const res = x.result ? `<h2>Result</h2><p>${nl2br(x.result)}</p>` : '';
  const viva = (x.viva || []).length ? `<h2>Viva Questions</h2>${x.viva.map((v) => `<h3>${esc(v.q)}</h3><p>${esc(v.a)}</p>`).join('')}` : '';
  return `<p class="speakable"><strong>Aim:</strong> ${esc(x.aim)}</p>${list(x.materials, 'Materials Required')}${theory}${proc}${obs}${res}${list(x.precautions, 'Precautions')}${viva}${relBlock(sibs, base, `More ${esc(x.classLevel)} ${esc(x.subject)} Practicals`)}${aiCta}`;
}
function gkBody(x, sibs, base) {
  const items = (x.items || []).length ? `<h2>${esc(x.title)}</h2><ul>${x.items.map((i) => `<li><strong>${esc(i.name)}:</strong> ${esc(i.detail)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${items}${faqBlock(x.faqs)}${relBlock(sibs, base, 'More GK Topics')}${aiCta}`;
}
function vocabBody(x, sibs, base) {
  const items = (x.items || []).length ? `<h2>${esc(x.title)}</h2><ul>${x.items.map((i) => `<li><strong>${esc(i.term)}</strong> — ${esc(i.meaning)}${i.example ? ` <em>(e.g. ${esc(i.example)})</em>` : ''}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${items}${faqBlock(x.faqs)}${relBlock(sibs, base, 'More Vocabulary Sets')}${aiCta}`;
}
function glossaryBody(g, sibs) {
  const def = `<p class="speakable"><strong>${esc(g.term)}:</strong> ${esc(g.defFull || g.definition)}</p>`;
  const expl = g.explanation ? `<h2>Explanation</h2><p>${nl2br(g.explanation)}</p>` : '';
  const ex = g.example ? `<h2>Example</h2><p>${nl2br(g.example)}</p>` : '';
  return `${def}${expl}${ex}${faqBlock(g.faqs)}${relBlock(sibs, '/glossary', `More ${esc(g.category || '')} Terms`)}${aiCta}`;
}
/**
 * Deep bodies for the revision-note chapters that carry GSC impressions
 * (public/rn-deep.json).
 *
 * WHY: the 2026-08-13 GSC export shows /revision-notes converting at 15.60%,
 * the best rate on the site — but only 10 of the 119 pages register any
 * impressions at all, and those 10 averaged ~350 crawl-time words. The cluster
 * ranks and converts; it is simply too thin to rank higher. This adds ~4,300
 * words of real teaching content per page, using the same block model already
 * proven on /difference-between.
 *
 * Read from public/ rather than imported so the React page can fetch the same
 * file at runtime — one source of truth, and zero JS-bundle cost.
 */
const RN_DEEP = (() => {
  try {
    return JSON.parse(readFileSync(path.join(ROOT, 'public', 'rn-deep.json'), 'utf8')).topics || {};
  } catch {
    return {};
  }
})();

/** Render one deep revision-note topic to crawlable HTML. '' when no deep entry. */
function rnDeepHtml(slug) {
  const t = RN_DEEP[slug];
  if (!t) return '';
  const P = (arr) => (arr || []).map((p) => `<p>${esc(p)}</p>`).join('');
  const parts = [];

  for (const e of t.explainers || []) {
    parts.push(`<h2>${esc(e.term)}</h2>${P(e.paras)}`);
  }
  for (const s of t.sections || []) {
    parts.push(`<h2>${esc(s.h)}</h2>${P(s.paras)}${
      (s.bullets || []).length ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''
    }`);
  }
  if ((t.numericals || []).length) {
    parts.push(`<h2>Solved Numericals — Step by Step</h2>${t.numericals.map((n, i) =>
      `<div><p><strong>Problem ${i + 1}. ${esc(n.q)}</strong></p><ol>${
        (n.steps || []).map((s) => `<li>${esc(s)}</li>`).join('')
      }</ol><p><strong>Answer: ${esc(n.answer)}</strong></p></div>`,
    ).join('')}`);
  }
  if ((t.examples || []).length) {
    parts.push(`<h2>Worked Examples</h2><ul>${
      t.examples.map((x) => `<li><strong>${esc(x.t)}</strong> — ${esc(x.d)}</li>`).join('')
    }</ul>`);
  }
  if ((t.mistakes || []).length) {
    parts.push(`<h2>Common Mistakes Students Make</h2><ul>${
      t.mistakes.map((m) => `<li>${esc(m)}</li>`).join('')
    }</ul>`);
  }
  if ((t.applications || []).length) {
    parts.push(`<h2>Where This Shows Up in Real Life</h2>${
      t.applications.map((a) => `<h3>${esc(a.h)}</h3><p>${esc(a.d)}</p>`).join('')
    }`);
  }
  if ((t.boardQuestions || []).length) {
    parts.push(`<h2>Board-Style Questions with Model Answers</h2>${t.boardQuestions.map((b) =>
      `<h3>${esc(b.q)} <em>(${esc(b.marks)} marks)</em></h3><p>${esc(b.a)}</p>`,
    ).join('')}`);
  }
  if ((t.assertionReason || []).length) {
    parts.push(`<h2>Assertion–Reason Questions (CBSE Format)</h2><p>For each question choose: (a) both A and R are true and R is the correct explanation of A; (b) both are true but R is not the correct explanation; (c) A is true but R is false; (d) A is false but R is true.</p>${
      t.assertionReason.map((x, i) =>
        `<div><p><strong>${i + 1}. Assertion (A):</strong> ${esc(x.assertion)}<br><strong>Reason (R):</strong> ${esc(x.reason)}</p><p><strong>Answer: (${esc(x.answer)})</strong> — ${esc(x.why)}</p></div>`,
      ).join('')
    }`);
  }
  if ((t.quiz || []).length) {
    parts.push(`<h2>Quick Self-Check</h2>${t.quiz.map((q, i) =>
      `<div><p><strong>Q${i + 1}. ${esc(q.q)}</strong></p><ul>${
        q.options.map((o, j) => `<li>${'ABCD'[j]}. ${esc(o)}</li>`).join('')
      }</ul><p><strong>Answer: ${'ABCD'[q.correct]}. ${esc(q.options[q.correct])}</strong> — ${esc(q.why)}</p></div>`,
    ).join('')}`);
  }
  if ((t.glossary || []).length) {
    parts.push(`<h2>Key Terms Glossary</h2><dl>${
      t.glossary.map((g) => `<dt><strong>${esc(g.term)}</strong></dt><dd>${esc(g.def)}</dd>`).join('')
    }</dl>`);
  }
  if ((t.revision || []).length) {
    parts.push(`<h2>One-Minute Revision</h2><ul>${
      t.revision.map((r) => `<li>${esc(r)}</li>`).join('')
    }</ul>`);
  }
  if (t.ncertRef) {
    parts.push(`<p><em>Syllabus reference: ${esc(t.ncertRef)}</em></p>`);
  }
  return parts.join('');
}

/** The note's own FAQs plus any extras carried by its deep entry. */
function rnFaqs(x) {
  return [...(x.faqs || []), ...((RN_DEEP[x.slug] || {}).extraFaqs || [])];
}

/**
 * Crawlable body for /english-writing.
 *
 * These pages had NO body builder at all, so the prerendered HTML carried only
 * the title, a truncated intro and a breadcrumb — about 145 words — while the
 * React page rendered the full model answer, format, tips and FAQs from the
 * same records. The gap mattered because this cluster is the site's biggest
 * source of impressions by a wide margin: 4,713 across 28 pages in the
 * 2026-08-13 export, at positions 5.3 to 9.9. Page-one rankings earned on 145
 * words that Google could see.
 *
 * The sample answer is the substance of the page — it is what a student
 * searching "letter for hostel complaint" actually wants — so it is emitted in
 * full, with newlines preserved as line breaks.
 */
function englishWritingBody(x, sibs, base) {
  const fmt = (x.format || []).length
    ? `<h2>Format to Follow</h2><ol>${x.format.map((f) => `<li>${esc(f)}</li>`).join('')}</ol>` : '';
  const sample = x.sample
    ? `<h2>Model Answer: ${esc(x.title)}</h2><div class="sample">${nl2br(x.sample)}</div>` : '';
  const tips = (x.tips || []).length
    ? `<h2>Marks-Scoring Tips</h2><ul>${x.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${fmt}${sample}${tips}`
    + `${faqBlock(x.faqs)}${relBlock(sibs, base, 'More English Writing Topics')}${aiCta}`;
}

function revisionBody(x, sibs) {
  const secs = (x.sections || []).map((s) => `<h2>${esc(s.heading)}</h2><ul>${(s.points || []).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`).join('');
  const kt = (x.keyTerms || []).length ? `<h2>Key Terms</h2><ul>${x.keyTerms.map((t) => `<li><strong>${esc(t.term)}:</strong> ${esc(t.meaning)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${secs}${kt}${rnDeepHtml(x.slug)}${faqBlock(rnFaqs(x))}${relBlock(sibs, '/revision-notes', `More ${esc(x.classLevel)} ${esc(x.subject)} Revision Notes`)}${aiCta}`;
}

const GLOSSARY_DATA = getGlossary(ROOT);
ROUTES.push({
  path: '/glossary',
  title: 'Glossary — Key Science, Maths & Subject Definitions for Students | Syllab.in',
  description: `Free student glossary — clear definitions of ${GLOSSARY_DATA.length}+ key terms across Biology, Physics, Chemistry, Maths and more, with examples. CBSE/NCERT aligned.`,
  keywords: 'definition, glossary, what is photosynthesis, science definitions, maths definitions, CBSE terms, NCERT definitions',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Student Glossary', url: `${SITE}/glossary`, inLanguage: 'en-IN', isAccessibleForFree: true },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Student Glossary',
      description: `${GLOSSARY_DATA.length}+ key terms across Biology, Physics, Chemistry, Maths and more`,
      hasDefinedTerm: GLOSSARY_DATA.slice(0, 20).map(g => ({
        '@type': 'DefinedTerm',
        name: g.term,
        description: g.definition,
        url: `${SITE}/glossary/${g.slug}`,
      })),
    },
  ],
});
const GLOSS_BY_CAT = {};
for (const g of GLOSSARY_DATA) (GLOSS_BY_CAT[g.category || ''] ||= []).push(g);
for (const g of GLOSSARY_DATA) {
  const sibs = (GLOSS_BY_CAT[g.category || ''] || []).filter((y) => y.slug !== g.slug).slice(0, 6);
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Glossary', item: `${SITE}/glossary` },
    { '@type': 'ListItem', position: 2, name: g.term, item: `${SITE}/glossary/${g.slug}` },
  ] };
  ROUTES.push({
    path: `/glossary/${g.slug}`,
    title: `What is ${g.term}? Definition, Meaning & Example | Syllab.in`,
    description: g.definition,
    keywords: `${g.term.toLowerCase()} definition, what is ${g.term.toLowerCase()}, ${g.term.toLowerCase()} meaning, ${(g.category||'').toLowerCase()}`,
    noindex: true, // Post-March-2026 update: thin templated content drags domain quality.
    bodyHtml: glossaryBody(g, sibs),
    jsonLd: (g.faqs && g.faqs.length) ? [breadcrumb, faqJsonLd(g.faqs)] : breadcrumb,
  });
}

// ─── Revision Notes (/revision-notes, /revision-notes/:slug) ──────────────────
const REVISION_DATA = getRevisionNotes(ROOT);
// Derived, never hardcoded: the hub read "Class 9 & 10" long after the cluster
// had grown to Classes 7-12. Keep this in step with the same block in
// src/pages/RevisionNotes.tsx so crawled and hydrated copy agree.
const RN_CLASS_NUMS = [...new Set(REVISION_DATA.map((r) => Number(String(r.classLevel).replace(/\D/g, ''))))]
  .filter(Boolean).sort((a, b) => a - b);
const RN_CLASS_RANGE = RN_CLASS_NUMS.length > 1
  ? `Class ${RN_CLASS_NUMS[0]}-${RN_CLASS_NUMS[RN_CLASS_NUMS.length - 1]}`
  : `Class ${RN_CLASS_NUMS[0]}`;
// Top three subjects by chapter count only — naming all six overruns the 160
// character meta-description limit.
const RN_SUBJECTS = (() => {
  const n = {};
  REVISION_DATA.forEach((r) => { n[r.subject] = (n[r.subject] ?? 0) + 1; });
  const s = Object.keys(n).sort((a, b) => n[b] - n[a]).slice(0, 3);
  return s.length > 1 ? `${s.slice(0, -1).join(', ')} and ${s[s.length - 1]}` : s[0];
})();
ROUTES.push({
  path: '/revision-notes',
  title: `CBSE Revision Notes ${RN_CLASS_RANGE} — Quick Chapter Notes | Syllab.in`,
  description: `Free CBSE revision notes — ${REVISION_DATA.length} chapter-wise notes for ${RN_CLASS_RANGE} ${RN_SUBJECTS}, with key points, formulas and FAQs. NCERT aligned.`,
  keywords: `CBSE revision notes, ${RN_CLASS_NUMS.map((n) => `class ${n} revision notes`).join(', ')}, quick revision notes, NCERT chapter notes`,
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'CBSE Revision Notes', url: `${SITE}/revision-notes`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
const REV_BY_GROUP = {};
for (const r of REVISION_DATA) (REV_BY_GROUP[`${r.classLevel}|${r.subject}`] ||= []).push(r);
for (const r of REVISION_DATA) {
  const sibs = (REV_BY_GROUP[`${r.classLevel}|${r.subject}`] || []).filter((y) => y.slug !== r.slug).slice(0, 6);
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Revision Notes', item: `${SITE}/revision-notes` },
    { '@type': 'ListItem', position: 2, name: `${r.chapter} (${r.classLevel} ${r.subject})`, item: `${SITE}/revision-notes/${r.slug}` },
  ] };
  ROUTES.push({
    path: `/revision-notes/${r.slug}`,
    title: `${r.chapter} ${r.classLevel} ${r.subject} — Revision Notes | Syllab.in`,
    description: r.intro,
    keywords: `${r.chapter.toLowerCase()} revision notes, ${r.classLevel.toLowerCase()} ${(r.subject||'').toLowerCase()} ${r.chapter.toLowerCase()} notes, cbse ${(r.subject||'').toLowerCase()} notes`,
    // /revision-notes builds its routes outside STUDY_CLUSTERS, so it consults
    // the retirement map directly. Three of its retired slugs are duplicates of
    // chapters deepened on 2026-08-16 — the keeper is the 5,000-word page.
    ...(isRetired('/revision-notes', r.slug) ? { noindex: true } : {}),
    bodyHtml: revisionBody(r, sibs),
    // Deep entries carry extra FAQs; they join the on-page list AND the schema.
    jsonLd: rnFaqs(r).length ? [breadcrumb, faqJsonLd(rnFaqs(r))] : breadcrumb,
  });
}

// ─── Sample Papers (/sample-papers, /sample-papers/:slug) ─────────────────────
const SAMPLE_DATA = getSamplePapers(ROOT);
ROUTES.push({
  path: '/sample-papers',
  title: 'CBSE Sample Papers 2026 (with Solutions) — Class 9 to 12 | Syllab.in',
  description: `Free CBSE sample papers with solutions — ${SAMPLE_DATA.length}+ original model question papers for Class 9–12 Maths, Science, Social Science & English, exam-pattern with marking scheme and answers.`,
  keywords: 'CBSE sample papers, class 10 sample paper, class 9 sample paper, class 12 sample paper, model question paper, sample paper with solutions, practice paper',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'CBSE Sample Papers', url: `${SITE}/sample-papers`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
/**
 * Crawlable body for a sample paper. These pages previously shipped title +
 * description + BreadcrumbList and NOTHING else — a crawler saw no passage, no
 * questions and no answers on the site's best-converting cluster. Now the whole
 * paper is in the static HTML, including the unseen passages.
 */
function samplePaperBody(p) {
  const secs = (p.sections || []).map((s) => {
    const passage = s.passage
      ? `<blockquote>${String(s.passage).split('\n\n').map((para) => `<p>${esc(para)}</p>`).join('')}</blockquote>`
      : '';
    const qs = (s.questions || []).map((q, i) =>
      `<div class="qa"><h4>Q${i + 1}. ${esc(q.q)} <em>(${q.marks} mark${q.marks > 1 ? 's' : ''})</em></h4><p><strong>Answer:</strong> ${esc(q.answer)}</p></div>`).join('');
    return `<h2>${esc(s.name)} — ${s.marks} marks</h2><p><em>${esc(s.instructions)}</em></p>${passage}${qs}`;
  }).join('');
  const faqs = (p.faqs || []).length
    ? `<h2>FAQs</h2>${p.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
  const meta = [
    p.board && `<strong>Board:</strong> ${esc(String(p.board))}`,
    p.classLevel && `<strong>Class:</strong> ${esc(String(p.classLevel))}`,
    p.subject && `<strong>Subject:</strong> ${esc(String(p.subject))}`,
    p.totalMarks && `<strong>Total:</strong> ${esc(String(p.totalMarks))} marks`,
    p.duration && `<strong>Time:</strong> ${esc(String(p.duration))}`,
  ].filter(Boolean).join(' · ');
  return `<p class="speakable">${esc(String(p.introFull || p.intro || ''))}</p>
    <p>${meta}</p>
    ${secs}${faqs}
    <p><a href="/sample-papers">All sample papers →</a> · <a href="/pyqs">Previous-year questions →</a> · <a href="/mcqs">Chapter-wise MCQs →</a></p>`;
}

for (const p of SAMPLE_DATA) {
  ROUTES.push({
    path: `/sample-papers/${p.slug}`,
    title: `${p.title} — Free PDF | Syllab.in`,
    description: p.intro,
    bodyHtml: samplePaperBody(p),
    keywords: `${(p.classLevel||'').toLowerCase()} ${(p.subject||'').toLowerCase()} sample paper, cbse ${(p.subject||'').toLowerCase()} sample paper, ${(p.classLevel||'').toLowerCase()} model paper`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sample Papers', item: `${SITE}/sample-papers` },
      { '@type': 'ListItem', position: 2, name: p.title, item: `${SITE}/sample-papers/${p.slug}` },
    ] },
  });
}

// ─── New study clusters (maths tables, writing, mcqs, gk, vocab, literature) ──
// Rich crawlable body builders (answer block + real content + internal links).
function mathsTableBody(x, sibs, base) {
  const chart = (x.rows || []).length
    ? `<h2>${esc(x.title)} — Full Chart</h2><table><thead><tr>${(x.columns || []).map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${x.rows.slice(0, 40).map((r) => `<tr>${r.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
    : '';
  const faqs = (x.faqs || []).slice(0, 4);
  const faqHtml = faqs.length ? `<h2>FAQs</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
  const rel = sibs.length ? `<h2>More Maths Tables & Charts</h2><ul>${sibs.map((s) => `<li><a href="${base}/${s.slug}">${esc(s.title)}</a></li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${chart}${faqHtml}${rel}<p><a href="${base}">See all maths tables &amp; charts →</a></p>`;
}
function conceptBody(x, sibs, base) {
  const rel = sibs.length ? `<h2>Related ${esc(x.subject || '')} Concepts</h2><ul>${sibs.map((s) => `<li><a href="${base}/${s.slug}">${esc(s.title)} Explained</a></li>`).join('')}</ul>` : '';
  // Curated FAQ (concept-faq.mjs) deepens thin concept pages into substantive,
  // snippet-worthy answers for the exact question forms users search.
  const faqs = (x.faqs || []).slice(0, 8);
  const faqHtml = faqs.length ? `<h2>Frequently Asked Questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
  const vSlug = CONCEPT_TO_VISUAL[x.slug];
  const visualLink = vSlug ? `<p><a href="/visual-learning/${vSlug}">🎬 Watch the animated, step-by-step ${esc(x.title)} diagram →</a></p>` : '';

  // The teaching body. Every one of these fields was written and stored in
  // conceptExplainers.ts and none of it reached a page: the loader projected
  // them away, so these pages ranked on their intro and FAQs alone. That is
  // roughly a quarter of what was already authored for them.
  const sections = (x.sections || []).map((s) =>
    `<h2>${esc(s.heading)}</h2><p>${nl2br(s.body)}</p>`).join('');
  const examples = (x.examples || []).length
    ? `<h2>Worked Examples</h2>${x.examples.map((e, i) =>
        `<div class="qa"><h3>Example ${i + 1}. ${esc(e.problem)}</h3><p><strong>Solution:</strong> ${nl2br(e.solution)}</p></div>`).join('')}`
    : '';
  const realLife = (x.realLife || []).length
    ? `<h2>Where You See This in Real Life</h2><ul>${x.realLife.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`
    : '';
  const mistakes = (x.commonMistakes || []).length
    ? `<h2>Common Mistakes Students Make</h2><ul>${x.commonMistakes.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`
    : '';

  return `<p class="speakable"><strong>${esc(x.title)}:</strong> ${esc(x.intro)}</p>`
    + `<h2>${esc(x.title)} Explained Simply</h2><p>${esc(x.intro)}${x.classLevel || x.subject ? ` This is a key ${esc(x.subject || '')} concept${x.classLevel ? ` for ${esc(x.classLevel)}` : ''}.` : ''}</p>`
    + `${visualLink}${sections}${examples}${realLife}${mistakes}${faqHtml}${rel}`
    + `<p><a href="${base}">Browse all concepts →</a></p>`;
}
function visualBody(x, sibs, base) {
  const why = x.whyItMatters ? `<p><strong>Why it matters:</strong> ${esc(x.whyItMatters)}</p>` : '';
  // Step captions carry the real teaching — render them as an ordered walkthrough.
  const steps = (x.steps || []).length ? `<h2>${esc(x.title)} — Step by Step</h2><ol>${x.steps.map((s) => `<li>${esc(s.caption)}</li>`).join('')}</ol>` : '';
  const hook = x.memoryHook ? `<h2>Remember It (Memory Trick)</h2><p>${esc(x.memoryHook)}</p>` : '';
  const real = x.realLifeExample ? `<h2>Real-Life Example</h2><p>${esc(x.realLifeExample)}</p>` : '';
  const notes = (x.cruxNotes || []).length ? `<h2>Quick Notes — the Exam Crux</h2><ul>${x.cruxNotes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : '';
  const recall = (x.recall || []).length ? `<h2>Test Yourself</h2>${x.recall.map((r) => `<h3>${esc(r.q)}</h3><p>${esc(r.a)}</p>`).join('')}` : '';
  const cSlug = VISUAL_TO_CONCEPT[x.slug];
  const conceptLink = cSlug ? `<p><a href="/concepts/${cSlug}">📖 Read the full explanation of ${esc(x.title)} →</a></p>` : '';
  return `<p class="speakable"><strong>${esc(x.title)}:</strong> ${esc(x.intro)}</p>${why}${steps}${notes}${hook}${real}${recall}${conceptLink}${relBlock(sibs, base, `More Visual Lessons`)}${aiCta}`;
}
// History timelines — render the full ordered event list so the page has real,
// crawlable content (the SPA shows the same events interactively).
function timelineBody(x, sibs, base) {
  const events = x.events || [];
  const why = x.whyItMatters ? `<p><strong>Why it matters:</strong> ${esc(x.whyItMatters)}</p>` : '';
  const span = events.length ? `${esc(events[0].year)} – ${esc(events[events.length - 1].year)}` : '';
  const table = events.length ? `<h2>${esc(x.title)} — Timeline of Key Events</h2>
    <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody>
    ${events.map((e) => `<tr><td><strong>${esc(e.year)}</strong></td><td><strong>${esc(e.title)}.</strong> ${esc(e.detail)}</td></tr>`).join('')}
    </tbody></table>` : '';
  const recap = events.length ? `<h2>Quick Recap — Dates to Remember</h2><ul>${events.map((e) => `<li><strong>${esc(e.year)}:</strong> ${esc(e.title)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable"><strong>${esc(x.title)}${x.classLevel ? ` (${esc(x.classLevel)})` : ''}:</strong> ${esc(x.intro)}${span ? ` This interactive timeline covers ${events.length} key events from ${span}.` : ''}</p>${why}${table}${recap}${relBlock(sibs, base, `More History Timelines`)}${aiCta}`;
}
// Load FULL visual lessons from the compiled SSR bundle so the prerender can
// render memoryHook/realLifeExample/cruxNotes/recall (the regex-based
// getVisualLessons only extracts slug/title/subject/classLevel/intro). Falls
// back to the thin regex data when the bundle is absent (standalone runs).
let VISUAL_LESSONS_FULL = getVisualLessons(ROOT);
let VISUAL_TO_CONCEPT = {};
let CONCEPT_TO_VISUAL = {};
{
  const vlBundlePath = path.join(ROOT, 'dist-ssr', 'entry-server.js');
  if (existsSync(vlBundlePath)) {
    try {
      const { pathToFileURL } = await import('node:url');
      const mod = await import(pathToFileURL(vlBundlePath).href);
      if (Array.isArray(mod.VISUAL_LESSONS) && mod.VISUAL_LESSONS.length) VISUAL_LESSONS_FULL = mod.VISUAL_LESSONS;
      if (mod.VISUAL_TO_CONCEPT) VISUAL_TO_CONCEPT = mod.VISUAL_TO_CONCEPT;
      if (mod.CONCEPT_TO_VISUAL) CONCEPT_TO_VISUAL = mod.CONCEPT_TO_VISUAL;
    } catch { /* keep regex fallback */ }
  }
}
// Generate AMP Web Stories (Google Discover channel) from the full lesson data.
try {
  const { generateWebStories, generateConceptStories } = await import('./webStories.mjs');
  await generateWebStories(ROOT, VISUAL_LESSONS_FULL);
  // Also generate Web Stories from the concept explainers (more Discover surface).
  await generateConceptStories(ROOT, getConcepts(ROOT).map((x) => (CONCEPT_FAQ[x.slug] ? { ...x, faqs: CONCEPT_FAQ[x.slug] } : x)));
} catch (e) { console.warn('⚠️  Web Stories generation error:', e?.message || e); }
// Shareable "Science Memory Tricks" cheat-sheet (printable linkable asset).
try {
  const { generateMemoryPoster } = await import('./memoryPoster.mjs');
  generateMemoryPoster(ROOT, VISUAL_LESSONS_FULL);
} catch (e) { console.warn('⚠️  Memory poster generation error:', e?.message || e); }


/**
 * Body builders for three clusters that had none, so each page rendered only its
 * intro — 124 to 155 words — while the banks behind them held the real content.
 *
 * /what-to-study was the worst of the three: the loader could not parse the
 * authored intro, so it invented "Most important chapters in X by marks
 * weightage" and dropped the units table, which is the only reason the page
 * exists. A student searching "class 10 maths weightage" got a generic sentence.
 */
function weightageBody(x, sibs, base) {
  const units = (x.units || []).slice().sort((a, b) => b.marks - a.marks);
  const total = units.reduce((n, u) => n + u.marks, 0);
  const top = units.slice(0, 2);
  const rel = sibs.length ? `<h2>Weightage for Other Subjects</h2><ul>${sibs.map((s) => `<li><a href="${base}/${s.slug}">${esc(s.title)} — marks weightage</a></li>`).join('')}</ul>` : '';
  if (!units.length) return `<p>${esc(x.intro || '')}</p>${rel}`;
  const faqs = [
    { q: `Which chapters carry the most marks in ${x.title}?`, a: `${top.map((u) => `${u.name} (${u.marks} marks)`).join(' and ')} carry the most — ${top.reduce((n, u) => n + u.marks, 0)} of ${x.totalMarks || total} between them. Securing these two before anything else is the single highest-return decision in your revision plan.` },
    { q: `What is the total marks for ${x.title}?`, a: `${x.exam || 'The paper'} carries ${x.totalMarks || total} marks in theory. The unit-wise split above accounts for all of them.` },
    { q: `Should I skip the low-weightage units?`, a: `No. The smallest units here are worth ${Math.min(...units.map((u) => u.marks))} marks, which is more than the gap between most grade boundaries, and they are usually the quickest to prepare. Order your revision by weightage; do not delete anything from it.` },
  ];
  return `
    <p class="speakable">${esc(x.intro || '')}</p>

    <h2>${esc(x.title)} — Unit-wise Marks Weightage</h2>
    <p>${x.exam ? `${esc(x.exam)} — ` : ''}${x.totalMarks ? `${x.totalMarks} marks in theory` : `${total} marks`}, listed heaviest first so you can see where your revision time actually earns marks.</p>
    <table><thead><tr><th>Unit</th><th>Marks</th><th>Share</th><th>What to focus on</th></tr></thead><tbody>
      ${units.map((u) => `<tr><td>${esc(u.name)}</td><td>${u.marks}</td><td>${Math.round((u.marks / (x.totalMarks || total)) * 100)}%</td><td>${esc(u.tip || '')}</td></tr>`).join('')}
    </tbody></table>

    <h2>How to Use This Weightage</h2>
    <p>Work down the table rather than through the textbook in order. ${esc(top.map((u) => u.name).join(' and '))} alone account for ${top.reduce((n, u) => n + u.marks, 0)} of ${x.totalMarks || total} marks, so a week spent there moves your score further than a week spent on the last three units combined. Once the heavy units are secure, the lighter ones are usually short and formula-driven, which makes them efficient to finish last.</p>
    <p>Treat the tips in the final column as the specific sub-topics examiners return to. They are where the marks in each unit actually sit.</p>

    ${faqBlock(faqs)}
    ${rel}`;
}

const STUDY_CLUSTERS = [
  { base: '/maths-tables', name: 'Maths Tables & Charts', kw: 'maths tables, multiplication table, squares cubes primes', data: getMathsTables(ROOT), label: (x) => x.title, titleSuffix: '— Full Chart & Quick Revision', body: mathsTableBody },
  { base: '/english-writing', name: 'English Writing Skills', kw: 'essay writing, letter writing, notice article speech writing', data: getEnglishWriting(ROOT), label: (x) => x.title, body: englishWritingBody },
  { base: '/mcqs', name: 'Chapter-wise MCQs', kw: 'MCQ with answers, objective questions, online test CBSE', data: getChapterMcqs(ROOT), label: (x) => `${x.chapter} (${x.classLevel} ${x.subject})`, body: mcqBody },
  { base: '/gk-facts', name: 'General Knowledge', kw: 'general knowledge, static GK, GK for exams', data: getStaticGk(ROOT), label: (x) => x.title, body: gkBody },
  { base: '/vocabulary', name: 'English Vocabulary', kw: 'idioms and phrases, proverbs, one word substitution, synonyms antonyms', data: getEnglishVocab(ROOT), label: (x) => x.title, body: vocabBody },
  { base: '/english-literature', name: 'English Literature', kw: 'english summary, character sketch, NCERT english chapter summary', data: getEnglishLiterature(ROOT), label: (x) => `${x.chapter} (${x.classLevel} English)`, body: litBody },
  { base: '/concepts', name: 'Concepts Explained', kw: 'concept explained, science maths concepts simple, real-life examples', data: getConcepts(ROOT).map((x) => (CONCEPT_FAQ[x.slug] ? { ...x, faqs: CONCEPT_FAQ[x.slug] } : x)), label: (x) => `${x.title} Explained`, body: conceptBody },
  { base: '/solved-examples', name: 'Solved Numerical Examples', kw: 'solved examples, numerical problems with solutions, step by step', data: getSolvedExamples(ROOT), label: (x) => `${x.chapter} Solved Examples (${x.classLevel} ${x.subject})`, body: solvedBody },
  { base: '/lab-practicals', name: 'Lab Practicals & Viva', kw: 'lab practical, science experiment procedure, viva questions, CBSE practical', data: getLabPracticals(ROOT), label: (x) => `${x.title} (${x.classLevel} ${x.subject} Practical)`, body: labBody },
  { base: '/visual-learning', name: 'Visual Learning — Interactive Diagrams', kw: 'animated diagrams, interactive diagrams, step by step science diagrams, water cycle photosynthesis heart', data: VISUAL_LESSONS_FULL.map((x) => (x.recall && x.recall.length ? { ...x, faqs: x.recall } : x)), label: (x) => `${x.title} — Interactive Diagram`, body: visualBody },
  { base: '/timelines', name: 'History Timelines', kw: 'history timeline, indian freedom struggle timeline, mughal empire timeline, important dates history', data: getTimelines(ROOT), label: (x) => `${x.title} — Interactive Timeline`, body: timelineBody },
  { base: '/what-to-study', name: 'What to Study — Marks Weightage', kw: 'important chapters by marks, cbse weightage, what to study for boards, marks distribution', data: getWhatToStudy(ROOT), label: (x) => `Most Important Chapters — ${x.title}` , body: weightageBody },
  { base: '/pyqs', name: 'Previous Year Questions (PYQ)', kw: 'previous year questions, pyq chapter wise, board questions with solutions, important questions', data: getPyqs(ROOT), label: (x) => `${x.chapter} — Previous Year Questions (${x.classLevel} ${x.subject})`, body: pyqBody },
];
for (const c of STUDY_CLUSTERS) {
  ROUTES.push({ path: c.base, title: `${c.name} — Free for Students | Syllab.in`, description: `${c.name} — ${c.data.length}+ free resources for Indian students. ${c.kw}.`, keywords: c.kw, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.name, url: `${SITE}${c.base}`, inLanguage: 'en-IN', isAccessibleForFree: true } });
  // Group for sibling internal links (by category/subject/class when available).
  const gKey = (x) => x.category || x.subject || x.classLevel || 'all';
  const byGroup = {};
  for (const x of c.data) (byGroup[gKey(x)] ||= []).push(x);
  for (const x of c.data) {
    const nm = c.label(x);
    const route = {
      path: `${c.base}/${x.slug}`,
      title: `${nm} ${c.titleSuffix || ''} | Syllab.in`.replace(/\s+\|/, ' |'),
      description: x.intro || nm,
      keywords: `${nm.toLowerCase()}, ${c.kw}`,
      // A cluster may retire a URL without deleting it — see MCQ_RETIRED_SLUGS.
      // The page still resolves so inbound links do not 404; noindex,follow
      // stops it competing with the page its content was merged into.
      ...(isRetired(c.base, x.slug) ? { noindex: true } : {}),
      jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: c.name, item: `${SITE}${c.base}` },
        { '@type': 'ListItem', position: 2, name: nm, item: `${SITE}${c.base}/${x.slug}` },
      ] },
    };
    if (c.body) {
      const sibs = (byGroup[gKey(x)] || []).filter((y) => y.slug !== x.slug).slice(0, 6);
      route.bodyHtml = c.body(x, sibs, c.base);
    }
    if (x.faqs && x.faqs.length) {
      route.jsonLd = [route.jsonLd, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: x.faqs.slice(0, 8).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }];
    }
    // Reciprocal hreflang to the Hindi version, where one exists (see hindi-concepts.mjs).
    if (c.base === '/concepts' && HINDI_CONCEPT_SLUGS.has(x.slug)) {
      route.hreflangAlt = [{ lang: 'hi-IN', href: `${SITE}/hi/concepts/${x.slug}` }];
    }
    ROUTES.push(route);
  }
}

// ─── Medical / MBBS colleges (/medical-colleges, /:state, /:state/:slug) ──────
const { states: MED_STATES, colleges: MED_COLLEGES_ALL } = getMedicalManifest(ROOT);
// Detail pages are still emitted for every record so retired URLs keep resolving
// under noindex; listings use the deduplicated set.
const MED_COLLEGES = MED_COLLEGES_ALL.filter((c) => !isRetired('/medical-colleges', c.slug));

/**
 * Full-course MBBS fee — printed ONLY when it agrees with the per-year figure.
 *
 * 39 of the 55 records holding both numbers contradict themselves, in clean
 * clusters: 16 store the total as exactly 10x the annual fee, 11 as 6x, 9 as 60x
 * and 3 as 8x. MBBS is 4.5 years of tuition, so at most one number in each pair
 * can be right, and which one cannot be settled without official fee schedules.
 * Printing the stored total anyway put lines like "₹25,00,000/yr (₹2,50,00,000
 * full course)" in front of families choosing where to spend a decade of savings.
 *
 * Where the two disagree, publish the per-year figure alone rather than guess. A
 * curated range string ("₹25–30 L") is human-written rather than derived, so it
 * is trusted as-is.
 */
const medFullCourse = (c) => {
  const raw = String(c.feesTotal ?? '');
  if (!raw) return null;
  if (/[₹L–]/.test(raw)) return c.feesTotal;
  const y = Number(String(c.feesPerYear).replace(/[^0-9.]/g, ''));
  const t = Number(raw.replace(/[^0-9.]/g, ''));
  if (!(y > 0) || !(t > 0)) return null;
  return Math.abs(t / y - 4.5) <= 1.0 ? c.feesTotal : null; // MBBS = 4.5 years of tuition
};

ROUTES.push({
  path: '/medical-colleges',
  title: 'Top Medical Colleges in India (MBBS/BDS) — NEET Cutoffs, Fees & Admission | Syllab.in',
  description: 'Browse the top medical colleges in India by state — AIIMS, JIPMER and the best government & private MBBS colleges. Compare NEET cutoffs, MBBS fees, seats and the full admission process. Free.',
  keywords: 'top medical colleges India, MBBS colleges by state, NEET cutoff colleges, AIIMS MBBS fees, best government medical colleges, private MBBS colleges fees, NEET college list',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Top Medical Colleges in India', url: `${SITE}/medical-colleges`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const s of MED_STATES) {
  const inState = MED_COLLEGES.filter((c) => c.stateSlug === s.slug);
  if (!inState.length) continue;
  ROUTES.push({
    path: `/medical-colleges/${s.slug}`,
    title: `Top Medical Colleges in ${s.name} (MBBS) — NEET Cutoffs & Fees 2026 | Syllab.in`,
    description: `Best MBBS medical colleges in ${s.name} — NEET cutoffs, MBBS fees, seats and admission process. ${s.blurb}`,
    keywords: `medical colleges in ${s.name}, MBBS colleges ${s.name}, NEET cutoff ${s.name}, ${s.name} government medical colleges, MBBS fees ${s.name}`,
    bodyHtml: `<ul>${inState.map((c) => `<li><a href="/medical-colleges/${s.slug}/${c.slug}">${esc(c.name)}</a> — ${esc(c.city)}, ${esc(c.type)}; MBBS fees ${esc(c.feesPerYear)}/yr, ${c.mbbsSeats} seats, NEET: ${esc(c.neetCutoff)}</li>`).join('')}</ul>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Medical Colleges in ${s.name}`, url: `${SITE}/medical-colleges/${s.slug}`, inLanguage: 'en-IN' },
  });
}
const OWNER = (t) => {
  const s = String(t || '');
  if (/AIIMS/i.test(s)) return 'central government institute of national importance';
  if (/Government|Govt/i.test(s)) return 'government medical college';
  if (/Deemed/i.test(s)) return 'deemed-to-be university';
  if (/Private/i.test(s)) return 'private medical college';
  return 'medical college';
};

/** Peer set for the comparison table: same state first, then same ownership type. */
const medPeers = (c) => {
  const pool = MED_COLLEGES.filter((o) => o.slug !== c.slug);
  let peers = pool.filter((o) => o.stateSlug === c.stateSlug);
  if (peers.length < 2) peers = pool.filter((o) => o.type === c.type);
  const byRank = (a, b) => (a.nirf ?? 9999) - (b.nirf ?? 9999);
  return [c, ...peers.sort(byRank).slice(0, 4)].sort(byRank);
};

/** FAQ entries, shared between the visible block and the FAQPage schema. */
const medFaqs = (c) => {
  const feeYr = inr(c.feesPerYear) || c.feesPerYear;
  const full = medFullCourse(c);
  const rankLine = c.nirf
    ? `ranked #${c.nirf} in NIRF Medical 2025`
    : 'outside the NIRF Medical 2025 top 50, which is the full list that ranking publishes';
  return [
    { q: `What are the MBBS fees at ${c.shortName}?`, a: `MBBS tuition at ${c.name} is about ${feeYr} per year${full ? `, and roughly ${full} for the whole course` : ''}. Hostel, mess and one-time charges are billed separately, so budget above the tuition figure.` },
    { q: `What is the NEET cutoff for ${c.shortName}?`, a: `${c.neetCutoff}. Cutoffs move every year with the number of candidates, the difficulty of the paper and the seats released in each counselling round, so treat this as indicative rather than a fixed threshold.` },
    { q: `How many MBBS seats does ${c.shortName} have?`, a: `${c.name} has ${c.mbbsSeats} MBBS seats. Seats are filled through NEET UG counselling, divided between the All India Quota and the state quota depending on the college.` },
    { q: `How do I get admission to ${c.shortName}?`, a: `${(c.admissionSteps || []).join('; ')}. Admission is entirely through NEET UG — there is no separate entrance test for the MBBS seats.` },
    (c.courses && c.courses.length) ? { q: `Which courses does ${c.shortName} offer?`, a: `${c.name} offers ${c.courses.join(', ')}.` } : null,
    c.accommodation ? { q: `Does ${c.shortName} provide hostel accommodation?`, a: `${c.accommodation}` } : null,
    c.internship ? { q: `What is the internship at ${c.shortName} like?`, a: `${c.internship}` } : null,
    { q: `Is ${c.shortName} a good medical college?`, a: `${c.name} is a ${OWNER(c.type)} in ${c.city}, established in ${c.established} and ${rankLine}. It offers ${c.mbbsSeats} MBBS seats at about ${feeYr} a year. Whether it suits you depends on your NEET rank, your budget and whether you want to study in ${c.state}.` },
  ].filter(Boolean);
};

/**
 * Full detail page for a medical college.
 *
 * These pages averaged 219 words and carried a single <h2> — "Admission process"
 * — while the engineering college pages, which serve the same kind of decision,
 * ran to 775 words across ten sections. Every field in the medical bank is
 * populated for all 70 records (only `nirf` is legitimately sparse), so the depth
 * existed in the data and was simply never rendered. Nothing here is invented:
 * each section is omitted when the field behind it is empty.
 */
const medBody = (c) => {
  const feeYr = inr(c.feesPerYear) || c.feesPerYear;
  const full = medFullCourse(c);
  const peers = medPeers(c);
  const hasPeers = peers.length > 1;
  return `
    <p class="speakable"><strong>${esc(c.name)}</strong>${c.shortName && c.shortName !== c.name ? ` (${esc(c.shortName)})` : ''} is a ${esc(OWNER(c.type))} in ${esc(c.city)}, ${esc(c.state)}, established in ${c.established}. It offers ${c.mbbsSeats} MBBS seats at about ${esc(String(feeYr))} per year and admits students through NEET UG.</p>
    ${c.about ? `<p>${esc(c.about)}</p>` : ''}

    <h2>${esc(c.shortName)} — Quick Facts</h2>
    <table><tbody>
      <tr><td>Type</td><td>${esc(OWNER(c.type))}</td></tr>
      <tr><td>Established</td><td>${c.established}</td></tr>
      <tr><td>Location</td><td>${esc(c.city)}, ${esc(c.state)}</td></tr>
      <tr><td>NIRF Medical 2025</td><td>${c.nirf ? `#${c.nirf}` : 'Not in the published top 50'}</td></tr>
      <tr><td>MBBS seats</td><td>${c.mbbsSeats}</td></tr>
      <tr><td>MBBS fees</td><td>${esc(String(feeYr))} per year${full ? ` (${esc(String(full))})` : ''}</td></tr>
      <tr><td>NEET cutoff (indicative)</td><td>${esc(c.neetCutoff)}</td></tr>
      <tr><td>Entrance exam</td><td>${esc((c.exams || ['NEET UG']).join(', '))}</td></tr>
    </tbody></table>

    ${(c.courses && c.courses.length) ? `<h2>Courses Offered at ${esc(c.shortName)}</h2><ul>${c.courses.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}

    <h2>${esc(c.shortName)} MBBS Fees</h2>
    <p>Tuition is about <strong>${esc(String(feeYr))} per year</strong>${full ? `, which works out to roughly <strong>${esc(String(full))}</strong> across the course` : ''}. The MBBS course runs four and a half years of teaching followed by a compulsory rotating internship, so plan for five and a half years in total. Hostel, mess, uniform and examination charges are additional and are not included in the tuition figure above.</p>

    <h2>NEET Cutoff &amp; Eligibility</h2>
    <p>The indicative closing standard is <strong>${esc(c.neetCutoff)}</strong>. To be eligible you must have passed Class 12 with Physics, Chemistry and Biology, be at least 17 years old by 31 December of the admission year, and qualify NEET UG in the same year. The cutoff shifts each year with the number of candidates and the seats released in each round, so use it to judge whether the college is within reach rather than as a fixed line.</p>

    <h2>Admission Process (NEET UG)</h2>
    <ol>${(c.admissionSteps || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ol>

    ${c.internship ? `<h2>Internship</h2><p>${esc(c.internship)}</p>` : ''}
    ${c.accommodation ? `<h2>Campus &amp; Accommodation</h2><p>${esc(c.accommodation)}</p>` : ''}

    ${hasPeers ? `<h2>${esc(c.shortName)} vs Other Medical Colleges — Comparison</h2>
    <p>How ${esc(c.shortName)} compares with neighbouring colleges on the numbers students actually weigh. All figures are indicative and must be checked on the official counselling website before any decision.</p>
    <table><thead><tr><th>College</th><th>NIRF 2025</th><th>MBBS seats</th><th>Fees / year</th><th>NEET cutoff</th></tr></thead><tbody>
      ${peers.map((o) => `<tr><td>${o.slug === c.slug ? `<strong>${esc(o.shortName)}</strong>` : `<a href="/medical-colleges/${o.stateSlug}/${o.slug}">${esc(o.shortName)}</a>`}</td><td>${o.nirf ? `#${o.nirf}` : '—'}</td><td>${o.mbbsSeats}</td><td>${esc(String(inr(o.feesPerYear) || o.feesPerYear || '—'))}</td><td>${esc(o.neetCutoff || '—')}</td></tr>`).join('')}
    </tbody></table>` : ''}

    <h2>Official Links</h2>
    <ul>
      ${c.website ? `<li><a href="https://${esc(c.website)}" rel="nofollow noopener">Official website (${esc(c.website)})</a></li>` : ''}
      <li><a href="https://mcc.nic.in" rel="nofollow noopener">MCC — All India Quota NEET UG counselling</a></li>
      <li><a href="https://neet.nta.nic.in" rel="nofollow noopener">NTA NEET UG — exam, admit card and results</a></li>
    </ul>

    ${faqBlock(medFaqs(c))}

    <p><a href="/medical-colleges/${c.stateSlug}">More medical colleges in ${esc(c.state)} →</a> · <a href="/medical-colleges">All medical colleges by state →</a></p>
    <p><em>All figures (fees, NEET cutoffs, seats, NIRF rank) are indicative for guidance and should be verified on the official college or counselling website before any decision.</em></p>`;
};

for (const c of MED_COLLEGES_ALL) {
  const u = `${SITE}/medical-colleges/${c.stateSlug}/${c.slug}`;
  ROUTES.push({
    path: `/medical-colleges/${c.stateSlug}/${c.slug}`,
    ...(isRetired('/medical-colleges', c.slug) ? { noindex: true } : {}),
    title: `${c.name} — MBBS Fees, NEET Cutoff, Seats & Admission | Syllab.in`,
    description: `${c.name}, ${c.city}: MBBS fees ${c.feesPerYear}/yr, ${c.neetCutoff}, ${c.mbbsSeats} seats${c.nirf ? `, NIRF #${c.nirf}` : ''}. Admission via NEET UG — full process, courses, internship & hostel.`,
    keywords: `${c.name} fees, ${c.shortName} NEET cutoff, ${c.name} MBBS admission, ${c.name} seats, ${c.city} medical college`,
    bodyHtml: medBody(c),
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name: c.name, foundingDate: String(c.established), url: `https://${c.website}`, address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: c.state, addressCountry: 'IN' } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: medFaqs(c).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  });
}

// ─── College Finder: colleges-accepting/<exam> + best-colleges/<course> ───────
const CF_EXAMS = [['jee-main','JEE Main'],['jee-advanced','JEE Advanced'],['neet','NEET'],['bitsat','BITSAT'],['viteee','VITEEE'],['tnea','TNEA'],['kcet','KCET'],['comedk','COMEDK'],['mht-cet','MHT-CET'],['ts-eapcet','TS EAPCET'],['ap-eapcet','AP EAPCET'],['wbjee','WBJEE']];
const CF_COURSES = [['cse','CSE','Computer Science Engineering'],['ai-ml','AI/ML','AI, ML & Data Science'],['ece','ECE','Electronics & Communication'],['it','IT','Information Technology'],['electrical','Electrical','Electrical Engineering'],['mechanical','Mechanical','Mechanical Engineering'],['civil','Civil','Civil Engineering'],['mbbs','MBBS','MBBS (Medical)']];
ROUTES.push({ path: '/colleges-accepting', title: 'Colleges Accepting JEE, NEET, EAMCET, KCET & More (2026) | Syllab.in', description: 'Find the colleges that accept each entrance exam — JEE Main, JEE Advanced, NEET, BITSAT, VITEEE, KCET, COMEDK, MHT-CET, EAMCET, WBJEE. Fees, cutoffs & admission, free.', keywords: 'colleges accepting jee main, colleges accepting neet, colleges accepting kcet, exam wise college list india', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Colleges by Entrance Exam', url: `${SITE}/colleges-accepting`, inLanguage: 'en-IN' } });
for (const [slug, label] of CF_EXAMS) {
  ROUTES.push({ path: `/colleges-accepting/${slug}`, title: `Colleges Accepting ${label} (2026) — Full List, Fees & Cutoffs | Syllab.in`, description: `Complete list of top colleges that accept ${label} — fees, cutoffs, seats and the admission process. Free and indicative for guidance.`, keywords: `colleges accepting ${label.toLowerCase()}, ${label.toLowerCase()} college list, ${label.toLowerCase()} cutoff colleges, ${label.toLowerCase()} colleges fees`, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Colleges accepting ${label}`, url: `${SITE}/colleges-accepting/${slug}`, inLanguage: 'en-IN' } });
}
ROUTES.push({ path: '/best-colleges', title: 'Best Colleges by Course — CSE, ECE, MBBS & More (2026 Rankings) | Syllab.in', description: 'Find the best colleges in India for your course — CSE, AI/ML, ECE, IT, Mechanical, Civil and MBBS. Ranked by NIRF with fees, cutoffs & placements. Free.', keywords: 'best CSE colleges India, best MBBS colleges India, best ECE colleges, course wise college ranking', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Best Colleges by Course', url: `${SITE}/best-colleges`, inLanguage: 'en-IN' } });
for (const [slug, short, full] of CF_COURSES) {
  ROUTES.push({ path: `/best-colleges/${slug}`, title: `Best ${short} Colleges in India 2026 — Ranking, Fees & Cutoffs | Syllab.in`, description: `Top ${full} colleges in India — ranked by NIRF with fees, cutoffs, placements and admission. Free and indicative.`, keywords: `best ${short.toLowerCase()} colleges india, top ${short.toLowerCase()} colleges, ${short.toLowerCase()} college ranking, ${full.toLowerCase()} fees cutoff`, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Best ${short} Colleges in India`, url: `${SITE}/best-colleges/${slug}`, inLanguage: 'en-IN' } });
}

// ─── Scholarships (free, highly-linkable resource page) ───────────────────────
ROUTES.push({
  path: '/scholarships',
  title: 'Scholarships for Students in India 2026 — Govt, State & Private (Free List) | Syllab.in',
  description: 'Free, updated list of scholarships for Indian students — NSP pre/post-matric, NMMS, PM YASASVI, INSPIRE, AICTE Pragati/Saksham, Reliance, Tata & more. Eligibility, amount, deadlines and how to apply.',
  keywords: 'scholarships for students India 2026, NSP scholarship, NMMS scholarship, INSPIRE scholarship, PM YASASVI, AICTE Pragati, private scholarships India, scholarship class 10 12',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Scholarships for Students in India', url: `${SITE}/scholarships`, inLanguage: 'en-IN', isAccessibleForFree: true },
});

// ─── Embed / Link-to-us (backlink enabler page) ───────────────────────────────
ROUTES.push({
  path: '/embed',
  title: 'Link to Syllab — Free Embed Badges & Widgets for Your Site | Syllab.in',
  description: "Add Syllab's free study resources to your school site, blog or classroom page. Copy-paste badges and widgets linking to free NCERT solutions, formula sheets and more — 100% free.",
  keywords: 'link to syllab, embed free study tools, education widget for website, free ncert solutions widget',
  jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Link to Syllab', url: `${SITE}/embed`, inLanguage: 'en-IN' },
});

// ─── Photo Doubt-Solver (snap a problem → instant AI solution) ────────────────
ROUTES.push({
  path: '/doubt-solver',
  title: 'Photo Doubt Solver — Snap & Solve Any Homework Question Free | Syllab.in',
  description: 'Stuck on a question? Take a photo and get an instant, free, step-by-step solution. Free AI math & science homework solver for Indian students (Class 1–12) — no signup, no waiting for a video.',
  keywords: 'photo question solver free, math problem solver photo, homework scanner free India, scan and solve maths, doubt solver free, snap and solve question, AI homework helper India, free Doubtnut alternative',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Photo Doubt Solver', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/doubt-solver`, inLanguage: 'en-IN', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is the photo doubt solver free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — snap or upload a photo of any homework question and get a free step-by-step solution instantly. No subscription, no signup.' } },
      { '@type': 'Question', name: 'What subjects does it solve?', acceptedAnswer: { '@type': 'Answer', text: 'It solves Maths, Physics, Chemistry and other academic problems for Class 1–12, including CBSE/NCERT questions, with clean step-by-step working.' } },
      { '@type': 'Question', name: 'Do I need to wait for a video?', acceptedAnswer: { '@type': 'Answer', text: 'No. Unlike video-based apps, Syllab returns a written step-by-step solution instantly using AI.' } },
    ] },
  ],
});

// Keyword-targeted "<subject> for kids" SEO landing pages.
for (const k of [
  { p: '/maths-for-kids', kw: 'maths for kids', t: 'Maths for Kids — Free, Fun & Online (Pre-KG to Class 5) | Syllab.in', d: 'Free Maths for Kids — counting, shapes, addition, tables and printable worksheets through fun games. Pre-KG to Class 5, no signup. 100% free for Indian kids.' },
  { p: '/science-for-kids', kw: 'science for kids', t: 'Science for Kids — Free, Fun & Online (Animated) | Syllab.in', d: 'Free Science for Kids — animals, plants, the human body, weather and space with animated diagrams and activities. Pre-KG to Class 5, completely free.' },
  { p: '/english-for-kids', kw: 'english for kids', t: 'English for Kids — Free Alphabet, Phonics, Rhymes & Stories | Syllab.in', d: 'Free English for Kids — alphabet, phonics, sight words, rhymes and stories with audio, plus printable worksheets. Pre-KG to Class 5, no signup.' },
]) {
  ROUTES.push({ path: k.p, title: k.t, description: k.d, keywords: `${k.kw}, ${k.kw} free, ${k.kw} online, free ${k.kw} india, ${k.kw} games, ${k.kw} worksheets`, jsonLd: [{ '@context': 'https://schema.org', '@type': 'LearningResource', name: k.t, description: k.d, educationalLevel: 'Pre-KG to Class 5', inLanguage: 'en-IN', isAccessibleForFree: true }] });
}
ROUTES.push({
  path: '/quiz-duel',
  title: 'Quiz Duel — Free 1v1 GK Quiz Battle for Students | Syllab.in',
  description: 'Battle the AI or challenge a friend in a fast, timed GK quiz duel. 8 questions, beat the clock and share your score on WhatsApp — free for Indian students.',
  keywords: 'quiz battle, gk quiz duel, 1v1 quiz game, online quiz students India, challenge friend quiz, free quiz game',
  jsonLd: [{ '@context': 'https://schema.org', '@type': 'Game', name: 'Syllab Quiz Duel', url: `${SITE}/quiz-duel`, inLanguage: 'en-IN', isAccessibleForFree: true }],
});
ROUTES.push({
  path: '/study-room',
  title: 'AI Study Room — Focus Timer, Study Music & AI Tutor (Free) | Syllab.in',
  description: 'Free AI study room for Indian students: Pomodoro focus timer, calming study ambience, exam countdowns, a voice AI tutor for instant doubts, break reminders and study-streak tracking — like having a tuition teacher beside you.',
  keywords: 'study room online free, pomodoro timer study, AI tutor voice India, study with me focus timer, study music free, exam countdown CBSE JEE NEET, distraction blocker study, online study room India students, virtual study room free',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab AI Study Room', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/study-room`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is the Syllab Study Room free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the focus timer, study ambience, exam countdowns and break reminders are completely free. The AI tutor answers your doubts on demand at no cost.' } },
      { '@type': 'Question', name: 'Does it work like a personal tuition teacher?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You set a study goal, the Pomodoro timer keeps you focused with automatic breaks, and the built-in AI teacher explains any doubt by text or voice and can plan your study session.' } },
      { '@type': 'Question', name: 'Is the focus camera private?', acceptedAnswer: { '@type': 'Answer', text: 'Completely. The optional focus camera runs only on your device as a focus mirror — nothing is ever recorded or uploaded.' } },
    ] },
  ],
});

// Engineering cutoff explorer — static tables per major exam from the verified
// directory (no invented numbers; same data as the college pages).
{
  const cutoffTable = (examName) => {
    const rows = COLLEGES_M
      .filter((c) => (c.exams || []).includes(examName))
      .sort((a, b) => (a.nirf == null ? Infinity : a.nirf) - (b.nirf == null ? Infinity : b.nirf))
      .slice(0, 40);
    if (!rows.length) return '';
    return `<h2>${esc(examName)} — Indicative College Cutoffs (2026)</h2>
      <table><thead><tr><th>College</th><th>NIRF</th><th>Indicative cutoff</th><th>Avg package</th></tr></thead><tbody>
      ${rows.map((c) => `<tr><td><a href="/colleges/${c.stateSlug}/${c.slug}">${esc(c.shortName)}</a> <span>(${esc(c.city)})</span></td><td>${c.nirf ? '#' + c.nirf : c.nirfBand ? esc(c.nirfBand) : '—'}</td><td>${esc(c.cutoff || '—')}</td><td>${esc(c.placementAvg || '—')}</td></tr>`).join('')}
      </tbody></table>`;
  };
  const examsForPrerender = ['JEE Main', 'JEE Advanced', 'MHT-CET', 'KCET', 'WBJEE'];
  const tables = examsForPrerender.map(cutoffTable).filter(Boolean).join('\n');
  ROUTES.push({
    path: '/cutoffs',
    title: 'Engineering College Cutoffs 2026 — JEE Main, NEET & State Exams | Syllab.in',
    description: 'Browse indicative closing cutoffs for top engineering colleges by exam — JEE Main, JEE Advanced, BITSAT, MHT-CET, KCET, WBJEE, EAPCET and more. Compare cutoff, NIRF rank and average package in one table. Free.',
    keywords: 'engineering college cutoff 2026, JEE Main cutoff colleges, JEE Advanced cutoff, NIT cutoff, MHT-CET cutoff, KCET cutoff, WBJEE cutoff, closing rank engineering colleges, college cutoff list India',
    bodyHtml: `
      <p class="speakable">Compare <strong>indicative closing cutoffs</strong> for top engineering colleges by admission exam. Pick your exam to see each college's cutoff, NIRF rank and average placement package in one place. All figures are indicative (2024) — always confirm on the official counselling website (JoSAA/CSAB for NITs &amp; IIITs, or your state authority).</p>
      ${tables}
      <p><a href="/career-predictor">Free rank &amp; college predictor →</a> · <a href="/colleges">All engineering colleges by state →</a></p>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Engineering College Cutoffs', url: `${SITE}/cutoffs`, inLanguage: 'en-IN', isAccessibleForFree: true },
  });
}

// Interactive periodic table — parse the element data (one object per line) so
// the prerendered page carries a full, crawlable 118-element table.
{
  let elements = [];
  try {
    const src = readFileSync(path.join(ROOT, 'src', 'data', 'periodicTable.ts'), 'utf8');
    const re = /\{\s*z:\s*(\d+),\s*symbol:\s*'([^']+)',\s*name:\s*'([^']+)',\s*mass:\s*'([^']+)',\s*category:\s*'([^']+)',\s*group:\s*([0-9]+|null),\s*period:\s*(\d+)/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      elements.push({ z: +m[1], symbol: m[2], name: m[3], mass: m[4], category: m[5].replace(/-/g, ' '), group: m[6] === 'null' ? '—' : m[6], period: +m[7] });
    }
  } catch { /* leave empty */ }
  const rows = elements.map((e) => `<tr><td>${e.z}</td><td><strong>${esc(e.symbol)}</strong></td><td>${esc(e.name)}</td><td>${esc(e.mass)}</td><td>${esc(e.category)}</td><td>${e.group}</td><td>${e.period}</td></tr>`).join('');
  ROUTES.push({
    path: '/periodic-table',
    title: 'Interactive Periodic Table of Elements (2026) — Free | Syllab.in',
    description: 'Free interactive periodic table with all 118 elements — tap any element for its atomic number, symbol, atomic mass, category, group, period, electron configuration and state. For CBSE, NCERT chemistry, JEE & NEET.',
    keywords: 'periodic table, interactive periodic table, periodic table of elements, 118 elements, atomic mass, electron configuration, periodic table for JEE NEET, chemistry periodic table free',
    bodyHtml: `
      <p class="speakable">A free <strong>interactive periodic table</strong> with all ${elements.length || 118} chemical elements. The table arranges elements by increasing atomic number into 18 vertical groups and 7 horizontal periods; elements in the same group share similar chemical properties. Tap any element to see its atomic mass, category, group, period, state and electron configuration — for CBSE/NCERT chemistry, JEE and NEET.</p>
      <h2>All 118 elements</h2>
      <table><thead><tr><th>Z</th><th>Symbol</th><th>Name</th><th>Atomic mass</th><th>Category</th><th>Group</th><th>Period</th></tr></thead><tbody>${rows}</tbody></table>
      <p>The lanthanides (elements 57–71) and actinides (89–103) make up the f-block shown as two separate rows. Make revision cards for tricky symbols with the free <a href="/flashcards">flashcards tool</a>, or convert units with the free <a href="/unit-converter">unit converter</a>.</p>`,
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Interactive Periodic Table', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/periodic-table`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'How many elements are in the periodic table?', acceptedAnswer: { '@type': 'Answer', text: 'There are 118 confirmed chemical elements, from hydrogen (atomic number 1) to oganesson (atomic number 118). The free Syllab interactive periodic table lets you tap any element to see its atomic mass, group, period, state and electron configuration.' } },
        { '@type': 'Question', name: 'Is the interactive periodic table free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — it is 100% free, works in your browser, and needs no sign-up.' } },
      ] },
    ],
  });
}

ROUTES.push({
  path: '/unit-converter',
  title: 'Free Unit Converter — Length, Mass, Temperature, Speed & More | Syllab.in',
  description: 'Free online unit converter for students: length, mass, time, area, volume, speed, energy, pressure, temperature (°C/°F/K) and digital storage. Instant, accurate, no signup — for physics, chemistry & maths.',
  keywords: 'unit converter, unit conversion, cm to inches, kg to pounds, celsius to fahrenheit, km/h to m/s, litre to ml, unit converter for physics, metric conversion India',
  bodyHtml: `
    <p class="speakable">A free, accurate <strong>unit converter</strong> for students — convert length, mass, temperature, speed, energy, pressure, area, volume, time and digital storage instantly in your browser. Perfect for physics and chemistry numericals, lab work and everyday maths.</p>
    <h2>Common conversions</h2>
    <table><thead><tr><th>From</th><th>To</th></tr></thead><tbody>
      <tr><td>1 inch</td><td>2.54 cm</td></tr>
      <tr><td>1 foot</td><td>30.48 cm</td></tr>
      <tr><td>1 mile</td><td>1.609 km</td></tr>
      <tr><td>1 pound (lb)</td><td>0.4536 kg</td></tr>
      <tr><td>0 °C</td><td>32 °F = 273.15 K</td></tr>
      <tr><td>100 °C</td><td>212 °F</td></tr>
      <tr><td>1 m/s</td><td>3.6 km/h</td></tr>
      <tr><td>1 kcal</td><td>4.184 kJ</td></tr>
      <tr><td>1 atm</td><td>101325 Pa = 1.01325 bar</td></tr>
      <tr><td>1 GB</td><td>1024 MB</td></tr>
    </tbody></table>
    <h2>How to convert units</h2>
    <p>To convert between units, multiply by the exact conversion factor. For temperature, use °F = °C × 9⁄5 + 32 and K = °C + 273.15. The converter above does it instantly for ten categories — free, no sign-up. Need marks maths too? Try the free <a href="/calculators">student calculators</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Unit Converter', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/unit-converter`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How do I convert Celsius to Fahrenheit?', acceptedAnswer: { '@type': 'Answer', text: 'Use °F = °C × 9/5 + 32. For example, 100 °C = 100 × 9/5 + 32 = 212 °F. The free Syllab unit converter does it instantly, along with Kelvin.' } },
      { '@type': 'Question', name: 'Is the unit converter free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — it is 100% free, runs in your browser, and needs no sign-up. It covers length, mass, temperature, speed, energy, pressure, area, volume, time and digital storage.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/answer-evaluator',
  title: 'Free AI Answer Checker & Evaluator | Syllab.in',
  description: 'Paste any exam question and your answer — our free AI examiner scores it out of your chosen marks and shows what you did well, what\'s missing, and the key points a full-marks answer needs. For CBSE boards, JEE & NEET.',
  keywords: 'AI answer checker, answer evaluator free, AI exam answer grader, check my answer, board exam answer feedback, model answer checker, AI marking, evaluate my answer online',
  bodyHtml: `
    <p class="speakable">Paste any exam <strong>question</strong> and your written <strong>answer</strong>, and our free AI examiner grades it the way a teacher would — a score out of your chosen marks, what you did well, what is missing or wrong, and the exact points a full-marks answer needs.</p>
    <h2>How the AI answer checker helps</h2>
    <p>Writing practice only improves you if someone tells you what to fix. The evaluator gives instant, examiner-style feedback on theory answers, definitions, derivations and long-form responses for CBSE boards, JEE and NEET — so you can rewrite and improve before the real exam.</p>
    <h2>How to use it</h2>
    <p>Type or paste the question, optionally set the maximum marks, paste your answer, and tap “Evaluate my answer”. Treat the AI feedback as a study aid and guidance, not the final board score. It is free and needs no sign-up. Pair it with free <a href="/pyqs">previous-year questions</a>, <a href="/mock-tests">mock tests</a> and the <a href="/study-planner">study planner</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab AI Answer Evaluator', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/answer-evaluator`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Can AI check my exam answer?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — paste the question and your answer into the free Syllab AI answer evaluator and it returns a score, what you did well, what is missing, and the key points a full-marks answer needs. It is a study aid, so treat the feedback as guidance rather than an official board score.' } },
      { '@type': 'Question', name: 'Is the AI answer checker free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, it is 100% free and needs no sign-up.' } },
    ] },
  ],
});

// Private, client-side File Tools (PDF + Image) — lead with the privacy angle.
ROUTES.push({
  path: '/pdf-tools',
  title: 'Free PDF Tools — Merge, Split, Watermark, PDF to Text | Syllab.in',
  description: 'Free private PDF tools that work 100% in your browser — your files never leave your device. Merge, split, rotate, delete pages, images to PDF, add a watermark, add page numbers, flatten forms and extract text. No upload, no signup.',
  keywords: 'free pdf tools, merge pdf, split pdf, watermark pdf, add page numbers pdf, pdf to text, flatten pdf, images to pdf, rotate pdf, delete pdf pages, ilovepdf free alternative, private pdf editor',
  bodyHtml: `
    <p class="speakable"><strong>Private, free PDF tools that never upload your files.</strong> Unlike iLovePDF or SmallPDF, every tool here runs entirely in your browser (using pdf-lib and pdf.js) — your documents stay on your device and are never sent to a server.</p>
    <h2>What you can do</h2>
    <ul>
      <li><strong>Merge PDF</strong> — combine several PDFs into one, in your chosen order.</li>
      <li><strong>Split PDF</strong> — pull out page ranges like 1-3,5,8- into a new PDF.</li>
      <li><strong>Rotate</strong> and <strong>delete pages</strong>.</li>
      <li><strong>Images → PDF</strong> — turn JPG/PNG photos into a single PDF.</li>
      <li><strong>Watermark</strong> and <strong>page numbers</strong>.</li>
      <li><strong>Flatten</strong> a filled PDF form, and <strong>PDF → Text</strong> extraction.</li>
    </ul>
    <p>100% free, no sign-up, no watermark added by us. Working with photos too? Use the free <a href="/image-tools">Image Tools</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab PDF Toolkit', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: `${SITE}/pdf-tools`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to merge PDF files for free', step: [
      { '@type': 'HowToStep', name: 'Open the Merge tool', text: 'Go to syllab.in/pdf-tools and select the Merge tool.' },
      { '@type': 'HowToStep', name: 'Choose your PDFs', text: 'Pick two or more PDF files in the order you want them combined.' },
      { '@type': 'HowToStep', name: 'Download', text: 'Click Merge and download the combined PDF — it is created privately in your browser.' },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are my PDFs uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Every PDF tool here runs entirely in your browser using pdf-lib and pdf.js — your files never leave your device and are never uploaded, unlike iLovePDF or SmallPDF.' } },
      { '@type': 'Question', name: 'Is it really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — 100% free, no sign-up, no watermark added by us, and no file-size paywall.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/image-tools',
  title: 'Free Image Tools — Compress, Resize, Convert, HEIC to JPG | Syllab.in',
  description: 'Free private image tools that work 100% in your browser — your files never leave your device. Compress, resize, convert (JPG/PNG/WebP), rotate, flip, crop and convert HEIC to JPG. No upload, no signup, no watermark.',
  keywords: 'compress image, resize image, convert image, jpg to png, png to webp, heic to jpg, rotate image, flip image, crop image, free image tools, image compressor online free, private image tools',
  bodyHtml: `
    <p class="speakable"><strong>Private, free image tools that never upload your photos.</strong> Every operation runs in your browser with the canvas API, so your images stay on your device.</p>
    <h2>What you can do</h2>
    <ul>
      <li><strong>Compress</strong> a photo to fit a form's size limit (adjustable quality, optional max width).</li>
      <li><strong>Resize</strong> to exact pixels (keep-aspect, never upscales).</li>
      <li><strong>Convert</strong> between JPG, PNG and WebP.</li>
      <li><strong>Rotate</strong>, <strong>flip</strong> and <strong>crop</strong> to 1:1, 4:5, 16:9, 4:3 or 3:2.</li>
      <li><strong>HEIC → JPG</strong> — turn an iPhone HEIC photo into a JPG any website accepts.</li>
    </ul>
    <p>100% free, no sign-up, no watermark. Need PDFs too? Use the free <a href="/pdf-tools">PDF Tools</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Image Toolkit', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', url: `${SITE}/image-tools`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to convert HEIC to JPG for free', step: [
      { '@type': 'HowToStep', name: 'Open the HEIC to JPG tool', text: 'Go to syllab.in/image-tools and select HEIC → JPG.' },
      { '@type': 'HowToStep', name: 'Choose your HEIC photo', text: 'Pick a .heic or .heif photo, usually from an iPhone.' },
      { '@type': 'HowToStep', name: 'Download the JPG', text: 'The photo is converted privately in your browser — download the JPG.' },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are my images uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Every image tool runs entirely in your browser using the canvas API — your photos never leave your device and are never uploaded.' } },
      { '@type': 'Question', name: 'How do I compress an image for a form upload?', acceptedAnswer: { '@type': 'Answer', text: 'Open the Compress tool, choose your image, lower the quality (and optionally set a max width), then download the smaller file — all privately in your browser.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/question-paper-generator',
  title: 'Free Question Paper Generator — Printable MCQ Practice Papers | Syllab.in',
  description: 'Make a printable MCQ practice paper in seconds. Pick a class, subject and chapters, choose how many questions, and print or save as PDF with an answer key. Free for teachers, parents and students — no signup.',
  keywords: 'question paper generator, mcq paper generator, practice paper maker, printable question paper, cbse mcq practice paper, test paper generator for teachers, worksheet generator',
  bodyHtml: `
    <p class="speakable"><strong>Generate a printable MCQ practice paper in seconds.</strong> Choose a class, subject and the chapters you have covered, set how many questions you want, and print the paper or save it as a PDF — with an answer key. Free, no signup.</p>
    <h2>How it works</h2>
    <ul>
      <li><strong>Pick class &amp; subject</strong>, then tick the chapters you have taught or studied.</li>
      <li><strong>Set the question count</strong> — questions are spread evenly across the chapters you select.</li>
      <li><strong>Print or save as PDF</strong> straight from your browser, and reveal the answer key when you need it.</li>
      <li><strong>Shuffle</strong> regenerates a fresh paper from the same chapters — handy for a retest or a second section.</li>
    </ul>
    <p>Every question comes from Syllab’s chapter-wise MCQ bank mapped to NCERT/CBSE chapters — nothing is auto-invented. This tool makes <strong>multiple-choice</strong> papers; for board-pattern long-answer practice use the free <a href="/sample-papers">sample papers</a> and <a href="/pyqs">previous-year questions</a>, or browse <a href="/mcqs">chapter-wise MCQs</a> and <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Question Paper Generator', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/question-paper-generator`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is the question paper generator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free, with no signup. Build a paper, print it or save it as a PDF from your browser.' } },
      { '@type': 'Question', name: 'Where do the questions come from?', acceptedAnswer: { '@type': 'Answer', text: 'Every question comes from Syllab’s chapter-wise MCQ bank, mapped to NCERT/CBSE chapters. This tool generates multiple-choice practice papers; it does not generate long-answer board-pattern questions.' } },
      { '@type': 'Question', name: 'Can teachers use it for class tests?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select the chapters you have taught, set the number of questions, print the paper for the class and use the answer key to mark it.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/compare',
  title: 'Compare Text & Documents Online — Free Diff Checker | Syllab.in',
  description: 'Free online tool to compare two texts or documents and highlight the differences. Paste text or load a PDF, Word (DOCX) or TXT file — everything runs privately in your browser, nothing is uploaded.',
  keywords: 'compare text online, text diff, diff checker, compare two documents, compare pdf free, compare word documents, find differences between two texts, online diff tool',
  bodyHtml: `
    <p class="speakable"><strong>A private diff checker for text, PDF and Word files.</strong> Paste two versions, or load a PDF, DOCX or TXT file into each side, and this tool highlights every added and removed line — all in your browser, nothing uploaded.</p>
    <h2>What you can do</h2>
    <ul>
      <li><strong>Compare two texts</strong> — paste an original and a changed version to spot every edit.</li>
      <li><strong>Compare documents</strong> — load a <strong>PDF</strong> (text extracted with pdf.js), a <strong>Word DOCX</strong> (via mammoth) or a <strong>TXT</strong> file.</li>
      <li><strong>Colour-coded result</strong> — additions in green, removals in red, with an added/removed count.</li>
    </ul>
    <p>100% free, no sign-up, nothing uploaded. Need to edit a PDF? Use the free <a href="/pdf-tools">PDF Tools</a>, jot ideas in the <a href="/notes">Notepad</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Compare (Diff Checker)', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: `${SITE}/compare`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to compare two documents for free', step: [
      { '@type': 'HowToStep', name: 'Add the first version', text: 'Paste text or load a PDF, DOCX or TXT file into the Original box.' },
      { '@type': 'HowToStep', name: 'Add the second version', text: 'Paste or load the changed version into the Changed box.' },
      { '@type': 'HowToStep', name: 'Compare', text: 'Click Compare to see every added and removed line, colour-coded — all privately in your browser.' },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are my documents uploaded when I compare them?', acceptedAnswer: { '@type': 'Answer', text: 'No. Both texts are compared entirely in your browser — PDF and DOCX text is extracted locally with pdf.js and mammoth. Your files never leave your device.' } },
      { '@type': 'Question', name: 'Can I compare a PDF with a Word document?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Load a PDF on one side and a DOCX (or paste text) on the other; the tool extracts the plain text from each and highlights the differences.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/notes',
  title: 'Free Online Notepad That Saves — Private Notes App | Syllab.in',
  description: 'A free online notepad that saves automatically in your browser. Write rich-text notes with bold, headings and lists, keep multiple notes, and they stay after you reload — no signup, nothing uploaded, works offline.',
  keywords: 'free online notepad, notepad that saves, notes app browser, save notes online, online notepad, rich text notepad, private notes, notepad no login',
  bodyHtml: `
    <p class="speakable"><strong>A free online notepad that actually saves.</strong> Type rich-text notes and they auto-save to your browser — still here when you come back, even offline. No login, nothing uploaded.</p>
    <h2>What you can do</h2>
    <ul>
      <li><strong>Rich text</strong> — bold, italic, underline, headings and bullet or numbered lists.</li>
      <li><strong>Many notes</strong> — keep a sidebar of notes and switch between them.</li>
      <li><strong>Auto-save</strong> — every keystroke is saved to your browser and survives a reload.</li>
      <li><strong>Private &amp; offline</strong> — notes stay on your device; clearing browser data removes them.</li>
    </ul>
    <p>100% free, no sign-up. Comparing two drafts? Use the free <a href="/compare">Compare</a> tool, turn a note into a PDF with <a href="/pdf-tools">PDF Tools</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Notepad', applicationCategory: 'Productivity', operatingSystem: 'Web', url: `${SITE}/notes`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Do my notes get saved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every note auto-saves to your browser as you type and stays after you reload or close the tab. Notes are stored on your device only — nothing is uploaded.' } },
      { '@type': 'Question', name: 'Is this notepad private?', acceptedAnswer: { '@type': 'Answer', text: 'Completely. Notes never leave your browser and there is no account or upload. Clearing your browser data will remove them, so copy anything important elsewhere too.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/everyday',
  title: 'Everyday Calculators — Unit Converter, Percentage, Age, BMI | Syllab.in',
  description: 'Free everyday calculators in one place: unit converter (length, weight, temperature, data, speed, area), percentage calculator, age calculator, date difference, BMI and a lorem ipsum generator. No signup.',
  keywords: 'unit converter, percentage calculator, age calculator, date difference calculator, bmi calculator, lorem ipsum generator, everyday calculators, online calculator free',
  bodyHtml: `
    <p class="speakable"><strong>Six everyday calculators in one free page.</strong> Convert units, work out percentages, calculate your exact age, count days between dates, find your BMI, and generate lorem ipsum — all free and in your browser.</p>
    <h2>What you can do</h2>
    <ul>
      <li><strong>Unit converter</strong> — length, weight, temperature, digital data, speed and area.</li>
      <li><strong>Percentage calculator</strong> — A% of B, A is what % of B, and % change.</li>
      <li><strong>Age calculator</strong> — exact years, months and days from a date of birth.</li>
      <li><strong>Date difference</strong> — days and weeks between two dates.</li>
      <li><strong>BMI calculator</strong> — from weight (kg) and height (cm), with the category band.</li>
      <li><strong>Lorem ipsum</strong> — placeholder words, sentences or paragraphs.</li>
    </ul>
    <p>100% free, no sign-up. For exam maths like CGPA and attendance, see the <a href="/calculators">Student Calculators</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Everyday Tools', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/everyday`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What can these everyday calculators do?', acceptedAnswer: { '@type': 'Answer', text: 'Convert units (length, weight, temperature, data, speed, area), work out percentages three ways, calculate exact age from a date of birth, find the number of days between two dates, compute BMI, and generate lorem ipsum placeholder text — all free and in your browser.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/roman-numerals',
  title: 'Roman Numeral Converter — Number ⇄ Roman (1–3999) Free | Syllab.in',
  description: 'Free two-way Roman numeral converter. Convert any number from 1 to 3999 into Roman numerals and Roman numerals back into numbers, live as you type, with validation.',
  keywords: 'roman numeral converter, number to roman numerals, roman numerals to number, roman numeral translator, convert roman numerals, 1 to 3999 roman numerals',
  bodyHtml: `
    <p class="speakable"><strong>A free two-way Roman numeral converter.</strong> Turn any number from 1 to 3999 into Roman numerals, and Roman numerals back into numbers — live as you type, with validation that rejects impossible forms.</p>
    <h2>The seven Roman numerals</h2>
    <ul>
      <li><strong>I</strong> = 1, <strong>V</strong> = 5, <strong>X</strong> = 10, <strong>L</strong> = 50, <strong>C</strong> = 100, <strong>D</strong> = 500, <strong>M</strong> = 1000.</li>
      <li>A smaller value before a larger one is subtracted: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.</li>
      <li>Otherwise values add up: MMXXIV = 2024. Standard Roman numerals run from 1 to 3999.</li>
    </ul>
    <p>100% free, in your browser. Browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Roman Numeral Converter', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/roman-numerals`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is 2024 in Roman numerals?', acceptedAnswer: { '@type': 'Answer', text: '2024 in Roman numerals is MMXXIV — MM (2000) + XX (20) + IV (4).' } },
      { '@type': 'Question', name: 'What is the largest number in Roman numerals?', acceptedAnswer: { '@type': 'Answer', text: 'Standard Roman numerals go up to 3999 (MMMCMXCIX). Larger numbers need a bar (vinculum) notation not used here.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/contrast-checker',
  title: 'Colour Contrast Checker (WCAG) — Free AA / AAA Test | Syllab.in',
  description: 'Free WCAG colour contrast checker. Pick a text and background colour to see the contrast ratio and whether it passes WCAG AA and AAA for normal and large text, with a live preview.',
  keywords: 'color contrast checker, wcag contrast checker, contrast ratio calculator, aa aaa contrast, accessibility contrast, text background contrast, colour contrast checker',
  bodyHtml: `
    <p class="speakable"><strong>A free WCAG colour contrast checker.</strong> Pick a text and background colour to get the exact contrast ratio and see whether it passes WCAG AA and AAA — with a live preview.</p>
    <h2>WCAG contrast thresholds</h2>
    <ul>
      <li><strong>AA normal text</strong> — at least 4.5:1.</li>
      <li><strong>AA large text</strong> (18px bold or 24px+) — at least 3:1.</li>
      <li><strong>AAA</strong> (enhanced) — at least 7:1.</li>
    </ul>
    <p>The ratio ranges from 1:1 (identical) to 21:1 (black on white). 100% free, in your browser. Browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Colour Contrast Checker', applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: `${SITE}/contrast-checker`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What contrast ratio does WCAG AA require?', acceptedAnswer: { '@type': 'Answer', text: 'WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. AAA requires 7:1.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/timestamp',
  title: 'Unix Timestamp Converter — Epoch to Date & Back (Free) | Syllab.in',
  description: 'Free Unix timestamp / epoch converter. Convert an epoch (seconds or milliseconds, auto-detected) to a human-readable UTC and ISO 8601 date, or a date back to epoch. Includes a Now button.',
  keywords: 'unix timestamp converter, epoch converter, epoch to date, timestamp to date, unix time, epoch time, iso 8601 converter, current unix timestamp',
  bodyHtml: `
    <p class="speakable"><strong>A free Unix timestamp (epoch) converter.</strong> Convert an epoch to a readable UTC and ISO 8601 date, or a date back to epoch seconds and milliseconds. Seconds vs milliseconds is auto-detected.</p>
    <h2>About Unix time</h2>
    <ul>
      <li>A Unix timestamp is the number of seconds since <strong>1 January 1970 UTC</strong>.</li>
      <li><strong>10-digit</strong> values are seconds; <strong>13-digit</strong> values are milliseconds.</li>
      <li>Output is shown in ISO 8601 and a readable UTC string; a Now button fills the current epoch.</li>
    </ul>
    <p>100% free, in your browser. Browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Unix Timestamp Converter', applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: `${SITE}/timestamp`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is a Unix timestamp?', acceptedAnswer: { '@type': 'Answer', text: 'A Unix timestamp (epoch) is the number of seconds since 1 January 1970 UTC. Millisecond timestamps have 13 digits instead of 10.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/csv-to-json',
  title: 'CSV to JSON Converter — Free & Private (In Your Browser) | Syllab.in',
  description: 'Free CSV to JSON converter that runs entirely in your browser — nothing uploaded. Paste CSV and get pretty-printed JSON, with quote-aware parsing that handles commas inside quoted fields.',
  keywords: 'csv to json, csv to json converter, convert csv to json, csv json online, csv parser, csv to json free, spreadsheet to json',
  bodyHtml: `
    <p class="speakable"><strong>A free, private CSV to JSON converter.</strong> Paste CSV and get pretty-printed JSON — the first row becomes the keys and each row an object. Nothing is uploaded.</p>
    <h2>How it works</h2>
    <ul>
      <li>The <strong>first row</strong> supplies the JSON keys; each following row becomes an object.</li>
      <li><strong>Quote-aware</strong> — commas inside "quoted, fields" and escaped "" quotes are handled correctly.</li>
      <li>Copy the JSON with one click. Everything runs in your browser.</li>
    </ul>
    <p>100% free, private. Browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab CSV to JSON Converter', applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: `${SITE}/csv-to-json`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is my CSV uploaded when I convert it?', acceptedAnswer: { '@type': 'Answer', text: 'No. The CSV is parsed entirely in your browser and never uploaded to a server — it stays private on your device.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/image-to-text',
  title: 'Image to Text (OCR) — Free & Private, In Your Browser | Syllab.in',
  description: 'Free image to text converter (OCR). Extract text from a photo, screenshot or scanned page instantly — everything runs in your browser with Tesseract, so your image is never uploaded. Copy or download the text.',
  keywords: 'image to text, photo to text, jpg to text, ocr online free, extract text from image, picture to text, screenshot to text, scanned document to text, handwriting to text',
  bodyHtml: `
    <p class="speakable"><strong>A free, private image-to-text (OCR) tool.</strong> Extract the text from a photo, screenshot or scanned page right in your browser with Tesseract OCR — your image is never uploaded.</p>
    <h2>What you can do</h2>
    <ul>
      <li><strong>Photo to text</strong> — read printed text from a picture of notes, a book page or a worksheet.</li>
      <li><strong>Screenshot to text</strong> — pull the words out of a screenshot.</li>
      <li><strong>Copy or download</strong> the extracted text as a .txt file.</li>
      <li><strong>100% private</strong> — the OCR engine and language data load once, then work offline; nothing is uploaded.</li>
    </ul>
    <p>Clear, high-contrast printed text works best. 100% free. Count the result with the <a href="/word-counter">Word Counter</a>, listen with <a href="/text-to-speech">Text-to-Speech</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Image to Text (OCR)', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/image-to-text`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to extract text from an image for free', step: [
      { '@type': 'HowToStep', name: 'Choose an image', text: 'Open syllab.in/image-to-text and select a photo or screenshot with text.' },
      { '@type': 'HowToStep', name: 'Extract text', text: 'Click Extract text — the OCR runs privately in your browser.' },
      { '@type': 'HowToStep', name: 'Copy or download', text: 'Copy the extracted text or download it as a .txt file.' },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is my image uploaded when I extract text?', acceptedAnswer: { '@type': 'Answer', text: 'No. OCR runs entirely in your browser using Tesseract (WebAssembly). Your image never leaves your device.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/word-counter',
  title: 'Word Counter — Free Words & Character Count Online | Syllab.in',
  description: 'Free online word counter and character counter. Paste your essay or assignment to instantly see word count, characters (with and without spaces), sentences, paragraphs and reading time.',
  keywords: 'word counter, character counter, word count online, count words, essay word count, character count, reading time calculator, free word counter',
  bodyHtml: `
    <p class="speakable"><strong>A fast, private word and character counter.</strong> Paste your essay or assignment to see the word count, character count, sentences, paragraphs and reading time — live, in your browser.</p>
    <h2>What it counts</h2>
    <ul>
      <li><strong>Words</strong> and <strong>characters</strong> (with and without spaces).</li>
      <li><strong>Sentences, paragraphs and lines.</strong></li>
      <li><strong>Reading time</strong> (~200 words/min) and <strong>speaking time</strong> (~130 words/min).</li>
    </ul>
    <p>Perfect for hitting essay word limits. Nothing is uploaded. 100% free. Listen to your text with <a href="/text-to-speech">Text-to-Speech</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Word Counter', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/word-counter`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How is reading time calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Reading time assumes an average of about 200 words per minute; speaking time assumes about 130 words per minute.' } },
    ] },
  ],
});
ROUTES.push({
  path: '/text-to-speech',
  title: 'Text to Speech — Free Online Voice Reader | Syllab.in',
  description: 'Free text-to-speech reader. Paste any text or your notes and have them read aloud in a natural voice — choose the voice, speed and pitch. Runs in your browser, nothing uploaded.',
  keywords: 'text to speech, tts, read text aloud, text to speech online free, voice reader, read notes aloud, text to voice',
  bodyHtml: `
    <p class="speakable"><strong>A free text-to-speech reader.</strong> Paste any text or your notes and have them read aloud with your browser's built-in voices — choose the voice, speed and pitch. Nothing is uploaded.</p>
    <h2>Why students use it</h2>
    <ul>
      <li><strong>Revise by listening</strong> — hear your notes while walking or resting your eyes.</li>
      <li><strong>Accessibility</strong> — a natural voice reads any pasted text aloud.</li>
      <li><strong>Adjustable</strong> — pick the voice and set the speed and pitch; play, pause and stop.</li>
    </ul>
    <p>Uses your device's built-in voices, so it works offline and privately. 100% free. Turn a photo of notes into text with <a href="/image-to-text">Image to Text</a>, or browse <a href="/tools">all free tools</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Text to Speech', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/text-to-speech`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is text-to-speech free and private?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. It uses your browser\\u2019s built-in voices, so your text is never uploaded and it works offline.' } },
    ] },
  ],
});

// Free student tools hub — links every tool (crawlable internal-link asset).
{
  const hubTools = [
    ['/calculators', '🧮', 'Student Calculators', 'Percentage, CGPA, attendance, SGPA, CBSE grade, CUET score & education-loan EMI.'],
    ['/unit-converter', '📐', 'Unit Converter', 'Length, mass, temperature, speed, energy, pressure, volume, area, time & data.'],
    ['/periodic-table', '⚛️', 'Periodic Table', 'All 118 elements — atomic mass, group, period, state & electron configuration.'],
    ['/pomodoro', '⏳', 'Pomodoro Timer', 'Focused 25-minute study sprints with breaks and a session counter.'],
    ['/marks-tracker', '📊', 'Marks Tracker', 'Overall percentage, CBSE grade, weakest subject and target planner.'],
    ['/study-planner', '🗓️', 'Study Planner & Syllabus Tracker', 'Tick chapters off as you finish them and get a timetable built from what is left.'],
    ['/flashcards', '🃏', 'Flashcards', 'Spaced-repetition revision decks (SM-2) you make yourself.'],
    ['/answer-evaluator', '✍️', 'AI Answer Evaluator', 'Examiner-style score and feedback on your written answers.'],
    ['/cutoffs', '🎯', 'College Cutoffs', 'Indicative closing cutoffs for top engineering colleges by exam.'],
    ['/career-predictor', '🔮', 'Career & College Predictor', 'JEE/NEET rank & college predictor and a career interest quiz.'],
    ['/pdf-tools', '📄', 'PDF Tools', 'Merge, split, watermark, page numbers, sign, images→PDF & PDF→text — private, in your browser.'],
    ['/image-tools', '🖼️', 'Image Tools', 'Compress, resize, convert, rotate, flip, crop & HEIC→JPG — private, in your browser.'],
    ['/question-paper-generator', '📝', 'Question Paper Generator', 'Pick chapters, generate a printable MCQ practice paper with an answer key — free for teachers.'],
    ['/compare', '🔍', 'Compare Text & Docs', 'Diff two texts or documents (PDF/DOCX/TXT) and highlight what changed — private.'],
    ['/notes', '📝', 'Notepad', 'A private rich-text notepad that auto-saves in your browser — multiple notes, offline.'],
    ['/everyday', '🧰', 'Everyday Tools', 'Unit converter, percentage, age, date difference, BMI & lorem ipsum — six in one.'],
    ['/roman-numerals', 'Ⅹ', 'Roman Numerals', 'Convert numbers to Roman numerals and back (1–3999), live, with validation.'],
    ['/contrast-checker', '🎨', 'Contrast Checker', 'WCAG colour contrast ratio with AA/AAA pass-fail and a live preview.'],
    ['/timestamp', '🕑', 'Timestamp Converter', 'Unix epoch ⇄ human date (seconds/ms auto-detected), ISO 8601 + UTC.'],
    ['/csv-to-json', '🔀', 'CSV → JSON', 'Paste CSV, get clean JSON — quote-aware, private, copy in one click.'],
    ['/image-to-text', '🔎', 'Image to Text (OCR)', 'Extract text from a photo, screenshot or scan — 100% in your browser, never uploaded.'],
    ['/word-counter', '🔢', 'Word Counter', 'Live word & character count, sentences, paragraphs and reading time.'],
    ['/text-to-speech', '🔊', 'Text to Speech', 'Have your notes read aloud — pick a voice, speed & pitch. Free, in your browser.'],
  ];
  ROUTES.push({
    path: '/tools',
    title: 'Free Student Tools — Calculators, Timers, Flashcards & More | Syllab.in',
    description: '10 free tools for students in one place: percentage & CGPA calculators, unit converter, interactive periodic table, Pomodoro timer, marks tracker, study planner, spaced-repetition flashcards, AI answer evaluator and college predictors. No signup.',
    keywords: 'free student tools, study tools online, student calculators, pomodoro timer, flashcards, study planner, periodic table, unit converter, marks tracker, college predictor, tools for CBSE JEE NEET students',
    bodyHtml: `
      <p class="speakable">Every Syllab <strong>free student tool</strong> in one place — calculators, converters, timers, flashcards, trackers and predictors. Everything runs in your browser, works on mobile and needs no sign-up.</p>
      <h2>All free tools</h2>
      <ul>${hubTools.map(([href, emoji, name, desc]) => `<li>${emoji} <a href="${href}"><strong>${esc(name)}</strong></a> — ${esc(desc)}</li>`).join('')}</ul>
      <p>Built for CBSE, NCERT, state boards, JEE and NEET students. Prefer guided learning? Explore free <a href="/syllabus">chapter lessons</a>, <a href="/mock-tests">mock tests</a> and <a href="/coding">coding courses</a>.</p>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Student Tools', url: `${SITE}/tools`, inLanguage: 'en-IN', isAccessibleForFree: true },
  });
}

ROUTES.push({
  path: '/marks-tracker',
  title: 'Free Marks & Percentage Tracker for Students | Syllab.in',
  description: 'Track your marks across subjects and see your overall percentage, CBSE grade, strongest and weakest subject instantly — plus the marks you still need in upcoming exams to hit your target. Free, saved on your device.',
  keywords: 'marks tracker, percentage tracker, GPA tracker, overall percentage calculator, marks needed for target, subject-wise marks, exam marks calculator, CBSE percentage tracker',
  bodyHtml: `
    <p class="speakable">A free <strong>marks &amp; percentage tracker</strong>: enter the marks you scored in each subject out of its maximum and instantly see your overall percentage, CBSE grade, and which subjects are your strongest and weakest — so you know exactly where to focus.</p>
    <h2>How the marks tracker works</h2>
    <p>Add a row per subject with your score and the maximum marks. The tracker sums them into an overall percentage, assigns the CBSE 9-point grade, and highlights your weakest subject. Enter the marks still to be assessed and a target percentage, and it tells you the exact score you need in the remaining exams to reach your goal. Your data is saved on your device — free, no sign-up.</p>
    <p>Pair it with the free <a href="/calculators">calculators</a> and the <a href="/study-planner">study planner</a> for a complete revision routine.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Marks Tracker', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/marks-tracker`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How do I calculate my overall percentage across subjects?', acceptedAnswer: { '@type': 'Answer', text: 'Add up the marks you scored in every subject and divide by the total maximum marks, then multiply by 100. The free Syllab marks tracker does it automatically and also shows your CBSE grade and weakest subject.' } },
      { '@type': 'Question', name: 'Is the marks tracker free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — it is 100% free, runs in your browser, needs no sign-up, and saves your subjects on your device.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/pomodoro',
  title: 'Free Pomodoro Timer for Studying — Focus Timer | Syllab.in',
  description: 'Free online Pomodoro timer to study with focus. 25-minute focus sessions with short and long breaks, session counter and a gentle chime. Customisable, saved on your device, no signup. Beat procrastination.',
  keywords: 'pomodoro timer, study timer, focus timer, pomodoro technique, 25 minute timer, online timer for studying, productivity timer free, beat procrastination',
  bodyHtml: `
    <p class="speakable">A free online <strong>Pomodoro timer</strong> to help you study with focus. Work in 25-minute focus sprints separated by short 5-minute breaks, with a longer 15-minute break after every four sprints — a simple, proven way to beat procrastination and study for longer without burning out.</p>
    <h2>How the Pomodoro technique works</h2>
    <p>Set the timer, work with full focus until it rings, then take a short break. After four focus sessions, take a longer break. Working against a ticking timer makes it far easier to start and blocks distractions. Adjust the focus and break lengths to suit you — the timer remembers your settings on your device.</p>
    <p>Pair it with the free <a href="/study-planner">study planner</a> and <a href="/flashcards">flashcards</a> for a complete study routine. Free, no sign-up.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Pomodoro Timer', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/pomodoro`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is the Pomodoro technique?', acceptedAnswer: { '@type': 'Answer', text: 'The Pomodoro technique is a study method where you work in focused 25-minute sessions separated by 5-minute breaks, with a longer break after every four sessions. It helps you start tasks, avoid distractions and study for longer without burning out.' } },
      { '@type': 'Question', name: 'Is the Pomodoro timer free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — it is 100% free, runs in your browser, needs no sign-up, and remembers your custom durations on your device.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/flashcards',
  title: 'Free Flashcards with Spaced Repetition | Syllab.in',
  description: 'Make free flashcards and study smarter with spaced repetition (SM-2). Create your own decks, flip cards, and let the app schedule each card for the perfect time to review. Saved on your device. For CBSE, JEE & NEET.',
  keywords: 'flashcards free, spaced repetition app, flashcard maker, study flashcards online, Anki alternative free, active recall, revision flashcards CBSE JEE NEET',
  bodyHtml: `
    <p class="speakable">Make free <strong>flashcards</strong> and study smarter with <strong>spaced repetition</strong>. Create your own decks, flip each card, and rate how well you knew it — the app then schedules every card for the ideal day to review it again. Everything is saved on your own device; no sign-up.</p>
    <h2>Why spaced-repetition flashcards work</h2>
    <p>Flashcards use <strong>active recall</strong> — retrieving an answer from memory builds far stronger recall than re-reading notes. <strong>Spaced repetition</strong> then shows each card at growing intervals (1 day, 6 days, then longer), reviewing weak cards more often and easy ones less. It is the most efficient way to memorise formulas, definitions, dates and vocabulary for CBSE boards, JEE and NEET.</p>
    <h2>How to use it</h2>
    <p>Add cards with a question on the front and the answer on the back, tap “Study now”, reveal each answer, then rate it <em>Again</em>, <em>Hard</em>, <em>Good</em> or <em>Easy</em>. The proven SM-2 scheduler picks the next review date. Pair your decks with the free <a href="/study-planner">study planner</a> and <a href="/mock-tests">mock tests</a>.</p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Flashcards', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/flashcards`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is spaced repetition?', acceptedAnswer: { '@type': 'Answer', text: 'Spaced repetition is a study technique that shows you each flashcard at increasing time intervals — soon after learning, then after a few days, then longer — so you review weak cards often and strong cards rarely. It is the most efficient way to move facts into long-term memory.' } },
      { '@type': 'Question', name: 'Are the flashcards free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — Syllab flashcards are 100% free, need no sign-up, and your decks are saved on your own device. The scheduler uses the proven SM-2 spaced-repetition algorithm.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/study-planner',
  title: 'Free Study Planner & CBSE Syllabus Tracker (Chapter-wise) | Syllab.in',
  description: 'Tick off chapters as you finish them and get a free day-by-day timetable built from the syllabus you have LEFT — not a generic schedule. Chapter-wise tracking for CBSE Class 1–12, plus learn → revise → mock phases you can print.',
  keywords: 'syllabus tracker, cbse syllabus tracker, chapter wise syllabus tracker class 10, syllabus completion tracker, study planner, revision timetable generator, study timetable maker free, exam study plan, board exam timetable, JEE NEET study plan',
  bodyHtml: `
    <p class="speakable">Track your <strong>syllabus chapter by chapter</strong> and build a free <strong>study timetable</strong> around what is actually left. Tick chapters off as you finish them, see a completion percentage for every subject, and get a day-by-day plan you can save on your device or print as a PDF.</p>
    <h2>Syllabus tracker: plan around what's actually left</h2>
    <p>Pick your class and subjects to load the real NCERT chapter list, then tick each chapter as you complete it. You get a live completion percentage per subject — so it is obvious at a glance when Physics is 80% done while Chemistry is still at 30%. The timetable is then built from the chapters you have <strong>not</strong> covered, naming each one on the day it is scheduled and alternating between subjects so no subject is left until the final week. Once the syllabus is complete the whole plan becomes revision and mock tests.</p>
    <h2>How the study planner works</h2>
    <p>The planner splits the time until your exam into three phases: a <strong>learn phase</strong> that spreads every subject evenly across the days, a <strong>revise phase</strong> in the final quarter that cycles quickly through all subjects, and a <strong>mock-test day</strong> right before the exam. It works for CBSE board exams, JEE, NEET and college semesters alike. Prefer something quicker? The <strong>Quick plan</strong> mode still takes just a list of subject names.</p>
    <h2>Why a study timetable helps</h2>
    <p>A written plan removes daily decision fatigue, guarantees every subject gets covered before the exam, and builds in revision and mock practice — the two things students most often run out of time for. Pair your plan with free <a href="/mock-tests">mock tests</a> and <a href="/pyqs">previous-year questions</a>.</p>
    <p><a href="/calculators">Free student calculators →</a> · <a href="/mock-tests">Free mock tests →</a></p>`,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Study Planner', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/study-planner`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How do I make a study timetable for board exams?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your exam date, your subjects and how many hours a day you can study. The free Syllab study planner builds a day-by-day plan that spreads subjects evenly, adds a revision phase near the end, and finishes with a mock-test day.' } },
      { '@type': 'Question', name: 'Is the study planner free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — it is 100% free, needs no sign-up, runs entirely in your browser, and your plan is saved on your own device. You can print it or save it as a PDF.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/calculators',
  title: 'Free Student Calculators — Percentage, CGPA & Attendance | Syllab.in',
  description: 'Free online calculators for Indian students: marks-to-percentage, CGPA to percentage (CBSE 9.5 rule) and back, and an attendance "can I bunk?" calculator. Instant, no signup, no ads.',
  keywords: 'percentage calculator, CGPA to percentage calculator, CBSE CGPA calculator, attendance calculator, can I bunk calculator, marks percentage calculator India, student calculators free',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Student Calculators', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/calculators`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How do I convert CGPA to percentage?', acceptedAnswer: { '@type': 'Answer', text: 'Under the CBSE rule, Percentage = CGPA × 9.5. For example, a 9.2 CGPA equals 87.4%. Use the free Syllab calculator to convert instantly both ways.' } },
      { '@type': 'Question', name: 'How many classes can I skip and keep 75% attendance?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your attended and total classes with a 75% target in the attendance calculator — it instantly shows how many classes you can skip while staying at or above your target.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/worksheets',
  title: 'Free Printable Worksheets — Letters, Phonics, Maths, Reading & More (PDF) | Syllab.in',
  description: 'Download 100+ free printable worksheets for Pre-KG to Class 2 kids: letters & tracing, phonics & beginning sounds, vocabulary & sight words, reading comprehension, early writing, numbers & counting, simple maths, shapes, colours, science and social-emotional learning — print or save as PDF. Free, watermarked, made-in-India.',
  keywords: 'free printable worksheets, alphabet tracing worksheets pdf, phonics worksheets, sight words worksheet, reading comprehension worksheets kids, addition subtraction worksheets, number tracing worksheet, counting worksheets preschool, shapes worksheet kids, colors worksheet, science worksheets kindergarten, social emotional worksheets, kindergarten worksheets free download India, pre-kg worksheets pdf, LKG UKG worksheets',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Printable Worksheets', url: `${SITE}/worksheets`, inLanguage: 'en-IN', isAccessibleForFree: true },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are the worksheets free to download?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — every worksheet is free to print or save as PDF. No signup, no payment. Each carries a small syllab.in watermark.' } },
      { '@type': 'Question', name: 'What worksheets are available?', acceptedAnswer: { '@type': 'Answer', text: 'Over 100 worksheets across 12 categories: Letters, Phonics, Vocabulary, Reading, Writing, Numbers & Counting, Simple Math, Shapes, Colors, Science, Social & Emotional and Other Activities — designed for Pre-KG to Class 2. More are added regularly.' } },
    ] },
  ],
});

// ─── Per-article blog pages (/updates/:slug) — each becomes an indexable page ─
for (const a of getBlogArticles()) {
  const desc = a.summary.length > 165 ? a.summary.slice(0, 162).trim() + '…' : a.summary;
  const today = new Date().toISOString().split('T')[0];
  ROUTES.push({
    path: `/updates/${a.slug}`,
    title: `${a.title} | Syllab.in`,
    description: desc,
    // Thin auto-posts (< THIN_WORD_MIN words) ship `noindex, follow`: still
    // readable and still passing link equity, but kept out of the index so ~48
    // near-empty posts don't drag the quality signal for the other ~4,000 real
    // pages. buildHeadBlock() maps `noindex` to 'noindex,follow'.
    noindex: isThinArticle(a),
    keywords: `${a.title}, Syllab blog, free study guide India, CBSE JEE NEET tips, Indian students`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: desc,
      url: `${SITE}/updates/${a.slug}`,
      image: `${SITE}/og-image.png`,
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      author: { '@type': 'Organization', name: 'Syllab.in', url: SITE },
      publisher: { '@type': 'Organization', name: 'Syllab.in', logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` } },
      datePublished: today,
      dateModified: today,
    },
  });
}

// ─── Coding tutorial pages (/coding/:lang and /coding/:lang/:topic) ──────────
// These were flagged "Duplicate without user-selected canonical" because the SPA
// shell served the home canonical. Prerendering each gives a SELF-referencing
// canonical (buildHeadBlock uses SITE+route.path) + unique title → fixes the
// duplicate error and makes them indexable long-tail pages.
//
// NEW: Extract rich topic content (title, theory, syntax) per topic so each
// page's body is genuinely unique (~30–40% unique text, not 71% duplicate).

/**
 * Parse a TS file of TutorialTopic objects to extract their content.
 * Returns: { topicId: { title, theoryText, syntaxText }, ... }
 */
function extractTopicContent(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const topics = {};

    // Find all topic objects: match from id: 'xxx' to the closing }
    // Simple regex approach: look for patterns like:
    // { id: 'ai-intro', category: ..., title: 'XXX', theory: [...]
    // `category` is captured optionally so the course-hub page can group the
    // syllabus under real headings ("Foundations", "Sorting & Searching") rather
    // than one flat list. Optional because not every tutorial file sets it, and
    // a topic without a category must still be found — losing the topic
    // entirely would silently shrink the lesson list.
    const topicMatches = [...content.matchAll(
      /\{\s*id:\s*['"]([a-z0-9-]+)['"](?:[^}]*?category:\s*['"]([^'"]*)['"])?[^}]*?title:\s*['"]([^'"]*)['"]/gm
    )];

    for (const match of topicMatches) {
      const topicId = match[1];
      const category = match[2] || '';
      const title = match[3];
      topics[topicId] = { title, category, theoryText: '', syntaxText: '' };
    }

    // For each topic, extract ALL paragraphs of its theory array (joined) — the
    // real, unique content. Tutorial files quote theory paragraphs differently
    // (python/sql use backticks, java/js/html use single quotes), so match all
    // three string styles. The old regex required a ≥200-char backtick FIRST
    // paragraph, so most topics extracted nothing and the page fell back to
    // identical boilerplate (thin + duplicate across every coding page).
    const STR = String.raw`(?:\`[^\`]+\`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")`;
    const theoryPattern = new RegExp(String.raw`id:\s*['"\`]([a-z0-9-]+)['"\`][\s\S]*?theory:\s*\[((?:\s*${STR}\s*,?)+)`, 'g');
    const tokPattern = new RegExp(STR, 'g');
    for (const match of content.matchAll(theoryPattern)) {
      const topicId = match[1];
      if (topics[topicId] && !topics[topicId].theoryText) {
        const paras = [...match[2].matchAll(tokPattern)]
          .map((p) => p[0].slice(1, -1).replace(/\\(['"\\])/g, '$1').replace(/\s+/g, ' ').trim())
          .filter(Boolean);
        if (paras.length) topics[topicId].theoryText = paras.join('\n\n').slice(0, 1600);
      }
    }

    // Extract the syntax / code example.
    //
    // The previous pattern was `id:\s*['"]([a-z0-9-]+)['"][^}]*?syntax:\s*`([^`]{50,300})`
    // and it dropped most of them. Three separate faults, all silent:
    //   1. `['"]` did not match BACKTICK-quoted ids, though the theory pattern
    //      above already handles all three quote styles.
    //   2. `[^}]*?` stops at the first '}' between the id and the syntax key —
    //      and a topic object almost always contains one before it (a nested
    //      object, or an escaped brace inside the theory strings).
    //   3. `{50,300}` quietly discarded any example shorter than 50 characters
    //      or longer than 300. A three-line snippet is still the point of a
    //      coding page.
    // Result: 497 topics carry syntax in the data, but only 349 of 873 built
    // pages contained a <pre> block. A tutorial page with no code on it.
    //
    // The lookahead is what keeps this honest: the gap between the id and its
    // syntax may contain anything EXCEPT another `id:` declaration, so a topic
    // can never borrow the next topic's code example.
    const NOT_NEXT_ID = String.raw`(?:(?!id:\s*['"\`])[\s\S])*?`;
    const syntaxPattern = new RegExp(
      String.raw`id:\s*['"\`]([a-z0-9-]+)['"\`]${NOT_NEXT_ID}syntax:\s*(\`[^\`]+\`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")`,
      'g',
    );
    for (const match of content.matchAll(syntaxPattern)) {
      const topicId = match[1];
      if (topics[topicId] && !topics[topicId].syntaxText) {
        const raw = match[2].slice(1, -1).replace(/\\(['"\\])/g, '$1').replace(/\\n/g, '\n');
        if (raw.trim()) topics[topicId].syntaxText = raw.slice(0, 1200);
      }
    }

    return topics;
  } catch (e) {
    console.warn(`⚠️  Failed to extract topics from ${filePath}: ${e.message}`);
    return {};
  }
}

function readCodingTopics() {
  try {
    const idx = readFileSync(path.join(ROOT, 'src', 'data', 'tutorials', 'index.ts'), 'utf8');
    const languages = [...new Set([...idx.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/gi)].map(m => m[1]))];
    // 'ai-agents' topics live in ai-agents.ts (merged into ai-learning at runtime),
    // so they aren't an id: in index.ts. Register the lang so /coding/ai-agents/:topic
    // pages get prerendered with a self-canonical (fixes GSC "alternate page with
    // proper canonical tag" where they fell back to the homepage canonical).
    if (!languages.includes('ai-agents')) languages.push('ai-agents');
    const fileMap = { 'ai-learning': 'aiLearning.ts', 'data-analytics': 'dataAnalytics.ts', 'app-dev': 'app-dev.ts', 'game-dev': 'game-dev.ts' };
    const topicsByLang = {};
    const contentByLang = {};

    for (const lang of languages) {
      try {
        const filePath = path.join(ROOT, 'src', 'data', 'tutorials', fileMap[lang] || `${lang}.ts`);
        const content = readFileSync(filePath, 'utf8');
        topicsByLang[lang] = [...content.matchAll(/^\s*id:\s*['"]([a-z0-9-]+)['"]/gm)].map(m => m[1]);
        // Also extract rich content for each topic
        contentByLang[lang] = extractTopicContent(filePath);
      } catch {
        topicsByLang[lang] = [];
        contentByLang[lang] = {};
      }
    }
    return { languages, topicsByLang, contentByLang };
  } catch { return { languages: [], topicsByLang: {}, contentByLang: {} }; }
}
/**
 * Body for a /coding/<language> course hub.
 *
 * Builds a real syllabus page out of content the topic pages already read:
 * every lesson grouped under its category, each with the first sentence of its
 * own theory, plus a lesson count and links into each lesson. Nothing here is
 * invented or padded — if a topic has no extracted theory it contributes only
 * its title, and if the course has no topics at all this returns '' so the
 * route keeps its previous (empty) body rather than gaining a hollow shell.
 */
function codingHubBody(lang, label, topicIds, contentMap) {
  const topics = topicIds
    .map((id) => ({ id, ...(contentMap[id] || {}) }))
    .filter((t) => t.title);
  if (topics.length < 2) return '';

  // First sentence of the theory — a genuine summary, not a truncation to a
  // fixed character count that would cut mid-word.
  const firstSentence = (text) => {
    const s = String(text || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    const m = s.match(/^(.{40,240}?[.!?])(\s|$)/);
    return m ? m[1] : (s.length > 240 ? `${s.slice(0, 237).replace(/\s\S*$/, '')}…` : s);
  };

  const byCategory = new Map();
  for (const t of topics) {
    const cat = t.category || 'Course Lessons';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(t);
  }

  const sections = [...byCategory.entries()].map(([cat, list]) => {
    const items = list.map((t) => {
      const summary = firstSentence(t.theoryText);
      return `<li><a href="/coding/${lang}/${t.id}"><strong>${esc(t.title)}</strong></a>${summary ? ` — ${esc(summary)}` : ''}</li>`;
    }).join('');
    return `<h3>${esc(cat)}</h3><ul>${items}</ul>`;
  }).join('');

  const withTheory = topics.filter((t) => t.theoryText).length;

  return `
    <p class="speakable"><strong>Free ${esc(label)} course:</strong> ${topics.length} lessons, from the basics through to the advanced topics interviewers actually ask about. Every lesson is free, needs no sign-up, and runs in your browser with an editor and instant AI feedback.</p>
    <h2>${esc(label)} Course Syllabus — ${topics.length} Lessons</h2>
    <p>Work through them in order, or jump to the topic you need. ${withTheory} lessons include worked explanations and runnable examples.</p>
    ${sections}
    <h2>Who this ${esc(label)} course is for</h2>
    <p>School and college students in India starting from zero, and anyone revising ${esc(label)} for placements, board practicals or a project. There is no prerequisite beyond being able to type — the first lessons assume no programming background at all.</p>
    <h2>How to study this course</h2>
    <ol>
      <li>Read the lesson, then run the example in the built-in editor before moving on — reading code is not the same as writing it.</li>
      <li>Try the practice task at the end of each lesson. Getting it wrong and fixing it is where the learning happens.</li>
      <li>When you are stuck, ask the free AI Tutor to explain that specific line rather than skipping ahead.</li>
    </ol>
    ${aiCta}`;
}

const titleCase = (slug) => slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const langLabel = (l) => ({ 'ai-learning': 'AI & ML', 'data-analytics': 'Data Analytics', 'data-mining': 'Data Mining', 'app-dev': 'App Development', 'game-dev': 'Game Development', 'git-github': 'Git & GitHub', 'prompt-engineering': 'Prompt Engineering', 'cloud-computing': 'Cloud Computing', 'cybersecurity': 'Cyber Security', 'ai-agents': 'AI Agents' }[l] || titleCase(l));
const existingCoding = new Set(ROUTES.map(r => r.path));

/**
 * /coding topic pages that keep their index tag, as `lang/topic`.
 *
 * Derived from the 2026-08-13 GSC export: these are the only topic-level URLs
 * in the whole /coding tree that registered any impressions at all. They convert
 * at zero and sit around position 50-58, so they are not winners — they are
 * simply the pages with DATA, and this site has already had one near-miss from
 * pruning a family on a sample rather than on the export. Re-check against a
 * fresh export before adding or removing anything here.
 */
const CODING_KEEP_INDEXED = new Set([
  'sql/sql-string-functions', // 86 impressions, position 50.27
  'git-github/git-status',    // 74 impressions, position 57.86
]);

const { languages: CODE_LANGS, topicsByLang: CODE_TOPICS, contentByLang: CODE_CONTENT } = readCodingTopics();
for (const lang of CODE_LANGS) {
  const L = langLabel(lang);
  const langPath = `/coding/${lang}`;
  // Course-hub body. These 34 pages were the THINNEST cluster on the site: a
  // content audit measured /coding/dsa at 194 crawl-time words and
  // /coding/python at 181, while the individual topic pages under them carried
  // 263-366. The hub emitted a title and a meta description and nothing else,
  // even though ~2,000 words of curriculum sit in the same data the topic pages
  // already read. A near-empty hub above rich children is the worst shape for
  // this: the hub is the page that ranks for "learn python free", and it is the
  // page Google was given least reason to.
  //
  // So the hub now carries the actual syllabus — every topic title grouped by
  // its category, with the opening line of each topic's theory. That is real,
  // unique text, not a keyword list, and it links to each lesson.
  const hubBody = codingHubBody(lang, L, CODE_TOPICS[lang] || [], CODE_CONTENT[lang] || {});
  const existingHub = ROUTES.find((r) => r.path === langPath);
  if (process.env.DEBUG_CODING_HUB) {
    console.log(`[hub] ${langPath} found=${!!existingHub} hadBody=${!!(existingHub && existingHub.bodyHtml)} newBody=${hubBody.length}`);
  }
  if (existingHub) {
    if (!existingHub.bodyHtml && hubBody) existingHub.bodyHtml = hubBody;
  } else {
    ROUTES.push({
      path: langPath,
      title: `Learn ${L} Free — Tutorials & Practice for Students | Syllab.in`,
      description: `Free ${L} tutorials, examples and coding practice for Indian students. Beginner to advanced, with an in-browser editor and AI feedback — no cost.`,
      keywords: `learn ${L} free, ${L} tutorial India, ${L} for students, ${L} coding practice free`,
      ...(hubBody ? { bodyHtml: hubBody } : {}),
    });
  }
  for (const topic of (CODE_TOPICS[lang] || [])) {
    ROUTES.push({
      path: `/coding/${lang}/${topic}`,
      title: `${titleCase(topic)} — Free ${L} Tutorial | Syllab.in`,
      description: `Learn ${titleCase(topic)} in ${L} with a free, beginner-friendly tutorial, examples and practice for Indian students on Syllab.in.`,
      keywords: `${titleCase(topic)}, ${L} ${titleCase(topic)}, learn ${L} free, ${L} tutorial`,
      topicContent: CODE_CONTENT[lang] && CODE_CONTENT[lang][topic],
      // Post-March-2026 thin-content policy. The 2026-08-13 GSC export shows the
      // whole /coding topic tail returning 293 impressions and ZERO clicks at an
      // average position around 55 — page five or six, from ~900 indexed URLs
      // averaging 245 words with only 99 words of source theory per topic.
      // Pages that rank nowhere and convert nothing still count towards how
      // Google judges the domain, so the tail ships `noindex, follow`: it keeps
      // passing link equity and stays fully readable to anyone who lands on it.
      //
      // The LANGUAGE HUBS (/coding/<lang>) stay indexed — they are the
      // consolidation target, and two of them are the only /coding URLs in the
      // export with meaningful impressions.
      //
      // CODING_KEEP_INDEXED protects any topic page that HAS data. Session 9
      // nearly pruned this site's best-performing family on a 4-page sample;
      // nothing here is pruned on a hunch.
      noindex: !CODING_KEEP_INDEXED.has(`${lang}/${topic}`),
    });
  }
}

// ─── Cross-cluster internal-link mesh ────────────────────────────────────────
// Chapter-level pages across clusters (NCERT solutions, MCQs, PYQs, revision
// notes, solved examples, formula sheets, important questions) link to EACH
// OTHER when they cover the same class + chapter. Join key: normalized
// class|subject-family|chapter — the family check lets Science↔Physics match
// (the same chapter drifts between those labels across clusters) while keeping
// e.g. Class 11 Maths "Statistics" apart from Economics "Statistics".
const MESH_BY_PATH = new Map();
{
  const normChap = (s) => String(s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const normCls = (s) => String(s || '').replace(/class\s*/i, '').trim();
  const famOf = (subj) => {
    const s = String(subj || '').toLowerCase();
    if (/math/.test(s)) return 'maths';
    if (/(science|physics|chemistry|biology)/.test(s)) return 'science';
    if (/(social|history|geograph|civics|polit|econom)/.test(s)) return 'social';
    if (/english/.test(s)) return 'english';
    return s || 'other';
  };
  const entries = [];
  const add = (path, label, cls, subj, chap) => {
    const c = normCls(cls), ch = normChap(chap);
    if (!c || !ch) return;
    entries.push({ path, label, key: `${c}|${famOf(subj)}|${ch}` });
  };
  for (const c of NCERT_CHAPTERS) add(`/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`, 'NCERT Solutions', c.classLevel, c.subject, c.chapSlug);
  for (const p of IQ_PILOT) add(`/important-questions/class-${p.cls}/${p.subjSlug}/${p.chapSlug}`, 'Important Questions', p.cls, p.subjName, p.chapSlug);
  for (const x of getChapterMcqs(ROOT)) add(`/mcqs/${x.slug}`, 'MCQ Practice', x.classLevel, x.subject, x.chapter);
  for (const x of PYQ_ALL) add(`/pyqs/${x.slug}`, 'Previous Year Questions', x.classLevel, x.subject, x.chapter);
  for (const x of getRevisionNotes(ROOT)) add(`/revision-notes/${x.slug}`, 'Revision Notes', x.classLevel, x.subject, x.chapter);
  for (const x of getSolvedExamples(ROOT)) add(`/solved-examples/${x.slug}`, 'Solved Examples', x.classLevel, x.subject, x.chapter);
  // State-board solutions — our best-converting cluster (6.2% CTR); cross-link so its
  // visitors reach the matching NCERT solutions, MCQs, PYQs and important questions.
  for (const x of SB_CHAPTERS) add(`/state-board-solutions/${x.boardSlug}/class-${x.classLevel}/${x.subjSlug}/${x.chapSlug}`, 'State Board Solutions', x.classLevel, x.subject, x.chapSlug);
  // Chapter-level formula sheets: chapter is only encoded in the slug
  // (class-10-maths-quadratic-equations); subject-level sheets don't match and are skipped.
  for (const s of FORMULA_SHEETS_DATA) {
    const m = s.slug.match(/^class-(\d+)-([a-z]+)-(.+?)(?:-formulas)?$/);
    if (m && m[3] && m[3] !== 'formulas') add(`/formula-sheets/${s.slug}`, 'Formula Sheet', m[1], s.subject || m[2], m[3]);
  }
  const byKey = new Map();
  for (const e of entries) (byKey.get(e.key) || byKey.set(e.key, []).get(e.key)).push(e);
  let meshed = 0;
  for (const group of byKey.values()) {
    if (group.length < 2) continue;
    for (const e of group) {
      // One link per resource TYPE (label) — some clusters have duplicate
      // slug variants for the same chapter; show each type once.
      const seenLabel = new Set();
      const others = group.filter((o) => {
        if (o.path === e.path || seenLabel.has(o.label)) return false;
        seenLabel.add(o.label);
        return true;
      }).slice(0, 6);
      if (!others.length) continue;
      MESH_BY_PATH.set(e.path, `
        <div style="margin-top: 1.5rem; padding: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
          <h2 style="font-size: 1.05rem; margin: 0 0 0.5rem 0; color: #166534;">More free resources for this chapter</h2>
          <ul style="margin: 0; padding-left: 1.25rem; line-height: 1.9;">
            ${others.map((o) => `<li><a href="${o.path}" style="color: #0066cc; text-decoration: none; font-weight: 600;">${o.label} →</a></li>`).join('')}
          </ul>
        </div>`);
      meshed++;
    }
  }
  console.log(`🔗 Internal-link mesh: ${meshed} chapter pages cross-linked (${byKey.size} chapter keys).`);
}

// ─── HTML injection helpers ──────────────────────────────────────────────────

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Load NCERT solutions data once (for per-chapter rich content)
let ncertDataCache = null;
function getNcertData() {
  if (!ncertDataCache) {
    try {
      const data = readFileSync(path.join(ROOT, 'public', 'data', 'ncert-solutions.json'), 'utf8');
      ncertDataCache = JSON.parse(data);
    } catch (e) {
      ncertDataCache = {};
    }
  }
  return ncertDataCache;
}

/**
 * Build unique, crawler-visible HTML body content for prerendered pages.
 * Injected into <div id="root">...content...</div> so crawlers see semantic HTML
 * without JavaScript. React's createRoot().render() will replace this on mount.
 */
function buildBodyContent(route) {
  // Common components for all routes
  const stripTitle = (t) => t.replace(/\s*[\|—]\s*Syllab\.in.*$/i, '').trim();
  const title = stripTitle(route.title);
  const desc = route.description;

  // E-E-A-T: publication and freshness dates
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const formattedDate = new Date(today).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Breadcrumb nav
  const pathParts = route.path.split('/').filter(Boolean);
  const breadcrumb = `
    <nav style="margin-bottom: 2rem; font-size: 0.95rem;">
      <a href="/" style="color: #0066cc; text-decoration: none;">Home</a>
      ${pathParts.map((p, i) => {
        const url = '/' + pathParts.slice(0, i + 1).join('/');
        const label = p.replace(/^class-/, 'Class ').replace(/-/g, ' ');
        return ` › <a href="${esc(url)}" style="color: #0066cc; text-decoration: none;">${esc(label)}</a>`;
      }).join('')}
    </nav>
  `;

  // Trust badge (#2) — the "free / no login" edge competitors that gate content
  // (Vedantu, BYJU'S, Toppr) literally cannot match. Visible + high-CTR.
  const trustBadge = `
    <div style="margin: 0 0 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; font-size: 0.8rem; font-weight: 700;">
      <span style="background:#dcfce7;color:#166534;padding:4px 10px;border-radius:999px;">✓ 100% Free</span>
      <span style="background:#dbeafe;color:#1e40af;padding:4px 10px;border-radius:999px;">✓ No Login Needed</span>
      <span style="background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:999px;">✓ NCERT / CBSE Aligned</span>
      <span style="background:#f3e8ff;color:#6b21a8;padding:4px 10px;border-radius:999px;">✓ Download as PDF</span>
    </div>`;

  // E-E-A-T: TL;DR summary + reviewer byline (author authority + freshness signals)
  const tldrBlock = `
    ${trustBadge}
    <div style="margin: 1.5rem 0; padding: 1rem; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
      <p class="speakable" style="margin: 0; font-weight: 600; color: #2e7d32; font-size: 0.95rem;"><strong>TL;DR:</strong> ${esc(desc.length > 150 ? desc.slice(0, 150).trim() + '…' : desc)}</p>
    </div>
    <p style="margin: 1rem 0; font-size: 0.85rem; color: #666;">Written &amp; reviewed by the <strong>Syllab.in Academic Team</strong> (CBSE/NCERT subject experts) · Updated <time datetime="${today}">${formattedDate}</time></p>
    <div style="margin: 1rem 0; padding: 0.85rem 1rem; background:#eef2ff; border:1px solid #c7d2fe; border-radius:8px; font-size:0.9rem;">
      🤖 <strong>Stuck on any question?</strong> Ask <a href="/ai-tutor" style="color:#4f46e5;font-weight:700;text-decoration:none;">Syllab's free AI Tutor</a> for a step-by-step explanation — instant, unlimited, no login.
    </div>`;

  // Quick nav to main sections (helps crawl internal structure)
  const mainNav = `
    <nav style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #ddd;">
      <p style="font-weight: 600; margin-bottom: 0.5rem;">Explore:</p>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.9rem;">
        <li><a href="/syllabus" style="color: #0066cc; text-decoration: none;">Syllabus</a></li>
        <li><a href="/practice" style="color: #0066cc; text-decoration: none;">Practice</a></li>
        <li><a href="/mock-tests" style="color: #0066cc; text-decoration: none;">Mock Tests</a></li>
        <li><a href="/ncert-solutions" style="color: #0066cc; text-decoration: none;">NCERT Solutions</a></li>
        <li><a href="/coding" style="color: #0066cc; text-decoration: none;">Coding</a></li>
        <li><a href="/gk-quiz" style="color: #0066cc; text-decoration: none;">GK Quiz</a></li>
        <li><a href="/career-predictor" style="color: #0066cc; text-decoration: none;">Career Predictor</a></li>
        <li><a href="/ai-tutor" style="color: #0066cc; text-decoration: none;">AI Tutor</a></li>
        <li><a href="/live-quiz" style="color: #0066cc; text-decoration: none;">Live Quiz</a></li>
        <li><a href="/doubt-solver" style="color: #0066cc; text-decoration: none;">Doubt Solver</a></li>
        <li><a href="/micro" style="color: #0066cc; text-decoration: none;">Microlearning</a></li>
        <li><a href="/free-alternatives" style="color: #0066cc; text-decoration: none;">Free Alternatives</a></li>
        <li><a href="/kids" style="color: #0066cc; text-decoration: none;">Kids Zone</a></li>
        <li><a href="/study-room" style="color: #0066cc; text-decoration: none;">Study Room</a></li>
        <li><a href="/calculators" style="color: #0066cc; text-decoration: none;">Calculators</a></li>
        <li><a href="/worksheets" style="color: #0066cc; text-decoration: none;">Worksheets</a></li>
      </ul>
    </nav>
  `;

  // Route-specific rich content
  let richContent = '';

  // Routes that ship their own static body HTML (e.g. Privacy, Terms) — so the real
  // policy text is in the prerendered HTML for crawlers/reviewers that don't run JS.
  if (route.bodyHtml) {
    richContent = `<div style="margin-top:1.5rem;line-height:1.7;">${route.bodyHtml}</div>`;
  }

  // NCERT chapter pages — legacy fallback ONLY.
  //
  // This block truncates every solution to 500 characters and caps the list at
  // `displayLimit`, ending with "Showing N of M questions". That was the best
  // available when these routes shipped no body of their own.
  //
  // It must now be an ELSE-IF. It used to be a bare `if`, so on any NCERT page
  // it ran AFTER the `if (route.bodyHtml)` branch above and REASSIGNED
  // richContent, silently discarding the full body. The symptom was inverted
  // and took a while to read: chapters WITH bank data rendered only the
  // truncated 6-question version, while class-10/hindi-kshitij/tulsidas
  // rendered the full body — because its bank key is "Hindi (Kshitij)" with
  // parentheses, which this block's slug-derived lookup cannot find, so it
  // failed to overwrite. The pages with real data were the ones being clobbered.
  const ncertMatch = route.path.match(/^\/ncert-solutions\/class-(\d+)\/([a-z-]+)\/([a-z-]+)$/);
  if (!route.bodyHtml && ncertMatch) {
    const [, classLevel, subjSlug, chapSlug] = ncertMatch;
    const ncertKey = `${classLevel}::${slugToSubject(subjSlug)}::${chapSlug}`;
    const ncertData = getNcertData();
    const qas = ncertData[ncertKey] || [];

    if (qas.length > 0) {
      const displayLimit = Math.min(6, qas.length); // Show first 6 Q&A as rich, indexable static content
      richContent = `<div style="margin-top: 1.5rem;">`;

      // Numbered list of key concepts/questions
      richContent += `
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Key Questions Covered:</h2>
          <ol style="margin: 0; padding-left: 1.5rem; color: #555; line-height: 1.8;">
      `;
      for (let i = 0; i < displayLimit; i++) {
        const qa = qas[i];
        richContent += `<li style="margin-bottom: 0.5rem;">${esc(qa.q.length > 80 ? qa.q.slice(0, 77) + '…' : qa.q)}</li>`;
      }
      if (qas.length > displayLimit) {
        richContent += `<li style="margin-top: 0.5rem; color: #999; font-size: 0.9rem;">+ ${qas.length - displayLimit} more questions in the full chapter</li>`;
      }
      richContent += `</ol></div>`;

      // Table summary
      richContent += `
        <div style="margin-bottom: 2rem; overflow-x: auto;">
          <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Solutions Summary:</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; background: white; border: 1px solid #ddd;">
            <thead style="background: #f5f5f5;">
              <tr>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Question</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600;">Status</th>
              </tr>
            </thead>
            <tbody>
      `;
      for (let i = 0; i < displayLimit; i++) {
        const qa = qas[i];
        richContent += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;">${esc(qa.q.length > 60 ? qa.q.slice(0, 57) + '…' : qa.q)}</td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Solved</span></td>
              </tr>
        `;
      }
      richContent += `
            </tbody>
          </table>
          <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">Showing ${displayLimit} of ${qas.length} questions</p>
        </div>
      `;

      // Q&A details
      for (let i = 0; i < displayLimit; i++) {
        const qa = qas[i];
        richContent += `
          <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f9f9f9; border-left: 3px solid #0066cc;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.05rem; color: #333;">Q${i + 1}: ${esc(qa.q)}</h3>
            <div style="font-size: 0.95rem; color: #555; line-height: 1.5;">
              ${esc(qa.solution).slice(0, 500)}${qa.solution.length > 500 ? '...' : ''}
            </div>
          </div>
        `;
      }
      richContent += `<p style="color: #666; font-size: 0.9rem; font-style: italic;">Showing ${displayLimit} of ${qas.length} questions. Visit the full page for complete solutions.</p>`;

      // Prev/next chapter navigation (sequential crawl path + UX), using the
      // NCERT ordering within the same class + subject.
      const ordered = NCERT_CHAPTERS.filter((c) => c.classLevel === classLevel && c.subjSlug === subjSlug);
      const idx = ordered.findIndex((c) => c.chapSlug === chapSlug);
      const prevCh = idx > 0 ? ordered[idx - 1] : null;
      const nextCh = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;
      if (prevCh || nextCh) {
        const link = (c, label) => `<a href="/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}" style="color: #0066cc; text-decoration: none; font-weight: 600;">${label}</a>`;
        richContent += `<nav style="display: flex; justify-content: space-between; gap: 1rem; margin: 1.5rem 0; font-size: 0.9rem;">
          ${prevCh ? link(prevCh, `← Previous: ${esc(prevCh.title)}`) : '<span></span>'}
          ${nextCh ? link(nextCh, `Next: ${esc(nextCh.title)} →`) : '<span></span>'}
        </nav>`;
      }

      // Sibling-chapter interlinking — link other chapters in the same class + subject
      // (internal linking + topical clustering + dwell time; reuses existing data).
      const siblings = NCERT_CHAPTERS.filter((c) => c.classLevel === classLevel && c.subjSlug === subjSlug && c.chapSlug !== chapSlug);
      if (siblings.length) {
        richContent += `<div style="margin-top: 2rem;"><h2 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #333;">More Class ${classLevel} ${esc(slugToSubject(subjSlug))} NCERT Solutions</h2><ul style="line-height: 1.9; padding-left: 1.25rem;">`;
        for (const s of siblings) {
          richContent += `<li><a href="/ncert-solutions/class-${s.classLevel}/${s.subjSlug}/${s.chapSlug}" style="color: #0066cc; text-decoration: none;">${esc(s.title)} — Class ${s.classLevel} ${esc(s.subject)} NCERT Solutions</a></li>`;
        }
        richContent += `</ul></div>`;
      }
      richContent += `</div>`;
    }
  }

  // Coding tutorial pages (individual topic) — show rich topic content + numbered list + table
  else if (route.path.match(/^\/coding\/[a-z-]+\/[a-z0-9-]+$/)) {
    const [, lang, topic] = route.path.match(/^\/coding\/([a-z-]+)\/([a-z0-9-]+)$/);
    const topicContent = route.topicContent;
    if (topicContent && topicContent.theoryText) {
      // Render the topic's REAL theory paragraphs (unique per page) + syntax. No
      // generic "Learning Path" / "Key Concepts" boilerplate — that was identical
      // on every coding page (duplicate content) and added nothing.
      const paras = topicContent.theoryText.split('\n\n').map((p) => p.trim()).filter(Boolean);
      richContent = `
        <div style="margin-top: 1.5rem;">
          <h2 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #333;">${esc(titleCase(topic))} in ${esc(langLabel(lang))}</h2>
          ${paras.map((p) => `<p style="margin: 0 0 0.9rem 0; font-size: 0.97rem; color: #444; line-height: 1.7;">${esc(p)}</p>`).join('')}
          ${topicContent.syntaxText ? `
            <div style="padding: 1rem; background: #f5f5f5; border-left: 3px solid #4caf50; margin: 1.25rem 0;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; color: #333;">${esc(titleCase(topic))} — Syntax</h3>
              <pre style="margin: 0; font-size: 0.85rem; color: #333; white-space: pre-wrap; font-family: 'Courier New', monospace;">${esc(topicContent.syntaxText)}</pre>
            </div>
          ` : ''}
          <p style="font-size: 0.95rem; color: #444; line-height: 1.7; margin-top: 1rem;">
            Learn <strong>${esc(titleCase(topic))}</strong> step by step with Syllab's free interactive ${esc(langLabel(lang))} tutorial — runnable code examples, practice exercises and instant AI feedback, all free with no signup.
            <a href="/coding/${lang}" style="color: #0066cc; text-decoration: none; font-weight: 600;"> Explore the full ${esc(langLabel(lang))} course →</a>
          </p>
        </div>
      `;
    }
  }

  // Coding language landing pages — show list of available topics (but keep small)
  else if (route.path.match(/^\/coding\/[a-z-]+$/)) {
    const lang = route.path.split('/')[2];
    const topics = CODE_TOPICS[lang] || [];
    if (topics.length > 0) {
      // Smaller topics list to reduce duplication. Keep only first 5 to reduce bulk.
      richContent = `
        <div style="margin-top: 1.5rem;">
          <h2 style="font-size: 1.2rem; margin-bottom: 1rem;">Popular Topics:</h2>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.9rem;">
            ${topics.slice(0, 5).map(t => `
              <li style="padding: 0.5rem 0;">
                <a href="/coding/${lang}/${t}" style="color: #0066cc; text-decoration: none;">→ ${esc(titleCase(t))}</a>
              </li>
            `).join('')}
            ${topics.length > 5 ? `<li style="padding: 0.5rem 0; color: #999; font-size: 0.85rem;">+ ${topics.length - 5} more topics in the interactive editor</li>` : ''}
          </ul>
        </div>
      `;
    }
  }

  // College pages — render details
  // College detail pages render via their own route.bodyHtml (data-driven fees
  // table + admission + FAQ, built at route-creation time) — handled by the
  // `if (route.bodyHtml)` branch above, so no college-specific block here.

  // Blog article pages — render the FULL article, not just the summary.
  //
  // This used to emit only article.summary, so a 1,029-word post shipped ~156
  // crawlable words and the body appeared only after hydration. Prerendering a
  // page and then withholding its content defeats the purpose: the URL existed,
  // returned 200, and still had nothing for a crawler to rank.
  else if (route.path.match(/^\/updates\/[a-z0-9-]+$/)) {
    const slug = route.path.split('/')[2];
    const article = (getBlogArticles() || []).find((a) => a.slug === slug);
    if (article) {
      richContent = `<div style="margin-top:1.5rem;padding:1rem;background:#fffef0;border-left:4px solid #ff9800;">
          <p style="font-size:0.95rem;line-height:1.6;color:#555;">${esc(article.summary)}</p>
        </div>${mdToHtml(article.content)}`;
    }
  }

  // Mock tests page — show numbered list of exam types + table of exams covered
  // /mock-tests hub now ships a richer category-grouped body via route.bodyHtml
  // (set in the exam-guide block); this static fallback only runs if that's absent.
  else if (route.path === '/mock-tests' && !route.bodyHtml) {
    richContent = `
      <div style="margin-top: 2rem;">
        <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Exam Types Available:</h2>
        <ol style="margin: 0; padding-left: 1.5rem; color: #555; line-height: 1.8; font-size: 0.95rem;">
          <li style="margin-bottom: 0.5rem;"><strong>Engineering Entrance Exams</strong> — JEE Main, BITSAT, EAMCET, WBJEE, and state exams</li>
          <li style="margin-bottom: 0.5rem;"><strong>Medical Entrance Exams</strong> — NEET UG with multiple mock tests and analysis</li>
          <li style="margin-bottom: 0.5rem;"><strong>Olympiad Exams</strong> — Math and Science Olympiad practice papers</li>
          <li style="margin-bottom: 0.5rem;"><strong>Board Exams</strong> — Class 10 and Class 12 sample papers and practice tests</li>
        </ol>

        <h2 style="font-size: 1.1rem; margin: 2rem 0 0.75rem 0; color: #333;">Exam Coverage:</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; background: white; border: 1px solid #ddd; margin-bottom: 1rem;">
            <thead style="background: #f5f5f5;">
              <tr>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Exam</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600;">Mocks Available</th>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Level</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>JEE Main</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">10+</td>
                <td style="padding: 0.75rem;">Advanced</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>NEET UG</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">10+</td>
                <td style="padding: 0.75rem;">Advanced</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>EAMCET / KCET / MHT-CET</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">5+</td>
                <td style="padding: 0.75rem;">Intermediate</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Math & Science Olympiad</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">8+</td>
                <td style="padding: 0.75rem;">All levels</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;"><strong>CBSE Board Exams</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">Unlimited</td>
                <td style="padding: 0.75rem;">Class 10 & 12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="color: #666; font-size: 0.9rem; font-style: italic;">All mock tests include detailed solutions and performance analytics to track your progress.</p>
      </div>
    `;
  }

  // GK Questions cluster — unique intro + topic coverage + class cross-links
  else if (route.path === '/gk-questions' || route.path.startsWith('/gk-questions/class-')) {
    const m = route.path.match(/class-(\d+)/);
    const c = m ? m[1] : null;
    const topics = ['History', 'Geography', 'Polity & Civics', 'Science', 'Static GK', 'Current Affairs'];
    richContent = `
      <div style="margin-top: 1.5rem; color: #444; line-height: 1.8; font-size: 0.97rem;">
        <p>${c
          ? `Practise free <strong>General Knowledge questions for Class ${c}</strong> with answers and clear explanations. Every question is age-appropriate and aligned to what Indian students learn in school and need for quizzes, olympiads and competitive exams.`
          : `Free <strong>General Knowledge questions and answers</strong> for Indian students from Class 5 to 12 — with explanations, organised by topic, and a timed quiz to test yourself.`}
        </p>
        <h2 style="font-size: 1.1rem; margin: 1.5rem 0 0.5rem; color: #333;">Topics covered</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          ${topics.map((t) => `<li>${t}</li>`).join('')}
        </ul>
        <h2 style="font-size: 1.1rem; margin: 1.5rem 0 0.5rem; color: #333;">GK questions by class</h2>
        <ul style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${[5, 6, 7, 8, 9, 10, 11, 12].map((n) => `<li><a href="/gk-questions/class-${n}" style="color:#0066cc;text-decoration:none;">Class ${n} GK</a></li>`).join('')}
        </ul>
        <p style="margin-top: 1.25rem;"><a href="/gk-quiz" style="color:#0066cc;font-weight:600;text-decoration:none;">▶ Play the interactive GK Quiz</a></p>
      </div>
    `;
  }

  // Free alternatives page — show comparison table + list
  else if (route.path === '/free-alternatives') {
    richContent = `
      <div style="margin-top: 2rem;">
        <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Free Features of Syllab:</h2>
        <ol style="margin: 0; padding-left: 1.5rem; color: #555; line-height: 1.8; font-size: 0.95rem;">
          <li style="margin-bottom: 0.5rem;"><strong>NCERT Solutions</strong> — Free chapter-wise answers for Class 6–12 with detailed explanations</li>
          <li style="margin-bottom: 0.5rem;"><strong>Mock Tests</strong> — 200+ full-length mock tests for JEE, NEET, EAMCET, and board exams</li>
          <li style="margin-bottom: 0.5rem;"><strong>AI Tutor</strong> — 24/7 homework helper with scan-and-solve and concept notes generation</li>
          <li style="margin-bottom: 0.5rem;"><strong>Coding Courses</strong> — Python, JavaScript, AI, Data Science and more — all completely free</li>
          <li style="margin-bottom: 0.5rem;"><strong>Live Quiz Games</strong> — Kahoot-style multiplayer quizzes with real-time leaderboards</li>
        </ol>

        <h2 style="font-size: 1.1rem; margin: 2rem 0 0.75rem 0; color: #333;">App Comparison:</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; background: white; border: 1px solid #ddd; margin-bottom: 1rem;">
            <thead style="background: #f5f5f5;">
              <tr>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Feature</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600; color: #4caf50;">Syllab</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600;">Premium Apps</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Cost</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">100% Free</span></td>
                <td style="padding: 0.75rem; text-align: center;">Subscriptions ₹299–999/mo</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Mock Tests</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Unlimited</span></td>
                <td style="padding: 0.75rem; text-align: center;">Limited to premium</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>AI Doubt Solver</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Yes</span></td>
                <td style="padding: 0.75rem; text-align: center;">Paid add-ons</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Coding Courses</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Included</span></td>
                <td style="padding: 0.75rem; text-align: center;">Not available</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;"><strong>Sign-up Required</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">No</span></td>
                <td style="padding: 0.75rem; text-align: center;">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Homepage — brief overview
  else if (route.path === '/') {
    richContent = `
      <div style="margin-top: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
        <h2 style="margin: 0 0 0.5rem 0;">Free AI Learning for Indian Students</h2>
        <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
          Access NCERT solutions, mock tests, AI tutoring, coding courses, and career planning — all completely free for Class 1–12. No subscriptions, no ads.
        </p>
      </div>
    `;
  }

  // Homepage uses H2 because the React app renders the primary H1 ("Learn smarter with AI by your side").
  // For all other pages, use H1 for the page title.
  const headingTag = route.path === '/' ? 'h2' : 'h1';

  return `
    <article style="max-width: 800px; margin: 0 auto; padding: 1rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.6;">
      ${breadcrumb}
      <${headingTag} style="font-size: 1.8rem; margin: 0.5rem 0 1rem 0; color: #222;">${esc(title)}</${headingTag}>
      <p style="font-size: 1rem; margin: 0 0 1.5rem 0; color: #666;">${esc(desc)}</p>
      ${tldrBlock}
      ${richContent}
      ${MESH_BY_PATH.get(route.path) || ''}
      ${mainNav}
      <footer style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #ddd; font-size: 0.85rem; color: #999;">
        <p style="margin: 0;">Syllab.in — Free learning for Indian students, Class 1–12</p>
      </footer>
    </article>
  `;
}

// Helper: convert slug to NCERT subject name for data key lookup
function slugToSubject(slug) {
  const map = {
    'mathematics': 'Mathematics',
    'science': 'Science',
    'social-science': 'Social Science',
    'english': 'English',
    'hindi': 'Hindi',
    'sanskrit': 'Sanskrit',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'biology': 'Biology',
    'accountancy': 'Accountancy',
    'business-studies': 'Business Studies',
    'evs': 'EVS',
  };
  return map[slug] || slug;
}

// Pick the best Open Graph card for a page type (better social CTR than one
// generic image). Falls back to the default site card.
function ogImageFor(p) {
  if (p.startsWith('/worksheets')) return 'og-worksheets';
  if (p.startsWith('/kids')) return 'og-kids';
  if (p.startsWith('/study-room')) return 'og-study-room';
  if (p.startsWith('/gk-questions') || p.startsWith('/gk-quiz')) return 'og-gk';
  if (p.startsWith('/mock-tests')) return 'og-mock';
  if (p.startsWith('/coding')) return 'og-coding';
  return 'og-image';
}

function buildHeadBlock(route) {
  const canonical = `${SITE}${route.path}`;
  const robots = route.noindex
    ? 'noindex,follow' // follow (not nofollow): pruned thin pages still pass link equity
    : 'index,follow,max-image-preview:large,max-snippet:-1';
  const ogImg = `${SITE}/${ogImageFor(route.path)}.png`;

  const lines = [
    `  <title>${esc(route.title)}</title>`,
    `  <meta name="description" content="${esc(route.description)}" />`,
    `  <meta name="keywords" content="${esc(route.keywords || '')}" />`,
    `  <meta name="robots" content="${robots}" />`,
    `  <meta name="googlebot" content="${robots}" />`,
    `  <link rel="canonical" href="${canonical}" />`,
    // Per-route language alternates (e.g. an English page that has a /hi/ version);
    // falls back to self-referencing en-IN/en/x-default.
    // Only emit hreflang where a genuine translated alternate exists. Pointing
    // en-IN + en + x-default at the SAME url adds nothing (Google ignores a
    // self-only cluster) and auditors flag it as "repeatable href values".
    // Pages without a translation just rely on <html lang> + canonical.
    ...(route.hreflangAlt && route.hreflangAlt.length
      ? [
          `  <link rel="alternate" hreflang="en-IN" href="${canonical}" />`,
          ...route.hreflangAlt.map((a) => `  <link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`),
          `  <link rel="alternate" hreflang="x-default" href="${canonical}" />`,
        ]
      : []),
    `  <link rel="alternate" type="application/rss+xml" title="Syllab.in Blog — Free Exam Prep & Study Updates" href="${SITE}/feed.xml" />`,
    `  <meta property="og:title" content="${esc(route.title)}" />`,
    `  <meta property="og:description" content="${esc(route.description)}" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:site_name" content="Syllab.in" />`,
    `  <meta property="og:locale" content="en_IN" />`,
    `  <meta property="og:image" content="${ogImg}" />`,
    `  <meta property="og:image:width" content="1200" />`,
    `  <meta property="og:image:height" content="630" />`,
    `  <meta property="og:image:type" content="image/png" />`,
    `  <meta property="og:image:alt" content="${esc(route.title)}" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${esc(route.title)}" />`,
    `  <meta name="twitter:description" content="${esc(route.description)}" />`,
    `  <meta name="twitter:image" content="${ogImg}" />`,
    `  <meta name="twitter:image:alt" content="${esc(route.title)}" />`,
  ];

  // ── Mark every head tag above as Helmet-managed (data-rh="true") ──
  // react-helmet-async only ADOPTS pre-existing tags that carry this marker.
  // Without it, Helmet does not recognise our prerendered tags on hydration and
  // APPENDS its own copies — the page then has two <meta name="description">,
  // which SEO auditors flag as a critical duplicate-metadata error.
  // With the marker, Helmet replaces these tags in place, so exactly one of each
  // survives. Applied to meta/link/title only (never to the JSON-LD below, which
  // Helmet does not manage here).
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/^(\s*<(?:meta|link|title))(\s|>)/, '$1 data-rh="true"$2');
  }

  if (route.jsonLd) {
    lines.push(
      `  <script type="application/ld+json">`,
      `  ${JSON.stringify(route.jsonLd, null, 2).split('\n').join('\n  ')}`,
      `  </script>`,
    );
  }

  // Auto BreadcrumbList (Home → this page) for every non-home route, unless the
  // route already declares its own breadcrumb. Gives Google breadcrumb rich
  // results across the whole site (class pages, coding, colleges, etc.) from one
  // place — no per-route editing.
  const hasBreadcrumb = JSON.stringify(route.jsonLd || '').includes('BreadcrumbList');
  if (route.path !== '/' && !hasBreadcrumb) {
    const pageName = String(route.title).split('|')[0].split('—')[0].trim() || 'Page';
    const crumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: pageName, item: canonical },
      ],
    };
    lines.push(
      `  <script type="application/ld+json">`,
      `  ${JSON.stringify(crumb, null, 2).split('\n').join('\n  ')}`,
      `  </script>`,
    );
  }

  // WebPage + Speakable (so voice assistants / AI search know the concise answer
  // to read & cite) + author/publisher Organization (E-E-A-T trust signals).
  const todayISO = new Date().toISOString().split('T')[0];
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: String(route.title).split('|')[0].split('—')[0].trim(),
    url: canonical,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: `${SITE}/` },
    publisher: { '@type': 'Organization', name: 'Syllab.in', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` } },
    author: { '@type': 'Organization', name: 'Syllab Editorial Team', url: `${SITE}/about` },
    dateModified: todayISO,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.speakable'] },
  };
  lines.push(
    `  <script type="application/ld+json">`,
    `  ${JSON.stringify(webPage, null, 2).split('\n').join('\n  ')}`,
    `  </script>`,
  );

  return lines.join('\n');
}

/**
 * Replace the per-page meta block inside the <head> of dist/index.html
 * AND inject unique body content into <div id="root">.
 *
 * Crawlers now see:
 * - Unique <title>, description, canonical in <head> ✓
 * - Unique, semantic HTML content in <body id="root"> ✓
 * - React still safely mounts on client (createRoot clears #root and rerenders) ✓
 */
function injectMeta(baseHtml, route, ssrBody) {
  const headBlock = buildHeadBlock(route);
  const bodyContent = buildBodyContent(route);

  // Strip any pre-existing <title> in the template so we never emit two <title>
  // tags (the default index.html title was surviving outside the replaced block,
  // producing duplicate titles on every prerendered page — bad for SEO).
  baseHtml = baseHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');

  // Strip the base index.html's hardcoded hreflang (it points to the homepage),
  // so each page keeps only its own self-referencing hreflang from the head block.
  baseHtml = baseHtml.replace(/\s*<link[^>]*rel="alternate"[^>]*hreflang=[^>]*>/gi, '');

  // The base index.html injects a GENERIC site-wide FAQPage on every page — that
  // is an anti-pattern (irrelevant FAQ on every URL, and a duplicate on pages
  // that declare their own FAQ). Keep the generic FAQ only on the home page;
  // every other page carries only its own page-specific FAQ (if any).
  // Same reasoning for the site-wide ENTITY blocks the base shell injects
  // (EducationalOrganization, WebSite+SearchAction, SoftwareApplication): they
  // describe the site/app, not the page, and Google's guidance puts them on the
  // page they are about. Shipping them on all ~4,250 URLs is structured-data
  // noise — a chapter page is not a SoftwareApplication, and the sitelinks
  // SearchAction only means anything on the home page.
  if (route.path !== '/') {
    for (const type of ['FAQPage', 'EducationalOrganization', 'WebSite', 'SoftwareApplication']) {
      baseHtml = baseHtml.replace(
        new RegExp(`\\s*<script type="application/ld\\+json">(?:(?!</script>)[\\s\\S])*?"@type":\\s*"${type}"(?:(?!</script>)[\\s\\S])*?</script>`),
        '',
      );
    }
  }

  // Replace from <title> through </title> and all following meta/link tags
  // until we hit the first <link rel="preconnect"> (we keep preconnect onwards).
  // Strategy: replace the entire block between <meta name="theme-color"> and
  // <!-- Preconnect to critical origins --> with our per-page block.
  baseHtml = baseHtml.replace(
    /(<meta name="theme-color"[^>]*\/>)\s*([\s\S]*?)(<!-- Preconnect to critical origins -->)/,
    `$1\n\n${headBlock}\n\n  $3`,
  );

  // Option A (CWV/CLS fix): instead of putting the SEO body INSIDE #root (where React
  // wipes it on mount → massive layout shift), we put a stable boot SKELETON in #root
  // (matches the app's fixed 80px header + content area → near-zero CLS when React takes
  // over) and move the crawlable SEO content into a visually-hidden sibling (#prerender-seo).
  // Non-JS crawlers still read the SEO content; React removes the hidden block on mount.
  const bootSkeleton =
    '<div id="boot-skeleton" aria-hidden="true">' +
    '<div class="bs-nav"><div class="bs-logo"></div></div>' +
    '<div class="bs-main">' +
    '<div class="bs-blk bs-title"></div>' +
    '<div class="bs-blk bs-line w90"></div>' +
    '<div class="bs-blk bs-line w80"></div>' +
    '<div class="bs-blk bs-line w70"></div>' +
    '<div class="bs-blk bs-card"></div>' +
    '</div></div>';
  const seoBlock =
    '<div id="prerender-seo" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">' +
    bodyContent + '</div>';

  if (ssrBody) {
    // TRUE SSR path: ship the real server-rendered app inside #root so the client
    // HYDRATES it (no re-render, content visible from the first byte). Mark the
    // document so main.tsx chooses hydrateRoot over createRoot. The per-route SEO
    // <head> is still produced by buildHeadBlock above, so we DON'T need the
    // hidden #prerender-seo fallback or the boot skeleton anymore.
    baseHtml = baseHtml.replace(/<html(\s|>)/i, '<html data-ssr="true"$1');
    baseHtml = baseHtml.replace(
      /<div\s+id="root"[\s\S]*?<\/div>/i,
      () => `<div id="root">${ssrBody}</div>`,
    );
    return baseHtml;
  }

  // Fallback (no SSR body): boot skeleton in #root + hidden crawlable SEO sibling.
  // Function replacer avoids `$`-sequence interpretation in bodyContent.
  baseHtml = baseHtml.replace(
    /<div\s+id="root"[\s\S]*?<\/div>/i,
    () => `<div id="root">${bootSkeleton}</div>\n  ${seoBlock}`,
  );

  return baseHtml;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // CRITICAL: read the BUILT template from dist/index.html (it has the hashed
  // /assets/*.js bundle tags). The root index.html references /src/main.tsx (the
  // dev entry) which does NOT exist in production — using it would 404 the app
  // and blank the whole site. We read it ONCE here, before the loop writes any
  // route (the '/' route later overwrites dist/index.html, but this in-memory
  // copy stays clean). Always run `vite build` immediately before this script.
  const baseHtmlPath = path.join(DIST, 'index.html');
  let baseHtml;
  try {
    baseHtml = await fs.readFile(baseHtmlPath, 'utf8');
  } catch {
    console.error('❌ dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  // ── Optional TRUE SSR ──────────────────────────────────────────────────────
  // When SSR_PRERENDER=1, render each route's REAL app HTML via entry-server.tsx
  // (React 19 prerender → resolves lazy routes) and hydrate on the client. Falls
  // back per-route to the boot-skeleton path if a render throws, so the build is
  // never blocked. SSR_LIMIT=N renders only the first N routes (for fast testing).
  // SSR auto-enables when the compiled bundle exists (so `npm run build` does it
  // with no fragile cross-platform env vars). Scope: an allowlist of routes —
  // default just the homepage `/` (the LCP-critical landing page), verified to
  // hydrate cleanly. Override with SSR_ROUTES="/,/x" or SSR_LIMIT=N for testing.
  const SSR_BUNDLE = path.join(ROOT, 'dist-ssr', 'entry-server.js');
  const SSR = process.env.SSR_PRERENDER === '1' || existsSync(SSR_BUNDLE);
  const SSR_LIMIT = process.env.SSR_LIMIT ? parseInt(process.env.SSR_LIMIT, 10) : null;
  // DISABLED (2026-08-04) — SSR is off for every route until the postponed-
  // boundary bug below is fixed.
  //
  // `prerender()` from react-dom/static is documented here as resolving all
  // Suspense/React.lazy boundaries, but it was POSTPONING the homepage's route
  // boundary instead: the shipped HTML contained `<!--$~-->` + `<template
  // id="B:0">` around the loading spinner. A postponed boundary in a prelude can
  // only be finished by a server-side resume() — the client cannot resolve it.
  // So the browser hydrated, sat on the fallback forever, never rendered the
  // lazy Home component, and therefore never even requested Home-*.js.
  //
  // Confirmed in REAL Chrome (not just the headless harness) on a fresh load
  // with no service worker: <main> contained 17 characters, the spinner was
  // stuck, and only 6 JS files loaded — no Home chunk. Every visitor landing on
  // syllab.in saw a spinner. Crawlers still got content (it sits in the hidden
  // S:0/S:1 divs), which is why GSC never flagged it.
  //
  // With SSR off, `/` falls back to the static prerendered body + normal client
  // render, which is what shipped for months before SSR was switched on.
  //
  // To re-enable: fix the postponement (e.g. renderToReadableStream + await
  // allReady, or root-cause what suspends), verify <main> renders real content
  // in a real browser, then restore ['/'] here.
  const DEFAULT_SSR_ROUTES = [];
  const SSR_ROUTES = new Set(
    process.env.SSR_ROUTES
      ? process.env.SSR_ROUTES.split(',').map((s) => s.trim()).filter(Boolean)
      : DEFAULT_SSR_ROUTES,
  );
  let render = null;
  let ssrOk = 0;
  let ssrFail = 0;
  if (SSR) {
    // Import the COMPILED SSR bundle (dist-ssr/entry-server.js), NOT vite's dev
    // ssrLoadModule — the dev module loader degrades after a few hundred sequential
    // renders (it started baking Suspense fallbacks into later routes). The compiled
    // bundle resolves React.lazy via real chunks and renders all 3,900+ routes
    // consistently. Build it first: `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
    const { pathToFileURL } = await import('node:url');
    const entryPath = path.join(ROOT, 'dist-ssr', 'entry-server.js');
    try {
      ({ render } = await import(pathToFileURL(entryPath).href));
    } catch (e) {
      console.error(`❌ SSR bundle not found at ${entryPath}. Run \`vite build --ssr src/entry-server.tsx --outDir dist-ssr\` first.`);
      throw e;
    }
    console.log('🔧 SSR mode ON — rendering real app HTML from compiled bundle.');
  }

  let written = 0;
  let skipped = 0;
  let i = 0;

  for (const route of ROUTES) {
    i++;
    // Convert "/some-path" → "dist/some-path/index.html"
    const routeDir = path.join(DIST, ...route.path.split('/').filter(Boolean));
    const outFile = path.join(routeDir, 'index.html');

    try {
      let ssrBody;
      const ssrThisRoute = SSR_LIMIT != null ? i <= SSR_LIMIT : SSR_ROUTES.has(route.path);
      if (render && ssrThisRoute) {
        try {
          const { body } = await render(route.path);
          if (body && body.length > 200) { ssrBody = body; ssrOk++; }
          else ssrFail++;
        } catch (e) {
          ssrFail++;
          if (ssrFail <= 5) console.warn(`   ⚠️  SSR render failed for ${route.path}: ${String(e).split('\n')[0].slice(0, 80)}`);
        }
      }
      const injected = injectMeta(baseHtml, route, ssrBody);
      await fs.mkdir(routeDir, { recursive: true });
      await fs.writeFile(outFile, injected, 'utf8');
      written++;
    } catch (err) {
      console.warn(`⚠️  Skipped ${route.path}: ${err.message}`);
      skipped++;
    }
  }

  if (SSR) console.log(`   SSR bodies: ${ssrOk} rendered, ${ssrFail} fell back to skeleton.`);

  console.log(`✅ Pre-render complete: ${written} routes written, ${skipped} skipped.`);
  console.log(`   Routes: ${ROUTES.map(r => r.path).join(', ')}`);
}

main().catch(err => {
  console.error('❌ Pre-render failed:', err);
  process.exit(1);
});
