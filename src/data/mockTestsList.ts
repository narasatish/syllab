export interface MockTestMeta {
  id: string;
  title: string;
  exam: 'JEE' | 'NEET' | 'EAMCET' | 'APEAMCET' | 'VIT' | 'BITSAT' | 'WBJEE' | 'TNEA' | 'UPSEE' | 'MHTCET' | 'KCET' | 'COMEDK' | 'GUJCET' | 'OJEE';
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
  'wbjee-mock-1', 'wbjee-mock-2', 'wbjee-mock-3', 'wbjee-mock-4', 'wbjee-mock-5',
  'wbjee-mock-6', 'wbjee-mock-7', 'wbjee-mock-8', 'wbjee-mock-9', 'wbjee-mock-10',
  'tnea-mock-1', 'tnea-mock-2', 'tnea-mock-3', 'tnea-mock-4', 'tnea-mock-5',
  'tnea-mock-6', 'tnea-mock-7', 'tnea-mock-8', 'tnea-mock-9', 'tnea-mock-10',
  'upsee-mock-1', 'upsee-mock-2', 'upsee-mock-3', 'upsee-mock-4', 'upsee-mock-5',
  'upsee-mock-6', 'upsee-mock-7', 'upsee-mock-8', 'upsee-mock-9', 'upsee-mock-10',
  'mhtcet-mock-1', 'mhtcet-mock-2', 'mhtcet-mock-3', 'mhtcet-mock-4', 'mhtcet-mock-5',
  'mhtcet-mock-6', 'mhtcet-mock-7', 'mhtcet-mock-8', 'mhtcet-mock-9', 'mhtcet-mock-10',
  'kcet-mock-1', 'kcet-mock-2', 'kcet-mock-3', 'kcet-mock-4', 'kcet-mock-5',
  'kcet-mock-6', 'kcet-mock-7', 'kcet-mock-8', 'kcet-mock-9', 'kcet-mock-10',
  'comedk-mock-1', 'comedk-mock-2', 'comedk-mock-3', 'comedk-mock-4', 'comedk-mock-5',
  'comedk-mock-6', 'comedk-mock-7', 'comedk-mock-8', 'comedk-mock-9', 'comedk-mock-10',
  'gujcet-mock-1', 'gujcet-mock-2', 'gujcet-mock-3', 'gujcet-mock-4', 'gujcet-mock-5',
  'gujcet-mock-6', 'gujcet-mock-7', 'gujcet-mock-8', 'gujcet-mock-9', 'gujcet-mock-10',
  'ojee-mock-1', 'ojee-mock-2', 'ojee-mock-3', 'ojee-mock-4', 'ojee-mock-5',
  'ojee-mock-6', 'ojee-mock-7', 'ojee-mock-8', 'ojee-mock-9', 'ojee-mock-10',
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

  // WBJEE Mocks: 10 tests, 120 min, 75 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `wbjee-mock-${i}`,
      title: `WBJEE Mock Test ${i} — PCM 75 Questions`,
      exam: 'WBJEE',
      duration: 120,
      questionsCount: 75,
      fileUrl: `/mocks/wbjee/wbjee-mock-${i}.json`,
    });
  }

  // TNEA Mocks: 10 tests, 90 min, 60 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `tnea-mock-${i}`,
      title: `TNEA Mock Test ${i} — 60 Questions`,
      exam: 'TNEA',
      duration: 90,
      questionsCount: 60,
      fileUrl: `/mocks/tnea/tnea-mock-${i}.json`,
    });
  }

  // UPSEE Mocks: 10 tests, 180 min, 100 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `upsee-mock-${i}`,
      title: `UPSEE Mock Test ${i} — 100 Questions`,
      exam: 'UPSEE',
      duration: 180,
      questionsCount: 100,
      fileUrl: `/mocks/upsee/upsee-mock-${i}.json`,
    });
  }

  // MHT-CET Mocks: 10 tests, 180 min, 150 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `mhtcet-mock-${i}`,
      title: `MHT-CET Mock Test ${i} — 150 Questions`,
      exam: 'MHTCET',
      duration: 180,
      questionsCount: 150,
      fileUrl: `/mocks/mhtcet/mhtcet-mock-${i}.json`,
    });
  }

  // KCET Mocks: 10 tests, 80 min, 60 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `kcet-mock-${i}`,
      title: `KCET Mock Test ${i} — 60 Questions`,
      exam: 'KCET',
      duration: 80,
      questionsCount: 60,
      fileUrl: `/mocks/kcet/kcet-mock-${i}.json`,
    });
  }

  // COMEDK Mocks: 10 tests, 180 min, 180 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `comedk-mock-${i}`,
      title: `COMEDK UGET Mock Test ${i} — 180 Questions`,
      exam: 'COMEDK',
      duration: 180,
      questionsCount: 180,
      fileUrl: `/mocks/comedk/comedk-mock-${i}.json`,
    });
  }

  // GUJCET Mocks: 10 tests, 120 min, 80 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `gujcet-mock-${i}`,
      title: `GUJCET Mock Test ${i} — 80 Questions`,
      exam: 'GUJCET',
      duration: 120,
      questionsCount: 80,
      fileUrl: `/mocks/gujcet/gujcet-mock-${i}.json`,
    });
  }

  // OJEE Mocks: 10 tests, 60 min, 60 questions
  for (let i = 1; i <= 10; i++) {
    mocks.push({
      id: `ojee-mock-${i}`,
      title: `OJEE Mock Test ${i} — 60 Questions`,
      exam: 'OJEE',
      duration: 60,
      questionsCount: 60,
      fileUrl: `/mocks/ojee/ojee-mock-${i}.json`,
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
