import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundEngine } from '../audio/sound-synth';
import { useChaos } from '../lib/use-chaos';

const SKULL_ERROR_MESSAGES = [
  '💀 FATAL_ERROR: VIBE_CHECK_FAILED (0xDEADBEEF)',
  '☠️ CRITICAL_EXCEPTION: BRAIN_CELLS_EVAPORATED',
  '💀 SYSTEM_ALERT: SOUL_NOT_FOUND_IN_RAM',
  '☠️ MEMORY_CORRUPTION: PIGEONS_IN_THE_FIREWALL',
  '💀 KERNEL_PANIC: REALITY_LEAK_DETECTED_AT_PORT_666',
  '☠️ CAUTION: TOO_MUCH_CHAOS_FOR_ONE_MORTAL',
  '💀 WARNING: YOUR MOUSE_POINTER_IS_POSSESSED',
  '☠️ FATAL: THE_UNIVERSE_HAS_STOPPED_RESPONDING',
];

export function FloatingSkulls() {
  const { state, dispatch } = useChaos();
  const [skulls, setSkulls] = useState([
    { id: 1, x: 10, y: 25, size: 48, speed: 18, delay: 0 },
    { id: 2, x: 85, y: 30, size: 60, speed: 22, delay: 2 },
    { id: 3, x: 20, y: 70, size: 52, speed: 16, delay: 1 },
    { id: 4, x: 80, y: 75, size: 44, speed: 20, delay: 3 },
    { id: 5, x: 50, y: 15, size: 56, speed: 24, delay: 1.5 },
  ]);

  const [activeErrorToast, setActiveErrorToast] = useState('');

  // Spawn more skulls as chaos increases
  useEffect(() => {
    if (state.chaosLevel >= 2 && skulls.length < 8) {
      setSkulls((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: 15 + Math.random() * 70,
          y: 20 + Math.random() * 60,
          size: 44 + Math.random() * 28,
          speed: 14 + Math.random() * 10,
          delay: Math.random() * 2,
        },
      ]);
    }
  }, [state.chaosLevel]);

  const handleSkullClick = (skullId, e) => {
    e.stopPropagation();
    soundEngine.playGlitch();

    // Trigger funny skull error message
    const msg = SKULL_ERROR_MESSAGES[Math.floor(Math.random() * SKULL_ERROR_MESSAGES.length)];
    setActiveErrorToast(msg);
    setTimeout(() => setActiveErrorToast(''), 3500);

    // Mini confetti skull burst
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#FF2DAA', '#C6FF00', '#FF5C28', '#FFFFFF'],
      });
    } catch {}

    // Reward player with currency
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'first_click' });

    // Respawn skull with new coordinates
    setSkulls((prev) =>
      prev.map((s) =>
        s.id === skullId
          ? {
              ...s,
              x: 10 + Math.random() * 80,
              y: 15 + Math.random() * 70,
            }
          : s
      )
    );
  };

  return (
    <>
      {/* Floating Interactive Skulls */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {skulls.map((skull) => (
          <motion.div
            key={skull.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.65, 0.95, 0.65],
              y: [0, -25, 0],
              x: [0, 15, -15, 0],
              rotate: [-12, 12, -12],
            }}
            transition={{
              duration: skull.speed,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: skull.delay,
            }}
            style={{
              position: 'absolute',
              left: `${skull.x}%`,
              top: `${skull.y}%`,
            }}
            className="pointer-events-auto cursor-pointer group"
            onClick={(e) => handleSkullClick(skull.id, e)}
            title="Cursed Chaos Skull (Click to destroy!)"
          >
            {/* Glowing neon aura */}
            <div className="relative">
              <span
                style={{ fontSize: `${skull.size}px` }}
                className="select-none filter drop-shadow-[0_0_16px_rgba(255,45,170,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(198,255,0,1)] group-hover:scale-125 transition-all inline-block animate-pulse"
              >
                💀
              </span>
              <span className="absolute -top-1 -right-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-toxic text-black font-mono font-bold px-1 py-0.2">
                KILL
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skull Error Message Glitch Ribbon */}
      <AnimatePresence>
        {activeErrorToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-black border-2 border-toxic text-toxic font-mono text-xs sm:text-sm font-black px-6 py-3 tracking-widest uppercase shadow-[0_0_35px_rgba(255,92,40,0.8)] flex items-center gap-3 select-none"
          >
            <span className="text-xl animate-spin">☠️</span>
            <span>{activeErrorToast}</span>
            <span className="text-xl animate-spin">☠️</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
