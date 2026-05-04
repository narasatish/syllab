import { Chapter, Difficulty, Question } from "../types";

export const QUESTIONS_PER_CHAPTER = 300;

const EXAM_PATTERNS = [
  "CBSE",
  "NCERT",
  "School Practice",
  "JEE Main",
  "JEE Advanced",
  "NEET",
  "BITSAT",
  "VITEEE",
  "KCET",
  "MHT-CET",
  "NDA",
  "Olympiad",
];

const DISTRACTORS: Record<string, string[]> = {
  Mathematics: [
    "Guessing without writing the steps",
    "Skipping units and labels",
    "Copying the final answer only",
    "Ignoring the question condition",
  ],
  Physics: [
    "Changing the formula before reading the data",
    "Ignoring units",
    "Treating every quantity as scalar",
    "Skipping the diagram",
  ],
  Chemistry: [
    "Balancing only one side of the equation",
    "Ignoring valency or charge",
    "Memorising without observing the reaction",
    "Mixing up reactants and products",
  ],
  Biology: [
    "Skipping labelled diagrams",
    "Using unrelated examples",
    "Ignoring the function of the organ or cell",
    "Memorising spellings without meaning",
  ],
  Science: [
    "Writing a conclusion before observing",
    "Ignoring the activity result",
    "Using unrelated examples",
    "Skipping keywords and diagrams",
  ],
  English: [
    "Answering without reading the passage",
    "Ignoring the speaker or narrator",
    "Copying a sentence without understanding it",
    "Skipping vocabulary in context",
  ],
  "The World Around Us": [
    "Ignoring local observations",
    "Skipping maps and pictures",
    "Writing a fact without explaining it",
    "Avoiding the activity questions",
  ],
};

const questionStem = (chapter: Chapter, topic: string, index: number) => {
  const chapterLabel = `Class ${chapter.classLevel} ${chapter.subject} - ${chapter.title}`;

  if (chapter.subject === "English") {
    const stems = [
      `In ${chapterLabel}, which focus best helps with comprehension?`,
      `Which reading habit is most useful while studying "${chapter.title}"?`,
      `For a question on "${topic}", what should a student identify first?`,
    ];
    return stems[index % stems.length];
  }

  if (chapter.subject === "Science" || chapter.subject === "The World Around Us") {
    const stems = [
      `Which idea is most closely connected with "${topic}" in ${chapterLabel}?`,
      `What is the best first step when learning "${chapter.title}"?`,
      `A student is revising "${topic}". Which approach fits the NCERT chapter best?`,
    ];
    return stems[index % stems.length];
  }

  const stems = [
    `Which concept is the best starting point for a question from ${chapterLabel}?`,
    `A student is solving a problem on "${topic}". What should they focus on first?`,
    `Which NCERT idea is most directly linked with "${chapter.title}"?`,
  ];
  return stems[index % stems.length];
};

const rotateOptions = (options: string[], correctIndex: number) => {
  const rotated = [...options];
  const [correct] = rotated.splice(0, 1);
  rotated.splice(correctIndex, 0, correct);
  return rotated.slice(0, 4);
};

const makeQuestion = (chapter: Chapter, index: number): Question => {
  const topic = chapter.topics[index % chapter.topics.length] || chapter.title;
  const difficulty: Difficulty = index < 100 ? "easy" : index < 200 ? "medium" : "hard";
  const correctIndex = index % 4;
  const distractors = DISTRACTORS[chapter.subject] ?? DISTRACTORS.Mathematics;
  const correctOption = `${topic}`;
  const options = rotateOptions([correctOption, ...distractors], correctIndex);
  const examPattern = EXAM_PATTERNS[index % EXAM_PATTERNS.length];

  return {
    id: `q-${chapter.id}-${index}`,
    subject: chapter.subject,
    chapter_id: chapter.id,
    chapter_name: chapter.title,
    question_text: questionStem(chapter, topic, index),
    options,
    correct_index: correctIndex,
    explanation:
      `The chapter "${chapter.title}" is best revised by connecting the question to "${topic}". ` +
      "Read the NCERT example or activity, name the concept, and then answer in your own words.",
    difficulty,
    points: difficulty === "hard" ? 100 : difficulty === "medium" ? 50 : 20,
    exam_type_tags: [examPattern, "NCERT", `Class ${chapter.classLevel}`],
  };
};

export function generateQuestions(chapters: Chapter[]): Question[] {
  const generated = chapters.flatMap((chapter) =>
    Array.from({ length: QUESTIONS_PER_CHAPTER }, (_, index) => makeQuestion(chapter, index)),
  );

  return [...CORE_QUESTIONS, ...generated];
}

export const CORE_QUESTIONS: Question[] = [
  {
    id: "core-5-math-fractions-1",
    subject: "Mathematics",
    chapter_id: "5-math-2-fractions",
    chapter_name: "Fractions",
    question_text: "Which fraction represents one out of four equal parts?",
    options: ["1/4", "1/2", "3/4", "4/1"],
    correct_index: 0,
    explanation: "One part out of four equal parts is written as 1/4.",
    difficulty: "easy",
    points: 20,
    exam_type_tags: ["CBSE", "NCERT", "Class 5"],
  },
  {
    id: "core-6-science-magnets-1",
    subject: "Science",
    chapter_id: "6-sci-4-exploring-magnets",
    chapter_name: "Exploring Magnets",
    question_text: "Which material is most likely to be attracted by a magnet?",
    options: ["Iron nail", "Wooden pencil", "Plastic scale", "Paper sheet"],
    correct_index: 0,
    explanation: "Magnets attract magnetic materials such as iron, nickel, and cobalt.",
    difficulty: "easy",
    points: 20,
    exam_type_tags: ["CBSE", "NCERT", "Class 6"],
  },
  {
    id: "core-7-science-electricity-1",
    subject: "Science",
    chapter_id: "7-sci-3-electricity-circuits-and",
    chapter_name: "Electricity: Circuits and their Components",
    question_text: "In a simple closed circuit, why does the bulb glow?",
    options: [
      "Electric current flows through the bulb",
      "The switch blocks the battery",
      "The wire becomes invisible",
      "The bulb does not need a cell",
    ],
    correct_index: 0,
    explanation: "A closed circuit gives current a complete path through the bulb, so the bulb glows.",
    difficulty: "medium",
    points: 50,
    exam_type_tags: ["CBSE", "NCERT", "Class 7"],
  },
  {
    id: "core-9-science-cell-1",
    subject: "Science",
    chapter_id: "9-sci-2-cell-the-building-block",
    chapter_name: "Cell: The Building Block of Life",
    question_text: "Why is the cell called the basic structural and functional unit of life?",
    options: [
      "All living bodies are made of cells and cells perform life functions",
      "Cells are always visible to the naked eye",
      "Cells are found only in plants",
      "Cells do not contain any parts",
    ],
    correct_index: 0,
    explanation:
      "Cells form the body of living organisms and carry out essential processes such as nutrition, respiration, and growth.",
    difficulty: "medium",
    points: 50,
    exam_type_tags: ["CBSE", "NCERT", "Class 9"],
  },
  {
    id: "jee-phy-1",
    subject: "Physics",
    chapter_id: "12-phy-1",
    chapter_name: "Electrostatics",
    question_text:
      "Two point charges +q and -q are placed symmetrically about the origin on the z-axis. What is the electric potential at any point on the z = 0 plane?",
    options: ["Zero", "Infinite", "q / 4 pi epsilon0 r", "Depends only on mass"],
    correct_index: 0,
    explanation:
      "Every point on the equatorial plane is equidistant from +q and -q, so the positive and negative potentials cancel.",
    difficulty: "hard",
    points: 100,
    exam_type_tags: ["JEE Main", "JEE Advanced", "NCERT"],
  },
  {
    id: "neet-bio-1",
    subject: "Biology",
    chapter_id: "11-bio-1",
    chapter_name: "Animal Kingdom",
    question_text: "Radial symmetry is commonly found in which group?",
    options: ["Coelenterata", "Annelida", "Arthropoda", "Platyhelminthes"],
    correct_index: 0,
    explanation:
      "Coelenterates such as jellyfish show radial symmetry, where body parts are arranged around a central axis.",
    difficulty: "hard",
    points: 80,
    exam_type_tags: ["NEET", "NCERT"],
  },
];
