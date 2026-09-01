import { LockIcon, ReturnIcon, TruckIcon } from '@/components/ui/Icons';
import { trustPoints } from '@/data/site';

const icons = {
  truck: TruckIcon,
  lock: LockIcon,
  return: ReturnIcon,
};

export function Trust() {
  return (
    <section className="border-y border-wood/10 bg-cream-warm" aria-label="Nos engagements">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-3 lg:py-16">
        {trustPoints.map((point) => {
          const Icon = icons[point.icon];
          return (
            <div key={point.title} className="text-center">
              <Icon width={26} height={26} className="mx-auto text-burgundy" />
              <h3 className="mt-4 text-2xs uppercase tracking-brand text-wood">{point.title}</h3>
              <p className="mx-auto mt-3 max-w-[26ch] text-xs leading-relaxed text-brown">
                {point.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
