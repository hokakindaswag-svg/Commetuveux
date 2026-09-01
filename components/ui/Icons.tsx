import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
};

export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.5s-7.5-4.6-7.5-9.8A4.2 4.2 0 0 1 12 8.2a4.2 4.2 0 0 1 7.5 2.5c0 5.2-7.5 9.8-7.5 9.8Z" />
  </svg>
);

export const BagIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 7h14l-1 13H6L5 7Z" />
    <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const FilterIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M6 12h12M10 18h4" />
  </svg>
);

export const SortIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17.5" cy="18" r="1.8" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="10" width="14" height="10" rx="1.5" />
    <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
  </svg>
);

export const ReturnIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12a8 8 0 1 0 2.6-5.9" />
    <path d="M4 4v4h4" />
  </svg>
);

export const StarIcon = ({ half, ...p }: IconProps & { half?: boolean }) => (
  <svg {...base} {...p} viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
    {half ? (
      <>
        <path
          d="M12 3.5 14.4 9l6 .5-4.6 4 1.4 5.9L12 16.3 6.8 19.4l1.4-5.9-4.6-4 6-.5L12 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.3}
        />
        <path d="M12 3.5V16.3L6.8 19.4l1.4-5.9-4.6-4 6-.5L12 3.5Z" />
      </>
    ) : (
      <path d="M12 3.5 14.4 9l6 .5-4.6 4 1.4 5.9L12 16.3 6.8 19.4l1.4-5.9-4.6-4 6-.5L12 3.5Z" />
    )}
  </svg>
);

export const StarOutline = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3.5 14.4 9l6 .5-4.6 4 1.4 5.9L12 16.3 6.8 19.4l1.4-5.9-4.6-4 6-.5L12 3.5Z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
  </svg>
);

export const TiktokIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14.5 3.5v10.8a3.4 3.4 0 1 1-3.4-3.4c.3 0 .6 0 .9.1" />
    <path d="M14.5 3.5c.4 2.2 2 3.8 4.2 4.1" />
  </svg>
);
