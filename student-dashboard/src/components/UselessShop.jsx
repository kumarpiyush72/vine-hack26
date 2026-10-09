import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { SHOP_ITEMS } from '../lib/chaos-constants';
import { soundEngine } from '../audio/sound-synth';
import { X, Sparkles, Check } from 'lucide-react';

export function UselessShop() {
  const { state, dispatch, buyShopItem } = useChaos();
  const [purchaseNotice, setPurchaseNotice] = useState('');

  if (!state.isShopOpen) return null;

  const handleBuy = (item) => {
    if (state.currency < item.price) {
      soundEngine.playGlitch();
      setPurchaseNotice(`INSUFFICIENT PIXELS: You need ${item.price - state.currency} more chaos pixels!`);
      setTimeout(() => setPurchaseNotice(''), 3000);
      return;
    }

    if (state.inventory.includes(item.id)) return;

    buyShopItem(item.id);

    if (item.id === 'golden_cursor') {
      document.body.classList.add('golden-cursor');
    }

    if (item.id === 'absolutely_nothing') {
      setPurchaseNotice('You received: Absolutely Nothing. Value delivered: 100%.');
    } else {
      setPurchaseNotice(`ACQUIRED: ${item.name}! Perk: ${item.perk}`);
    }
    setTimeout(() => setPurchaseNotice(''), 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl bg-[#0b0b14] border-2 border-white/20 text-white font-mono shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-lime text-black">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-sm sm:text-base font-black tracking-widest uppercase">
                THE USELESS SHOP // LUXURY CONSUMERISM
              </h2>
            </div>

            <button
              onClick={() => dispatch({ type: 'SET_SHOP_OPEN', open: false })}
              className="btn-retro-close"
              title="Close Shop"
            >
              <X size={12} />
            </button>
          </div>

          {/* Currency Bar */}
          <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-lime">
              <Sparkles size={14} />
              <span>YOUR BALANCE:</span>
              <strong className="text-white text-sm">{state.currency}</strong>
              <span className="text-[10px] text-muted">CHAOS PIXELS</span>
            </div>

            <span className="text-[10px] text-muted hidden sm:inline">
              Earn +5 Pixels per click, +20 per secret
            </span>
          </div>

          {/* Feedback banner */}
          {purchaseNotice && (
            <div className="px-4 py-2 bg-magenta/20 border-b border-magenta text-magenta text-xs font-bold animate-pulse">
              {purchaseNotice}
            </div>
          )}

          {/* Catalog Grid */}
          <div className="popup-body p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SHOP_ITEMS.map((item) => {
              const owned = state.inventory.includes(item.id);
              const canAfford = state.currency >= item.price;

              return (
                <div
                  key={item.id}
                  className={`p-4 border transition-all flex flex-col justify-between ${
                    owned
                      ? 'bg-lime/10 border-lime/40'
                      : 'bg-white/5 border-white/15 hover:border-white/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="text-right">
                        <span className="font-bold text-xs text-lime">{item.price} ✦</span>
                      </div>
                    </div>

                    <h3 className="mt-2 font-bold text-xs text-white uppercase tracking-wider">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-[11px] text-white/70 leading-relaxed font-sans">
                      {item.desc}
                    </p>

                    <div className="mt-2 text-[10px] text-lime/80 italic font-mono">
                      ↳ {item.perk}
                    </div>
                  </div>

                  {/* Purchase Action Button */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    {owned ? (
                      <div className="w-full py-1.5 bg-lime/20 text-lime text-center text-xs font-bold flex items-center justify-center gap-1">
                        <Check size={13} />
                        <span>OWNED / ACTIVE</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuy(item)}
                        className={`w-full py-2 text-xs font-black uppercase tracking-wider transition-all border ${
                          canAfford
                            ? 'bg-lime text-black hover:bg-white border-lime cursor-pointer'
                            : 'bg-white/5 text-muted border-white/10 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {canAfford ? `BUY FOR ${item.price} ✦` : `NEED ${item.price} ✦`}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 bg-black/60 border-t border-white/10 text-right text-xs">
            <button
              onClick={() => dispatch({ type: 'SET_SHOP_OPEN', open: false })}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold"
            >
              Exit Store
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
