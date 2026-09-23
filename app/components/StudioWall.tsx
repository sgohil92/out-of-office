"use client";

import { useState, type CSSProperties } from "react";
import Lightbox from "./Lightbox";
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
                <span className="block bg-[#F3EAD6] p-[5px] shadow-[var(--shadow-float)]">
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
                    className="mb-4 block h-auto w-full border-[5px] border-[#F3EAD6] shadow-[var(--shadow-float)]"
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

      {open !== null ? (
        <Lightbox
          items={paintings.map((p) => ({ src: p.src, alt: p.alt, title: p.title, meta: p.medium, note: p.note }))}
          index={open}
          onMove={setOpen}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </div>
  );
}
