/**
 * Grammar lessons — NCERT-aligned, explained visually (not coding-style).
 * Each lesson has: title, what/why/examples, common mistakes, mini-quiz.
 */
import type { Level } from './readingData';

export interface GrammarQuiz {
  text: string;
  options: string[];
  correct: number;
}

export interface GrammarLesson {
  id: number;
  title: string;
  whatIs: string;        // simple plain-English explanation
  examples: string[];    // bullet-point examples
  rule?: string;         // key rule in a box
  commonMistake?: string;
  quiz: GrammarQuiz[];
}

export const grammarBasic: GrammarLesson[] = [
  {
    id: 1, title: 'Nouns — Naming Words',
    whatIs: 'A noun is a NAMING word. It names a person, place, thing, animal, or idea.',
    examples: ['Person → mother, teacher, Ravi', 'Place → school, park, India', 'Thing → pencil, book, kite', 'Animal → dog, lion, parrot'],
    rule: 'If you can put "the" or "a/an" before a word, it is usually a noun: the school, a pencil.',
    quiz: [
      { text: 'Which word is a noun?', options: ['run', 'beautiful', 'table', 'quickly'], correct: 2 },
      { text: 'Find the noun: "Riya plays in the park."', options: ['plays', 'park', 'in', 'the'], correct: 1 },
    ],
  },
  {
    id: 2, title: 'Verbs — Action Words',
    whatIs: 'A verb shows ACTION (running, eating) or BEING (is, am, are).',
    examples: ['Action → run, jump, eat, sleep, sing', 'Being → I am, you are, she is', 'Sense → hear, see, feel, smell'],
    rule: 'Every complete sentence MUST have a verb. "The dog." is not a sentence. "The dog barks." is!',
    quiz: [
      { text: 'Which is a verb?', options: ['apple', 'jump', 'happy', 'small'], correct: 1 },
      { text: 'Find the verb: "She sings beautifully."', options: ['She', 'sings', 'beautifully', 'song'], correct: 1 },
    ],
  },
  {
    id: 3, title: 'Adjectives — Describing Words',
    whatIs: 'An adjective DESCRIBES a noun. It tells us more about size, colour, shape, or quality.',
    examples: ['Size → big, small, tall, tiny', 'Colour → red, blue, golden', 'Quality → kind, brave, lazy'],
    rule: 'Adjectives usually come BEFORE the noun: a RED ball, a TALL boy.',
    commonMistake: '✗ "A dress beautiful" → ✓ "A beautiful dress" (adjective before noun).',
    quiz: [
      { text: 'Which is an adjective?', options: ['quickly', 'beautiful', 'table', 'run'], correct: 1 },
      { text: 'Find the adjective: "The brave soldier won."', options: ['soldier', 'brave', 'won', 'the'], correct: 1 },
    ],
  },
  {
    id: 4, title: 'Simple Present Tense',
    whatIs: 'Use this tense for things that happen regularly or are always true.',
    examples: ['Habit → I brush my teeth daily.', 'Fact → The sun rises in the east.', 'Routine → School starts at 8 am.'],
    rule: 'Add -s/-es for HE/SHE/IT: I eat → she eats. I go → he goes.',
    commonMistake: '✗ "She eat apples." → ✓ "She eats apples."',
    quiz: [
      { text: 'Which sentence is in simple present?', options: ['I am eating now.', 'I eat breakfast daily.', 'I ate yesterday.', 'I will eat soon.'], correct: 1 },
      { text: 'Complete: "He ___ to school every day."', options: ['go', 'goes', 'going', 'gone'], correct: 1 },
    ],
  },
  {
    id: 5, title: 'Singular & Plural',
    whatIs: 'Singular = ONE. Plural = MORE than one.',
    examples: ['cat → cats', 'bus → buses', 'baby → babies (y → ies)', 'child → children (irregular)', 'foot → feet (irregular)'],
    rule: 'Most words: add -s. Words ending in -s/-x/-ch/-sh: add -es. Words ending in consonant+y: change y → ies.',
    quiz: [
      { text: 'Plural of "baby"?', options: ['babys', 'babies', 'babyes', 'babys\''], correct: 1 },
      { text: 'Plural of "child"?', options: ['childs', 'childes', 'children', 'childies'], correct: 2 },
    ],
  },
  {
    id: 6, title: 'Pronouns — Replacing Nouns',
    whatIs: 'Pronouns are short words that REPLACE nouns so we don\'t have to repeat them.',
    examples: ['I, you → speaker/listener', 'he, she, it → other person/thing', 'we, they → groups', 'Riya is smart. SHE reads well.'],
    rule: 'Match the pronoun to the noun: a boy → HE, a girl → SHE, an object → IT, many people → THEY.',
    quiz: [
      { text: 'What pronoun replaces "the boys"?', options: ['He', 'It', 'They', 'She'], correct: 2 },
      { text: 'Choose: "Lila is happy because ___ won a prize."', options: ['he', 'she', 'it', 'they'], correct: 1 },
    ],
  },
  {
    id: 7, title: 'Prepositions of Place',
    whatIs: 'Small words that tell us WHERE something is.',
    examples: ['IN → inside (in the box)', 'ON → on top of (on the table)', 'UNDER → below (under the chair)', 'BEHIND → at the back (behind the door)'],
    rule: 'Think about the picture in your mind. Where is the object? That tells you the preposition.',
    quiz: [
      { text: 'Complete: "The bird is ___ the tree."', options: ['in', 'on', 'under', 'behind'], correct: 1 },
      { text: 'Complete: "The ball is ___ the box (inside)."', options: ['in', 'on', 'under', 'behind'], correct: 0 },
    ],
  },
  {
    id: 8, title: 'Question Words (5W + 1H)',
    whatIs: 'Six magic words to ask questions: What, Where, Who, Why, When, How.',
    examples: ['What → thing (What is your name?)', 'Where → place (Where do you live?)', 'Who → person (Who is your teacher?)', 'Why → reason (Why are you late?)', 'When → time (When is the exam?)', 'How → manner (How are you?)'],
    quiz: [
      { text: 'Which word asks for a reason?', options: ['What', 'Where', 'Why', 'How'], correct: 2 },
      { text: 'Which word asks for a place?', options: ['When', 'Where', 'Who', 'Why'], correct: 1 },
    ],
  },
  {
    id: 9, title: 'Conjunctions — Joining Words',
    whatIs: 'Conjunctions JOIN words or sentences together.',
    examples: ['AND → adds (apples AND oranges)', 'BUT → shows opposite (small BUT strong)', 'OR → gives choice (tea OR coffee)', 'BECAUSE → gives reason (I am happy BECAUSE I won)'],
    quiz: [
      { text: 'Complete: "I like apples ___ oranges."', options: ['but', 'or', 'and', 'because'], correct: 2 },
      { text: 'Complete: "She is small ___ very brave."', options: ['and', 'but', 'or', 'because'], correct: 1 },
    ],
  },
  {
    id: 10, title: 'Capital Letters & Full Stops',
    whatIs: 'Every sentence STARTS with a capital letter and ENDS with a full stop (.), question mark (?), or exclamation mark (!).',
    examples: ['Statement → I am happy.', 'Question → Are you ready?', 'Exclamation → What a day!', 'Names → Rahul, India, Monday (always capital)'],
    rule: 'Names of people, places, days, and months ALWAYS start with a capital letter.',
    quiz: [
      { text: 'Which sentence is correct?', options: ['i am happy.', 'I am happy.', 'I am happy', 'i am happy'], correct: 1 },
      { text: 'Which is the right end mark for: "Are you ready"', options: ['.', '?', '!', ','], correct: 1 },
    ],
  },
];

export const grammarIntermediate: GrammarLesson[] = [
  {
    id: 1, title: 'Simple Past Tense',
    whatIs: 'Use this tense for actions that finished in the past.',
    examples: ['Regular → walk → walked, play → played', 'Irregular → go → went, eat → ate, see → saw'],
    rule: 'Most verbs: add -ed. Many common verbs have irregular past forms — memorise them!',
    commonMistake: '✗ "Yesterday I goed to school." → ✓ "Yesterday I went to school."',
    quiz: [
      { text: 'Which is in past tense?', options: ['I eat pizza.', 'I ate pizza.', 'I will eat pizza.', 'I am eating pizza.'], correct: 1 },
      { text: 'Past of "see"?', options: ['seed', 'saw', 'seen', 'sawed'], correct: 1 },
    ],
  },
  {
    id: 2, title: 'Simple Future Tense',
    whatIs: 'Use "will" or "shall" + base verb for actions in the future.',
    examples: ['I will visit grandma tomorrow.', 'She will call you later.', 'They will reach by evening.'],
    rule: '"Will" works for ALL subjects (I, you, he, she, we, they).',
    quiz: [
      { text: 'Complete: "She ___ call you later."', options: ['is', 'will', 'was', 'has'], correct: 1 },
      { text: 'Which is future tense?', options: ['I went home.', 'I am going home.', 'I will go home.', 'I go home.'], correct: 2 },
    ],
  },
  {
    id: 3, title: 'Present Continuous Tense',
    whatIs: 'For actions happening RIGHT NOW. Use am/is/are + verb+ing.',
    examples: ['I am reading.', 'She is cooking.', 'They are playing cricket.'],
    rule: 'Signal words: now, at the moment, right now, currently, look! listen!',
    quiz: [
      { text: 'Complete: "Look! It ___ outside."', options: ['rains', 'is raining', 'rained', 'will rain'], correct: 1 },
      { text: 'Complete: "I ___ my homework right now."', options: ['do', 'am doing', 'did', 'will do'], correct: 1 },
    ],
  },
  {
    id: 4, title: 'Past Continuous Tense',
    whatIs: 'For actions that were IN PROGRESS at some moment in the past.',
    examples: ['I WAS WATCHING TV when the phone rang.', 'They WERE PLAYING when it started raining.'],
    rule: 'Use was/were + verb+ing. Often paired with "when" + simple past.',
    quiz: [
      { text: 'Complete: "While I ___ dinner, the lights went out."', options: ['cook', 'was cooking', 'cooked', 'will cook'], correct: 1 },
    ],
  },
  {
    id: 5, title: 'Comparative & Superlative',
    whatIs: 'Comparative compares TWO things. Superlative compares THREE OR MORE.',
    examples: ['tall → taller → tallest', 'big → bigger → biggest (double letter)', 'happy → happier → happiest (y → i)', 'beautiful → more beautiful → most beautiful (long word)', 'good → better → best (irregular)'],
    rule: 'Short words add -er/-est. Long words use more/most. Some are irregular.',
    quiz: [
      { text: 'Comparative of "good"?', options: ['gooder', 'better', 'best', 'more good'], correct: 1 },
      { text: 'Superlative of "happy"?', options: ['happiest', 'happyest', 'most happy', 'happyer'], correct: 0 },
    ],
  },
  {
    id: 6, title: 'Adverbs — Describing Verbs',
    whatIs: 'Adverbs describe verbs. Most end with -ly. They tell us HOW something happens.',
    examples: ['quickly, slowly, carefully, beautifully', 'She sings beautifully.', 'He walks slowly.'],
    rule: 'Add -ly to an adjective to make an adverb: quick → quickly, careful → carefully.',
    quiz: [
      { text: 'Complete: "She sings ___."', options: ['beautiful', 'beautifully', 'beauty', 'beautify'], correct: 1 },
    ],
  },
  {
    id: 7, title: 'Prepositions of Time (at, on, in)',
    whatIs: 'These tiny words tell us WHEN something happens.',
    examples: ['AT → specific time (at 5 PM, at night)', 'ON → days/dates (on Monday, on 15 August)', 'IN → months/years/seasons (in July, in 2026, in summer)'],
    rule: 'Time → AT | Day → ON | Month/Year → IN.',
    quiz: [
      { text: 'Complete: "I was born ___ 2010."', options: ['at', 'on', 'in', 'by'], correct: 2 },
      { text: 'Complete: "The party is ___ Saturday."', options: ['at', 'on', 'in', 'by'], correct: 1 },
    ],
  },
  {
    id: 8, title: 'Active & Passive Voice',
    whatIs: 'ACTIVE: subject does the action. PASSIVE: subject receives the action.',
    examples: ['Active → The cat chased the mouse.', 'Passive → The mouse was chased by the cat.'],
    rule: 'To make passive: object becomes subject + form of "be" + past participle (+ "by" + doer).',
    quiz: [
      { text: 'Convert to passive: "The boy eats an apple."', options: ['An apple is eaten by the boy.', 'An apple was eaten by the boy.', 'The boy is eaten by an apple.', 'Apple eats the boy.'], correct: 0 },
    ],
  },
  {
    id: 9, title: 'Direct & Indirect Speech',
    whatIs: 'Direct = quoting exact words ("..."). Indirect = reporting without quotes, change tense back.',
    examples: ['Direct → She said, "I am happy."', 'Indirect → She said that she was happy.'],
    rule: 'In indirect speech: remove quotes, shift tense one step back, change pronouns.',
    quiz: [
      { text: 'Convert: "I like ice cream," he said.', options: ['He said that he liked ice cream.', 'He said that I liked ice cream.', 'He said that he likes ice cream.', 'He liked ice cream said he.'], correct: 0 },
    ],
  },
  {
    id: 10, title: 'Conditionals (Type 1 — Real Future)',
    whatIs: 'For real, possible situations. Use IF + simple present, WILL + base verb.',
    examples: ['If it rains, we will stay home.', 'If you study hard, you will pass.', 'If she calls, I will answer.'],
    rule: 'IF clause = present tense | MAIN clause = will + verb.',
    commonMistake: '✗ "If it will rain..." → ✓ "If it rains..."',
    quiz: [
      { text: 'Complete: "If she ___ hard, she will pass."', options: ['study', 'studies', 'will study', 'studied'], correct: 1 },
    ],
  },
];

export const grammarAdvanced: GrammarLesson[] = [
  {
    id: 1, title: 'Conditionals Type 2 & 3 — Unreal Situations',
    whatIs: 'Type 2: imaginary present/future ("If I were rich"). Type 3: imaginary past ("If I had known").',
    examples: ['Type 2 → If I were rich, I would travel the world.', 'Type 3 → If I had known, I would have helped you.'],
    rule: 'Type 2 = If + past simple, would + verb. Type 3 = If + past perfect, would have + past participle.',
    quiz: [
      { text: 'Complete (Type 2): "If I ___ you, I would apologise."', options: ['am', 'were', 'was', 'be'], correct: 1 },
      { text: 'Complete (Type 3): "If she ___ harder, she ___ passed."', options: ['studied / would', 'had studied / would have', 'studies / will have', 'study / would'], correct: 1 },
    ],
  },
  {
    id: 2, title: 'Passive Voice — All Tenses',
    whatIs: 'Passive shifts focus from doer to action. The form of "be" changes based on tense.',
    examples: ['Present → The book is read.', 'Past → The book was read.', 'Future → The book will be read.', 'Present Perfect → The book has been read.'],
    rule: 'All passives = (form of be) + past participle. The tense of "be" matches the original tense.',
    quiz: [
      { text: 'Passive of "They have built a new school."', options: ['A new school has been built.', 'A new school was built.', 'A new school is built.', 'A new school will be built.'], correct: 0 },
    ],
  },
  {
    id: 3, title: 'Reported Speech — Questions & Commands',
    whatIs: 'For questions, use "asked if/whether/when..." For commands, use "told/asked + to + verb."',
    examples: ['Question → "Where do you live?" → She asked where I lived.', 'Command → "Sit down!" → He told me to sit down.', 'Negative command → "Don\'t shout." → She asked me not to shout.'],
    quiz: [
      { text: 'Convert: "Close the door," she said.', options: ['She told me to close the door.', 'She said close the door.', 'She told that close the door.', 'She closed the door.'], correct: 0 },
    ],
  },
  {
    id: 4, title: 'Modal Verbs',
    whatIs: 'Modals express possibility, ability, advice, obligation, or permission.',
    examples: ['can/could → ability ("I can swim.")', 'may/might → possibility ("It might rain.")', 'should/ought to → advice ("You should rest.")', 'must/have to → strong obligation ("You must wear a helmet.")'],
    rule: 'Modals never change form (no -s, no -ed). Always followed by base verb.',
    quiz: [
      { text: 'Which modal expresses strong obligation?', options: ['might', 'could', 'must', 'may'], correct: 2 },
    ],
  },
  {
    id: 5, title: 'Gerunds & Infinitives',
    whatIs: 'Gerund = verb+ing acting as a noun ("Swimming is fun"). Infinitive = to+verb ("I want to swim").',
    examples: ['Gerund → I enjoy READING. He stopped SMOKING.', 'Infinitive → I want TO READ. He decided TO LEAVE.', 'Some verbs take only gerund: enjoy, finish, avoid, mind.', 'Some take only infinitive: want, decide, hope, plan.'],
    quiz: [
      { text: 'Complete: "I look forward to ___ you."', options: ['meet', 'meeting', 'to meet', 'met'], correct: 1 },
      { text: 'Complete: "She decided ___ a doctor."', options: ['become', 'becoming', 'to become', 'becomes'], correct: 2 },
    ],
  },
  {
    id: 6, title: 'Subject-Verb Agreement (Tricky Cases)',
    whatIs: 'Subject and verb must agree in number. Watch out for collective nouns, "either/or", and "neither/nor".',
    examples: ['Everyone IS here. (not "are")', 'Neither the teacher nor the students ARE present. (verb agrees with closer subject)', 'The team IS playing well. (collective = singular usually)'],
    quiz: [
      { text: 'Complete: "Neither the teacher nor the students ___ present."', options: ['is', 'are', 'was', 'has'], correct: 1 },
    ],
  },
  {
    id: 7, title: 'Relative Clauses (who, which, that, whose)',
    whatIs: 'A relative clause adds extra information about a noun.',
    examples: ['The girl WHO won is my sister. (people → who)', 'The book WHICH I read was great. (things → which/that)', 'The boy WHOSE bike was stolen is sad. (possession → whose)'],
    rule: 'Defining clause = no commas (essential info). Non-defining = with commas (extra info).',
    quiz: [
      { text: 'Choose: "The book ___ I read was great."', options: ['who', 'whom', 'which', 'whose'], correct: 2 },
    ],
  },
  {
    id: 8, title: 'Inversion for Emphasis (Never, Rarely, Hardly)',
    whatIs: 'Move auxiliary verb BEFORE subject after negative adverbials for dramatic emphasis.',
    examples: ['NORMAL → I have never seen such beauty.', 'INVERTED → Never have I seen such beauty.', 'NORMAL → I had hardly arrived when the phone rang.', 'INVERTED → Hardly had I arrived when the phone rang.'],
    quiz: [
      { text: 'Correct form: ', options: ['Never I have seen such a mess.', 'Never have I seen such a mess.', 'I never have seen such a mess.', 'Never see I such a mess.'], correct: 1 },
    ],
  },
  {
    id: 9, title: 'Clauses of Purpose & Result',
    whatIs: 'Purpose = WHY (to, in order to, so that). Result = WHAT HAPPENED (so... that, such... that).',
    examples: ['Purpose → She studied hard SO THAT she could pass.', 'Result → It was SO cold THAT the river froze.', 'Result → He is SUCH a kind person THAT everyone loves him.'],
    quiz: [
      { text: 'Complete: "He spoke loudly ___ everyone could hear."', options: ['to', 'so that', 'in order to', 'such that'], correct: 1 },
    ],
  },
  {
    id: 10, title: 'Ellipsis & Substitution (Avoiding Repetition)',
    whatIs: 'Skilled writers use ellipsis (omitting words) and substitution (using do/so/one/ones) to avoid repetition.',
    examples: ['Ellipsis → "Can you help?" "I\'ll try to [help]."', 'Substitution → "I like coffee." "So DO I."', 'Substitution → "Which book?" "The red ONE."'],
    quiz: [
      { text: 'Complete: "She speaks French." "___ do I."', options: ['So', 'Neither', 'Also', 'Too'], correct: 0 },
    ],
  },
];

export function getGrammarByLevel(level: Level): GrammarLesson[] {
  if (level === 'basic') return grammarBasic;
  if (level === 'intermediate') return grammarIntermediate;
  return grammarAdvanced;
}
