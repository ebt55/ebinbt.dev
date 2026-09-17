import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[55vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-h1">Page not found</h1>
      <p className="mt-5 max-w-[50ch] text-small text-body">
        The page you were looking for does not exist — the address may have
        changed when the site was rebuilt.
      </p>
      <p className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-solid">
          Back to the home page
          <span aria-hidden="true">→</span>
        </Link>
        <Link href="/work/" className="btn-outline">
          See the work
        </Link>
      </p>
    </div>
  );
}
