import React from 'react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { useScene } from '../../context/SceneContext';

export const CollectionSection: React.FC = () => {
  const { activeProduct, setActiveProduct, playFeedbackSound } = useScene();

  const handleSelect = (prod: Product) => {
    playFeedbackSound('click');
    setActiveProduct(prod);

    // Scroll back to product panel smoothly
    const panelEl = document.getElementById('product-panel-section');
    if (panelEl) {
      panelEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="collection-section"
      className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 py-20 pointer-events-none select-none"
    >
      {/* Top Section Header */}
      <div className="max-w-2xl pointer-events-auto">
        <div className="flex items-center gap-2 font-mono text-xs text-cyberLime uppercase tracking-wider mb-2">
          <Layers size={14} />
          <span>02 / 3D CAPSULE SHOWCASE</span>
        </div>
        <h2 className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          COMPLETE ARCHIVE COLLECTION
        </h2>
        <p className="font-inter text-xs sm:text-sm text-slate-400 max-w-md">
          Hover over any floating 3D silhouette in the carousel to inspect its elevation. Click to load garment materials and sizing.
        </p>
      </div>

      {/* Bottom Product Navigator Cards */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 pointer-events-auto mt-auto pt-8">
        {PRODUCTS.map((prod) => {
          const isSelected = prod.id === activeProduct.id;
          return (
            <div
              key={prod.id}
              onClick={() => handleSelect(prod)}
              className={`p-4 rounded-2xl glass-card cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? 'border-cyberLime bg-surfaceLight/80 shadow-glow-lime scale-102'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-techGray uppercase mb-2">
                <span>{prod.type}</span>
                <span className="text-cyberLime">{prod.currency}{prod.price}</span>
              </div>
              <h3 className="font-space text-sm font-bold text-white truncate mb-1">
                {prod.name}
              </h3>
              <p className="font-mono text-[10px] text-slate-400 line-clamp-1 mb-3">
                {prod.tagline}
              </p>
              <div className="flex items-center justify-between text-cyberLime font-mono text-[10px] uppercase font-semibold">
                <span>{isSelected ? 'LOADED' : 'INSPECT'}</span>
                <ArrowRight size={12} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
