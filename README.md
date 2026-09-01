# Le Closet

Boutique en ligne **Le Closet** — le vestiaire français dédié aux manteaux femme, tous à **50 €**.

Site ecommerce complet : page d’accueil éditoriale, pages collection avec filtres et tris,
fiches produit, panier en tiroir, wishlist, recherche, pages d’aide et pages légales.
Interface entièrement en français, prix en euros.

---

## Stack

| | |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| UI | React 19 + TypeScript |
| Styles | Tailwind CSS 3.4 |
| Images | `next/image` (fichiers locaux dans `/public/images`) |
| État panier / wishlist | React Context + `localStorage` |

Aucune base de données, aucun service externe requis : le catalogue est un simple fichier
TypeScript. Le site est intégralement pré-généré en statique (89 pages).

---

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
```

Autres commandes :

```bash
npm run build      # build de production
npm run start      # sert le build de production
npm run lint       # ESLint (config next/core-web-vitals)
npm run typecheck  # TypeScript sans émission
```

Node 18.18 ou plus récent.

### Variables d’environnement

Toutes optionnelles. Copiez `.env.example` vers `.env.local` pour les personnaliser :

```bash
cp .env.example .env.local
```

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (metadata SEO, sitemap, données structurées) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Adresse affichée sur les pages Contact / FAQ |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | Compte Instagram (sans le `@`) |
| `NEXT_PUBLIC_TIKTOK_HANDLE` | Compte TikTok (sans le `@`) |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | Endpoint POST d’inscription newsletter. Vide = mode démo |

---

## Structure

```
├── app/                        Routes (App Router)
│   ├── page.tsx                Accueil
│   ├── collections/[handle]/   Pages collection
│   ├── products/[slug]/        Fiches produit
│   ├── panier/ wishlist/ compte/
│   ├── faq/ livraison/ retours/ guide-des-tailles/ contact/ notre-histoire/
│   ├── mentions-legales/ cgv/ politique-de-confidentialite/ politique-de-retours/
│   ├── sitemap.ts robots.ts not-found.tsx layout.tsx
├── components/
│   ├── layout/                 Header, barre d’annonce, menu mobile, recherche, footer, newsletter
│   ├── home/                   Hero, éditorial, réassurance, UGC, titres de section
│   ├── product/                Carte produit, grille, galerie, achat, accordéon, guide des tailles
│   ├── collection/             Vue collection, panneau de filtres
│   ├── cart/                   Tiroir panier
│   ├── providers/              Contexte panier + wishlist
│   └── ui/                     Icônes, prix, étoiles, tiroir, logo
├── data/                       ← tout le contenu éditable
│   ├── products.ts             Catalogue (60 manteaux)
│   ├── collections.ts          Collections et leurs filtres
│   ├── filters.ts              Options de filtres et de tri
│   └── site.ts                 Marque, navigation, footer, visuels, réassurance
├── lib/                        Sélecteurs catalogue, filtres, tri, recherche, formatage
├── public/images/
│   ├── products/               2 visuels par manteau
│   ├── lifestyle/              Hero, éditoriaux, bannières collection, UGC
│   └── logo/                   Logo Le Closet
├── scripts/                    Génération des visuels de démonstration
├── styles/globals.css          Base Tailwind + composants (boutons, champs, léopard)
└── types/index.ts              Schéma Product, Collection, panier, filtres
```

---

## Ajouter un manteau

Ouvrez `data/products.ts` et ajoutez un objet au tableau. C’est tout : la fiche produit,
la grille, le sitemap et les données structurées sont générés automatiquement.

```ts
{
  id: 'LC-061',
  slug: 'manteau-long-victoire',        // → /products/manteau-long-victoire
  name: 'MANTEAU LONG VICTOIRE',
  price: 50,
  compareAtPrice: 149,                   // prix barré affiché
  category: 'manteaux-longs',
  style: 'ceinture',
  color: { name: 'Bordeaux', hex: '#530E0E', group: 'Bordeaux' },
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  images: [
    '/images/products/manteau-long-victoire-1.jpg',
    '/images/products/manteau-long-victoire-2.jpg',  // visuel affiché au survol
  ],
  badge: 'NOUVEAUTÉ',
  description: '…',
  details: ['…'],
  material: 'Laine mélangée',
  composition: '…',
  care: '…',
  featured: true,       // section « Les manteaux du moment »
  bestseller: false,    // section « Les plus aimés »
  newArrival: true,     // collection Nouveautés
  inventory: { XS: 4, S: 8, M: 8, L: 6, XL: 3 },  // 0 = taille épuisée
  rating: 4.8,
  reviewCount: 42,
  addedAt: '2026-09-01',
}
```

Les valeurs autorisées pour `category`, `style`, `color.group`, `badge` et `material` sont
listées dans `types/index.ts`.

---

## Remplacer les images

**Aucun visuel n’est codé en dur dans les composants.** Tout passe par les données :

* visuels produit → `images: [...]` dans `data/products.ts` ;
* hero, éditoriaux, bannières de collection, UGC → objet `media` dans `data/site.ts` ;
* logo → `public/images/logo/`.

Pour utiliser vos propres photos, deux possibilités :

1. **Garder les mêmes noms de fichiers** : déposez vos `.jpg` dans `public/images/products/`
   et `public/images/lifestyle/` en écrasant les fichiers existants. Aucun code à modifier.
2. **Changer les chemins** : éditez `images` dans `data/products.ts` et `media` dans
   `data/site.ts`. Pour des URL externes (CDN), ajoutez le domaine dans
   `next.config.mjs` → `images.remotePatterns`.

Formats recommandés :

| Usage | Ratio | Dimensions conseillées |
|---|---|---|
| Produit | 3:4 | 900 × 1200 |
| Hero desktop | 16:9 | 2400 × 1350 |
| Hero mobile | 3:4 | 1080 × 1440 |
| Éditorial | 3:2 / 4:5 | 1800 × 1200 |
| Bannière collection | ~3:1 | 1800 × 620 |
| UGC | 4:5 | 900 × 1125 |

### Visuels de démonstration

Les images livrées avec le dépôt sont des **illustrations vectorielles générées**, destinées
à peupler le site tant que la photographie produit n’est pas prête. Elles sont produites par :

```bash
node scripts/generate-placeholder-images.mjs
```

Le script régénère l’ensemble des visuels à partir de `data/products.ts`. Une fois vos vraies
photos en place, ce script peut être supprimé.

### Logo

`public/images/logo/` contient trois fichiers à remplacer par le logo officiel Le Closet :

* `le-closet.svg` — version foncée, utilisée sur les fonds clairs (header) ;
* `le-closet-light.svg` — version claire, utilisée sur les fonds bordeaux / bruns (footer) ;
* `le-closet-mark.svg` — monogramme, utilisé comme favicon (`app/icon.svg`).

---

## Charte

| Couleur | Hex | Usage |
|---|---|---|
| Bordeaux profond | `#530E0E` | CTA, prix, newsletter |
| Bois riche | `#30150E` | Typographie, footer |
| Rose cachemire | `#F3A0AA` | Accents |
| Sable soyeux | `#F8E5D7` | Fonds d’images, blocs |
| Brun | `#6B4E3A` | Texte secondaire |
| Crème | `#FDF9F5` | Fond principal |

Typographie : **Inter** (sans-serif, interface et produits) et **Cormorant Garamond**
(serif éditorial, titres). Les polices sont chargées depuis Google Fonts via une balise
`<link>` dans `app/layout.tsx` — ce choix permet à `npm run build` de fonctionner sans accès
réseau. Pour passer à `next/font/google`, remplacez ce bloc et renseignez les variables
`--font-inter` / `--font-cormorant` dans `styles/globals.css`.

Le motif léopard est une texture CSS (`.leopard` dans `styles/globals.css`), utilisée
ponctuellement comme accent éditorial.

---

## Politique de prix

Tous les manteaux sont vendus **50,00 €**. Le champ `compareAtPrice` porte le prix conseillé
d’origine, affiché barré à côté du prix Le Closet, avec le pourcentage de remise.

Comme le prix de vente est unique, le filtre « Prix » de la page collection porte sur la
**valeur d’origine** (jusqu’à 99 €, 100–149 €, 150 € et +), ce qui permet de filtrer par
niveau de gamme. Les tris « prix croissant / décroissant » utilisent la même valeur comme
critère de départage.

---

## Ce qui reste à brancher

Le site est un front-end complet ; les intégrations commerciales restent à connecter :

* **Paiement / checkout** — le bouton « Passer commande » n’appelle aucun tunnel de paiement
  (à brancher : Stripe, Shopify, PayPal…) ;
* **Compte client** — le formulaire de `/compte` n’est pas relié à une authentification ;
* **Newsletter** — renseigner `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` ;
* **Avis clients** — les notes affichées proviennent des données de démonstration
  (`rating`, `reviewCount`) et doivent être remplacées par de vrais avis avant mise en ligne ;
* **UGC** — la section « Vu sur les girls » contient des emplacements réservés, à remplir avec
  de vraies photos clientes ;
* **Mentions légales / CGV** — les trames fournies doivent être complétées (immatriculation,
  hébergeur, médiateur de la consommation) et validées juridiquement avant ouverture
  commerciale.

Le panier et la wishlist sont enregistrés dans le `localStorage` du navigateur : ils survivent
au rechargement mais ne sont pas synchronisés entre appareils.

---

## Déploiement

Le projet est un site Next.js standard, déployable tel quel sur Vercel, Netlify, Cloudflare
Pages ou tout hébergeur Node :

```bash
npm run build
npm run start
```

Pensez à définir `NEXT_PUBLIC_SITE_URL` sur le domaine de production pour que le sitemap,
les URL canoniques et les données structurées pointent au bon endroit.
