import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const LoadingScreen: React.FC = () => {
  const { progress, active } = useProgress();
  const [hasCompleted, setHasCompleted] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly interpolate display percentage
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev < progress) {
          return Math.min(prev + 2, Math.floor(progress));
        }
        if (progress >= 100 && prev >= 99) {
          clearInterval(timer);
          setTimeout(() => setHasCompleted(true), 400);
          return 100;
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [progress]);

  if (hasCompleted && !active) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-void transition-opacity duration-700 ${
        displayProgress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,255,0,0.06)_0,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        {/* Brand Monogram */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-cyberLime rounded-full animate-ping" />
          <span className="font-space tracking-[0.35em] text-xs font-semibold text-slate-400 uppercase">
            NOVA // ARCHIVE
          </span>
        </div>

        {/* Progress Value */}
        <div className="font-space text-6xl font-bold tracking-tight text-white mb-4">
          {displayProgress}
          <span className="text-cyberLime text-2xl font-normal ml-1">%</span>
        </div>

        {/* High-tech Progress Bar */}
        <div className="w-full h-1 bg-surfaceLight rounded-full overflow-hidden border border-borderMuted mb-4">
          <div
            className="h-full bg-gradient-to-r from-cyberLime to-cyberNeon transition-all duration-150 ease-out shadow-glow-lime"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-between w-full font-mono text-[11px] text-techGray tracking-wider uppercase">
          <span>{displayProgress < 50 ? 'STREAMING GLTF BUFFERS' : displayProgress < 90 ? 'COMPILING FABRIC SHADERS' : 'INITIALIZING EXPERIENCE'}</span>
          <span className="text-cyberLime">SYS.READY</span>
        </div>
      </div>
    </div>
  );
};
