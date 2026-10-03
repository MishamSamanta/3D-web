import React from 'react';
import { Compass, ShieldCheck, Feather, RefreshCw, Scissors, Sparkles } from 'lucide-react';
import { useScene } from '../../context/SceneContext';

export const DetailsSection: React.FC = () => {
  const { activeProduct } = useScene();

  return (
    <section
      id="details-section"
      className="relative min-h-[120vh] w-full flex flex-col justify-center px-6 sm:px-12 py-24 pointer-events-none select-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Reserved for the 360° rotating 3D garment */}
        <div className="hidden lg:block" />

        {/* Right Column: Pinned Technical Anatomy & Callouts */}
        <div className="space-y-6 pointer-events-auto">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyberLime uppercase tracking-wider mb-2">
              <Compass size={14} />
              <span>03 / 360° ANATOMICAL BREAKDOWN</span>
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              PRECISION CRAFTSMANSHIP
            </h2>
            <p className="font-inter text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              As you scroll through this sequence, the active 3D model completes an anatomical 360° rotation revealing every internal construction detail.
            </p>
          </div>

          {/* Interactive Feature Callouts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-cyberLime font-mono text-xs">
                <Feather size={14} />
                <span>FABRIC & WEAVE</span>
              </div>
              <h3 className="font-space text-sm font-bold text-white">
                {activeProduct.technicalSpecs.weight}
              </h3>
              <p className="font-inter text-xs text-slate-400">
                {activeProduct.technicalSpecs.material}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-cyberNeon font-mono text-xs">
                <Scissors size={14} />
                <span>ANATOMICAL FIT</span>
              </div>
              <h3 className="font-space text-sm font-bold text-white">
                DROP-SHOULDER TAPER
              </h3>
              <p className="font-inter text-xs text-slate-400">
                {activeProduct.technicalSpecs.fit}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-cyberLime font-mono text-xs">
                <RefreshCw size={14} />
                <span>GARMENT CARE</span>
              </div>
              <h3 className="font-space text-sm font-bold text-white">
                EXTENDED LONGEVITY
              </h3>
              <p className="font-inter text-xs text-slate-400">
                {activeProduct.technicalSpecs.care}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs">
                <ShieldCheck size={14} />
                <span>PROVENANCE</span>
              </div>
              <h3 className="font-space text-sm font-bold text-white">
                ATELIER CRAFT
              </h3>
              <p className="font-inter text-xs text-slate-400">
                {activeProduct.technicalSpecs.origin}
              </p>
            </div>
          </div>

          {/* List of engineered architectural features */}
          <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
            <div className="font-mono text-xs text-techGray uppercase tracking-wider mb-2">
              SPECIFICATION HIGHLIGHTS
            </div>
            <ul className="space-y-2 font-inter text-xs text-slate-300">
              {activeProduct.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyberLime flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
