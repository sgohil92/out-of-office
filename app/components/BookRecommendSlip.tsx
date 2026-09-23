"use client";

import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CONTACT_EMAIL } from "../../content/contact";
import { recommendBook, type Slip } from "./recommendBook";
import "./sections.css";

const EMPTY: Slip = { title: "", author: "", why: "", name: "", website: "" };

function slipText(slip: Slip) {
  return [
    `Title: ${slip.title}`,
    `Author / host: ${slip.author || "—"}`,
    "",
    "Why:",
    slip.why || "—",
    "",
    `— ${slip.name || "A visitor to the reading room"}`,
  ].join("\n");
}

function mailtoFor(slip: Slip) {
  const subject = `Recommendation: ${slip.title}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(slipText(slip))}`;
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-end sm:gap-3">
      <label
        htmlFor={id}
        className="font-mono text-[9px] tracking-[0.22em] text-[#5A5247]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function BookRecommendSlip({
  open: openProp,
  onOpenChange,
}: {
  /** Optional: control it from outside (the iPod's "Recommend one" opens it too). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const [innerOpen, setInnerOpen] = useState(false);
  const open = openProp ?? innerOpen;
  const setOpen = onOpenChange ?? setInnerOpen;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, setOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="ooo-request-card mb-0 mr-4 flex h-[112px] w-[94px] shrink-0 flex-col justify-between bg-[#E4DCC8] px-2 py-2.5 text-left text-[#1E1A16] focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[#A07E55]"
      >
        <span className="block border-b border-[#5A5247]/50 pb-1 font-mono text-[7px] leading-tight tracking-[0.18em] text-[#5A5247]">
          REQUEST CARD
        </span>
        <span className="font-sc block text-[12px] leading-[1.1]">
          Recommend a book or podcast
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Recommend a book or podcast"
          >
            <button
              type="button"
              aria-label="Close recommendation form"
              className="drawer-veil absolute inset-0 bg-black/80 sm:bg-black/75 sm:backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <aside className="drawer-panel relative z-10 flex h-full w-full max-w-md min-w-0 flex-col overflow-y-auto overflow-x-hidden border-l border-[#242220] bg-[#141312] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8">
              <div className="flex items-start justify-between gap-4 border-b-[3px] border-double border-[#34302B] pb-4">
                <p className="font-mono text-[10px] tracking-[0.28em] text-[#A07E55]">
                  SHELF
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="min-h-11 px-2 font-mono text-[10px] tracking-[0.24em] text-[#8E8E93] hover:text-[#EAE5D9]"
                >
                  CLOSE
                </button>
              </div>
              <SlipForm />
            </aside>
          </div>,
          document.body,
        )}
    </>
  );
}

const slipButton =
  "mt-5 inline-block border border-[#5A5247]/60 px-3 py-2 font-mono text-[9px] tracking-[0.26em] text-[#3A332B] transition hover:border-[#1E1A16] hover:text-[#1E1A16] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#1E1A16]";

function SlipForm() {
  const [slip, setSlip] = useState<Slip>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sent" | "fallback">("idle");
  const [copied, setCopied] = useState(false);
  const [sending, startSending] = useTransition();

  const set =
    (key: keyof Slip) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSlip((s) => ({ ...s, [key]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!slip.title.trim() || sending) return;
    startSending(async () => {
      try {
        const result = await recommendBook(slip);
        setStatus(result.ok ? "sent" : "fallback");
      } catch {
        setStatus("fallback");
      }
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\n\n${slipText(slip)}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setSlip(EMPTY);
    setStatus("idle");
    setCopied(false);
  }

  const inputClass =
    "ooo-slip-input w-full bg-transparent px-1 py-1 font-serif text-[16px] text-[#1E1A16] outline-none placeholder:text-[#8C7D63]/70";

  return (
    <div className="ooo-slip relative mt-8 px-5 pb-5 pt-4 text-[#1E1A16] sm:px-6">
      <div className="flex items-baseline justify-between gap-4 border-b-[3px] border-double border-[#5A5247]/60 pb-2">
        <p className="font-mono text-[9px] tracking-[0.26em] text-[#5A5247]">
          REQUEST FOR ACQUISITION
        </p>
      </div>
      <p className="font-sc mt-3 text-xl leading-tight">Recommend a book or podcast</p>

      {status === "sent" ? (
        <div className="relative py-6" role="status">
          <span className="ooo-received font-mono">RECEIVED</span>
          <p className="mt-6 font-serif text-[15px] italic leading-relaxed text-[#3A332B]">
            Your slip has been filed. Thank you for adding to the shelf.
          </p>
          <button type="button" onClick={reset} className={slipButton}>
            FILL ANOTHER SLIP
          </button>
        </div>
      ) : status === "fallback" ? (
        <div className="py-5" role="status">
          <p className="font-mono text-[9px] tracking-[0.22em] text-[#9A3A28]">
            COULDN&rsquo;T FILE IT AUTOMATICALLY
          </p>
          <p className="mt-3 font-serif text-[15px] italic leading-relaxed text-[#3A332B]">
            Nothing&rsquo;s lost. Send it by email instead; it&rsquo;s all written out for you.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={mailtoFor(slip)} className={slipButton.replace("mt-5 ", "")}>
              EMAIL IT
            </a>
            <button type="button" onClick={copy} className={slipButton.replace("mt-5 ", "")}>
              {copied ? "COPIED" : "COPY IT"}
            </button>
          </div>
          <p className="mt-3 font-mono text-[9px] leading-relaxed tracking-[0.12em] text-[#5A5247]">
            TO: {CONTACT_EMAIL}
          </p>
          <button type="button" onClick={reset} className={slipButton}>
            START OVER
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <Field id="rec-title" label="TITLE / SHOW *">
            <input
              id="rec-title"
              required
              value={slip.title}
              onChange={set("title")}
              className={inputClass}
            />
          </Field>
          <Field id="rec-author" label="AUTHOR / HOST">
            <input
              id="rec-author"
              value={slip.author}
              onChange={set("author")}
              className={inputClass}
            />
          </Field>
          <Field id="rec-why" label="WHY I SHOULD READ OR LISTEN">
            <textarea
              id="rec-why"
              rows={3}
              value={slip.why}
              onChange={set("why")}
              className={`${inputClass} ooo-slip-lines resize-none`}
            />
          </Field>
          {/* Hidden from people; catches bots that fill in every field. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={slip.website}
            onChange={set("website")}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <Field id="rec-name" label="YOUR NAME">
            <input
              id="rec-name"
              value={slip.name}
              onChange={set("name")}
              placeholder="optional"
              className={inputClass}
            />
          </Field>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
            <span className="font-mono text-[8px] tracking-[0.2em] text-[#5A5247]">
              * REQUIRED
            </span>
            <button
              type="submit"
              disabled={sending}
              className="border border-[#1E1A16] px-4 py-2 font-mono text-[10px] tracking-[0.28em] text-[#1E1A16] transition hover:bg-[#1E1A16] hover:text-[#E4DCC8] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#1E1A16] disabled:opacity-60"
            >
              {sending ? "FILING…" : "FILE THE REQUEST"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
