/**
 * Contenu éditorial du site. Tout se modifie ici — aucun composant à toucher.
 * Les champs `image` acceptent une URL (ex. '/images/hero.jpg').
 * Laissés à `null`, un visuel vectoriel de substitution est affiché.
 */

export const SITE = {
  name: 'Le Closet',
  tagline: 'Le dressing des filles qui ont du goût.',
  email: 'bonjour@lecloset.fr',

  announcements: [
    'Des manteaux à 50€ · Livraison en France',
    'Le Closet — les manteaux à prix doux',
    'Livraison suivie · Retours sous 14 jours',
  ],

  hero: {
    image: null,
    eyebrow: 'Nouvelle saison',
    title: 'Le Coat Edit',
    text: 'Les manteaux qu’on veut porter tout l’hiver. À partir de 50€.',
    cta: { label: 'Découvrir les manteaux', to: '/manteaux' },
    ctaSecondary: { label: 'Best-sellers', to: '/best-sellers' },
  },

  editorial: {
    image: null,
    eyebrow: 'Le Closet',
    title: 'Bienvenue dans Le Closet',
    text: 'Des manteaux qu’on remarque. Des prix qu’on aime.',
    cta: { label: 'Shopper les manteaux', to: '/manteaux' },
  },

  duo: [
    { image: null, tone: 'burgundy', title: 'Fausse fourrure', text: 'La texture de la saison.', to: '/manteaux/fausse-fourrure' },
    { image: null, tone: 'wood', title: 'Manteaux longs', text: 'La silhouette qui allonge tout.', to: '/manteaux/manteaux-longs' },
  ],

  /* Uniquement des engagements confirmés. Rien d'inventé. */
  trust: [
    { icon: 'truck', title: 'Livraison suivie', text: 'Suivez votre commande jusqu’à sa livraison.' },
    { icon: 'lock', title: 'Paiement sécurisé', text: 'Payez en toute sécurité.' },
    { icon: 'return', title: 'Retours simples', text: 'Vous disposez de 14 jours pour effectuer un retour.' },
  ],

  valuebar: [
    { title: 'Manteaux à 50€', text: 'Notre prix de référence.' },
    { title: 'Livraison suivie', text: 'Partout en France.' },
    { title: '14 jours pour changer d’avis', text: 'Retours simples.' },
    { title: 'Coats only', text: 'Une seule obsession.' },
  ],

  newsletter: {
    eyebrow: 'Newsletter',
    title: 'Bienvenue dans Le Closet ♡',
    text: 'Inscris-toi pour découvrir les nouveautés et les offres avant tout le monde.',
    cta: 'Je m’inscris',
  },

  footer: [
    {
      title: 'Shop',
      links: [
        { label: 'Nouveautés', to: '/nouveautes' },
        { label: 'Manteaux', to: '/manteaux' },
        { label: 'Best-sellers', to: '/best-sellers' },
        { label: 'Promotions', to: '/promotions' },
      ],
    },
    {
      title: 'Aide',
      links: [
        { label: 'FAQ', to: '/infos/faq' },
        { label: 'Livraison', to: '/infos/livraison' },
        { label: 'Retours', to: '/infos/retours' },
        { label: 'Guide des tailles', to: '/infos/guide-des-tailles' },
        { label: 'Contact', to: '/infos/contact' },
      ],
    },
    {
      title: 'Le Closet',
      links: [
        { label: 'Notre histoire', to: '/infos/notre-histoire' },
        { label: 'Instagram', href: 'https://instagram.com', external: true },
        { label: 'TikTok', href: 'https://tiktok.com', external: true },
      ],
    },
    {
      title: 'Informations',
      links: [
        { label: 'Mentions légales', to: '/infos/mentions-legales' },
        { label: 'CGV', to: '/infos/cgv' },
        { label: 'Politique de confidentialité', to: '/infos/confidentialite' },
        { label: 'Politique de retours', to: '/infos/politique-de-retours' },
      ],
    },
  ],
};

export const SIZE_GUIDE = [
  { size: 'XS', fr: '34', bust: '82–86', waist: '62–66' },
  { size: 'S', fr: '36', bust: '86–90', waist: '66–70' },
  { size: 'M', fr: '38', bust: '90–94', waist: '70–74' },
  { size: 'L', fr: '40', bust: '94–99', waist: '74–79' },
  { size: 'XL', fr: '42', bust: '99–104', waist: '79–85' },
];
