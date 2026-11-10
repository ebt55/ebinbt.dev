import { home } from '@/content/home';
import { site } from '@/data/site';
import { formatDate } from '@/lib/markdown';

export default function Footer() {
  const email = home.profile.links.find((l) => l.href.startsWith('mailto:'))?.href;
  const updated = home.profile.updated;
  return (
    <footer className="footer">
      <p>
        {email && <a href={email}>{email.replace(/^mailto:/, '')}</a>}
        {email && site.feedbackUrl && (
          <span className="sep" aria-hidden="true">
            {' · '}
          </span>
        )}
        {site.feedbackUrl && <a href={site.feedbackUrl}>Anonymous feedback</a>}
      </p>
      <p>
        Last updated <time dateTime={updated}>{formatDate(new Date(`${updated}T00:00:00Z`))}</time>
      </p>
    </footer>
  );
}
