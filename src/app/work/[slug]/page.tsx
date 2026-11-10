import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ArticlePage from '@/components/ArticlePage';
import { getWorkArticles } from '@/lib/markdown';

/** Only markdown files in src/content/work/ get a page. */
export async function generateStaticParams() {
  return (await getWorkArticles()).map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = (await getWorkArticles()).find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: { type: 'article', title: a.title, description: a.description, url: `/work/${slug}/` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = (await getWorkArticles()).find((x) => x.slug === slug);
  if (!a) notFound();
  return <ArticlePage article={a} />;
}
