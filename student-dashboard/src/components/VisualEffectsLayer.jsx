import React, { useEffect, useState } from 'react';
import { useChaos } from '../lib/use-chaos';

export function VisualEffectsLayer() {
  const { state } = useChaos();
  const [shakeClass, setShakeClass] = useState('');

  // Handle screen shakes on state.screenShake trigger
  useEffect(() => {
    if (state.screenShake > 0) {
      const isMajor = state.chaosLevel >= 3;
      const startTimer = setTimeout(() => {
        setShakeClass(isMajor ? 'shake-lg' : 'shake-sm');
      }, 0);
      const endTimer = setTimeout(() => setShakeClass(''), isMajor ? 400 : 250);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [state.screenShake, state.chaosLevel]);

  return (
    <>
      {/* Background Animated Grid */}
      <div
        className="bg-grid-canvas"
        style={{
          opacity: Math.min(0.25 + state.chaosLevel * 0.1, 0.8),
          transform: state.chaosLevel >= 3 ? 'perspective(600px) rotateX(15deg)' : 'none',
        }}
      />

      {/* CRT Scanline Scanlines */}
      <div
        className="crt-scanlines"
        style={{
          opacity: 0.35 + state.chaosLevel * 0.08,
        }}
      />

      {/* CRT Vignette */}
      <div className="crt-vignette" />

      {/* Screen Shake Wrapper Handler (attaches shake to document body or wrapper) */}
      <div
        id="shake-root"
        className={`fixed inset-0 pointer-events-none z-0 ${shakeClass}`}
      />
    </>
  );
}
