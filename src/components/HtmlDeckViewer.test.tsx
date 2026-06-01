import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HtmlDeckViewer from './HtmlDeckViewer';

// framer-motion → plain div so we can render without animation engine
vi.mock('framer-motion', () => ({
  motion: { div: (props: Record<string, unknown>) => <div {...props} /> },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const DECK_HTML = '<!doctype html><html><body><section class="slide">Hi</section></body></html>';

function mockFetch(impl: (url: string) => { ok: boolean; text: string }) {
  vi.stubGlobal('fetch', vi.fn(async (url: string) => {
    const r = impl(url);
    return { ok: r.ok, text: async () => r.text } as Response;
  }));
}

describe('HtmlDeckViewer (deck-missing guard)', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

  it('renders the deck via srcDoc when the file is a real deck', async () => {
    mockFetch(() => ({ ok: true, text: DECK_HTML }));
    render(<HtmlDeckViewer url="/generated-decks/x.html" title="Electricity" onClose={() => {}} onPractice={() => {}} />);
    const iframe = await screen.findByTitle('Electricity');
    expect(iframe).toHaveAttribute('srcdoc', DECK_HTML);
    // PDF button only shows when ready
    expect(screen.getByText(/PDF/)).toBeInTheDocument();
  });

  it('never renders an iframe pointing at the SPA when the deck is missing', async () => {
    // SPA fallback returns index.html (no slide marker)
    mockFetch(() => ({ ok: true, text: '<!doctype html><html><body><div id="root"></div></body></html>' }));
    const onMissing = vi.fn();
    render(<HtmlDeckViewer url="/generated-decks/missing.html" title="Electricity" onClose={() => {}} onPractice={() => {}} onMissing={onMissing} />);
    await waitFor(() => expect(screen.getByText(/being prepared/i)).toBeInTheDocument());
    // no iframe was ever created with a deck src
    expect(screen.queryByTitle('Electricity')).not.toBeInTheDocument();
  });

  it('falls back to the AI lesson (onMissing) when a deck 404s', async () => {
    mockFetch(() => ({ ok: false, text: '' }));
    const onMissing = vi.fn();
    render(<HtmlDeckViewer url="/generated-decks/404.html" title="Electricity" onClose={() => {}} onPractice={() => {}} onMissing={onMissing} />);
    await waitFor(() => expect(onMissing).toHaveBeenCalledTimes(1), { timeout: 2500 });
  });
});
