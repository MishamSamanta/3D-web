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
    // Initialize Lenis for buttery-smooth inertia scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      ScrollTrigger.update();
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const prog = total > 0 ? Math.min(Math.max(e.scroll / total, 0), 1) : 0;
      setScrollProgress(prog);
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Fallback standard window scroll listener
    const onWindowScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const prog = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      setScrollProgress(prog);
    };
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onWindowScroll);
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
