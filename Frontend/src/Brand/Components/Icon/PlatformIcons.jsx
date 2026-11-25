export const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ig-brand-grad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#FEDA75" />
        <stop offset="30%" stopColor="#FA7E1E" />
        <stop offset="55%" stopColor="#D62976" />
        <stop offset="80%" stopColor="#962FBF" />
        <stop offset="100%" stopColor="#4F5BD5" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-brand-grad)" />
    <circle
      cx="12"
      cy="12"
      r="4.2"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
    />
    <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
  </svg>
);

export const YouTubeIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <rect x="1.5" y="5" width="21" height="14" rx="4.2" fill="#FF0000" />
    <path d="M10 9.2v5.6l5-2.8z" fill="#fff" />
  </svg>
);

export const PLATFORM_ICONS = {
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};