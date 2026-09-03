import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Notre histoire',
  description:
    'Studio Neige Paris, la maison française dédiée au vestiaire d’hiver : manteaux et vestes femme à partir de 20 €.',
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Notre histoire"
        intro="Un vestiaire, une obsession : la pièce qu’on porte par-dessus tout le reste."
      />
      <Prose>
        <h2>Le vestiaire d’hiver</h2>
        <p>
          Studio Neige Paris est né d’un constat simple : le manteau est la pièce qu’on porte le
          plus, et celle qu’on choisit le plus mal. Trop cher pour oser, trop générique pour
          marquer. Nous avons décidé de ne faire que ça — manteaux, vestes, doudounes et
          fausse fourrure, rien d’autre.
        </p>

        <h2>Une spécialisation assumée</h2>
        <p>
          Ne travailler qu’une seule catégorie change tout : on commande en volume sur un nombre
          limité de modèles, on suit chaque coupe de près, et on peut proposer la collection à
          partir de {site.corePrice} €. Le prix barré indique le prix précédemment pratiqué sur
          la pièce.
        </p>

        <h2>Une allure, pas une tendance</h2>
        <p>
          Bordeaux profond, chocolat, ivoire, une touche de rose et le léopard en signature :
          notre vestiaire est pensé pour durer au-delà d’une saison. Des silhouettes féminines,
          des coupes qui enveloppent, des matières douces — et de nouvelles pièces chaque semaine.
        </p>

        <p>
          <Link href="/collections/manteaux">Découvrir la collection</Link>.
        </p>
      </Prose>
    </>
  );
}
