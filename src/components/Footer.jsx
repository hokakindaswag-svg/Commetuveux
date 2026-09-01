import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          <img src="/brand/le-closet-logo.png" alt="Le Closet — Paris, France" width="1000" height="632" loading="lazy" />
          <p className="footer__tag">Des manteaux qu’on remarque. Des prix qu’on aime.</p>
        </div>

        {SITE.footer.map((col) => (
          <nav className="footer__col" key={col.title} aria-label={col.title}>
            <h3>{col.title}</h3>
            {col.links.map((l) =>
              l.external ? (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.to}>{l.label}</Link>
              )
            )}
          </nav>
        ))}
      </div>

      <div className="wrap">
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Le Closet — Paris, France</span>
          <div className="footer__pay" aria-label="Moyens de paiement acceptés">
            <span>Visa</span><span>Mastercard</span><span>CB</span><span>PayPal</span><span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
