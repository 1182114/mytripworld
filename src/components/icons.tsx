type P = { className?: string };

export const WhatsAppIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-3.52 4.4c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.76 2.67 4.25 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.8-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47Z" />
  </svg>
);

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
export const MailIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
export const CheckIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const PlaneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M10.5 13.5 3 11l1.5-1.5 7 1 4.6-4.6a2 2 0 0 1 2.9 2.9L14.4 13.4l1 7L14 22l-2.5-7.5-3 3V20l-1.5 1.5L6 18l-3.5-1L4 15.5h2.5l4-2Z" />
  </svg>
);
export const CarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M4 16V11l2-5h12l2 5v5M4 16h16M4 16v2m16-2v2M4 11h16" />
    <circle cx="7.5" cy="13.5" r="1" />
    <circle cx="16.5" cy="13.5" r="1" />
  </svg>
);
export const UsersIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
  </svg>
);
export const ShieldIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.2 10" />
  </svg>
);
export const StarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z" />
  </svg>
);
export const CalendarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
export const GlobeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
  </svg>
);
export const TrophyIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v4M8.5 20.5h7M9.5 18h5" />
  </svg>
);
export const UserIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);
export const BuildingIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M4 20V5h9v15M13 10h7v10M3 20h18M7.5 8.5h2M7.5 12h2M7.5 15.5h2M16 13.5h1.5M16 16.5h1.5" />
  </svg>
);
export const SearchIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const FacebookIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.500V21h3Z" />
  </svg>
);
export const QuoteIcon = ({ className }: P) => (
  <svg viewBox="0 0 32 24" fill="currentColor" aria-hidden className={className}>
    <path d="M0 24V14.4C0 6.4 4.3 1.3 12 0l1.3 3.3C9.3 4.6 7.3 7.3 7 10.7h6V24H0Zm18 0V14.4C18 6.4 22.3 1.3 30 0l1.3 3.3c-4 1.3-6 4-6.3 7.4h6V24H18Z" />
  </svg>
);
export const HomeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M4 11.5 12 5l8 6.5M6 10v9h12v-9M10 19v-5h4v5" />
  </svg>
);
export const ChevronIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const BedIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M3 18v-7a2 2 0 0 1 2-2h9a4 4 0 0 1 4 4v5M3 15h18v3M7 9V7h5v2M3 18v1.5M21 18v1.5" />
  </svg>
);
export const CameraIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);
