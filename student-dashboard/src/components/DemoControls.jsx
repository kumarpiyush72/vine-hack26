import React from 'react';
import { motion } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { Zap, X } from 'lucide-react';

export function DemoControls() {
  const { state, dispatch, triggerVoid, triggerCrash } = useChaos();

  if (!state.demoMode) return null;

  const jumpToPhase = (phaseIndex) => {
    dispatch({ type: 'SET_DEMO_PHASE', phaseIndex });
  };

  const unlockAllSecrets = () => {
    ['eye', 'star', 'blackhole', 'smiley', 'skull'].forEach((s) => {
      dispatch({ type: 'FIND_SECRET', secretId: s });
    });
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/95 border-2 border-toxic text-white font-mono p-2.5 sm:p-3 shadow-[0_0_25px_rgba(255,92,40,0.5)] max-w-full overflow-x-auto select-none"
    >
      <div className="flex items-center gap-2 sm:gap-3 text-xs whitespace-nowrap">
        {/* Badge */}
        <div className="flex items-center gap-1 text-toxic font-black">
          <Zap size={14} className="animate-bounce" />
          <span>JUDGE DEMO BAR:</span>
        </div>

        {/* Phase Jumpers */}
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => jumpToPhase(lvl)}
              className={`px-2 py-1 text-[11px] font-bold border transition-colors ${
                state.chaosLevel === lvl
                  ? 'bg-toxic text-black border-toxic'
                  : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
              title={`Jump directly to Phase ${lvl}`}
            >
              P{lvl}
            </button>
          ))}
        </div>

        {/* Quick Feature Triggers */}
        <div className="flex items-center gap-1 border-l border-white/20 pl-2">
          <button
            onClick={triggerVoid}
            className="px-2 py-1 bg-magenta/20 hover:bg-magenta text-magenta hover:text-white border border-magenta text-[11px] font-bold transition-all"
            title="Demonstrate The Void"
          >
            Void 🕳️
          </button>

          <button
            onClick={triggerCrash}
            className="px-2 py-1 bg-cobalt/20 hover:bg-cobalt text-blue-300 hover:text-white border border-cobalt text-[11px] font-bold transition-all"
            title="Demonstrate Fake Crash"
          >
            Crash 💻
          </button>

          <button
            onClick={unlockAllSecrets}
            className="px-2 py-1 bg-lime/20 hover:bg-lime text-lime hover:text-black border border-lime text-[11px] font-bold transition-all"
            title="Collect all 5 Secrets instantly"
          >
            Unlock All 5 ★
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_FORBIDDEN', active: true })}
            className="px-2 py-1 bg-yellow-400/20 hover:bg-yellow-400 text-yellow-300 hover:text-black border border-yellow-400 text-[11px] font-bold transition-all"
            title="Open Forbidden Dimension"
          >
            Dimension 👑
          </button>
        </div>

        {/* Close Demo Mode */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DEMO_MODE' })}
          className="p-1 text-muted hover:text-white border border-white/10 ml-1"
          title="Dismiss Demo Toolbar"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}
