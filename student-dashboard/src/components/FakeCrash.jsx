import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { Skull, AlertOctagon, RefreshCw } from 'lucide-react';

export function FakeCrash() {
  const { state, recoverFromCrash, findSecret } = useChaos();
  const [progress, setProgress] = useState(12);
  const [glitchText, setGlitchText] = useState('DIAGNOSING_TEMPORAL_RUPTURE...');

  useEffect(() => {
    if (!state.isCrashActive) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 99) return prev + Math.floor(Math.random() * 15) + 3;
        return 99;
      });
    }, 400);

    const timer = setTimeout(() => {
      setGlitchText('BUFFERING INFINITY... REALITY REBOOT FAILED (TASK FAILED SUCCESSFULLY)');
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [state.isCrashActive]);

  if (!state.isCrashActive) return null;

  const skullFound = state.secrets.includes('skull');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#000088] text-white font-mono p-6 sm:p-12 overflow-y-auto select-none flex flex-col justify-between">
        
        {/* Terminal Header */}
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-white pb-3">
            <AlertOctagon size={28} className="text-toxic" />
            <span className="text-xl sm:text-2xl font-black tracking-widest uppercase">
              *** STOP: 0x00000404 CRITICAL SYSTEM MELTDOWN ***
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
            <p className="bg-white/10 p-3 border border-white/30 text-lime font-bold">
              CRITICAL ERROR 404: TOO MUCH INTERNET DETECTED.
            </p>
            <p>
              A fatal condition has been simulated to protect your monitor from excessive digital irony.
              If this is the first time you've broken reality today, congratulations.
            </p>
            <p className="text-white/80">
              Technical Information:
              <br />
              *** STOP: 0x000000D1 (0x0000000C, 0x00000002, 0x00000000, 0xF86B5A89)
              <br />
              *** CHAOS_DRIVER.SYS - Address F86B5A89 base at F86B5000, DateStamp 3d6dd67c
            </p>

            {/* Interactive Stack Trace containing Secret #5 Skull */}
            <div className="bg-black/60 p-4 border border-white/20 text-[11px] font-mono space-y-1">
              <div className="text-white/50">// MEMORY DUMP STACK TRACE:</div>
              <div>0x0001: PIGEON_ARBITRATION_MODULE_INITIALIZED</div>
              <div>0x0002: BRAIN_CELL_COUNT_EVALUATED_TO_ZERO</div>
              
              {/* Secret 5 Clickable Skull */}
              <div className="flex items-center gap-2 py-1 bg-white/5 px-2">
                <span className="text-toxic font-bold">0x0003: EXCEPTION_PAYLOAD_EXTRACTED:</span>
                <button
                  onClick={() => findSecret('skull')}
                  className="flex items-center gap-1.5 px-2 py-0.5 bg-magenta/30 hover:bg-magenta text-white border border-magenta rounded text-xs transition-all cursor-pointer"
                  title="Secret 5/5: Pixelated Skull [CLICK TO COLLECT]"
                >
                  <Skull size={14} className={skullFound ? 'text-lime' : 'animate-pulse text-toxic'} />
                  <span className="font-bold">
                    {skullFound ? '[SKULL_EXTRACTED]' : '[CORRUPTED_SKULL_CORE]'}
                  </span>
                </button>
              </div>

              <div>0x0004: EXISTENCE_BUFFER_OVERFLOW (CANNOT REALLOCATE UNIVERSE)</div>
            </div>

            {/* Reboot Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span>REBOOTING SIMULATION:</span>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="w-full h-4 bg-black/60 border border-white/40 overflow-hidden">
                <motion.div
                  className="h-full bg-toxic"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-lime font-mono animate-pulse">{glitchText}</p>
            </div>
          </div>
        </div>

        {/* Footer with Escape / Reboot Action */}
        <div className="max-w-4xl mx-auto w-full pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-white/60">
            Press any button to override kernel panic and return to CTRL+CHAOS.
          </span>

          <button
            onClick={recoverFromCrash}
            className="w-full sm:w-auto px-8 py-3 bg-white text-black hover:bg-lime hover:text-black font-black text-xs uppercase tracking-widest border-2 border-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} />
            [ OVERRIDE & ESCAPE THE SIMULATION ]
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
