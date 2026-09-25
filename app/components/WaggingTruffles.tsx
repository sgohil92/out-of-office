import "./sections.css";

const COAT = "#1B1917";
const SHINE = "#4A453F";

/** Truffles, sitting up on his cushion at the door, tail going. */
export default function WaggingTruffles() {
  return (
    <svg viewBox="0 -8 170 100" className="block w-44 sm:w-52" aria-hidden>
      {/* cushion */}
      <ellipse cx="86" cy="76" rx="70" ry="13" fill="#4E3B28" />
      <ellipse cx="86" cy="72" rx="66" ry="12" fill="#8C6A45" />
      <ellipse cx="86" cy="72" rx="58" ry="8.5" fill="none" stroke="#C9A66B" strokeWidth="0.8" strokeDasharray="2 2.5" opacity="0.7" />

      {/* tail, wagging from where it meets his back */}
      <path
        className="ooo-wag"
        d="M 118 64 C 130 62 138 54 140 42"
        fill="none"
        stroke={COAT}
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* haunch, sitting */}
      <ellipse cx="104" cy="60" rx="21" ry="15" fill={COAT} />
      <path d="M 92 50 C 102 46 114 48 120 56" fill="none" stroke={SHINE} strokeWidth="1.2" strokeLinecap="round" />
      {/* back paw tucked forward */}
      <ellipse cx="96" cy="73" rx="11" ry="3.6" fill={COAT} />

      {/* chest and body, upright */}
      <path d="M 66 70 C 62 52 64 38 72 28 L 88 30 C 94 40 98 52 100 70 Z" fill={COAT} />
      <path d="M 70 44 C 72 36 76 31 82 30" fill="none" stroke={SHINE} strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />

      {/* front legs and paws */}
      <rect x="68" y="50" width="7" height="22" rx="3" fill={COAT} />
      <rect x="79" y="52" width="7" height="20" rx="3" fill={COAT} />
      <ellipse cx="70" cy="73" rx="6.5" ry="3" fill={COAT} />
      <ellipse cx="82" cy="73" rx="6.5" ry="3" fill={COAT} />

      {/* collar */}
      <path d="M 71 33 C 76 37 84 37 89 33" fill="none" stroke="#9A3A28" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="80" cy="37.5" r="1.8" fill="#C9A66B" />

      {/* head, looking toward whoever's at the door */}
      <ellipse cx="78" cy="20" rx="13" ry="11" fill={COAT} />
      <ellipse cx="64" cy="24" rx="10" ry="6.5" fill={COAT} />
      <ellipse cx="56" cy="22.5" rx="3" ry="2.4" fill="#0A0908" />
      <circle cx="55.3" cy="21.8" r="0.8" fill={SHINE} />
      {/* happy open mouth */}
      <path d="M 58 27 C 62 30 66 30 69 28" fill="none" stroke={SHINE} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M 62 29 C 62.5 32.5 66 33 66.5 29.5" fill="#B5595A" />
      {/* eye, open and bright */}
      <circle cx="71" cy="17" r="1.9" fill="#0A0908" />
      <circle cx="70.5" cy="16.4" r="0.6" fill="#EAE5D9" />
      {/* ear */}
      <path d="M 82 12 C 90 12 92 22 88 30 C 85 32 81 28 81 22 Z" fill="#141210" stroke={SHINE} strokeWidth="0.6" />
      <path d="M 70 11 C 76 8 84 8 88 12" fill="none" stroke={SHINE} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
