import React from 'react';
import { Terminal, Shield, Zap } from 'lucide-react';
import { BRAND_INFO } from '../../data/products';

export const ManifestoSection: React.FC = () => {
  return (
    <section
      id="manifesto-section"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 py-24 select-none pointer-events-none"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 pointer-events-auto">
        {/* Monogram tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-white/10 font-mono text-xs text-cyberLime uppercase tracking-widest">
          <Terminal size={14} />
          <span>MANIFESTO // 04</span>
        </div>

        {/* Big Editorial Headline */}
        <h2 className="font-space text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white leading-none">
          WE DO NOT DESIGN FOR TRENDS.<br />
          <span className="text-lime-gradient">WE ARCHITECT PROTOCOLS.</span>
        </h2>

        {/* Narrative Copy */}
        <p className="font-inter text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
          Born at the nexus of technical brutalism and high-density Japanese textiles. Every silhouette is conceived as a digital artifact first, stress-tested in physics engines, and constructed in physical laboratories in limited production batches.
        </p>

        {/* Ethos Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
            <div className="font-mono text-xs text-cyberLime uppercase tracking-wider">
              01 // ZERO COMPROMISE
            </div>
            <h3 className="font-space text-lg font-bold text-white">ORGANIC DENSITY</h3>
            <p className="font-inter text-xs text-slate-400 leading-relaxed">
              Custom-milled 520 GSM French terry and 3-layer bonded membranes engineered to endure seasons without structural degradation.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
            <div className="font-mono text-xs text-cyberNeon uppercase tracking-wider">
              02 // METAVERSE COMPATIBLE
            </div>
            <h3 className="font-space text-lg font-bold text-white">DIGITAL TWIN TWINNING</h3>
            <p className="font-inter text-xs text-slate-400 leading-relaxed">
              Every garment ships with an open-source GLTF asset for avatar wearability across decentralized 3D metaverses.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
            <div className="font-mono text-xs text-sky-400 uppercase tracking-wider">
              03 // ETHICAL ARCHIVE
            </div>
            <h3 className="font-space text-lg font-bold text-white">LIMITED RUNS</h3>
            <p className="font-inter text-xs text-slate-400 leading-relaxed">
              Strictly capped quantities. No overproduction, no clearance sales. Pure archival value for collectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
