'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';
import { LeopardRule } from '@/components/ui/Leopard';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Sans endpoint configuré (NEXT_PUBLIC_NEWSLETTER_ENDPOINT), on confirme
    // localement : brancher ici Klaviyo, Brevo, Mailchimp…
    if (!site.newsletterEndpoint) {
      setStatus('done');
      return;
    }
    try {
      const res = await fetch(site.newsletterEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-burgundy text-ivory" aria-labelledby="newsletter-title">
      {/* Encadrement léopard : la signature de la maison ferme la page */}
      <LeopardRule id="rule-newsletter" />

      <div className="container-site py-20 text-center lg:py-28">
        <p className="text-2xs uppercase tracking-signature text-pink">Studio Neige Paris</p>

        <h2
          id="newsletter-title"
          className="mx-auto mt-6 max-w-3xl font-display text-4xl font-light leading-[1.08] text-ivory sm:text-5xl lg:text-6xl"
        >
          Bienvenue dans le studio ♡
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ivory/80">
          Inscris-toi pour découvrir les nouveautés, les pièces les plus convoitées et les
          prochaines éditions.
        </p>

        {status === 'done' ? (
          <p className="mx-auto mt-10 max-w-md border border-ivory/30 px-6 py-5 text-sm text-ivory">
            Merci ♡ Votre inscription est bien enregistrée.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Votre adresse e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="flex-1 border border-ivory/30 bg-transparent px-4 py-4 text-sm text-ivory placeholder:text-ivory/50 focus:border-ivory focus:outline-none"
            />
            <button type="submit" disabled={status === 'loading'} className="btn-light">
              {status === 'loading' ? 'Envoi…' : 'S’inscrire'}
            </button>
          </form>
        )}

        {status === 'error' ? (
          <p role="alert" className="mt-4 text-xs text-pink">
            Une erreur est survenue. Merci de réessayer.
          </p>
        ) : null}

        <p className="mx-auto mt-6 max-w-md text-2xs leading-relaxed text-ivory/55">
          En vous inscrivant, vous acceptez de recevoir nos e-mails. Désinscription en un clic.
        </p>
      </div>
    </section>
  );
}
