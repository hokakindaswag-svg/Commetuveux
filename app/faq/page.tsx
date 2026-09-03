import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Accordion } from '@/components/product/Accordion';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions fréquentes sur les pièces Studio Neige Paris : tailles, livraison, retours, paiement.',
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="FAQ"
        intro="Les réponses aux questions qu’on nous pose le plus souvent."
      />
      <div className="container-site py-14 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <Accordion
            defaultOpen="Comment tenez-vous ces prix ?"
            items={[
              {
                title: 'Comment tenez-vous ces prix ?',
                content: (
                  <p>
                    Studio Neige Paris ne vend qu’une seule catégorie : le manteau. Cette spécialisation
                    nous permet de commander en volume sur un nombre limité de modèles. Les capes
                    et les vestes à capuche sont à {site.corePrice} €, les autres pièces à 50 €.
                    Le prix barré affiché correspond au prix pratiqué précédemment sur la pièce.
                  </p>
                ),
              },
              {
                title: 'Comment choisir ma taille ?',
                content: (
                  <p>
                    Chaque fiche produit contient le guide des tailles complet. Nos manteaux se
                    portent sur une maille : si vous hésitez entre deux tailles, prenez la plus
                    grande.{' '}
                    <Link href="/guide-des-tailles">Voir le guide des tailles</Link>.
                  </p>
                ),
              },
              {
                title: 'Quels sont les délais de livraison ?',
                content: (
                  <p>
                    Les commandes sont expédiées depuis la France sous 48 h ouvrées, avec un
                    numéro de suivi envoyé par e-mail.{' '}
                    <Link href="/livraison">Voir les modalités de livraison</Link>.
                  </p>
                ),
              },
              {
                title: 'Puis-je retourner un manteau ?',
                content: (
                  <p>
                    Oui, vous disposez de 14 jours après réception pour nous retourner un article
                    non porté dans son emballage d’origine.{' '}
                    <Link href="/retours">Voir la procédure de retour</Link>.
                  </p>
                ),
              },
              {
                title: 'Quels moyens de paiement acceptez-vous ?',
                content: (
                  <p>
                    Carte bancaire, Apple Pay et PayPal. Toutes les transactions sont chiffrées.
                  </p>
                ),
              },
              {
                title: 'Comment vous contacter ?',
                content: (
                  <p>
                    Écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ou via la{' '}
                    <Link href="/contact">page contact</Link>. Nous répondons sous 24 à 48 h
                    ouvrées.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
