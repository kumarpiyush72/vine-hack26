import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { Sparkles, X } from 'lucide-react';

export function AchievementsToast() {
  const { state, dispatch } = useChaos();
  const ach = state.recentAchievement;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none select-none max-w-sm">
      <AnimatePresence>
        {ach && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-auto bg-[#0f0f1c] border-2 border-lime text-white p-3 sm:p-4 shadow-[0_0_25px_rgba(198,255,0,0.4)] font-mono"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-3xl p-1 bg-white/5 border border-white/10 shrink-0">
                  {ach.icon}
                </span>

                <div>
                  <div className="flex items-center gap-1.5 text-lime text-[10px] font-black tracking-widest uppercase">
                    <Sparkles size={11} />
                    <span>ACHIEVEMENT UNLOCKED</span>
                  </div>

                  <h4 className="font-black text-xs sm:text-sm text-white uppercase tracking-wider mt-0.5">
                    {ach.title}
                  </h4>

                  <p className="text-[11px] text-white/70 font-sans mt-1">
                    {ach.desc}
                  </p>

                  <div className="mt-1.5 text-[10px] text-toxic font-mono font-bold">
                    +20 CHAOS PIXELS BONUS
                  </div>
                </div>
              </div>

              <button
                onClick={() => dispatch({ type: 'CLEAR_RECENT_ACHIEVEMENT' })}
                className="text-muted hover:text-white p-1"
                title="Dismiss Toast"
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
