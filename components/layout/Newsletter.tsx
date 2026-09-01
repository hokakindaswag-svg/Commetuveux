'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';

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
    <section className="bg-burgundy text-cream" aria-labelledby="newsletter-title">
      <div className="container-site py-20 text-center lg:py-28">
        <p className="text-2xs uppercase tracking-brand text-blush">Le Closet</p>
        <h2
          id="newsletter-title"
          className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl"
        >
          Bienvenue dans Le Closet ♡
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/80">
          Inscris-toi pour découvrir les nouveautés et les offres avant tout le monde.
        </p>

        {status === 'done' ? (
          <p className="mx-auto mt-10 max-w-md border border-cream/30 px-6 py-5 text-sm text-cream">
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
              className="flex-1 border border-cream/30 bg-transparent px-4 py-4 text-sm text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn bg-cream px-8 py-4 text-burgundy hover:bg-blush hover:text-wood"
            >
              {status === 'loading' ? 'Envoi…' : 'Je m’inscris'}
            </button>
          </form>
        )}

        {status === 'error' ? (
          <p role="alert" className="mt-4 text-xs text-blush">
            Une erreur est survenue. Merci de réessayer.
          </p>
        ) : null}

        <p className="mx-auto mt-6 max-w-md text-2xs leading-relaxed text-cream/60">
          En vous inscrivant, vous acceptez de recevoir nos e-mails. Désinscription en un clic.
        </p>
      </div>
    </section>
  );
}
