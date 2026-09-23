import type { CSSProperties, ReactNode } from "react";
import type { Hobby } from "../../content/types";
import type { ArchiveEntry } from "./types";
import "./sections.css";

const HOBBIES: { key: Hobby; label: string; tilt: number }[] = [
  { key: "dance", label: "DANCE", tilt: -5 },
  { key: "painting", label: "PAINTING", tilt: 4 },
  { key: "market", label: "FARMER'S MARKET", tilt: 2.5 },
  { key: "writing", label: "PONDERINGS", tilt: -3 },
];

const GROOVES = [23, 26, 29, 32, 35, 38, 41, 44, 46.5];

function Record45({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 160 110" className="block w-full" aria-hidden>
      <g className="ooo-reel">
        <circle cx="104" cy="55" r="49" fill="#141210" stroke="#3A352F" strokeWidth="0.8" />
        {GROOVES.map((r) => (
          <circle
            key={r}
            cx="104"
            cy="55"
            r={r}
            fill="none"
            stroke="#EAE5D9"
            strokeOpacity="0.07"
            strokeWidth="0.5"
          />
        ))}
        <path
          d="M 72 30 A 40 40 0 0 1 92 18"
          fill="none"
          stroke="#EAE5D9"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="104" cy="55" r="19" fill="#C9A66B" />
        <circle cx="104" cy="55" r="17.5" fill="none" stroke="#6B5236" strokeWidth="0.4" />
        <text x="104" y="51" textAnchor="middle" className="font-sc" fontSize="8.5" fill="#1A1714">
          Salsa
        </text>
        <text
          x="104"
          y="64"
          textAnchor="middle"
          className="font-mono"
          fontSize="3.6"
          letterSpacing="0.6"
          fill="#3A332B"
        >
          45 RPM · SIDE A
        </text>
        <text
          x="104"
          y="68.5"
          textAnchor="middle"
          className="font-mono"
          fontSize="3.6"
          letterSpacing="0.6"
          fill="#3A332B"
        >
          {index}
        </text>
        <circle cx="104" cy="55" r="5" fill="#0C0B0A" stroke="#6B5236" strokeWidth="0.5" />
      </g>
      <rect x="2" y="4" width="86" height="102" fill="#E4DCC8" />
      <path d="M 88 4 V 106" stroke="#8C7D63" strokeWidth="0.6" />
      <path d="M 84 4 V 106" stroke="#8C7D63" strokeOpacity="0.35" strokeWidth="0.4" />
      <text x="10" y="18" className="font-mono" fontSize="6" letterSpacing="1.2" fill="#3A332B">
        45
      </text>
      <path d="M 10 22 H 40" stroke="#8C7D63" strokeWidth="0.5" />
    </svg>
  );
}

function InkWash({ index }: { index: string }) {
  return (
    <span className="ooo-paper relative block overflow-hidden">
      <svg viewBox="0 0 160 116" className="block w-full" aria-hidden>
        <defs>
          <filter id="ooo-wash" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="2"
              seed="4"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
          </filter>
        </defs>
        <ellipse cx="40" cy="26" rx="54" ry="24" fill="#8FA4B2" fillOpacity="0.38" />
        <ellipse cx="122" cy="20" rx="48" ry="20" fill="#3B4654" fillOpacity="0.2" />
        <ellipse cx="80" cy="42" rx="72" ry="18" fill="#C9B79A" fillOpacity="0.4" />
        <ellipse cx="80" cy="48" rx="58" ry="12" fill="#EAE5D9" fillOpacity="0.35" />
        <ellipse cx="30" cy="88" rx="50" ry="22" fill="#5E6B55" fillOpacity="0.32" />
        <ellipse cx="128" cy="90" rx="44" ry="20" fill="#3B4654" fillOpacity="0.26" />
        <ellipse cx="80" cy="96" rx="80" ry="16" fill="#6B7A86" fillOpacity="0.3" />

        <g filter="url(#ooo-wash)" fill="#A07E55" fillOpacity="0.28">
          <rect x="24" y="28" width="12" height="36" />
          <rect x="122" y="30" width="12" height="36" />
          <rect x="21" y="24" width="18" height="8" />
          <rect x="119" y="26" width="18" height="8" />
        </g>
        <g fill="none" stroke="#6B5236" strokeLinecap="round">
          <path d="M 30 64 V 36 H 24 V 26 H 36 V 36 H 32 V 64" strokeWidth="1.6" strokeOpacity="0.75" />
          <path d="M 24 30 H 36 M 26 34 H 34" strokeWidth="0.7" strokeOpacity="0.55" />
          <path d="M 128 66 V 38 H 122 V 28 H 134 V 38 H 130 V 66" strokeWidth="1.6" strokeOpacity="0.75" />
          <path d="M 122 32 H 134 M 124 36 H 132" strokeWidth="0.7" strokeOpacity="0.55" />
          <path d="M 32 28 Q 80 6 128 30" strokeWidth="1.4" strokeOpacity="0.55" />
          <path d="M 32 64 Q 80 80 128 66" strokeWidth="1.2" strokeOpacity="0.4" />
          <path d="M 36 42 L 124 44" strokeWidth="0.5" strokeOpacity="0.28" />
        </g>

        <g filter="url(#ooo-wash)">
          <ellipse cx="78" cy="86" rx="24" ry="15" fill="#3A332B" fillOpacity="0.82" />
          <ellipse cx="98" cy="73" rx="14" ry="12" fill="#3A332B" fillOpacity="0.88" />
          <ellipse cx="108" cy="76" rx="8.5" ry="5.8" fill="#2A2520" fillOpacity="0.8" />
          <path
            d="M 58 90 Q 48 98 44 86"
            fill="none"
            stroke="#2A2520"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
          <path
            d="M 88 98 Q 94 110 78 112"
            fill="none"
            stroke="#2A2520"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        </g>
        <g fill="none" stroke="#1E1A16" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M 56 88 C 58 72 72 68 84 70 C 94 61 108 62 114 74 C 120 76 116 86 108 88 C 100 100 68 102 56 88 Z"
            strokeWidth="1.25"
            strokeOpacity="0.88"
          />
          <path d="M 108 76 Q 118 74 116 82" strokeWidth="1" strokeOpacity="0.75" />
          <path d="M 56 90 Q 46 100 42 84" strokeWidth="1.15" strokeOpacity="0.8" />
          <path d="M 90 99 Q 96 112 76 113" strokeWidth="1.05" strokeOpacity="0.75" />
          <circle cx="104" cy="70" r="1.3" fill="#1E1A16" stroke="none" />
          <circle cx="104.45" cy="69.55" r="0.4" fill="#E4DCC8" stroke="none" />
          <path d="M 112 76 Q 120 74 124 76" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M 112 78.5 Q 121 77 126 81" strokeWidth="0.45" strokeOpacity="0.45" />
          <path d="M 111 81 Q 118 82 122 86" strokeWidth="0.45" strokeOpacity="0.4" />
        </g>
        <circle cx="22" cy="68" r="2.2" fill="#6B5236" fillOpacity="0.35" />
        <circle cx="140" cy="52" r="2.6" fill="#A07E55" fillOpacity="0.32" />
        <circle cx="42" cy="104" r="1.6" fill="#3B4654" fillOpacity="0.28" />
        <text
          x="152"
          y="110"
          textAnchor="end"
          className="font-mono"
          fontSize="5"
          letterSpacing="0.8"
          fill="#2A2520"
          fillOpacity="0.45"
        >
          {index}
        </text>
      </svg>
    </span>
  );
}

function Cookbook({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 160 116" className="block w-full" aria-hidden>
      <path d="M 12 10 H 150 Q 154 10 154 14 V 104 Q 154 108 150 108 H 12 Z" fill="#E4DCC8" />
      <path
        d="M 150 14 V 104 M 147 12 V 106 M 16 104 H 150 M 16 101 H 147"
        stroke="#8C7D63"
        strokeOpacity="0.55"
        strokeWidth="0.5"
      />
      <path d="M 104 104 L 104 115 L 108 112 L 112 115 L 112 104 Z" fill="#A07E55" fillOpacity="0.8" />
      <rect x="4" y="4" width="143" height="98" rx="3" fill="#2E3E34" stroke="#1E2822" strokeWidth="0.8" />
      <rect x="4" y="4" width="16" height="98" rx="2" fill="#26332B" />
      <path d="M 20 4 V 102" stroke="#1A231E" strokeWidth="0.8" />
      <path d="M 9 14 H 16 M 9 17 H 16 M 9 89 H 16 M 9 92 H 16" stroke="#A07E55" strokeOpacity="0.7" strokeWidth="0.6" />
      <rect x="30" y="12" width="110" height="82" fill="none" stroke="#A07E55" strokeOpacity="0.35" strokeWidth="0.5" />
      <rect x="46" y="30" width="80" height="40" fill="none" stroke="#A07E55" strokeWidth="1" />
      <rect x="49" y="33" width="74" height="34" fill="none" stroke="#A07E55" strokeWidth="0.4" />
      <text x="86" y="52" textAnchor="middle" className="font-sc" fontSize="13" fill="#C9A66B">
        Feed Me
      </text>
      <text
        x="86"
        y="62"
        textAnchor="middle"
        className="font-mono"
        fontSize="4.2"
        letterSpacing="0.8"
        fill="#C9A66B"
        fillOpacity="0.85"
      >
        No. {index}
      </text>
      <circle cx="120" cy="84" r="5" fill="#EAE5D9" fillOpacity="0.06" />
      <circle cx="129" cy="80" r="1.6" fill="#EAE5D9" fillOpacity="0.07" />
      <circle cx="113" cy="90" r="1.1" fill="#EAE5D9" fillOpacity="0.07" />
      <path d="M 143 6 Q 146 8 146 12" fill="none" stroke="#EAE5D9" strokeOpacity="0.12" strokeWidth="0.8" />
    </svg>
  );
}

/** A typed page on the table: a contents page listing the ponderings. */
function TypedPage({ index, contents }: { index: string; contents?: string[] }) {
  const titles = contents?.slice(0, 4) ?? [];
  return (
    <span className="ooo-paper relative block aspect-[4/5] px-3 pt-4 text-left font-mono text-[6.5px] leading-[1.7] text-[#2A2520]">
      <svg
        viewBox="0 0 14 36"
        className="absolute -top-2.5 left-4 h-9 w-3.5"
        aria-hidden
      >
        <path
          d="M 4 34 V 6 a 3 3 0 0 1 6 0 V 30 a 1.6 1.6 0 0 1 -3.2 0 V 10"
          fill="none"
          stroke="#8E8E93"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="block text-right tracking-[0.14em]">{index}</span>
      <span className="mt-1 block text-[7.5px] font-bold leading-[1.35] tracking-[0.12em]">
        THE CONTEMPLATIVE LIFE
        <span className="ml-1 font-serif text-[9px] font-normal italic tracking-normal text-[#6B5E4E]">
          …perhaps
        </span>
      </span>
      <span aria-hidden className="mt-[3px] block h-px w-full bg-[#2A2520]/40" />
      {titles.length ? (
        <span className="mt-[5px] block space-y-[3px]">
          {titles.map((t) => (
            <span key={t} className="block leading-[1.35]">
              — {t}
            </span>
          ))}
        </span>
      ) : (
        <span className="mt-1 block">[ Entry forthcoming. ]</span>
      )}
      {[88, 72, 80].slice(0, Math.max(1, 4 - titles.length)).map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="mt-[6px] block h-[2px] bg-[#2A2520]/20"
          style={{ width: `${w}%` }}
        />
      ))}
    </span>
  );
}

function objectFor(hobby: Hobby, index: string, contents?: string[]): ReactNode {
  switch (hobby) {
    case "dance":
      return <Record45 index={index} />;
    case "painting":
      return <InkWash index={index} />;
    case "market":
      return <Cookbook index={index} />;
    case "writing":
      return <TypedPage index={index} contents={contents} />;
  }
}

export default function PlayTable<E extends ArchiveEntry>({
  entries,
  onOpen,
  ponderings,
}: {
  entries: E[];
  onOpen: (entry: E) => void;
  /** Pondering titles, newest first, typed onto the page on the table. */
  ponderings?: string[];
}) {
  return (
    <div className="ooo-table w-full min-w-0 border border-[#242220] px-3 py-8 sm:px-6">
      <ul className="grid grid-cols-2 items-end gap-x-5 gap-y-10 sm:gap-x-8">
        {entries.map((entry, i) => {
          const hobby =
            HOBBIES.find((h) => h.key === entry.hobby) ?? HOBBIES[i % HOBBIES.length];
          return (
            <li key={entry.id} className="flex justify-center">
              <button
                type="button"
                onClick={() => onOpen(entry)}
                aria-label={`${titleCase(hobby.label)} — ${entry.title}. Open entry`}
                className="ooo-object group flex w-full max-w-[180px] flex-col items-center gap-3 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#A07E55]"
                style={{ "--tilt": `${hobby.tilt}deg` } as CSSProperties}
              >
                <span
                  className={`ooo-object-body block ${
                    hobby.key === "writing" ? "w-[78%]" : "w-full"
                  }`}
                >
                  {objectFor(hobby.key, entry.index, ponderings)}
                </span>
                <span className="ooo-tag font-mono text-[9px] tracking-[0.28em]">
                  {hobby.label}
                  <span className="text-[#6B6760]"> · {entry.index}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function titleCase(text: string) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}
