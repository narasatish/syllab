/**
 * Pomodoro Timer
 * 25-minute focus + 5-minute break cycles
 * Persists state via localStorage
 * Notification sound when phase ends
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX } from 'lucide-react';

const FOCUS_MINUTES = 25;
const BREAK_MINUTES = 5;

const LS_POMODORO = 'syllab_pomodoro_state';

type Phase = 'focus' | 'break';

interface PomodoroState {
  timeLeft: number;
  phase: Phase;
  isRunning: boolean;
}

export default function PomodoroTimer() {
  const [state, setState] = useState<PomodoroState>(() => {
    try {
      const saved = localStorage.getItem(LS_POMODORO);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, isRunning: false }; // Don't resume running on page load
      }
    } catch (e) {
      console.error('[pomodoro] load failed', e);
    }
    return {
      timeLeft: FOCUS_MINUTES * 60,
      phase: 'focus',
      isRunning: false,
    };
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem('syllab_pomodoro_hidden') === '1'; } catch { return false; }
  });
  const hidePermanently = () => {
    try { localStorage.setItem('syllab_pomodoro_hidden', '1'); } catch { /* ignore */ }
    setDismissed(true);
  };
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_POMODORO, JSON.stringify(state));
    } catch (e) {
      console.error('[pomodoro] save failed', e);
    }
  }, [state]);

  // Timer loop
  useEffect(() => {
    if (!state.isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;

        // Timer ended
        if (newTimeLeft <= 0) {
          // Play sound
          if (soundEnabled) {
            playNotificationSound();
          }

          // Switch phase
          if (prev.phase === 'focus') {
            return {
              ...prev,
              timeLeft: BREAK_MINUTES * 60,
              phase: 'break',
              isRunning: false, // Pause after phase ends
            };
          } else {
            return {
              ...prev,
              timeLeft: FOCUS_MINUTES * 60,
              phase: 'focus',
              isRunning: false,
            };
          }
        }

        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isRunning, soundEnabled]);

  const playNotificationSound = () => {
    // Create a simple beep using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.frequency.value = 800; // Frequency in Hz
      oscillator.type = 'sine';

      gain.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.error('[pomodoro] sound play failed', e);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const reset = () => {
    setState({
      timeLeft: FOCUS_MINUTES * 60,
      phase: 'focus',
      isRunning: false,
    });
  };

  const phaseColor = state.phase === 'focus' ? 'from-blue-500 to-indigo-600' : 'from-green-500 to-emerald-600';
  const phaseLabel = state.phase === 'focus' ? 'Focus Time' : 'Break Time';
  const progress = state.phase === 'focus'
    ? ((FOCUS_MINUTES * 60 - state.timeLeft) / (FOCUS_MINUTES * 60)) * 100
    : ((BREAK_MINUTES * 60 - state.timeLeft) / (BREAK_MINUTES * 60)) * 100;

  if (dismissed) return null;

  return (
    <>
      {/* Floating button when collapsed (with a permanent-hide ✕) */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 left-6 z-40"
          >
            <button
              onClick={() => setIsExpanded(true)}
              aria-label="Open focus timer"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center font-black text-[10px] sm:text-xs"
            >
              {formatTime(state.timeLeft)}
            </button>
            <button
              onClick={hidePermanently}
              aria-label="Hide the focus timer"
              title="Hide timer"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-white shadow ring-2 ring-white/70 hover:bg-slate-900"
            >
              <X size={11} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded timer panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 left-6 z-40 w-80 max-w-[calc(100vw-3rem)] rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${phaseColor} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest">{phaseLabel}</h3>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={hidePermanently}
                    className="rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                    title="Hide the timer permanently"
                  >
                    Hide
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    aria-label="Collapse timer"
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Timer display */}
              <div className="text-center mb-4">
                <div className="text-5xl font-black font-mono tracking-wider mb-2">
                  {formatTime(state.timeLeft)}
                </div>
                <p className="text-sm text-white/80">
                  {state.isRunning ? 'Running...' : 'Paused'}
                </p>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-black uppercase tracking-widest text-sm transition-all ${
                    state.isRunning
                      ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {state.isRunning ? <Pause size={16} /> : <Play size={16} />}
                  {state.isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 bg-slate-100 text-slate-800 font-black uppercase tracking-widest text-sm hover:bg-slate-200 transition-all"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>

              {/* Sound toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors"
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                {soundEnabled ? 'Sound On' : 'Sound Off'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
