/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#060608',
        surface: '#0e0f14',
        surfaceLight: '#171922',
        surfaceCard: 'rgba(18, 20, 28, 0.75)',
        borderMuted: 'rgba(255, 255, 255, 0.1)',
        cyberLime: '#d4ff00',
        cyberNeon: '#00ff87',
        techGray: '#8b8e9b',
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px rgba(212, 255, 0, 0.35)',
        'glow-neon': '0 0 25px rgba(0, 255, 135, 0.35)',
        'glass': '0 20px 50px rgba(0, 0, 0, 0.65)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
