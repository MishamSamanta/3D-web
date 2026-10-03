import React, { useState } from 'react';
import { ShoppingBag, Rotate3D, ExternalLink, Check, Sparkles } from 'lucide-react';
import { useScene } from '../../context/SceneContext';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';

export const ProductPanelSection: React.FC = () => {
  const {
    activeProduct,
    activeColor,
    setActiveColor,
    selectedSize,
    setSelectedSize,
    isInspectMode,
    setIsInspectMode,
    playFeedbackSound,
  } = useScene();

  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    playFeedbackSound('add');
    addItem(activeProduct, selectedSize, activeColor);
    setJustAdded(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7, x: 0.8 },
        colors: ['#d4ff00', '#00ff87', '#ffffff'],
      });
    } catch {
      // Ignore confetti fallback
    }

    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleColorChange = (color: typeof activeColor) => {
    playFeedbackSound('swatch');
    setActiveColor(color);
  };

  const handleSizeChange = (size: string) => {
    playFeedbackSound('click');
    setSelectedSize(size);
  };

  const handleDirectStripeBuy = () => {
    playFeedbackSound('click');
    window.open(activeProduct.stripePaymentUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="product-panel-section"
      className="relative min-h-screen w-full flex items-center justify-end px-4 sm:px-12 py-20 pointer-events-none"
    >
      {/* 3D Perspective Unfolding Card */}
      <div className="w-full max-w-lg pointer-events-auto perspective-1000">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-glass transform-style-3d transition-transform duration-500 hover:rotate-y-1">
          {/* Top Badges */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-cyberLime/10 border border-cyberLime/30 font-mono text-[11px] font-semibold text-cyberLime uppercase tracking-wider">
              {activeProduct.badge || 'ACTIVE SPECIFICATION'}
            </span>
            <span className="font-mono text-xs text-techGray uppercase">
              {activeProduct.category}
            </span>
          </div>

          {/* Title & Price */}
          <div className="mb-4">
            <h2 className="font-space text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
              {activeProduct.name}
            </h2>
            <p className="font-inter text-xs sm:text-sm text-slate-400 mb-3">
              {activeProduct.tagline}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-space text-3xl font-bold text-cyberLime">
                {activeProduct.currency}{activeProduct.price}
              </span>
              <span className="font-mono text-xs text-techGray">USD // TAX INCL.</span>
            </div>
          </div>

          {/* Colorway Swatches */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-300 font-semibold uppercase">
                COLORWAY: <span className="text-white">{activeColor.name}</span>
              </span>
              <span className="font-mono text-[10px] text-techGray">REAL-TIME SHADER</span>
            </div>
            <div className="flex items-center gap-3">
              {activeProduct.colors.map((c) => {
                const isSelected = activeColor.name === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => handleColorChange(c)}
                    className={`relative w-9 h-9 rounded-full transition-all duration-200 flex items-center justify-center border-2 ${
                      isSelected
                        ? 'border-cyberLime scale-110 shadow-glow-lime'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select ${c.name} colorway`}
                  >
                    {isSelected && <Check size={14} className="text-white drop-shadow" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-300 font-semibold uppercase">
                SIZE SELECTION
              </span>
              <span className="font-mono text-[10px] text-cyberNeon cursor-pointer hover:underline">
                FIT GUIDE
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {activeProduct.sizes.map((s) => {
                const isSelected = selectedSize === s;
                return (
                  <button
                    key={s}
                    onClick={() => handleSizeChange(s)}
                    className={`py-2 rounded-xl font-mono text-xs font-semibold uppercase transition-all duration-200 border ${
                      isSelected
                        ? 'bg-cyberLime text-void border-cyberLime shadow-glow-lime'
                        : 'bg-surfaceCard text-slate-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drag-to-Rotate 3D Inspection Mode Toggle */}
          <div className="mb-6">
            <button
              onClick={() => {
                playFeedbackSound('click');
                setIsInspectMode(!isInspectMode);
              }}
              className={`w-full py-2.5 px-4 rounded-xl border font-mono text-xs flex items-center justify-center gap-2 transition-all ${
                isInspectMode
                  ? 'bg-cyberLime/20 border-cyberLime text-cyberLime shadow-glow-lime'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-cyberLime/40 hover:text-white'
              }`}
            >
              <Rotate3D size={16} className={isInspectMode ? 'animate-spin' : ''} />
              <span>
                {isInspectMode
                  ? '3D ROTATION ACTIVE — DRAG CANVAS'
                  : 'CLICK TO DRAG & ROTATE 3D MODEL'}
              </span>
            </button>
          </div>

          {/* Actions: Add to Bag & Stripe Direct */}
          <div className="space-y-2.5">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl bg-cyberLime text-void font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white hover:shadow-glow-lime transition-all duration-300 active:scale-95"
            >
              <ShoppingBag size={18} />
              <span>{justAdded ? 'ADDED TO ARCHIVE BAG' : 'ADD TO BAG'}</span>
            </button>

            <button
              onClick={handleDirectStripeBuy}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
            >
              <span>INSTANT STRIPE CHECKOUT</span>
              <ExternalLink size={14} className="text-cyberLime" />
            </button>
          </div>

          {/* Guarantee footer */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-techGray">
            <span>WORLDWIDE COURIER DISPATCH</span>
            <span>COMPLIMENTARY 14-DAY RETURNS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
