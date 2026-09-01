import { Link } from 'react-router-dom';
import Scene from './Scene';
import { SITE } from '../data/site';

export function EditorialBanner() {
  const e = SITE.editorial;
  return (
    <section className="editorial" aria-labelledby="edito-title">
      <div className="editorial__media">
        <Scene tone="wood" seed={1} src={e.image} alt="Silhouette en manteau long — Le Closet" className="ph" />
        <div className="editorial__veil" />
        <div className="editorial__content">
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,.78)' }}>{e.eyebrow}</p>
          <h2 className="editorial__title" id="edito-title">{e.title}</h2>
          <p className="editorial__text">{e.text}</p>
          <Link to={e.cta.to} className="btn btn--light btn--lg">{e.cta.label}</Link>
        </div>
      </div>
    </section>
  );
}

export function EditorialDuo() {
  return (
    <section className="section" aria-label="Nos univers">
      <div className="wrap">
        <div className="duo">
          {SITE.duo.map((cell, i) => (
            <Link className="duo__cell" to={cell.to} key={cell.title}>
              <Scene tone={cell.tone} seed={i + 2} src={cell.image} alt={cell.title} className="ph" />
              <div className="duo__overlay">
                <h3 className="duo__title">{cell.title}</h3>
                <p style={{ margin: '6px 0 0', fontSize: 13, opacity: .9 }}>{cell.text}</p>
                <span className="duo__link">Découvrir</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
