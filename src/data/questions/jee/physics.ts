import { Question } from "../types";

export const JEE_PHY_POOL: Question[] = [
  {
    id: "jee-phy-001",
    category: "IIT JEE",
    subject: "Physics",
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Pascal", "Watt"],
    correct: 1,
    explanation: "Newton is the SI unit of force."
  },
  {
    id: "jee-phy-002",
    category: "IIT JEE",
    subject: "Physics",
    question: "For a projectile on level ground, maximum range occurs at which angle?",
    options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
    correct: 1,
    explanation: "Range is maximum when sin(2 theta) = 1, so theta = 45 degrees."
  },
  {
    id: "jee-phy-003",
    category: "IIT JEE",
    subject: "Physics",
    question: "A body starts from rest with acceleration 2 m/s^2. What is its velocity after 5 seconds?",
    options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
    correct: 1,
    explanation: "Using v = u + at, v = 0 + 2 x 5 = 10 m/s."
  },
  {
    id: "jee-phy-004",
    category: "IIT JEE",
    subject: "Physics",
    question: "Which physical quantity is measured in joules?",
    options: ["Power", "Energy", "Pressure", "Charge"],
    correct: 1,
    explanation: "Energy and work are measured in joules."
  },
  {
    id: "jee-phy-005",
    category: "IIT JEE",
    subject: "Physics",
    question: "The SI unit of electric charge is:",
    options: ["Ampere", "Volt", "Coulomb", "Ohm"],
    correct: 2,
    explanation: "Electric charge is measured in coulombs."
  }
];
