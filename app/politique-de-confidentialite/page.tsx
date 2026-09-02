import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles sur Studio Neige Paris.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Politique de confidentialité" intro="Comment nous traitons vos données personnelles." />
      <Prose>
        <h2>Données collectées</h2>
        <p>
          Nous collectons les données strictement nécessaires au traitement de votre commande :
          nom, adresse e-mail, adresse de livraison et de facturation, et le détail de la
          commande. Le paiement est traité par notre prestataire : aucune donnée bancaire
          n’est stockée sur nos serveurs.
        </p>
        <h2>Finalités</h2>
        <ul>
          <li>Traiter et livrer vos commandes.</li>
          <li>Répondre à vos demandes au service client.</li>
          <li>Vous envoyer notre newsletter, si vous y avez consenti.</li>
        </ul>
        <h2>Conservation</h2>
        <p>
          Les données de commande sont conservées pour la durée légale applicable en matière
          comptable. Les données newsletter sont conservées jusqu’à votre désinscription.
        </p>
        <h2>Stockage local</h2>
        <p>
          Votre panier et votre sélection sont enregistrés dans le stockage local de votre
          navigateur. Ces informations ne quittent pas votre appareil et ne nous sont pas
          transmises.
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de
          portabilité. Pour l’exercer, écrivez à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également introduire
          une réclamation auprès de la CNIL.
        </p>
      </Prose>
    </>
  );
}
