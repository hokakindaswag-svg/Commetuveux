'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { promo, promoEndLabel, promoEndsAt } from '@/data/promo';
import { AnnouncementBar } from './AnnouncementBar';

/**
 * Bandeau du haut de page.
 *
 * Pendant une opération commerciale, la bannière promo remplace la barre
 * d'annonce plutôt que de s'empiler dessus — deux bandeaux superposés
 * repoussent le contenu et se neutralisent l'un l'autre.
 *
 * L'expiration est vérifiée dans le navigateur, pas à la construction du
 * site : l'offre s'arrête donc toute seule à la date prévue, même si
 * personne ne redéploie. L'état de départ est une constante (`false`), pas
 * un calcul de date — sinon le rendu serveur et le rendu client
 * différeraient et l'hydratation casserait. Le compte à rebours n'apparaît
 * lui aussi qu'après hydratation, pour la même raison.
 */
export function TopBar() {
  const [expired, setExpired] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!promo.active) return;

    const tick = () => {
      const remaining = promoEndsAt - Date.now();
      setExpired(remaining <= 0);
      setDaysLeft(remaining > 0 ? Math.ceil(remaining / 86_400_000) : null);
    };

    tick();
    // Une visite peut rester ouverte plusieurs heures : on repasse le
    // calcul régulièrement plutôt qu'une seule fois au chargement.
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!promo.active || expired) return <AnnouncementBar />;

  return (
    <div className="bg-pink text-chocolate">
      <div className="container-site flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center">
        <span className="text-2xs font-medium uppercase tracking-signature text-burgundy">
          {promo.label}
        </span>

        <span aria-hidden="true" className="hidden text-burgundy/50 sm:inline">
          ·
        </span>

        <span className="text-2xs uppercase tracking-wider">{promo.message}</span>

        <span aria-hidden="true" className="hidden text-burgundy/50 sm:inline">
          ·
        </span>

        <span className="text-2xs uppercase tracking-wider">Livraison offerte</span>

        <Link
          href={promo.href}
          className="text-2xs uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-burgundy"
        >
          {promo.cta}
        </Link>

        <span className="w-full text-[10px] uppercase tracking-wider text-chocolate/70">
          {daysLeft === null
            ? `Jusqu’au ${promoEndLabel}`
            : daysLeft > 1
              ? `Plus que ${daysLeft} jours — jusqu’au ${promoEndLabel}`
              : `Dernier jour — jusqu’au ${promoEndLabel}`}
        </span>
      </div>
    </div>
  );
}
