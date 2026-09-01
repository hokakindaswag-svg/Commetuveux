import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Le Closet.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Mentions légales" intro="Informations légales relatives au site Le Closet." />
      <Prose>
        <h2>Éditeur du site</h2>
        <p>
          Le Closet. Les informations d’immatriculation (raison sociale, forme juridique,
          capital, RCS, SIRET, TVA intracommunautaire, adresse du siège et directeur de la
          publication) doivent être complétées ici avant la mise en ligne commerciale du site.
        </p>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <h2>Hébergement</h2>
        <p>
          Le nom, l’adresse et le téléphone de l’hébergeur du site doivent être renseignés ici.
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus du site (textes, visuels, marques, logos) est protégé.
          Toute reproduction sans autorisation écrite préalable est interdite.
        </p>
        <h2>Médiation de la consommation</h2>
        <p>
          Conformément à la réglementation française, les coordonnées du médiateur de la
          consommation compétent doivent être indiquées ici.
        </p>
      </Prose>
    </>
  );
}
