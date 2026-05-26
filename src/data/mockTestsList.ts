export interface MockTestMeta {
  id: string;
  title: string;
  exam: 'JEE' | 'NEET' | 'EAMCET' | 'APEAMCET' | 'VIT' | 'BITSAT';
  duration: number; // minutes
  questionsCount: number;
  fileUrl: string;
  available: boolean;   // true = JSON file actually exists, false = "coming soon"
}

// IDs of mocks whose JSON files actually EXIST in /public/mocks/.
// The build:mocks script will populate the others — after it succeeds, add
// the generated IDs here (or have the script auto-append them).
const AVAILABLE_MOCKS = new Set<string>([
  'apeamcet-mock-1',
  'apeamcet-mock-10',
  'apeamcet-mock-11',
  'apeamcet-mock-12',
  'apeamcet-mock-13',
  'apeamcet-mock-14',
  'apeamcet-mock-15',
  'apeamcet-mock-2',
  'apeamcet-mock-3',
  'apeamcet-mock-4',
  'apeamcet-mock-5',
  'apeamcet-mock-6',
  'apeamcet-mock-7',
  'apeamcet-mock-8',
  'apeamcet-mock-9',
  'bitsat-mock-1',
  'bitsat-mock-10',
  'bitsat-mock-2',
  'bitsat-mock-3',
  'bitsat-mock-4',
  'bitsat-mock-5',
  'bitsat-mock-6',
  'bitsat-mock-7',
  'bitsat-mock-8',
  'bitsat-mock-9',
  'eamcet-mock-1',
  'eamcet-mock-10',
  'eamcet-mock-11',
  'eamcet-mock-12',
  'eamcet-mock-13',
  'eamcet-mock-14',
  'eamcet-mock-15',
  'eamcet-mock-2',
  'eamcet-mock-3',
  'eamcet-mock-4',
  'eamcet-mock-5',
  'eamcet-mock-6',
  'eamcet-mock-7',
  'eamcet-mock-8',
  'eamcet-mock-9',
  'jee-mock-1',
  'jee-mock-10',
  'jee-mock-11',
  'jee-mock-12',
  'jee-mock-13',
  'jee-mock-14',
  'jee-mock-15',
  'jee-mock-2',
  'jee-mock-3',
  'jee-mock-4',
  'jee-mock-5',
  'jee-mock-6',
  'jee-mock-7',
  'jee-mock-8',
  'jee-mock-9',
  'neet-mock-1',
  'neet-mock-10',
  'neet-mock-11',
  'neet-mock-12',
  'neet-mock-13',
  'neet-mock-14',
  'neet-mock-15',
  'neet-mock-2',
  'neet-mock-3',
  'neet-mock-4',
  'neet-mock-5',
  'neet-mock-6',
  'neet-mock-7',
  'neet-mock-8',
  'neet-mock-9',
  'vit-mock-1',
  'vit-mock-10',
  'vit-mock-2',
  'vit-mock-3',
  'vit-mock-4',
  'vit-mock-5',
  'vit-mock-6',
  'vit-mock-7',
  'vit-mock-8',
  'vit-mock-9',
]);

type MockSeed = Omit<MockTestMeta, 'available'>;

// Generate mock test metadata
const generateMocks = (): MockTestMeta[] => {
  const mocks: MockSeed[] = [];

  // JEE Mocks: 15 tests, 180 min, 75 questions
  for (let i = 1; i <= 15; i++) {
    mocks.push({
      id: `jee-mock-${i}`,
      title: `JEE Main Mock Test ${i}`,
      exam: 'JEE',
      duration: 180,
      questionsCount: 75,
      fileUrl: `/mocks/jee/jee-mock-${i}.json`,
    });
  }

  // NEET Mocks: 15 tests, 180 min, 200 questions
  for (let i = 1; i <= 15; i++) {
    mocks.push({
      id: `neet-mock-${i}`,
      title: `NEET Mock Test ${i}`,
      exam: 'NEET',
      duration: 180,
      questionsCount: 200,
      fileUrl: `/mocks/neet/neet-mock-${i}.json`,
    });
  }

  // EAMCET Mocks: 15 tests, 180 min, 160 questions
  for (let i = 1; i <= 15; i++) {
    mocks.push({
      id: `eamcet-mock-${i}`,
      title: `EAMCET Mock Test ${i}`,
      exam: 'EAMCET',
      duration: 180,
      questionsCount: 160,
      fileUrl: `/mocks/eamcet/eamcet-mock-${i}.json`,
    });
  }

  // APEAMCET Mocks: 15 tests, 180 min, 160 questions
  for (let i = 1; i <= 15; i++) {
    mocks.push({
      id: `apeamcet-mock-${i}`,
      title: `APEAMCET Mock Test ${i}`,
      exam: 'APEAMCET',
      duration: 180,
      questionsCount: 160,
      fileUrl: `/mocks/apeamcet/apeamcet-mock-${i}.json`,
    });
  }

  // VIT Mocks: 10 tests, 150 min, 125 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `vit-mock-${i}`,
      title: `VITEEE Mock Test ${i}`,
      exam: 'VIT',
      duration: 150,
      questionsCount: 125,
      fileUrl: `/mocks/vit/vit-mock-${i}.json`,
    });
  }

  // BITSAT Mocks: 10 tests, 180 min, 130 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `bitsat-mock-${i}`,
      title: `BITSAT Mock Test ${i}`,
      exam: 'BITSAT',
      duration: 180,
      questionsCount: 130,
      fileUrl: `/mocks/bitsat/bitsat-mock-${i}.json`,
    });
  }

  // Stamp availability based on what's actually uploaded
  return mocks.map(m => ({ ...m, available: AVAILABLE_MOCKS.has(m.id) }));
};

export const MOCK_TESTS: MockTestMeta[] = generateMocks();

/** Only the mocks whose JSON files are actually uploaded. */
export const AVAILABLE_MOCK_TESTS: MockTestMeta[] = MOCK_TESTS.filter(m => m.available);

export const getMocksByExam = (exam: string): MockTestMeta[] => {
  return MOCK_TESTS.filter((mock) => mock.exam === exam);
};
