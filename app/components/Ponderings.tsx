import { formatDate, type ArchiveEntry } from "./types";
import "./sections.css";

/** The list of ponderings, already sorted newest first; opens from the typed page on the Play table. */
export default function Ponderings<E extends ArchiveEntry>({
  entries,
  onOpen,
}: {
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  const latest = entries.find((e) => e.date);
  const written = entries.filter((e) => !e.future);
  const future = entries.filter((e) => e.future);

  const row = (entry: E) => (
    <li key={entry.id} className="border-b border-[#211F1C]">
      <button
        type="button"
        onClick={() => onOpen(entry)}
        className="group grid w-full grid-cols-[5.75rem_minmax(0,1fr)] items-baseline gap-x-4 py-3 text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#A07E55]"
      >
        <time className="font-mono text-[10px] tracking-[0.16em] text-[#A07E55]">
          {formatDate(entry.date, "short")}
        </time>
        <span className="min-w-0">
          <span className="block font-serif text-lg leading-tight transition-colors duration-300 group-hover:text-[#A07E55]">
            {entry.title}
          </span>
          {entry.dek || entry === latest ? (
            <span className="mt-0.5 flex items-baseline justify-between gap-3">
              <span className="font-serif text-sm text-[#8E8E93]">{entry.dek}</span>
              {entry === latest && <span className="pencil shrink-0 text-[13px]">latest</span>}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  );

  return (
    <div className="mt-8">
      <ol>{written.map(row)}</ol>
      {future.length > 0 ? (
        <>
          <h4 className="mt-10 font-mono text-[10px] tracking-[0.28em] text-[#A07E55]">FUTURE TOPICS</h4>
          <ul className="mt-2">{future.map(row)}</ul>
        </>
      ) : null}
    </div>
  );
}
