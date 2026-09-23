import type { ArchiveEntry } from "./types";
import "./sections.css";

export default function MoodPortrait<E extends ArchiveEntry>({
  mood,
  entries,
  onOpen,
}: {
  /** This week's line, from content/mood.ts. */
  mood: { week: string; text: string };
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  const latest = entries[entries.length - 1];
  const log = [...entries].reverse();

  return (
    <div>
      {/* Quiet, like something said just to you. */}
      <div className="max-w-md border-l border-[#A07E55]/50 pl-4">
        {mood.week ? (
          <p className="font-mono text-[9px] tracking-[0.28em] text-[#A07E55]/80">{mood.week.toUpperCase()}</p>
        ) : null}
        <p
          className={`mt-2 font-serif text-[17px] italic leading-relaxed sm:text-[18px] ${
            mood.text ? "text-[#C9C2B4]" : "text-[#8E8E93]/35"
          }`}
        >
          {mood.text || "—"}
        </p>
      </div>

      <div className="mt-8">
        <p className="border-b border-[#242220] pb-2 font-mono text-[10px] tracking-[0.28em] text-[#8E8E93]">
          Ponderings
        </p>
        <ol>
          {log.map((entry) => (
            <li key={entry.id} className="border-b border-[#211F1C]">
              <button
                type="button"
                onClick={() => onOpen(entry)}
                className="group grid w-full grid-cols-[5.75rem_minmax(0,1fr)] items-baseline gap-x-4 py-3 text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#A07E55]"
              >
                <time className="font-mono text-[10px] tracking-[0.16em] text-[#A07E55]">
                  {entry.date}
                </time>
                <span className="min-w-0">
                  <span className="block font-serif text-lg leading-tight transition-colors duration-300 group-hover:text-[#A07E55]">
                    {entry.title}
                  </span>
                  {entry.dek ? (
                    <span className="mt-0.5 flex items-baseline justify-between gap-3">
                      <span className="font-serif text-sm text-[#8E8E93]">
                        {entry.dek}
                      </span>
                      {entry === latest && (
                        <span className="pencil shrink-0 text-[13px]">latest</span>
                      )}
                    </span>
                  ) : (
                    entry === latest && (
                      <span className="pencil mt-0.5 inline-block text-[13px]">
                        latest
                      </span>
                    )
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
