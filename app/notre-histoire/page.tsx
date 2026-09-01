import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/layout/PageHeader';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Notre histoire',
  description: 'L’histoire de Le Closet, la marque française spécialiste du manteau femme à 50 €.',
};

export default function Page() {
  return (
    <>
      <PageHeader title="Notre histoire" intro="Un vestiaire, une obsession : le manteau." />
      <Prose>
        <h2>Une seule catégorie</h2>
        <p>
          Le Closet est né d’un constat simple : le manteau est la pièce qu’on porte le plus
          et celle qu’on choisit le plus mal. Trop cher pour oser, trop générique pour marquer.
          Nous avons décidé de ne faire que ça.
        </p>
        <h2>Un seul prix</h2>
        <p>
          Toute la collection est à {site.corePrice} €. Pas de soldes surprises, pas de calcul
          à faire : le prix barré indique la valeur d’origine du modèle, le prix Le Closet est
          toujours le même.
        </p>
        <h2>Un vestiaire qui bouge</h2>
        <p>
          De nouveaux modèles arrivent chaque semaine : manteaux longs, teddy, fausse fourrure,
          doudounes, trench et similicuir. Le closet d’une fille stylée, dédié aux manteaux.
        </p>
        <p>
          <Link href="/collections/manteaux">Découvrir la collection</Link>.
        </p>
      </Prose>
    </>
  );
}
