import React from 'react';
import { Eye, Shield, Cpu } from 'lucide-react';
import { useScene } from '../../context/SceneContext';

export const ZoomSection: React.FC = () => {
  const { activeProduct } = useScene();

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-between px-6 sm:px-12 py-20 pointer-events-none select-none">
      {/* Left Macro Telemetry HUD */}
      <div className="max-w-xs space-y-6 pointer-events-auto">
        <div className="glass-panel p-5 rounded-2xl border-l-2 border-l-cyberLime space-y-2">
          <div className="flex items-center gap-2 text-cyberLime font-mono text-xs tracking-wider">
            <Eye size={14} />
            <span>MACRO OPTIC ZOOM</span>
          </div>
          <p className="font-space text-base font-bold text-white uppercase">
            WEAVE DENSITY & SEAM STITCHING
          </p>
          <p className="font-inter text-xs text-slate-400 leading-relaxed">
            Examining the {activeProduct.technicalSpecs.weight} high-density gauge. Every seam is reinforced with double-pass bonded nylon for structural resilience.
          </p>
        </div>

        <div className="hidden sm:block glass-card p-4 rounded-xl border border-white/5 space-y-1">
          <div className="font-mono text-[10px] text-techGray uppercase">SURFACE TEXTURE</div>
          <div className="font-space text-xs font-semibold text-slate-200">
            {activeProduct.technicalSpecs.material}
          </div>
        </div>
      </div>

      {/* Center Reticle / Target Grid */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-16 h-16 border-t-2 border-r-2 border-cyberLime/60 rounded-full" />
        <div className="w-2 h-2 bg-cyberLime rounded-full" />
      </div>

      {/* Right Spec Metrics */}
      <div className="max-w-xs space-y-4 text-right pointer-events-auto">
        <div className="glass-panel p-5 rounded-2xl border-r-2 border-r-cyberNeon space-y-2">
          <div className="flex items-center justify-end gap-2 text-cyberNeon font-mono text-xs tracking-wider">
            <Cpu size={14} />
            <span>FABRIC ARCHITECTURE</span>
          </div>
          <div className="font-space text-lg font-bold text-white">
            {activeProduct.technicalSpecs.weight}
          </div>
          <p className="font-mono text-[11px] text-slate-400">
            {activeProduct.technicalSpecs.fit}
          </p>
        </div>

        <div className="hidden sm:inline-block glass-card px-4 py-2 rounded-lg font-mono text-[10px] text-techGray uppercase">
          HARDWARE: {activeProduct.technicalSpecs.hardware || 'LASER ETCHED CNC'}
        </div>
      </div>
    </section>
  );
};
