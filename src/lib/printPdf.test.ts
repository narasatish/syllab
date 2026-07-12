/**
 * printPdf.test.ts — verifies the PDF/print exporters produce correct, safe HTML.
 * window.open is unavailable in jsdom, so we mock it and capture document.write().
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { exportArticleAsPDF, exportNcertChapterAsPDF } from './printPdf';

function mockPrintWindow() {
  let html = '';
  const fakeDoc = { write: (s: string) => { html += s; }, close: vi.fn() };
  const fakeWin = { document: fakeDoc, focus: vi.fn(), print: vi.fn(), addEventListener: vi.fn() };
  vi.spyOn(window, 'open').mockReturnValue(fakeWin as unknown as Window);
  return () => html;
}

afterEach(() => { vi.restoreAllMocks(); });

describe('exportArticleAsPDF', () => {
  it('writes a full HTML doc with title, subtitle, sections and watermark', () => {
    const getHtml = mockPrintWindow();
    exportArticleAsPDF({
      title: 'Photosynthesis',
      subtitle: 'Class 10 · Biology',
      sections: [
        { heading: 'Overview', body: 'Plants make food.' },
        { heading: 'Steps', body: 'Step 1\nStep 2' },
      ],
    });
    const html = getHtml();
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Photosynthesis');
    expect(html).toContain('Class 10 · Biology');
    expect(html).toContain('Overview');
    expect(html).toContain('Steps');
    expect(html).toContain('SYLLAB.IN');
    expect(html).toContain('syllab.in'); // watermark
    // newlines inside a body become <br>
    expect(html).toContain('Step 1<br>Step 2');
  });

  it('escapes HTML to prevent broken markup / injection', () => {
    const getHtml = mockPrintWindow();
    exportArticleAsPDF({ title: 'A & B <x>', sections: [{ heading: 'H<i>', body: '1 < 2 & 3 > 0' }] });
    const html = getHtml();
    expect(html).toContain('A &amp; B &lt;x&gt;');
    expect(html).toContain('1 &lt; 2 &amp; 3 &gt; 0');
    expect(html).not.toContain('<x>');
  });

  it('skips empty sections gracefully', () => {
    const getHtml = mockPrintWindow();
    exportArticleAsPDF({ title: 'T', sections: [{ heading: '', body: '' }, { heading: 'Real', body: 'x' }] });
    const html = getHtml();
    expect(html).toContain('Real');
  });

  it('does nothing harmful when popup is blocked (window.open returns null)', () => {
    vi.spyOn(window, 'open').mockReturnValue(null);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    expect(() => exportArticleAsPDF({ title: 'T', sections: [{ body: 'x' }] })).not.toThrow();
    expect(alertSpy).toHaveBeenCalled();
  });
});

describe('exportNcertChapterAsPDF', () => {
  it('renders numbered question/solution pairs', () => {
    const getHtml = mockPrintWindow();
    exportNcertChapterAsPDF({
      title: 'Real Numbers',
      classLevel: 10,
      subject: 'Maths',
      items: [
        { number: 1, question: 'What is HCF?', solution: 'Highest common factor.' },
        { number: 2, question: 'Define LCM', solution: 'Least common multiple.' },
      ],
    });
    const html = getHtml();
    expect(html).toContain('Real Numbers');
    expect(html).toContain('What is HCF?');
    expect(html).toContain('Highest common factor.');
    expect(html).toContain('2 Questions with Solutions');
    expect(html).toContain('SYLLAB.IN');
  });
});
