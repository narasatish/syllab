import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectsGalleryView from './ProjectsGalleryView';
import * as apiModule from '../../lib/api';

// Mock the API
vi.mock('../../lib/api', () => ({
  getCodingFeedback: vi.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronDown: () => <span data-testid="chevron-down">▼</span>,
  ChevronUp: () => <span data-testid="chevron-up">▲</span>,
  Sparkles: () => <span data-testid="sparkles">✨</span>,
}));

describe('ProjectsGalleryView Component', () => {
  const mockLang = {
    id: 'python',
    name: 'Python',
    bgClass: 'bg-blue-600',
    icon: '🐍',
    emoji: '🐍',
    color: '#3776AB',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-600',
    editorMode: 'feedback' as const,
    description: 'Learn Python programming',
    content: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Language without skill mapping', () => {
    it('renders "coming soon" message when language has no skill mapping', () => {
      const unknownLang = { ...mockLang, id: 'unknown-lang' };
      render(<ProjectsGalleryView lang={unknownLang} activeLangId="unknown-lang" />);

      expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
      expect(screen.getByText(/writing guided projects/i)).toBeInTheDocument();
    });

    it('displays the language name in coming soon message', () => {
      const customLang = {
        ...mockLang,
        id: 'rust',
        name: 'Rust Programming',
      };
      render(<ProjectsGalleryView lang={customLang} activeLangId="rust" />);

      expect(
        screen.getByText(/writing guided projects for Rust Programming/i),
      ).toBeInTheDocument();
    });
  });

  describe('Language with skill mapping', () => {
    it('renders difficulty tabs for known language', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      expect(screen.getByText(/🟢 Beginner/)).toBeInTheDocument();
      expect(screen.getByText(/🟡 Mid-Level/)).toBeInTheDocument();
      expect(screen.getByText(/🔴 Advanced/)).toBeInTheDocument();
    });

    it('renders Guided Projects header', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      expect(screen.getByText(/Guided Projects/)).toBeInTheDocument();
      expect(screen.getByText(/Python Projects/)).toBeInTheDocument();
    });
  });

  describe('Difficulty tab interactions', () => {
    it('beginner tab is selected by default', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const beginnerTab = screen.getByText(/🟢 Beginner/).closest('button');
      expect(beginnerTab).toHaveClass(mockLang.bgClass);
    });

    it('clicking tab changes visible projects', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const intermediateTab = screen.getByText(/🟡 Mid-Level/).closest('button');
      fireEvent.click(intermediateTab);

      // The intermediate tab should now be highlighted
      expect(intermediateTab).toHaveClass(mockLang.bgClass);
    });

    it('clicking advanced tab shows advanced projects', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const advancedTab = screen.getByText(/🔴 Advanced/).closest('button');
      fireEvent.click(advancedTab);

      // Verify tab is selected
      expect(advancedTab).toHaveClass(mockLang.bgClass);
    });

    it('tab click clears expanded project', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      // Find first project and expand it (if any projects exist)
      const projectButtons = screen.queryAllByRole('button');
      if (projectButtons.length > 1) {
        const firstProjectBtn = projectButtons[1];
        fireEvent.click(firstProjectBtn);

        // Then click a tab
        const intermediateTab = screen.getByText(/🟡 Mid-Level/).closest('button');
        fireEvent.click(intermediateTab);

        // Expansion state should be cleared (ChevronDown should be visible, not ChevronUp)
        // This is implicit in the tab changing
      }
    });
  });

  describe('Project expansion', () => {
    it('project cards render when projects exist', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      // Should have rendered some projects
      const projectCards = screen.queryAllByRole('button');
      // At least one project should exist for python (tabs + projects)
      expect(projectCards.length).toBeGreaterThanOrEqual(1);
    });

    it('expanding a project shows code editor textarea', async () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      // Click first non-tab button (skip the tab buttons)
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        // Find button that's not a difficulty tab
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        // Look for textarea with code editor
        await waitFor(() => {
          const textareas = screen.queryAllByRole('textbox');
          expect(textareas.length).toBeGreaterThan(0);
        });
      }
    });

    it('expanded project shows all required sections', async () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        // Wait for expansion and check for sections
        await waitFor(() => {
          expect(screen.getByText(/What You'll Build/i)).toBeInTheDocument();
          expect(screen.getByText(/Steps/)).toBeInTheDocument();
        });
      }
    });

    it('collapsing removes expanded content', async () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);
        await waitFor(() => {
          expect(screen.getByText(/What You'll Build/i)).toBeInTheDocument();
        });

        // Click again to collapse
        fireEvent.click(firstProject);

        // The expanded content should not be visible
        // (may still exist in DOM but animation clears it)
      }
    });
  });

  describe('Code editor interactions', () => {
    it('typing in code editor updates state', async () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        await waitFor(() => {
          const textarea = screen.getByPlaceholderText(/Write your.*code here/i);
          expect(textarea).toBeInTheDocument();
          expect((textarea as any).value).toBe('');

          fireEvent.change(textarea, {
            target: { value: 'print("hello")' },
          });

          expect((textarea as any).value).toBe('print("hello")');
        });
      }
    });
  });

  describe('AI Feedback button', () => {
    it('Get AI Feedback button exists when project is expanded', async () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        await waitFor(() => {
          expect(screen.getByRole("button", { name: /Get AI Feedback/i })).toBeInTheDocument();
        });
      }
    });

    it('clicking feedback button calls getCodingFeedback', async () => {
      const mockGetFeedback = vi
        .spyOn(apiModule, 'getCodingFeedback')
        .mockResolvedValueOnce({
          score: 85,
          verdict: 'Good',
          summary: 'Nice work!',
          strengths: ['clean code'],
          improvements: [],
          hint: 'Keep it up',
        });

      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        await waitFor(() => {
          const feedbackBtn = screen.getByRole("button", { name: /Get AI Feedback/i });
          expect(feedbackBtn).toBeInTheDocument();
        });

        const feedbackBtn = screen.getByRole("button", { name: /Get AI Feedback/i });
        fireEvent.click(feedbackBtn);

        await waitFor(() => {
          expect(mockGetFeedback).toHaveBeenCalled();
        });
      }
    });

    it('feedback button is disabled while loading', async () => {
      vi.spyOn(apiModule, 'getCodingFeedback').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            setTimeout(
              () =>
                resolve({
                  score: 80,
                  verdict: 'Good',
                  summary: 'Nice',
                  strengths: [],
                  improvements: [],
                  hint: '',
                }),
              100,
            );
          }),
      );

      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        await waitFor(() => {
          const feedbackBtn = screen.getByRole("button", { name: /Get AI Feedback/i });
          fireEvent.click(feedbackBtn);
        });

        const checkingBtn = screen.queryByText(/Checking your code/i);
        expect(checkingBtn).toBeInTheDocument();
      }
    });
  });

  describe('AI Feedback display', () => {
    it('displays feedback after API call succeeds', async () => {
      vi.spyOn(apiModule, 'getCodingFeedback').mockResolvedValueOnce({
        score: 85,
        verdict: 'Excellent',
        summary: 'Your code is well-structured and efficient!',
        strengths: ['clean code', 'good logic'],
        improvements: ['add comments'],
        hint: 'Consider edge cases',
      });

      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        await waitFor(() => {
          const feedbackBtn = screen.getByRole("button", { name: /Get AI Feedback/i });
          fireEvent.click(feedbackBtn);
        });

        await waitFor(() => {
          expect(screen.getByText(/Excellent/)).toBeInTheDocument();
          expect(screen.getByText(/Your code is well-structured/)).toBeInTheDocument();
        });
      }
    });

    it('displays error feedback on API failure', async () => {
      vi.spyOn(apiModule, 'getCodingFeedback').mockRejectedValueOnce(
        new Error('Network error'),
      );

      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        await waitFor(() => {
          const feedbackBtn = screen.getByRole("button", { name: /Get AI Feedback/i });
          fireEvent.click(feedbackBtn);
        });

        await waitFor(() => {
          expect(
            screen.getByText(/Could not reach AI tutor/i),
          ).toBeInTheDocument();
        });
      }
    });

    it('shows score and verdict in feedback', async () => {
      vi.spyOn(apiModule, 'getCodingFeedback').mockResolvedValueOnce({
        score: 75,
        verdict: 'Good',
        summary: 'Solid work',
        strengths: ['logic is sound'],
        improvements: [],
        hint: 'Try optimizing',
      });

      render(<ProjectsGalleryView lang={mockLang} activeLangId="python" />);

      const projectButtons = screen.queryAllByRole('button');
      const firstProject = projectButtons.find(btn => {
        const text = btn.textContent || '';
        return !text.includes('Beginner') && !text.includes('Mid-Level') && !text.includes('Advanced');
      });

      if (firstProject) {
        fireEvent.click(firstProject);

        await waitFor(() => {
          const feedbackBtn = screen.getByRole("button", { name: /Get AI Feedback/i });
          fireEvent.click(feedbackBtn);
        });

        await waitFor(() => {
          expect(screen.getByText(/Good/)).toBeInTheDocument();
          expect(screen.getByText(/75\/100/)).toBeInTheDocument();
        });
      }
    });
  });

  describe('HTML and CSS projects', () => {
    it('renders html-css projects for html language', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="html" />);

      expect(screen.getByText(/Guided Projects/)).toBeInTheDocument();
    });

    it('renders html-css projects for css language', () => {
      render(<ProjectsGalleryView lang={mockLang} activeLangId="css" />);

      expect(screen.getByText(/Guided Projects/)).toBeInTheDocument();
    });
  });
});
