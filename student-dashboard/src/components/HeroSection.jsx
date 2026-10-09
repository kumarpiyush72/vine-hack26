import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { PHASES } from '../lib/chaos-constants';
import { AlertTriangle, Eye, Terminal, Sparkles, Skull, Flame } from 'lucide-react';
import { HazardErrorTape } from './HazardErrorTape';

export function HeroSection() {
  const {
    state,
    handleMainClick,
    dodgeButton,
    triggerVoid,
    triggerCrash,
    findSecret,
  } = useChaos();

  const [isHovered, setIsHovered] = useState(false);
  const currentPhase = PHASES[state.chaosLevel] || PHASES[0];

  const eyeFound = state.secrets.includes('eye');

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-20 overflow-hidden select-none">
      
      {/* Centered Top Diagnostic Badge Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs sm:text-sm text-lime bg-black/80 border-2 border-lime/40 px-6 py-2.5 shadow-[0_0_20px_rgba(198,255,0,0.3)] mb-8 max-w-4xl"
      >
        <div className="flex items-center gap-2">
          <Skull size={16} className="text-toxic animate-bounce" />
          <span className="font-bold tracking-widest uppercase">CHAOS_STATUS:</span>
          <span className="text-white font-black">{currentPhase.statusText}</span>
        </div>
        <span className="text-white/30 hidden sm:inline">///</span>
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-widest text-magenta">REALITY_INTEGRITY:</span>
          <span className="text-toxic font-black">{state.realityIntegrity}%</span>
        </div>
        <span className="text-white/30 hidden sm:inline">///</span>
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-widest text-lime">CLICKS_RECORDED:</span>
          <span className="text-white font-black">{String(state.clicks).padStart(3, '0')}</span>
        </div>
      </motion.div>

      {/* Floating 3D Chaos Prism with Flanking Skulls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <motion.div
          animate={{ rotate: [-10, 10, -10], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-3xl sm:text-5xl filter drop-shadow-[0_0_15px_#FF2DAA]"
        >
          💀
        </motion.div>

        <div className="chaos-cube-wrap cursor-pointer" title="The Chaos Core" onClick={handleMainClick}>
          <div className="chaos-cube">
            <div className="cube-face face-front"></div>
            <div className="cube-face face-back"></div>
            <div className="cube-face face-right"></div>
            <div className="cube-face face-left"></div>
            <div className="cube-face face-top"></div>
            <div className="cube-face face-bottom"></div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: [10, -10, 10], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-3xl sm:text-5xl filter drop-shadow-[0_0_15px_#C6FF00]"
        >
          ☠️
        </motion.div>
      </div>

      {/* Primary Colossal Centered Typography with Generous Line Spacing */}
      <div className="text-center relative z-10 max-w-6xl mx-auto space-y-8 my-4">
        <motion.div
          animate={
            state.chaosLevel >= 3
              ? {
                  rotate: [0, -1.5, 1.5, 0],
                  scale: [1, 1.02, 0.98, 1],
                }
              : {}
          }
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="flex flex-col items-center justify-center leading-none"
        >
          {/* CTRL - HUGE FONT */}
          <h1
            data-text="CTRL"
            className="glitch-text glitch-active text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] xl:text-[18rem] font-black tracking-tight text-white mb-2 sm:mb-4 select-none"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: state.chaosLevel >= 2 ? '0 0 35px rgba(198, 255, 0, 0.6)' : 'none',
              lineHeight: 0.95,
            }}
          >
            CTRL
          </h1>

          {/* Plus Sign with dynamic tilt & Skull Emblems */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 my-2 sm:my-4">
            <span className="text-2xl sm:text-5xl text-toxic animate-pulse">💀</span>
            <motion.span
              animate={{
                rotate: state.chaosLevel * 72,
                scale: [1, 1.25, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-5xl sm:text-7xl md:text-8xl font-mono text-lime font-black select-none"
            >
              +
            </motion.span>
            <span className="text-2xl sm:text-5xl text-magenta animate-pulse">💀</span>
          </div>

          {/* CHAOS - HUGE FONT */}
          <h1
            data-text="CHAOS"
            className="glitch-text glitch-active text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] xl:text-[18rem] font-black tracking-tight text-magenta mt-2 sm:mt-4 select-none"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: state.chaosLevel >= 3 ? '0 0 45px rgba(255, 45, 170, 0.7)' : 'none',
              lineHeight: 0.95,
            }}
          >
            CHAOS
          </h1>
        </motion.div>

        {/* Tagline & Subtitle with Expansive Line Spacing and Bigger Fonts */}
        <div className="space-y-4 sm:space-y-6 pt-4 max-w-4xl mx-auto">
          <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-widest text-white uppercase leading-relaxed">
            {currentPhase.tagline}
          </p>
          <p className="text-sm sm:text-lg md:text-xl font-mono text-muted tracking-wider leading-relaxed max-w-2xl mx-auto">
            {currentPhase.subtitle}
          </p>
        </div>
      </div>

      {/* Scrolling Hazard Caution Tape */}
      <div className="w-full max-w-5xl my-6">
        <HazardErrorTape />
      </div>

      {/* Centered Error Banner Box */}
      <div className="w-full max-w-3xl my-4 bg-black/90 border-2 border-toxic text-toxic p-3 sm:p-4 font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,92,40,0.5)]">
        <span className="animate-spin text-lg">⚠️</span>
        <span className="font-bold">
          [ 0xDEADBEEF — SANITY.EXE HAS STOPPED WORKING — TECH SUPPORT IS NOT REAL ]
        </span>
        <span className="animate-spin text-lg">⚠️</span>
      </div>

      {/* Main Interactive Button (The Liar Button) - Truly Massive with Skulls */}
      <div className="relative my-8 sm:my-14 z-20 flex flex-col items-center justify-center">
        <motion.div
          animate={{
            x: state.buttonOffset.x,
            y: state.buttonOffset.y,
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 18,
          }}
          className="relative inline-block"
        >
          {/* Subtle button shadow glitch ghost */}
          <div
            className="absolute inset-0 bg-magenta translate-x-2.5 translate-y-2.5 pointer-events-none transition-transform"
            style={{
              opacity: state.chaosLevel > 0 ? 0.95 : 0.5,
              filter: state.chaosLevel >= 2 ? 'blur(2px)' : 'none',
            }}
          />

          {/* The Actual Colossal Button */}
          <button
            id="main-chaos-button"
            type="button"
            onClick={handleMainClick}
            onMouseEnter={() => {
              setIsHovered(true);
              dodgeButton();
            }}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => {
              dodgeButton();
            }}
            className={`
              relative z-10 px-10 py-6 sm:px-16 sm:py-8 md:px-20 md:py-10
              font-mono text-xl sm:text-3xl md:text-4xl font-black tracking-widest uppercase
              border-4 transition-all duration-150 cursor-pointer
              ${
                state.chaosLevel === 0
                  ? 'bg-black text-lime border-lime hover:bg-lime hover:text-black shadow-[0_0_35px_rgba(198,255,0,0.4)]'
                  : state.chaosLevel === 1
                  ? 'bg-black text-white border-white hover:bg-white hover:text-black shadow-[0_0_35px_rgba(255,255,255,0.4)]'
                  : state.chaosLevel === 2
                  ? 'bg-black text-toxic border-toxic hover:bg-toxic hover:text-black shadow-[0_0_40px_rgba(255,92,40,0.5)]'
                  : state.chaosLevel === 3
                  ? 'bg-black text-magenta border-magenta hover:bg-magenta hover:text-white shadow-[0_0_45px_rgba(255,45,170,0.6)]'
                  : 'bg-lime text-black border-lime hover:bg-white hover:text-black shadow-[0_0_50px_#C6FF00]'
              }
            `}
            style={{
              fontFamily: 'var(--font-mono)',
              boxShadow: isHovered ? '0 0 45px rgba(198, 255, 0, 0.7)' : undefined,
            }}
          >
            <span className="flex items-center justify-center gap-4 sm:gap-6">
              <span className="text-2xl sm:text-3xl animate-pulse">💀</span>
              <span>[ {state.liarButtonLabel} ]</span>
              <span className="text-2xl sm:text-3xl animate-pulse">💀</span>
            </span>
          </button>
        </motion.div>

        {/* Dynamic Warning Message below button */}
        <div className="mt-6 text-center font-mono text-xs sm:text-sm text-muted/80 flex items-center justify-center gap-2 max-w-xl">
          <Terminal size={14} className="text-lime shrink-0" />
          <span>
            {state.clicks === 0
              ? 'WARNING: Clicking this button will void your warranty, karma, and lunch plans.'
              : state.chaosLevel >= 3
              ? 'THE BUTTON HAS GONE FERAL. DO NOT MAKE EYE CONTACT.'
              : state.chaosLevel >= 2
              ? 'MULTIPLE BUTTONS HAVE FILED COMPLAINTS. YOU ARE THE COMMON FACTOR.'
              : 'You clicked it anyway. You were warned. Multiple times. With big text.'}
          </span>
        </div>
      </div>

      {/* Secondary Actions Centered */}
      <div className="my-6 flex flex-wrap items-center justify-center gap-5 z-20">
        
        {/* The Void Button */}
        <button
          onClick={triggerVoid}
          className="group relative px-6 py-3 bg-black/90 border-2 border-white/30 hover:border-magenta text-xs sm:text-sm font-mono font-bold tracking-widest text-muted hover:text-magenta transition-all flex items-center justify-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-magenta/70 group-hover:bg-magenta animate-pulse" />
          [ PEEK INTO THE VOID ]
          <Sparkles size={14} className="text-magenta" />
        </button>

        {/* Fake Crash Trigger */}
        <button
          onClick={triggerCrash}
          className="group relative px-6 py-3 bg-black/90 border-2 border-white/30 hover:border-toxic text-xs sm:text-sm font-mono font-bold tracking-widest text-muted hover:text-toxic transition-all flex items-center justify-center gap-2"
        >
          <AlertTriangle size={14} className="text-toxic" />
          [ SUMMON A KERNEL PANIC 💀 ]
        </button>
      </div>

      {/* Centered Footer & Secret Collectible #1: THE EYE */}
      <footer className="mt-16 w-full max-w-4xl border-t border-white/10 pt-6 px-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs font-mono text-muted gap-4">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span>REALITY: {state.realityIntegrity}% INTACT</span>
          <span>•</span>
          <span>CLICKS: {state.clicks} (too many)</span>
          <span>•</span>
          <span>ENTROPY: {state.chaosLevel * 20}% &amp; RISING</span>
        </div>

        {/* Cryptic build marker hiding Secret #1: The Omniscient Eye */}
        <div className="flex items-center justify-center gap-2 cursor-pointer group">
          <span className="text-white/40">SYS_ID:</span>
          <span className="text-lime/90 group-hover:text-lime transition-colors">
            CHAOS.OS // BUILD 0.0.404
          </span>

          <button
            onClick={() => findSecret('eye')}
            className={`p-1 transition-all ${
              eyeFound
                ? 'text-lime opacity-100'
                : 'text-muted/40 group-hover:text-magenta group-hover:opacity-100 hover:scale-125'
            }`}
            title={eyeFound ? 'Secret 1/5: The Omniscient Eye [FOUND]' : 'Click to discover secret!'}
            aria-label="Secret Eye"
          >
            <Eye size={16} className={eyeFound ? 'text-lime' : 'animate-bounce text-magenta'} />
          </button>
        </div>
      </footer>
    </main>
  );
}
