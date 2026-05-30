/**
 * Mascot "Syllu" — a friendly owl drawn in pure SVG (no image files).
 * Used in LessonViewer to encourage young learners. Expression changes by mood.
 */

import { motion } from 'framer-motion';

export type MascotMood = 'happy' | 'cheer' | 'think' | 'oops';

interface MascotProps {
  mood?: MascotMood;
  size?: number;
}

export default function Mascot({ mood = 'happy', size = 64 }: MascotProps) {
  // Eye shape changes with mood
  const eyeRy = mood === 'think' ? 3 : 7;       // squinting when thinking
  const browY = mood === 'oops' ? 20 : 22;       // raised when oops
  const mouth =
    mood === 'cheer' ? 'M 40 64 Q 50 76 60 64'   // big smile
    : mood === 'oops' ? 'M 42 68 Q 50 62 58 68'  // small frown
    : 'M 42 65 Q 50 71 58 65';                    // gentle smile

  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 100 100"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={
        mood === 'cheer'
          ? { scale: 1, opacity: 1, rotate: [0, -8, 8, 0], y: [0, -6, 0] }
          : { scale: 1, opacity: 1, y: [0, -4, 0] }
      }
      transition={
        mood === 'cheer'
          ? { duration: 0.9, repeat: Infinity, repeatDelay: 1.5 }
          : { y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.3 } }
      }
      className="select-none drop-shadow-lg"
    >
      {/* Body */}
      <ellipse cx="50" cy="58" rx="32" ry="34" fill="#7c3aed" />
      <ellipse cx="50" cy="62" rx="22" ry="24" fill="#ede9fe" />
      {/* Ears / tufts */}
      <path d="M 24 30 L 32 14 L 40 32 Z" fill="#7c3aed" />
      <path d="M 76 30 L 68 14 L 60 32 Z" fill="#7c3aed" />
      {/* Eyes (white) */}
      <circle cx="38" cy="44" r="13" fill="#fff" />
      <circle cx="62" cy="44" r="13" fill="#fff" />
      {/* Pupils */}
      <ellipse cx="38" cy="44" rx="5" ry={eyeRy} fill="#1e1b4b" />
      <ellipse cx="62" cy="44" rx="5" ry={eyeRy} fill="#1e1b4b" />
      {/* Eye shine */}
      <circle cx="40" cy="41" r="2" fill="#fff" />
      <circle cx="64" cy="41" r="2" fill="#fff" />
      {/* Brows */}
      <path d={`M 28 ${browY} Q 38 ${browY - 4} 48 ${browY}`} stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={`M 52 ${browY} Q 62 ${browY - 4} 72 ${browY}`} stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Beak */}
      <path d="M 50 50 L 45 58 L 55 58 Z" fill="#fbbf24" />
      {/* Mouth */}
      <path d={mouth} stroke="#a16207" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Feet */}
      <path d="M 40 90 L 40 95 M 36 95 L 44 95" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 60 90 L 60 95 M 56 95 L 64 95" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
    </motion.svg>
  );
}
