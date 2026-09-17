import Link from 'next/link';

import FeatureCard from '@/components/FeatureCard';
import NowBlock from '@/components/NowBlock';
import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';
import Timeline from '@/components/Timeline';
import WritingRow from '@/components/WritingRow';
import { site } from '@/data/site';
import { getExperience, getNow, getProjects, getWriting } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/format';
import { LANES, WORK_INTRO } from '@/lib/lanes';

/* Spelled out so the work heading never goes stale when a project is added. */
const COUNT_WORDS = [
  'No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
];

export default async function Home() {
  const projects = await getProjects();

  /* The two hero cards: METR puts its two flagship reports straight into the
     hero, right of the mission line. The top two proof links pick them. */
  const flagshipSlugs: string[] = [site.proof[0]?.href, site.proof[1]?.href]
    .filter((h) => typeof h === 'string')
    .map((h) => h!.split('/').filter(Boolean).pop() as string);
  const flagships = flagshipSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const flagshipSet = new Set(flagships.map((p) => p.slug));

  /* The work grid shows everything except what the hero already carries. */
  const featured = projects.filter((p) => p.data.featured && !flagshipSet.has(p.slug));
  const featuredCount = COUNT_WORDS[featured.length] ?? String(featured.length);

  const nowEntry = await getNow();

  const allWriting = await getWriting();
  const writing = allWriting.slice(0, 3);

  const experience = await getExperience();
  const projectTitles = new Set(projects.map((p) => p.data.title.toLowerCase()));
  const contributions = experience.open_source.filter(
    (o) => !projectTitles.has(o.project.toLowerCase())
  );

  return (
    <>
      {/* ---------------------------------------------------------------- hero
          METR's exact pattern: name and one mission sentence on the left,
          the two flagship cards stacked on the right. Nothing else. */}
      <section aria-labelledby="hero-name">
        <div className="wrap grid gap-12 pb-6 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:pt-8">
            <p className="eyebrow">{site.eyebrow}</p>
            <h1 id="hero-name" className="mt-4 text-hero">
              {site.name}
            </h1>
            <p className="mt-6 text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.012em] text-ink">
              {site.headline}
            </p>
            <p className="mt-4 max-w-[48ch] text-small leading-relaxed text-body">
              {site.intro}
            </p>
            <p className="mt-6 text-meta uppercase tracking-[0.07em] text-quiet">
              {site.location}
              <span aria-hidden="true"> · </span>
              Remote
              <span aria-hidden="true"> · </span>
              {site.timezone}
            </p>
            <p className="mt-8 flex flex-wrap gap-3">
              <Link href="#work" className="btn-solid">
                See the work
                <span aria-hidden="true">→</span>
              </Link>
              <a href={`mailto:${site.email}`} className="btn-outline">
                Email
              </a>
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-6">
              {flagships.map((project) => (
                <FeatureCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- work */}
      <Section
        id="work"
        eyebrow="Work"
        title={`${featuredCount} projects, with their numbers`}
        lede={WORK_INTRO}
      >
        {LANES.map((lane) => {
          const items = featured.filter((p) => p.data.lane === lane.id);
          if (items.length === 0) return null;
          return (
            <div key={lane.id} className="[&:not(:first-child)]:mt-16">
              <h3 className="text-h3">{lane.title}</h3>
              <p className="mt-2 max-w-[64ch] text-small text-body">{lane.intro}</p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
              {lane.id === 'oss' && contributions.length > 0 && (
                <div className="mt-10 border-t border-hairline pt-6">
                  <h4 className="eyebrow">Merged upstream</h4>
                  <ul className="mt-4 max-w-[68ch]">
                    {contributions.map((c) => (
                      <li
                        key={c.url}
                        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline py-3 text-small first:border-t-0 first:pt-0"
                      >
                        <a
                          href={c.url}
                          rel="noopener"
                          className="whitespace-nowrap font-medium text-accent hover:underline hover:underline-offset-4"
                        >
                          {c.project} ↗
                        </a>
                        <span className="flex-1 basis-[16rem] text-body">{c.what}</span>
                        {c.link && (
                          <a
                            href={c.link.url}
                            rel="noopener"
                            className="whitespace-nowrap text-meta text-body hover:text-accent"
                          >
                            {c.link.label} ↗
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
        <p className="mt-12">
          <Link href="/work/" className="arrow-link">
            All work <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Section>

      {/* -------------------------------------------------------- how I work */}
      <Section id="how" eyebrow="How I work" title="Three rules the work follows">
        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {site.principles.map((p, i) => (
            <li key={p.title} className="border-t border-hairline pt-5">
              <p className="text-meta font-medium text-quiet">0{i + 1}</p>
              <h3 className="mt-3 text-[1.0625rem] font-semibold">{p.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-body">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ----------------------------------------------------------------- now */}
      {nowEntry && (
        <Section eyebrow="Now" title="What I’m working on this month">
          <NowBlock html={nowEntry.html} updated={nowEntry.data.updated} />
        </Section>
      )}

      {/* ------------------------------------------------------------- writing */}
      {writing.length > 0 && (
        <Section
          eyebrow="Writing"
          title="Reports and write-ups"
          headClassName="max-w-none"
        >
          <div className="max-w-3xl">
            {writing.map((item, i) => (
              <WritingRow key={item.slug} item={item} first={i === 0} />
            ))}
            {allWriting.length >= 2 && (
              <p className="border-t border-hairline pt-6">
                <Link href="/writing/" className="arrow-link">
                  All writing <span aria-hidden="true">→</span>
                </Link>
              </p>
            )}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------- experience */}
      <Section
        eyebrow="Experience"
        title="Track record: production backends since 2022"
      >
        <div className="max-w-4xl">
          <Timeline roles={experience.roles} compact />
          <p className="mt-8">
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener"
              className="arrow-link"
            >
              Resume (PDF)
              <span className="sr-only"> (opens in a new tab)</span>
              <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </Section>

      {/* ------------------------------------------------------------- contact */}
      <Section eyebrow="Contact" title="Get in touch">
        <div className="max-w-[60ch]">
          <p className="text-small leading-relaxed text-body md:text-[1.0625rem]">
            {site.availability}
          </p>
          <p className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn-solid">
              Email me
            </a>
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener" className="btn-outline">
                Book a call
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener"
              className="btn-outline"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </p>
          <p className="mt-8 text-meta text-quiet">
            Last updated{' '}
            <time dateTime={nowEntry ? isoDate(nowEntry.data.updated) : undefined}>
              {nowEntry ? formatDate(nowEntry.data.updated) : undefined}
            </time>
          </p>
        </div>
      </Section>
    </>
  );
}
