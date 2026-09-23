"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export type LightboxItem = {
  src: string;
  alt: string;
  title?: string;
  /** Small caps line under the title, like "Watercolor + ink". */
  meta?: string;
  /** Shown in pencil beside the picture. */
  note?: string;
};

/** A full-screen close-up of one picture, with previous/next. Esc closes just this. */
export default function Lightbox({
  items,
  index,
  onMove,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  onMove: (i: number) => void;
  onClose: () => void;
}) {
  const p = items[index];
  const many = items.length > 1;
  const go = (d: number) => onMove((index + d + items.length) % items.length);
  const hasText = Boolean(p.title || p.meta || p.note);

  // Esc closes the close-up first, not the whole drawer behind it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      } else if (many && e.key === "ArrowRight") go(1);
      else if (many && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });

  // Rendered on the page itself so it covers the whole screen, not just the drawer.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title ?? p.alt}
      className="fixed inset-0 z-[90] flex flex-col bg-[#0C0B0A]/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 py-4 font-mono text-[10px] tracking-[0.24em] text-[#8E8E93]">
        <span>
          {index + 1} / {items.length}
        </span>
        <button type="button" onClick={onClose} className="min-h-11 px-2 hover:text-[#EAE5D9]" autoFocus>
          CLOSE
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto px-5 pb-10 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.src}
          alt={p.alt}
          className="max-h-[75vh] w-auto max-w-full border-[6px] border-[#F3EAD6] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.6)] lg:max-w-[60vw]"
        />
        {hasText || many ? (
          <div className={`w-full ${hasText ? "max-w-md" : "flex max-w-md justify-center lg:w-auto"}`}>
            {p.title ? <h4 className="font-serif text-3xl leading-tight text-[#EAE5D9]">{p.title}</h4> : null}
            {p.meta ? (
              <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-[#A07E55]">{p.meta.toUpperCase()}</p>
            ) : null}
            {p.note ? (
              <p className="mt-5 font-serif text-[19px] italic leading-relaxed text-[#C9C2B4]">{p.note}</p>
            ) : null}
            {many ? (
              <div className={`flex gap-3 font-mono text-[10px] tracking-[0.24em] ${hasText ? "mt-8" : ""}`}>
                <button type="button" onClick={() => go(-1)} className="min-h-11 border border-[#34302B] px-4 text-[#8E8E93] hover:text-[#EAE5D9]">
                  ← PREV
                </button>
                <button type="button" onClick={() => go(1)} className="min-h-11 border border-[#34302B] px-4 text-[#8E8E93] hover:text-[#EAE5D9]">
                  NEXT →
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
