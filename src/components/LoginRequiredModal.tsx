import React from 'react';
import { Lock, LogIn, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginRequiredModal({ isOpen, onClose, message }: LoginRequiredModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-secondary/80 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[3rem] p-10 z-[101] shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-primary mx-auto shadow-inner">
                <Lock size={32} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-3xl font-heading font-black text-secondary">Login Required</h3>
                <p className="text-slate-500 font-medium italic">
                  {message || "Authentication is required to save your progress, track streaks, and climb the leaderboard."}
                </p>
              </div>

              <div className="pt-4 space-y-4">
                <button 
                  onClick={() => {
                    onClose();
                    // Implement logic to show auth modal or redirect to auth
                  }}
                  className="w-full btn-primary"
                >
                  <LogIn size={20} />
                  Login to Syllab
                </button>
                
                <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <Sparkles size={12} className="text-primary" />
                  Join 12,500+ Top Scholars
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
