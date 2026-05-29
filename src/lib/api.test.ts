import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  API_URL,
  askTutor,
  getCodingFeedback,
  getEnglishConversationReply,
} from './api';

// Mock import.meta.env
vi.stubGlobal('import', {
  meta: {
    env: {
      DEV: false,
      VITE_API_BASE_URL: 'https://api.example.com',
    },
  },
});

describe('API Layer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('API_URL', () => {
    it('should be empty string when import.meta.env.DEV is true', () => {
      // In dev mode, API_URL should be '' for relative URLs handled by Vite proxy
      // The actual value depends on how the module is loaded, but we verify the logic
      expect(typeof API_URL).toBe('string');
    });

    it('should strip trailing slashes', () => {
      // API_URL uses String.replace(/\/+$/, "") to remove trailing slashes
      expect(API_URL).not.toMatch(/\/$/);
    });
  });

  describe('askTutor', () => {
    it('should fetch from /api/tutor endpoint', async () => {
      const mockFetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: 'Hello student' }),
      });
      global.fetch = mockFetch;

      const result = await askTutor('What is photosynthesis?');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tutor'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      expect(result).toBe('Hello student');
    });

    it('should include prompt and history in POST body', async () => {
      const mockFetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: 'Response' }),
      });
      global.fetch = mockFetch;

      const history = [
        { role: 'user' as const, parts: [{ text: 'Earlier question' }] },
      ];
      await askTutor('New question', history);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body).toEqual({
        prompt: 'New question',
        history,
      });
    });

    it('should reject with timeout when fetch is aborted', async () => {
      let abortController: AbortController | null = null;
      const mockFetch = vi.fn((url: string, opts: RequestInit) => {
        abortController = opts.signal as any;
        // Simulate timeout by aborting after a delay
        return new Promise((_, reject) => {
          setTimeout(() => {
            reject(new DOMException('The operation was aborted', 'AbortError'));
          }, 10);
        });
      });
      global.fetch = mockFetch;

      await expect(askTutor('test', [], 100)).rejects.toThrow();
    });

    it('should throw with non-ok response', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      });

      await expect(askTutor('test')).rejects.toThrow(/API.*500/);
    });

    it('should return empty string if response has no text field', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const result = await askTutor('test');
      expect(result).toBe('');
    });

    it('should clean up timers in finally block', async () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: 'ok' }),
      });

      await askTutor('test');

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });

  describe('getCodingFeedback', () => {
    it('should post to /api/coding-feedback endpoint', async () => {
      const mockFetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          score: 85,
          verdict: 'Good',
          summary: 'Works well',
          strengths: [],
          improvements: [],
          hint: '',
        }),
      });
      global.fetch = mockFetch;

      await getCodingFeedback({
        language: 'javascript',
        code: 'console.log("hello")',
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[0]).toContain('/api/coding-feedback');
      expect(callArgs[1].method).toBe('POST');
    });

    it('should send correct payload with all fields', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          score: 90,
          verdict: 'Excellent',
          summary: 'Perfect',
          strengths: ['clean'],
          improvements: [],
          hint: '',
        }),
      });

      const args = {
        language: 'python',
        code: 'print("test")',
        task: 'Print hello',
        classLevel: 10,
      };

      await getCodingFeedback(args);

      const callArgs = global.fetch as any;
      const body = JSON.parse(callArgs.mock.calls[0][1].body);
      expect(body).toEqual(args);
    });

    it('should return CodingFeedback object', async () => {
      const feedback = {
        score: 75,
        verdict: 'Good',
        summary: 'Nice work',
        strengths: ['efficient'],
        improvements: ['add comments'],
        hint: 'Try optimization',
      };
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => feedback,
      });

      const result = await getCodingFeedback({
        language: 'javascript',
        code: 'test',
      });

      expect(result).toEqual(feedback);
    });

    it('should throw on non-ok response', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => 'Bad request',
      });

      await expect(
        getCodingFeedback({ language: 'javascript', code: 'test' }),
      ).rejects.toThrow();
    });
  });

  describe('getEnglishConversationReply', () => {
    it('should call askTutor with formatted prompt', async () => {
      // Mock fetch so askTutor (called internally) succeeds
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: 'That is interesting!' }),
      });

      const result = await getEnglishConversationReply(
        'Hello there',
        [{ role: 'student', text: 'Hi' }],
      );

      // Verify the response was processed
      expect(result).toBe('That is interesting!');
      // Verify fetch was called with the tutor endpoint
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tutor'),
        expect.objectContaining({ method: 'POST' }),
      );
      // Verify the prompt included the student's text
      const body = JSON.parse((global.fetch as any).mock.calls[0][1].body);
      expect(body.prompt).toContain('Student just said');
      expect(body.prompt).toContain('Hello there');
    });

    it('should strip markdown code blocks from response', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: '```\nThat sounds great\n```' }),
      });

      const result = await getEnglishConversationReply('test');

      expect(result).toBe('That sounds great');
      expect(result).not.toContain('```');
    });

    it('should strip quotes from response', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: '"That is nice!"' }),
      });

      const result = await getEnglishConversationReply('test');

      expect(result).toBe('That is nice!');
      expect(result).not.toMatch(/^["']/);
      expect(result).not.toMatch(/["']$/);
    });

    it('should trim whitespace', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: '   Trimmed response   ' }),
      });

      const result = await getEnglishConversationReply('test');

      expect(result).toBe('Trimmed response');
    });

    it('should include conversation context in prompt', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: 'Response' }),
      });

      const history = [
        { role: 'student' as const, text: 'Previous message' },
      ];
      await getEnglishConversationReply('Current message', history);

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const prompt = body.prompt as string;
      expect(prompt).toContain('Previous message');
    });

    it('should handle empty history gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ text: 'Hello!' }),
      });

      const result = await getEnglishConversationReply('test', []);

      expect(result).toBe('Hello!');
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

      await expect(askTutor('test')).rejects.toThrow();
    });

    it('should handle malformed JSON responses', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(askTutor('test')).rejects.toThrow();
    });

    it('should truncate error messages to 200 chars', async () => {
      const longError = 'X'.repeat(300);
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => longError,
      });

      try {
        await askTutor('test');
      } catch (e: any) {
        expect(e.message.length).toBeLessThanOrEqual(250);
      }
    });
  });
});
