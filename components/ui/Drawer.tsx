'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { CloseIcon } from './Icons';

/**
 * Tiroir latéral accessible : fermeture Échap, clic sur le fond,
 * focus piégé à l'intérieur du panneau.
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  labelledBy = 'drawer-title',
  widthClass = 'w-full max-w-[440px]',
}: {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  labelledBy?: string;
  widthClass?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      {/* Fond cliquable : purement visuel, la fermeture accessible passe
          par le bouton « Fermer » et la touche Échap. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-fade-in bg-wood/40"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`absolute inset-y-0 ${side === 'right' ? 'right-0' : 'left-0'} ${widthClass}
          flex flex-col bg-cream shadow-2xl outline-none
          ${side === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
      >
        <header className="flex items-center justify-between border-b border-wood/10 px-5 py-4 sm:px-6">
          <h2 id={labelledBy} className="text-xs uppercase tracking-widest text-wood">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="-mr-2 p-2 text-wood transition-opacity hover:opacity-60"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </header>

        <div className="hide-scrollbar flex-1 overflow-y-auto overscroll-contain">{children}</div>

        {footer ? <div className="border-t border-wood/10 bg-cream">{footer}</div> : null}
      </div>
    </div>
  );
}
