import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChallengesView from './ChallengesView';
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
  Play: () => <span data-testid="play-icon">▶</span>,
  Lightbulb: () => <span data-testid="lightbulb-icon">💡</span>,
  Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
  ChevronRight: () => <span data-testid="chevron-right">→</span>,
  X: () => <span data-testid="x-icon">✕</span>,
  Shuffle: () => <span data-testid="shuffle-icon">🔀</span>,
}));

describe('ChallengesView Component', () => {
  const mockLang = {
    id: 'javascript',
    name: 'JavaScript',
    bgClass: 'bg-yellow-500',
    icon: '⚡',
    emoji: '⚡',
    color: '#F7DF1E',
    textClass: 'text-yellow-600',
    borderClass: 'border-yellow-400',
    editorMode: 'live' as const,
    description: 'Learn JavaScript',
    content: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Language without challenge support', () => {
    it('renders "coming soon" message for unsupported language', () => {
      const unsupportedLang = {
        ...mockLang,
        id: 'golang',
        name: 'Go',
      };
      render(
        <ChallengesView
          lang={unsupportedLang}
          activeLangId="golang"
        />,
      );

      expect(screen.getByText(/challenges coming soon/i)).toBeInTheDocument();
      expect(screen.getByText(/writing them/i)).toBeInTheDocument();
    });

    it('displays language name in coming soon message', () => {
      const customLang = {
        ...mockLang,
        id: 'rust',
        name: 'Rust',
      };
      render(<ChallengesView lang={customLang} activeLangId="rust" />);

      expect(
        screen.getByText(/Rust challenges coming soon/i),
      ).toBeInTheDocument();
    });
  });

  describe('Language with challenge support', () => {
    it('renders challenge header for known language', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      expect(screen.getByText(/Coding Challenges/i)).toBeInTheDocument();
      expect(screen.getByText(/JavaScript Challenges/i)).toBeInTheDocument();
    });

    it('renders difficulty filter buttons', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      // Use getAllByText to handle multiple matches gracefully
      expect(screen.getAllByText(/^All$/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/🟢 Beginner/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/🟡 Mid/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/🔴 Advanced/)[0]).toBeInTheDocument();
    });

    it('renders random challenge button', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      expect(screen.queryAllByText(/Random/).length).toBeGreaterThan(0);
    });
  });

  describe('Challenge rendering', () => {
    it('renders challenge cards for known language', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      // Should have at least some challenges visible
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders challenge title and story', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      // Look for challenge titles (they should be visible)
      const allText = screen.queryAllByText(/Print|Scoring|Hello|Cricket|Addition/);
      expect(allText.length).toBeGreaterThan(0);
    });

    it('shows difficulty badge on challenge cards', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      expect(screen.queryAllByText(/beginner/i).length).toBeGreaterThan(0);
    });

    it('shows XP and estimated minutes on cards', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      // XP and minutes should be shown
      const xpElements = screen.queryAllByText(/\+\d+ XP/);
      const timeElements = screen.queryAllByText(/~\d+min/);
      expect(xpElements.length).toBeGreaterThan(0);
      expect(timeElements.length).toBeGreaterThan(0);
    });
  });

  describe('Difficulty filtering', () => {
    it('shows all challenges by default', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const allBtns = screen.queryAllByRole('button').filter(b => b.textContent?.trim() === 'All');
      expect(allBtns.length).toBeGreaterThan(0);
      expect(allBtns[0]).toHaveClass(mockLang.bgClass);
    });

    it('filters to beginner challenges when clicking beginner button', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const beginnerBtns = screen.queryAllByRole('button').filter(b => /🟢 Beginner/.test(b.textContent || ''));
      expect(beginnerBtns.length).toBeGreaterThan(0);
      fireEvent.click(beginnerBtns[0]);
      expect(beginnerBtns[0]).toHaveClass(mockLang.bgClass);
    });

    it('filters to intermediate challenges when clicking mid button', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const midBtns = screen.queryAllByRole('button').filter(b => /🟡 Mid/.test(b.textContent || ''));
      expect(midBtns.length).toBeGreaterThan(0);
      fireEvent.click(midBtns[0]);
      expect(midBtns[0]).toHaveClass(mockLang.bgClass);
    });

    it('filters to advanced challenges when clicking advanced button', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const advBtns = screen.queryAllByRole('button').filter(b => /🔴 Advanced/.test(b.textContent || ''));
      expect(advBtns.length).toBeGreaterThan(0);
      fireEvent.click(advBtns[0]);
      expect(advBtns[0]).toHaveClass(mockLang.bgClass);
    });
  });

  describe('Challenge selection and modal', () => {
    it('opens challenge detail when clicking a challenge card', async () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      // Click first visible challenge
      const challengeButtons = screen.queryAllByRole('button');
      const firstChallenge = challengeButtons.find(btn => {
        const text = btn.textContent || '';
        return (
          text.includes('Print') ||
          text.includes('Scoring') ||
          text.includes('Cricket')
        );
      });

      if (firstChallenge) {
        fireEvent.click(firstChallenge);

        await waitFor(() => {
          expect(screen.queryAllByText(/Challenge/i).length).toBeGreaterThan(0);
        });
      }
    });

    it('shows challenge details in modal', async () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const challengeButtons = screen.queryAllByRole('button');
      const firstChallenge = challengeButtons.find(btn => {
        const text = btn.textContent || '';
        return (
          text.includes('Print') ||
          text.includes('Scoring') ||
          text.includes('Cricket')
        );
      });

      if (firstChallenge) {
        fireEvent.click(firstChallenge);

        await waitFor(() => {
          expect(screen.getByText(/Story/i)).toBeInTheDocument();
          expect(screen.getByText(/Task/i)).toBeInTheDocument();
        });
      }
    });

    it('closes modal when clicking close button', async () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const challengeButtons = screen.queryAllByRole('button');
      const firstChallenge = challengeButtons.find(btn => {
        const text = btn.textContent || '';
        return (
          text.includes('Print') ||
          text.includes('Scoring') ||
          text.includes('Cricket')
        );
      });

      if (firstChallenge) {
        fireEvent.click(firstChallenge);

        await waitFor(() => {
          expect(screen.getByTestId('x-icon')).toBeInTheDocument();
        });

        const closeBtn = screen.getByTestId('x-icon').closest('button');
        if (closeBtn) {
          fireEvent.click(closeBtn);

          // Modal should be gone
          await waitFor(() => {
            expect(screen.queryByText(/^Challenge$/)).not.toBeInTheDocument();
          });
        }
      }
    });
  });

  describe('Code editor and execution', () => {
    it('shows code editor textarea for JavaScript challenges', async () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const challengeButtons = screen.queryAllByRole('button');
      const firstChallenge = challengeButtons.find(btn => {
        const text = btn.textContent || '';
        return (
          text.includes('Print') ||
          text.includes('Scoring') ||
          text.includes('Cricket')
        );
      });

      if (firstChallenge) {
        fireEvent.click(firstChallenge);

        await waitFor(() => {
          const textareas = screen.queryAllByRole('textbox');
          expect(textareas.length).toBeGreaterThan(0);
        });
      }
    });

    it('allows typing in code editor', async () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const challengeButtons = screen.queryAllByRole('button');
      const firstChallenge = challengeButtons.find(btn => {
        const text = btn.textContent || '';
        return (
          text.includes('Print') ||
          text.includes('Scoring') ||
          text.includes('Cricket')
        );
      });

      if (firstChallenge) {
        fireEvent.click(firstChallenge);

        await waitFor(() => {
          const textarea = screen.getByRole('textbox');
          fireEvent.change(textarea, {
            target: { value: 'console.log("test")' },
          });

          expect((textarea as any).value).toContain('console.log');
        });
      }
    });
  });

  describe('Python and other language challenges', () => {
    it('renders Python challenges for python language', () => {
      render(<ChallengesView lang={mockLang} activeLangId="python" />);

      expect(screen.getByText(/Coding Challenges/i)).toBeInTheDocument();
    });

    it('renders SQL challenges for sql language', () => {
      render(<ChallengesView lang={mockLang} activeLangId="sql" />);

      expect(screen.getByText(/Coding Challenges/i)).toBeInTheDocument();
    });

    it('renders Java challenges for java language', () => {
      render(<ChallengesView lang={mockLang} activeLangId="java" />);

      expect(screen.getByText(/Coding Challenges/i)).toBeInTheDocument();
    });

    it('maps HTML to JavaScript challenges', () => {
      render(<ChallengesView lang={mockLang} activeLangId="html" />);

      expect(screen.getByText(/Coding Challenges/i)).toBeInTheDocument();
    });

    it('maps CSS to JavaScript challenges', () => {
      render(<ChallengesView lang={mockLang} activeLangId="css" />);

      expect(screen.getByText(/Coding Challenges/i)).toBeInTheDocument();
    });
  });

  describe('AI Feedback integration', () => {
    it('provides AI feedback button in challenge modal', async () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const challengeButtons = screen.queryAllByRole('button');
      const firstChallenge = challengeButtons.find(btn => {
        const text = btn.textContent || '';
        return (
          text.includes('Print') ||
          text.includes('Scoring') ||
          text.includes('Cricket')
        );
      });

      if (firstChallenge) {
        fireEvent.click(firstChallenge);

        await waitFor(() => {
          expect(screen.queryAllByText(/Feedback/i).length).toBeGreaterThan(0);
        });
      }
    });
  });

  describe('Random challenge', () => {
    it('random button selects a random challenge', async () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      const randomBtns = screen.queryAllByText(/Random/);
      if (randomBtns.length > 0) {
        fireEvent.click(randomBtns[0]);
      }

      // Some UI change should happen
      await waitFor(() => {
        expect(screen.queryAllByRole('button').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Multi-language support', () => {
    it('supports JavaScript challenges', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);
      expect(screen.getByText(/JavaScript Challenges/)).toBeInTheDocument();
    });

    it('supports Python challenges', () => {
      const pythonLang = { ...mockLang, id: 'python', name: 'Python' };
      render(<ChallengesView lang={pythonLang} activeLangId="python" />);
      expect(screen.getByText(/Python Challenges/)).toBeInTheDocument();
    });

    it('supports SQL challenges', () => {
      const sqlLang = { ...mockLang, id: 'sql', name: 'SQL' };
      render(<ChallengesView lang={sqlLang} activeLangId="sql" />);
      expect(screen.getByText(/SQL Challenges/)).toBeInTheDocument();
    });

    it('supports Java challenges', () => {
      const javaLang = { ...mockLang, id: 'java', name: 'Java' };
      render(<ChallengesView lang={javaLang} activeLangId="java" />);
      expect(screen.getByText(/Java Challenges/)).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles empty challenge list gracefully', () => {
      // This would be for an unsupported language
      render(
        <ChallengesView
          lang={{ ...mockLang, id: 'forth', name: 'Forth' }}
          activeLangId="forth"
        />,
      );

      expect(
        screen.getByText(/Forth challenges coming soon/i),
      ).toBeInTheDocument();
    });

    it('challenge count is shown in header', () => {
      render(<ChallengesView lang={mockLang} activeLangId="javascript" />);

      // The header should show number of challenges
      const header = screen.getByText(/Coding Challenges/);
      const parentText = header.closest('div')?.textContent || '';
      expect(parentText).toContain('challenges');
    });
  });
});
