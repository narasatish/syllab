import { Question } from "../types";

export const JEE_MATH_POOL: Question[] = [
  {
    id: "jee-math-001",
    category: "IIT JEE",
    subject: "Mathematics",
    question: "If f(x) = x^2 - 4x + 5, what is the minimum value?",
    options: ["0", "1", "2", "5"],
    correct: 1,
    explanation: "f(x) = (x - 2)^2 + 1, so the minimum value is 1."
  },
  {
    id: "jee-math-002",
    category: "IIT JEE",
    subject: "Mathematics",
    question: "What is the derivative of sin(x)?",
    options: ["cos(x)", "sin(x)", "-sin(x)", "-cos(x)"],
    correct: 0,
    explanation: "The derivative of sin(x) is cos(x)."
  },
  {
    id: "jee-math-003",
    category: "IIT JEE",
    subject: "Mathematics",
    question: "What is the value of 5!?",
    options: ["24", "60", "120", "720"],
    correct: 2,
    explanation: "5! = 5 x 4 x 3 x 2 x 1 = 120."
  },
  {
    id: "jee-math-004",
    category: "IIT JEE",
    subject: "Mathematics",
    question: "The roots of x^2 - 5x + 6 = 0 are:",
    options: ["1 and 6", "2 and 3", "-2 and -3", "0 and 5"],
    correct: 1,
    explanation: "x^2 - 5x + 6 = (x - 2)(x - 3), so roots are 2 and 3."
  },
  {
    id: "jee-math-005",
    category: "IIT JEE",
    subject: "Mathematics",
    question: "If A = {1, 2, 3}, how many subsets does A have?",
    options: ["3", "6", "8", "9"],
    correct: 2,
    explanation: "A set with n elements has 2^n subsets. Here 2^3 = 8."
  }
];
