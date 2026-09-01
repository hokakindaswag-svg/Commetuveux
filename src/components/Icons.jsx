const base = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true, focusable: false,
};

export const IconSearch = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const IconUser = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.2-4 4.1-6 7.5-6s6.3 2 7.5 6" /></svg>
);
export const IconHeart = (p) => (
  <svg {...base} {...p}><path d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z" /></svg>
);
export const IconBag = (p) => (
  <svg {...base} {...p}><path d="M6 8h12l1 12H5Z" /><path d="M9 10V6.8a3 3 0 0 1 6 0V10" /></svg>
);
export const IconMenu = (p) => (
  <svg {...base} {...p}><path d="M3 7h18M3 12h18M3 17h18" /></svg>
);
export const IconClose = (p) => (
  <svg {...base} {...p}><path d="m6 6 12 12M18 6 6 18" /></svg>
);
export const IconChevronDown = (p) => (
  <svg {...base} width="14" height="14" {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconChevronRight = (p) => (
  <svg {...base} width="14" height="14" {...p}><path d="m9 6 6 6-6 6" /></svg>
);
export const IconChevronLeft = (p) => (
  <svg {...base} width="14" height="14" {...p}><path d="m15 6-6 6 6 6" /></svg>
);
export const IconMinus = (p) => (<svg {...base} {...p}><path d="M5 12h14" /></svg>);
export const IconPlus = (p) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const IconTruck = (p) => (
  <svg {...base} {...p}><path d="M2 7h11v9H2zM13 10h4.4l2.6 3v3h-7z" /><circle cx="6.5" cy="18" r="1.6" /><circle cx="16.5" cy="18" r="1.6" /></svg>
);
export const IconLock = (p) => (
  <svg {...base} {...p}><rect x="4.5" y="10" width="15" height="9.5" rx="1.4" /><path d="M8 10V7.5a4 4 0 0 1 8 0V10" /></svg>
);
export const IconReturn = (p) => (
  <svg {...base} {...p}><path d="M4 11a8 8 0 1 1 2.3 5.7" /><path d="M4 5.5V11h5.5" /></svg>
);
export const IconSliders = (p) => (
  <svg {...base} width="16" height="16" {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
);
export const IconSort = (p) => (
  <svg {...base} width="16" height="16" {...p}><path d="M4 7h14M6 12h10M9 17h4" /></svg>
);
export const IconCheck = (p) => (<svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7" /></svg>);
