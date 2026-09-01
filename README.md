# Le Closet — boutique en ligne

Prototype e-commerce complet pour **Le Closet**, marque française de **manteaux femme** à prix
accessibles (prix de référence : **50 €**). Site en français, prix en euros, marché France.

Stack : **React 19 + Vite + React Router**, CSS maison (aucun framework UI), zéro dépendance lourde.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production dans dist/
npm run preview
```

---

## Ce qui est implémenté

| Parcours | Détail |
|---|---|
| Accueil | Barre d'annonce rotative, hero campagne, bandeau valeur, « Les manteaux du moment », bandeau éditorial, carrousel best-sellers, duo d'univers, extrait catalogue, engagements, UGC, newsletter, footer |
| Collection | `/manteaux`, sous-collections, `/nouveautes`, `/best-sellers`, `/promotions` |
| Filtres | Disponibilité, taille, couleur, prix, style — cumulables, avec compteurs, **synchronisés dans l'URL** (partageables) |
| Tri | Nouveautés, meilleures ventes, prix croissant, prix décroissant |
| Fiche produit | Galerie (mosaïque desktop / slider mobile), sélection de taille, stock, accordéons, guide des tailles, produits associés, JSON-LD `Product` |
| Panier | Tiroir latéral, quantités, suppression, sous-total, jauge livraison offerte, recommandations, persistance `localStorage` |
| Wishlist | Cœur sur chaque carte + page dédiée, persistance `localStorage` |
| Recherche | Overlay plein écran avec suggestions et résultats en direct |
| Pages info | FAQ, livraison, retours, guide des tailles, contact, notre histoire, mentions légales, CGV, confidentialité |

Responsive intentionnel : mobile 320–767 (grille 2 colonnes, filtres et tri en tiroir, CTA collant),
tablette 768–1023 (3 colonnes), desktop 1024+ (4 colonnes, sidebar de filtres), large 1440+.

---

## Ajouter un manteau

Tout le catalogue vit dans **`src/data/products.js`**. Copiez un objet, changez les valeurs :

```js
{
  id: 'manteau-camille',        // sert d'URL : /produit/manteau-camille
  name: 'Manteau Camille',
  price: 50,                    // en euros
  compareAtPrice: null,         // ancien prix RÉEL uniquement, sinon null
  collection: 'longs',          // longs | courts | doudounes | fourrure | tendance
  silhouette: 'long',           // long | court | doudoune | fourrure | teddy | cuir
  style: 'Ceinturé',            // valeur de STYLES (src/data/taxonomy.js)
  color: 'Camel',               // clé de COLORS (src/data/taxonomy.js)
  sizes: ['XS', 'S', 'M', 'L'],
  images: [],                   // voir ci-dessous
  badge: 'NOUVEAU',             // 'NOUVEAU' | 'BEST-SELLER' | null
  description: '…',
  material: '…',
  featured: true, bestseller: false, newArrival: true,
  inventory: 25,                // 0 = épuisé, ≤5 = « derniers exemplaires »
  rating: 4.7, reviews: 84,
}
```

Aucun composant n'est à modifier. Les collections, tailles, couleurs, styles et tris se règlent
dans `src/data/taxonomy.js` ; les textes du site dans `src/data/site.js` ; les pages d'information
dans `src/data/pages.js`.

## Ajouter les photos

Déposez les fichiers dans `public/produits/` puis renseignez le tableau `images` :

```js
images: [
  '/produits/manteau-camille-1.jpg',   // visuel principal (ratio 3/4)
  '/produits/manteau-camille-2.jpg',   // visuel de survol
  '/produits/manteau-camille-3.jpg',   // lifestyle
  '/produits/manteau-camille-4.jpg',   // détail
]
```

Une seule photo suffit : le système gère les tableaux partiels. Ratio recommandé **3/4**.

Pour les visuels éditoriaux (hero, bandeau, univers), renseignez `hero.image`,
`editorial.image` et `duo[].image` dans `src/data/site.js`.

**Tant qu'aucune photo n'est fournie**, le site affiche un visuel vectoriel dessiné
(`src/components/CoatImage.jsx` et `src/components/Scene.jsx`) aux bonnes proportions et dans la
couleur du produit : pas d'image cassée, pas de décalage de mise en page, grille toujours régulière.

---

## Points d'attention avant mise en ligne

- **Photographie** — aucune photo produit ou lifestyle n'a été fournie ; les visuels actuels sont
  des substituts vectoriels à remplacer.
- **Contenu légal** — `Mentions légales`, `CGV` et `Politique de confidentialité` contiennent des
  passages entre crochets à compléter avec vos informations réelles.
- **Paiement** — la page `/commande` est un récapitulatif ; le module de paiement reste à brancher.
- **Compte client** — le formulaire `/compte` n'est pas connecté.
- **Newsletter** — le formulaire n'envoie encore rien ; à relier à votre outil d'emailing.
- Le seuil de livraison offerte affiché dans le panier (80 €) est un paramètre à confirmer :
  `FREE_SHIPPING` dans `src/components/CartDrawer.jsx`.

## Structure

```
public/brand/        logo Le Closet (détouré, deux cadrages)
src/data/            products.js · taxonomy.js · site.js · pages.js  ← tout le contenu
src/components/      en-tête, tiroirs, cartes, filtres, sections éditoriales, visuels
src/pages/           accueil, collection, produit, wishlist, compte, commande, infos, 404
src/lib/             format prix (fr-FR), logique catalogue (filtres/tri/facettes), SEO
src/styles/          global.css — palette, typographie, tous les composants
```

Palette : bordeaux `#530E0E`, rose cachemire `#F3A0AA`, bois `#30150E`, sable `#F8E5D7`,
brun `#6B4E3A`, fond crème `#FBF7F2`. Typographie : Inter (interface) + Cormorant Garamond
(titres éditoriaux).
