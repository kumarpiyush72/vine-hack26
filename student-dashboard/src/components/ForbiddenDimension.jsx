import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useChaos } from '../lib/use-chaos';
import { soundEngine } from '../audio/sound-synth';

export function ForbiddenDimension() {
  const { state, dispatch } = useChaos();
  const [detonated, setDetonated] = useState(false);

  if (!state.isForbiddenMode) return null;

  const handleDetonate = () => {
    soundEngine.playExplosion();
    setDetonated(true);

    try {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00FFC2', '#FF0055'] });
      fire(0.2, { spread: 60, colors: ['#FFDD00', '#7928CA'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {}
  };

  const handleExit = () => {
    dispatch({ type: 'SET_FORBIDDEN', active: false });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#030009] text-white font-mono p-4 sm:p-8 overflow-y-auto select-none flex flex-col justify-between border-8 border-[#00FFC2]">
        
        {/* Hyperspace Neon Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#00FFC2_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b-2 border-[#00FFC2] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-[#FF0055] animate-ping" />
            <h1 className="text-xl sm:text-3xl font-black tracking-widest text-[#00FFC2] uppercase">
              THE FORBIDDEN DIMENSION // SECTOR ZERO
            </h1>
          </div>

          <button
            onClick={handleExit}
            className="px-4 py-1.5 bg-[#FF0055] text-white hover:bg-white hover:text-black font-black text-xs uppercase tracking-wider transition-all border border-white"
          >
            [ RETURN TO REALITY ]
          </button>
        </div>

        {/* Central Core Content */}
        <div className="relative z-10 max-w-3xl mx-auto my-auto text-center space-y-6 py-8">
          <motion.div
            animate={{
              scale: [1, 1.03, 0.98, 1],
              textShadow: [
                '0 0 20px #00FFC2',
                '0 0 40px #FF0055',
                '0 0 20px #00FFC2',
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans"
          >
            "YOU HAVE FOUND THE THING THAT WAS NEVER SUPPOSED TO EXIST."
          </motion.div>

          <p className="text-xs sm:text-sm text-[#00FFC2]/90 max-w-xl mx-auto leading-relaxed">
            Congratulations, traveler. You didn't just break the website; you inverted its ontological kernel.
            All laws of standard web development are void here.
          </p>

          {/* Metric anomalies */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="bg-black/80 border border-[#00FFC2] px-3 py-1.5 text-[#00FFC2]">
              REALITY INTEGRITY: <strong>-420.69%</strong>
            </div>
            <div className="bg-black/80 border border-[#FF0055] px-3 py-1.5 text-[#FF0055]">
              ENTROPY TAX: <strong>ABOLISHED</strong>
            </div>
            <div className="bg-black/80 border border-yellow-400 px-3 py-1.5 text-yellow-300">
              PIGEONS IN CHARGE: <strong>100%</strong>
            </div>
          </div>

          {/* Big Red Detonator or Certificate */}
          {!detonated ? (
            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleDetonate}
                className="px-8 py-6 sm:px-14 sm:py-8 bg-[#FF0055] hover:bg-[#FF2277] text-white font-mono text-lg sm:text-2xl font-black uppercase tracking-widest border-4 border-white shadow-[0_0_50px_rgba(255,0,85,0.7)] cursor-pointer"
              >
                💣 [ PRESS THE UNIVERSE DETONATOR ] 💣
              </motion.button>
              <p className="text-[11px] text-white/50 mt-3">
                Caution: May cause uncontrollable euphoria and excessive confetti.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-black/90 border-2 border-yellow-400 max-w-md mx-auto text-center space-y-3 shadow-[0_0_40px_rgba(255,221,0,0.5)]"
            >
              <div className="text-4xl">👑</div>
              <h3 className="text-base sm:text-lg font-black text-yellow-400 uppercase tracking-widest">
                CERTIFICATE OF UNIVERSAL OMNIPOTENCE
              </h3>
              <p className="text-xs text-white/90 font-sans">
                This document certifies that you have conquered CTRL + CHAOS, unlocked all secrets, and achieved supreme hackathon mastery.
              </p>
              <div className="text-[10px] text-muted border-t border-white/20 pt-2">
                VERIFIED BY: THE CHAOS DAEMON // VINE HACKATHON 2026
              </div>

              <div className="pt-2">
                <button
                  onClick={handleExit}
                  className="px-4 py-2 bg-yellow-400 text-black font-black text-xs uppercase tracking-wider hover:bg-white"
                >
                  RETURN TO HOME WORLD
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="relative z-10 border-t-2 border-[#00FFC2] pt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60">
          <div>THE FORBIDDEN DIMENSION // ENDGAME TERMINUS</div>
          <div className="text-yellow-300 font-bold">ALL 5 SECRETS UNIFIED ★</div>
        </div>
      </div>
    </AnimatePresence>
  );
}
