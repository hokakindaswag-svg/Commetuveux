import type { Product } from '@/types';

/* ------------------------------------------------------------------ */
/*  CATALOGUE STUDIO NEIGE PARIS                                       */
/*                                                                     */
/*  Uniquement des produits réels, photographiés par la marque.        */
/*  Ajouter une pièce = ajouter un objet à ce tableau, et déposer ses  */
/*  visuels dans /public/images/products/.                             */
/*                                                                     */
/*  Convention : images[0] = visuel principal, images[1] = survol.     */
/*  Les visuels suivants alimentent la galerie de la fiche produit.    */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    // Produit réel — photos de la marque.
    id: 'SN-001',
    slug: 'cape-fourrure-iris',
    name: 'CAPE FOURRURE IRIS',
    price: 19.99,
    compareAtPrice: 50,
    category: 'fausse-fourrure',
    style: 'statement',
    color: { name: 'Ivoire', hex: '#F6EFE6', group: 'Crème' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/cape-fourrure-iris-1.jpg',
      '/images/products/cape-fourrure-iris-2.jpg',
      '/images/products/cape-fourrure-iris-3.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'La pièce statement de la saison : une cape en maille ivoire à enfiler, bordée d’une fausse fourrure épaisse et ultra douce sur tout le tour — col, manches et ourlet. Coupe ample et drapée, elle se porte aussi bien sur un jean que sur une robe.',
    details: [
      'Cape oversize à enfiler',
      'Col fourrure enveloppant',
      'Manches et ourlet bordés de fausse fourrure épaisse',
      'Coupe ample et drapée',
    ],
    material: 'Fausse fourrure',
    // Composition à confirmer par la marque — valeur reprise des autres
    // pièces en fausse fourrure du catalogue, à ajuster si différente.
    composition: '80% acrylique, 20% polyester · Doublure : 100% polyester',
    care: 'Nettoyage à sec uniquement. Brosser délicatement dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 10, S: 12, M: 14, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos de la marque.
    id: 'SN-002',
    slug: 'cape-fourrure-maud',
    name: 'CAPE FOURRURE MAUD',
    price: 19.99,
    compareAtPrice: 50,
    category: 'fausse-fourrure',
    style: 'statement',
    color: { name: 'Taupe', hex: '#9C8378', group: 'Marron' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/cape-fourrure-maud-1.jpg',
      '/images/products/cape-fourrure-maud-2.jpg',
      '/images/products/cape-fourrure-maud-3.jpg',
      '/images/products/cape-fourrure-maud-4.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'Une cape en maille taupe à enfiler, bordée d’une large fausse fourrure sur le col, les manches et l’ourlet. Le drapé souple crée du mouvement à chaque pas, et la teinte chaude se marie aussi bien au chocolat qu’au bordeaux ou au crème.',
    details: [
      'Cape oversize à enfiler',
      'Col fourrure enveloppant',
      'Manches et ourlet bordés de fausse fourrure épaisse',
      'Drapé souple, longueur mi-cuisse',
    ],
    material: 'Fausse fourrure',
    // Composition à confirmer par la marque.
    composition: '80% acrylique, 20% polyester · Doublure : 100% polyester',
    care: 'Nettoyage à sec uniquement. Brosser délicatement dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 12, S: 14, M: 16, L: 12, XL: 8 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos fournies par la marque.
    id: 'SN-003',
    slug: 'veste-capuche-alma',
    name: 'VESTE CAPUCHE ALMA',
    price: 19.99,
    compareAtPrice: 50,
    category: 'manteaux-courts',
    style: 'capuche',
    color: { name: 'Sable', hex: '#D9BB9A', group: 'Beige' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/veste-capuche-alma-1.jpg',
      '/images/products/veste-capuche-alma-2.jpg',
      '/images/products/veste-capuche-alma-3.jpg',
      '/images/products/veste-capuche-alma-4.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'Une veste courte en maille camel, fermée par un zip, avec une capuche bordée d’une fausse fourrure généreuse et doublée de satin. Bords-côtes à la taille et aux poignets pour une ligne nette, deux poches devant : la pièce qu’on enfile sur tout, du jean au pantalon de tailleur.',
    details: [
      'Maille douce, coupe courte',
      'Capuche bordée de fausse fourrure, doublée satin',
      'Fermeture zippée sur toute la hauteur',
      'Bords-côtes taille et poignets, deux poches devant',
    ],
    // Corps en maille ; fourrure de capuche synthétique (confirmé par la
    // marque). Les pourcentages exacts restent à préciser sur l'étiquette.
    material: 'Laine mélangée',
    composition:
      'Corps en maille · Capuche bordée de fausse fourrure, sans fourrure animale · Doublure : 100% polyester',
    care: 'Nettoyage à sec recommandé. Brosser la fausse fourrure de la capuche dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 10, S: 12, M: 12, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos fournies par la marque.
    id: 'SN-004',
    slug: 'veste-fourrure-nina',
    name: 'VESTE FOURRURE NINA',
    price: 49.99,
    compareAtPrice: 169.99,
    category: 'fausse-fourrure',
    style: 'crop',
    color: { name: 'Ivoire', hex: '#EFE9E0', group: 'Crème' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/veste-fourrure-nina-1.jpg',
      '/images/products/veste-fourrure-nina-2.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'Une veste courte qui joue sur deux matières : un plastron et un col en fausse fourrure nuancée crème et taupe, montés sur une maille côtelée ivoire. Les poignets sont bordés de la même fourrure, la taille resserrée par une côte large. Une pièce du soir qui se porte aussi sur un jean.',
    details: [
      'Coupe courte, taille marquée par une côte large',
      'Plastron et col en fausse fourrure nuancée',
      'Manches en maille côtelée, poignets bordés de fausse fourrure',
      'Ouverture droite sans fermeture apparente',
    ],
    material: 'Fausse fourrure',
    // Composition à confirmer par la marque.
    composition: '80% acrylique, 20% polyester · Doublure : 100% polyester',
    care: 'Nettoyage à sec uniquement. Brosser délicatement dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 8, S: 12, M: 12, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos fournies par la marque.
    id: 'SN-005',
    slug: 'veste-capuche-lea',
    name: 'VESTE CAPUCHE LÉA',
    price: 19.99,
    compareAtPrice: 50,
    category: 'manteaux-courts',
    style: 'capuche',
    color: { name: 'Camel', hex: '#AB886D', group: 'Beige' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/veste-capuche-lea-1.jpg',
      '/images/products/veste-capuche-lea-2.jpg',
      '/images/products/veste-capuche-lea-3.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'La veste zippée en maille camel, capuche généreusement bordée de fausse fourrure et doublée de satin. Bords-côtes à la taille et aux poignets, tombé souple : elle se ferme jusqu’en haut les jours de grand froid, et se porte ouverte le reste du temps.',
    details: [
      'Maille douce, coupe courte',
      'Capuche bordée de fausse fourrure, doublée satin',
      'Fermeture zippée sur toute la hauteur',
      'Bords-côtes taille et poignets',
    ],
    material: 'Laine mélangée',
    // Composition exacte à confirmer par la marque.
    composition:
      'Corps en maille · Capuche bordée de fausse fourrure, sans fourrure animale · Doublure : 100% polyester',
    care: 'Nettoyage à sec recommandé. Brosser la fausse fourrure de la capuche dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 10, S: 12, M: 14, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos fournies par la marque.
    id: 'SN-006',
    slug: 'manteau-col-fourrure-vera',
    name: 'MANTEAU COL FOURRURE VERA',
    price: 49.99,
    compareAtPrice: 169.99,
    category: 'manteaux-courts',
    style: 'ceinture',
    color: { name: 'Noir', hex: '#121212', group: 'Noir' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/manteau-col-fourrure-vera-1.jpg',
      '/images/products/manteau-col-fourrure-vera-2.jpg',
      '/images/products/manteau-col-fourrure-vera-3.jpg',
      '/images/products/manteau-col-fourrure-vera-4.jpg',
      '/images/products/manteau-col-fourrure-vera-5.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'Un manteau court en drap de laine noir, taillé autour d’un immense col en fausse fourrure brune qui couvre les épaules comme une étole. La ceinture à nouer marque la taille et fait tomber le bas en corolle. Le contraste noir et brun en fait une pièce de soirée autant qu’un manteau de tous les jours.',
    details: [
      'Coupe courte, bas évasé',
      'Très large col en fausse fourrure couvrant les épaules',
      'Ceinture à nouer, passants latéraux',
      'Manches longues légèrement évasées',
    ],
    material: 'Laine mélangée',
    // Corps en drap de laine ; col en fausse fourrure (confirmé par la
    // marque). Les pourcentages exacts restent à préciser sur l'étiquette.
    composition:
      'Corps en drap de laine · Col en fausse fourrure, sans fourrure animale · Doublure : 100% polyester',
    care: 'Nettoyage à sec uniquement. Brosser la fausse fourrure du col dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 8, S: 12, M: 12, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-02',
  },
  {
    // Produit réel — photos fournies par la marque.
    id: 'SN-007',
    slug: 'veste-capuche-cleo',
    name: 'VESTE CAPUCHE CLÉO',
    price: 19.99,
    compareAtPrice: 50,
    category: 'manteaux-courts',
    style: 'capuche',
    color: { name: 'Ivoire', hex: '#F3F0EA', group: 'Crème' },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/veste-capuche-cleo-1.jpg',
      '/images/products/veste-capuche-cleo-2.jpg',
      '/images/products/veste-capuche-cleo-3.jpg',
      '/images/products/veste-capuche-cleo-4.jpg',
      '/images/products/veste-capuche-cleo-5.jpg',
    ],
    badge: 'NOUVEAU',
    description:
      'La veste zippée en maille ivoire, capuche bordée d’une fausse fourrure blanche très fournie et doublée de satin. Bords-côtes à la taille et aux poignets, tombé souple : le blanc d’hiver qui se porte du matin au soir, capuche relevée ou rabattue sur les épaules.',
    details: [
      'Maille douce, coupe courte',
      'Capuche bordée de fausse fourrure blanche, doublée satin',
      'Fermeture zippée sur toute la hauteur',
      'Bords-côtes taille et poignets',
    ],
    material: 'Laine mélangée',
    // Composition exacte à confirmer par la marque.
    composition:
      'Corps en maille · Capuche bordée de fausse fourrure, sans fourrure animale · Doublure : 100% polyester',
    care: 'Nettoyage à sec recommandé. Brosser la fausse fourrure de la capuche dans le sens du poil.',
    featured: true,
    bestseller: false,
    newArrival: true,
    inventory: { XS: 10, S: 12, M: 14, L: 10, XL: 6 },
    rating: 0,
    reviewCount: 0,
    addedAt: '2026-09-03',
  },
];

export default products;
