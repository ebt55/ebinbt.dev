import type { ReactNode } from 'react';

/**
 * A page section: eyebrow label, big heading, optional lede — the repeating
 * METR rhythm. Sections breathe: generous top padding, hairline top rule.
 */
export default function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = '',
  headClassName = '',
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  headClassName?: string;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className={className}>
      <div className="wrap pt-16 md:pt-24">
        {(eyebrow || title) && (
          <div className={`max-w-3xl ${headClassName}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2 id={id ? `${id}-heading` : undefined} className="mt-3 text-h2">
                {title}
              </h2>
            )}
            {lede && (
              <p className="mt-4 max-w-[62ch] text-small text-body md:text-[1.0625rem]">
                {lede}
              </p>
            )}
          </div>
        )}
        <div className={eyebrow || title ? 'mt-10 md:mt-12' : ''}>{children}</div>
      </div>
    </section>
  );
}
