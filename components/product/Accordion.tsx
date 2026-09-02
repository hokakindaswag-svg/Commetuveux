'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from '@/components/ui/Icons';

export function Accordion({
  items,
  defaultOpen,
}: {
  items: { title: string; content: ReactNode }[];
  defaultOpen?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className="border-t border-chocolate/10">
      {items.map((item) => (
        <div key={item.title} className="border-b border-chocolate/10">
          <h3>
            <button
              type="button"
              onClick={() => setOpen((o) => (o === item.title ? null : item.title))}
              aria-expanded={open === item.title}
              className="flex w-full items-center justify-between py-5 text-left text-2xs uppercase tracking-widest text-chocolate"
            >
              {item.title}
              <ChevronDown
                width={16}
                height={16}
                className={`transition-transform duration-300 ${open === item.title ? 'rotate-180' : ''}`}
              />
            </button>
          </h3>
          {open === item.title ? (
            <div className="animate-slide-down pb-6 text-sm leading-relaxed text-brown">
              {item.content}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
