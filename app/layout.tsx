import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { Header } from '@/components/layout/Header';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchDrawer } from '@/components/layout/SearchDrawer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Le Closet — Manteaux Femme Tendance à 50€',
    template: '%s | Le Closet',
  },
  description:
    'Découvrez Le Closet, la destination française pour des manteaux femme tendance à prix accessibles. Manteaux longs, doudounes, fausse fourrure et teddy à 50 €.',
  keywords: [
    'manteau femme',
    'manteau 50 euros',
    'manteau long femme',
    'doudoune femme',
    'fausse fourrure',
    'manteau tendance',
    'Le Closet',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: site.name,
    title: 'Le Closet — Manteaux Femme Tendance à 50€',
    description:
      'La destination française pour des manteaux femme tendance à prix accessibles. Tout à 50 €.',
    images: [{ url: '/images/lifestyle/og-image.jpg', width: 1200, height: 630, alt: 'Le Closet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Closet — Manteaux Femme Tendance à 50€',
    description: 'Des manteaux qu’on remarque. Des prix qu’on aime.',
    images: ['/images/lifestyle/og-image.jpg'],
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
  name: site.name,
  url: site.url,
  description:
    'Le Closet — manteaux femme tendance à 50 €, livrés en France.',
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
          <AnnouncementBar />
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
