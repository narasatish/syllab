/**
 * WhatsApp Share Button
 * Reusable component for sharing content via WhatsApp
 */
import { MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface WhatsAppShareProps {
  text: string;
  url?: string;
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export default function WhatsAppShare({
  text,
  url = typeof window !== 'undefined' ? window.location.href : '',
  className = '',
  showIcon = true,
  label = 'Share on WhatsApp',
}: WhatsAppShareProps) {
  const handleShare = () => {
    const fullText = url ? `${text}\n\n${url}` : text;
    const encodedText = encodeURIComponent(fullText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-2.5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-green-600 hover:shadow-lg hover:-translate-y-1 active:translate-y-0',
        className
      )}
      title={label}
    >
      {showIcon && <MessageCircle size={16} />}
      {label}
    </button>
  );
}
