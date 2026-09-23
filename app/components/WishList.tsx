import type { ArchiveEntry } from "./types";
import "./sections.css";

/** A pencil tick for wishes that came true. */
function PencilCheck() {
  return (
    <svg viewBox="0 0 20 20" className="absolute -left-0.5 -top-1.5 h-6 w-6" aria-hidden>
      <path
        d="M 3 11 C 5 12.5 6.5 14.5 7.5 17 C 10 10 13.5 5.5 18.5 2"
        fill="none"
        stroke="#4A4540"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WishList<E extends ArchiveEntry>({
  entries,
  onOpen,
}: {
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  const doneCount = entries.filter((e) => e.done).length;
  return (
    <div className="ooo-notepad relative">
      <div aria-hidden className="ooo-notepad-binding" />
      <div className="px-4 pb-5 pt-6 sm:px-6">
        <p className="ooo-notepad-head flex items-baseline justify-between gap-3 pl-9 font-mono text-[9px] tracking-[0.24em] text-[#8C7D63] sm:pl-11">
          <span>THINGS TO TRY</span>
          <span className="font-serif text-[13px] italic tracking-normal text-[#6B5E4E]">
            {doneCount} of {entries.length} done
          </span>
        </p>
        <ol className="ooo-notepad-lines">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => onOpen(entry)}
                aria-label={`${entry.title}${entry.done ? " (done)" : ""}. Open`}
                className="group flex h-10 w-full items-end gap-3 pb-[7px] text-left focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#9A3A28] sm:gap-5"
              >
                <span aria-hidden className="relative mb-0.5 ml-1 h-4 w-4 shrink-0 border-[1.5px] border-[#6B5E4E]/70 sm:ml-2">
                  {entry.done ? <PencilCheck /> : null}
                </span>
                <span
                  className={`min-w-0 flex-1 truncate pl-3 font-serif text-[19px] italic leading-none transition-colors duration-300 sm:pl-4 ${
                    entry.done
                      ? "text-[#6B5E4E] line-through decoration-[#4A4540]/70 decoration-[1.5px]"
                      : "text-[#1E1A16] group-hover:text-[#9A3A28]"
                  }`}
                >
                  {entry.title}
                </span>
                <time className="shrink-0 font-mono text-[9px] leading-none tracking-[0.14em] text-[#8C7D63]">
                  {entry.date}
                </time>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
