import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { PHASES } from '../lib/chaos-constants';
import { Volume2, VolumeX, RefreshCw, ShoppingCart, Crosshair, Sparkles, Zap } from 'lucide-react';

export function ChaosHUD() {
  const { state, dispatch, resetReality } = useChaos();
  const currentPhase = PHASES[state.chaosLevel] || PHASES[0];
  const [buildClicks, setBuildClicks] = useState(0);

  // Triple-click on OS build badge acts as touch/mouse cheat trigger
  const handleBuildBadgeClick = () => {
    const next = buildClicks + 1;
    setBuildClicks(next);
    if (next >= 3) {
      setBuildClicks(0);
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'retro_hacker' });
    }
  };

  // Color calculation based on integrity
  const getIntegrityColor = () => {
    if (state.realityIntegrity > 75) return 'var(--acid-lime)';
    if (state.realityIntegrity > 50) return 'var(--cobalt-blue)';
    if (state.realityIntegrity > 25) return 'var(--electric-magenta)';
    return 'var(--toxic-orange)';
  };

  const hasExtraBrainCell = state.inventory.includes('extra_brain_cell');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#08080C]/90 backdrop-blur-md border-b border-white/10 px-3 py-2 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
        
        {/* Left Side: Diagnostics and Metrics */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          {/* OS Identity */}
          <div 
            onClick={handleBuildBadgeClick}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity bg-white/5 border border-white/10 px-2 py-1 select-none"
            title="Click 3 times for a secret!"
          >
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse inline-block" />
            <span className="font-bold tracking-wider text-lime">CHAOS.OS</span>
            <span className="text-[10px] text-muted">v0.0.404</span>
          </div>

          {/* Reality Integrity Meter */}
          <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-2.5 py-1">
            <span className="text-[10px] text-muted hidden sm:inline">REALITY:</span>
            <div className="w-16 sm:w-24 h-2.5 bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full"
                style={{
                  width: `${state.realityIntegrity}%`,
                  backgroundColor: getIntegrityColor(),
                }}
                animate={{ width: `${state.realityIntegrity}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="font-bold" style={{ color: getIntegrityColor() }}>
              {state.realityIntegrity}%
            </span>
          </div>

          {/* Clicks Display */}
          <div className="bg-black/60 border border-white/10 px-2.5 py-1 flex items-center gap-1.5">
            <span className="text-[10px] text-muted">CLICKS:</span>
            <span className="font-bold text-white text-sm tracking-widest">
              {String(state.clicks).padStart(3, '0')}
            </span>
          </div>

          {/* Brain Cell Counter (Modified by Shop upgrade) */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1">
            <span className="text-[10px] text-muted">BRAIN CELLS:</span>
            <span className={hasExtraBrainCell ? "text-lime font-bold" : "text-magenta font-semibold"}>
              {hasExtraBrainCell ? '1 (ONLINE)' : 'UNAVAILABLE'}
            </span>
          </div>

          {/* Currency */}
          <div className="flex items-center gap-1 text-toxic-orange bg-black/60 border border-white/10 px-2.5 py-1">
            <Sparkles size={12} className="text-lime" />
            <span className="font-bold text-lime">{state.currency}</span>
            <span className="text-[10px] text-muted">PIXELS</span>
          </div>
        </div>

        {/* Right Side: Navigation & Control Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Shop Modal Trigger */}
          <button
            onClick={() => dispatch({ type: 'SET_SHOP_OPEN', open: true })}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/15 border border-white/20 px-2 py-1 text-[11px] transition-all text-lime hover:border-lime"
            title="Open the Useless Shop"
          >
            <ShoppingCart size={13} />
            <span className="hidden sm:inline">SHOP</span>
          </button>

          {/* Button Cemetery Trigger */}
          <button
            onClick={() => dispatch({ type: 'SET_CEMETERY_OPEN', open: true })}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/15 border border-white/20 px-2 py-1 text-[11px] transition-all text-muted hover:text-white hover:border-white"
            title="View Dead Buttons"
          >
            <span>🪦</span>
            <span className="hidden sm:inline">CEMETERY</span>
          </button>

          {/* Secrets Tracker Trigger */}
          <button
            onClick={() => dispatch({ type: 'SET_SECRETS_OPEN', open: true })}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/15 border border-white/20 px-2 py-1 text-[11px] transition-all text-magenta hover:border-magenta"
            title="View Discovered Secrets"
          >
            <Crosshair size={13} />
            <span>{state.secrets.length}/5</span>
          </button>

          {/* Demo Mode Toggle */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DEMO_MODE' })}
            className={`flex items-center gap-1 border px-2 py-1 text-[11px] font-bold transition-all ${
              state.demoMode
                ? 'bg-toxic text-black border-toxic animate-pulse'
                : 'bg-white/5 text-muted border-white/20 hover:text-white'
            }`}
            title="Toggle Hackathon Demo Speed"
          >
            <Zap size={13} />
            <span>DEMO</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
            className="bg-white/5 hover:bg-white/15 border border-white/20 p-1 text-[11px] transition-all text-muted hover:text-white"
            title={state.soundEnabled ? 'Mute Audio' : 'Unmute Retro Synth Audio'}
            aria-label="Toggle Sound"
          >
            {state.soundEnabled ? <Volume2 size={15} className="text-lime" /> : <VolumeX size={15} />}
          </button>

          {/* Reset Reality Button */}
          <button
            onClick={resetReality}
            className="flex items-center gap-1 bg-magenta/20 hover:bg-magenta text-magenta hover:text-white border border-magenta px-2.5 py-1 text-[11px] font-bold transition-all"
            title="Restore Reality to 100%"
          >
            <RefreshCw size={12} />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>
      </div>

      {/* Sub-bar: Phase & Absurd Status Banner */}
      <div className="max-w-7xl mx-auto mt-1 pt-1 border-t border-white/5 flex items-center justify-center gap-3 text-[10px] text-muted font-mono overflow-hidden flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">PHASE {state.chaosLevel}:</span>
          <span className="text-lime uppercase">{currentPhase.name}</span>
        </div>
        <span className="text-white/30">|</span>
        <span className="italic text-muted hidden md:inline">"{state.activeQuote}"</span>
        <span className="text-white/30">|</span>
        <div>
          <span className="text-white/40">SYSTEM: </span>
          <span className="text-magenta font-semibold">{currentPhase.statusText}</span>
        </div>
      </div>
    </header>
  );
}
