import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Retours',
  description: 'Procédure de retour des manteaux Le Closet : délais, conditions et remboursement.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Retours" intro="14 jours pour changer d’avis." />
      <Prose>
        <h2>Délai</h2>
        <p>
          Vous disposez de 14 jours à compter de la réception de votre commande pour nous
          signaler votre souhait de retour, puis de 14 jours supplémentaires pour nous
          renvoyer l’article.
        </p>
        <h2>Conditions</h2>
        <ul>
          <li>Article non porté, non lavé, non modifié.</li>
          <li>Étiquettes d’origine encore attachées.</li>
          <li>Article renvoyé dans son emballage d’origine.</li>
        </ul>
        <h2>Procédure</h2>
        <ul>
          <li>Écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> avec votre numéro de commande.</li>
          <li>Nous vous transmettons l’adresse de retour et la marche à suivre.</li>
          <li>Déposez le colis chez le transporteur indiqué.</li>
        </ul>
        <h2>Remboursement</h2>
        <p>
          Le remboursement est effectué sur le moyen de paiement d’origine sous 14 jours après
          réception et vérification de l’article. Les frais de retour restent à votre charge,
          sauf article défectueux ou erreur de notre part.
        </p>
        <p>
          <Link href="/politique-de-retours">Lire la politique de retours complète</Link>.
        </p>
      </Prose>
    </>
  );
}
