import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

import { site } from '../data/site';

export async function GET(context: APIContext) {
  const items = (await getCollection('writing')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const feedUrl = `${site.url}/rss.xml`;

  return rss({
    title: `${site.name} — Writing`,
    description: 'Reports and write-ups on agent reliability, AI control and model evaluation.',
    site: context.site ?? site.url,
    // Leave trailingSlash at its default so the channel <link> is the canonical
    // https://ebinbt.dev/ — item links are already absolute URLs and are emitted
    // verbatim either way.
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: items.map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      description: item.data.summary,
      link: item.data.url,
      categories: [item.data.kind, item.data.venue],
    })),
    customData:
      '<language>en-gb</language>' +
      `<atom:link rel="self" href="${feedUrl}" type="application/rss+xml"/>`,
  });
}
