import type { Link } from '@/lib/types';

/** A row of plain links with a separator between them: `a · b · c` or `a / b / c`. */
export default function Links({
  links,
  sep = '·',
  className = 'link-row',
  label,
}: {
  links: Link[];
  sep?: '·' | '/';
  className?: string;
  label?: string;
}) {
  if (links.length === 0) return null;
  return (
    <p className={className} aria-label={label}>
      {links.map((l, i) => (
        <span key={`${l.href}-${l.label}`}>
          {i > 0 && (
            <span className="sep" aria-hidden="true">
              {` ${sep} `}
            </span>
          )}
          <a href={l.href}>{l.label}</a>
        </span>
      ))}
    </p>
  );
}
