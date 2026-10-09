import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { soundEngine } from '../audio/sound-synth';
import { Award } from 'lucide-react';

const AFFIRMATIONS = [
  'You are doing great!',
  'The pixels love your energy!',
  'Reality is merely a suggestion!',
  'Take a deep breath. Now click more.',
  'I am your emotional support square.',
  'You are 100% valid and 0% stable.',
];

export function ShopPerksLayer() {
  const { state } = useChaos();
  const [pixelMessage, setPixelMessage] = useState('I believe in your clicking!');

  // Rotate affirmations every 6 seconds if owned
  useEffect(() => {
    if (!state.inventory.includes('emotional_pixel')) return;

    const interval = setInterval(() => {
      const next = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
      setPixelMessage(next);
    }, 6000);

    return () => clearInterval(interval);
  }, [state.inventory]);

  const hasEmotionalPixel = state.inventory.includes('emotional_pixel');
  const hasBanana = state.inventory.includes('suspicious_banana');
  const hasLicence = state.inventory.includes('chaos_licence');

  return (
    <>
      {/* 1. Emotional Support Pixel */}
      {hasEmotionalPixel && (
        <div className="fixed bottom-12 right-6 z-40 pointer-events-auto flex items-end gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/90 text-white border border-magenta p-2 rounded text-[11px] font-mono shadow-xl max-w-[180px]"
          >
            <div className="text-magenta font-bold text-[9px] mb-0.5">💖 EMOTIONAL PIXEL:</div>
            "{pixelMessage}"
          </motion.div>

          <motion.div
            animate={{
              y: [0, -6, 0],
              boxShadow: [
                '0 0 10px #FF2DAA',
                '0 0 20px #FF2DAA',
                '0 0 10px #FF2DAA',
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-5 bg-magenta border border-white cursor-pointer"
            onClick={() => {
              soundEngine.playCoins();
              const next = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
              setPixelMessage(next);
            }}
            title="Emotional Support Pixel (Click for encouragement!)"
          />
        </div>
      )}

      {/* 2. Suspicious Banana */}
      {hasBanana && (
        <motion.div
          animate={{
            rotate: [-15, 15, -15],
            y: [0, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          onClick={() => {
            soundEngine.playClick(2.2);
          }}
          className="fixed bottom-12 left-6 z-40 text-4xl cursor-pointer select-none filter drop-shadow-[0_0_10px_#C6FF00]"
          title="The Suspicious Dancing Banana (Tap to chime!)"
        >
          🍌
        </motion.div>
      )}

      {/* 3. Official Chaos Licence Badge */}
      {hasLicence && (
        <div className="fixed top-16 right-4 z-40 pointer-events-none hidden lg:block">
          <div className="border-2 border-toxic bg-black/90 p-2 text-center font-mono rotate-6 shadow-2xl">
            <div className="flex items-center justify-center gap-1 text-toxic text-[10px] font-black">
              <Award size={14} />
              <span>OFFICIAL OPERATOR</span>
            </div>
            <div className="text-white text-[9px]">REALITY DISRUPTION AGENT #404</div>
          </div>
        </div>
      )}
    </>
  );
}
