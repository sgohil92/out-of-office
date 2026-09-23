import type { ArchiveEntry } from "./types";
import "./sections.css";

export default function WishList<E extends ArchiveEntry>({
  entries,
  onOpen,
}: {
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  return (
    <ol className="ruled-paper">
      {entries.map((entry) => (
        <li key={entry.id}>
          <button
            type="button"
            onClick={() => onOpen(entry)}
            className="group flex h-12 w-full items-end gap-4 px-1 pb-[7px] text-left focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#A07E55]"
          >
            <span className="min-w-0 flex-1 truncate font-serif text-[19px] italic leading-none text-[#EAE5D9]/85 decoration-[#A07E55]/60 underline-offset-4 transition-colors duration-300 group-hover:text-[#EAE5D9] group-hover:underline">
              {entry.title}
            </span>
            <time className="shrink-0 font-mono text-[9px] leading-none tracking-[0.18em] text-[#6B6760]">
              {entry.date}
            </time>
          </button>
        </li>
      ))}
    </ol>
  );
}
