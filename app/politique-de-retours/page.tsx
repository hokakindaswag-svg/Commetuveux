import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Politique de retours',
  description: 'Politique de retours détaillée de Le Closet.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Politique de retours" intro="Le détail de nos conditions de retour et de remboursement." />
      <Prose>
        <h2>Droit de rétractation</h2>
        <p>
          Vous disposez de 14 jours à compter de la réception pour exercer votre droit de
          rétractation, sans avoir à motiver votre décision.
        </p>
        <h2>Articles acceptés</h2>
        <ul>
          <li>Non portés, non lavés, non modifiés.</li>
          <li>Étiquettes d’origine attachées.</li>
          <li>Emballage d’origine.</li>
        </ul>
        <h2>Frais de retour</h2>
        <p>
          Les frais de retour sont à la charge de la cliente, sauf article défectueux, erreur
          d’expédition ou non-conformité, auquel cas ils sont intégralement pris en charge.
        </p>
        <h2>Remboursement</h2>
        <p>
          Le remboursement intervient sous 14 jours après réception et contrôle de l’article,
          sur le moyen de paiement utilisé lors de la commande.
        </p>
        <h2>Échanges</h2>
        <p>
          Pour changer de taille, le plus rapide est de retourner l’article et de passer une
          nouvelle commande, afin de ne pas perdre la taille souhaitée.
        </p>
        <p>
          Une question ? <Link href="/contact">Contactez-nous</Link>.
        </p>
      </Prose>
    </>
  );
}
