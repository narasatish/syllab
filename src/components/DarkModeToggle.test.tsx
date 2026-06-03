import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from './DarkModeToggle';

vi.mock('lucide-react', () => ({
  Sun: () => <span data-testid="sun-icon">☀</span>,
  Moon: () => <span data-testid="moon-icon">🌙</span>,
}));

describe('DarkModeToggle Component', () => {
  beforeEach(() => {
    // Reset DOM and localStorage state
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    // Reset matchMedia mock (jsdom doesn't provide it by default)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false, // default to light mode
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('renders the toggle button', () => {
    render(<DarkModeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows Moon icon when in light mode', () => {
    render(<DarkModeToggle />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('toggles dark class on html element when clicked', () => {
    render(<DarkModeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists preference to localStorage', () => {
    render(<DarkModeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('syllab_dark_mode')).toBe('true');

    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('syllab_dark_mode')).toBe('false');
  });

  it('defaults to LIGHT even when the OS prefers dark (no saved pref)', () => {
    (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      matches: true, // OS prefers dark
      addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(),
    }));
    render(<DarkModeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('reads saved preference on mount', () => {
    localStorage.setItem('syllab_dark_mode', 'true');
    render(<DarkModeToggle />);
    // After mount, should have applied dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('has accessible aria-label', () => {
    render(<DarkModeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label');
  });

  it('applies custom className prop', () => {
    render(<DarkModeToggle className="my-class" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/my-class/);
  });
});
