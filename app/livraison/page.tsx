import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Livraison',
  description: 'Modalités de livraison des pièces Studio Neige Paris : délais, tarifs et suivi.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Livraison" intro="Expédition depuis la France, suivi sur chaque commande." />
      <Prose>
        <h2>Délais</h2>
        <p>
          Les commandes passées avant 14 h sont préparées le jour même. Nos colis partent de
          France sous 48 h ouvrées, du lundi au vendredi hors jours fériés.
        </p>
        <h2>Tarifs</h2>
        <ul>
          <li>Livraison offerte sur toutes les commandes, sans minimum d’achat.</li>
          <li>Livraison standard suivie à domicile : 2 à 4 jours ouvrés.</li>
          <li>Point relais : 2 à 5 jours ouvrés.</li>
        </ul>
        <h2>Suivi</h2>
        <p>
          Un numéro de suivi vous est envoyé par e-mail dès l’expédition. Si votre colis
          n’a pas bougé pendant plus de 5 jours ouvrés, écrivez-nous à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>Zones desservies</h2>
        <p>
          Nous livrons actuellement en France métropolitaine. D’autres destinations seront
          ouvertes prochainement.
        </p>
      </Prose>
    </>
  );
}
