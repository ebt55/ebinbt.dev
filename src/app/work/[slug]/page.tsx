import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import LinkRow from '@/components/LinkRow';
import StackChips from '@/components/StackChips';
import StatusPill from '@/components/StatusPill';
import { getProjects } from '@/lib/content';
import { LANE_LABEL, LANE_RANK } from '@/lib/lanes';

export function generateStaticParams() {
  return getProjects().then((projects) =>
    projects.map((p) => ({ slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.data.title,
    description: project.data.summary,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      type: 'article',
      title: project.data.title,
      description: project.data.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const sorted = [...projects].sort(
    (a, b) =>
      (LANE_RANK[a.data.lane] ?? 9) - (LANE_RANK[b.data.lane] ?? 9) ||
      a.data.order - b.data.order
  );
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = sorted[index];
  const d = project.data;
  const prev = sorted[index - 1];
  const next = sorted[index + 1];

  return (
    <>
      {/* ---------------------------------------------------------- page head */}
      <div className="wrap pt-14 md:pt-20">
        <nav aria-label="Breadcrumb" className="text-meta uppercase tracking-[0.07em] text-quiet">
          <Link href="/work/" className="hover:text-accent">Work</Link>
          <span aria-hidden="true"> / </span>
          <span>{LANE_LABEL[d.lane]}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <h1 className="max-w-[22ch] text-h1">{d.title}</h1>
          <div className="pt-2.5">
            <StatusPill status={d.status} />
          </div>
        </div>

        {d.tagline && (
          <p className="mt-5 max-w-[62ch] text-small text-body md:text-[1.0625rem]">
            {d.tagline}
          </p>
        )}

        <p className="mt-5 text-meta uppercase tracking-[0.07em] text-quiet">
          {d.period}
          <span aria-hidden="true"> · </span>
          {d.kind}
          {d.venue && (
            <>
              <span aria-hidden="true"> · </span>
              {d.venue}
            </>
          )}
        </p>
      </div>

      {/* ------------------------------------------------------------ metrics */}
      {(d.headline || d.metrics.length > 0) && (
        <section aria-label="Measured results" className="wrap pt-12 md:pt-16">
          {d.headline && (
            <div className="card p-6 md:p-8">
              <p className="text-stat font-semibold text-ink tabular-nums">{d.headline.value}</p>
              <p className="mt-3 max-w-[68ch] text-small text-body">{d.headline.label}</p>
            </div>
          )}
          {d.metrics.length > 0 && (
            <div
              className={`grid gap-5 sm:grid-cols-2 ${d.headline ? 'mt-5' : ''}`}
            >
              {d.metrics.map((m) => (
                <div key={m.label} className="card p-6">
                  <p className="text-[1.375rem] font-semibold tracking-[-0.01em] text-ink tabular-nums">
                    {m.value}
                  </p>
                  <p className="mt-2 text-small leading-relaxed text-body">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ------------------------------------------------- stack & link facts */}
      <div className="wrap pt-12">
        <div className="grid gap-8 border-t border-hairline pt-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="eyebrow">Stack</h2>
            <div className="mt-4">
              <StackChips items={d.stack} max={8} />
            </div>
          </div>
          <div>
            <h2 className="eyebrow">Links</h2>
            <div className="mt-4">
              <LinkRow links={d.links} label={`${d.title} links`} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- body */}
      <div className="wrap pt-12">
        <div className="max-w-[68ch]">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.html }} />
        </div>
      </div>

      {/* -------------------------------------------------------------- status */}
      {d.honestStatus && (
        <div className="wrap pt-10">
          <aside
            aria-label="Status"
            className="max-w-[68ch] rounded-card border-l-[3px] border-accent bg-sunken p-6"
          >
            <h2 className="eyebrow">Status</h2>
            <p className="mt-3 text-small leading-relaxed text-body">{d.honestStatus}</p>
          </aside>
        </div>
      )}

      {/* --------------------------------------------------------------- pager */}
      <nav aria-label="More projects" className="wrap pt-16">
        <div className="grid gap-5 border-t border-hairline pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}/`}
              className="group rounded-card p-4 -ml-4 hover:bg-sunken"
            >
              <span className="text-meta uppercase tracking-[0.07em] text-quiet">← Previous</span>
              <span className="mt-1.5 block text-[1.0625rem] font-semibold text-ink group-hover:text-accent">
                {prev.data.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}/`}
              className="group rounded-card p-4 -mr-4 sm:text-right hover:bg-sunken"
            >
              <span className="text-meta uppercase tracking-[0.07em] text-quiet">Next →</span>
              <span className="mt-1.5 block text-[1.0625rem] font-semibold text-ink group-hover:text-accent">
                {next.data.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
