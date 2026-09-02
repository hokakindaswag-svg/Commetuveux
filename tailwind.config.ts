import type { Config } from 'tailwindcss';

/**
 * STUDIO NEIGE PARIS — thème.
 *
 * Les couleurs pointent vers les variables CSS définies dans
 * styles/globals.css (:root). C'est là, et uniquement là, que se modifie
 * la charte : ce fichier ne contient aucune valeur codée en dur.
 *
 * Le format `rgb(var(--x) / <alpha-value>)` permet de conserver les
 * modificateurs d'opacité de Tailwind (bg-burgundy/40, border-chocolate/15…).
 */
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

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
          DEFAULT: token('burgundy'),
          light: token('burgundy-light'),
        },
        pink: {
          DEFAULT: token('pink'),
          soft: token('pink-soft'),
          deep: token('pink-deep'),
        },
        chocolate: {
          DEFAULT: token('chocolate'),
          light: token('chocolate-light'),
        },
        ivory: {
          DEFAULT: token('ivory'),
          deep: token('ivory-deep'),
        },
        brown: token('brown'),
        cream: {
          DEFAULT: token('cream'),
          warm: token('cream-warm'),
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        // Alias conservé : `font-serif` reste équivalent à `font-display`.
        serif: ['var(--font-display)'],
      },
      letterSpacing: {
        wider: '.08em',
        widest: '.16em',
        brand: '.22em',
        signature: '.34em',
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
        studio: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
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
      },
      animation: {
        'fade-in': 'fade-in .35s ease both',
        'fade-up': 'fade-up .5s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'slide-in-right': 'slide-in-right .35s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'slide-in-left': 'slide-in-left .35s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'slide-down': 'slide-down .25s ease both',
      },
    },
  },
  plugins: [],
};

export default config;
