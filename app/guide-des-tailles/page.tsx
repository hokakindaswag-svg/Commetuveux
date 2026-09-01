import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { SizeGuideTable } from '@/components/product/SizeGuide';

export const metadata: Metadata = {
  title: 'Guide des tailles',
  description:
    'Le guide des tailles Le Closet : correspondances FR, mesures poitrine, taille et hanches pour bien choisir son manteau.',
};

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader
        title="Guide des tailles"
        intro="Nos manteaux se portent sur une maille. En cas d’hésitation entre deux tailles, prenez la plus grande."
      />
      <div className="container-site py-14 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <SizeGuideTable />

          <section className="mt-14" aria-labelledby="measure-title">
            <h2 id="measure-title" className="font-serif text-2xl text-wood">
              Comment se mesurer
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-brown">
              <li>
                <span className="text-wood">Poitrine :</span> mesurez horizontalement à l’endroit
                le plus fort, bras le long du corps.
              </li>
              <li>
                <span className="text-wood">Taille :</span> mesurez au creux naturel de la taille,
                sans serrer le mètre ruban.
              </li>
              <li>
                <span className="text-wood">Hanches :</span> mesurez à l’endroit le plus fort,
                pieds joints.
              </li>
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-brown">
              Une question sur une coupe en particulier ?{' '}
              <Link href="/contact" className="link-underline text-wood">
                Écrivez-nous
              </Link>
              , nous répondons sous 24 à 48 h ouvrées.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
