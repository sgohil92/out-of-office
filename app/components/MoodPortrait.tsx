import type { ArchiveEntry } from "./types";
import "./sections.css";

const PLACEHOLDER_BODY = "[ Entry forthcoming. ]";

function firstSentence(text: string) {
  const line = text.split(/\n+/)[0]?.trim() ?? "";
  const match = line.match(/^.+?[.!?](?=\s|$)/);
  return (match?.[0] ?? line).trim();
}

function moodMark(entry?: ArchiveEntry) {
  if (!entry) return null;
  const body = entry.body?.trim() ?? "";
  if (body && body !== PLACEHOLDER_BODY) {
    const sentence = firstSentence(body);
    if (sentence) return sentence;
  }
  const title = entry.title.trim();
  if (title && !/^Untitled — Entry /.test(title)) return title;
  return null;
}

export default function MoodPortrait<E extends ArchiveEntry>({
  entries,
  onOpen,
}: {
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  const latest = entries[entries.length - 1];
  const log = [...entries].reverse();
  const mark = moodMark(latest);

  return (
    <div>
      <p
        className={`font-serif italic text-[1.85rem] leading-[1.2] tracking-[-0.02em] sm:text-4xl ${
          mark
            ? "text-[#EAE5D9] -rotate-[0.7deg]"
            : "text-[#8E8E93]/35"
        }`}
      >
        {mark ?? "—"}
      </p>

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
