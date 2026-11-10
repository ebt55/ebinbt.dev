import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ArticlePage from '@/components/ArticlePage';
import { getWritingArticles } from '@/lib/markdown';

/** Only markdown files in src/content/writing/ with no external `url` get a page. */
export async function generateStaticParams() {
  return (await getWritingArticles()).map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = (await getWritingArticles()).find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/writing/${slug}/` },
    openGraph: { type: 'article', title: a.title, description: a.description, url: `/writing/${slug}/` },
  };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = (await getWritingArticles()).find((x) => x.slug === slug);
  if (!a) notFound();
  return <ArticlePage article={a} />;
}
