// Active en export statique pour GitHub Pages (voir .github/workflows/deploy-pages.yml).
// En local (npm run dev/build) ou sur Vercel/Netlify, cette variable n'est pas définie :
// le site tourne alors normalement, avec l'optimisation d'images de Next.js.
const isGithubPages = process.env.GITHUB_PAGES === 'true';
// Nom du dépôt GitHub : sert de sous-dossier pour les pages de projet
// (https://<utilisateur>.github.io/<depot>/). À adapter si le dépôt est renommé.
const repoName = 'Commetuveux';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages && {
    output: 'export',
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
  env: {
    // Next.js n'ajoute PAS automatiquement basePath aux chemins d'images du
    // dossier /public référencés en dur (contrairement à next/link). On
    // expose donc cette valeur pour que lib/paths.ts puisse la préfixer
    // elle-même. Vide en local et sur Vercel/Netlify (pas de sous-dossier).
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : '',
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
