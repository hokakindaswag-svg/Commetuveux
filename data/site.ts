import type { NavItem } from '@/types';

/* ------------------------------------------------------------------ */
/*  Configuration globale de la boutique                               */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'Le Closet',
  legalName: 'Le Closet',
  tagline: 'Manteaux femme à 50€',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'fr_FR',
  currency: 'EUR',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'bonjour@lecloset.fr',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'lecloset',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_HANDLE || 'lecloset',
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || '',
  /** Prix cœur de gamme, affiché partout sur le site. */
  corePrice: 50,
  freeShippingThreshold: 80,
} as const;

/* ------------------------------------------------------------------ */
/*  Barre d'annonce — messages qui défilent                            */
/* ------------------------------------------------------------------ */

export const announcements = [
  'MANTEAUX À 50€ · LIVRAISON EN FRANCE',
  'NOUVEAUX MANTEAUX CHAQUE SEMAINE',
  'LE CLOSET — DES MANTEAUX À PRIX DOUX',
];

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export const mainNav: NavItem[] = [
  { label: 'Nouveautés', href: '/collections/nouveautes' },
  {
    label: 'Manteaux',
    href: '/collections/manteaux',
    children: [
      { label: 'Tous les manteaux', href: '/collections/manteaux' },
      { label: 'Manteaux longs', href: '/collections/manteaux-longs' },
      { label: 'Manteaux courts', href: '/collections/manteaux-courts' },
      { label: 'Doudounes', href: '/collections/doudounes' },
      { label: 'Fausse fourrure', href: '/collections/fausse-fourrure' },
      { label: 'Manteaux tendance', href: '/collections/manteaux-tendance' },
    ],
  },
  { label: 'Best-sellers', href: '/collections/best-sellers' },
  { label: 'Promotions', href: '/collections/promotions', accent: true },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Nouveautés', href: '/collections/nouveautes' },
      { label: 'Manteaux', href: '/collections/manteaux' },
      { label: 'Best-sellers', href: '/collections/best-sellers' },
      { label: 'Promotions', href: '/collections/promotions' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Livraison', href: '/livraison' },
      { label: 'Retours', href: '/retours' },
      { label: 'Guide des tailles', href: '/guide-des-tailles' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Le Closet',
    links: [
      { label: 'Notre histoire', href: '/notre-histoire' },
      { label: 'Instagram', href: `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'lecloset'}` },
      { label: 'TikTok', href: `https://tiktok.com/@${process.env.NEXT_PUBLIC_TIKTOK_HANDLE || 'lecloset'}` },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'CGV', href: '/cgv' },
      { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
      { label: 'Politique de retours', href: '/politique-de-retours' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Visuels éditoriaux — remplacez simplement les fichiers             */
/* ------------------------------------------------------------------ */

export const media = {
  logo: '/images/logo/le-closet.svg',
  logoMark: '/images/logo/le-closet-mark.svg',
  hero: '/images/lifestyle/hero-01.jpg',
  heroMobile: '/images/lifestyle/hero-01-mobile.jpg',
  editorial: '/images/lifestyle/editorial-01.jpg',
  editorialSecondary: '/images/lifestyle/editorial-02.jpg',
  newsletter: '/images/lifestyle/editorial-03.jpg',
  ugc: [
    '/images/lifestyle/ugc-01.jpg',
    '/images/lifestyle/ugc-02.jpg',
    '/images/lifestyle/ugc-03.jpg',
    '/images/lifestyle/ugc-04.jpg',
    '/images/lifestyle/ugc-05.jpg',
    '/images/lifestyle/ugc-06.jpg',
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Réassurance — uniquement des promesses que nous tenons             */
/* ------------------------------------------------------------------ */

export const trustPoints = [
  {
    title: 'Livraison suivie',
    text: 'Expédition depuis la France avec numéro de suivi sur chaque commande.',
    icon: 'truck' as const,
  },
  {
    title: 'Paiement sécurisé',
    text: 'Transactions chiffrées. Carte bancaire, Apple Pay et PayPal.',
    icon: 'lock' as const,
  },
  {
    title: 'Retours simples',
    text: '14 jours pour changer d’avis. Procédure de retour en ligne.',
    icon: 'return' as const,
  },
];
