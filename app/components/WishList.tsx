"use client";

import { useState, useTransition, type FormEvent } from "react";
import { CONTACT_EMAIL } from "../../content/contact";
import { suggestSomething } from "./recommendBook";
import type { ArchiveEntry } from "./types";
import "./sections.css";

/** A pencil tick for wishes that came true. */
function PencilCheck() {
  return (
    <svg viewBox="0 0 20 20" className="absolute -left-0.5 -top-1.5 h-6 w-6" aria-hidden>
      <path
        d="M 3 11 C 5 12.5 6.5 14.5 7.5 17 C 10 10 13.5 5.5 18.5 2"
        fill="none"
        stroke="#4A4540"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const row = "flex w-full items-start gap-3 sm:gap-5";

export default function WishList<E extends ArchiveEntry>({
  entries,
  onOpen,
}: {
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  const doneCount = entries.filter((e) => e.done).length;
  return (
    <div className="ooo-notepad relative">
      <div aria-hidden className="ooo-notepad-binding" />
      <div className="px-4 pb-5 pt-6 sm:px-6">
        <p className="ooo-notepad-head flex items-baseline justify-between gap-3 pl-9 font-mono text-[9px] tracking-[0.24em] text-[#8C7D63] sm:pl-11">
          <span>THINGS TO TRY</span>
          <span className="font-serif text-[13px] italic tracking-normal text-[#6B5E4E]">
            {doneCount} of {entries.length} done
          </span>
        </p>
        <ol className="ooo-notepad-lines">
          {entries.map((entry) => (
            <li key={entry.id}>
              {/* Only wishes with a note open; the rest are just lines on the pad. */}
              {entry.body ? (
                <button
                  type="button"
                  onClick={() => onOpen(entry)}
                  aria-label={`${entry.title}${entry.done ? " (done)" : ""}. Open`}
                  className={`group ${row} text-left focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#9A3A28]`}
                >
                <span aria-hidden className="relative ml-1 mt-[17px] h-4 w-4 shrink-0 border-[1.5px] border-[#6B5E4E]/70 sm:ml-2">
                  {entry.done ? <PencilCheck /> : null}
                </span>
                <span
                  className={`relative top-[5px] min-w-0 flex-1 pl-3 font-serif text-[19px] italic leading-[40px] text-pretty transition-colors duration-300 sm:pl-4 ${
                    entry.done
                      ? "text-[#6B5E4E] line-through decoration-[#4A4540]/70 decoration-[1.5px]"
                      : "text-[#1E1A16] group-hover:text-[#9A3A28]"
                  }`}
                >
                  {entry.title}
                </span>
                {entry.date ? (
                  <time className="mt-[22px] shrink-0 font-mono text-[9px] leading-none tracking-[0.14em] text-[#8C7D63]">
                    {entry.date}
                  </time>
                ) : null}
                </button>
              ) : (
                <div className={row}>
                <span aria-hidden className="relative ml-1 mt-[17px] h-4 w-4 shrink-0 border-[1.5px] border-[#6B5E4E]/70 sm:ml-2">
                  {entry.done ? <PencilCheck /> : null}
                </span>
                <span
                  className={`relative top-[5px] min-w-0 flex-1 pl-3 font-serif text-[19px] italic leading-[40px] text-pretty transition-colors duration-300 sm:pl-4 ${
                    entry.done
                      ? "text-[#6B5E4E] line-through decoration-[#4A4540]/70 decoration-[1.5px]"
                      : "text-[#1E1A16] group-hover:text-[#9A3A28]"
                  }`}
                >
                  {entry.title}
                </span>
                {entry.date ? (
                  <time className="mt-[22px] shrink-0 font-mono text-[9px] leading-none tracking-[0.14em] text-[#8C7D63]">
                    {entry.date}
                  </time>
                ) : null}
                </div>
              )}
            </li>
          ))}
        </ol>
        <SuggestLine />
      </div>
    </div>
  );
}

const lineInput =
  "h-10 w-full bg-transparent pb-[7px] pt-3 font-serif text-[18px] italic leading-none text-[#1E1A16] outline-none placeholder:text-[#8C7D63]/80";
const padButton =
  "font-mono text-[9px] tracking-[0.24em] text-[#9A3A28] underline-offset-4 hover:underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#9A3A28]";

/** A pencil line at the bottom of the pad where friends can suggest something to try. */
function SuggestLine() {
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

  const suggestRow = "flex min-h-10 items-end gap-3 pl-1 sm:gap-5";
  const plus = (
    <span aria-hidden className="mb-[9px] ml-1 w-4 shrink-0 text-center font-serif text-[18px] leading-none text-[#9A3A28] sm:ml-2">
      +
    </span>
  );

  if (mode === "closed") {
    return (
      <button type="button" onClick={() => setMode("open")} className="group flex w-full items-start gap-3 pl-1 text-left sm:gap-5">
        <span aria-hidden className="ml-1 mt-[11px] w-4 shrink-0 text-center font-serif text-[18px] leading-none text-[#9A3A28] sm:ml-2">
          +
        </span>
        <span className="relative top-[5px] pl-3 font-serif text-[17px] italic leading-[40px] text-balance text-[#6B5E4E] group-hover:text-[#9A3A28] sm:pl-4">
          suggest something for me to try. I trust you!
        </span>
      </button>
    );
  }

  if (mode === "sent" || mode === "fallback") {
    return (
      <div role="status" className="pb-2">
        <div className={suggestRow}>
          {plus}
          <p className="pb-[7px] pl-3 font-serif text-[17px] italic leading-none text-[#1E1A16] sm:pl-4">
            {mode === "sent" ? "Noted! Thank you, it's in my inbox." : "Couldn't send it automatically."}
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 pl-9 sm:pl-12">
          {mode === "fallback" ? (
            <>
              <a href={mailto} className={padButton}>
                EMAIL IT
              </a>
              <button
                type="button"
                className={padButton}
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
          <button type="button" onClick={again} className={padButton}>
            SUGGEST ANOTHER
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="pb-2">
      <div className={suggestRow}>
        {plus}
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
          className={`${lineInput} pl-3 sm:pl-4`}
        />
      </div>
      <div className="pl-9 sm:pl-12">
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
        <div className="flex h-10 items-end justify-between gap-4 pb-[7px]">
          <button type="button" onClick={() => setMode("closed")} className={`${padButton} text-[#6B5E4E]`}>
            NEVER MIND
          </button>
          <button type="submit" disabled={sending} className={`${padButton} disabled:opacity-60`}>
            {sending ? "SENDING…" : "ADD TO THE LIST →"}
          </button>
        </div>
      </div>
    </form>
  );
}
