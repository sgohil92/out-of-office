"use client";

import { useState, useTransition, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { CONTACT_EMAIL } from "../../content/contact";
import { suggestSomething } from "./recommendBook";
import type { ArchiveEntry } from "./types";
import "./sections.css";

const TILTS = [-0.6, 0.5, -0.3, 0.7, -0.5];

/** One typed index card. Done wishes get a CHECKED OUT stamp. */
function IndexCard({
  number,
  tilt,
  done,
  children,
}: {
  number: string;
  tilt: number;
  done?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="ooo-index-card relative rotate-(--tilt) px-4 pb-5 pt-2.5 sm:px-5"
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
    >
      <p className="flex justify-between font-mono text-[9px] tracking-[0.22em] text-[#8C7D63]">
        <span>{number}</span>
        <span>{done ? "" : "ON HOLD"}</span>
      </p>
      <div aria-hidden className="mt-1.5 h-px bg-[#B5482F]/60" />
      <div className="relative mt-2">{children}</div>
      {done ? (
        <span
          aria-hidden
          className="ooo-rubber-stamp ooo-checked-out absolute right-3 top-7 font-mono text-[9px] font-bold tracking-[0.2em] sm:right-5"
        >
          CHECKED OUT
        </span>
      ) : null}
      <span aria-hidden className="ooo-card-hole absolute bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" />
    </div>
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
    <div className="ooo-catalog">
      {/* the drawer front */}
      <div className="ooo-catalog-front flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-5">
        <span className="ooo-catalog-plate px-3 py-1 font-mono text-[9px] tracking-[0.26em] text-[#2A2520]">
          THINGS TO TRY
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-[#E4D3B4]/80">
          {doneCount} OF {entries.length} CHECKED OUT
        </span>
      </div>

      {/* the cards inside */}
      <ol className="ooo-catalog-well space-y-2.5 px-3 pb-4 pt-4 sm:px-4">
        {entries.map((entry, i) => {
          const card = (
            <IndexCard number={entry.index} tilt={TILTS[i % TILTS.length]} done={entry.done}>
              <p
                className={`font-mono text-[14px] leading-snug text-pretty sm:text-[15px] ${
                  entry.done ? "pr-28 text-[#6B5E4E]" : "text-[#1E1A16]"
                }`}
              >
                {entry.title}
              </p>
            </IndexCard>
          );
          return (
            <li key={entry.id}>
              {/* Only wishes with a note open; the rest are just cards in the drawer. */}
              {entry.body ? (
                <button
                  type="button"
                  onClick={() => onOpen(entry)}
                  aria-label={`${entry.title}${entry.done ? " (done)" : ""}. Open`}
                  className="block w-full text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#9A3A28]"
                >
                  {card}
                </button>
              ) : (
                card
              )}
            </li>
          );
        })}
        <li>
          <SuggestCard tilt={TILTS[entries.length % TILTS.length]} />
        </li>
      </ol>
    </div>
  );
}

const lineInput =
  "ooo-card-line w-full bg-transparent py-1.5 font-mono text-[14px] text-[#1E1A16] outline-none placeholder:text-[#8C7D63]/80";
const cardButton =
  "font-mono text-[9px] tracking-[0.24em] text-[#9A3A28] underline-offset-4 hover:underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#9A3A28]";

/** The blank card at the back of the drawer: friends suggest something to try. */
function SuggestCard({ tilt }: { tilt: number }) {
  const [mode, setMode] = useState<"closed" | "open" | "sent" | "fallback">("closed");
  const [tip, setTip] = useState({ idea: "", why: "", name: "", website: "" });
  const [copied, setCopied] = useState(false);
  const [sending, startSending] = useTransition();

  const text = [`Try: ${tip.idea}`, ...(tip.why ? ["", tip.why] : []), "", `— ${tip.name || "A visitor"}`].join("\n");
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Something to try: ${tip.idea}`)}&body=${encodeURIComponent(text)}`;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!tip.idea.trim() || sending) return;
    startSending(async () => {
      try {
        const result = await suggestSomething(tip);
        setMode(result.ok ? "sent" : "fallback");
      } catch {
        setMode("fallback");
      }
    });
  }

  function again() {
    setTip({ idea: "", why: "", name: "", website: "" });
    setCopied(false);
    setMode("open");
  }

  if (mode === "closed") {
    return (
      <button
        type="button"
        onClick={() => setMode("open")}
        className="ooo-blank-card group block w-full rotate-(--tilt) px-4 py-4 text-left sm:px-5"
        style={{ "--tilt": `${tilt}deg` } as CSSProperties}
      >
        <span className="block font-serif text-[16px] italic text-balance text-[#C9B79A] group-hover:text-[#F3EAD6]">
          <span className="mr-2 not-italic text-[#E3C77F]">+</span>
          suggest something for me to try. I trust you!
        </span>
      </button>
    );
  }

  return (
    <IndexCard number="NEW CARD" tilt={tilt}>
      {mode === "sent" || mode === "fallback" ? (
        <div role="status">
          <p className="font-mono text-[14px] text-[#1E1A16]">
            {mode === "sent" ? "Filed. Thank you, it's in my inbox." : "Couldn't send it automatically."}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {mode === "fallback" ? (
              <>
                <a href={mailto} className={cardButton}>
                  EMAIL IT
                </a>
                <button
                  type="button"
                  className={cardButton}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\n\n${text}`);
                      setCopied(true);
                    } catch {}
                  }}
                >
                  {copied ? "COPIED" : "COPY IT"}
                </button>
              </>
            ) : null}
            <button type="button" onClick={again} className={cardButton}>
              SUGGEST ANOTHER
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label htmlFor="wish-idea" className="sr-only">
            What should I try?
          </label>
          <input
            id="wish-idea"
            autoFocus
            required
            maxLength={200}
            value={tip.idea}
            onChange={(e) => setTip((t) => ({ ...t, idea: e.target.value }))}
            placeholder="What should I try?"
            className={lineInput}
          />
          <label htmlFor="wish-why" className="sr-only">
            Why, or where? (optional)
          </label>
          <input
            id="wish-why"
            maxLength={1000}
            value={tip.why}
            onChange={(e) => setTip((t) => ({ ...t, why: e.target.value }))}
            placeholder="Why, or where? (optional)"
            className={lineInput}
          />
          <label htmlFor="wish-name" className="sr-only">
            Your name (optional)
          </label>
          <input
            id="wish-name"
            maxLength={100}
            value={tip.name}
            onChange={(e) => setTip((t) => ({ ...t, name: e.target.value }))}
            placeholder="Your name (optional)"
            className={lineInput}
          />
          {/* Hidden from people; catches bots that fill in every field. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={tip.website}
            onChange={(e) => setTip((t) => ({ ...t, website: e.target.value }))}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <button type="button" onClick={() => setMode("closed")} className={`${cardButton} text-[#6B5E4E]`}>
              NEVER MIND
            </button>
            <button type="submit" disabled={sending} className={`${cardButton} disabled:opacity-60`}>
              {sending ? "FILING…" : "FILE THE CARD →"}
            </button>
          </div>
        </form>
      )}
    </IndexCard>
  );
}
