"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import "./sections.css";

/** Where visitor book recommendations are sent. Change this to your address. */
export const RECOMMEND_EMAIL = "shwetagohil9@gmail.com";

type Slip = { title: string; author: string; why: string; name: string };

const EMPTY: Slip = { title: "", author: "", why: "", name: "" };

function mailtoFor(slip: Slip) {
  const subject = `Book recommendation: ${slip.title}`;
  const body = [
    `Title: ${slip.title}`,
    `Author: ${slip.author || "—"}`,
    "",
    "Why you should read it:",
    slip.why || "—",
    "",
    `— ${slip.name || "A visitor to the reading room"}`,
  ].join("\n");
  return `mailto:${RECOMMEND_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
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
    <div className="grid gap-1 sm:grid-cols-[92px_minmax(0,1fr)] sm:items-end sm:gap-3">
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

export default function BookRecommendSlip() {
  const [open, setOpen] = useState(false);

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
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="ooo-request-card mb-0 mr-4 flex h-[92px] w-[78px] shrink-0 flex-col justify-between bg-[#E4DCC8] px-1.5 py-2 text-left text-[#1E1A16] focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[#A07E55]"
      >
        <span className="block border-b border-[#5A5247]/50 pb-1 font-mono text-[6px] leading-tight tracking-[0.18em] text-[#5A5247]">
          REQUEST CARD
        </span>
        <span className="font-sc block text-[11px] leading-[1.1]">
          Recommend a book
        </span>
        <span className="block font-mono text-[6px] tracking-[0.16em] text-[#A07E55]">
          OO / 03
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Recommend a book"
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
                  03 / BOOKSHELF
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

function SlipForm() {
  const [slip, setSlip] = useState<Slip>(EMPTY);
  const [sent, setSent] = useState<string | null>(null);

  const set =
    (key: keyof Slip) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSlip((s) => ({ ...s, [key]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!slip.title.trim()) return;
    const href = mailtoFor(slip);
    setSent(href);
    window.location.href = href;
  }

  const inputClass =
    "ooo-slip-input w-full bg-transparent px-1 py-1 font-serif text-[16px] text-[#1E1A16] outline-none placeholder:text-[#8C7D63]/70";

  return (
    <div className="ooo-slip relative mt-8 px-5 pb-5 pt-4 text-[#1E1A16] sm:px-6">
      <div className="flex items-baseline justify-between gap-4 border-b-[3px] border-double border-[#5A5247]/60 pb-2">
        <p className="font-mono text-[9px] tracking-[0.26em] text-[#5A5247]">
          REQUEST FOR ACQUISITION
        </p>
        <p className="font-mono text-[9px] tracking-[0.2em] text-[#5A5247]">
          OO / 03 / —
        </p>
      </div>
      <p className="font-sc mt-3 text-xl leading-tight">Recommend a book</p>

      {sent ? (
        <div className="relative py-6" role="status">
          <span className="ooo-received font-mono">RECEIVED</span>
          <p className="mt-6 font-serif text-[15px] italic leading-relaxed text-[#3A332B]">
            Your slip has been filed. Thank you for adding to the shelf.
          </p>
          <p className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.14em] text-[#5A5247]">
            MAIL DIDN&rsquo;T OPEN?{" "}
            <a
              href={sent}
              className="underline decoration-[#A07E55] underline-offset-2 hover:text-[#1E1A16]"
            >
              SEND IT BY HAND
            </a>
          </p>
          <button
            type="button"
            onClick={() => {
              setSlip(EMPTY);
              setSent(null);
            }}
            className="mt-5 border border-[#5A5247]/60 px-3 py-2 font-mono text-[9px] tracking-[0.26em] text-[#3A332B] transition hover:border-[#1E1A16] hover:text-[#1E1A16] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#1E1A16]"
          >
            FILL ANOTHER SLIP
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <Field id="rec-title" label="TITLE *">
            <input
              id="rec-title"
              required
              value={slip.title}
              onChange={set("title")}
              className={inputClass}
            />
          </Field>
          <Field id="rec-author" label="AUTHOR">
            <input
              id="rec-author"
              value={slip.author}
              onChange={set("author")}
              className={inputClass}
            />
          </Field>
          <Field id="rec-why" label="WHY I SHOULD READ IT">
            <textarea
              id="rec-why"
              rows={3}
              value={slip.why}
              onChange={set("why")}
              className={`${inputClass} ooo-slip-lines resize-none`}
            />
          </Field>
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
              * REQUIRED · OPENS YOUR MAIL APP
            </span>
            <button
              type="submit"
              className="border border-[#1E1A16] px-4 py-2 font-mono text-[10px] tracking-[0.28em] text-[#1E1A16] transition hover:bg-[#1E1A16] hover:text-[#E4DCC8] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#1E1A16]"
            >
              FILE THE REQUEST
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
