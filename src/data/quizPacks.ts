// Live Quiz content packs — Kahoot-style multiplayer quizzes for Syllab.
// Each pack is a short, fast-paced set used in the /live-quiz host→join game.
// `answer` is the 0-based index of the correct option. Keep questions
// unambiguous and factual (used live in classrooms).

export interface LiveQuestion {
  q: string;
  options: string[]; // exactly 4
  answer: number;    // 0-3
}

export interface QuizPack {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  classBand: string; // shown as a chip, e.g. "Class 6-10"
  questions: LiveQuestion[];
}

export const QUIZ_PACKS: QuizPack[] = [
  {
    id: 'gk-india',
    title: 'India GK Showdown',
    emoji: '🇮🇳',
    blurb: 'Fast general-knowledge questions about India.',
    classBand: 'Class 5-10',
    questions: [
      { q: 'Which is the longest river in India?', options: ['Yamuna', 'Ganga', 'Godavari', 'Narmada'], answer: 1 },
      { q: 'How many states does India have (2026)?', options: ['28', '29', '27', '30'], answer: 0 },
      { q: 'The Indian national anthem was written by?', options: ['Bankim Chandra', 'Rabindranath Tagore', 'Sarojini Naidu', 'Subhash Bose'], answer: 1 },
      { q: 'Which city is called the "Pink City"?', options: ['Udaipur', 'Jodhpur', 'Jaipur', 'Bikaner'], answer: 2 },
      { q: 'The currency of India is the Indian…?', options: ['Dollar', 'Rupee', 'Taka', 'Rupiah'], answer: 1 },
      { q: 'Which is the highest mountain peak in India?', options: ['Nanda Devi', 'Kanchenjunga', 'K2', 'Everest'], answer: 1 },
      { q: 'National animal of India?', options: ['Lion', 'Elephant', 'Bengal Tiger', 'Leopard'], answer: 2 },
      { q: 'In which year did India gain independence?', options: ['1947', '1950', '1945', '1942'], answer: 0 },
    ],
  },
  {
    id: 'science-10',
    title: 'Science Sprint',
    emoji: '🔬',
    blurb: 'Core science facts for upper-primary & secondary.',
    classBand: 'Class 8-10',
    questions: [
      { q: 'Chemical symbol for Gold?', options: ['Gd', 'Go', 'Au', 'Ag'], answer: 2 },
      { q: 'Which gas do plants absorb for photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], answer: 2 },
      { q: 'The powerhouse of the cell is the…?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Vacuole'], answer: 2 },
      { q: 'Speed of light is approximately?', options: ['3×10⁵ km/s', '3×10⁸ m/s', '3×10⁶ m/s', '3×10⁴ km/s'], answer: 1 },
      { q: 'pH value of a neutral solution?', options: ['0', '7', '14', '1'], answer: 1 },
      { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Mercury'], answer: 2 },
      { q: 'Unit of electric current?', options: ['Volt', 'Watt', 'Ampere', 'Ohm'], answer: 2 },
      { q: 'Water boils at what temperature (sea level)?', options: ['90°C', '100°C', '110°C', '80°C'], answer: 1 },
    ],
  },
  {
    id: 'maths-quick',
    title: 'Maths Lightning',
    emoji: '➗',
    blurb: 'Quick mental-maths and concept questions.',
    classBand: 'Class 6-9',
    questions: [
      { q: 'What is 15% of 200?', options: ['25', '30', '35', '20'], answer: 1 },
      { q: 'The value of π (pi) up to 2 decimals?', options: ['3.41', '3.14', '3.12', '3.16'], answer: 1 },
      { q: 'A right angle measures?', options: ['45°', '90°', '180°', '60°'], answer: 1 },
      { q: 'What is 7 × 8?', options: ['54', '56', '64', '48'], answer: 1 },
      { q: 'Square root of 144?', options: ['11', '12', '13', '14'], answer: 1 },
      { q: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], answer: 1 },
      { q: 'LCM of 4 and 6?', options: ['12', '24', '8', '10'], answer: 0 },
      { q: 'What is 3³ (3 cubed)?', options: ['9', '27', '6', '81'], answer: 1 },
    ],
  },
  {
    id: 'reasoning',
    title: 'Brain Teasers & Logic',
    emoji: '🧩',
    blurb: 'Aptitude and logical-reasoning warm-ups.',
    classBand: 'Class 6-10',
    questions: [
      { q: 'Find the next number: 2, 4, 8, 16, …', options: ['24', '32', '20', '18'], answer: 1 },
      { q: 'If CAT = 3-1-20, what is DOG?', options: ['4-15-7', '4-14-7', '3-15-7', '4-15-8'], answer: 0 },
      { q: 'Odd one out: Apple, Mango, Carrot, Banana', options: ['Apple', 'Mango', 'Carrot', 'Banana'], answer: 2 },
      { q: 'Complete: Monday, Wednesday, Friday, …', options: ['Saturday', 'Sunday', 'Thursday', 'Tuesday'], answer: 1 },
      { q: 'How many months have 28 days?', options: ['1', '2', '6', '12'], answer: 3 },
      { q: 'Next letter: A, C, E, G, …', options: ['H', 'I', 'J', 'K'], answer: 1 },
      { q: 'If 5 pens cost ₹50, what do 3 pens cost?', options: ['₹25', '₹30', '₹35', '₹15'], answer: 1 },
      { q: 'Which is heavier: 1 kg cotton or 1 kg iron?', options: ['Cotton', 'Iron', 'Both equal', 'Cannot say'], answer: 2 },
    ],
  },
  {
    id: 'computers',
    title: 'Computers & Coding',
    emoji: '💻',
    blurb: 'Digital literacy and beginner coding concepts.',
    classBand: 'Class 5-10',
    questions: [
      { q: 'What does CPU stand for?', options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Power Unit'], answer: 1 },
      { q: 'Which of these is a programming language?', options: ['Python', 'Cobra', 'Tiger', 'Panther'], answer: 0 },
      { q: '1 kilobyte (KB) equals how many bytes?', options: ['100', '1000', '1024', '512'], answer: 2 },
      { q: 'What does "www" stand for?', options: ['World Wide Web', 'Web World Wide', 'Wide World Web', 'World Web Wide'], answer: 0 },
      { q: 'Which key deletes the character to the left?', options: ['Enter', 'Backspace', 'Shift', 'Tab'], answer: 1 },
      { q: 'HTML is used to build…?', options: ['Web pages', 'Robots', 'Cars', 'Songs'], answer: 0 },
      { q: 'A set of step-by-step instructions is called?', options: ['Loop', 'Algorithm', 'Variable', 'Pixel'], answer: 1 },
      { q: 'Which company makes the Android OS?', options: ['Apple', 'Microsoft', 'Google', 'Samsung'], answer: 2 },
    ],
  },
  {
    id: 'english',
    title: 'English Wordplay',
    emoji: '📖',
    blurb: 'Grammar, vocabulary and spelling quickfire.',
    classBand: 'Class 5-9',
    questions: [
      { q: 'Which is a noun?', options: ['Run', 'Happiness', 'Quickly', 'Blue'], answer: 1 },
      { q: 'Opposite (antonym) of "ancient"?', options: ['Old', 'Modern', 'Historic', 'Past'], answer: 1 },
      { q: 'Correct spelling?', options: ['Recieve', 'Receive', 'Receeve', 'Receve'], answer: 1 },
      { q: 'Plural of "child"?', options: ['Childs', 'Childes', 'Children', 'Childrens'], answer: 2 },
      { q: 'A synonym of "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], answer: 1 },
      { q: 'Which word is an adjective?', options: ['Beautiful', 'Sing', 'They', 'Under'], answer: 0 },
      { q: 'Past tense of "go"?', options: ['Goed', 'Gone', 'Went', 'Going'], answer: 2 },
      { q: 'Choose the article: "___ honest man"', options: ['A', 'An', 'The', 'No article'], answer: 1 },
    ],
  },
];

export function getPack(id: string): QuizPack | undefined {
  return QUIZ_PACKS.find((p) => p.id === id);
}
