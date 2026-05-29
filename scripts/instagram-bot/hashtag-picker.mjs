/**
 * Hashtag picker — selects 15-25 relevant Instagram hashtags per post type.
 * Mix: high-volume tags (broad reach) + niche tags (engaged audience).
 * Source: research on top edu Instagram accounts in India (Unacademy, BYJU's,
 * PhysicsWallah, Vedantu) plus general competitive exam hashtags.
 */

// Always-on hashtags for every Syllab post
const BRAND_TAGS = [
  '#syllab', '#syllabin', '#freelearning', '#indianstudents', '#cbse',
];

// High-volume general edu tags (broad reach)
const GENERAL_EDU_TAGS = [
  '#education', '#studygram', '#studymotivation', '#studytips',
  '#studentlife', '#studyhard', '#studynotes', '#studywithme',
  '#educationalcontent', '#learnenglish', '#learning',
];

// India-specific edu tags
const INDIA_EDU_TAGS = [
  '#cbseboardexam', '#cbseclass10', '#cbseclass12', '#ncert',
  '#ncertsolutions', '#indianeducation', '#indianstudent', '#schoollife',
  '#boardexam2026', '#class10', '#class12',
];

// Exam-specific tags
const EXAM_TAGS = {
  jee: ['#jee', '#jeemains', '#jeemains2026', '#jeeaspirants', '#jeeadvanced', '#iit', '#iitjee', '#jeepreparation'],
  neet: ['#neet', '#neet2026', '#neetug', '#neetaspirants', '#mbbs', '#medicalstudent', '#aiims', '#neetpreparation'],
  eamcet: ['#eamcet', '#apeamcet', '#tseamcet', '#telangana', '#andhrapradesh', '#engineeringentrance'],
  boards: ['#cbse2026', '#boardexamtips', '#10thboards', '#12thboards', '#boardstudents'],
};

// Per-post-type tags
const PER_TYPE_TAGS = {
  question: ['#quizoftheday', '#dailyquiz', '#mcq', '#educationalquiz', '#quizgram', '#testyourknowledge'],
  puzzle: ['#puzzle', '#brainteaser', '#dailypuzzle', '#riddles', '#logicalthinking', '#mathpuzzle'],
  gk: ['#generalknowledge', '#gk', '#gkquiz', '#currentaffairs', '#dailygk', '#gkfacts', '#indianhistory', '#indiangk'],
  info: ['#studyhacks', '#studytips', '#examtips', '#ncerttips', '#smartstudy', '#topperstips'],
  news: ['#examupdate', '#educationnews', '#cbseupdate', '#jeeupdate', '#neetupdate', '#examalert'],
  motivation: ['#studentmotivation', '#studymotivation', '#exammotivation', '#nevergiveup', '#dreambig'],
  coding: ['#python', '#javascript', '#coding', '#programming', '#learnprogramming', '#codingforkids', '#codinglife', '#tech'],
};

// Subject-specific tags (added when post is about a specific subject)
const SUBJECT_TAGS = {
  maths: ['#maths', '#mathematics', '#mathstricks', '#mathsmemes'],
  science: ['#science', '#physics', '#chemistry', '#biology', '#sciencefacts'],
  english: ['#englishlearning', '#englishgrammar', '#vocabularybuilder', '#englishspeaking'],
  history: ['#history', '#historyfacts', '#indianhistory', '#historyofindia'],
  geography: ['#geography', '#geographyfacts', '#worldgeography', '#indiangeography'],
};

// Currently-trending edu tags (rotate every few months — update via npm run update-hashtags)
const TRENDING_TAGS = [
  '#aiforeducation', '#chatgptforstudents', '#studytok', '#examszn',
  '#boardszn', '#jeeszn', '#neetszn', '#desistudent', '#indiakaapp',
];

/**
 * Pick a curated list of 20-25 hashtags for a post.
 * @param {string} postType - one of: question, puzzle, gk, info, news, motivation, coding
 * @param {object} ctx - optional context: { exam: 'jee'|'neet'|..., subject: 'maths'|... }
 */
export function pickHashtags(postType, ctx = {}) {
  const tags = new Set();

  // 1. Brand tags (always on)
  BRAND_TAGS.forEach((t) => tags.add(t));

  // 2. Per-type tags
  const typeTags = PER_TYPE_TAGS[postType] || [];
  typeTags.forEach((t) => tags.add(t));

  // 3. Some general edu tags (rotate 5 of them)
  shuffle(GENERAL_EDU_TAGS).slice(0, 4).forEach((t) => tags.add(t));

  // 4. India edu tags (rotate 4)
  shuffle(INDIA_EDU_TAGS).slice(0, 4).forEach((t) => tags.add(t));

  // 5. Exam-specific if context provided
  if (ctx.exam && EXAM_TAGS[ctx.exam]) {
    shuffle(EXAM_TAGS[ctx.exam]).slice(0, 3).forEach((t) => tags.add(t));
  }

  // 6. Subject-specific if provided
  if (ctx.subject) {
    const subj = ctx.subject.toLowerCase();
    if (SUBJECT_TAGS[subj]) {
      SUBJECT_TAGS[subj].slice(0, 2).forEach((t) => tags.add(t));
    }
  }

  // 7. Sprinkle in trending tags
  shuffle(TRENDING_TAGS).slice(0, 3).forEach((t) => tags.add(t));

  // Convert to array, cap at 25 (Instagram max is 30 but 20-25 is sweet spot)
  return Array.from(tags).slice(0, 25);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// CLI test
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  const type = process.argv[2] || 'question';
  console.log('Sample hashtags for', type, ':\n', pickHashtags(type, { exam: 'jee', subject: 'maths' }).join(' '));
}
