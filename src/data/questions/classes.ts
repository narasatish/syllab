import { Question } from "./types";

export const CLASS_BANK: Record<string, Question[]> = {
  "5": [
    {
      id: "class-5-apt-001",
      category: "Classes 5-10",
      classLevel: "5",
      subject: "Aptitude",
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      correct: 2,
      explanation: "15/100 x 200 = 30."
    },
    {
      id: "class-5-science-001",
      category: "Classes 5-10",
      classLevel: "5",
      subject: "Science",
      question: "Which part of a plant absorbs water from soil?",
      options: ["Flower", "Leaf", "Root", "Fruit"],
      correct: 2,
      explanation: "Roots absorb water and minerals from the soil."
    },
    {
      id: "class-5-english-001",
      category: "Classes 5-10",
      classLevel: "5",
      subject: "English",
      question: "Choose the correct sentence.",
      options: ["She go to school.", "She goes to school.", "She going school.", "She gone school."],
      correct: 1,
      explanation: "Use goes with third-person singular in present tense."
    }
  ],
  "6": [
    {
      id: "class-6-apt-001",
      category: "Classes 5-10",
      classLevel: "6",
      subject: "Aptitude",
      question: "What is the next number: 3, 6, 12, 24, ?",
      options: ["30", "36", "42", "48"],
      correct: 3,
      explanation: "Each term is doubled, so 24 x 2 = 48."
    },
    {
      id: "class-6-science-001",
      category: "Classes 5-10",
      classLevel: "6",
      subject: "Science",
      question: "Which process changes water vapour into liquid water?",
      options: ["Evaporation", "Condensation", "Melting", "Freezing"],
      correct: 1,
      explanation: "Condensation converts water vapour into liquid droplets."
    },
    {
      id: "class-6-english-001",
      category: "Classes 5-10",
      classLevel: "6",
      subject: "English",
      question: "Which word is an adjective?",
      options: ["Run", "Beautiful", "Quickly", "Table"],
      correct: 1,
      explanation: "Beautiful describes a noun, so it is an adjective."
    }
  ]
};
