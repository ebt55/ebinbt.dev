import { formatDate, isoDate } from '@/lib/format';

/**
 * The /now/ block — rendered markdown bullets inside a quiet sunken card,
 * with the updated date as its eyebrow.
 */
export default function NowBlock({
  html,
  updated,
}: {
  html: string;
  updated: Date;
}) {
  return (
    <div className="card max-w-[52rem] bg-sunken p-6 md:p-8">
      <p className="eyebrow">
        Updated <time dateTime={isoDate(updated)}>{formatDate(updated)}</time>
      </p>
      <div
        className="prose mt-4 max-w-none [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
