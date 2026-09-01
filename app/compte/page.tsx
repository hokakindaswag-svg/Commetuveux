import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Mon compte',
  description: 'Connectez-vous à votre compte Le Closet pour suivre vos commandes.',
};

export default function AccountPage() {
  return (
    <>
      <PageHeader
        title="Mon compte"
        intro="Connectez-vous pour suivre vos commandes et retrouver vos favoris."
      />
      <div className="container-site py-14 lg:py-20">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <section className="border border-wood/15 p-8" aria-labelledby="login-title">
            <h2 id="login-title" className="text-2xs uppercase tracking-widest text-wood">
              Se connecter
            </h2>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="login-email" className="eyebrow">
                  E-mail
                </label>
                <input id="login-email" type="email" autoComplete="email" className="field mt-2" />
              </div>
              <div>
                <label htmlFor="login-password" className="eyebrow">
                  Mot de passe
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  className="field mt-2"
                />
              </div>
              <button type="button" className="btn-primary w-full">
                Se connecter
              </button>
            </form>
            <p className="mt-5 text-2xs leading-relaxed text-brown">
              L’espace client n’est pas encore connecté sur cette version de démonstration.
            </p>
          </section>

          <section className="border border-wood/15 bg-cream-warm p-8" aria-labelledby="new-title">
            <h2 id="new-title" className="text-2xs uppercase tracking-widest text-wood">
              Nouvelle cliente ?
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-brown">
              Créez un compte pour suivre vos commandes, accélérer vos prochains achats et
              retrouver votre wishlist sur tous vos appareils.
            </p>
            <Link href="/collections/manteaux" className="btn-secondary mt-8 w-full">
              Découvrir les manteaux
            </Link>
            <Link
              href="/wishlist"
              className="mt-4 block text-center text-2xs uppercase tracking-wider text-wood underline underline-offset-4"
            >
              Voir ma wishlist
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
