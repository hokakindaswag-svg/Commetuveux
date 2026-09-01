import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#530E0E',
          50: '#FBF2F2',
          100: '#F3DCDC',
          600: '#6B1414',
          700: '#530E0E',
          900: '#360909',
        },
        wood: { DEFAULT: '#30150E', light: '#4A241A' },
        brown: { DEFAULT: '#6B4E3A', light: '#8D6E56' },
        blush: { DEFAULT: '#F3A0AA', soft: '#F9CDD3', deep: '#E4808C' },
        silk: { DEFAULT: '#F8E5D7', deep: '#F0D6C4' },
        cream: { DEFAULT: '#FDF9F5', warm: '#FAF3EC' },
        ink: '#000000',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        wider: '.08em',
        widest: '.16em',
        brand: '.24em',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      aspectRatio: {
        product: '3 / 4',
        editorial: '4 / 5',
        hero: '16 / 9',
      },
      maxWidth: {
        site: '1600px',
      },
      transitionTimingFunction: {
        closet: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in .35s ease both',
        'fade-up': 'fade-up .5s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'slide-in-right': 'slide-in-right .35s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'slide-in-left': 'slide-in-left .35s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'slide-down': 'slide-down .25s ease both',
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
