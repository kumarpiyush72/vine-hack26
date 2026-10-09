import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { soundEngine } from '../audio/sound-synth';
import { Star, X, AlertCircle, HelpCircle } from 'lucide-react';

export function PopupManager() {
  const { state, dispatch, findSecret } = useChaos();

  const handleAction = (popup) => {
    soundEngine.playClick();
    // Dispatch reward or effect
    if (popup.actionType === 'money') {
      soundEngine.playCoins();
    }
    // Close the popup
    dispatch({ type: 'CLOSE_POPUP', instanceId: popup.instanceId });
  };

  const handleClose = (popup) => {
    soundEngine.playGlitch();
    dispatch({ type: 'CLOSE_POPUP', instanceId: popup.instanceId });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {state.popups.map((popup) => {
          const hasStarSecret = popup.hasSecret === 'star' && !state.secrets.includes('star');

          return (
            <motion.div
              key={popup.instanceId}
              drag
              dragMomentum={false}
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                position: 'absolute',
                left: `${popup.x}px`,
                top: `${popup.y}px`,
                zIndex: popup.zIndex,
              }}
              className="pointer-events-auto w-[320px] sm:w-[360px] retro-window bg-[#0d0d18] text-white border-2 border-white/20 select-none shadow-2xl"
            >
              {/* Retro Window Titlebar */}
              <div
                className={`retro-titlebar ${
                  popup.headerBg === 'bg-toxic'
                    ? 'bg-toxic text-black'
                    : popup.headerBg === 'bg-magenta'
                    ? 'bg-magenta text-white'
                    : popup.headerBg === 'bg-lime'
                    ? 'bg-lime text-black'
                    : 'bg-cobalt text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-current" />
                  <span className="truncate">{popup.title}</span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Secret #2 collectible star inside the Moon popup! */}
                  {hasStarSecret && (
                    <button
                      onClick={() => findSecret('star')}
                      className="p-0.5 text-lime hover:scale-125 transition-transform"
                      title="Secret 2/5: The Broken Star [CLICK TO CLAIM]"
                    >
                      <Star size={14} className="fill-current animate-spin" />
                    </button>
                  )}

                  <button
                    onClick={() => handleClose(popup)}
                    className="btn-retro-close"
                    title="Close Dialog"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-4 font-mono text-xs space-y-3 bg-[#08080c]/95">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 border border-white/10 shrink-0 text-lime">
                    {popup.type === 'warning' ? (
                      <AlertCircle size={20} className="text-toxic" />
                    ) : popup.type === 'error' ? (
                      <AlertCircle size={20} className="text-magenta" />
                    ) : (
                      <HelpCircle size={20} className="text-lime" />
                    )}
                  </div>
                  <p className="leading-relaxed text-white/90">{popup.body}</p>
                </div>

                {/* Secret clue in moon window */}
                {popup.hasSecret === 'star' && (
                  <div className="text-[10px] text-lime/80 bg-lime/10 p-1.5 border border-lime/30 flex items-center gap-1">
                    <span>⭐ Celestial anomaly detected in header bar!</span>
                  </div>
                )}

                {/* Dialog Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleClose(popup)}
                    className="px-3 py-1.5 text-[11px] bg-white/5 hover:bg-white/15 border border-white/20 text-muted hover:text-white transition-colors"
                  >
                    Dismiss
                  </button>

                  <button
                    onClick={() => handleAction(popup)}
                    className="px-3 py-1.5 text-[11px] font-bold bg-lime text-black hover:bg-white transition-all border border-lime shadow-[0_0_10px_rgba(198,255,0,0.3)]"
                  >
                    {popup.buttonText}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
