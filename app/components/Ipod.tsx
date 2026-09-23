"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import type { Entry } from "../../content/types";

const PLACEHOLDER_BODY = "[ Entry forthcoming. ]";

type View = "main" | "podcasts" | "now" | "truffles";
type Row = { key: string; label: string; arrow?: boolean; disabled?: boolean };

const MAIN: Row[] = [
  { key: "podcasts", label: "Podcasts", arrow: true },
  { key: "truffles", label: "Truffles' Playlist", arrow: true },
  { key: "recommend", label: "Recommend one", arrow: true },
  { key: "music", label: "Music", disabled: true },
  { key: "photos", label: "Photos", disabled: true },
];

const labelFor = (entry: Entry) => entry.spine ?? entry.title;

/** The iPod lying on the shelf, earbuds and all. */
export function IpodOnShelf({ podcasts, onOpen }: { podcasts: Entry[]; onOpen: () => void }) {
  const playing = podcasts[0] ? labelFor(podcasts[0]) : "Nothing yet";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open the iPod: podcasts I'm listening to"
      className="ooo-ipod-mini group relative block w-[112px] shrink-0 transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#A07E55] sm:w-[124px]"
    >
      <svg viewBox="0 0 124 104" className="block w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="ooo-ipod-body" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#8A6647" />
            <stop offset="1" stopColor="#4E3826" />
          </linearGradient>
          <linearGradient id="ooo-ipod-wheel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#F1E7D4" />
            <stop offset="1" stopColor="#D8C6A6" />
          </linearGradient>
          <clipPath id="ooo-ipod-screen">
            <rect x="11" y="11" width="40" height="30" rx="2" />
          </clipPath>
        </defs>
        {/* the earbuds cord, looping off to the right toward the shelf's edge */}
        <path
          className="ooo-earbuds"
          d="M 45 6 C 48 -4 72 -6 84 10 C 96 26 92 60 106 84 C 112 94 118 100 122 104"
          fill="none"
          stroke="#EDEBE6"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* the iPod */}
        <rect x="4" y="4" width="54" height="96" rx="8" fill="url(#ooo-ipod-body)" stroke="#3A2A1C" strokeWidth="0.8" />
        <path d="M 9 8 Q 31 5 53 8" fill="none" stroke="#B08A66" strokeWidth="0.6" opacity="0.6" />
        <rect x="10" y="10" width="42" height="32" rx="2.5" fill="#2A2A2A" />
        <rect x="11" y="11" width="40" height="30" rx="2" fill="#DCE6EC" />
        <g clipPath="url(#ooo-ipod-screen)" fontFamily="Helvetica Neue, Arial, sans-serif">
          <rect x="11" y="11" width="40" height="6" fill="#C9D3DA" />
          <text x="31" y="15.6" textAnchor="middle" fontSize="3.6" fontWeight="700" fill="#1E2A33">
            Now Playing
          </text>
          <text x="13" y="26" fontSize="4" fontWeight="700" fill="#1E2A33">
            {playing.length > 14 ? `${playing.slice(0, 13)}…` : playing}
          </text>
          <rect x="13" y="33" width="36" height="2.2" rx="1.1" fill="#9FB0BC" />
          <rect x="13" y="33" width="13" height="2.2" rx="1.1" fill="#3875D7" />
        </g>
        <circle cx="31" cy="72" r="18" fill="url(#ooo-ipod-wheel)" stroke="#3A2A1C" strokeWidth="0.6" />
        <circle cx="31" cy="72" r="6.5" fill="url(#ooo-ipod-body)" stroke="#3A2A1C" strokeWidth="0.5" />
        <text x="31" y="59" textAnchor="middle" fontSize="3.4" fontWeight="700" fill="#8C6A45" fontFamily="Helvetica Neue, Arial, sans-serif">
          MENU
        </text>
      </svg>
      <span className="mt-1 block text-center font-mono text-[8px] tracking-[0.24em] text-[#8E8E93] group-hover:text-[#EAE5D9]">
        PODCASTS
      </span>
    </button>
  );
}

/** The earbuds hanging over the front of the shelf, swaying a little. Sits inside the shelf plank. */
export function DanglingEarbuds({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 -20 40 98" className={`ooo-dangle pointer-events-none absolute -top-[20px] z-10 h-[98px] w-[40px] ${className}`} aria-hidden>
      <g fill="none" stroke="#EDEBE6" strokeWidth="1.3" strokeLinecap="round">
        <path d="M 18 -20 C 19 -10 20 -4 20 0 C 21 8 20 16 20 26 C 20 34 19 40 20 46" />
        <path d="M 20 46 C 16 52 12 58 11 66" />
        <path d="M 20 46 C 24 54 27 60 29 70" />
      </g>
      <rect x="18.2" y="42" width="3.6" height="5" rx="1" fill="#EDEBE6" />
      <g>
        <ellipse cx="11" cy="69" rx="4.5" ry="5.5" fill="#F4F2EE" stroke="#BDB8AF" strokeWidth="0.6" />
        <circle cx="11" cy="70" r="1.6" fill="#8E8A84" />
      </g>
      <g>
        <ellipse cx="29" cy="72" rx="4.5" ry="5.5" fill="#F4F2EE" stroke="#BDB8AF" strokeWidth="0.6" />
        <circle cx="29" cy="73" r="1.6" fill="#8E8A84" />
      </g>
    </svg>
  );
}

/** The full-size iPod: a working menu, click wheel and Now Playing screen. */
export function IpodPlayer({
  podcasts,
  onClose,
  onRecommend,
}: {
  podcasts: Entry[];
  onClose: () => void;
  onRecommend: () => void;
}) {
  const [view, setView] = useState<View>("main");
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(0);
  const wheel = useRef<{ angle: number; spin: number } | null>(null);

  const rows: Row[] =
    view === "main"
      ? MAIN
      : view === "podcasts"
        ? podcasts.length
          ? podcasts.map((p) => ({ key: p.id, label: labelFor(p), arrow: true }))
          : [{ key: "none", label: "No podcasts yet", disabled: true }]
        : [];

  const move = (d: number) => {
    if (!rows.length) return;
    let next = sel;
    for (let i = 0; i < rows.length; i++) {
      next = Math.min(rows.length - 1, Math.max(0, next + d));
      if (!rows[next].disabled) break;
    }
    if (!rows[next].disabled) setSel(next);
  };

  const select = (index = sel) => {
    const row = rows[index];
    if (!row || row.disabled) return;
    if (view === "main") {
      if (row.key === "podcasts") {
        setView("podcasts");
        setSel(0);
      } else if (row.key === "truffles") {
        setView("truffles");
      } else if (row.key === "recommend") {
        onClose();
        onRecommend();
      }
    } else if (view === "podcasts") {
      setPlaying(index);
      setView("now");
    }
  };

  const back = () => {
    if (view === "now") {
      setView("podcasts");
      setSel(playing);
    } else if (view !== "main") {
      setSel(view === "podcasts" ? 0 : 1);
      setView("main");
    }
  };

  // Keyboard: arrows scroll, Enter selects, Backspace/← is MENU, Esc puts it down.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") move(1);
      else if (e.key === "ArrowUp") move(-1);
      else if (e.key === "Enter" || e.key === "ArrowRight") select();
      else if (e.key === "Backspace" || e.key === "ArrowLeft") back();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  });

  // The click wheel: every ~28° of turning moves the selection one row.
  const angleOf = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  const onWheelDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    wheel.current = { angle: angleOf(e), spin: 0 };
  };
  const onWheelMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!wheel.current) return;
    const a = angleOf(e);
    let delta = a - wheel.current.angle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    wheel.current.angle = a;
    wheel.current.spin += delta;
    while (Math.abs(wheel.current.spin) >= 28) {
      const step = Math.sign(wheel.current.spin);
      move(step);
      wheel.current.spin -= step * 28;
    }
  };
  const onWheelUp = () => {
    wheel.current = null;
  };

  const current = podcasts[playing];
  const note = current && current.body && current.body !== PLACEHOLDER_BODY ? current.body : "";
  const title = view === "main" ? "iPod" : view === "podcasts" ? "Podcasts" : "Now Playing";

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="iPod" className="fixed inset-0 z-[70] flex flex-col bg-[#0C0B0A]/92 backdrop-blur-sm">
      <div className="flex justify-end px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="min-h-11 px-2 font-mono text-[10px] tracking-[0.24em] text-[#8E8E93] outline-none hover:text-[#EAE5D9] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#A07E55]"
        >
          CLOSE
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-5 pb-10">
        <div className="ooo-ipod relative w-[min(290px,78vw)] shrink-0 rounded-[34px] p-[7%] pb-[9%] shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
          {/* screen */}
          <div
            className="overflow-hidden rounded-[6px] border-[3px] border-[#2A2A2A] bg-[#E3ECF1] text-[#1E2A33]"
            style={{ aspectRatio: "4 / 3", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            <div className="flex items-center justify-between border-b border-[#9FB0BC] bg-gradient-to-b from-[#F4F7F9] to-[#CBD5DC] px-2 py-[3px] text-[11px] font-bold">
              <span className="w-8">{view === "now" || view === "truffles" ? "▶" : ""}</span>
              <span>{title}</span>
              <span className="flex w-8 justify-end" aria-label="Battery 83%">
                <span className="relative inline-block h-[8px] w-[16px] rounded-[2px] border border-[#1E2A33]">
                  <span className="absolute inset-y-[1px] left-[1px] w-[79%] rounded-[1px] bg-gradient-to-b from-[#9BD36A] to-[#4E9A2A]" />
                </span>
              </span>
            </div>

            {view === "main" || view === "podcasts" ? (
              <ul className="text-[13px]">
                {rows.map((row, i) => (
                  <li key={row.key}>
                    <button
                      type="button"
                      disabled={row.disabled}
                      onClick={() => {
                        setSel(i);
                        select(i);
                      }}
                      className={`flex w-full items-center justify-between px-2 py-[3px] text-left font-bold ${
                        i === sel && !row.disabled
                          ? "bg-gradient-to-b from-[#6FA3EF] to-[#2D63C8] text-white"
                          : row.disabled
                            ? "text-[#9AA7B0]"
                            : ""
                      }`}
                    >
                      <span className="truncate">{row.label}</span>
                      {row.arrow ? <span aria-hidden>›</span> : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : view === "now" && current ? (
              <NowPlaying
                index={playing}
                total={podcasts.length}
                title={current.title}
                subtitle={current.dek}
                time="12:34"
                left="-31:02"
                progress={0.28}
              />
            ) : (
              <NowPlaying
                index={0}
                total={1}
                title="Squeaky Toy (Extended Mix)"
                subtitle="Truffles · Walkies, Vol. 1"
                time="4:20"
                left="-∞"
                progress={0.62}
              />
            )}
          </div>

          {/* click wheel */}
          <div
            className="relative mx-auto mt-[12%] aspect-square w-[78%] touch-none select-none rounded-full bg-gradient-to-br from-[#F1E7D4] to-[#D8C6A6] shadow-[inset_0_1px_3px_rgba(0,0,0,0.18)]"
            onPointerDown={onWheelDown}
            onPointerMove={onWheelMove}
            onPointerUp={onWheelUp}
            onPointerCancel={onWheelUp}
          >
            <WheelButton label="Menu" className="left-1/2 top-[6%] -translate-x-1/2" onClick={back} text="MENU" />
            <WheelButton label="Previous" className="left-[6%] top-1/2 -translate-y-1/2" onClick={() => move(-1)} icon="prev" />
            <WheelButton label="Next" className="right-[6%] top-1/2 -translate-y-1/2" onClick={() => move(1)} icon="next" />
            <WheelButton label="Play" className="bottom-[6%] left-1/2 -translate-x-1/2" onClick={() => select()} icon="play" />
            <button
              type="button"
              aria-label="Select"
              onClick={() => select()}
              className="absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3A2A1C]/60 bg-gradient-to-br from-[#8A6647] to-[#4E3826] shadow-[0_1px_2px_rgba(0,0,0,0.25)] active:from-[#7A5A3E] active:to-[#40301F]"
            />
          </div>
        </div>

        {/* what the podcast is about, off the device */}
        <div className="mt-8 w-full max-w-md text-center">
          {view === "now" && current ? (
            <>
              {note ? <p className="font-serif text-[17px] italic leading-relaxed text-[#C9C2B4]">{note}</p> : null}
              {current.link ? (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block border border-[#A07E55] px-4 py-2 font-mono text-[10px] tracking-[0.28em] text-[#A07E55] transition hover:bg-[#A07E55] hover:text-[#0C0B0A]"
                >
                  LISTEN →
                </a>
              ) : null}
            </>
          ) : view === "truffles" ? (
            <p className="font-serif text-[16px] italic text-[#8E8E93]">On repeat. Truffles approves this playlist.</p>
          ) : (
            <p className="font-mono text-[9px] tracking-[0.24em] text-[#6B6760]">
              SCROLL THE WHEEL, TAP A ROW, OR USE ↑ ↓ ↵
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** The grey marks on the click wheel, drawn rather than typed so they don't turn into emoji. */
const ICONS = {
  prev: "M 9 3 V 13 M 17 3 L 10 8 L 17 13 Z M 24 3 L 17 8 L 24 13 Z",
  next: "M 23 3 V 13 M 15 3 L 22 8 L 15 13 Z M 8 3 L 15 8 L 8 13 Z",
  play: "M 6 3 L 13 8 L 6 13 Z M 17 3 V 13 M 21 3 V 13",
};

function WheelButton({
  label,
  text,
  icon,
  className,
  onClick,
}: {
  label: string;
  text?: string;
  icon?: keyof typeof ICONS;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute flex min-h-8 min-w-8 items-center justify-center px-1 font-sans text-[10px] font-bold tracking-[0.08em] text-[#8C6A45] hover:text-[#4E3826] ${className}`}
    >
      {icon ? (
        <svg viewBox="0 0 30 16" className="h-[10px] w-[19px]" aria-hidden>
          <path d={ICONS[icon]} fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ) : (
        text
      )}
    </button>
  );
}

function NowPlaying({
  index,
  total,
  title,
  subtitle,
  time,
  left,
  progress,
}: {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  time: string;
  left: string;
  progress: number;
}) {
  return (
    <div className="flex h-[calc(100%-20px)] flex-col justify-between px-3 py-2">
      <p className="text-[10px] text-[#51606B]">
        {index + 1} of {total}
      </p>
      <div className="text-center">
        <p className="line-clamp-2 text-[13px] font-bold leading-tight">{title}</p>
        {subtitle ? <p className="mt-1 line-clamp-1 text-[11px] text-[#51606B]">{subtitle}</p> : null}
      </div>
      <div>
        <div className="relative h-[7px] rounded-full border border-[#51606B] bg-white">
          <div className="h-full rounded-full bg-gradient-to-b from-[#6FA3EF] to-[#2D63C8]" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="mt-[2px] flex justify-between text-[9px] text-[#51606B]">
          <span>{time}</span>
          <span>{left}</span>
        </div>
      </div>
    </div>
  );
}
