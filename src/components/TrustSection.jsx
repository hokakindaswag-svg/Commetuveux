import { SITE } from '../data/site';
import { IconLock, IconReturn, IconTruck } from './Icons';

const ICONS = { truck: IconTruck, lock: IconLock, return: IconReturn };

export default function TrustSection() {
  return (
    <section className="section section--tight" aria-label="Nos engagements">
      <div className="wrap">
        <div className="trust">
          {SITE.trust.map((t) => {
            const Icon = ICONS[t.icon];
            return (
              <div className="trust__cell" key={t.title}>
                <Icon width="24" height="24" />
                <h3 className="trust__t">{t.title}</h3>
                <p className="trust__d">{t.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
