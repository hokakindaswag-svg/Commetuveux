import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { Header } from '@/components/layout/Header';
import { TopBar } from '@/components/layout/PromoBanner';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchDrawer } from '@/components/layout/SearchDrawer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Studio Neige Paris — Manteaux & vestes femme, le vestiaire d’hiver',
    template: '%s | Studio Neige Paris',
  },
  description:
    'Studio Neige Paris, le vestiaire d’hiver : manteaux longs, vestes, doudounes et fausse fourrure pour femme, à partir de 20 €. Livraison en France.',
  keywords: [
    'manteau femme',
    'veste femme hiver',
    'manteau long femme',
    'doudoune femme',
    'fausse fourrure',
    'vestiaire d’hiver',
    'Studio Neige Paris',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: site.fullName,
    title: 'Studio Neige Paris — Le vestiaire d’hiver',
    description:
      'Des manteaux désirables, pensés pour les journées froides. À partir de 20 €, livrés en France.',
    // URL absolue plutôt que résolue via metadataBase : une URL relative
    // commençant par "/" écraserait le sous-dossier /Commetuveux du
    // déploiement GitHub Pages (règles de résolution d'URL standard).
    images: [{ url: `${site.url}/images/lifestyle/og-image.jpg`, width: 1200, height: 630, alt: 'Studio Neige Paris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Neige Paris — Le vestiaire d’hiver',
    description: 'Des manteaux désirables, pensés pour les journées froides.',
    images: [`${site.url}/images/lifestyle/og-image.jpg`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#530E0E',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: site.fullName,
  url: site.url,
  description:
    'Studio Neige Paris — manteaux et vestes femme, le vestiaire d’hiver, à partir de 20 €, livrés en France.',
  areaServed: 'FR',
  currenciesAccepted: 'EUR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Les polices sont chargées via une balise <link> plutôt que par
          next/font afin qu'un `npm run build` fonctionne sans accès réseau.
          Pour passer à next/font/google, remplacez ce bloc et renseignez
          --font-inter / --font-cormorant dans styles/globals.css.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;500&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <StoreProvider>
          <a href="#contenu" className="skip-link">
            Aller au contenu
          </a>
          <TopBar />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchDrawer />
          <MobileMenu />
        </StoreProvider>
      </body>
    </html>
  );
}
