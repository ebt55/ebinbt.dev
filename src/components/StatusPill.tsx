export type Status = 'active' | 'in-development' | 'shipped' | 'archived';

const LABELS: Record<Status, string> = {
  active: 'Active',
  'in-development': 'In development',
  shipped: 'Shipped',
  archived: 'Archived',
};

/** Status pill with a signalling dot, as on the project cards. */
export default function StatusPill({ status }: { status: Status }) {
  const dot =
    status === 'active'
      ? 'bg-accent'
      : status === 'in-development'
        ? 'border border-accent bg-transparent'
        : status === 'shipped'
          ? 'bg-ink'
          : 'border border-quiet bg-transparent';
  return (
    <span className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border border-hairline-strong px-2.5 py-0.5 text-meta font-medium text-body">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {LABELS[status]}
    </span>
  );
}
