import type { Metadata } from 'next';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';
import { home } from '@/content/home';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <header className="topbar">
        <Link href="/" className="back">
          <span aria-hidden="true">← </span>
          {home.profile.name}
        </Link>
        <ThemeToggle />
      </header>
      <main id="main" className="article">
        <h1 className="article-title">Page not found</h1>
        <p className="article-context">
          The address may have changed when the site was rebuilt. Everything is on the{' '}
          <Link href="/">home page</Link>.
        </p>
      </main>
    </>
  );
}
