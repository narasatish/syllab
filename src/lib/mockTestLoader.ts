import { MockTestMeta } from '../data/mockTestsList';
import { MockAttemptQuestion } from './mockTestAnalytics';

type MockQuestion = MockAttemptQuestion & {
  difficulty?: string;
  year?: number;
  source?: string;
  exam?: string;
};

export type MockPaper = {
  id: string;
  title: string;
  duration: number;
  questions: MockQuestion[];
};

export class MockTestLoadError extends Error {
  constructor(mockId: string, status?: number) {
    if (status === 404) {
      super(`Mock test "${mockId}" is not available yet. Try another one or check back soon!`);
    } else {
      super(`Failed to load mock test "${mockId}". Please try again.`);
    }
    this.name = 'MockTestLoadError';
  }
}

export async function loadMockTest(meta: MockTestMeta): Promise<MockPaper> {
  try {
    const response = await fetch(meta.fileUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new MockTestLoadError(meta.id, 404);
      }
      throw new MockTestLoadError(meta.id, response.status);
    }

    const data = await response.json() as MockPaper;

    // Validate that the loaded data has the expected structure
    if (!data.id || !data.title || !Array.isArray(data.questions)) {
      throw new Error(`Invalid mock test format for "${meta.id}"`);
    }

    return data;
  } catch (error) {
    if (error instanceof MockTestLoadError) {
      throw error;
    }
    throw new MockTestLoadError(meta.id);
  }
}
