import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchase } from '@/components/product/ProductPurchase';
import { Accordion } from '@/components/product/Accordion';
import { SizeGuideTable } from '@/components/product/SizeGuide';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { Trust } from '@/components/home/Trust';
import { allProducts, getProduct, isInStock, relatedProducts } from '@/lib/catalog';
import { site } from '@/data/site';
import { formatPrice } from '@/lib/format';

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Produit introuvable' };

  return {
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} | Studio Neige Paris`,
      description: product.description,
      // URL absolue : une URL relative écraserait le sous-dossier /Commetuveux
      // du déploiement GitHub Pages (voir app/layout.tsx).
      images: [{ url: `${site.url}${product.images[0]}`, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i}`),
    sku: product.id,
    brand: { '@type': 'Brand', name: site.name },
    color: product.color.name,
    material: product.material,
    offers: {
      '@type': 'Offer',
      url: `${site.url}/products/${product.slug}`,
      price: product.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: isInStock(product)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-site pb-24 pt-6 lg:pb-28">
        <nav aria-label="Fil d’Ariane" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-2xs uppercase tracking-wider text-brown">
            <li>
              <Link href="/" className="hover:text-chocolate">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/collections/manteaux" className="hover:text-chocolate">
                Manteaux
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-chocolate">{product.name}</li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <ProductGallery images={product.images} name={product.name} />

          <div className="mt-8 lg:mt-0">
            <ProductPurchase product={product} />

            <div className="mt-10">
              <Accordion
                defaultOpen="Description"
                items={[
                  {
                    title: 'Description',
                    content: (
                      <div>
                        <p>{product.description}</p>
                        <ul className="mt-4 space-y-1.5">
                          {product.details.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span aria-hidden="true">—</span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  },
                  {
                    title: 'Composition & entretien',
                    content: (
                      <div className="space-y-3">
                        <p>
                          <span className="text-chocolate">Matière principale :</span> {product.material}
                        </p>
                        <p>{product.composition}</p>
                        <p>{product.care}</p>
                      </div>
                    ),
                  },
                  { title: 'Guide des tailles', content: <SizeGuideTable /> },
                  {
                    title: 'Livraison & retours',
                    content: (
                      <div className="space-y-3">
                        <p>
                          Expédition depuis la France sous 48 h ouvrées, avec numéro de suivi.
                          Livraison offerte dès {site.freeShippingThreshold} € d’achat.
                        </p>
                        <p>
                          Vous avez 14 jours après réception pour nous retourner un article non
                          porté, dans son emballage d’origine.{' '}
                          <Link href="/retours" className="link-underline text-chocolate">
                            Voir la procédure de retour
                          </Link>
                          .
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <Trust />

      {related.length ? (
        <section className="container-site py-16 lg:py-24" aria-labelledby="related-title">
          <SectionHeading
            eyebrow="Compléter la silhouette"
            title="Vous pourriez aussi aimer"
            href="/collections/manteaux"
          />
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </>
  );
}
