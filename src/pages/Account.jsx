import useSeo from '../lib/useSeo';

export default function Account() {
  useSeo({ title: 'Mon compte — Le Closet' });
  return (
    <div className="wrap wrap--narrow page">
      <h1 className="page__title">Mon compte</h1>
      <p className="page__lead">
        Connectez-vous pour suivre vos commandes et retrouver votre wishlist sur tous vos appareils.
      </p>

      <form className="account" onSubmit={(e) => e.preventDefault()}>
        <label className="field">
          <span>Adresse e-mail</span>
          <input type="email" placeholder="vous@exemple.fr" autoComplete="email" required />
        </label>
        <label className="field">
          <span>Mot de passe</span>
          <input type="password" autoComplete="current-password" required />
        </label>
        <button type="submit" className="btn btn--burgundy btn--block btn--lg">Se connecter</button>
        <p style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 16 }}>
          Espace client en cours de préparation — la connexion sera activée à l’ouverture de la boutique.
        </p>
      </form>
    </div>
  );
}
