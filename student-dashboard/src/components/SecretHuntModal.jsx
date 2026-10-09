import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '../lib/use-chaos';
import { SECRETS_INFO } from '../lib/chaos-constants';
import { X, Lock, CheckCircle2, Compass } from 'lucide-react';

export function SecretHuntModal() {
  const { state, dispatch } = useChaos();

  if (!state.isSecretsModalOpen) return null;

  const totalFound = state.secrets.length;
  const allFound = totalFound >= 5;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-xl bg-[#090912] border-2 border-magenta text-white font-mono shadow-[0_0_40px_rgba(255,45,170,0.3)] overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-magenta text-white">
            <div className="flex items-center gap-2">
              <Compass size={20} />
              <h2 className="text-sm sm:text-base font-black tracking-widest uppercase">
                THE 5 COSMIC ARTIFACTS // SECRET DISCOVERY
              </h2>
            </div>

            <button
              onClick={() => dispatch({ type: 'SET_SECRETS_OPEN', open: false })}
              className="btn-retro-close"
              title="Close Secrets Guide"
            >
              <X size={12} />
            </button>
          </div>

          {/* Progress Banner */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs">
            <div>
              <span>COLLECTED: </span>
              <strong className="text-lime text-sm">{totalFound} / 5</strong>
              <span className="text-muted ml-2">ARTIFACTS</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              {SECRETS_INFO.map((s) => {
                const found = state.secrets.includes(s.id);
                return (
                  <span
                    key={s.id}
                    className={`text-lg transition-transform ${
                      found ? 'opacity-100 scale-110' : 'opacity-20 grayscale'
                    }`}
                  >
                    {s.symbol}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Secrets List */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
            {SECRETS_INFO.map((secret, idx) => {
              const isFound = state.secrets.includes(secret.id);

              return (
                <div
                  key={secret.id}
                  className={`p-3.5 border transition-all flex items-start justify-between gap-3 ${
                    isFound
                      ? 'bg-lime/10 border-lime/40 text-white'
                      : 'bg-white/5 border-white/10 text-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl pt-0.5">{secret.symbol}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-white">
                          #{idx + 1}: {secret.name}
                        </span>
                        {isFound && (
                          <span className="text-[10px] bg-lime text-black font-black px-1.5 py-0.2">
                            DISCOVERED
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-white/70 italic font-sans">
                        {isFound ? 'Decoded from local spacetime.' : secret.hint}
                      </p>
                    </div>
                  </div>

                  <div>
                    {isFound ? (
                      <CheckCircle2 size={18} className="text-lime" />
                    ) : (
                      <Lock size={16} className="text-muted/40" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Forbidden Dimension Trigger Banner */}
          <div className="p-4 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-muted text-center sm:text-left">
              {allFound ? (
                <span className="text-lime font-bold">
                  ★ ALL 5 ARTIFACTS GATHERED! THE FORBIDDEN GATEWAY IS PRIMED.
                </span>
              ) : (
                <span>Find all 5 secrets to pierce through reality's firewall.</span>
              )}
            </div>

            {allFound && (
              <button
                onClick={() => {
                  dispatch({ type: 'SET_SECRETS_OPEN', open: false });
                  dispatch({ type: 'SET_FORBIDDEN', active: true });
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-lime text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all border border-lime shadow-[0_0_20px_#C6FF00]"
              >
                ENTER FORBIDDEN DIMENSION ✦
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
