import { LockIcon, ReturnIcon, SnowIcon, TruckIcon } from '@/components/ui/Icons';
import { trustPoints } from '@/data/site';

const icons = {
  truck: TruckIcon,
  lock: LockIcon,
  return: ReturnIcon,
  snow: SnowIcon,
};

export function Trust() {
  return (
    <section className="border-y border-chocolate/10 bg-cream-warm" aria-label="Nos engagements">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {trustPoints.map((point) => {
          const Icon = icons[point.icon];
          return (
            <div key={point.title} className="text-center">
              <Icon width={24} height={24} className="mx-auto text-burgundy" />
              <h3 className="mt-5 text-2xs uppercase tracking-brand text-chocolate">
                {point.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[28ch] text-xs leading-relaxed text-brown">
                {point.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
