import type { WritingItem } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/format';

/**
 * One writing item — METR's hairline-divided editorial row: meta line
 * (venue · date · kind), linked title, summary.
 */
export default function WritingRow({ item, first = false }: { item: WritingItem; first?: boolean }) {
  const d = item.data;
  return (
    <article className={`${first ? '' : 'border-t border-hairline'} py-6 md:py-7`}>
      <p className="text-meta uppercase tracking-[0.07em] text-quiet">
        {d.venue}
        <span aria-hidden="true"> · </span>
        <time dateTime={isoDate(d.date)}>{formatDate(d.date)}</time>
        <span aria-hidden="true"> · </span>
        {d.kind}
      </p>
      <h3 className="mt-2 text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em]">
        <a
          href={d.url}
          rel="noopener"
          className="hover:text-accent"
        >
          {d.title}
          <span aria-hidden="true"> ↗</span>
        </a>
      </h3>
      <p className="mt-2 max-w-[72ch] text-small text-body">{d.summary}</p>
    </article>
  );
}
