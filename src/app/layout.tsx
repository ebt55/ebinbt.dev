import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { site } from '@/data/site';

import './globals.css';

const instrument = Instrument_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.title}`,
    description: site.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.title}`,
    description: site.description,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfa' },
    { media: '(prefers-color-scheme: dark)', color: '#101312' },
  ],
};

/**
 * Theme handling, METR-style: two tiny inline scripts, no React hydration.
 * The first runs before paint (no flash); the second wires the toggle and
 * marks the active nav link.
 */
const themeInit = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

const themeWire = `(function(){function sync(){var d=document.documentElement.classList.contains('dark');document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.setAttribute('aria-pressed',d?'true':'false')});}
document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-theme-toggle]'):null;if(!b)return;var d=document.documentElement.classList.toggle('dark');try{localStorage.setItem('theme',d?'dark':'light')}catch(_){ }document.documentElement.style.colorScheme=d?'dark':'light';sync();});
sync();
var links=document.querySelectorAll('[data-nav]');var p=location.pathname;links.forEach(function(l){var h=l.getAttribute('href')||'';if(h==='/'?p==='/':(p===h||p.indexOf(h)===0)){l.setAttribute('aria-current','page');}});})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrument.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-feature focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-on-feature"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script dangerouslySetInnerHTML={{ __html: themeWire }} />
        {site.analyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: site.analyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
