import Links from '@/components/Links';
import { inline } from '@/lib/markdown';
import type { Entry, WorkSection } from '@/lib/types';

function EntryItem({ entry }: { entry: Entry }) {
  return (
    <li id={entry.slug} className="entry">
      <p className="entry-when">{entry.when}</p>
      <div className="entry-body">
        <h3 className="entry-title">
          <a href={entry.href}>{entry.title}</a>
        </h3>
        {entry.context && <p className="entry-context">{entry.context}</p>}
        <p className="entry-summary" dangerouslySetInnerHTML={{ __html: inline(entry.summary) }} />
        <Links links={entry.links} sep="/" className="entry-links" label={`${entry.title} links`} />
      </div>
    </li>
  );
}

/** A Research or Software list, with lower-priority entries under a "More" disclosure. */
export default function EntryList({ section }: { section: WorkSection }) {
  return (
    <>
      <ul className="entries">
        {section.entries.map((e) => (
          <EntryItem key={e.slug} entry={e} />
        ))}
      </ul>
      {section.more && section.more.length > 0 && (
        <details className="more">
          <summary>More</summary>
          <ul className="entries entries-tight">
            {section.more.map((e) => (
              <EntryItem key={e.slug} entry={e} />
            ))}
          </ul>
        </details>
      )}
    </>
  );
}
