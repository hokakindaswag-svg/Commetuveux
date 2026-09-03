import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';
import { formatPrice } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'Conditions générales de vente du site Studio Neige Paris.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Conditions générales de vente" intro="Les règles qui encadrent vos achats sur Studio Neige Paris." />
      <Prose>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions régissent les ventes de manteaux réalisées sur le site
          Studio Neige Paris. Toute commande implique leur acceptation sans réserve.
        </p>
        <h2>2. Prix</h2>
        <p>
          Les prix sont indiqués en euros toutes taxes comprises. Le prix de vente de chaque
          pièce figure sur sa fiche produit, à partir de {formatPrice(site.corePrice)} ; le prix barré
          correspond au prix précédemment pratiqué sur cette même pièce. Les frais de livraison
          sont indiqués avant validation de la commande.
        </p>
        <h2>3. Commande</h2>
        <p>
          La vente est réputée conclue à la validation du paiement. Un e-mail de confirmation
          récapitulant la commande est envoyé à l’adresse indiquée.
        </p>
        <h2>4. Paiement</h2>
        <p>
          Le paiement s’effectue par carte bancaire, Apple Pay ou PayPal, via une connexion
          chiffrée. Aucune donnée bancaire n’est conservée par Studio Neige Paris.
        </p>
        <h2>5. Livraison</h2>
        <p>
          Les modalités et délais sont détaillés sur la page{" "}
          <Link href="/livraison">Livraison</Link>.
        </p>
        <h2>6. Droit de rétractation</h2>
        <p>
          Conformément au Code de la consommation, vous disposez de 14 jours pour exercer votre
          droit de rétractation. Les modalités figurent sur la page{" "}
          <Link href="/retours">Retours</Link>.
        </p>
        <h2>7. Garanties</h2>
        <p>
          Les articles bénéficient de la garantie légale de conformité et de la garantie contre
          les vices cachés dans les conditions prévues par la loi.
        </p>
        <h2>8. Données personnelles</h2>
        <p>
          Le traitement des données est décrit dans la{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
        <h2>9. Droit applicable</h2>
        <p>
          Les présentes conditions sont soumises au droit français. Ce document constitue une
          trame à faire valider par un conseil juridique avant la mise en ligne commerciale.
        </p>
      </Prose>
    </>
  );
}
