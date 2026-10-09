import { ChaosProvider } from './lib/chaos-context';
import { useChaos } from './lib/use-chaos';
import { ChaosHUD } from './components/ChaosHUD';
import { HeroSection } from './components/HeroSection';
import { FloatingSkulls } from './components/FloatingSkulls';
import { PopupManager } from './components/PopupManager';
import { CursorCreature } from './components/CursorCreature';
import { VoidPortal } from './components/VoidPortal';
import { FakeCrash } from './components/FakeCrash';
import { ButtonCemetery } from './components/ButtonCemetery';
import { UselessShop } from './components/UselessShop';
import { SecretHuntModal } from './components/SecretHuntModal';
import { ForbiddenDimension } from './components/ForbiddenDimension';
import { ShopPerksLayer } from './components/ShopPerksLayer';
import { DemoControls } from './components/DemoControls';
import { AchievementsToast } from './components/AchievementsToast';
import { VisualEffectsLayer } from './components/VisualEffectsLayer';
import './index.css';

function ChaosAppContent() {
  const { state } = useChaos();

  return (
    <div
      className={`min-h-screen relative text-white selection:bg-[#C6FF00] selection:text-black ${
        state.isForbiddenMode ? 'forbidden-mode' : ''
      }`}
    >
      {/* Background Visual Effects & CRT Layers */}
      <VisualEffectsLayer />

      {/* Interactive Floating Skulls & Error Ribbon */}
      <FloatingSkulls />

      {/* Top Machine Diagnostic HUD */}
      <ChaosHUD />

      {/* Hero Section & Main Interactive Playground */}
      <HeroSection />

      {/* The Cursor Pet Companion */}
      <CursorCreature />

      {/* Draggable Retro Dialog Popups */}
      <PopupManager />

      {/* The Void Singularity Experience */}
      <VoidPortal />

      {/* Simulated BSOD Kernel Panic Crash */}
      <FakeCrash />

      {/* The Graveyard of Fallen UI Buttons */}
      <ButtonCemetery />

      {/* The Useless Shop */}
      <UselessShop />

      {/* Secrets & Collectibles Discovery Tracker */}
      <SecretHuntModal />

      {/* Endgame: The Forbidden Dimension */}
      <ForbiddenDimension />

      {/* Active Shop Perks (Emotional Pixel, Dancing Banana, Licence) */}
      <ShopPerksLayer />

      {/* Hackathon Demonstration Controls */}
      <DemoControls />

      {/* Real-time Achievement Toast Notifications */}
      <AchievementsToast />
    </div>
  );
}

export default function App() {
  return (
    <ChaosProvider>
      <ChaosAppContent />
    </ChaosProvider>
  );
}
