import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WhatsAppShare from './WhatsAppShare';

// Mock lucide-react MessageCircle icon
vi.mock('lucide-react', () => ({
  MessageCircle: () => <span data-testid="msg-icon">💬</span>,
}));

describe('WhatsAppShare Component', () => {
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    openSpy.mockClear();
  });

  it('renders the share button', () => {
    render(<WhatsAppShare text="Check this out" url="https://syllab.in" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows default label', () => {
    render(<WhatsAppShare text="Check this" />);
    expect(screen.getByText(/Share on WhatsApp/i)).toBeInTheDocument();
  });

  it('shows custom label when provided', () => {
    render(<WhatsAppShare text="Hello" label="Tell a friend" />);
    expect(screen.getByText(/Tell a friend/i)).toBeInTheDocument();
  });

  it('shows icon by default', () => {
    render(<WhatsAppShare text="Hi" />);
    expect(screen.getByTestId('msg-icon')).toBeInTheDocument();
  });

  it('hides icon when showIcon=false', () => {
    render(<WhatsAppShare text="Hi" showIcon={false} />);
    expect(screen.queryByTestId('msg-icon')).not.toBeInTheDocument();
  });

  it('opens wa.me URL with encoded text on click', () => {
    render(<WhatsAppShare text="My XP is 500!" url="https://syllab.in/profile" />);
    fireEvent.click(screen.getByRole('button'));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const calledUrl = openSpy.mock.calls[0][0] as string;
    expect(calledUrl).toMatch(/^https:\/\/wa\.me\//);
    expect(calledUrl).toContain(encodeURIComponent('My XP is 500!'));
    expect(calledUrl).toContain(encodeURIComponent('https://syllab.in/profile'));
  });

  it('opens in new tab with secure rel', () => {
    render(<WhatsAppShare text="Hi" />);
    fireEvent.click(screen.getByRole('button'));
    expect(openSpy).toHaveBeenCalledWith(
      expect.any(String),
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('handles missing url gracefully (uses just text)', () => {
    render(<WhatsAppShare text="Hello world" url="" />);
    fireEvent.click(screen.getByRole('button'));
    const calledUrl = openSpy.mock.calls[0][0] as string;
    expect(calledUrl).toContain(encodeURIComponent('Hello world'));
  });

  it('applies custom className', () => {
    render(<WhatsAppShare text="Hi" className="my-custom-class" />);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/my-custom-class/);
  });
});
