/** Stack chips — small hairline-bordered tags, first `max` shown. */
export default function StackChips({
  items,
  max = 5,
  label = 'Stack',
}: {
  items: readonly string[];
  max?: number;
  label?: string;
}) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  if (shown.length === 0) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap rounded-md border border-hairline px-2 py-0.5 text-meta text-body"
        >
          {item}
        </li>
      ))}
      {rest > 0 && (
        <li className="whitespace-nowrap rounded-md border border-dashed border-hairline px-2 py-0.5 text-meta text-quiet">
          +{rest}
        </li>
      )}
    </ul>
  );
}
