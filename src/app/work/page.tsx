import type { Metadata } from 'next';

import PageHead from '@/components/PageHead';
import ProjectCard from '@/components/ProjectCard';
import { getExperience, getProjects } from '@/lib/content';
import { LANES, WORK_INTRO } from '@/lib/lanes';

export const metadata: Metadata = {
  title: 'Work',
  description: WORK_INTRO,
  alternates: { canonical: '/work/' },
};

export default async function WorkIndex() {
  const projects = await getProjects();
  const experience = await getExperience();
  const projectTitles = new Set(projects.map((p) => p.data.title.toLowerCase()));
  const contributions = experience.open_source.filter(
    (o) => !projectTitles.has(o.project.toLowerCase())
  );

  return (
    <>
      <PageHead eyebrow="Projects" title="Work" lede={WORK_INTRO} />

      <div className="wrap pb-4 pt-12 md:pt-16">
        {LANES.map((lane) => {
          const items = projects.filter((p) => p.data.lane === lane.id);
          if (items.length === 0) return null;
          return (
            <section key={lane.id} className="[&:not(:first-child)]:mt-16">
              <h2 className="text-h3">{lane.title}</h2>
              <p className="mt-2 max-w-[64ch] text-small text-body">{lane.intro}</p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} headingLevel="h3" />
                ))}
              </div>
              {lane.id === 'oss' && contributions.length > 0 && (
                <div className="mt-10 border-t border-hairline pt-6">
                  <h3 className="eyebrow">Merged upstream</h3>
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
            </section>
          );
        })}
      </div>
    </>
  );
}
