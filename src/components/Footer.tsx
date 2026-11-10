import { home } from '@/content/home';
import { formatDate } from '@/lib/markdown';

export default function Footer() {
  const email = home.profile.links.find((l) => l.href.startsWith('mailto:'))?.href;
  const updated = home.profile.updated;
  return (
    <footer className="footer">
      {email ? <a href={email}>{email.replace(/^mailto:/, '')}</a> : <span />}
      <p>
        Last updated <time dateTime={updated}>{formatDate(new Date(`${updated}T00:00:00Z`))}</time>
      </p>
    </footer>
  );
}
