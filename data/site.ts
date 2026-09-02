import type { NavItem } from '@/types';

/* ------------------------------------------------------------------ */
/*  STUDIO NEIGE PARIS — configuration globale                         */
/* ------------------------------------------------------------------ */

export const site = {
  /** Nom court, utilisé dans les titres et le fil d'Ariane. */
  name: 'Studio Neige',
  /** Signature complète de la marque. */
  fullName: 'Studio Neige Paris',
  legalName: 'Studio Neige Paris',
  tagline: 'Le vestiaire d’hiver',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'fr_FR',
  currency: 'EUR',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'bonjour@studioneige.fr',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'studioneigeparis',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_HANDLE || 'studioneigeparis',
  pinterest: process.env.NEXT_PUBLIC_PINTEREST_HANDLE || 'studioneigeparis',
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || '',
  /** Prix cœur de gamme, affiché partout sur le site. */
  corePrice: 50,
  freeShippingThreshold: 80,
} as const;

/* ------------------------------------------------------------------ */
/*  Barre d'annonce — messages qui défilent                            */
/* ------------------------------------------------------------------ */

export const announcements = [
  'MANTEAUX DÈS 50 € · LIVRAISON EN FRANCE',
  'STUDIO NEIGE PARIS · LE VESTIAIRE D’HIVER',
  'NOUVELLES PIÈCES CHAQUE SEMAINE',
];

/* ------------------------------------------------------------------ */
/*  Navigation principale — volontairement resserrée                   */
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
      { label: 'Éditions hiver', href: '/collections/editions-hiver' },
    ],
  },
  { label: 'Vestes', href: '/collections/vestes' },
  { label: 'Fourrures', href: '/collections/fausse-fourrure' },
  { label: 'Best-sellers', href: '/collections/best-sellers' },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: 'Boutique',
    links: [
      { label: 'Collection', href: '/collections/manteaux' },
      { label: 'Nouveautés', href: '/collections/nouveautes' },
      { label: 'Best-sellers', href: '/collections/best-sellers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { label: 'Livraison', href: '/livraison' },
      { label: 'Retours', href: '/retours' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Conditions', href: '/cgv' },
      { label: 'Confidentialité', href: '/politique-de-confidentialite' },
    ],
  },
  {
    title: 'La maison',
    links: [
      { label: 'Notre histoire', href: '/notre-histoire' },
      { label: 'Guide des tailles', href: '/guide-des-tailles' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de retours', href: '/politique-de-retours' },
    ],
  },
];

/** Réseaux sociaux — affichés dans le footer et le menu mobile. */
export const socialLinks = [
  { label: 'Instagram', href: `https://instagram.com/${site.instagram}`, icon: 'instagram' as const },
  { label: 'TikTok', href: `https://tiktok.com/@${site.tiktok}`, icon: 'tiktok' as const },
  { label: 'Pinterest', href: `https://pinterest.com/${site.pinterest}`, icon: 'pinterest' as const },
];

/* ------------------------------------------------------------------ */
/*  Visuels — remplacez simplement les fichiers pointés ici            */
/* ------------------------------------------------------------------ */

export const media = {
  /** Logo officiel, PNG à fond transparent. */
  logo: '/images/logo/studio-neige-paris.png',
  /** Proportions natives du logo, pour ne jamais le déformer. */
  logoWidth: 1136,
  logoHeight: 420,
  /**
   * Vidéo de campagne affichée en tête de page.
   * Format vertical (9:16), sans son, en lecture automatique et en boucle.
   * Deux encodages : WebM (plus léger) puis MP4 (compatible partout).
   * Pour la remplacer : déposez un nouveau MP4 ici et une image d'attente
   * (première image de la vidéo) dans heroPoster.
   */
  heroVideoWebm: '/videos/hero.webm',
  heroVideo: '/videos/hero.mp4',
  heroPoster: '/images/lifestyle/hero-poster.jpg',
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
    title: 'Livraison en France',
    text: 'Expédition depuis la France, avec numéro de suivi sur chaque commande.',
    icon: 'truck' as const,
  },
  {
    title: 'Paiement sécurisé',
    text: 'Transactions chiffrées. Carte bancaire, Apple Pay et PayPal.',
    icon: 'lock' as const,
  },
  {
    title: 'Retours simples',
    text: '14 jours pour changer d’avis, procédure de retour en ligne.',
    icon: 'return' as const,
  },
  {
    title: 'Pensé pour l’hiver',
    text: 'Une sélection resserrée, entièrement dédiée aux manteaux et vestes.',
    icon: 'snow' as const,
  },
];
