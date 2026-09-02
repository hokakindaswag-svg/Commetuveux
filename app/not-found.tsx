import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="display-title mt-5 text-[34px] sm:text-5xl">
        Cette page a quitté le studio.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-brown">
        La page que vous cherchez n’existe plus ou a changé d’adresse. Nos manteaux, eux, sont
        toujours là.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/collections/manteaux" className="btn-primary">
          Voir tous les manteaux
        </Link>
        <Link href="/" className="btn-secondary">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
