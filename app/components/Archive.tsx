"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Entry, PhotoAspect, SectionId, Video } from "../../content/types";
import type { AtlasDrawing } from "../../lib/atlas";
import type { AtlasWords } from "./RoadAtlas";
import type { Invite } from "../../content/invites";
import BookRecommendSlip from "./BookRecommendSlip";
import { IpodOnShelf, IpodPlayer } from "./Ipod";
import InviteTicket from "./InviteTicket";
import Lightbox from "./Lightbox";
import SleepingTruffles from "./SleepingTruffles";
import { formatDate } from "./types";
import type { Painting, StudioNote } from "../../content/studio";
import type { Mood } from "../../content/mood";
import Ponderings from "./Ponderings";
import WishList from "./WishList";

const RoadAtlas = dynamic(() => import("./RoadAtlas"));
const PlayTable = dynamic(() => import("./PlayTable"));
const StudioWall = dynamic(() => import("./StudioWall"));

export type SectionInfo = { id: SectionId; title: string; rubric: string };

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
  caption,
  featured = false,
  stamp,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** Bigger, pinned instead of taped. */
  featured?: boolean;
  /** Red rubber-stamp text over the corner. */
  stamp?: string;
  aspect?: PhotoAspect;
  className?: string;
  focus?: "center" | "face";
}) {
  const portrait = aspect === "portrait";
  return (
    <figure
      className={`print-tilt group relative -rotate-[0.6deg] border border-[#242220] bg-[#100F0E] p-3 shadow-[var(--shadow-float)] transition duration-700 ease-out hover:rotate-0 ${
        portrait ? `mx-auto w-full ${featured ? "max-w-md" : "max-w-sm"}` : ""
      } ${className}`}
    >
      {featured ? (
        <svg viewBox="0 0 20 20" className="absolute -top-3 left-1/2 z-10 h-7 w-7 -translate-x-1/2" aria-hidden>
          <circle cx="10" cy="9" r="6.5" fill="#9A3A28" />
          <circle cx="8" cy="7" r="2.2" fill="#F3EAD6" opacity="0.55" />
          <path d="M 10 15.5 L 10 19.5" stroke="#5E2418" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ) : (
        <>
          <span
            aria-hidden
            className="tape absolute -left-3 -top-2 z-10 h-5 w-14 -rotate-[38deg]"
          />
          <span
            aria-hidden
            className="tape absolute -right-3 -top-2 z-10 h-5 w-14 rotate-[38deg]"
          />
        </>
      )}
      {stamp ? (
        <span
          aria-hidden
          className="ooo-rubber-stamp ooo-feature-stamp absolute -right-2 bottom-12 z-10 bg-[#F3EAD6]/85 font-mono text-[10px] font-bold tracking-[0.2em] sm:-right-4 sm:text-[11px]"
        >
          {stamp}
        </span>
      ) : null}
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
            } object-cover`}
          />
        </div>
      </div>
      {caption ? (
        <figcaption
          className={`mt-3 text-center font-serif italic ${
            featured ? "text-[16px] text-[#C9C2B4]" : "text-[14px] text-[#8E8E93]"
          }`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}


/** A paw-print postmark for Destinations, like the stop was stamped by the dog. */
function Postmark({ place, date }: { place: string; date: string }) {
  const when = formatDate(date, "postmark") || "· 2026 ·";
  return (
    <svg
      viewBox="0 0 220 104"
      className="mt-6 block w-[200px] -rotate-[7deg] text-[#A07E55]"
      role="img"
      aria-label={`Postmarked ${place}${date ? `, ${when.replaceAll("·", " ").replace(/\s+/g, " ").trim()}` : ""}`}
    >
      <defs>
        <path id="ooo-pm-top" d="M 16 52 A 36 36 0 0 1 88 52" />
        <path id="ooo-pm-bottom" d="M 12 52 A 40 40 0 0 0 92 52" />
      </defs>
      <circle cx="52" cy="52" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="52" cy="52" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
      <text className="font-mono" fontSize="10" letterSpacing="2" fill="currentColor">
        <textPath href="#ooo-pm-top" startOffset="50%" textAnchor="middle">
          {place.toUpperCase()}
        </textPath>
      </text>
      <text className="font-mono" fontSize="8.5" letterSpacing="1.5" fill="currentColor">
        <textPath href="#ooo-pm-bottom" startOffset="50%" textAnchor="middle" dominantBaseline="hanging">
          {when}
        </textPath>
      </text>
      <g transform="translate(52 55)" fill="currentColor">
        <ellipse cx="0" cy="4" rx="8" ry="6.5" />
        <ellipse cx="-9" cy="-5" rx="3" ry="4" transform="rotate(-20 -9 -5)" />
        <ellipse cx="-3.5" cy="-10" rx="3" ry="4" />
        <ellipse cx="3.5" cy="-10" rx="3" ry="4" />
        <ellipse cx="9" cy="-5" rx="3" ry="4" transform="rotate(20 9 -5)" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {[30, 44, 58, 72].map((yy) => (
          <path key={yy} d={`M 106 ${yy} q 9 -6 18 0 t 18 0 t 18 0 t 18 0 t 18 0 t 18 0`} />
        ))}
      </g>
    </svg>
  );
}

function ReelFrame({ video }: { video: Video }) {
  const portrait = video.aspect === "portrait";
  return (
    <figure className={portrait ? "mx-auto w-full max-w-sm" : ""}>
      <video
        src={video.src}
        poster={video.poster}
        controls
        playsInline
        preload="metadata"
        className={`block w-full border-[5px] border-[#E4DCC8] bg-black object-cover shadow-[var(--shadow-float)] ${
          portrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      />
      {video.caption && (
        <figcaption className="mt-3 text-center font-mono text-[10px] tracking-[0.18em] text-[#8E8E93]">
          {video.caption}
        </figcaption>
      )}
    </figure>
  );
}

const GRID_TILTS = [-1.4, 1.1, -0.7, 1.6, -1.1, 0.8];

/** Three or more photos: a two-column scrapbook, each opens full-screen. */
function ScrapbookGrid({
  prints,
  inOrder,
}: {
  prints: { src: string; alt: string; caption?: string }[];
  /** Read left to right, row by row (for dated photos), instead of down each column. */
  inOrder?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <ul
        className={`mt-8 gap-4 px-1 pt-2 sm:gap-6 ${inOrder ? "grid grid-cols-2 items-start" : "columns-2"}`}
      >
        {prints.map((print, i) => (
          <li key={print.src} className="mb-5 break-inside-avoid sm:mb-6">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${print.alt}. Open larger`}
              className="relative block w-full rotate-(--tilt) transition-[rotate,translate] duration-500 hover:-translate-y-1 hover:rotate-0 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#A07E55]"
              style={{ "--tilt": `${GRID_TILTS[i % GRID_TILTS.length]}deg` } as CSSProperties}
            >
              <span aria-hidden className="tape absolute -top-2 left-1/2 z-10 h-4 w-12 -translate-x-1/2 rotate-[-4deg]" />
              <span className="block bg-[#E4DCC8] p-[5px] shadow-[var(--shadow-float)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={print.src} alt={print.alt} loading="lazy" className="block h-auto w-full" />
              </span>
              {print.caption ? (
                <span className="mt-2 block text-center font-serif text-[13px] italic leading-snug text-[#8E8E93]">
                  {print.caption}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
      {open !== null ? (
        <Lightbox
          items={prints.map((p) => ({ src: p.src, alt: p.alt, meta: p.caption }))}
          index={open}
          onMove={setOpen}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
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
        aria-label={`${entry.title}${entry.reading ? " (currently reading)" : ""} — open`}
        title={entry.title}
        className={`book book-cloth relative flex flex-col justify-between py-2 ${lean ? "book-lean" : ""} ${
          entry.reading ? "book-reading" : ""
        }`}
        style={{
          height: spine.h,
          width: spine.w,
          backgroundColor: spine.cloth,
          color: spine.ink,
        }}
      >
        {entry.reading ? <span aria-hidden className="book-ribbon" /> : null}
        <span className="flex flex-col gap-[3px]">
          {band}
          {spine.bands === 2 && band}
        </span>
        <span className="font-sc mx-auto min-h-0 overflow-hidden text-[13px] leading-none tracking-[0.08em] [writing-mode:vertical-rl]">
          {entry.spine ?? entry.title}
        </span>
        {band}
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
  // Books stand on the top shelf; podcasts live on the iPod on the bottom one.
  const books = entries.filter((e) => e.format !== "podcast");
  const podcasts = entries.filter((e) => e.format === "podcast");
  const spineFor = (i: number) => SPINES[i % SPINES.length];
  const [ipodOpen, setIpodOpen] = useState(false);
  const [slipOpen, setSlipOpen] = useState(false);

  return (
    <div className="bookcase w-full min-w-0 border border-[#242220] px-2 pt-2 sm:px-3">
      <div className="shelf-row">
        <div className="shelf-back flex items-end gap-3 overflow-x-auto overflow-y-hidden px-2 pt-6 sm:px-3">
          <span aria-hidden className="bookend shrink-0" />
          <ul className="flex shrink-0 items-end gap-[2px]" aria-label="Books">
            {books.map((entry, i) => (
              <BookSpine
                key={entry.id}
                entry={entry}
                spine={spineFor(i)}
                lean={i === books.length - 1 && books.length > 2}
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
        {/* Not clipped, so the iPod's earbuds can hang down over the shelf's edge */}
        <div className="shelf-back shelf-back-low flex items-end gap-4 overflow-visible px-2 pb-1 pt-6 sm:px-3">
          <BookRecommendSlip open={slipOpen} onOpenChange={setSlipOpen} />
          <div className="relative z-10 ml-auto pr-2">
            <IpodOnShelf podcasts={podcasts} onOpen={() => setIpodOpen(true)} />
          </div>
          {ipodOpen ? (
            <IpodPlayer podcasts={podcasts} onClose={() => setIpodOpen(false)} />
          ) : null}
        </div>
        <div aria-hidden className="shelf-plank" />
      </div>
    </div>
  );
}

/**
 * The whole page. Content arrives as props from app/page.tsx (which runs on
 * the server), so the words are only sent to readers who are signed in.
 */
export default function Archive({
  about,
  entries,
  sections,
  atlas,
  invites,
  studio,
  moods,
}: {
  about: Entry;
  entries: Entry[];
  sections: SectionInfo[];
  atlas: { drawing: AtlasDrawing; words: AtlasWords };
  invites: { list: Invite[]; email: string };
  studio: { paintings: Painting[]; notes: StudioNote[] };
  /** Weekly moods, newest first; the first shows under the title, all are in the archive. */
  moods: Mood[];
}) {
  // The first line of the About note doubles as the welcome under the title.
  const intro = about.body.split("\n\n")[0];
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
    return sections.map((section) => ({
      ...section,
      entries: entries.filter((e) => e.section === section.id),
    }));
  }, [sections, entries]);

  const prints = active
    ? active.images?.length
      ? active.images.map((src, i) => ({
          src,
          alt: active.imageAlts?.[i] ?? `${active.title} ${i + 1}`,
          caption: active.imageCaptions?.[i],
          aspect: active.imageAspects?.[i] ?? ("landscape" as const),
          focus: "center" as const,
        }))
      : active.image
        ? [
            {
              src: active.image,
              alt: active.imageAlt ?? active.title,
              caption: undefined as string | undefined,
              aspect: active.imageAspect,
              focus: "face" as const,
            },
          ]
        : []
    : [];


  const mood = moods[0];
  // The mood archive opens in the drawer like a post, listing every week.
  const moodArchive: Entry = {
    id: "mood-archive",
    section: "about",
    index: "",
    date: "",
    title: "Moods, week by week",
    dek: "",
    body: "",
    tags: [],
    stamp: "[ CURRENT MOOD · ARCHIVE ]",
  };

  // Ponderings (section "mood") open from the typed page on the Play table.
  const ponderings = entries.filter((e) => e.section === "mood");
  const ponderingsEntry = entries.find((e) => e.section === "play" && e.hobby === "writing");

  // Destinations lead with the story; a big set of photos becomes a scrapbook grid.
  // Trips and the market read words-first: the photos then illustrate the story.
  const storyFirst = active?.section === "destinations" || active?.hobby === "market";
  // The About note's first line already greets people under the title, so the drawer starts after it.
  const storyBody =
    active?.id === about.id ? active.body.split("\n\n").slice(1).join("\n\n") : (active?.body ?? "");
  const story = active && (storyBody || active.link) ? (
    <div
      className={`mt-8 space-y-5 font-serif text-[17px] ${
        active.stamp ? "leading-relaxed text-[#EAE5D9]" : "leading-[1.7]"
      }`}
    >
      {storyBody.split("\n\n").filter(Boolean).map((para, idx) =>
        para.startsWith("* ") ? (
          <ul key={para.slice(0, 24)} className="space-y-4 pl-1">
            {para.split(/\n(?=\* )/).map((item) => (
              <li key={item.slice(0, 24)} className="relative pl-6">
                <span aria-hidden className="absolute left-0 top-[0.85em] h-px w-3 bg-[#A07E55]/70" />
                {item.slice(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p key={para.slice(0, 24)} className={idx === 0 && /^[A-Za-z](?!['’])/.test(para) ? "drop-cap" : ""}>
            {para}
          </p>
        ),
      )}
      {active.link ? (
        <p>
          <a
            href={active.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#A07E55] px-4 py-2 font-mono text-[10px] not-italic tracking-[0.28em] text-[#A07E55] transition hover:bg-[#A07E55] hover:text-[#0C0B0A]"
          >
            {active.format === "podcast" ? "LISTEN →" : "MORE →"}
          </a>
        </p>
      ) : null}
    </div>
  ) : null;
  const featuredSrcs = new Set(active?.featured?.map((f) => f.src) ?? []);
  const featuredPrints = (active?.featured ?? []).flatMap((f) => {
    const print = prints.find((p) => p.src === f.src);
    return print ? [{ ...print, stamp: f.stamp }] : [];
  });
  const rest = prints.filter((p) => !featuredSrcs.has(p.src));
  const photos = (
    <>
      {featuredPrints.length > 0 ? (
        <div className="mt-10 flex flex-col gap-10">
          {featuredPrints.map((print) => (
            <PrintFrame
              key={print.src}
              src={print.src}
              alt={print.alt}
              aspect={print.aspect}
              focus={print.focus}
              caption={print.caption}
              featured
              stamp={print.stamp}
            />
          ))}
        </div>
      ) : null}
      {rest.length === 0 ? null : rest.length >= 3 ? (
        <ScrapbookGrid prints={rest} />
      ) : (
        <div className={`mt-8 ${rest.length > 1 ? "flex flex-col gap-7" : ""}`}>
          {rest.map((print) => (
            <PrintFrame
              key={print.src}
              src={print.src}
              alt={print.alt}
              aspect={print.aspect}
              focus={print.focus}
              caption={print.caption}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="relative min-h-full bg-[#0C0B0A] text-[#EAE5D9]">
      <GrainOverlay />
      <PaperOverlay />


      <header className="relative z-10 border-b-[3px] border-double border-[#34302B] px-5 py-10 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h1 className="max-w-[11ch] font-serif text-[clamp(2.35rem,8.5vw,4.5rem)] leading-[0.9] tracking-[-0.03em]">
              Otherwise Engaged
            </h1>
            <p className="mt-5 max-w-md font-serif text-[18px] italic leading-snug text-[#B8B2A6] sm:text-[20px]">
              {intro}
            </p>
            <button
              type="button"
              onClick={() => setActive(about)}
              className="group mt-4 font-mono text-[10px] tracking-[0.22em] text-[#A07E55] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#A07E55]"
            >
              <span className="border-b border-[#A07E55]/40 pb-0.5 transition-colors group-hover:border-[#A07E55]">
                THE BACKSTORY
              </span>{" "}
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            {mood?.text ? (
              // This week's mood: a quiet note, like something said just to you.
              <div className="mt-8 max-w-md border-l border-[#A07E55]/50 pl-4">
                {mood.week ? (
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[#A07E55]/80">
                    CURRENT MOOD · {mood.week.toUpperCase()}
                  </p>
                ) : null}
                <p className="mt-2 font-serif text-[16px] italic leading-relaxed text-[#C9C2B4] sm:text-[17px]">
                  {mood.text}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(moodArchive)}
                  className="mt-3 font-mono text-[10px] tracking-[0.22em] text-[#8E8E93] underline-offset-4 hover:text-[#A07E55] hover:underline"
                >
                  ARCHIVE →
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <InviteTicket invites={invites.list} email={invites.email} />

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
              {section.rubric ? (
                <p className="mb-8 max-w-sm text-left font-serif text-[15px] leading-relaxed text-[#8E8E93]">
                  {section.rubric}
                </p>
              ) : null}
              {section.entries.length === 0 ? (
                <p className="font-mono text-[10px] tracking-[0.24em] text-[#6B6760]">
                  [ FIRST ENTRY FORTHCOMING ]
                </p>
              ) : section.id === "destinations" ? (
                <RoadAtlas
                  drawing={atlas.drawing}
                  words={atlas.words}
                  entries={section.entries}
                  onOpen={setActive}
                />
              ) : section.id === "play" ? (
                <PlayTable
                  entries={section.entries}
                  onOpen={setActive}
                  ponderings={[...ponderings].reverse().map((p) => p.title)}
                />
              ) : section.id === "next" ? (
                <WishList entries={section.entries} onOpen={setActive} />

              ) : section.id === "bookshelf" ? (
                <Bookshelf entries={section.entries} onOpen={setActive} />
              ) : (
              <ul className="space-y-3">
                {section.entries.map((entry) => {
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
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-serif text-xl leading-tight transition-colors duration-300 group-hover:text-[#A07E55]">
                            {entry.title}
                          </span>
                          <time className="font-mono text-[10px] tracking-[0.18em] text-[#8E8E93]">
                            {formatDate(entry.date)}
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

      <footer className="relative z-10 flex flex-col items-center gap-3 border-t-[3px] border-double border-[#34302B] px-5 pb-14 pt-12 text-center">
        <SleepingTruffles />
        <p className="font-serif text-[17px] italic text-[#B8B2A6]">
          Truffles approves this message.
        </p>
      </footer>

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
                    `${sections.find((x) => x.id === active.section)?.title ?? (active.section === "mood" ? "PONDERINGS" : active.section.toUpperCase())}${active.reading ? " · CURRENTLY READING" : ""}`}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="min-h-11 px-2 font-mono text-[10px] tracking-[0.24em] text-[#8E8E93] hover:text-[#EAE5D9]"
                >
                  CLOSE
                </button>
              </div>
              {active.section === "mood" && ponderingsEntry ? (
                <button
                  type="button"
                  onClick={() => setActive(ponderingsEntry)}
                  className="mt-4 font-mono text-[10px] tracking-[0.22em] text-[#8E8E93] hover:text-[#A07E55]"
                >
                  ← ALL PONDERINGS
                </button>
              ) : null}
              {active.place && (
                <p className="mt-6 block font-mono text-[11px] tracking-[0.2em] text-[#8E8E93]">
                  {active.place}
                </p>
              )}
              {active.section === "destinations" ? (
                <Postmark place={active.place ?? active.title} date={active.date} />
              ) : active.date ? (
                <div className="mt-6">
                  <time className="date-stamp font-mono text-[11px] font-bold tracking-[0.22em]">
                    {formatDate(active.date)}
                  </time>
                </div>
              ) : null}
              {/* When the title just repeats the place (e.g. "Hawaii"), the small place line is enough. */}
              <h3
                className={
                  active.place?.trim().toLowerCase() === active.title.trim().toLowerCase()
                    ? "sr-only"
                    : "mt-6 font-serif text-[clamp(2rem,8vw,3rem)] leading-[1.05] tracking-tight sm:text-5xl"
                }
              >
                {active.title}
              </h3>
              {active.dek ? (
                <p className="mt-4 font-serif text-lg italic leading-relaxed text-[#8E8E93]">
                  {active.dek}
                </p>
              ) : null}
              {storyFirst ? story : null}
              {active.videos?.length ? (
                <div
                  className={`mt-8 grid gap-7 ${
                    active.videos.length > 1 && active.videos.every((v) => v.aspect === "portrait")
                      ? "sm:grid-cols-2"
                      : ""
                  }`}
                >
                  {active.videos.map((video) => (
                    <ReelFrame key={video.src} video={video} />
                  ))}
                </div>
              ) : null}
              {photos}
              {active.chapters
                ?.filter((ch) => ch.body || ch.photos.length)
                .map((ch) => (
                  <section key={ch.title} className="mt-14">
                    <h4 className="font-sc flex items-center gap-4 text-[22px] leading-none text-[#EAE5D9]">
                      {ch.title}
                      <span aria-hidden className="h-px flex-1 bg-[#A07E55]/35" />
                    </h4>
                    {ch.body ? (
                      <div className="mt-5 space-y-5 font-serif text-[17px] leading-[1.7]">
                        {ch.body.split("\n\n").map((para) => (
                          <p key={para.slice(0, 24)}>{para}</p>
                        ))}
                      </div>
                    ) : null}
                    {ch.photos.length ? <ScrapbookGrid prints={ch.photos} inOrder /> : null}
                  </section>
                ))}
              {active.section === "play" && active.hobby === "painting" ? (
                <StudioWall paintings={studio.paintings} notes={studio.notes} />
              ) : null}
              {active.id === moodArchive.id ? (
                <ol className="mt-8">
                  {moods.map((m, i) => (
                    <li key={`${m.week}-${i}`} className="border-b border-[#211F1C] py-5">
                      <p className="font-mono text-[9px] tracking-[0.28em] text-[#A07E55]">
                        {m.week.toUpperCase()}
                        {i === 0 ? <span className="ml-2 text-[#6B6760]">· THIS WEEK</span> : null}
                      </p>
                      <p className="mt-2 font-serif text-[17px] italic leading-relaxed text-[#C9C2B4]">{m.text}</p>
                    </li>
                  ))}
                </ol>
              ) : null}
              {active.section === "play" && active.hobby === "writing" ? (
                <Ponderings entries={ponderings} onOpen={setActive} />
              ) : null}
              {storyFirst ? null : story}
              <div className="mt-10 flex flex-col items-center gap-2">
                <span aria-hidden className="h-px w-10 bg-[#A07E55]/50" />
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
