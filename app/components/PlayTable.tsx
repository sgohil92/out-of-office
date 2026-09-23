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

function Record45() {
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
        <circle cx="104" cy="55" r="5" fill="#0C0B0A" stroke="#6B5236" strokeWidth="0.5" />
      </g>
      {/* burgundy sleeve, gold lettering */}
      <rect x="2" y="4" width="86" height="102" fill="#5E1F26" />
      <path d="M 88 4 V 106" stroke="#3A1217" strokeWidth="0.8" />
      <path d="M 84 4 V 106" stroke="#C9A66B" strokeOpacity="0.25" strokeWidth="0.4" />
      <text x="10" y="18" className="font-mono" fontSize="6" letterSpacing="1.2" fill="#C9A66B">
        45
      </text>
      <path d="M 10 22 H 40" stroke="#C9A66B" strokeOpacity="0.7" strokeWidth="0.5" />
    </svg>
  );
}

/** A loose watercolor-and-ink sketch of the Ferry Building. */
function InkWash() {
  return (
    <span className="ooo-paper relative block overflow-hidden">
      <svg viewBox="0 0 160 116" className="block w-full" aria-hidden>
        <defs>
          <filter id="ooo-wash" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
          </filter>
        </defs>

        {/* washes: sky, a warm glow, the bay */}
        <g filter="url(#ooo-wash)">
          <ellipse cx="44" cy="20" rx="60" ry="22" fill="#8FA4B2" fillOpacity="0.38" />
          <ellipse cx="128" cy="26" rx="48" ry="20" fill="#E3B98A" fillOpacity="0.28" />
          <ellipse cx="80" cy="52" rx="80" ry="12" fill="#EAE5D9" fillOpacity="0.35" />
          <rect x="-4" y="86" width="168" height="34" fill="#3B6478" fillOpacity="0.34" />
          <ellipse cx="60" cy="100" rx="60" ry="8" fill="#8FA4B2" fillOpacity="0.3" />
          <ellipse cx="120" cy="108" rx="44" ry="6" fill="#2E4D5E" fillOpacity="0.25" />
          {/* the building, in sandstone washes */}
          <rect x="19" y="61" width="122" height="24" fill="#D8C3A0" fillOpacity="0.7" />
          <rect x="72" y="20" width="16" height="42" fill="#D8C3A0" fillOpacity="0.8" />
          <rect x="75" y="12" width="10" height="9" fill="#C9B08A" fillOpacity="0.8" />
          <rect x="19" y="76" width="122" height="9" fill="#A07E55" fillOpacity="0.28" />
          <rect x="84" y="20" width="4" height="42" fill="#A07E55" fillOpacity="0.25" />
        </g>

        {/* the Bay Bridge, faint in the distance */}
        <g fill="none" stroke="#2A2520" strokeOpacity="0.28" strokeWidth="0.6">
          <path d="M 112 58 H 160" />
          <path d="M 118 58 V 44 M 146 58 V 44" />
          <path d="M 104 58 Q 118 42 118 44 Q 132 56 146 44 Q 154 50 160 52" />
        </g>

        {/* ink */}
        <g fill="none" stroke="#1E1A16" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 19 85 V 62 H 72 M 88 62 H 141 V 85" strokeWidth="1.1" strokeOpacity="0.85" />
          <path d="M 17 62 H 72 M 88 62 H 143" strokeWidth="0.7" strokeOpacity="0.6" />
          <path d="M 19 74.5 H 141" strokeWidth="0.5" strokeOpacity="0.5" />
          {/* clock tower */}
          <path d="M 72 85 V 20 H 88 V 85" strokeWidth="1.2" strokeOpacity="0.9" />
          <path d="M 70.5 20 H 89.5 M 71.5 37 H 88.5" strokeWidth="0.7" strokeOpacity="0.7" />
          <path d="M 75 20 V 12 H 85 V 20" strokeWidth="1" strokeOpacity="0.85" />
          <path d="M 75 12 Q 80 6 85 12" strokeWidth="0.9" strokeOpacity="0.85" />
          <path d="M 80 7.5 V 1" strokeWidth="0.6" />
          <path d="M 80 1.5 L 84 2.6 L 80 3.8" strokeWidth="0.5" fill="#9A3A28" fillOpacity="0.7" />
          <circle cx="80" cy="28.5" r="3.6" strokeWidth="0.8" fill="#F3EAD6" fillOpacity="0.8" />
          <path d="M 80 28.5 V 26.2 M 80 28.5 L 81.8 29.4" strokeWidth="0.5" />
          <path d="M 76 43 V 52 M 80 43 V 52 M 84 43 V 52" strokeWidth="0.5" strokeOpacity="0.7" />
          <path d="M 76.5 58 V 85 a 3.5 3.5 0 0 1 7 0" strokeWidth="0.7" strokeOpacity="0.75" />
          {/* arcades and windows */}
          <g strokeWidth="0.55" strokeOpacity="0.7">
          <path d="M 23 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 31 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 39 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 47 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 55 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 63 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 87 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 95 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 103 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 111 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 119 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 127 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          <path d="M 135 84 V 78.5 a 2.6 2.6 0 0 1 5.2 0 V 84" />
          </g>
          <g strokeWidth="0.5" strokeOpacity="0.55">
          <path d="M 25.6 67 V 71" />
          <path d="M 33.6 67 V 71" />
          <path d="M 41.6 67 V 71" />
          <path d="M 49.6 67 V 71" />
          <path d="M 57.6 67 V 71" />
          <path d="M 65.6 67 V 71" />
          <path d="M 89.6 67 V 71" />
          <path d="M 97.6 67 V 71" />
          <path d="M 105.6 67 V 71" />
          <path d="M 113.6 67 V 71" />
          <path d="M 121.6 67 V 71" />
          <path d="M 129.6 67 V 71" />
          <path d="M 137.6 67 V 71" />
          </g>
          {/* Embarcadero palms */}
          <g strokeOpacity="0.85">
            <path d="M 10 86 C 11 76 9 68 12 60" strokeWidth="0.9" />
            <path d="M 12 60 q -7 -1 -10 4 M 12 60 q 7 -2 10 3 M 12 60 q -4 -5 -9 -5 M 12 60 q 3 -6 9 -6 M 12 60 q 0 -6 -1 -8" strokeWidth="0.7" />
            <path d="M 150 86 C 149 77 151 70 148 63" strokeWidth="0.9" />
            <path d="M 148 63 q -7 -1 -10 4 M 148 63 q 7 -2 10 3 M 148 63 q -4 -5 -9 -5 M 148 63 q 3 -6 9 -6" strokeWidth="0.7" />
          </g>
          {/* the water */}
          <path d="M 6 92 q 6 -2 12 0 t 12 0 M 44 96 q 6 -2 12 0 t 12 0 t 12 0 M 100 92 q 6 -2 12 0 t 12 0 M 20 104 q 6 -2 12 0 t 12 0 M 96 106 q 6 -2 12 0 t 12 0 t 12 0" strokeWidth="0.5" strokeOpacity="0.45" />
        </g>
        <circle cx="30" cy="40" r="1.6" fill="#6B5236" fillOpacity="0.3" />
        <circle cx="142" cy="96" r="2.2" fill="#3B4654" fillOpacity="0.3" />
      </svg>
    </span>
  );
}

function Cookbook() {
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
      <circle cx="120" cy="84" r="5" fill="#EAE5D9" fillOpacity="0.06" />
      <circle cx="129" cy="80" r="1.6" fill="#EAE5D9" fillOpacity="0.07" />
      <circle cx="113" cy="90" r="1.1" fill="#EAE5D9" fillOpacity="0.07" />
      <path d="M 143 6 Q 146 8 146 12" fill="none" stroke="#EAE5D9" strokeOpacity="0.12" strokeWidth="0.8" />
    </svg>
  );
}

/** A typed page on the table: a contents page listing the ponderings. */
function TypedPage({ contents }: { contents?: string[] }) {
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

function objectFor(hobby: Hobby, contents?: string[]): ReactNode {
  switch (hobby) {
    case "dance":
      return <Record45 />;
    case "painting":
      return <InkWash />;
    case "market":
      return <Cookbook />;
    case "writing":
      return <TypedPage contents={contents} />;
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
                  {objectFor(hobby.key, ponderings)}
                </span>
                <span className="ooo-tag font-mono text-[9px] tracking-[0.28em]">
                  {hobby.label}
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
