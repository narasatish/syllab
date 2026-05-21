export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Syllab useful for JEE, NEET and EAMCET preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Syllab combines NCERT-aligned chapter practice, AI tutoring, daily challenges, and exam-specific preparation tracks for JEE, NEET and EAMCET.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Class 5 to 10 students use Syllab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Students from Classes 5 to 10 can use syllabus summaries, chapter practice, daily aptitude questions, and AI help for school learning.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Syllab find weak topics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Syllab reviews mistake history, subject performance, and quiz activity to identify weak chapters and recommend targeted practice.',
      },
    },
  ],
};

export const PREP_ARTICLES = [
  {
    slug: 'high-weightage-chapters-jee-2026',
    title: 'High Weightage Chapters for JEE 2026',
    keyword: 'high weightage chapters for JEE 2026',
    summary: 'Prioritize calculus, coordinate geometry, mechanics, electrostatics, thermodynamics, chemical bonding, and organic reaction mechanisms.',
  },
  {
    slug: 'balance-boards-and-neet',
    title: 'How to Balance Boards and NEET',
    keyword: 'how to balance boards and NEET',
    summary: 'Use NCERT as the common base, revise Biology daily, reserve timed Physics and Chemistry practice blocks, and track mistakes weekly.',
  },
  {
    slug: 'best-eamcet-preparation-strategy',
    title: 'Best Preparation Strategy for EAMCET',
    keyword: 'best EAMCET practice platform',
    summary: 'Build speed with formula recall, chapter-wise tests, previous patterns, and a daily mix of mathematics, physics, and chemistry.',
  },
  {
    slug: 'class-10-maths-weightage-cbse-2026',
    title: 'Chapter Wise Weightage for Class 10 Maths CBSE 2026',
    keyword: 'chapter wise weightage for Class 10 Maths CBSE 2026',
    summary: 'Focus on real numbers, polynomials, quadratic equations, trigonometry, coordinate geometry, statistics, and probability with timed practice.',
  },
  {
    slug: 'important-neet-biology-chapters',
    title: 'Important NEET Biology Chapters',
    keyword: 'important NEET Biology chapters',
    summary: 'Human physiology, genetics, ecology, plant physiology, reproduction, and biotechnology usually deserve repeated revision cycles.',
  },
  {
    slug: 'eamcet-preparation-hyderabad',
    title: 'Best EAMCET Preparation Platform in Hyderabad',
    keyword: 'best EAMCET preparation platform in Hyderabad',
    summary: 'Students in Hyderabad can combine local coaching routines with Syllab daily EAMCET questions, analytics, and AI doubt solving.',
  },
];
