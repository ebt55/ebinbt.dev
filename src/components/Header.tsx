import Link from 'next/link';

import { getWriting } from '@/lib/content';
import { site } from '@/data/site';

/**
 * Site header — METR pattern: wordmark left, minimal nav right, hairline
 * bottom border, sticky with a translucent paper backdrop. No client React:
 * the mobile menu is a CSS-only <details>, the theme button is wired by the
 * inline script in the root layout, and the active nav link is marked by a
 * two-line inline script after hydration-free parse.
 */
export default async function Header() {
  const writing = await getWriting();
  const showWriting = writing.length >= 2;

  const nav: { href: string; label: string; external?: boolean }[] = [
    { href: '/work/', label: 'Work' },
    { href: '/now/', label: 'Now' },
    ...(showWriting ? [{ href: '/writing/', label: 'Writing' }] : []),
    { href: site.resumePath, label: 'Resume', external: true },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 font-semibold text-ink"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 rounded-[3px] bg-feature"
          />
          <span className="truncate text-[1rem] font-semibold tracking-[-0.01em]">
            {site.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener"
                data-nav="ext"
                className="text-small font-medium text-body transition-colors hover:text-ink"
              >
                {item.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                data-nav
                className="text-small font-medium text-body transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
              >
                {item.label}
              </Link>
            )
          )}
          <span aria-hidden="true" className="h-5 w-px bg-hairline" />
          <ThemeButton />
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-feature px-4 py-2 text-small font-medium text-on-feature transition-colors hover:bg-feature-hover"
          >
            Email
          </a>
        </nav>

        {/* Mobile: theme button + CSS-only menu */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeButton />
          <details className="group relative">
            <summary
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-ink transition-colors hover:bg-sunken [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                className="group-open:hidden"
              >
                <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="hidden group-open:block"
              >
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </summary>
            <nav
              aria-label="Primary"
              className="absolute right-0 top-full mt-2 w-48 rounded-card border border-hairline bg-surface p-2 shadow-sm"
            >
              {nav.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="block rounded-lg px-3 py-2.5 text-small font-medium text-body hover:bg-sunken hover:text-ink"
                  >
                    {item.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-small font-medium text-body hover:bg-sunken hover:text-ink aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block rounded-full bg-feature px-3 py-2.5 text-center text-small font-medium text-on-feature"
              >
                Email
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

/**
 * The theme toggle. A plain button: the no-flash script in the layout sets
 * the initial state, an inline listener flips `.dark` on <html>. No React
 * hydration involved.
 */
function ThemeButton() {
  return (
    <button
      type="button"
      data-theme-toggle
      aria-label="Toggle dark mode"
      aria-pressed="false"
      className="flex h-10 w-10 items-center justify-center rounded-full text-body transition-colors hover:bg-sunken hover:text-ink"
    >
      {/* sun — shown in light mode */}
      <svg
        aria-hidden="true"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        className="dark:hidden"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
      </svg>
      {/* moon — shown in dark mode */}
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden dark:block"
      >
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
