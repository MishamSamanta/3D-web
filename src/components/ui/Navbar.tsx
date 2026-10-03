import React from 'react';
import { ShoppingBag, Volume2, VolumeX, Compass } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useScene } from '../../context/SceneContext';
import { BRAND_INFO } from '../../data/products';

export const Navbar: React.FC = () => {
  const { totalQuantity, openCart } = useCart();
  const { audioEnabled, toggleAudio, playFeedbackSound } = useScene();

  const handleNavClick = (id: string) => {
    playFeedbackSound('click');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="font-space text-lg sm:text-xl font-bold tracking-widest text-white group-hover:text-cyberLime transition-colors">
              {BRAND_INFO.name}
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-mono bg-white/5 border border-white/10 text-cyberLime rounded">
              LAB
            </span>
          </div>
          <span className="font-mono text-[9px] text-techGray tracking-wider hidden sm:block">
            {BRAND_INFO.season}
          </span>
        </div>

        {/* Section Navigation */}
        <nav className="hidden md:flex items-center gap-8 glass-card px-6 py-2.5 rounded-full border border-borderMuted">
          <button
            onClick={() => handleNavClick('product-panel-section')}
            className="font-mono text-xs text-slate-300 hover:text-cyberLime transition-colors uppercase tracking-wider"
          >
            01 / Garment
          </button>
          <button
            onClick={() => handleNavClick('collection-section')}
            className="font-mono text-xs text-slate-300 hover:text-cyberLime transition-colors uppercase tracking-wider"
          >
            02 / Carousel
          </button>
          <button
            onClick={() => handleNavClick('details-section')}
            className="font-mono text-xs text-slate-300 hover:text-cyberLime transition-colors uppercase tracking-wider"
          >
            03 / Anatomy
          </button>
          <button
            onClick={() => handleNavClick('manifesto-section')}
            className="font-mono text-xs text-slate-300 hover:text-cyberLime transition-colors uppercase tracking-wider"
          >
            04 / Manifesto
          </button>
        </nav>

        {/* Action Controls: Audio Toggle + Cart Drawer Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              toggleAudio();
              playFeedbackSound('click');
            }}
            title={audioEnabled ? 'Mute feedback sounds' : 'Enable tactile audio'}
            className="p-2.5 rounded-full glass-card border border-borderMuted text-slate-300 hover:text-cyberLime hover:border-cyberLime/40 transition-all"
            aria-label="Toggle audio"
          >
            {audioEnabled ? <Volume2 size={16} className="text-cyberLime" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => {
              openCart();
              playFeedbackSound('click');
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-borderMuted text-white hover:border-cyberLime/40 hover:text-cyberLime transition-all group"
            aria-label="Open cart"
          >
            <ShoppingBag size={16} className="group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider">BAG</span>
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-cyberLime text-void font-mono text-[10px] font-bold">
              {totalQuantity}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
