import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Requis par `output: 'export'` (build GitHub Pages) : cette route n'a pas
// de paramètres dynamiques, elle peut donc être générée une fois pour toutes.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/compte'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
