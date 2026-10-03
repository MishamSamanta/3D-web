import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, Product, ProductColor } from '../data/products';

interface SceneContextType {
  activeProduct: Product;
  setActiveProduct: (product: Product) => void;
  activeColor: ProductColor;
  setActiveColor: (color: ProductColor) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  isInspectMode: boolean;
  setIsInspectMode: (val: boolean) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  playFeedbackSound: (type?: 'click' | 'swatch' | 'add') => void;
  isMobile: boolean;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);
  const [activeColor, setActiveColor] = useState<ProductColor>(PRODUCTS[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(PRODUCTS[0].sizes[1] || 'M');
  const [isInspectMode, setIsInspectMode] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // When active product changes, sync default color and size
  const handleSelectProduct = (prod: Product) => {
    setActiveProduct(prod);
    setActiveColor(prod.colors[0]);
    setSelectedSize(prod.sizes[1] || prod.sizes[0]);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleAudio = () => setAudioEnabled(prev => !prev);

  // Procedural Web Audio API sound generator (Zero external MP3 dependencies)
  const playFeedbackSound = (type: 'click' | 'swatch' | 'add' = 'click') => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'swatch') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.06);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'add') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(780, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch {
      // Audio context policy blocked or not supported
    }
  };

  return (
    <SceneContext.Provider
      value={{
        activeProduct,
        setActiveProduct: handleSelectProduct,
        activeColor,
        setActiveColor,
        selectedSize,
        setSelectedSize,
        isInspectMode,
        setIsInspectMode,
        currentSection,
        setCurrentSection,
        audioEnabled,
        toggleAudio,
        playFeedbackSound,
        isMobile,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};
