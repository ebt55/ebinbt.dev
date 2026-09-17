export interface ProjectLinks {
  repo?: string | null;
  writeup?: string | null;
  demo?: string | null;
  model?: string | null;
  other?: readonly { label: string; url: string }[];
}

/**
 * Project links as a mono-feeling row of arrows. Cards show only the four
 * named links; detail pages also list `links.other`.
 */
export default function LinkRow({
  links,
  label = 'Project links',
  includeOther = true,
}: {
  links: ProjectLinks;
  label?: string;
  includeOther?: boolean;
}) {
  const items = [
    { label: 'Repo', url: links.repo ?? '' },
    { label: 'Write-up', url: links.writeup ?? '' },
    { label: 'Demo', url: links.demo ?? '' },
    { label: 'Model', url: links.model ?? '' },
    ...(includeOther ? (links.other ?? []).map((o) => ({ label: o.label, url: o.url })) : []),
  ].filter((i) => i.url.length > 0);
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-x-4 gap-y-1 text-meta font-medium">
      {items.map((item) => (
        <li key={item.label + item.url}>
          <a href={item.url} rel="noopener" className="text-accent hover:underline hover:underline-offset-4">
            {item.label}
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
