/**
 * ShareResultCard — generates and shares a branded score card via image
 * Supports native Web Share API for mobile + file sharing
 * Falls back to download + WhatsApp link on desktop
 */
import React from 'react';
import { Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ShareResultCardProps {
  score: number;
  total: number;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Draw a rounded rectangle on canvas (polyfill for older browsers)
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  // Use native roundRect if available, otherwise draw manually
  if (typeof (ctx as any).roundRect === 'function') {
    (ctx as any).roundRect(x, y, w, h, [r]);
    return;
  }

  // Fallback: draw four corners + four sides
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Draw a branded Syllab result card on canvas
 * Returns a Blob of the PNG image
 */
async function generateCardImage(
  score: number,
  total: number,
  title: string,
  subtitle?: string,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Card dimensions (Instagram-friendly square)
    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Background: gradient (top emerald → bottom white)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#10b981'); // emerald-500
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // White content panel (leaves breathing room)
    const panelX = 60;
    const panelY = 150;
    const panelW = width - 120;
    const panelH = height - 300;
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, panelX, panelY, panelW, panelH, 30);
    ctx.fill();

    // Syllab.in logo / wordmark (top of panel)
    ctx.font = 'bold 36px "Arial", sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    ctx.fillText('Syllab.in', width / 2, panelY + 50);

    // Percentage score (BIG)
    ctx.font = 'black 120px "Arial", sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    const accuracy = Math.round((score / total) * 100);
    ctx.fillText(`${accuracy}%`, width / 2, panelY + 180);

    // Correct / Total
    ctx.font = 'bold 32px "Arial", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText(`${score} / ${total} Correct`, width / 2, panelY + 240);

    // Title (exam/test name)
    ctx.font = 'bold 28px "Arial", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    const titleY = panelY + 300;
    ctx.fillText(title, width / 2, titleY);

    // Subtitle (chapter/subject) if provided
    if (subtitle) {
      ctx.font = '20px "Arial", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.fillText(subtitle, width / 2, titleY + 40);
    }

    // Motivating tagline
    ctx.font = 'bold 24px "Arial", sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    const taglineY = panelY + panelH - 60;
    ctx.fillText('Beat my score 👉 syllab.in', width / 2, taglineY);

    // Convert canvas to Blob
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas toBlob failed'));
      }
    }, 'image/png');
  });
}

export default function ShareResultCard({
  score,
  total,
  title,
  subtitle,
  className = '',
}: ShareResultCardProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleShare = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Generate the card image
      const blob = await generateCardImage(score, total, title, subtitle);

      // Check if navigator.canShare supports files (mobile feature-detection)
      const canShareFiles = typeof navigator !== 'undefined' && navigator.canShare && navigator.share
        ? navigator.canShare?.({ files: [new File([''], 'test.png')] })
        : false;

      if (canShareFiles) {
        // MOBILE: Use Web Share API with file
        const file = new File([blob], 'syllab-score.png', { type: 'image/png' });
        const accuracy = Math.round((score / total) * 100);

        try {
          await navigator.share({
            files: [file],
            title: 'My Syllab Score',
            text: `I scored ${accuracy}% on Syllab — beat me! syllab.in`,
          });
        } catch (err: any) {
          // User cancelled share, not an error
          if (err?.name === 'AbortError') {
            setIsGenerating(false);
            return;
          }
          throw err;
        }
      } else {
        // DESKTOP FALLBACK: Download image + open WhatsApp link
        // 1. Download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'syllab-score.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // 2. Open WhatsApp with text (user will attach the downloaded image)
        const accuracy = Math.round((score / total) * 100);
        const waText = encodeURIComponent(
          `I scored ${accuracy}% on Syllab — beat me! syllab.in`
        );
        window.open(`https://wa.me/?text=${waText}`, '_blank', 'noopener,noreferrer');

        // 3. Show a small hint
        // (In a real app, you might use a toast)
        alert('Card downloaded! Attach it in WhatsApp and share.');
      }
    } catch (err) {
      console.error('[ShareResultCard]', err);
      setError('Could not generate card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={cn('flex justify-center', className)}>
      <button
        type="button"
        onClick={() => void handleShare()}
        disabled={isGenerating}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-all',
          'bg-green-500 text-white shadow-lg shadow-green-500/20',
          'hover:bg-green-600 hover:shadow-lg hover:-translate-y-1 hover:shadow-green-600/30',
          'active:translate-y-0',
          'disabled:opacity-60 disabled:cursor-not-allowed',
        )}
        title="Share your score as a card on WhatsApp, Instagram, or other apps"
      >
        <Share2 size={16} />
        {isGenerating ? 'Creating card…' : '📲 Share my score'}
      </button>
      {error && (
        <p className="mt-2 text-xs text-rose-600">{error}</p>
      )}
    </div>
  );
}
