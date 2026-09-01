import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { SITE } from '../data/site';
import Scene from '../components/Scene';
import ProductGrid from '../components/ProductGrid';
import Carousel from '../components/Carousel';
import { EditorialBanner, EditorialDuo } from '../components/Editorial';
import TrustSection from '../components/TrustSection';
import UgcSection from '../components/UgcSection';
import Newsletter from '../components/Newsletter';
import useSeo from '../lib/useSeo';

const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 8);
const catalogue = PRODUCTS.slice(0, 12);

export default function Home() {
  useSeo({
    title: 'Le Closet — Manteaux Femme Tendance à 50€',
    description:
      'Découvrez Le Closet, la destination française pour des manteaux femme tendance à prix accessibles. Découvrez nos nouveaux modèles.',
    path: '/',
  });

  const h = SITE.hero;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <Scene tone="wood" seed={0} src={h.image} alt="Campagne Le Closet — manteau long porté en ville" className="ph" />
          <div className="hero__veil" />
        </div>
        <div className="hero__content">
          <div className="hero__inner">
            <p className="eyebrow hero__eyebrow">{h.eyebrow}</p>
            <h1 className="hero__title" id="hero-title">{h.title}</h1>
            <p className="hero__sub">{h.text}</p>
            <div className="hero__cta">
              <Link to={h.cta.to} className="btn btn--light btn--lg">{h.cta.label}</Link>
              <Link to={h.ctaSecondary.to} className="btn btn--outline-light btn--lg">{h.ctaSecondary.label}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="valuebar" aria-label="Nos avantages">
        <div className="valuebar__inner">
          {SITE.valuebar.map((v) => (
            <div className="valuebar__cell" key={v.title}>
              <p className="valuebar__t">{v.title}</p>
              <p className="valuebar__d">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 className="section-head__title" id="featured-title">Les manteaux du moment</h2>
              <p className="section-head__sub">Les pièces qu’on veut porter toute la saison.</p>
            </div>
            <Link className="section-head__link" to="/manteaux">Tout voir</Link>
          </div>
          <ProductGrid products={featured} priorityCount={4} />
        </div>
      </section>

      <EditorialBanner />

      <Carousel
        title="Les plus aimés ♡"
        subtitle="Les manteaux qui partent le plus vite."
        products={bestsellers}
        link={{ label: 'Voir les best-sellers', to: '/best-sellers' }}
      />

      <EditorialDuo />

      <section className="section" aria-labelledby="cat-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 className="section-head__title" id="cat-title">Toute la collection</h2>
              <p className="section-head__sub">
                {PRODUCTS.length} manteaux, une seule obsession.
              </p>
            </div>
            <Link className="section-head__link" to="/manteaux">Voir les {PRODUCTS.length} pièces</Link>
          </div>
          <ProductGrid products={catalogue} priorityCount={0} />
          <div className="loadmore">
            <Link to="/manteaux" className="btn btn--ghost btn--lg">Voir tous les manteaux</Link>
          </div>
        </div>
      </section>

      <TrustSection />
      <UgcSection />
      <Newsletter />
    </>
  );
}
