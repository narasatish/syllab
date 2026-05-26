#!/usr/bin/env node
/**
 * Mock Test Generator for Syllab Platform
 * Generates 79 missing mock test JSON files by calling the backend's
 * /api/questions/batch endpoint and assembling into MockPaper format.
 *
 * Run: node scripts/generate-mocks.mjs
 * Or:  npm run build:mocks
 *
 * Requires: Backend running at http://localhost:5000
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const BACKEND_URL = 'http://localhost:5000';
const PUBLIC_MOCKS_DIR = path.join(ROOT, 'public', 'mocks');

// Exam configurations: total questions and subject distribution
const EXAM_CONFIGS = {
  jee: {
    totalQuestions: 75,
    duration: 180,
    classScope: '11+12',
    subjects: { Physics: 25, Chemistry: 25, Mathematics: 25 },
    chapters: {
      Physics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Centre of Mass', 'Rotational Motion', 'Gravitation', 'Thermodynamics', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Electromagnetic Induction', 'Ray Optics', 'Wave Optics', 'Modern Physics'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Thermodynamics', 'Chemical Equilibrium', 'Redox Reactions', 'Electrochemistry', 'Chemical Kinetics', 'Solutions', 'Surface Chemistry', 'Hydrocarbons', 'Organic Chemistry', 'Solid State'],
      Mathematics: ['Quadratic Equations', 'Sequences and Series', 'Binomial Theorem', 'Limits and Continuity', 'Differentiation', 'Integration', 'Matrices', 'Probability', 'Complex Numbers', 'Straight Lines', 'Circles', 'Conic Sections', 'Vectors', '3D Geometry'],
    },
  },
  neet: {
    totalQuestions: 200,
    duration: 180,
    classScope: '11+12',
    subjects: { Physics: 45, Chemistry: 45, Botany: 50, Zoology: 50, Biology: 10 },
    chapters: {
      Physics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Thermodynamics', 'Kinetic Theory', 'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Electromagnetic Induction', 'Ray Optics', 'Wave Optics', 'Modern Physics'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Redox Reactions', 'Equilibrium', 'Kinetics', 'Electrochemistry', 'Solutions', 'Thermodynamics', 'Hydrocarbons', 'Organic Chemistry', 'Biomolecules', 'Polymers'],
      Botany: ['Cell Structure', 'Plant Tissues', 'Photosynthesis', 'Respiration', 'Plant Hormones', 'Reproduction', 'Ecology', 'Biodiversity', 'Plant Classification', 'Nutrition'],
      Zoology: ['Animal Tissues', 'Digestion', 'Circulation', 'Respiration', 'Excretion', 'Nervous System', 'Hormones', 'Reproduction', 'Development', 'Immunity'],
      Biology: ['General Biology Concepts'],
    },
  },
  eamcet: {
    totalQuestions: 160,
    duration: 180,
    classScope: '11+12',
    subjects: { Physics: 40, Chemistry: 40, Mathematics: 80 },
    chapters: {
      Physics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Solids and Fluids', 'Heat and Thermodynamics', 'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Electromagnetic Induction', 'Ray Optics', 'Wave Optics', 'Modern Physics'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Kinetics', 'Electrochemistry', 'Solutions', 'Surface Chemistry', 'Hydrocarbons', 'Organic Chemistry', 'Metallurgy'],
      Mathematics: ['Sets and Relations', 'Functions', 'Sequences and Series', 'Binomial Theorem', 'Permutations and Combinations', 'Quadratic Equations', 'Inequalities', 'Linear Programming', 'Limits and Continuity', 'Differentiation', 'Integration', 'Differential Equations', 'Trigonometry', 'Straight Lines', 'Circles', 'Conic Sections', 'Vectors', '3D Geometry', 'Probability', 'Statistics'],
    },
  },
  apeamcet: {
    totalQuestions: 160,
    duration: 180,
    classScope: '11+12',
    subjects: { Physics: 40, Chemistry: 40, Mathematics: 80 },
    chapters: {
      Physics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Solids and Fluids', 'Heat and Thermodynamics', 'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Electromagnetic Induction', 'Ray Optics', 'Wave Optics', 'Modern Physics'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Kinetics', 'Electrochemistry', 'Solutions', 'Surface Chemistry', 'Hydrocarbons', 'Organic Chemistry', 'Metallurgy'],
      Mathematics: ['Sets and Relations', 'Functions', 'Sequences and Series', 'Binomial Theorem', 'Permutations and Combinations', 'Quadratic Equations', 'Inequalities', 'Linear Programming', 'Limits and Continuity', 'Differentiation', 'Integration', 'Differential Equations', 'Trigonometry', 'Straight Lines', 'Circles', 'Conic Sections', 'Vectors', '3D Geometry', 'Probability', 'Statistics'],
    },
  },
  vit: {
    totalQuestions: 125,
    duration: 150,
    classScope: '11+12',
    subjects: { Physics: 35, Chemistry: 35, Mathematics: 40, 'English/Aptitude': 15 },
    chapters: {
      Physics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Solids and Fluids', 'Heat and Thermodynamics', 'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Electromagnetic Induction', 'Ray Optics', 'Wave Optics', 'Modern Physics'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Kinetics', 'Electrochemistry', 'Solutions', 'Hydrocarbons', 'Organic Chemistry'],
      Mathematics: ['Quadratic Equations', 'Sequences and Series', 'Binomial Theorem', 'Limits and Continuity', 'Differentiation', 'Integration', 'Matrices', 'Probability', 'Complex Numbers', 'Straight Lines', 'Circles', 'Conic Sections', 'Vectors', '3D Geometry'],
      'English/Aptitude': ['English Comprehension', 'Logical Reasoning', 'Quantitative Aptitude'],
    },
  },
  bitsat: {
    totalQuestions: 130,
    duration: 180,
    classScope: '11+12',
    subjects: { Physics: 30, Chemistry: 30, Mathematics: 40, English: 15, Logical: 15 },
    chapters: {
      Physics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Solids and Fluids', 'Heat and Thermodynamics', 'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Electromagnetic Induction', 'Ray Optics', 'Wave Optics', 'Modern Physics'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Kinetics', 'Electrochemistry', 'Solutions', 'Hydrocarbons', 'Organic Chemistry'],
      Mathematics: ['Quadratic Equations', 'Sequences and Series', 'Binomial Theorem', 'Limits and Continuity', 'Differentiation', 'Integration', 'Matrices', 'Probability', 'Complex Numbers', 'Straight Lines', 'Circles', 'Conic Sections', 'Vectors', '3D Geometry'],
      English: ['English Comprehension', 'Vocabulary', 'Grammar'],
      Logical: ['Logical Reasoning', 'Analytical Ability'],
    },
  },
};

// Mock test definitions with expected counts
const MOCK_DEFINITIONS = [
  // JEE: 15 tests (skip jee-mock-1)
  ...Array.from({ length: 14 }, (_, i) => ({ exam: 'jee', index: i + 2 })),
  // NEET: 15 tests
  ...Array.from({ length: 15 }, (_, i) => ({ exam: 'neet', index: i + 1 })),
  // EAMCET: 15 tests
  ...Array.from({ length: 15 }, (_, i) => ({ exam: 'eamcet', index: i + 1 })),
  // APEAMCET: 15 tests
  ...Array.from({ length: 15 }, (_, i) => ({ exam: 'apeamcet', index: i + 1 })),
  // VIT: 10 tests
  ...Array.from({ length: 10 }, (_, i) => ({ exam: 'vit', index: i + 1 })),
  // BITSAT: 10 tests
  ...Array.from({ length: 10 }, (_, i) => ({ exam: 'bitsat', index: i + 1 })),
];

/**
 * Fetch questions from backend with retry logic
 */
async function fetchQuestions(subject, chapter, count, classLevel, difficulty = 'mixed') {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/questions/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classLevel,
          subject,
          chapter,
          difficulty,
          count,
        }),
        timeout: 30000,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data.questions)) {
        throw new Error('Invalid response format');
      }

      return data.questions;
    } catch (error) {
      retryCount++;
      if (retryCount >= maxRetries) {
        console.warn(`Failed to fetch ${subject}/${chapter} after ${maxRetries} retries: ${error.message}`);
        return [];
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Backoff
    }
  }

  return [];
}

/**
 * Distribute difficulty levels: 30% easy, 50% medium, 20% hard
 */
function distributeDifficulty(count) {
  const easy = Math.ceil(count * 0.3);
  const hard = Math.ceil(count * 0.2);
  const medium = count - easy - hard;
  return { easy, medium, hard };
}

/**
 * Get chapters to query for a subject, cycling through to ensure variety
 */
function selectChapters(availableChapters, neededCount) {
  const chapters = [];
  let idx = 0;
  let remaining = neededCount;

  // Distribute questions roughly evenly across chapters
  const chapterCount = availableChapters.length;
  const perChapter = Math.ceil(remaining / chapterCount);

  for (const ch of availableChapters) {
    if (remaining <= 0) break;
    const qCount = Math.min(perChapter, remaining);
    chapters.push({ name: ch, count: qCount });
    remaining -= qCount;
  }

  return chapters;
}

/**
 * Map backend question format to MockPaper question format
 */
function mapQuestion(backendQ, examType, subject, questionId, marks = 4, negativeMarks = -1) {
  const question = backendQ.question_text || backendQ.question || '';
  let options = backendQ.options || [];
  // Some backends prefix options with "A) ", "B) " — strip those
  options = options.map(opt => typeof opt === 'string' ? opt.replace(/^[A-D]\)\s*/, '').trim() : String(opt));
  const correctIdx =
    backendQ.correct_index !== undefined ? backendQ.correct_index :
    backendQ.correctAnswer !== undefined ? backendQ.correctAnswer :
    backendQ.correct !== undefined ? backendQ.correct : 0;
  const explanation = backendQ.explanation || 'See solution above.';
  const difficulty = backendQ.difficulty || 'medium';
  const chapter = backendQ.chapter || 'General';

  return {
    id: questionId,
    subject,
    chapter,
    difficulty,
    question,
    options: options.slice(0, 4),
    correctAnswer: correctIdx,
    explanation,
    year: backendQ.year || 2023,
    source: 'AI-Generated',
    exam: examType,
    marks,
    negativeMarks,
  };
}

/**
 * Generate a single mock test
 */
// Backend caps at 20 questions per call — paginate by repeated calls.
const MAX_PER_CALL = 20;

async function generateMock(exam, mockIndex) {
  const config = EXAM_CONFIGS[exam];
  if (!config) { console.error(`Unknown exam: ${exam}`); return null; }

  const mockId = `${exam}-mock-${mockIndex}`;
  const t0 = Date.now();
  console.log(`\n[${mockId}] generating...`);

  try {
    const allQuestions = [];
    let counter = 1;

    for (const [subject, targetCount] of Object.entries(config.subjects)) {
      const chapters = config.chapters[subject] || ['mixed'];
      let collected = 0;
      // Make as many paginated calls as needed; rotate chapters for variety
      while (collected < targetCount) {
        const need = Math.min(MAX_PER_CALL, targetCount - collected);
        const chapter = chapters[Math.floor(Math.random() * chapters.length)];
        const questions = await fetchQuestions(subject, chapter, need, config.classScope, 'mixed');
        if (!questions.length) break; // give up on this subject if backend fails
        for (const q of questions) {
          if (collected >= targetCount) break;
          allQuestions.push(mapQuestion(
            q, exam.toUpperCase(), subject,
            `${exam}_${questionId(subject)}_${String(counter++).padStart(3, '0')}`,
            4, -1,
          ));
          collected++;
        }
      }
      process.stdout.write(`  ${subject}: ${collected}/${targetCount} `);
    }

    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`\n  → ${allQuestions.length}/${config.totalQuestions} questions in ${elapsed}s`);

    if (allQuestions.length < config.totalQuestions * 0.5) {
      console.warn(`  ⚠ Got less than half the questions — skipping save`);
      return null;
    }

    return {
      id: mockId.replace(/-/g, '_'),
      filename: mockId,
      title: `${exam.toUpperCase()} Full Mock Test ${mockIndex}`,
      type: 'full',
      classScope: config.classScope,
      duration: config.duration,
      totalQuestions: config.totalQuestions,
      negativeMarking: true,
      subjects: config.subjects,
      questions: allQuestions.slice(0, config.totalQuestions),
    };
  } catch (error) {
    console.error(`Error generating ${mockId}:`, error.message);
    return null;
  }
}

/**
 * Helper to generate unique question IDs
 */
function questionId(subject) {
  const prefix = {
    'Physics': 'phy',
    'Chemistry': 'chem',
    'Mathematics': 'math',
    'Botany': 'bot',
    'Zoology': 'zoo',
    'Biology': 'bio',
    'English': 'eng',
    'English/Aptitude': 'apt',
    'Logical': 'log',
  };
  return prefix[subject] || 'gen';
}

/**
 * Save mock paper to JSON file
 */
async function saveMock(mockPaper, exam) {
  if (!mockPaper) return false;

  try {
    const examDir = path.join(PUBLIC_MOCKS_DIR, exam.toLowerCase());
    await fs.mkdir(examDir, { recursive: true });

    // Filename uses dashes to match loader's expected URL pattern
    const filename = mockPaper.filename || mockPaper.id.replace(/_/g, '-');
    const filePath = path.join(examDir, `${filename}.json`);

    // Strip the helper `filename` field before persisting (it's not part of the schema)
    const { filename: _drop, ...persisted } = mockPaper;
    await fs.writeFile(filePath, JSON.stringify(persisted, null, 2), 'utf-8');

    console.log(`  ✓ ${filename}.json (${persisted.questions.length} questions)`);
    return filename;
  } catch (error) {
    console.error(`  ✗ Save failed: ${error.message}`);
    return false;
  }
}

/**
 * After all mocks generate, rewrite AVAILABLE_MOCKS in mockTestsList.ts
 * so the UI shows them as clickable.
 */
async function registerGeneratedMocks(successfulIds) {
  const listPath = path.join(ROOT, 'src', 'data', 'mockTestsList.ts');
  let src = await fs.readFile(listPath, 'utf-8');
  // Always keep jee-mock-1 (the seed mock)
  const allIds = Array.from(new Set(['jee-mock-1', ...successfulIds])).sort();
  const formatted = allIds.map(id => `  '${id}',`).join('\n');
  const next = src.replace(
    /const AVAILABLE_MOCKS = new Set<string>\(\[[\s\S]*?\]\);/,
    `const AVAILABLE_MOCKS = new Set<string>([\n${formatted}\n]);`,
  );
  if (next === src) {
    console.warn('  ⚠ Could not locate AVAILABLE_MOCKS block — register them manually.');
    return;
  }
  await fs.writeFile(listPath, next, 'utf-8');
  console.log(`  ✓ Registered ${allIds.length} mocks in mockTestsList.ts`);
}

/**
 * Main execution
 */
async function main() {
  console.log('Mock Test Generator for Syllab Platform');
  console.log('========================================');
  console.log(`Backend: ${BACKEND_URL}`);
  console.log(`Generating ${MOCK_DEFINITIONS.length} mock tests...\n`);

  let successCount = 0;
  let failureCount = 0;
  const generatedIds = [];

  for (const def of MOCK_DEFINITIONS) {
    const expectedFilename = `${def.exam}-mock-${def.index}`;
    const expectedPath = path.join(PUBLIC_MOCKS_DIR, def.exam.toLowerCase(), `${expectedFilename}.json`);
    try {
      await fs.access(expectedPath);
      // File exists → skip and treat as success for registration
      successCount++;
      generatedIds.push(expectedFilename);
      console.log(`\n[${expectedFilename}] already exists, skipping`);
      continue;
    } catch { /* doesn't exist, generate it */ }

    const mockPaper = await generateMock(def.exam, def.index);
    const savedFilename = mockPaper ? await saveMock(mockPaper, def.exam) : false;
    if (savedFilename) {
      successCount++;
      generatedIds.push(savedFilename);
      // Periodically re-register to make progress visible even on partial runs
      if (generatedIds.length % 10 === 0) {
        await registerGeneratedMocks(generatedIds);
      }
    } else {
      failureCount++;
    }

    // Rate limiting between mocks
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Final register
  if (generatedIds.length > 0) {
    console.log('\nRegistering generated mocks in mockTestsList.ts...');
    await registerGeneratedMocks(generatedIds);
  }

  console.log('\n========================================');
  console.log(`Completed: ${successCount} successful, ${failureCount} failed`);
  console.log('========================================');

  if (failureCount > 0) {
    console.warn(`⚠️  ${failureCount} mock(s) failed. Check logs above for details.`);
    process.exit(1);
  } else {
    console.log('✓ All mock tests generated successfully!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
