#!/usr/bin/env node
/**
 * State Exam Mock Test Generator
 * Generates missing mock test JSON files for state-level engineering exams.
 * Each mock uses a pool of reusable questions with appropriate subject distribution.
 *
 * Run: node scripts/generate-state-mocks.mjs
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_MOCKS_DIR = path.join(ROOT, 'public', 'mocks');

// Exam configurations: questions count and subject distribution
const EXAM_CONFIGS = {
  wbjee: {
    totalQuestions: 75,
    duration: 120,
    subjects: { Physics: 25, Chemistry: 25, Mathematics: 25 },
  },
  tnea: {
    totalQuestions: 60,
    duration: 90,
    subjects: { Physics: 20, Chemistry: 20, Mathematics: 20 },
  },
  upsee: {
    totalQuestions: 100,
    duration: 180,
    subjects: { Physics: 34, Chemistry: 33, Mathematics: 33 },
  },
  mhtcet: {
    totalQuestions: 150,
    duration: 180,
    subjects: { Physics: 50, Chemistry: 50, Mathematics: 50 },
  },
  kcet: {
    totalQuestions: 60,
    duration: 80,
    subjects: { Physics: 20, Chemistry: 20, Mathematics: 20 },
  },
  comedk: {
    totalQuestions: 180,
    duration: 180,
    subjects: { Physics: 60, Chemistry: 60, Mathematics: 60 },
  },
  gujcet: {
    totalQuestions: 80,
    duration: 120,
    subjects: { Physics: 27, Chemistry: 27, Mathematics: 26 },
  },
  ojee: {
    totalQuestions: 60,
    duration: 60,
    subjects: { Physics: 20, Chemistry: 20, Mathematics: 20 },
  },
};

// Question pool: 30+ reusable physics, chemistry, and maths questions with explanations
const QUESTION_POOL = {
  Physics: [
    {
      question: "A projectile is launched at an angle of 45° with initial velocity 20 m/s. What is the maximum height reached?",
      options: ["10 m", "20 m", "5 m", "15 m"],
      correctAnswer: 0,
      explanation: "For projectile motion, maximum height h = (v₀² sin²θ)/(2g) = (400 × 0.5)/(20) = 10 m.",
    },
    {
      question: "The refractive index of a material is 1.5. What is the critical angle for total internal reflection?",
      options: ["30°", "45°", "41.8°", "60°"],
      correctAnswer: 2,
      explanation: "Critical angle θc = sin⁻¹(1/n) = sin⁻¹(1/1.5) ≈ 41.8°.",
    },
    {
      question: "What is the SI unit of electric field strength?",
      options: ["Tesla", "Newton per Coulomb", "Joule per Coulomb", "Ampere per meter"],
      correctAnswer: 1,
      explanation: "Electric field strength E = F/q has units of Newton/Coulomb or V/m.",
    },
    {
      question: "A conductor carries a current of 5 A. The charge passing through a section in 2 seconds is:",
      options: ["2.5 C", "10 C", "20 C", "0.4 C"],
      correctAnswer: 1,
      explanation: "Charge Q = I × t = 5 A × 2 s = 10 C.",
    },
    {
      question: "A light ray traveling in air enters a prism at angle of incidence 30°. If the refractive index is √2, what is the angle of refraction?",
      options: ["20°", "22°", "30°", "45°"],
      correctAnswer: 0,
      explanation: "Using Snell's law: n₁sinθ₁ = n₂sinθ₂. 1 × sin30° = √2 × sinθ₂. 0.5 = √2 × sinθ₂. sinθ₂ ≈ 0.354, θ₂ ≈ 20.7°.",
    },
    {
      question: "What is the SI unit of acceleration?",
      options: ["m/s", "m/s²", "m/s³", "km/s²"],
      correctAnswer: 1,
      explanation: "Acceleration is measured in meters per second squared (m/s²).",
    },
    {
      question: "A body undergoes uniform acceleration. Its velocity changes from 0 to 20 m/s in 5s. Distance covered is:",
      options: ["20m", "40m", "50m", "100m"],
      correctAnswer: 2,
      explanation: "s = ut + (1/2)at². a = 20/5 = 4 m/s². s = 0 + (1/2)(4)(25) = 50m.",
    },
    {
      question: "The angle of incidence equals angle of reflection according to:",
      options: ["Snell's law", "Law of reflection", "Faraday's law", "Coulomb's law"],
      correctAnswer: 1,
      explanation: "This is the law of reflection.",
    },
    {
      question: "Young's double slit experiment shows:",
      options: ["Particle nature", "Wave nature", "Both", "Neither"],
      correctAnswer: 1,
      explanation: "The interference pattern in Young's experiment demonstrates the wave nature of light.",
    },
    {
      question: "What is the direction of magnetic force on a current-carrying conductor?",
      options: ["Along current", "Perpendicular to current", "Opposite to current", "Depends on B field"],
      correctAnswer: 1,
      explanation: "F = IL × B. Force is perpendicular to both current and magnetic field.",
    },
    {
      question: "A spring with spring constant 100 N/m is stretched by 0.1 m. What is the elastic potential energy?",
      options: ["0.5 J", "1 J", "5 J", "10 J"],
      correctAnswer: 0,
      explanation: "Elastic PE = (1/2)kx² = (1/2)(100)(0.01) = 0.5 J.",
    },
    {
      question: "What is the relative velocity of approach if two bodies move towards each other at 30 m/s and 20 m/s?",
      options: ["10 m/s", "50 m/s", "30 m/s", "20 m/s"],
      correctAnswer: 1,
      explanation: "Relative velocity = 30 + 20 = 50 m/s (since they move towards each other).",
    },
  ],
  Chemistry: [
    {
      question: "What is the valency of carbon in CO₂?",
      options: ["2", "3", "4", "1"],
      correctAnswer: 2,
      explanation: "In CO₂, carbon forms two double bonds with oxygen atoms. Carbon exhibits a valency of 4.",
    },
    {
      question: "Which of the following is the strongest acid?",
      options: ["HCl", "HF", "HBr", "HI"],
      correctAnswer: 3,
      explanation: "HI is the strongest acid among hydrogen halides due to the largest size of iodine atom.",
    },
    {
      question: "What is the pH of a neutral solution at 25°C?",
      options: ["5", "7", "8", "10"],
      correctAnswer: 1,
      explanation: "At 25°C, a neutral solution has [H⁺] = [OH⁻] = 10⁻⁷ M, so pH = -log(10⁻⁷) = 7.",
    },
    {
      question: "Calculate the molar mass of Ca(OH)₂. (Ca = 40, O = 16, H = 1)",
      options: ["57 g/mol", "74 g/mol", "90 g/mol", "88 g/mol"],
      correctAnswer: 1,
      explanation: "Molar mass = 40 + 2(16 + 1) = 40 + 2(17) = 40 + 34 = 74 g/mol.",
    },
    {
      question: "What is the oxidation state of nitrogen in NO₃⁻?",
      options: ["+3", "+5", "+6", "-3"],
      correctAnswer: 1,
      explanation: "In NO₃⁻, let oxidation state of N = x. x + 3(-2) = -1. x - 6 = -1. x = +5.",
    },
    {
      question: "What is the empirical formula of glucose?",
      options: ["C₆H₁₂O₆", "CH₂O", "C₂H₄O₂", "CHO"],
      correctAnswer: 1,
      explanation: "Empirical formula of glucose C₆H₁₂O₆ is CH₂O (simplest ratio).",
    },
    {
      question: "Which compound shows isomerism?",
      options: ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀"],
      correctAnswer: 3,
      explanation: "Butane (C₄H₁₀) has structural isomers: n-butane and isobutane.",
    },
    {
      question: "What is the order of hydracid strength?",
      options: ["HF > HCl > HBr > HI", "HI > HBr > HCl > HF", "All equal", "Depends on concentration"],
      correctAnswer: 1,
      explanation: "Hydracid strength increases down the group: HI > HBr > HCl > HF.",
    },
    {
      question: "Which of these has maximum oxidation state?",
      options: ["Cr in CrO₄²⁻", "Mn in MnO₄⁻", "V in VO₄³⁻", "Fe in FeO₄²⁻"],
      correctAnswer: 1,
      explanation: "In MnO₄⁻, Mn has +7 oxidation state, the highest among options.",
    },
    {
      question: "What is the functional group in ketones?",
      options: ["C=O", "OH", "CHO", "COOH"],
      correctAnswer: 0,
      explanation: "Ketones have C=O (carbonyl) group bonded to two alkyl groups.",
    },
    {
      question: "What is the electronic configuration of Cl⁻?",
      options: ["[Ne]3s²3p⁵", "[Ne]3s²3p⁶", "[Ar]", "[Ne]3s¹"],
      correctAnswer: 1,
      explanation: "Cl atom: [Ne]3s²3p⁵. Cl⁻: [Ne]3s²3p⁶ (gains one electron).",
    },
    {
      question: "Ammonia is a basic gas because:",
      options: ["It donates H⁺", "It accepts H⁺", "It is neutral", "It decomposes"],
      correctAnswer: 1,
      explanation: "NH₃ acts as a base by accepting H⁺ ions: NH₃ + H⁺ → NH₄⁺.",
    },
  ],
  Mathematics: [
    {
      question: "What is the derivative of x³ with respect to x?",
      options: ["3x", "3x²", "x²", "x³"],
      correctAnswer: 1,
      explanation: "d/dx(x³) = 3x².",
    },
    {
      question: "If sin θ = 3/5, what is cos θ?",
      options: ["4/5", "3/4", "5/3", "1/5"],
      correctAnswer: 0,
      explanation: "Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1. cos²θ = 16/25. cosθ = 4/5.",
    },
    {
      question: "What is the sum of roots of the quadratic equation x² - 5x + 6 = 0?",
      options: ["5", "6", "-5", "1"],
      correctAnswer: 0,
      explanation: "For ax² + bx + c = 0, sum of roots = -b/a = -(-5)/1 = 5.",
    },
    {
      question: "Find the limit of (x² - 4)/(x - 2) as x approaches 2.",
      options: ["0", "2", "4", "∞"],
      correctAnswer: 2,
      explanation: "lim(x→2) (x² - 4)/(x - 2) = lim(x→2) (x - 2)(x + 2)/(x - 2) = lim(x→2) (x + 2) = 4.",
    },
    {
      question: "What is the area of a triangle with base 10 cm and height 8 cm?",
      options: ["40 cm²", "80 cm²", "20 cm²", "160 cm²"],
      correctAnswer: 0,
      explanation: "Area = (1/2) × base × height = (1/2) × 10 × 8 = 40 cm².",
    },
    {
      question: "What is |−5|?",
      options: ["−5", "5", "0", "10"],
      correctAnswer: 1,
      explanation: "Absolute value |−5| = 5.",
    },
    {
      question: "What is the minimum value of x² + 4x + 5?",
      options: ["1", "2", "4", "5"],
      correctAnswer: 0,
      explanation: "Completing square: x² + 4x + 5 = (x+2)² + 1. Minimum = 1.",
    },
    {
      question: "What is the value of i² (where i is imaginary unit)?",
      options: ["0", "1", "−1", "2"],
      correctAnswer: 2,
      explanation: "By definition, i² = −1.",
    },
    {
      question: "If tan θ = 3/4, what is sin θ?",
      options: ["3/5", "4/5", "3/4", "5/4"],
      correctAnswer: 0,
      explanation: "If tan θ = 3/4, then in right triangle with opposite=3, adjacent=4, hypotenuse=5. sin θ = 3/5.",
    },
    {
      question: "What is the domain of f(x) = 1/(x-2)?",
      options: ["All real numbers", "x ≠ 2", "x > 2", "x < 2"],
      correctAnswer: 1,
      explanation: "f(x) is undefined when denominator = 0, i.e., when x = 2.",
    },
    {
      question: "What is the value of log₁₀(100)?",
      options: ["1", "2", "10", "100"],
      correctAnswer: 1,
      explanation: "log₁₀(100) = log₁₀(10²) = 2.",
    },
    {
      question: "What is ∫2x dx?",
      options: ["2", "x²", "x² + C", "2x + C"],
      correctAnswer: 2,
      explanation: "∫2x dx = x² + C (by power rule).",
    },
  ],
};

/**
 * Generate a random question from the pool
 */
function getRandomQuestion(subject) {
  const pool = QUESTION_POOL[subject] || QUESTION_POOL.Mathematics;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Generate a single mock test
 */
function generateMock(exam, mockIndex) {
  const config = EXAM_CONFIGS[exam];
  if (!config) {
    console.error(`Unknown exam: ${exam}`);
    return null;
  }

  const mockId = `${exam}_mock_${mockIndex}`;
  const allQuestions = [];
  let counter = 1;

  // For each subject, generate the required number of questions
  for (const [subject, count] of Object.entries(config.subjects)) {
    for (let i = 0; i < count; i++) {
      const baseQuestion = getRandomQuestion(subject);
      const difficulty = Math.random() < 0.3 ? 'easy' : Math.random() < 0.5 ? 'medium' : 'hard';

      const question = {
        id: `${exam}_${subject.toLowerCase().replace(/\s+/g, '_')}_${String(counter++).padStart(3, '0')}`,
        subject,
        chapter: 'General',
        difficulty,
        question: baseQuestion.question,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correctAnswer,
        explanation: baseQuestion.explanation,
        year: 2024,
        source: 'AI-Generated',
        exam: exam.toUpperCase(),
        marks: 1,
        negativeMarks: -0.25,
      };
      allQuestions.push(question);
    }
  }

  return {
    id: mockId,
    title: `${exam.toUpperCase()} Full Mock Test ${mockIndex}`,
    type: 'full',
    classScope: '11+12',
    duration: config.duration,
    totalQuestions: config.totalQuestions,
    negativeMarking: true,
    subjects: config.subjects,
    questions: allQuestions,
  };
}

/**
 * Main function
 */
async function main() {
  console.log('Generating missing state exam mock tests...\n');

  const examsToGenerate = [
    { exam: 'wbjee', mocks: [4, 5, 6, 7, 8, 9, 10] },
    { exam: 'tnea', mocks: [4, 5, 6, 7, 8, 9, 10] },
    { exam: 'upsee', mocks: [4, 5, 6, 7, 8, 9, 10] },
    { exam: 'mhtcet', mocks: [4, 5, 6, 7, 8, 9, 10] },
    { exam: 'kcet', mocks: [4, 5, 6, 7, 8, 9, 10] },
    { exam: 'comedk', mocks: [4, 5, 6, 7, 8, 9, 10] },
    { exam: 'gujcet', mocks: [4, 5, 6, 7, 8, 9, 10] },
    { exam: 'ojee', mocks: [4, 5, 6, 7, 8, 9, 10] },
  ];

  let totalCreated = 0;
  const errors = [];

  for (const { exam, mocks } of examsToGenerate) {
    const examDir = path.join(PUBLIC_MOCKS_DIR, exam);
    console.log(`\n${exam.toUpperCase()} (${mocks.length} mocks):`);

    for (const mockIndex of mocks) {
      try {
        const mock = generateMock(exam, mockIndex);
        if (!mock) {
          errors.push(`Failed to generate ${exam}-mock-${mockIndex}`);
          continue;
        }

        const filename = `${exam}-mock-${mockIndex}.json`;
        const filepath = path.join(examDir, filename);

        // Write the mock file
        await fs.writeFile(filepath, JSON.stringify(mock), 'utf-8');
        process.stdout.write('.');
        totalCreated++;
      } catch (error) {
        errors.push(`Error writing ${exam}-mock-${mockIndex}: ${error.message}`);
        process.stdout.write('E');
      }
    }
  }

  console.log(`\n\n✅ Generated ${totalCreated} mock files`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors encountered:`);
    errors.forEach(err => console.log(`  - ${err}`));
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
