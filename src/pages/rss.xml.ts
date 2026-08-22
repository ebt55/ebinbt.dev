import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

import { site } from '../data/site';

export async function GET(context: APIContext) {
  const items = (await getCollection('writing')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: `${site.name} — Writing`,
    description: 'Reports and write-ups on agent reliability, AI control and model evaluation.',
    site: context.site ?? site.url,
    trailingSlash: false,
    items: items.map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      description: item.data.summary,
      link: item.data.url,
      categories: [item.data.kind, item.data.venue],
    })),
    customData: '<language>en-gb</language>',
  });
}
