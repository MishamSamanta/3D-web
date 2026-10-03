import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../../data/products';
import { useScene } from '../../context/SceneContext';

export const HeroSection: React.FC = () => {
  const { playFeedbackSound } = useScene();

  const handleScrollDown = () => {
    playFeedbackSound('click');
    window.scrollTo({ top: window.innerHeight * 1.1, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between items-center px-4 sm:px-8 pt-20 pb-8 sm:py-24 select-none pointer-events-none">
      {/* Huge Brand Typography in Background behind 3D Model */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <h1 className="font-space font-bold text-[20vw] sm:text-[18vw] leading-none tracking-tighter text-white/[0.035] select-none uppercase pointer-events-none text-center">
          NOVA
        </h1>
      </div>

      {/* Top telemetry header */}
      <div className="w-full max-w-7xl flex items-center justify-between font-mono text-[9px] sm:text-xs text-techGray uppercase tracking-widest pt-2 sm:pt-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-cyberLime animate-pulse" />
          <span>LIVE ARCHIVE 3D ENGINE</span>
        </div>
        <div className="hidden sm:block text-slate-400">
          COORD: {BRAND_INFO.coordinates}
        </div>
        <div className="text-right">
          STATUS: <span className="text-cyberLime">LIMITED RELEASE</span>
        </div>
      </div>

      {/* Center atmospheric tag */}
      <div className="text-center max-w-2xl mt-auto mb-6 sm:mb-16 pointer-events-auto px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/10 text-slate-300 font-mono text-[10px] sm:text-xs uppercase tracking-wider mb-3">
          <Sparkles size={12} className="text-cyberLime" />
          <span>AUTONOMOUS CYBERNETIC COUTURE</span>
        </div>
        <h2 className="font-space text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 sm:mb-4">
          ENGINEERED FOR THE DIGITAL ARCHIVE
        </h2>
        <p className="font-inter text-xs sm:text-base text-slate-400 max-w-lg mx-auto font-light leading-relaxed">
          High-concept luxury streetwear sculpted in 3D. Explore the weight, anatomy, and technical craftsmanship below.
        </p>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex flex-col items-center gap-2 pointer-events-auto pb-4">
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyberLime transition-colors group cursor-pointer"
          aria-label="Scroll to inspect garment"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-techGray group-hover:text-cyberLime transition-colors">
            SCROLL TO INSPECT
          </span>
          <div className="w-8 h-12 rounded-full border border-borderMuted flex items-start justify-center p-2 group-hover:border-cyberLime transition-colors">
            <div className="w-1.5 h-2.5 bg-cyberLime rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
