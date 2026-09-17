import type { Metadata } from 'next';

import PageHead from '@/components/PageHead';
import WritingRow from '@/components/WritingRow';
import { getWriting } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Reports and write-ups on agent reliability, AI control and model evaluation.',
  alternates: { canonical: '/writing/' },
};

export default async function WritingIndex() {
  const writing = await getWriting();

  return (
    <>
      <PageHead
        eyebrow="Writing"
        title="Reports and write-ups"
        lede="Longer reports live where they were published — the site carries the summaries and the links."
      />
      <div className="wrap max-w-3xl pt-10 md:pt-14">
        {writing.map((item, i) => (
          <WritingRow key={item.slug} item={item} first={i === 0} />
        ))}
      </div>
    </>
  );
}
