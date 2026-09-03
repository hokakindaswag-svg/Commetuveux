// Active en export statique pour GitHub Pages (voir .github/workflows/deploy-pages.yml).
// En local (npm run dev/build) ou sur Vercel/Netlify, cette variable n'est pas définie :
// le site tourne alors normalement, avec l'optimisation d'images de Next.js.
const isGithubPages = process.env.GITHUB_PAGES === 'true';
// Le site est servi sur son propre nom de domaine (voir /public/CNAME), donc
// à la racine — pas de sous-dossier /Commetuveux à préfixer aux chemins.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages && {
    output: 'export',
  }),
  env: {
    // Historiquement utilisé pour préfixer les chemins d'assets sous un
    // sous-dossier de dépôt GitHub Pages. Vide désormais que le site est
    // servi à la racine de son propre domaine.
    NEXT_PUBLIC_BASE_PATH: '',
  },
  images: {
    // Les images produits sont locales (/public/images/...).
    // Pour utiliser un CDN externe, ajoutez son domaine ici.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 160, 240, 320, 420, 560],
    // L'export statique n'a pas de serveur pour optimiser les images à la volée.
    unoptimized: isGithubPages,
  },
};

export default nextConfig;
