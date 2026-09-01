import { useRef } from 'react';
import ProductCard from './ProductCard';
import { IconChevronLeft, IconChevronRight } from './Icons';

export default function Carousel({ products, title, subtitle, link }) {
  const track = useRef(null);

  const scrollBy = (dir) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="section" aria-labelledby={`car-${title}`}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 className="section-head__title" id={`car-${title}`}>{title}</h2>
            {subtitle && <p className="section-head__sub">{subtitle}</p>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {link && <a className="section-head__link" href={link.to}>{link.label}</a>}
            <div className="carousel__nav">
              <button type="button" className="carousel__btn" onClick={() => scrollBy(-1)} aria-label="Précédent">
                <IconChevronLeft />
              </button>
              <button type="button" className="carousel__btn" onClick={() => scrollBy(1)} aria-label="Suivant">
                <IconChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="carousel">
          <div className="carousel__track" ref={track}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
