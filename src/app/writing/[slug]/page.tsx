import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getWriting } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/format';

/** Write-ups hosted on the site: writing items whose `url` is null. */
async function getHosted() {
  return (await getWriting()).filter((w) => w.data.url === null);
}

export async function generateStaticParams() {
  return (await getHosted()).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getHosted()).find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: item.data.title,
    description: item.data.summary,
    alternates: { canonical: `/writing/${slug}/` },
    openGraph: {
      type: 'article',
      title: item.data.title,
      description: item.data.summary,
    },
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = (await getHosted()).find((w) => w.slug === slug);
  if (!item) notFound();
  const d = item.data;

  return (
    <>
      {/* ---------------------------------------------------------- page head */}
      <div className="wrap pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <Link href="/writing/" className="hover:text-accent">Writing</Link>
          </p>
          <h1 className="mt-3 text-h1">{d.title}</h1>
          <p className="mt-5 text-meta uppercase tracking-[0.07em] text-quiet">
            {d.venue}
            <span aria-hidden="true"> · </span>
            <time dateTime={isoDate(d.date)}>{formatDate(d.date)}</time>
            <span aria-hidden="true"> · </span>
            {d.kind}
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- body */}
      <article className="wrap pt-12">
        <div className="max-w-[72ch]">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.html }} />
        </div>
      </article>

      {/* --------------------------------------------------------------- links */}
      {d.links.length > 0 && (
        <section aria-label="Links" className="wrap pt-12">
          <div className="max-w-[72ch] border-t border-hairline pt-8">
            <h2 className="eyebrow">Links</h2>
            <ul className="mt-4 space-y-2 text-small">
              {d.links.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    rel="noopener"
                    className="font-medium text-accent hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- pager */}
      <nav aria-label="More writing" className="wrap pt-16">
        <p className="max-w-[72ch] border-t border-hairline pt-8">
          <Link href="/writing/" className="arrow-link">
            All writing <span aria-hidden="true">→</span>
          </Link>
        </p>
      </nav>
    </>
  );
}
