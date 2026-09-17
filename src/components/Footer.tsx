import Link from 'next/link';

import { site } from '@/data/site';
import { getWriting } from '@/lib/content';

/** Site footer — METR pattern: mission blurb left, link columns right. */
export default async function Footer() {
  const year = new Date().getUTCFullYear();
  const writing = await getWriting();
  const showWriting = writing.length >= 2;

  const elsewhere = Object.entries(site.socials).filter(
    ([, url]) => url !== null
  ) as [string, string][];

  const label = (key: string) =>
    ({
      github: 'GitHub',
      linkedin: 'LinkedIn',
      peerlist: 'Peerlist',
      kaggle: 'Kaggle',
      huggingface: 'Hugging Face',
    })[key] ?? key;

  return (
    <footer className="mt-28 border-t border-hairline">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        {/* Mission blurb */}
        <div className="md:col-span-6 lg:col-span-5">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 rounded-[3px] bg-feature"
            />
            <p className="text-[0.9375rem] font-semibold text-ink">{site.name}</p>
          </div>
          <p className="mt-4 max-w-[38ch] text-small text-body">
            {site.headline} {site.availability.split(' — ')[0]}.
          </p>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-small font-medium">
            <a href={`mailto:${site.email}`} className="tlink">
              {site.email}
            </a>
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener" className="tlink">
                Book a call ↗
              </a>
            )}
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Footer" className="md:col-span-3 lg:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2.5 text-small font-medium">
            <li><Link href="/work/" className="hover:text-ink">Work</Link></li>
            <li><Link href="/now/" className="hover:text-ink">Now</Link></li>
            {showWriting && (
              <li><Link href="/writing/" className="hover:text-ink">Writing</Link></li>
            )}
            <li>
              <a href={site.resumePath} target="_blank" rel="noopener" className="hover:text-ink">
                Resume ↗
              </a>
            </li>
            {site.repoUrl && (
              <li>
                <a href={site.repoUrl} target="_blank" rel="noopener" className="hover:text-ink">
                  Source ↗
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* Elsewhere */}
        <nav aria-label="Elsewhere" className="md:col-span-3 lg:col-span-3">
          <p className="eyebrow">Elsewhere</p>
          <ul className="mt-4 space-y-2.5 text-small font-medium">
            {elsewhere.map(([key, url]) => (
              <li key={key}>
                <a href={url} target="_blank" rel="noopener" className="hover:text-ink">
                  {label(key)} ↗
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-hairline">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-meta text-quiet">
          <p>© {year} {site.name}</p>
          <p>
            Built with Next.js · Hosted on Cloudflare · Last built{' '}
            <time dateTime={new Date().toISOString().slice(0, 10)}>
              {new Date().toISOString().slice(0, 10)}
            </time>
          </p>
        </div>
      </div>
    </footer>
  );
}
