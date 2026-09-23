"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { ABOUT } from "../content/about";
import { ENTRIES } from "../content/entries";
import { SECTIONS } from "../content/sections";
import type { Entry, PhotoAspect } from "../content/types";
import BookRecommendSlip from "./components/BookRecommendSlip";
import MoodPortrait from "./components/MoodPortrait";
import WishList from "./components/WishList";

const DestinationsRoute = dynamic(() => import("./components/DestinationsRoute"));
const PlayTable = dynamic(() => import("./components/PlayTable"));

const PASSCODE = "comeplay";
const AUTH_KEY = "ooo-auth";

function subscribeAuth(onChange: () => void) {
  window.addEventListener("ooo-auth", onChange);
  return () => window.removeEventListener("ooo-auth", onChange);
}

function getAuthSnapshot() {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

function getServerAuthSnapshot() {
  return false;
}

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="film-grain-layer pointer-events-none fixed inset-0 z-[80] opacity-8"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </div>
  );
}

function PaperOverlay() {
  return (
    <>
      <div
        aria-hidden
        className="vignette pointer-events-none fixed inset-0 z-[1]"
      />
      <div
        aria-hidden
        className="paper-fiber-layer pointer-events-none fixed inset-0 z-[79] opacity-[0.05] mix-blend-screen"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="paper-fiber">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.42"
              numOctaves="3"
              seed="7"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.92  0 0 0 0 0.84  0 0 0 0 0.68  0 0 0 1.4 -0.35"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-fiber)" />
        </svg>
      </div>
    </>
  );
}

function titleCase(text: string) {
  return text.toLowerCase().replace(/(^|\s)(\S)/g, (m) => m.toUpperCase());
}

function PrintFrame({
  src,
  alt,
  aspect = "landscape",
  className = "",
  focus = "center",
}: {
  src: string;
  alt: string;
  aspect?: PhotoAspect;
  className?: string;
  focus?: "center" | "face";
}) {
  const portrait = aspect === "portrait";
  return (
    <figure
      className={`print-tilt group relative -rotate-[0.6deg] border border-[#242220] bg-[#100F0E] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition duration-700 ease-out hover:rotate-0 ${
        portrait ? "mx-auto max-w-sm" : ""
      } ${className}`}
    >
      <span
        aria-hidden
        className="tape absolute -left-3 -top-2 z-10 h-5 w-14 -rotate-[38deg]"
      />
      <span
        aria-hidden
        className="tape absolute -right-3 -top-2 z-10 h-5 w-14 rotate-[38deg]"
      />
      <div className="deckle bg-[#E4DCC8] p-[7px]">
        <div
          className={`relative w-full ${
            portrait ? "aspect-[4/5]" : "aspect-[3/2]"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 92vw, 640px"
            quality={75}
            className={`${
              focus === "face" ? "object-[center_30%]" : "object-center"
            } object-cover sepia-[0.45] contrast-[1.08] brightness-[0.94] transition duration-1000 ease-out group-hover:sepia-0 group-hover:contrast-100 group-hover:brightness-100`}
          />
        </div>
      </div>
    </figure>
  );
}

type Spine = {
  h: number;
  w: number;
  cloth: string;
  ink: string;
  bands: 1 | 2;
};

const SPINES: Spine[] = [
  { h: 176, w: 34, cloth: "#3B4654", ink: "#D9D1BF", bands: 2 },
  { h: 188, w: 42, cloth: "#6B5236", ink: "#E6DCC6", bands: 1 },
  { h: 158, w: 30, cloth: "#B8AD95", ink: "#2A2520", bands: 2 },
  { h: 182, w: 38, cloth: "#2E3E34", ink: "#D9D1BF", bands: 1 },
  { h: 166, w: 44, cloth: "#7E5A3F", ink: "#EAE0CA", bands: 2 },
  { h: 172, w: 36, cloth: "#5A5247", ink: "#E2D9C5", bands: 1 },
  { h: 150, w: 40, cloth: "#46504A", ink: "#DCD4C1", bands: 2 },
  { h: 186, w: 32, cloth: "#2B2825", ink: "#C9B79A", bands: 2 },
  { h: 162, w: 42, cloth: "#A89E88", ink: "#2A2520", bands: 1 },
  { h: 178, w: 36, cloth: "#2F3847", ink: "#D9D1BF", bands: 2 },
];

function BookSpine({
  entry,
  spine,
  lean,
  onOpen,
}: {
  entry: Entry;
  spine: Spine;
  lean?: boolean;
  onOpen: (entry: Entry) => void;
}) {
  const [sec, sub] = entry.index.split(".");
  const band = (
    <span
      aria-hidden
      className={`mx-[3px] block border-[#A07E55]/70 ${
        spine.bands === 2 ? "h-[5px] border-y" : "h-[3px] border-y-2"
      }`}
    />
  );
  return (
    <li className={lean ? "mr-[13px]" : ""}>
      <button
        type="button"
        onClick={() => onOpen(entry)}
        aria-label={`${entry.title} — open`}
        title={entry.title}
        className={`book book-cloth flex flex-col justify-between py-2 ${lean ? "book-lean" : ""}`}
        style={{
          height: spine.h,
          width: spine.w,
          backgroundColor: spine.cloth,
          color: spine.ink,
        }}
      >
        <span className="flex flex-col gap-[3px]">
          {band}
          {spine.bands === 2 && band}
        </span>
        <span className="font-sc mx-auto min-h-0 overflow-hidden text-[13px] leading-none tracking-[0.08em] [writing-mode:vertical-rl]">
          Untitled
        </span>
        <span className="flex flex-col gap-[5px]">
          <span className="flex flex-col items-center font-mono text-[8px] leading-[1.15] tracking-[0.04em] opacity-80">
            <span>{sec}</span>
            <span>.{sub}</span>
          </span>
          {band}
        </span>
      </button>
    </li>
  );
}

function Bookshelf({
  entries,
  onOpen,
}: {
  entries: Entry[];
  onOpen: (entry: Entry) => void;
}) {
  const half = Math.ceil(entries.length / 2);
  const top = entries.slice(0, half);
  const bottom = entries.slice(half);
  const spineFor = (i: number) => SPINES[i % SPINES.length];

  return (
    <div className="bookcase w-full min-w-0 border border-[#242220] px-2 pt-2 sm:px-3">
      <div className="shelf-row">
        <div className="shelf-back flex items-end gap-3 overflow-x-auto overflow-y-hidden px-2 pt-6 sm:px-3">
          <span aria-hidden className="bookend shrink-0" />
          <ul className="flex shrink-0 items-end gap-[2px]">
            {top.map((entry, i) => (
              <BookSpine
                key={entry.id}
                entry={entry}
                spine={spineFor(i)}
                onOpen={onOpen}
              />
            ))}
          </ul>
          <span aria-hidden className="ml-auto flex shrink-0 flex-col items-center">
            <span className="book-flat h-[11px] w-[58px] bg-[#4A4A3A]" />
            <span className="book-flat h-[14px] w-[66px] bg-[#3B4654]" />
            <span className="book-flat h-[10px] w-[62px] bg-[#8C7D63]" />
          </span>
        </div>
        <div aria-hidden className="shelf-plank" />
      </div>
      <div className="shelf-row mt-2">
        <div className="shelf-back flex items-end overflow-x-auto overflow-y-hidden px-2 pt-6 sm:px-3">
          <BookRecommendSlip />
          <ul className="ml-auto flex shrink-0 items-end gap-[2px]">
            {bottom.map((entry, i) => (
              <BookSpine
                key={entry.id}
                entry={entry}
                spine={spineFor(half + i)}
                lean={i === 0}
                onOpen={onOpen}
              />
            ))}
          </ul>
          <span aria-hidden className="bookend ml-[2px] shrink-0" />
        </div>
        <div aria-hidden className="shelf-plank" />
      </div>
    </div>
  );
}

export default function Home() {
  const authed = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [active, setActive] = useState<Entry | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  const bySection = useMemo(() => {
    return SECTIONS.map((section) => ({
      ...section,
      entries: ENTRIES.filter((e) => e.section === section.id),
    }));
  }, []);

  const prints = active
    ? active.images?.length
      ? active.images.map((src, i) => ({
          src,
          alt: active.imageAlts?.[i] ?? `${active.title} ${i + 1}`,
          aspect: active.imageAspects?.[i] ?? ("landscape" as const),
          focus: "center" as const,
        }))
      : active.image
        ? [
            {
              src: active.image,
              alt: active.imageAlt ?? active.title,
              aspect: active.imageAspect,
              focus: "face" as const,
            },
          ]
        : []
    : [];

  function unlock(e: FormEvent) {
    e.preventDefault();
    if (pass.trim().toLowerCase() === PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, "1");
      window.dispatchEvent(new Event("ooo-auth"));
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div className="relative min-h-full bg-[#0C0B0A] text-[#EAE5D9]">
      <GrainOverlay />
      <PaperOverlay />

      {!authed && (
        <div className="gate-veil fixed inset-0 z-[70] flex items-center justify-center bg-[#0C0B0A] p-6">
          <form
            onSubmit={unlock}
            className="w-full max-w-md border-[3px] border-double border-[#34302B] bg-[#141312] p-6 sm:p-8"
          >
            <h1 className="font-serif text-3xl leading-tight tracking-tight">
              Otherwise Occupied
            </h1>
            <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.14em] text-[#8E8E93] sm:tracking-[0.18em]">
              RESTRICTED READING ROOM — ENTER PASSPHRASE
            </p>
            <label htmlFor="passcode" className="sr-only">
              Passcode
            </label>
            <input
              id="passcode"
              type="password"
              autoFocus
              value={pass}
              onChange={(ev) => {
                setPass(ev.target.value);
                setError(false);
              }}
              className="mt-8 w-full border border-[#242220] bg-[#0C0B0A] px-3 py-3 font-mono text-base tracking-[0.2em] text-[#EAE5D9] outline-none focus:border-[#A07E55]"
              placeholder="············"
            />
            {error && (
              <p className="mt-3 font-mono text-[11px] tracking-widest text-[#A07E55]">
                ACCESS DENIED — CHECK THE STAMP
              </p>
            )}
            <button
              type="submit"
              className="mt-6 w-full border border-[#A07E55] px-4 py-3 font-mono text-[11px] tracking-[0.32em] text-[#A07E55] transition hover:bg-[#A07E55] hover:text-[#0C0B0A]"
            >
              OPEN THE VOLUME
            </button>
          </form>
        </div>
      )}

      <header className="relative z-10 border-b-[3px] border-double border-[#34302B] px-5 py-10 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="max-w-[11ch] font-serif text-[clamp(2.35rem,8.5vw,4.5rem)] leading-[0.9] tracking-[-0.03em]">
              Otherwise Occupied
            </h1>
          </div>
          <div className="flex shrink-0 flex-col gap-3 md:mb-3 md:items-end">
            <button
              type="button"
              onClick={() => setActive(ABOUT)}
              className="font-mono text-[10px] tracking-[0.22em] text-[#8E8E93] transition hover:text-[#A07E55] md:text-right"
            >
              [ 00 / ABOUT ]
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 grid grid-cols-1 md:grid-cols-2">
        {bySection.map((section, i) => {
          const isLast = i === bySection.length - 1;
          const spansRow = isLast && i % 2 === 0;
          return (
            <section
              key={section.id}
              className={`ruled-paper min-w-0 border-double border-[#34302B] p-5 sm:p-8 lg:p-10 ${
                isLast ? "" : "border-b-[3px]"
              } ${spansRow ? "md:col-span-2" : i % 2 === 0 ? "md:border-r-[3px]" : ""}`}
            >
              <div className="mb-8 border-b border-[#242220] pb-4">
                <h2 className="font-sc text-left text-3xl sm:text-4xl">
                  {titleCase(section.title)}
                </h2>
              </div>
              <p className="mb-8 max-w-sm text-left font-serif text-[15px] leading-relaxed text-[#8E8E93]">
                {section.rubric}
              </p>
              {section.id === "destinations" ? (
                <DestinationsRoute entries={section.entries} onOpen={setActive} />
              ) : section.id === "play" ? (
                <PlayTable entries={section.entries} onOpen={setActive} />
              ) : section.id === "next" ? (
                <WishList entries={section.entries} onOpen={setActive} />
              ) : section.id === "mood" ? (
                <MoodPortrait entries={section.entries} onOpen={setActive} />
              ) : section.id === "bookshelf" ? (
                <Bookshelf entries={section.entries} onOpen={setActive} />
              ) : (
              <ul className="space-y-3">
                {section.entries.map((entry) => {
                  const [sec, sub] = entry.index.split(".");
                  return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => setActive(entry)}
                      className="group relative flex w-full items-start gap-4 border border-[#211F1C] bg-[#0F0E0D]/80 px-4 pb-3 pt-6 text-left transition duration-500 hover:-translate-y-0.5 hover:border-[#34302B] hover:bg-[#13120F]"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-x-4 top-3 h-px bg-[#A07E55]/30"
                      />
                      <span className="mt-0.5 flex w-10 shrink-0 flex-col font-mono text-[10px] leading-snug tracking-widest">
                        <span className="text-[#6B6760]">OO</span>
                        <span className="text-[#A07E55]">{sec}</span>
                        <span className="text-[#A07E55]">.{sub}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-serif text-xl leading-tight transition-colors duration-300 group-hover:text-[#A07E55]">
                            {entry.title}
                          </span>
                          <time className="font-mono text-[10px] tracking-[0.18em] text-[#8E8E93]">
                            {entry.date}
                          </time>
                        </span>
                        {entry.place && (
                          <span className="mt-1 block font-mono text-[10px] tracking-[0.16em] text-[#8E8E93]">
                            {entry.place}
                          </span>
                        )}
                        <span className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-serif text-sm leading-relaxed text-[#8E8E93]">
                            {entry.dek}
                          </span>
                          {entry.tags.length > 0 && (
                            <span className="pencil text-[13px]">
                              {entry.tags.join(", ")}
                            </span>
                          )}
                        </span>
                        <span className="mt-3 block text-center font-mono text-[9px] tracking-[0.3em] text-[#6B6760]">
                          — {entry.index} —
                        </span>
                      </span>
                    </button>
                  </li>
                  );
                })}
              </ul>
              )}
            </section>
          );
        })}
      </main>

      <footer className="relative z-10 border-t-[3px] border-double border-[#34302B]" />

      {active && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <button
            type="button"
            aria-label="Close drawer"
            className="drawer-veil absolute inset-0 bg-black/80 sm:bg-black/75 sm:backdrop-blur-md"
            onClick={() => setActive(null)}
          />
          <aside className="drawer-panel relative z-10 flex h-full w-full max-w-2xl min-w-0 flex-col overflow-y-auto overflow-x-hidden border-l border-[#242220] bg-[#141312]">
            <div className="stagger p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-10">
              <div className="flex items-start justify-between gap-4 border-b-[3px] border-double border-[#34302B] pb-4">
                <p className="font-mono text-[10px] tracking-[0.28em] text-[#A07E55]">
                  {active.stamp ??
                    `${active.index} / ${active.section.toUpperCase()}`}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="min-h-11 px-2 font-mono text-[10px] tracking-[0.24em] text-[#8E8E93] hover:text-[#EAE5D9]"
                >
                  CLOSE
                </button>
              </div>
              {active.place && (
                <p className="mt-6 block font-mono text-[11px] tracking-[0.2em] text-[#8E8E93]">
                  {active.place}
                </p>
              )}
              {active.date ? (
                <div className="mt-6">
                  <time className="date-stamp font-mono text-[11px] font-bold tracking-[0.22em]">
                    {active.date}
                  </time>
                </div>
              ) : null}
              <h3 className="mt-6 font-serif text-[clamp(2rem,8vw,3rem)] leading-[1.05] tracking-tight sm:text-5xl">
                {active.title}
              </h3>
              {active.dek ? (
                <p className="mt-4 font-serif text-lg italic leading-relaxed text-[#8E8E93]">
                  {active.dek}
                </p>
              ) : null}
              {prints.length > 0 && (
                <div
                  className={`mt-8 ${
                    prints.length > 1 ? "flex flex-col gap-7" : ""
                  }`}
                >
                  {prints.map((print) => (
                    <PrintFrame
                      key={print.src}
                      src={print.src}
                      alt={print.alt}
                      aspect={print.aspect}
                      focus={print.focus}
                    />
                  ))}
                </div>
              )}
              <div
                className={`mt-8 space-y-5 font-serif text-[17px] ${
                  active.stamp
                    ? "leading-relaxed text-[#EAE5D9]"
                    : "leading-[1.7]"
                }`}
              >
                {active.body.split("\n\n").map((para, idx) => (
                  <p
                    key={para.slice(0, 24)}
                    className={
                      idx === 0 && /^[A-Za-z]/.test(para) ? "drop-cap" : ""
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex flex-col items-center gap-2">
                <span aria-hidden className="h-px w-10 bg-[#A07E55]/50" />
                {!active.stamp && (
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#6B6760]">
                    — {active.index} —
                  </span>
                )}
              </div>
              {active.tags.length > 0 && (
                <ul className="mt-10 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-[#242220] px-2 py-1 font-mono text-[9px] tracking-[0.22em] text-[#8E8E93]"
                    >
                      {tag.toUpperCase()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
