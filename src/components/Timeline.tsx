import type { Experience } from '@/lib/content';

/**
 * Experience — hairline-separated roles with period and summary. `compact`
 * drops the highlight bullets (used on the home page; the résumé PDF and
 * /work pages carry the detail).
 */
export default function Timeline({
  roles,
  compact = false,
}: {
  roles: Experience['roles'];
  compact?: boolean;
}) {
  return (
    <div>
      {roles.map((role, i) => (
        <article
          key={role.org}
          className={`${i === 0 ? '' : 'border-t border-hairline'} grid gap-x-10 gap-y-3 py-8 md:grid-cols-[13rem_1fr]`}
        >
          <div>
            <h3 className="text-[1.0625rem] font-semibold text-ink">{role.org}</h3>
            <p className="mt-0.5 text-small text-body">{role.role}</p>
            <p className="mt-1.5 text-meta uppercase tracking-[0.06em] text-quiet">
              {role.period}
              <span aria-hidden="true"> · </span>
              {role.location}
            </p>
          </div>
          <div className="max-w-[62ch]">
            <p className="text-small text-body">{role.summary}</p>
            {!compact && role.highlights.length > 0 && (
              <ul className="mt-4 space-y-3">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-small text-body">
                    <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 flex-none rounded-full bg-hairline-strong" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            {role.links.length > 0 && (
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-meta font-medium">
                {role.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    rel="noopener"
                    className="text-accent hover:underline hover:underline-offset-4"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
