import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useScene } from '../../context/SceneContext';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalQuantity } = useCart();
  const { playFeedbackSound } = useScene();

  // Free shipping threshold
  const freeShippingThreshold = 300;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (!isOpen) return null;

  const handleCheckout = () => {
    playFeedbackSound('click');
    if (items.length === 0) return;

    // Use the primary item's Stripe Payment link or fallback link
    const primaryUrl = items[0]?.product.stripePaymentUrl || 'https://buy.stripe.com/test_placeholder';
    window.open(primaryUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-void/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-borderMuted shadow-glass flex flex-col justify-between transform transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="p-6 border-b border-borderMuted flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-space text-lg font-bold tracking-wider text-white">
                BAG ARCHIVE
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-surfaceLight border border-borderMuted text-cyberLime font-mono text-xs">
                {totalQuantity} {totalQuantity === 1 ? 'PIECE' : 'PIECES'}
              </span>
            </div>
            <button
              onClick={() => {
                closeCart();
                playFeedbackSound('click');
              }}
              className="p-2 rounded-full hover:bg-surfaceLight text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Gauge */}
          <div className="px-6 py-3 bg-surfaceLight/40 border-b border-borderMuted">
            <div className="flex items-center justify-between font-mono text-[11px] mb-1.5 text-slate-300">
              <span className="flex items-center gap-1.5">
                <Truck size={13} className="text-cyberLime" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-cyberLime font-semibold">FREE WORLDWIDE EXPRESS UNLOCKED</span>
                ) : (
                  <span>ADD ${(freeShippingThreshold - subtotal).toFixed(0)} FOR FREE EXPRESS</span>
                )}
              </span>
              <span className="font-bold text-white">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-cyberLime transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 rounded-full border border-dashed border-borderMuted flex items-center justify-center mb-4 text-techGray">
                  00
                </div>
                <p className="font-space text-base text-slate-300 mb-1">YOUR ARCHIVE BAG IS EMPTY</p>
                <p className="font-mono text-xs text-techGray max-w-xs mb-6">
                  Select a garment from the 3D showcase to examine sizing and colorways.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full border border-cyberLime/40 text-cyberLime font-mono text-xs uppercase tracking-wider hover:bg-cyberLime hover:text-void transition-colors"
                >
                  EXPLORE ARCHIVE
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-xl bg-surfaceCard border border-borderMuted flex gap-4 items-start"
                >
                  {/* Color preview indicator */}
                  <div
                    className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: item.selectedColor.hex }}
                  >
                    <span className="font-mono text-[9px] text-white/70 uppercase">
                      {item.product.type}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-space text-sm font-bold text-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="font-mono text-xs text-cyberLime font-semibold mb-2">
                      {item.product.currency}{item.product.price}
                    </p>

                    <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400 mb-3">
                      <span>SIZE: <strong className="text-white">{item.selectedSize}</strong></span>
                      <span>COLOR: <strong className="text-white">{item.selectedColor.name}</strong></span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-borderMuted rounded-lg bg-surface">
                        <button
                          onClick={() => {
                            updateQuantity(item.cartItemId, -1);
                            playFeedbackSound('click');
                          }}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 font-mono text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            updateQuantity(item.cartItemId, 1);
                            playFeedbackSound('click');
                          }}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeItem(item.cartItemId);
                          playFeedbackSound('click');
                        }}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-borderMuted bg-surfaceLight/30 space-y-4">
              <div className="flex items-center justify-between font-mono text-sm">
                <span className="text-slate-400">SUBTOTAL</span>
                <span className="font-bold text-white text-lg font-space">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-techGray">
                <ShieldCheck size={14} className="text-cyberLime" />
                <span>SECURED BY STRIPE PAYMENT INFRASTRUCTURE</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl bg-cyberLime text-void font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white hover:shadow-glow-lime transition-all duration-300"
              >
                <span>PROCEED TO STRIPE CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <p className="text-center font-mono text-[10px] text-slate-500">
                TAXES & DUTIES CALCULATED DURING CHECKOUT
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
