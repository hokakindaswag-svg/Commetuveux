/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Les images produits sont locales (/public/images/...).
    // Pour utiliser un CDN externe, ajoutez son domaine ici.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 160, 240, 320, 420, 560],
  },
};

export default nextConfig;
