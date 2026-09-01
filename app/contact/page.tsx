import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l’équipe Le Closet pour toute question sur votre commande.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Contact" intro="Une question ? Nous répondons sous 24 à 48 h ouvrées." />
      <Prose>
        <h2>Nous écrire</h2>
        <p>
          Pour toute question sur une commande, une taille ou un retour :{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Précisez votre numéro de commande,
          cela nous fait gagner un aller-retour.
        </p>
        <h2>Réseaux</h2>
        <p>
          Instagram :{" "}
          <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noreferrer noopener">
            @{site.instagram}
          </a>
          {" · "}TikTok :{" "}
          <a href={`https://tiktok.com/@${site.tiktok}`} target="_blank" rel="noreferrer noopener">
            @{site.tiktok}
          </a>
        </p>
        <h2>Avant d’écrire</h2>
        <p>
          Un grand nombre de questions trouvent leur réponse dans la{" "}
          <Link href="/faq">FAQ</Link>, la page <Link href="/livraison">Livraison</Link> ou la
          page <Link href="/retours">Retours</Link>.
        </p>
      </Prose>
    </>
  );
}
