import Link from 'next/link';

import Links from '@/components/Links';
import ThemeToggle from '@/components/ThemeToggle';
import { home } from '@/content/home';
import type { Article } from '@/lib/markdown';

/** Shared layout for /work/<slug>/ and /writing/<slug>/. */
export default function ArticlePage({ article }: { article: Article }) {
  return (
    <>
      <header className="topbar">
        <Link href="/" className="back">
          <span aria-hidden="true">← </span>
          {home.profile.name}
        </Link>
        <ThemeToggle />
      </header>
      <main id="main">
        <article className="article">
          <h1 className="article-title">{article.title}</h1>
          {article.context && <p className="article-context">{article.context}</p>}
          <Links links={article.links} className="link-row article-links" label="Links" />
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        </article>
      </main>
    </>
  );
}
