import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import NowBlock from '@/components/NowBlock';
import PageHead from '@/components/PageHead';
import { getNow } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Ebin is working on this month.',
  alternates: { canonical: '/now/' },
};

export default async function NowPage() {
  const nowEntry = await getNow();
  if (!nowEntry) notFound();

  return (
    <>
      <PageHead
        eyebrow="Now"
        title="What I’m working on this month"
        lede="A short, current list. Older entries fall off; the projects they mention live under Work."
      />
      <div className="wrap pt-10 md:pt-14">
        <NowBlock html={nowEntry.html} updated={nowEntry.data.updated} />
      </div>
    </>
  );
}
