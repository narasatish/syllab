/**
 * ErrorBoundary — app-wide safety net so a render-time crash in ANY component
 * shows a friendly recovery screen instead of a blank white page.
 *
 * Goal: the website never "breaks" for a user. If something throws, they get a
 * clear message + a one-tap reload, and we log the error to the console (and any
 * monitoring hook) instead of dying silently.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { reportClientError } from '../lib/errorReporter';

interface Props {
  children: ReactNode;
  /** Optional custom fallback. If omitted, the default recovery screen is used. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : 'Unexpected error' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Visible in console; a real monitoring tool (e.g. Sentry) can hook here.
    console.error('[ErrorBoundary] caught:', error, info?.componentStack);
    // Email-alert the owner that a page crashed (fire-and-forget, throttled).
    reportClientError({
      message: error?.message || 'React render crash',
      source: 'ErrorBoundary',
      stack: (error?.stack || '') + '\n' + (info?.componentStack || ''),
    });
    try {
      window.dispatchEvent(new CustomEvent('syllab:error', { detail: { message: error?.message } }));
    } catch { /* non-fatal */ }
  }

  private handleReload = () => {
    this.setState({ hasError: false, message: '' });
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px', textAlign: 'center', fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ maxWidth: 420 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛠️</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
            Something hiccuped
          </h1>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: '0 0 20px' }}>
            This part of Syllab ran into a problem. Your data is safe — just reload and you'll be back on track.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: '#10b981', color: '#fff', border: 'none', borderRadius: 12,
              padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Reload Syllab
          </button>
          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 16 }}>
            If it keeps happening, please refresh the page (Ctrl+Shift+R).
          </p>
        </div>
      </div>
    );
  }
}
