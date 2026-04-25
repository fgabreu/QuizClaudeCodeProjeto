export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="80" height="80" rx="20" fill="var(--color-primary)" />
      <path
        d="M22 30L36 40L22 50"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 27C48 27 57 27.5 57 35C57 41 50 42 50 48"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="54.5" r="3" fill="white" />
    </svg>
  );
}
