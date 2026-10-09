import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { soundEngine } from '../audio/sound-synth';

const CREATURE_QUOTES = [
  'Beep?',
  'Why click so hard?',
  'I like the chaos!',
  'Do not touch my ears!',
  'Hey! Stop poking!',
  'Ouch! Almost unlocked something...',
  'FINE! Take the prize!',
];

export function CursorCreature() {
  const { state, dispatch } = useChaos();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [creaturePos, setCreaturePos] = useState({ x: 200, y: 300 });
  const [isWinking, setIsWinking] = useState(false);
  const [isScared, setIsScared] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('');
  const pokes = state.creaturePokes;

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Smooth lag follow animation using requestAnimationFrame
  useEffect(() => {
    let animId;
    const followSpeed = 0.08 + state.chaosLevel * 0.02;

    const animate = () => {
      setCreaturePos((prev) => {
        const dx = mousePos.x + 36 - prev.x;
        const dy = mousePos.y + 36 - prev.y;
        return {
          x: prev.x + dx * followSpeed,
          y: prev.y + dy * followSpeed,
        };
      });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, state.chaosLevel]);

  // Expression reactions on global clicks
  useEffect(() => {
    if (state.clicks > 0) {
      const winkTimer = setTimeout(() => setIsWinking(true), 0);
      const resetTimer = setTimeout(() => setIsWinking(false), 400);
      return () => {
        clearTimeout(winkTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [state.clicks]);

  // Poking the creature directly
  const handlePoke = (e) => {
    e.stopPropagation();
    soundEngine.playClick(1.8);
    setIsScared(true);
    setTimeout(() => setIsScared(false), 500);

    const quoteIndex = Math.min(pokes, CREATURE_QUOTES.length - 1);
    setSpeechBubble(CREATURE_QUOTES[quoteIndex]);
    setTimeout(() => setSpeechBubble(''), 1800);

    dispatch({ type: 'POKE_CREATURE' });
  };

  // Only render if within screen bounds
  if (creaturePos.x < 0 && mousePos.x < 0) return null;

  const isExcited = state.chaosLevel >= 3;
  const smileyFound = state.secrets.includes('smiley');

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      <div
        style={{
          transform: `translate3d(${creaturePos.x}px, ${creaturePos.y}px, 0)`,
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'transform 0.04s linear',
        }}
        className="pointer-events-none"
      >
        {/* Cute Speech Bubble when poked */}
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -28, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-6 left-6 whitespace-nowrap bg-black/90 text-lime border border-lime text-[11px] font-mono px-2 py-0.5 rounded shadow-lg pointer-events-none"
          >
            {speechBubble}
          </motion.div>
        )}

        {/* The Interactive Pet Body */}
        <motion.div
          animate={
            isExcited
              ? {
                  rotate: [0, -8, 8, 0],
                  scale: [1, 1.15, 1],
                }
              : {
                  y: [0, -4, 0],
                }
          }
          transition={{ repeat: Infinity, duration: isExcited ? 0.6 : 2 }}
          onClick={handlePoke}
          className="pointer-events-auto cursor-pointer p-1 group select-none"
          title={`Glitchkin the Chaos Pet (Poked: ${pokes}/5)`}
        >
          {/* Custom SVG Digital Creature */}
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(198,255,0,0.6)] group-hover:scale-110 transition-transform"
          >
            {/* Antenna with glowing beacon */}
            <line
              x1="23"
              y1="10"
              x2="23"
              y2="2"
              stroke={isExcited ? '#FF2DAA' : '#C6FF00'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="23"
              cy="2"
              r={isExcited ? 3.5 : 2.5}
              fill={isExcited ? '#FF2DAA' : '#C6FF00'}
              className="animate-pulse"
            />

            {/* Main Rounded Boxy Cyber Body */}
            <rect
              x="5"
              y="10"
              width="36"
              height="30"
              rx="6"
              fill="#08080C"
              stroke={isExcited ? '#FF2DAA' : '#C6FF00'}
              strokeWidth="2.5"
            />

            {/* Left Eye */}
            {isWinking ? (
              <line x1="12" y1="22" x2="19" y2="22" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
            ) : isScared ? (
              <circle cx="15.5" cy="22" r="4.5" fill="#FF5C28" />
            ) : (
              <circle cx="15.5" cy="22" r="3.5" fill={isExcited ? '#FF2DAA' : '#C6FF00'} />
            )}

            {/* Right Eye */}
            {isScared ? (
              <circle cx="30.5" cy="22" r="4.5" fill="#FF5C28" />
            ) : (
              <circle cx="30.5" cy="22" r="3.5" fill={isExcited ? '#FF2DAA' : '#C6FF00'} />
            )}

            {/* Smile / Mouth */}
            {isScared ? (
              <ellipse cx="23" cy="31" rx="4" ry="5" fill="#FF5C28" />
            ) : (
              <path
                d="M 17 29 Q 23 35 29 29"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Cute Cheek Blushes */}
            <circle cx="10" cy="26" r="2" fill="#FF2DAA" opacity="0.8" />
            <circle cx="36" cy="26" r="2" fill="#FF2DAA" opacity="0.8" />
          </svg>

          {/* Secret Smiley badge indicator if unlocked */}
          {smileyFound && (
            <div className="absolute -bottom-2 -right-1 text-[12px]" title="Secret 4/5 claimed!">
              👾
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
