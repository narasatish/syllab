/**
 * Static data for the Study Room — quotes, exam countdowns, study tips and
 * break ideas. All client-side, zero cost. (Soundscapes live in lib/ambience.ts.)
 *
 * Exam dates are EXPECTED windows (clearly labelled in the UI) — update each cycle.
 */

export interface StudyQuote { text: string; author: string; }

/** Short, punchy motivational quotes — shown in the animated rotating banner. */
export const STUDY_QUOTES: StudyQuote[] = [
  { text: 'The expert in anything was once a beginner.', author: 'Helen Hayes' },
  { text: 'Success is the sum of small efforts repeated day in and day out.', author: 'Robert Collier' },
  { text: "Don't watch the clock; do what it does. Keep going.", author: 'Sam Levenson' },
  { text: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
  { text: 'Believe you can and you are halfway there.', author: 'Theodore Roosevelt' },
  { text: 'Push yourself, because no one else is going to do it for you.', author: 'Unknown' },
  { text: 'Small progress is still progress.', author: 'Unknown' },
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Your only limit is your mind.', author: 'Unknown' },
  { text: 'A little progress each day adds up to big results.', author: 'Unknown' },
  { text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' },
  { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Augusta F. Kantra' },
  { text: 'Dreams don’t work unless you do.', author: 'John C. Maxwell' },
  { text: 'The future depends on what you do today.', author: 'Mahatma Gandhi' },
  { text: 'Arise, awake, and stop not till the goal is reached.', author: 'Swami Vivekananda' },
  { text: 'Hard work beats talent when talent doesn’t work hard.', author: 'Tim Notke' },
  { text: 'Continuous effort, not strength or intelligence, unlocks our potential.', author: 'Winston Churchill' },
  { text: 'You don’t have to be great to start, but you have to start to be great.', author: 'Zig Ziglar' },
  { text: 'Concentrate all your thoughts upon the work at hand.', author: 'Alexander Graham Bell' },
  { text: 'Every accomplishment starts with the decision to try.', author: 'Unknown' },
];

export interface ExamCountdown { name: string; date: string; emoji: string; }

/** Upcoming major Indian exams (EXPECTED dates — shown with an "expected" tag). */
export const EXAM_COUNTDOWNS: ExamCountdown[] = [
  { name: 'CBSE Class 10 & 12 Boards', date: '2027-02-15', emoji: '📝' },
  { name: 'JEE Main (Session 1)', date: '2027-01-24', emoji: '🧮' },
  { name: 'NEET UG', date: '2027-05-02', emoji: '🩺' },
];

/** "Points to remember" — study-science nudges shown as gentle animated popups. */
export const STUDY_TIPS: string[] = [
  'Active recall beats re-reading. Close the book and write what you remember.',
  'Spaced repetition: review today, in 2 days, in a week. Memory loves spacing.',
  'Teach it out loud as if explaining to a friend — gaps show up fast.',
  'Hard topic first, while your focus is freshest. Save easy revision for later.',
  'One tab, one task. Every extra open tab is a tiny tax on your attention.',
  'Hydrate. Even mild dehydration drops concentration — keep water near you.',
  'After each topic, write a 2-line summary in your own words.',
  'Practice questions > highlighting. Output builds memory; input alone does not.',
  'Sleep is study. Memories consolidate overnight — never trade sleep for cramming.',
  'Stuck for 10 min? Ask, move on, come back. Frustration kills retention.',
  'Phone in another room. Out of sight genuinely means out of mind.',
  'Reward finished blocks — a snack, a stretch, a song. Your brain repeats what it enjoys.',
  'Study the same subject at the same time daily — your brain pre-loads focus.',
  'Explain the "why", not just the "what". Understanding sticks; memorising fades.',
  'Two short sessions beat one long one. Breaks are when memories settle.',
];

/** Quick, healthy things to do during a break — shown on the break screen. */
export const BREAK_IDEAS: string[] = [
  'Look 20 feet away for 20 seconds — rest your eyes. 👀',
  'Stand up and stretch your arms overhead. 🙆',
  'Drink some water. 💧',
  'Take 5 slow deep breaths. 🌬️',
  'Walk to another room and back. 🚶',
  'Roll your shoulders and relax your jaw. 💆',
  'Look out of a window at something green. 🌿',
  'Do 10 jumping jacks to wake up your brain. 🤸',
];
