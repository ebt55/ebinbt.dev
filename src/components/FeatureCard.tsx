import Link from 'next/link';

import ContourTexture from './ContourTexture';
import type { Project } from '@/lib/content';

/**
 * The deep-green flagship card — METR's signature homepage element, matching
 * their report cards: kind label, title, one-line description, and a
 * white-outline "Read more" pill over a flat green surface with a
 * contour-line texture. No numbers — those live on the project page.
 */
export default function FeatureCard({ project }: { project: Project }) {
  const d = project.data;
  const kindLabel =
    d.kind === 'experiment'
      ? 'Experiment'
      : d.kind === 'system'
        ? 'System'
        : d.kind === 'tool'
          ? 'Tool'
          : 'Hackathon';
  return (
    <article className="relative overflow-hidden rounded-2xl bg-feature p-7 text-on-feature md:p-9">
      <ContourTexture className="-right-24 -top-28 h-[26rem] w-[34rem] text-white/[0.10]" />
      <div className="relative flex h-full flex-col">
        <p className="eyebrow uppercase !text-white/60">{kindLabel}</p>
        <h3 className="mt-3 max-w-[24ch] text-[1.5rem] font-semibold leading-tight tracking-[-0.015em] !text-white md:text-[1.75rem]">
          {d.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-small leading-relaxed text-white/80">
          {d.tagline}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
          <Link
            href={`/work/${project.slug}/`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-small font-medium transition-colors hover:border-white/70"
          >
            Read more
            <span aria-hidden="true">→</span>
          </Link>
          {d.links.repo && (
            <a
              href={d.links.repo}
              target="_blank"
              rel="noopener"
              className="text-small font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              Repo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
