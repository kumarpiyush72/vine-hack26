import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';

export function VoidPortal() {
  const { state, closeVoid, findSecret } = useChaos();

  if (!state.isVoidActive) return null;

  const blackHoleFound = state.secrets.includes('blackhole');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl select-none"
      >
        {/* Background Swirling Accents */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute w-[600px] h-[600px] rounded-full border border-magenta/20 border-dashed pointer-events-none"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className="absolute w-[450px] h-[450px] rounded-full border-2 border-lime/20 border-dotted pointer-events-none"
        />

        {/* Central Singularity Vortex */}
        <div className="relative flex flex-col items-center justify-center text-center p-6 max-w-lg z-10">
          
          {/* Gravitational Core */}
          <motion.div
            animate={{
              scale: [1, 1.25, 0.95, 1.1, 1],
              boxShadow: [
                '0 0 50px #FF2DAA',
                '0 0 100px #3155FF',
                '0 0 70px #C6FF00',
                '0 0 50px #FF2DAA',
              ],
            }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-black border-4 border-white flex items-center justify-center relative cursor-pointer group"
            onClick={() => findSecret('blackhole')}
            title="Singularity Core (Click to claim Secret #3)"
          >
            {/* Swirling Inner Event Horizon */}
            <div className="absolute inset-2 rounded-full border border-white/40 animate-spin" />
            <div className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform">
              🕳️
            </div>

            {/* Secret 3 claim notice */}
            {!blackHoleFound && (
              <span className="absolute -top-3 bg-lime text-black text-[10px] font-mono font-bold px-2 py-0.5 animate-bounce">
                CLAIM SECRET 3/5
              </span>
            )}
          </motion.div>

          {/* Ominous Absurd Void Dialogue */}
          <div className="mt-8 font-mono space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
              THE VOID HAS OPENED
            </h2>
            <div className="p-4 bg-white/5 border border-white/20 text-xs sm:text-sm text-lime/90 leading-relaxed italic">
              "THE VOID STARES BACK... AND SAYS: 'COULD YOU KEEP IT DOWN? WE ARE TRYING TO SLEEP.'"
            </div>
            <p className="text-[11px] text-muted">
              Reality anchor integrity currently suspended in zero-point vacuum.
            </p>
          </div>

          {/* Collapse / Close Portal Button */}
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={closeVoid}
              className="px-6 py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-lime hover:text-black transition-all border border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              [ COLLAPSE SINGULARITY & RETURN ]
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
