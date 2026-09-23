"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { Painting, StudioNote } from "../../content/studio";
import "./sections.css";

const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9];

function Pin() {
  return (
    <svg viewBox="0 0 20 20" className="absolute -top-2.5 left-1/2 z-10 h-5 w-5 -translate-x-1/2" aria-hidden>
      <circle cx="10" cy="9" r="6" fill="#9A3A28" />
      <circle cx="8" cy="7" r="2" fill="#F3EAD6" opacity="0.55" />
      <path d="M 10 15 L 10 19" stroke="#5E2418" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CloseUp({
  paintings,
  index,
  onMove,
  onClose,
}: {
  paintings: Painting[];
  index: number;
  onMove: (i: number) => void;
  onClose: () => void;
}) {
  const p = paintings[index];
  const many = paintings.length > 1;
  const go = (d: number) => onMove((index + d + paintings.length) % paintings.length);

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title ?? "Painting"}
      className="fixed inset-0 z-[90] flex flex-col bg-[#0C0B0A]/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 py-4 font-mono text-[10px] tracking-[0.24em] text-[#8E8E93]">
        <span>
          {index + 1} / {paintings.length}
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
          className="max-h-[70vh] w-auto max-w-full border-[6px] border-[#F3EAD6] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.6)] lg:max-w-[55vw]"
        />
        <div className="w-full max-w-md">
          {p.title ? <h4 className="font-serif text-3xl leading-tight text-[#EAE5D9]">{p.title}</h4> : null}
          {p.medium ? (
            <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-[#A07E55]">{p.medium.toUpperCase()}</p>
          ) : null}
          {p.note ? (
            <p className="mt-5 font-serif text-[19px] italic leading-relaxed text-[#C9C2B4]">{p.note}</p>
          ) : null}
          {many ? (
            <div className="mt-8 flex gap-3 font-mono text-[10px] tracking-[0.24em]">
              <button type="button" onClick={() => go(-1)} className="min-h-11 border border-[#34302B] px-4 text-[#8E8E93] hover:text-[#EAE5D9]">
                ← PREV
              </button>
              <button type="button" onClick={() => go(1)} className="min-h-11 border border-[#34302B] px-4 text-[#8E8E93] hover:text-[#EAE5D9]">
                NEXT →
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function StudioWall({
  paintings,
  notes,
}: {
  paintings: Painting[];
  notes: StudioNote[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-8">
      {paintings.length > 0 ? (
        <ul className="ooo-studio-wall columns-2 gap-5 px-1 pt-3 sm:gap-7">
          {paintings.map((p, i) => (
            <li key={p.id} className="mb-7 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${p.title ?? "Painting"}${p.favorite ? " (a favorite)" : ""}. Open`}
                className="group relative block w-full rotate-(--tilt) transition-[rotate,translate] duration-500 hover:-translate-y-1 hover:rotate-0 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#A07E55]"
                style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
              >
                {p.favorite ? (
                  <Pin />
                ) : (
                  <span aria-hidden className="tape absolute -top-2 left-1/2 z-10 h-4 w-12 -translate-x-1/2 rotate-[-4deg]" />
                )}
                <span className="block bg-[#F3EAD6] p-[5px] shadow-[0_10px_24px_rgba(0,0,0,0.5)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" className="block h-auto w-full" />
                </span>
                {p.title ? (
                  <span className="mt-2 block text-center font-serif text-[13px] italic text-[#8E8E93] group-hover:text-[#EAE5D9]">
                    {p.title}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {notes.length > 0 ? (
        <section className="mt-6 border-t-[3px] border-double border-[#34302B] pt-6">
          <h4 className="font-mono text-[10px] tracking-[0.28em] text-[#A07E55]">STUDIO NOTES</h4>
          <ol className="mt-4 space-y-8">
            {notes.map((note, i) => (
              <li key={i} className="relative pl-5">
                <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-3 bg-[#A07E55]/60" />
                {note.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={note.image}
                    alt={note.imageAlt ?? ""}
                    loading="lazy"
                    className="mb-4 block h-auto w-full border-[5px] border-[#F3EAD6] shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
                  />
                ) : null}
                <div className="space-y-4 font-serif text-[17px] italic leading-relaxed text-[#C9C2B4]">
                  {note.text.split("\n\n").map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* Rendered on the page itself so it covers the whole screen, not just the drawer. */}
      {open !== null
        ? createPortal(
            <CloseUp paintings={paintings} index={open} onMove={setOpen} onClose={() => setOpen(null)} />,
            document.body,
          )
        : null}
    </div>
  );
}
