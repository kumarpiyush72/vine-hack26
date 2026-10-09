import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { soundEngine } from '../audio/sound-synth';
import { X, Heart } from 'lucide-react';

export function ButtonCemetery() {
  const { state, dispatch } = useChaos();

  if (!state.isCemeteryOpen) return null;

  const handlePayRespects = (tombId) => {
    soundEngine.playClick(0.6);
    dispatch({ type: 'RESPECT_TOMBSTONE', id: tombId });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl bg-[#0b0b14] border-2 border-white/20 text-white font-mono shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪦</span>
              <h2 className="text-sm sm:text-base font-black tracking-widest uppercase text-white">
                THE BUTTON CEMETERY // REST IN PIXELS
              </h2>
            </div>

            <button
              onClick={() => dispatch({ type: 'SET_CEMETERY_OPEN', open: false })}
              className="btn-retro-close"
              title="Close Cemetery"
            >
              <X size={12} />
            </button>
          </div>

          {/* Subtitle */}
          <div className="px-4 py-2 bg-black/40 text-[11px] text-muted border-b border-white/5 flex items-center justify-between">
            <span>In solemn memory of user interface elements that gave their lives for your clicks.</span>
            <span className="text-lime font-bold">PRESS F OR CLICK TO PAY RESPECTS</span>
          </div>

          {/* Tombstones Grid */}
          <div className="popup-body p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.tombstones.map((tomb) => (
              <div
                key={tomb.id}
                onClick={() => handlePayRespects(tomb.id)}
                className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-lime transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-xs text-lime uppercase">{tomb.name}</span>
                    <span className="text-[10px] text-muted">
                      † {tomb.died}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-white/80 italic font-sans leading-relaxed">
                    "{tomb.epitaph}"
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-muted">
                    Clicks: <strong className="text-white">{tomb.clicks}</strong>
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-1 text-toxic group-hover:text-lime text-[11px] font-bold"
                  >
                    <Heart size={12} className="fill-current" />
                    <span>Pay Respects</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-black/60 border-t border-white/10 text-right text-xs">
            <button
              onClick={() => dispatch({ type: 'SET_CEMETERY_OPEN', open: false })}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold"
            >
              Close Graveyard
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
