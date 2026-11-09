export default function BrandMark({ className = "calvoro-brand-mark" }) {
  return (
    <span className={className} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="2.6" width="16" height="18.8" rx="3.6" />
        <rect x="7.2" y="5.5" width="9.6" height="3.8" rx="1" />
        <path d="M8.2 13h.01M12 13h.01M15.8 13h.01M8.2 16.4h.01M12 16.4h.01M15.8 16.4h.01" />
      </svg>
    </span>
  );
}
