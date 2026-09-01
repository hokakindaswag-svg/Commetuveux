import type { MetadataRoute } from 'next';
import { allProducts } from '@/lib/catalog';
import { collections } from '@/data/collections';
import { site } from '@/data/site';

const staticRoutes = [
  '',
  '/faq',
  '/livraison',
  '/retours',
  '/guide-des-tailles',
  '/contact',
  '/notre-histoire',
  '/mentions-legales',
  '/cgv',
  '/politique-de-confidentialite',
  '/politique-de-retours',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.5,
    })),
    ...collections.map((c) => ({
      url: `${site.url}/collections/${c.handle}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...allProducts.map((p) => ({
      url: `${site.url}/products/${p.slug}`,
      lastModified: new Date(p.addedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
