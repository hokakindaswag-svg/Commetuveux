'use client';

import { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';

const rows = [
  { size: 'XS', fr: '34', bust: '82 – 86', waist: '62 – 66', hips: '88 – 92' },
  { size: 'S', fr: '36', bust: '86 – 90', waist: '66 – 70', hips: '92 – 96' },
  { size: 'M', fr: '38', bust: '90 – 94', waist: '70 – 74', hips: '96 – 100' },
  { size: 'L', fr: '40', bust: '94 – 99', waist: '74 – 79', hips: '100 – 105' },
  { size: 'XL', fr: '42', bust: '99 – 104', waist: '79 – 84', hips: '105 – 110' },
];

export function SizeGuideTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[440px] border-collapse text-left text-sm">
        <caption className="sr-only">Guide des tailles Studio Neige Paris, mesures en centimètres</caption>
        <thead>
          <tr className="border-b border-chocolate/20 text-2xs uppercase tracking-wider text-chocolate">
            <th scope="col" className="py-3 pr-4 font-medium">Taille</th>
            <th scope="col" className="py-3 pr-4 font-medium">FR</th>
            <th scope="col" className="py-3 pr-4 font-medium">Poitrine</th>
            <th scope="col" className="py-3 pr-4 font-medium">Taille</th>
            <th scope="col" className="py-3 font-medium">Hanches</th>
          </tr>
        </thead>
        <tbody className="text-brown">
          {rows.map((row) => (
            <tr key={row.size} className="border-b border-chocolate/10">
              <th scope="row" className="py-3 pr-4 font-medium text-chocolate">{row.size}</th>
              <td className="py-3 pr-4">{row.fr}</td>
              <td className="py-3 pr-4">{row.bust} cm</td>
              <td className="py-3 pr-4">{row.waist} cm</td>
              <td className="py-3">{row.hips} cm</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs leading-relaxed text-brown">
        Mesures du corps, en centimètres. Nos manteaux sont pensés pour se porter sur une
        maille : si vous hésitez entre deux tailles, prenez la plus grande.
      </p>
    </div>
  );
}

export function SizeGuideButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-2xs uppercase tracking-wider text-chocolate underline underline-offset-4 transition-colors hover:text-burgundy"
      >
        Guide des tailles
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Guide des tailles"
        labelledBy="size-guide-title"
        widthClass="w-full max-w-[560px]"
      >
        <div className="px-5 py-6 sm:px-6">
          <SizeGuideTable />
        </div>
      </Drawer>
    </>
  );
}
