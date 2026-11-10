import type { Metadata, Viewport } from 'next';

import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/400-italic.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import '@fontsource-variable/newsreader/opsz.css';

import Footer from '@/components/Footer';
import { site } from '@/data/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f3' },
    { media: '(prefers-color-scheme: dark)', color: '#151412' },
  ],
};

/**
 * Theme: CSS follows prefers-color-scheme on its own (works with JS off).
 * This script runs before first paint, so there is no flash: it applies a
 * stored choice, or pins the system theme, as `data-theme` on <html>, and
 * adds `js` so the toggle button shows.
 */
const themeInit = `(function(){var r=document.documentElement,s=null;r.classList.add('js');try{s=localStorage.getItem('theme')}catch(e){}var t=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');r.setAttribute('data-theme',t);r.style.colorScheme=t;})();`;

/**
 * After the page: wires the toggle (and persists the choice), follows system
 * changes while no choice is stored, and opens a closed <details> when the
 * URL fragment points inside one (old /work/<slug>/ links redirect to
 * /#<slug>, and some of those entries sit under "More").
 *
 * It also highlights the entry a link jumps to (`.flash`, styled in
 * globals.css). The highlight waits until the smooth scroll has stopped, so
 * the reader sees it, and it replays when the same link is clicked again.
 */
const themeWire = `(function(){var r=document.documentElement;function set(t){r.setAttribute('data-theme',t);r.style.colorScheme=t;document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.setAttribute('aria-pressed',t==='dark'?'true':'false')})}
set(r.getAttribute('data-theme')||'light');
document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-theme-toggle]'):null;if(!b)return;var t=r.getAttribute('data-theme')==='dark'?'light':'dark';set(t);try{localStorage.setItem('theme',t)}catch(_){}});
try{window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(m){var s=null;try{s=localStorage.getItem('theme')}catch(_){}if(!s)set(m.matches?'dark':'light')})}catch(_){}
function reveal(){var id=decodeURIComponent(location.hash.slice(1));if(!id)return;var el=document.getElementById(id);if(!el)return;var d=el.closest('details');if(d&&!d.open){d.open=true;el.scrollIntoView()}}
var tok=0,pending=null;
function flash(id){var el=id&&document.getElementById(id);if(!el||!el.classList.contains('entry')||pending===id)return;pending=id;var my=++tok,done=false,moved=false,idle;
function go(){if(done||my!==tok)return;done=true;pending=null;window.removeEventListener('scroll',onScroll);el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');el.addEventListener('animationend',function(){el.classList.remove('flash')},{once:true})}
function onScroll(){moved=true;clearTimeout(idle);idle=setTimeout(go,140)}
window.addEventListener('scroll',onScroll,{passive:true});setTimeout(function(){if(!moved)go()},250);setTimeout(go,1600)}
function fromHash(){return decodeURIComponent(location.hash.slice(1))}
document.addEventListener('click',function(e){if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var a=e.target&&e.target.closest?e.target.closest('a[href*="#"]'):null;if(!a||a.origin!==location.origin||a.pathname!==location.pathname)return;flash(decodeURIComponent(a.hash.slice(1)))});
reveal();flash(fromHash());window.addEventListener('hashchange',function(){reveal();flash(fromHash())});})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <div className="page">
          {children}
          <Footer />
        </div>
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
