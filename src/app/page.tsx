import EntryList from '@/components/EntryList';
import Links from '@/components/Links';
import ThemeToggle from '@/components/ThemeToggle';
import { home } from '@/content/home';
import { inline } from '@/lib/markdown';
import type { Update } from '@/lib/types';

function UpdateRows({ items }: { items: Update[] }) {
  return (
    <ul className="rows">
      {items.map((u, i) => (
        <li key={`${u.when}-${i}`} className="row">
          <span className="row-when">{u.when}</span>
          <span className="row-text" dangerouslySetInnerHTML={{ __html: inline(u.text) }} />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { profile, updates, updatesShown, research, software, openSource, experience } = home;
  const shown = updates.slice(0, updatesShown);
  const earlier = updates.slice(updatesShown);

  return (
    <>
      <header className="topbar">
        <h1 className="name">{profile.name}</h1>
        <ThemeToggle />
      </header>

      <main id="main">
        <section className="intro" aria-label="About">
          <img
            className="photo"
            src={profile.photo}
            alt={profile.photoAlt}
            width={600}
            height={600}
            fetchPriority="high"
          />
          <div className="intro-text">
            {profile.intro.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: inline(p) }} />
            ))}
            <Links links={profile.links} sep="·" className="link-row" label="Contact and profiles" />
          </div>
        </section>

        {updates.length > 0 && (
          <section id="updates" aria-labelledby="updates-h">
            <h2 id="updates-h">Updates</h2>
            <UpdateRows items={shown} />
            {earlier.length > 0 && (
              <details className="more">
                <summary>Earlier updates</summary>
                <UpdateRows items={earlier} />
              </details>
            )}
          </section>
        )}

        <section id="research" aria-labelledby="research-h">
          <h2 id="research-h">Research</h2>
          <EntryList section={research} />
        </section>

        <section id="software" aria-labelledby="software-h">
          <h2 id="software-h">Software</h2>
          <EntryList section={software} />
        </section>

        {openSource.length > 0 && (
          <section id="open-source" aria-labelledby="open-source-h">
            <h2 id="open-source-h">Open source</h2>
            <ul className="plain">
              {openSource.map((line, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: inline(line) }} />
              ))}
            </ul>
          </section>
        )}

        <section id="experience" aria-labelledby="experience-h">
          <h2 id="experience-h">Experience</h2>
          <ul className="rows">
            {experience.map((r) => (
              <li key={`${r.org}-${r.when}`} className="row">
                <span className="row-when">{r.when}</span>
                <div className="row-text">
                  <p className="role">
                    <span className="role-org">{r.org}</span>
                    <span className="role-sep" aria-hidden="true">
                      {' · '}
                    </span>
                    <span className="role-title">{r.role}</span>
                  </p>
                  <p dangerouslySetInnerHTML={{ __html: inline(r.text) }} />
                  {r.links && r.links.length > 0 && (
                    <Links links={r.links} sep="/" className="entry-links" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
