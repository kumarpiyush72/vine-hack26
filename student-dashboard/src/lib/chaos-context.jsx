import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../audio/sound-synth';
import {
  PHASES,
  LIAR_BUTTON_LABELS,
  POPUP_TEMPLATES,
  TOMBSTONES_LIST,
  SHOP_ITEMS,
  ACHIEVEMENTS_LIST,
  ABSURD_QUOTES,
} from './chaos-constants';

import { ChaosContext } from './chaos-context-instance';

const INITIAL_STATE = {
  clicks: 0,
  chaosLevel: 0,
  realityIntegrity: 100,
  currency: 0,
  popups: [],
  secrets: [],
  achievements: [],
  recentAchievement: null,
  inventory: [],
  soundEnabled: false,
  demoMode: false,
  isVoidActive: false,
  isCrashActive: false,
  isForbiddenMode: false,
  isShopOpen: false,
  isCemeteryOpen: false,
  isSecretsModalOpen: false,
  screenShake: 0,
  creaturePokes: 0,
  tombstones: TOMBSTONES_LIST,
  liarButtonLabel: 'DO NOT CLICK',
  buttonOffset: { x: 0, y: 0 },
  activeQuote: ABSURD_QUOTES[0],
  reducedMotion: false,
  isExploding: false,
};

function calculateChaosPhase(clicks, demoMode) {
  const effectiveClicks = demoMode ? clicks * 3 : clicks;
  if (effectiveClicks >= 25) return 5;
  if (effectiveClicks >= 16) return 4;
  if (effectiveClicks >= 9) return 3;
  if (effectiveClicks >= 4) return 2;
  if (effectiveClicks >= 1) return 1;
  return 0;
}

function calculateIntegrity(phaseIndex, clicks, demoMode) {
  const basePhase = PHASES[phaseIndex] || PHASES[0];
  const mult = demoMode ? 4 : 1.5;
  const decay = Math.min(clicks * mult, 99);
  return Math.max(0, Math.round(basePhase.integrity - decay * 0.3));
}

function chaosReducer(state, action) {
  switch (action.type) {
    case 'CLICK_MAIN': {
      const inc = state.demoMode ? 3 : 1;
      const newClicks = state.clicks + inc;
      const newLevel = calculateChaosPhase(newClicks, state.demoMode);
      const newIntegrity = calculateIntegrity(newLevel, newClicks, state.demoMode);
      const newCurrency = state.currency + (state.demoMode ? 15 : 5);

      // Label rotation
      const labelIndex = Math.min(newClicks, LIAR_BUTTON_LABELS.length - 1);
      const nextLabel = LIAR_BUTTON_LABELS[labelIndex % LIAR_BUTTON_LABELS.length];

      // Quote rotation
      const nextQuote = ABSURD_QUOTES[Math.floor(Math.random() * ABSURD_QUOTES.length)];

      // Check achievements
      let newAchievements = [...state.achievements];
      let recentAch = state.recentAchievement;

      if (!newAchievements.includes('first_click')) {
        newAchievements.push('first_click');
        recentAch = ACHIEVEMENTS_LIST.find((a) => a.id === 'first_click');
      }

      return {
        ...state,
        clicks: newClicks,
        chaosLevel: newLevel,
        realityIntegrity: newIntegrity,
        currency: newCurrency,
        liarButtonLabel: nextLabel,
        activeQuote: nextQuote,
        screenShake: state.screenShake + 1,
        achievements: newAchievements,
        recentAchievement: recentAch,
      };
    }

    case 'SPAWN_POPUP': {
      // Don't spawn more than 7 popups simultaneously to preserve silky performance
      if (state.popups.length >= 7) return state;

      const template = action.template || POPUP_TEMPLATES[Math.floor(Math.random() * POPUP_TEMPLATES.length)];
      // calculate staggered random screen coordinates
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 700;
      const safeX = Math.max(20, Math.min(viewportWidth - 340, Math.random() * (viewportWidth - 360)));
      const safeY = Math.max(80, Math.min(viewportHeight - 280, 100 + Math.random() * (viewportHeight - 340)));

      const newPopup = {
        instanceId: `popup-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        templateId: template.id,
        title: template.title,
        headerBg: template.headerBg,
        body: template.body,
        buttonText: template.buttonText,
        actionType: template.actionType,
        hasSecret: template.hasSecret,
        x: safeX,
        y: safeY,
        zIndex: 50 + state.popups.length,
      };

      return {
        ...state,
        popups: [...state.popups, newPopup],
      };
    }

    case 'CLOSE_POPUP': {
      return {
        ...state,
        popups: state.popups.filter((p) => p.instanceId !== action.instanceId),
      };
    }

    case 'CLEAR_ALL_POPUPS': {
      return {
        ...state,
        popups: [],
      };
    }

    case 'MOVE_BUTTON': {
      return {
        ...state,
        buttonOffset: action.offset,
      };
    }

    case 'RESET_BUTTON_POS': {
      return {
        ...state,
        buttonOffset: { x: 0, y: 0 },
      };
    }

    case 'POKE_CREATURE': {
      const newPokes = state.creaturePokes + 1;
      let newSecrets = [...state.secrets];
      let newAchievements = [...state.achievements];
      let recentAch = state.recentAchievement;

      if (newPokes >= 5 && !newSecrets.includes('smiley')) {
        newSecrets.push('smiley');
        if (!newAchievements.includes('poke_creature')) {
          newAchievements.push('poke_creature');
          recentAch = ACHIEVEMENTS_LIST.find((a) => a.id === 'poke_creature');
        }
      }

      return {
        ...state,
        creaturePokes: newPokes,
        secrets: newSecrets,
        achievements: newAchievements,
        recentAchievement: recentAch,
      };
    }

    case 'FIND_SECRET': {
      if (state.secrets.includes(action.secretId)) return state;
      const newSecrets = [...state.secrets, action.secretId];
      let newAchievements = [...state.achievements];
      let recentAch = state.recentAchievement;
      let isForbidden = state.isForbiddenMode;

      if (newSecrets.length >= 5) {
        isForbidden = true;
        if (!newAchievements.includes('forbidden_master')) {
          newAchievements.push('forbidden_master');
          recentAch = ACHIEVEMENTS_LIST.find((a) => a.id === 'forbidden_master');
        }
      }

      return {
        ...state,
        secrets: newSecrets,
        currency: state.currency + 30,
        achievements: newAchievements,
        recentAchievement: recentAch,
        isForbiddenMode: isForbidden,
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      if (state.achievements.includes(action.achievementId)) return state;
      const item = ACHIEVEMENTS_LIST.find((a) => a.id === action.achievementId);
      return {
        ...state,
        achievements: [...state.achievements, action.achievementId],
        recentAchievement: item || null,
        currency: state.currency + 20,
      };
    }

    case 'CLEAR_RECENT_ACHIEVEMENT': {
      return {
        ...state,
        recentAchievement: null,
      };
    }

    case 'BUY_ITEM': {
      const item = SHOP_ITEMS.find((i) => i.id === action.itemId);
      if (!item || state.currency < item.price || state.inventory.includes(item.id)) return state;

      let newAchievements = [...state.achievements];
      let recentAch = state.recentAchievement;

      if (!newAchievements.includes('first_purchase')) {
        newAchievements.push('first_purchase');
        recentAch = ACHIEVEMENTS_LIST.find((a) => a.id === 'first_purchase');
      }

      if (item.id === 'absolutely_nothing' && !newAchievements.includes('bought_nothing')) {
        newAchievements.push('bought_nothing');
        recentAch = ACHIEVEMENTS_LIST.find((a) => a.id === 'bought_nothing');
      }

      return {
        ...state,
        currency: state.currency - item.price,
        inventory: [...state.inventory, item.id],
        achievements: newAchievements,
        recentAchievement: recentAch,
      };
    }

    case 'SET_VOID': {
      return {
        ...state,
        isVoidActive: action.active,
      };
    }

    case 'SET_CRASH': {
      return {
        ...state,
        isCrashActive: action.active,
      };
    }

    case 'SET_FORBIDDEN': {
      return {
        ...state,
        isForbiddenMode: action.active,
      };
    }

    case 'SET_SHOP_OPEN': {
      return {
        ...state,
        isShopOpen: action.open,
      };
    }

    case 'SET_CEMETERY_OPEN': {
      return {
        ...state,
        isCemeteryOpen: action.open,
      };
    }

    case 'SET_SECRETS_OPEN': {
      return {
        ...state,
        isSecretsModalOpen: action.open,
      };
    }

    case 'TOGGLE_SOUND': {
      const nextSound = !state.soundEnabled;
      soundEngine.setEnabled(nextSound);
      return {
        ...state,
        soundEnabled: nextSound,
      };
    }

    case 'TOGGLE_DEMO_MODE': {
      return {
        ...state,
        demoMode: !state.demoMode,
      };
    }

    case 'SET_DEMO_PHASE': {
      const phase = action.phaseIndex;
      const targetClicks = [0, 2, 6, 12, 18, 30][phase] ?? 0;
      return {
        ...state,
        chaosLevel: phase,
        clicks: targetClicks,
        realityIntegrity: PHASES[phase] ? PHASES[phase].integrity : 50,
        liarButtonLabel: LIAR_BUTTON_LABELS[Math.min(phase * 2, LIAR_BUTTON_LABELS.length - 1)],
      };
    }

    case 'RESPECT_TOMBSTONE': {
      let newAchievements = [...state.achievements];
      let recentAch = state.recentAchievement;
      if (!newAchievements.includes('cemetery_respects')) {
        newAchievements.push('cemetery_respects');
        recentAch = ACHIEVEMENTS_LIST.find((a) => a.id === 'cemetery_respects');
      }

      const updatedTombstones = state.tombstones.map((t) =>
        t.id === action.id ? { ...t, clicks: t.clicks + 1 } : t
      );

      return {
        ...state,
        tombstones: updatedTombstones,
        currency: state.currency + 5,
        achievements: newAchievements,
        recentAchievement: recentAch,
      };
    }

    case 'RESET_REALITY': {
      return {
        ...INITIAL_STATE,
        soundEnabled: state.soundEnabled,
        reducedMotion: state.reducedMotion,
      };
    }

    case 'TRIGGER_EXPLOSION': {
      return {
        ...state,
        isExploding: action.value,
      };
    }

    case 'SET_REDUCED_MOTION': {
      return {
        ...state,
        reducedMotion: action.value,
      };
    }

    default:
      return state;
  }
}

export function ChaosProvider({ children }) {
  const [state, dispatch] = useReducer(chaosReducer, INITIAL_STATE);

  // Sync sound engine enabled state
  useEffect(() => {
    soundEngine.setEnabled(state.soundEnabled);
  }, [state.soundEnabled]);

  // Handle system reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      dispatch({ type: 'SET_REDUCED_MOTION', value: mq.matches });
      const handler = (e) => dispatch({ type: 'SET_REDUCED_MOTION', value: e.matches });
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // Auto clear recent achievement toast after 4 seconds
  useEffect(() => {
    if (state.recentAchievement) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_RECENT_ACHIEVEMENT' });
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [state.recentAchievement]);

  // Main button click handler
  const handleMainClick = useCallback(() => {
    soundEngine.playClick(1 + state.chaosLevel * 0.15);
    dispatch({ type: 'CLICK_MAIN' });

    // Burst confetti on certain milestones
    if (state.clicks === 0 || state.clicks % 5 === 0) {
      try {
        confetti({
          particleCount: 25 + state.chaosLevel * 10,
          spread: 60 + state.chaosLevel * 15,
          origin: { y: 0.6 },
          colors: ['#C6FF00', '#FF2DAA', '#3155FF', '#FF5C28', '#F7F5FF'],
        });
      } catch {}
    }

    // Spawn popup at phase boundaries or randomly in higher phases
    if (state.clicks === 0) {
      // First click: guaranteed first absurdity popup!
      dispatch({ type: 'SPAWN_POPUP', template: POPUP_TEMPLATES[0] });
    } else if (state.chaosLevel >= 1 && Math.random() < 0.45) {
      dispatch({ type: 'SPAWN_POPUP' });
    }

    // Reset button position back to center after click
    dispatch({ type: 'RESET_BUTTON_POS' });
  }, [state.clicks, state.chaosLevel]);

  // Button dodging behavior in Phase 2 and above
  const dodgeButton = useCallback(() => {
    if (state.chaosLevel < 2) return;
    // Don't dodge on every single touch/hover to keep it playable
    if (Math.random() < 0.6) {
      const range = 80 + state.chaosLevel * 30;
      const rx = (Math.random() - 0.5) * range;
      const ry = (Math.random() - 0.5) * range;
      dispatch({ type: 'MOVE_BUTTON', offset: { x: rx, y: ry } });
      soundEngine.playDodge();

      // Check dodger achievement
      if (!state.achievements.includes('dodger')) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'dodger' });
      }
    }
  }, [state.chaosLevel, state.achievements]);

  // Cheat code / Konami code & keyboard secret listener
  useEffect(() => {
    let keyBuffer = '';
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      // Ignore if typing in text inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      // Track 'chaos' word
      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-10);
      if (keyBuffer.includes('chaos')) {
        soundEngine.playSecret();
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'retro_hacker' });
        try {
          confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
        } catch {}
        keyBuffer = '';
      }

      // Check Konami sequence
      const konamiKeys = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
      ];
      if (e.key === konamiKeys[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiKeys.length) {
          konamiIndex = 0;
          soundEngine.playAchievement();
          dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'retro_hacker' });
          try {
            confetti({ particleCount: 150, spread: 120, origin: { y: 0.4 } });
          } catch {}
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Void sequence
  const triggerVoid = useCallback(() => {
    soundEngine.playVoid();
    dispatch({ type: 'SET_VOID', active: true });
    // After 1.5s, spawn secret black hole if not found
    setTimeout(() => {
      if (!state.secrets.includes('blackhole')) {
        dispatch({ type: 'FIND_SECRET', secretId: 'blackhole' });
      }
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'void_survivor' });
    }, 1800);
  }, [state.secrets]);

  const closeVoid = useCallback(() => {
    soundEngine.playExplosion();
    dispatch({ type: 'SET_VOID', active: false });
  }, []);

  // Crash sequence
  const triggerCrash = useCallback(() => {
    soundEngine.playGlitch();
    dispatch({ type: 'SET_CRASH', active: true });
  }, []);

  const recoverFromCrash = useCallback(() => {
    soundEngine.playAchievement();
    dispatch({ type: 'SET_CRASH', active: false });
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'crash_reboot' });
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
    } catch {}
  }, []);

  // Discover secret
  const findSecret = useCallback(
    (secretId) => {
      soundEngine.playSecret();
      dispatch({ type: 'FIND_SECRET', secretId });
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          colors: ['#FF2DAA', '#C6FF00', '#F7F5FF'],
        });
      } catch {}
    },
    []
  );

  // Shop purchase
  const buyShopItem = useCallback(
    (itemId) => {
      soundEngine.playCoins();
      dispatch({ type: 'BUY_ITEM', itemId });
    },
    []
  );

  // Reset reality
  const resetReality = useCallback(() => {
    soundEngine.playGlitch();
    dispatch({ type: 'RESET_REALITY' });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      handleMainClick,
      dodgeButton,
      triggerVoid,
      closeVoid,
      triggerCrash,
      recoverFromCrash,
      findSecret,
      buyShopItem,
      resetReality,
    }),
    [
      state,
      handleMainClick,
      dodgeButton,
      triggerVoid,
      closeVoid,
      triggerCrash,
      recoverFromCrash,
      findSecret,
      buyShopItem,
      resetReality,
    ]
  );

  return <ChaosContext.Provider value={value}>{children}</ChaosContext.Provider>;
}
