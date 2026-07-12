/**
 * exam-slugs.mjs — authoritative list of competitive-exam pages (slug + display
 * name + category). Shared by generate-sitemap.mjs (URL list, runs BEFORE the SSR
 * bundle exists) and generate-prerender.mjs (routing + category-grouped hub). The
 * RICH per-exam content (about/pattern/tips/FAQs) lives in src/data/mockExams.ts
 * and is read by the prerender from the compiled SSR bundle — single source of truth.
 * Slugs MUST match mockExams.ts. Pages live at /mock-tests/{slug}.
 */
export const EXAM_LIST = [
  // Engineering
  { slug: 'jee-main', name: 'JEE Main', category: 'Engineering' },
  { slug: 'jee-advanced', name: 'JEE Advanced', category: 'Engineering' },
  { slug: 'bitsat', name: 'BITSAT', category: 'Engineering' },
  { slug: 'mht-cet', name: 'MHT-CET', category: 'Engineering' },
  { slug: 'kcet', name: 'KCET', category: 'Engineering' },
  { slug: 'wbjee', name: 'WBJEE', category: 'Engineering' },
  { slug: 'ap-eapcet', name: 'AP EAPCET', category: 'Engineering' },
  { slug: 'ts-eapcet', name: 'TS EAPCET', category: 'Engineering' },
  { slug: 'gujcet', name: 'GUJCET', category: 'Engineering' },
  { slug: 'comedk-uget', name: 'COMEDK UGET', category: 'Engineering' },
  { slug: 'viteee', name: 'VITEEE', category: 'Engineering' },
  { slug: 'srmjeee', name: 'SRMJEEE', category: 'Engineering' },
  // Medical
  { slug: 'neet', name: 'NEET UG', category: 'Medical' },
  // University
  { slug: 'cuet', name: 'CUET UG', category: 'University' },
  // Government
  { slug: 'ssc-chsl', name: 'SSC CHSL', category: 'Government' },
  { slug: 'nda', name: 'NDA', category: 'Government' },
  { slug: 'rrb-ntpc', name: 'RRB NTPC', category: 'Government' },
  { slug: 'ibps-clerk', name: 'IBPS Clerk', category: 'Government' },
  // Law
  { slug: 'clat', name: 'CLAT UG', category: 'Law' },
  { slug: 'ailet', name: 'AILET', category: 'Law' },
  // Management
  { slug: 'ipmat', name: 'IPMAT', category: 'Management' },
  // Architecture & Design
  { slug: 'nata', name: 'NATA', category: 'Architecture & Design' },
  // Olympiads
  { slug: 'science-olympiad', name: 'Science Olympiad', category: 'Olympiad' },
  { slug: 'maths-olympiad', name: 'Maths Olympiad', category: 'Olympiad' },
];

export const EXAM_CATEGORIES = ['Engineering', 'Medical', 'University', 'Management', 'Architecture & Design', 'Government', 'Law', 'Olympiad'];
