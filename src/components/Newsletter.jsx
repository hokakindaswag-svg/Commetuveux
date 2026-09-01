import { useState } from 'react';
import { SITE } from '../data/site';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section className="news" aria-labelledby="news-title">
      <div className="news__inner">
        <p className="eyebrow">{SITE.newsletter.eyebrow}</p>
        <h2 className="news__title" id="news-title">{SITE.newsletter.title}</h2>
        <p className="news__text">{SITE.newsletter.text}</p>

        {done ? (
          <p className="news__ok" role="status">Merci ♡ Vérifie ta boîte mail pour confirmer ton inscription.</p>
        ) : (
          <form className="news__form" onSubmit={submit} noValidate>
            <label className="sr-only" htmlFor="news-email">Adresse e-mail</label>
            <input
              id="news-email"
              className="news__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
            />
            <button type="submit" className="btn btn--light btn--lg">{SITE.newsletter.cta}</button>
          </form>
        )}

        <p className="news__note">Désinscription possible à tout moment.</p>
      </div>
    </section>
  );
}
