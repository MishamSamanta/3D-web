import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CartProvider } from './context/CartContext';
import { SceneProvider } from './context/SceneContext';
import { SceneCanvas } from './components/canvas/SceneCanvas';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Navbar } from './components/ui/Navbar';
import { CartDrawer } from './components/ui/CartDrawer';

import { HeroSection } from './components/sections/HeroSection';
import { ZoomSection } from './components/sections/ZoomSection';
import { ProductPanelSection } from './components/sections/ProductPanelSection';
import { CollectionSection } from './components/sections/CollectionSection';
import { DetailsSection } from './components/sections/DetailsSection';
import { ManifestoSection } from './components/sections/ManifestoSection';
import { FooterSection } from './components/sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for buttery-smooth inertia scrolling with native touch fallback
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.0,
      syncTouch: false, // Prevents Lenis from hijacking native mobile touch momentum
    });

    const updateScrollProgress = (currentScroll?: number) => {
      const scrollY = typeof currentScroll === 'number' ? currentScroll : (window.pageYOffset || document.documentElement.scrollTop || 0);
      const total = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const prog = Math.min(Math.max(scrollY / total, 0), 1);
      setScrollProgress(prog);
    };

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      ScrollTrigger.update();
      updateScrollProgress(e.scroll);
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Native window scroll, touchmove & resize listeners for rock-solid mobile sync
    const handleNativeScroll = () => updateScrollProgress();
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('touchmove', handleNativeScroll, { passive: true });
    window.addEventListener('resize', handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('touchmove', handleNativeScroll);
      window.removeEventListener('resize', handleNativeScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-void text-slate-100 selection:bg-cyberLime selection:text-black">
      {/* 3D Model Loading Screen */}
      <LoadingScreen />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Slide-in Shopping Bag Drawer */}
      <CartDrawer />

      {/* Fixed Full-Screen 3D Canvas */}
      <SceneCanvas scrollProgress={scrollProgress} />

      {/* 2D HTML Scroll Layers Pinned Over Fixed 3D Canvas */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 1. Hero Atmospheric Showcase */}
        <HeroSection />

        {/* 2. Zoom-in Macro Stitching & Weave */}
        <ZoomSection />

        {/* 3. 3D Unfolding Product Panel & Real-time Material Customizer */}
        <ProductPanelSection />

        {/* 4. Complete 3D Archive Capsule Carousel */}
        <CollectionSection />

        {/* 5. 360° Pinned Garment Anatomy Breakdown */}
        <DetailsSection />

        {/* 6. Technical Brand Manifesto */}
        <ManifestoSection />

        {/* 7. Footer Order Dispatch & Channels */}
        <FooterSection />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SceneProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </SceneProvider>
  );
}
