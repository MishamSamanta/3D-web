import React, { useState } from 'react';
import { ArrowRight, Check, Send, ShoppingBag, Globe, Shield, Terminal } from 'lucide-react';
import { BRAND_INFO, PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useScene } from '../../context/SceneContext';

export const FooterSection: React.FC = () => {
  const { subtotal, totalQuantity, openCart } = useCart();
  const { playFeedbackSound } = useScene();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    playFeedbackSound('click');
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const handleQuickCheckout = () => {
    playFeedbackSound('click');
    if (totalQuantity > 0) {
      openCart();
    } else {
      // Open primary product stripe link
      window.open(PRODUCTS[0].stripePaymentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="relative min-h-[85vh] w-full flex flex-col justify-between px-6 sm:px-12 py-20 bg-void/90 backdrop-blur-md border-t border-white/10 z-10">
      {/* Top Banner: Quick Cart / Direct Checkout summary */}
      <div className="max-w-7xl mx-auto w-full mb-16">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-cyberLime font-mono text-xs uppercase tracking-wider mb-2">
              <ShoppingBag size={15} />
              <span>ARCHIVE ORDER DISPATCH</span>
            </div>
            <h3 className="font-space text-2xl sm:text-3xl font-bold text-white mb-2">
              READY TO SECURE YOUR PIECE?
            </h3>
            <p className="font-inter text-xs sm:text-sm text-slate-400 max-w-md">
              Current Bag Status: {totalQuantity} {totalQuantity === 1 ? 'Garment' : 'Garments'} selected. Checkout securely via Stripe infrastructure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {totalQuantity > 0 && (
              <div className="font-space text-2xl font-bold text-white mr-4">
                ${subtotal.toFixed(2)}
              </div>
            )}
            <button
              onClick={handleQuickCheckout}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyberLime text-void font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white hover:shadow-glow-lime transition-all duration-300"
            >
              <span>{totalQuantity > 0 ? 'VIEW BAG & CHECKOUT' : 'ACQUIRE HERO PIECE'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Newsletter, Brand, Links */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Information */}
        <div className="md:col-span-4 space-y-4">
          <div className="font-space text-2xl font-bold tracking-widest text-white">
            {BRAND_INFO.name}
          </div>
          <p className="font-inter text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            {BRAND_INFO.tagline}
          </p>
          <div className="font-mono text-xs text-techGray space-y-1 pt-2">
            <div>LOCATION: {BRAND_INFO.coordinates}</div>
            <div>INQUIRIES: <a href={`mailto:${BRAND_INFO.contactEmail}`} className="text-slate-300 hover:text-cyberLime transition-colors">{BRAND_INFO.contactEmail}</a></div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-mono text-xs text-slate-200 font-semibold uppercase tracking-wider">
            COLLECTIONS
          </div>
          <ul className="font-mono text-xs text-slate-400 space-y-2">
            {PRODUCTS.map(p => (
              <li key={p.id}>
                <button
                  onClick={() => {
                    const el = document.getElementById('product-panel-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-cyberLime transition-colors text-left"
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Networks */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-mono text-xs text-slate-200 font-semibold uppercase tracking-wider">
            CHANNELS
          </div>
          <ul className="font-mono text-xs text-slate-400 space-y-2">
            <li>
              <a href={BRAND_INFO.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-cyberLime transition-colors">
                INSTAGRAM
              </a>
            </li>
            <li>
              <a href={BRAND_INFO.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-cyberLime transition-colors">
                X / TWITTER
              </a>
            </li>
            <li>
              <a href={BRAND_INFO.socials.discord} target="_blank" rel="noreferrer" className="hover:text-cyberLime transition-colors">
                DISCORD LAB
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-4 space-y-4">
          <div className="font-mono text-xs text-slate-200 font-semibold uppercase tracking-wider">
            TRANSMISSION PROTOCOL
          </div>
          <p className="font-inter text-xs text-slate-400">
            Subscribe for secret drop coordinates, restock dispatches, and private 3D showroom invites.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL ADDRESS"
              className="flex-1 bg-surfaceCard border border-borderMuted rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyberLime transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-cyberLime text-void rounded-xl font-mono text-xs font-bold hover:bg-white transition-colors flex items-center justify-center"
              aria-label="Subscribe"
            >
              {subscribed ? <Check size={16} /> : <Send size={15} />}
            </button>
          </form>
          {subscribed && (
            <p className="font-mono text-[11px] text-cyberNeon">
              COORDINATES CONFIRMED. YOU ARE ON THE TRANSMISSION LIST.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-techGray">
        <div>
          © {new Date().getFullYear()} {BRAND_INFO.name}. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-6">
          <span>POWERED BY THREE.JS // R3F // LENIS // GSAP</span>
          <span>STATIC DEPLOY READY</span>
        </div>
      </div>
    </footer>
  );
};
