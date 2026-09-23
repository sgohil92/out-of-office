import "./sections.css";

const COAT = "#1B1917";
const SHINE = "#4A453F";

/** Truffles, asleep on a cushion, signing off the page. */
export default function SleepingTruffles() {
  return (
    <svg viewBox="0 -8 170 100" className="ooo-sleeper block w-44 sm:w-52" aria-hidden>
      {/* cushion */}
      <ellipse cx="86" cy="76" rx="70" ry="13" fill="#4E3B28" />
      <ellipse cx="86" cy="72" rx="66" ry="12" fill="#8C6A45" />
      <ellipse cx="86" cy="72" rx="58" ry="8.5" fill="none" stroke="#C9A66B" strokeWidth="0.8" strokeDasharray="2 2.5" opacity="0.7" />

      <g className="ooo-breathe">
        {/* tail curled round the front */}
        <path d="M 116 62 C 132 64 134 74 118 76 C 104 78 84 78 70 76" fill="none" stroke={COAT} strokeWidth="5.5" strokeLinecap="round" />
        {/* body */}
        <path d="M 52 64 C 52 44 76 36 98 38 C 118 40 128 52 124 64 C 120 72 60 74 52 64 Z" fill={COAT} />
        <path d="M 66 44 C 80 37 100 37 114 44" fill="none" stroke={SHINE} strokeWidth="1.4" strokeLinecap="round" />
        {/* hind leg */}
        <path d="M 104 52 C 116 52 120 62 112 68" fill="none" stroke={SHINE} strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
        {/* front paws */}
        <ellipse cx="42" cy="70" rx="12" ry="4" fill={COAT} />
        <ellipse cx="50" cy="72" rx="10" ry="3.6" fill={COAT} />
      </g>

      {/* head resting on the paws */}
      <g>
        <ellipse cx="52" cy="58" rx="15" ry="11.5" fill={COAT} />
        <path d="M 26 62 C 26 55 34 52 42 53 L 44 68 C 36 69 26 68 26 62 Z" fill={COAT} />
        <path d="M 28 62 C 28 57 32 55 36 55 L 37 67 C 32 67.5 28 66 28 62 Z" fill="#9A958D" opacity="0.5" />
        <ellipse cx="25.5" cy="59.5" rx="2.6" ry="2" fill="#0A0908" />
        <circle cx="25" cy="58.8" r="0.6" fill="#F4EFE4" opacity="0.7" />
        <path d="M 27 66 C 28 69.5 31 69.5 31.5 66.5" fill="#D9707E" />
        {/* closed eye */}
        <path d="M 40 55 Q 43.5 57.5 47 55" fill="none" stroke="#8E8A84" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M 46 48 Q 52 45 58 47.5" fill="none" stroke={SHINE} strokeWidth="1.2" strokeLinecap="round" />
        {/* the soft ear, flopped */}
        <path d="M 54 49 C 62 49 66 56 64 64 C 63 68 58 68 57 64 C 56 60 55 54 54 49 Z" fill="#131110" stroke="#45403A" strokeWidth="0.7" />
      </g>

      <g className="font-sc" fill="#C9B79A">
        <text className="ooo-z ooo-z1" x="66" y="34" fontSize="11">z</text>
        <text className="ooo-z ooo-z2" x="76" y="22" fontSize="15">z</text>
        <text className="ooo-z ooo-z3" x="88" y="10" fontSize="19">Z</text>
      </g>
    </svg>
  );
}
