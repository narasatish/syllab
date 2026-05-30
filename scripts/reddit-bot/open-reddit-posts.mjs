/**
 * Opens Reddit submission pages pre-filled with titles.
 * You just paste the body text and click Submit — no API needed.
 * Run: node scripts/reddit-bot/open-reddit-posts.mjs
 */

import { exec } from 'child_process';

const POSTS = [
  {
    sub: 'CBSE',
    title: 'Free CBSE practice site with AI tutor — no paywall, works on any phone browser',
    body: `My cousin failed Class 10 twice — not because she was dumb, but because tuitions in our town cost Rs 3,000/month per subject.

I spent the last year building Syllab (syllab.in) — completely free, no paywalls.

What it has:
- Chapter-wise MCQ practice for Classes 5-12 (CBSE)
- AI tutor that explains WHY your answer was wrong, not just marks it
- Full mock tests for JEE, NEET, EAMCET, WBJEE, KCET, MHT-CET (10 papers each)
- Daily challenges with leaderboards
- Coding lab (Python, JS, HTML/CSS)
- GK Quiz (30+ questions per category, generates new sets)
- Works on any phone browser — no app install needed

No login needed to browse. Login only to save progress.

Link in first comment. Honest feedback welcome!`,
  },
  {
    sub: 'JEEpreparation',
    title: 'Free JEE mock test site — 10 full papers each for JEE Main, BITSAT, EAMCET, WBJEE and 9 more exams',
    body: `Built Syllab — free mock papers for:

JEE Main, NEET, BITSAT, VIT, EAMCET/APEAMCET, KCET, MHT-CET, WBJEE, TNEA, UPSEE, COMEDK, GUJCET, OJEE

10 papers per exam. Timer, score, section-wise analysis after each test.

AI that explains wrong answers — not just the answer key, but the actual concept you got wrong.

Completely free. No Byjus subscription, no Toppr paywall.

Link in first comment. Drop a comment if a paper has errors.`,
  },
  {
    sub: 'neetpreparation',
    title: 'Free NEET practice — AI explains WHY your answer is wrong with the actual biology/chemistry concept',
    body: `Most NEET platforms mark your wrong answers and move on.

Built Syllab — free NEET prep:
- Chapter-wise Biology, Physics, Chemistry MCQ practice
- AI tutor explains wrong answers with the actual biological concept behind it
- 10 full free NEET mock papers
- Works on any phone browser

NEET Biology is 50% of your marks and needs deep conceptual clarity, not just memorization.

Link in first comment. Feedback welcome on which chapters need more questions.`,
  },
  {
    sub: 'indianteens',
    title: 'Anyone else frustrated that every "free" study app has a paywall after 2 questions? Built one that\'s actually free',
    body: `I close any app the second it says "Unlock Premium to see the answer."

Built syllab.in where everything is actually free:
- MCQ practice for Classes 5-12 (CBSE), chapter-wise
- AI tutor that explains wrong answers
- Mock tests for JEE, NEET, state exams (10 papers each)
- Daily challenges with leaderboard
- Coding lab — Python, JS, HTML/CSS + 200 challenges
- GK Quiz with 180+ questions, generates new random sets
- Fun Facts section that makes GK actually interesting

Login only needed to save progress.

Link in first comment. What would make you actually keep using something like this?`,
  },
  {
    sub: 'india',
    title: 'Built a free study platform for Indian students — Class 5 to JEE/NEET, no paywall, no pro tier',
    body: `Coaching costs Rs 2,000-8,000/month per subject. For families with 2-3 kids studying, that's out of reach.

Built Syllab (syllab.in) for this gap. Everything free:
- CBSE chapter-wise practice (Classes 5-12) with AI explanations
- JEE Main, NEET, BITSAT, EAMCET, WBJEE, KCET + 8 more state mock tests
- Coding lab — Python, JavaScript, HTML/CSS tutorials
- GK Quiz — 180+ questions across History, Geography, Polity, Science, Current Affairs
- Parent dashboard — create custom tests for your child, track progress
- Works on any Android phone browser

No paid plan. No pro tier.

Link in first comment. Happy to answer questions.`,
  },
  {
    sub: 'learnprogramming',
    title: 'Free coding platform for Indian school students — Python/JS/HTML tutorials, 200+ challenges, mini projects',
    body: `Built Syllab coding lab for students who want to learn CS but can't afford paid platforms.

What's there:
- Python, JavaScript, HTML/CSS, Java, SQL, React tutorials with live in-browser code editor
- 200+ coding challenges from beginner to advanced
- Mini project gallery — guided step-by-step builds
- Aptitude prep for campus placements
- AI tutor to explain errors in your code

Aimed at Class 8-12 students and engineering freshers in India. Works in browser, no install needed.

Link in first comment.`,
  },
];

function openUrl(url) {
  // Windows
  exec(`start "" "${url}"`);
}

console.log('\nOpening Reddit submission pages...');
console.log('Each tab opens pre-filled with the title.');
console.log('For each tab: paste the body below, then click Submit.\n');
console.log('='.repeat(55));

POSTS.forEach(({ sub, title, body }, i) => {
  const url = `https://www.reddit.com/r/${sub}/submit?selftext=true&title=${encodeURIComponent(title)}`;

  // Stagger tab opening by 1s each so browser doesn't block them
  setTimeout(() => {
    console.log(`\n[${i + 1}] r/${sub}`);
    console.log(`    ${url.slice(0, 80)}...`);
    console.log('\n--- PASTE THIS BODY ---');
    console.log(body);
    console.log('--- AFTER SUBMITTING, ADD THIS AS YOUR FIRST COMMENT ---');
    console.log('Link: https://syllab.in');
    console.log('-'.repeat(40));
    openUrl(url);
  }, i * 1500);
});

setTimeout(() => {
  console.log('\n\nAll 6 tabs opened!');
  console.log('Go through each tab, paste the body shown above, and click Submit.');
  console.log('After each post, add a comment with: https://syllab.in');
}, POSTS.length * 1500 + 500);
