/**
 * Préfixe les chemins d'assets publics (/images/...) avec le basePath du
 * déploiement en cours.
 *
 * Pourquoi : next/link gère automatiquement le basePath, mais les chemins
 * passés en dur à next/image (`src="/images/..."`) ou dans les metadata
 * (og:image) n'en bénéficient pas. Sur GitHub Pages, le site est servi sous
 * /<nom-du-dépôt>/ (voir next.config.mjs) ; en local ou sur Vercel/Netlify,
 * NEXT_PUBLIC_BASE_PATH est vide et cette fonction ne change rien.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const assetPath = (path: string) => `${basePath}${path}`;
