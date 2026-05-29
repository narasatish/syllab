/**
 * XP Confetti Animation
 * Shows a burst of confetti particles with XP counter
 * Uses framer-motion for lightweight animations
 */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface XpConfettiProps {
  xpAmount: number;
  onComplete?: () => void;
  position?: { x: number; y: number };
}

const COLORS = [
  '#10B981', // primary green
  '#059669', // primary dark
  '#34D399', // primary light
  '#F97316', // accent orange
  '#3B82F6', // blue
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#F59E0B', // amber
];

function Particle({ color, delay }: { color: string; delay: number }) {
  const angle = Math.random() * Math.PI * 2;
  const distance = 80 + Math.random() * 120;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <motion.div
      key={`${color}-${delay}`}
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ opacity: 1, x: 0, y: 0 }}
      animate={{ opacity: 0, x, y }}
      transition={{
        duration: 2,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

export default function XpConfetti({
  xpAmount,
  onComplete,
  position = { x: 0, y: 0 },
}: XpConfettiProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  const particleCount = 16;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    color: COLORS[i % COLORS.length],
    delay: (i / particleCount) * 0.3,
  }));

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Confetti particles burst outward */}
      <div className="relative w-0 h-0">
        {particles.map((p, i) => (
          <Particle key={i} color={p.color} delay={p.delay} />
        ))}
      </div>

      {/* XP counter in center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
        initial={{ opacity: 1, scale: 0.8, y: 0 }}
        animate={{ opacity: 0, scale: 1.2, y: -60 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="text-2xl font-black text-primary drop-shadow-lg">
          +{xpAmount} XP
        </div>
      </motion.div>
    </div>
  );
}
