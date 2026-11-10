/**
 * Light/dark toggle. Plain markup: the inline script in layout.tsx wires the
 * click and keeps aria-pressed in sync. Hidden until that script runs, so a
 * no-JS visitor never sees a dead button (the theme then follows the system).
 */
export default function ThemeToggle() {
  return (
    <button type="button" className="theme-toggle" data-theme-toggle aria-pressed="false">
      <span className="sr-only">Dark theme</span>
      {/* moon, shown in the light theme */}
      <svg className="icon-moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {/* sun, shown in the dark theme */}
      <svg className="icon-sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
