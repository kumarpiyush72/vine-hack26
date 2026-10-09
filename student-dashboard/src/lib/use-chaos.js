import { useContext } from 'react';
import { ChaosContext } from './chaos-context-instance';

export function useChaos() {
  const context = useContext(ChaosContext);
  if (!context) {
    throw new Error('useChaos must be used within a ChaosProvider');
  }
  return context;
}
