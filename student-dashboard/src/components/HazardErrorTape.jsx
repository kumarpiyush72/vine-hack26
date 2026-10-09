import React from 'react';
import { useChaos } from '../lib/use-chaos';

export function HazardErrorTape() {
  const { state } = useChaos();

  const tapeMessages = [
    '☠️ CRITICAL_ERROR: REALITY_LEAK_IN_SECTOR_404',
    '💀 0xDEADBEEF: BRAIN_CELL_COUNT_EVALUATED_TO_ZERO',
    '⚠️ CAUTION: MAXIMUM_UNSTABLE_DIGITAL_ENTROPY',
    '☠️ WARNING: SKULL_OVERFLOW_IN_BUFFER',
    '💀 EXISTENCE_EXCEPTION: UNCAUGHT_MEME_ERROR',
    '⚠️ DO_NOT_PANIC: THE_WEBSITE_IS_ONLY_SLIGHTLY_HAUNTED',
    '☠️ PIGEON_ARBITRATION_DAEMON: 100%_ACTIVE',
  ];

  return (
    <div className="w-full overflow-hidden bg-black/90 border-y-2 border-toxic py-2 select-none relative z-20 my-6 shadow-[0_0_20px_rgba(255,92,40,0.4)]">
      <div className="flex whitespace-nowrap animate-marquee font-mono text-xs sm:text-sm font-black tracking-widest text-toxic uppercase">
        {tapeMessages.concat(tapeMessages).map((msg, idx) => (
          <span key={idx} className="mx-6 flex items-center gap-2">
            <span className="text-lime">{msg}</span>
            <span className="text-white/40">///</span>
          </span>
        ))}
      </div>
    </div>
  );
}
