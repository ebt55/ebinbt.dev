import Link from 'next/link';

import type { Project } from '@/lib/content';
import LinkRow from './LinkRow';
import StackChips from './StackChips';
import StatusPill from './StatusPill';

/**
 * Project card — METR's white outline card: title + status, tagline, the one
 * headline number, stack chips, link row. Hover deepens the hairline border.
 */
export default function ProjectCard({
  project,
  headingLevel = 'h4',
}: {
  project: Project;
  headingLevel?: 'h3' | 'h4';
}) {
  const d = project.data;
  const Heading = headingLevel;
  return (
    <article className="card flex flex-col gap-4 p-6 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <Heading className="text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em]">
          <Link href={`/work/${project.slug}/`} title={d.summary} className="hover:text-accent">
            {d.title}
          </Link>
        </Heading>
        <StatusPill status={d.status} />
      </div>

      <p className="text-small text-body">{d.tagline}</p>

      {d.headline && (
        <p className="mt-1">
          <span className="text-[1.5rem] font-semibold tracking-[-0.01em] text-ink tabular-nums">
            {d.headline.value}
          </span>
          <span className="mt-1 block max-w-[44ch] text-meta text-quiet">{d.headline.label}</span>
        </p>
      )}

      <div className="mt-auto flex flex-col gap-3.5 pt-2">
        <StackChips items={d.stack} />
        <LinkRow links={d.links} includeOther={false} />
      </div>
    </article>
  );
}
