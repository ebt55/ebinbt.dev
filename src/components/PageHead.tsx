import type { ReactNode } from 'react';

/**
 * Standard page head for subpages — the Page.astro pattern: eyebrow, big
 * h1, optional lede, generous top padding.
 */
export default function PageHead({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="wrap pt-16 md:pt-24">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-h1">{title}</h1>
        {lede && (
          <p className="mt-5 max-w-[62ch] text-small text-body md:text-[1.0625rem]">{lede}</p>
        )}
        {children}
      </div>
    </div>
  );
}
