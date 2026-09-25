"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Travel } from "../../content/types";
import type { AtlasDrawing } from "../../lib/atlas";
import type { ArchiveEntry } from "./types";
import "./sections.css";

export type AtlasWords = {
  title: string;
  next: string;
};

const COAT = "#1B1917";
const INK = "#2A2520";
const ROAD = "#9A3A28";
const SEA_INK = "#3F6479";
const BONE =
  "M -8.27 -2.15 A 5.2 5.2 0 1 0 -15.92 0 A 5.2 5.2 0 1 0 -8.27 2.15 H 8.27 A 5.2 5.2 0 1 0 15.92 0 A 5.2 5.2 0 1 0 8.27 -2.15 Z";

/** Size of Truffles (and the roadster) on the map. */
const RIDER_SCALE = 1.45;

type Point = { x: number; y: number };
type Leg = { d: string; mode: Travel };

function legsFor(points: Point[], modes: Travel[]): Leg[] {
  const r = (n: number) => Math.round(n * 10) / 10;
  return modes.map((mode, i) => {
    const a = points[i];
    const b = points[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const nx = -(b.y - a.y) / len;
    const ny = (b.x - a.x) / len;
    const bend = mode === "fly" ? 0.26 : mode === "paddle" ? 0.12 : 0.09;
    // Flights arc upward like a globe route; roads and paddles wiggle alternately.
    const sign = mode === "fly" ? (ny <= 0 ? 1 : -1) : i % 2 ? 1 : -1;
    const cx = (a.x + b.x) / 2 + nx * sign * bend * len;
    const cy = (a.y + b.y) / 2 + ny * sign * bend * len;
    return { mode, d: `M ${a.x} ${a.y} Q ${r(cx)} ${r(cy)} ${b.x} ${b.y}` };
  });
}

/* ——— The lab, drawn from the photo: glossy black, grey muzzle, soft ears, tongue out. ——— */

function LabHead({ goggles }: { goggles?: boolean }) {
  return (
    <g className="ooo-lab-head">
      <path d="M -5 1 C -6 -6 -3 -11 2 -12 L 7 -6 C 6 -2 5 1 5 1 Z" fill={COAT} />
      <ellipse cx="3" cy="-14" rx="7.2" ry="6.4" fill={COAT} />
      <path
        d="M 6 -17.4 C 10 -17.8 14.6 -16.2 14.9 -12.6 C 15.1 -9.6 12 -8.5 8 -8.8 C 6 -9 5 -11 5 -13.2 Z"
        fill={COAT}
      />
      {/* the grey muzzle */}
      <path
        d="M 9.4 -16.4 C 12.4 -16.2 14.7 -14.8 14.9 -12.6 C 15.1 -9.6 12 -8.5 8.8 -8.8 C 9.8 -11.2 9.2 -13.8 9.4 -16.4 Z"
        fill="#9A958D"
        opacity="0.55"
      />
      <path
        className="ooo-lab-tongue"
        d="M 10 -9.2 C 10.2 -5.6 11.4 -4.1 12.9 -4.5 C 14.1 -4.9 13.9 -7 13.1 -9.4 Z"
        fill="#D9707E"
      />
      <path d="M 11.6 -8.8 L 11.9 -5.6" stroke="#B0505E" strokeWidth="0.4" />
      <path
        d="M 8 -10.6 Q 11 -9 14 -10.3"
        fill="none"
        stroke="#0A0908"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <ellipse cx="14.3" cy="-14.5" rx="1.8" ry="1.35" fill="#0A0908" />
      <circle cx="14.7" cy="-15" r="0.4" fill="#F4EFE4" opacity="0.8" />
      <circle cx="7.6" cy="-16.3" r="1.05" fill="#4A2E1C" />
      <circle cx="7.9" cy="-16.6" r="0.35" fill="#F4EFE4" />
      <path d="M 6.3 -18.1 Q 7.7 -18.9 9.1 -18.1" fill="none" stroke="#45403A" strokeWidth="0.5" />
      {/* shine on the coat */}
      <path
        d="M -1.5 -19 Q 3 -21.4 7.4 -19.6"
        fill="none"
        stroke="#6A655E"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
      {goggles ? (
        <g>
          <path d="M 5 -17 L -3 -18.4" stroke="#6B5236" strokeWidth="1.1" />
          <circle cx="7.6" cy="-16.4" r="2.4" fill="#9FB4B8" fillOpacity="0.55" stroke="#C9A66B" strokeWidth="1" />
        </g>
      ) : null}
      <path
        className="ooo-lab-ear"
        d="M 1.2 -19.2 C -3 -18.6 -4.6 -14 -4.1 -10 C -3.7 -7.5 -1.2 -7.5 -0.4 -9.6 C 0.7 -12.6 1.8 -16.2 1.2 -19.2 Z"
        fill="#131110"
        stroke="#45403A"
        strokeWidth="0.5"
      />
      {/* the rope leash */}
      <path d="M -4.6 -3 Q 0 -1.4 5.4 -4.6" fill="none" stroke="#3A3530" strokeWidth="1.3" />
    </g>
  );
}

function Wheel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} -5.5)`}>
      <g className="ooo-wheel">
        <circle r="5.5" fill="#1A1714" />
        <circle r="3.3" fill="#EAE0CA" />
        <path d="M -3.2 0 H 3.2 M 0 -3.2 V 3.2 M -2.3 -2.3 L 2.3 2.3 M -2.3 2.3 L 2.3 -2.3" stroke="#8C7D63" strokeWidth="0.5" />
        <circle r="1" fill="#6B5236" />
      </g>
    </g>
  );
}

function Roadster() {
  return (
    <g className="ooo-v-drive">
      <g className="ooo-puffs" fill="#8E8A84">
        <circle cx="-28" cy="-8" r="2" />
        <circle cx="-28" cy="-8" r="2.6" />
        <circle cx="-28" cy="-8" r="1.6" />
      </g>
      <g className="ooo-bounce">
        <g transform="translate(-1 -11)">
          <LabHead />
        </g>
        <path
          d="M -24 -8 C -24 -13 -20 -15 -14 -15 L -5 -15 C -4 -11.5 3 -11.5 4 -15 L 12 -15 C 18 -15 23 -13 24 -9 L 24 -6 L -24 -6 Z"
          fill="#1F3D2B"
          stroke="#0E1F15"
          strokeWidth="0.7"
        />
        <path d="M -21 -11 H 20" stroke="#EAE0CA" strokeWidth="0.8" opacity="0.8" />
        <path d="M 8 -15 L 10.5 -20.5" stroke="#9FB4B8" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="22" y="-13" width="2.6" height="6" rx="0.8" fill="#C9A66B" />
        <circle cx="24.6" cy="-11" r="1.6" fill="#F2D98B" stroke="#6B5236" strokeWidth="0.4" />
        <path d="M -20.5 -6 A 7.5 7.5 0 0 1 -5.5 -6 M 5.5 -6 A 7.5 7.5 0 0 1 20.5 -6" fill="none" stroke="#16301F" strokeWidth="2.4" />
      </g>
      <Wheel x={-13} />
      <Wheel x={13} />
    </g>
  );
}

function Doodle({ kind }: { kind: "bone" | "ball" | "nap" }) {
  if (kind === "bone") {
    return (
      <g transform="rotate(-20) scale(0.7)">
        <path d={BONE} fill="#F3EAD6" stroke="#6B5236" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M -24 -8 L -30 -14 M 22 8 L 28 12" stroke={ROAD} strokeWidth="1.4" strokeLinecap="round" />
      </g>
    );
  }
  if (kind === "ball") {
    return (
      <g>
        <circle r="4.2" fill="#C9C24A" stroke="#6B6A2A" strokeWidth="0.6" />
        <path d="M -3.4 -2.4 Q 0 0 -3.4 2.4 M 3.4 -2.4 Q 0 0 3.4 2.4" fill="none" stroke="#F3EAD6" strokeWidth="0.7" />
        <path d="M 6 -6 L 12 0 M 12 -6 L 6 0" stroke={ROAD} strokeWidth="1.3" strokeLinecap="round" transform="translate(2 -4)" />
      </g>
    );
  }
  return (
    <g className="font-serif" fill="#6B5E4E" fontStyle="italic">
      <text x="0" y="0" fontSize="9">z</text>
      <text x="6" y="-7" fontSize="12">z</text>
      <text x="14" y="-16" fontSize="16">Z</text>
    </g>
  );
}

export default function RoadAtlas<E extends ArchiveEntry>({
  drawing,
  words,
  entries,
  onOpen,
}: {
  drawing: AtlasDrawing;
  words: AtlasWords;
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  const { width: W, height: H, stops, home } = drawing;
  const byId = useMemo(() => new Map(entries.map((e) => [e.id, e])), [entries]);
  const legs = useMemo(
    () => legsFor([home, ...stops], stops.map((s) => s.arrive)),
    [home, stops],
  );

  const [current, setCurrent] = useState(stops.length - 1);
  const [sides, setSides] = useState<("right" | "left" | "below")[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  // Put each label on whichever side of its pin it fits, at the map's real size.
  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      setSides(
        stops.map((stop, k) => {
          const label = labelRefs.current[k]?.offsetWidth ?? 0;
          const x = (stop.x / W) * width;
          if (x + 14 + label <= width - 6) return "right";
          if (x - label / 2 >= 6 && x + label / 2 <= width - 6) return "below";
          return "left";
        }),
      );
    };
    measure();
    const watch = new ResizeObserver(measure);
    watch.observe(node);
    return () => watch.disconnect();
  }, [stops, W]);

  const last = stops[stops.length - 1];
  const pct = (p: Point) => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });
  const homeMark = { x: Math.max(24, home.x - 40), y: Math.min(H - 30, home.y + 30) };

  // Truffles drives to whichever place you pick, then the post opens.
  // He starts parked by the SF house and stays wherever he last went.
  const parkedAt = (k: number | "home") =>
    k === "home"
      ? { x: homeMark.x - 46, y: homeMark.y + 1.5 }
      : stops[k].x - 50 >= 46
        ? { x: stops[k].x - 50, y: Math.min(H - 20, stops[k].y + 8) } // just left of the pin
        : { x: Math.max(46, stops[k].x + 4), y: Math.min(H - 20, stops[k].y + 44) }; // by the map's edge: just below it
  const [truffles, setTruffles] = useState<{ at: number | "home"; left: boolean; ms: number }>({
    at: "home",
    left: false,
    ms: 0,
  });
  const [moving, setMoving] = useState(false);
  const arrive = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (arrive.current) clearTimeout(arrive.current);
  }, []);
  const driveTo = (to: number | "home", then: () => void) => {
    const from = parkedAt(truffles.at);
    const dest = parkedAt(to);
    const still =
      to === truffles.at || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (arrive.current) clearTimeout(arrive.current);
    if (still) {
      setTruffles({ at: to, left: truffles.left, ms: 0 });
      then();
      return;
    }
    const ms = Math.round(Math.min(1400, Math.max(600, Math.hypot(dest.x - from.x, dest.y - from.y) * 3)));
    setTruffles({ at: to, left: dest.x < from.x, ms });
    setMoving(true);
    arrive.current = setTimeout(() => {
      setMoving(false);
      then();
    }, ms + 120);
  };

  const visit = (k: number) => {
    const entry = byId.get(stops[k].id);
    if (!entry) return;
    setCurrent(k);
    driveTo(k, () => onOpen(entry));
  };

  // Home base (San Francisco) opens from the SF house.
  const homeEntry = entries.find((e) => e.homeBase);
  const goHome = () => {
    if (homeEntry) driveTo("home", () => onOpen(homeEntry));
  };
  const spot = parkedAt(truffles.at);

  return (
    <div>
      <div ref={mapRef} className="ooo-atlas relative w-full min-w-0">
        <div className="ooo-atlas-band flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <div className="min-w-0 flex-1">
            <p className="font-sc text-[13px] leading-tight text-[#2A2520] sm:text-[17px]">
              {words.title}
            </p>
          </div>
        </div>
        <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <path id="ooo-atlas-land" d={drawing.land} />
              <filter id="ooo-atlas-grain" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
                <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.27  0 0 0 0 0.17  0 0 0 0.5 0" />
              </filter>
              <radialGradient id="ooo-atlas-age" cx="50%" cy="45%" r="75%">
                <stop offset="60%" stopColor="#6B5236" stopOpacity="0" />
                <stop offset="100%" stopColor="#6B5236" stopOpacity="0.28" />
              </radialGradient>
            </defs>

            <rect width={W} height={H} fill="#C3CEC9" />
            <path d={drawing.graticule} fill="none" stroke="#5E7C86" strokeWidth="0.5" strokeOpacity="0.28" />
            {/* water lines hugging the coast, old-atlas style (one coastline, drawn seven ways) */}
            <g fill="none" strokeLinejoin="round">
              <use href="#ooo-atlas-land" stroke="#6E8E98" strokeWidth="15" strokeOpacity="0.35" />
              <use href="#ooo-atlas-land" stroke="#C3CEC9" strokeWidth="13.6" />
              <use href="#ooo-atlas-land" stroke="#6E8E98" strokeWidth="9.4" strokeOpacity="0.45" />
              <use href="#ooo-atlas-land" stroke="#C3CEC9" strokeWidth="8" />
              <use href="#ooo-atlas-land" stroke="#6E8E98" strokeWidth="4.6" strokeOpacity="0.6" />
              <use href="#ooo-atlas-land" stroke="#C3CEC9" strokeWidth="3.2" />
            </g>
            <use href="#ooo-atlas-land" fill="#EADFC4" stroke="#6B5236" strokeWidth="0.8" strokeLinejoin="round" />
            <path d={drawing.borders} fill="none" stroke="#8C7D63" strokeWidth="0.6" strokeDasharray="2 2.5" />

            {/* folds and a coffee ring: this map has been places */}
            <g>
              {[W / 3, (2 * W) / 3].map((x) => (
                <g key={x}>
                  <rect x={x - 6} y="0" width="6" height={H} fill="#6B5236" opacity="0.05" />
                  <path d={`M ${x} 0 V ${H}`} stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="0.8" />
                </g>
              ))}
              <rect x="0" y={H / 2 - 6} width={W} height="6" fill="#6B5236" opacity="0.05" />
              <path d={`M 0 ${H / 2} H ${W}`} stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="0.8" />
              <circle cx={W * 0.86} cy={H * 0.2} r="26" fill="none" stroke="#7A5530" strokeOpacity="0.16" strokeWidth="3" />
              <circle cx={W * 0.86 + 3} cy={H * 0.2 + 1} r="24" fill="none" stroke="#7A5530" strokeOpacity="0.1" strokeWidth="1.2" />
            </g>

            {drawing.doodles
              .filter((d) => d.kind !== "label")
              .map((d, i) => (
                <g key={i} transform={`translate(${d.x} ${d.y})`} opacity="0.9">
                  <Doodle kind={d.kind as "bone" | "ball" | "nap"} />
                </g>
              ))}

            {/* the route */}
            {legs.map((leg, i) => (
              <g key={i}>
                {leg.mode === "drive" ? (
                  <>
                    <path d={leg.d} fill="none" stroke={ROAD} strokeWidth="3.4" strokeLinecap="round" />
                    <path d={leg.d} fill="none" stroke="#F3EAD6" strokeWidth="0.9" strokeDasharray="4 4" />
                  </>
                ) : leg.mode === "paddle" ? (
                  <path d={leg.d} fill="none" stroke={SEA_INK} strokeWidth="2.6" strokeDasharray="0.1 5.5" strokeLinecap="round" />
                ) : (
                  <path d={leg.d} fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="7 5" strokeOpacity="0.75" />
                )}
              </g>
            ))}

            {last && words.next ? (
              <path
                d={`M ${last.x} ${last.y} Q ${(last.x + drawing.next.x) / 2 + 14} ${(last.y + drawing.next.y) / 2 - 10} ${drawing.next.x} ${drawing.next.y}`}
                fill="none"
                stroke="#7A7670"
                strokeWidth="1.2"
                strokeDasharray="1 4"
                strokeLinecap="round"
              />
            ) : null}

            {/* home: nudged out into the ocean with a dotted line back to SF, so it isn't hidden under nearby pins */}
            <path
              d={`M ${home.x} ${home.y} L ${homeMark.x} ${homeMark.y - 6}`}
              stroke={INK}
              strokeWidth="0.8"
              strokeDasharray="1.5 2"
              opacity="0.7"
            />
            <circle cx={home.x} cy={home.y} r="2" fill={INK} />
            <g transform={`translate(${homeMark.x} ${homeMark.y}) scale(1.5)`}>
              <path d="M -5.5 1 V -5 L 0 -9.5 L 5.5 -5 V 1 Z" fill="#F3EAD6" stroke={INK} strokeWidth="0.8" />
              <rect x="-1.4" y="-3.4" width="2.8" height="4.4" fill={INK} />
            </g>

            {/* compass: the only directions that matter */}
            <g transform={`translate(${W - 58} ${H - 50})`} opacity="0.85">
              <circle r="17" fill="#F3EAD6" fillOpacity="0.5" stroke={INK} strokeWidth="0.7" />
              <circle r="13" fill="none" stroke={INK} strokeWidth="0.4" strokeDasharray="1 2" />
              <path d="M 0 -16 L 3 0 L 0 16 L -3 0 Z" fill={INK} />
              <path d="M -16 0 L 0 -3 L 16 0 L 0 3 Z" fill="#8C7D63" />
              <path d="M 0 -16 L 3 0 L 0 0 Z" fill={ROAD} />
            </g>

            {/* Truffles in the roadster: parked by the SF house until someone picks a place */}
            <g
              style={{
                transform: `translate(${spot.x}px, ${spot.y}px)`,
                transition: `transform ${truffles.ms}ms ease-in-out`,
              }}
            >
              {/* turns to face the way he's heading, without squashing mid-trip */}
              <g
                className={`ooo-rider ${moving ? "is-moving" : ""}`}
                data-mode="drive"
                transform={`scale(${truffles.left ? -RIDER_SCALE : RIDER_SCALE} ${RIDER_SCALE})`}
              >
                <Roadster />
              </g>
            </g>

            <rect width={W} height={H} fill="url(#ooo-atlas-age)" pointerEvents="none" />
            <rect width={W} height={H} filter="url(#ooo-atlas-grain)" opacity="0.35" pointerEvents="none" />
          </svg>

          {/* compass letters */}
          <div
            aria-hidden
            className="pointer-events-none absolute font-mono text-[7px] leading-none text-[#2A2520] sm:text-[8px]"
            style={pct({ x: W - 58, y: H - 50 })}
          >
            <span className="absolute -translate-x-1/2 translate-y-[-30px] sm:translate-y-[-34px]">N</span>
            <span className="absolute -translate-x-1/2 translate-y-[24px] sm:translate-y-[27px]">S</span>
            <span className="absolute translate-x-[20px] -translate-y-1/2 sm:translate-x-[24px]">E</span>
            <span className="absolute translate-x-[-27px] -translate-y-1/2 sm:translate-x-[-31px]">W</span>
          </div>

          {drawing.doodles
            .filter((d) => d.kind === "label")
            .map((d, i) => (
              <p
                key={i}
                aria-hidden
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={pct(d)}
              >
                <span className="font-sc block whitespace-nowrap text-[9px] tracking-[0.3em] text-[#3F6479] sm:text-[11px]">
                  {d.text}
                </span>
                {d.note ? (
                  <span className="hidden whitespace-nowrap font-serif text-[11px] italic text-[#3F6479]/80 sm:block">
                    {d.note}
                  </span>
                ) : null}
              </p>
            ))}

          <p
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 pt-1 font-serif text-[11px] italic leading-none text-[#6B5E4E] sm:text-[12px]"
            style={pct({ x: homeMark.x, y: homeMark.y + 3 })}
          >
            SF
          </p>
          {homeEntry ? (
            <button
              type="button"
              onClick={goHome}
              aria-label="Home base: San Francisco. Open"
              className="absolute z-10 h-11 w-11 -translate-x-1/2 -translate-y-[70%] cursor-pointer rounded-full transition-colors hover:bg-[#F3EAD6]/25 focus-visible:outline-1 focus-visible:outline-[#9A3A28]"
              style={pct(homeMark)}
            />
          ) : null}

          {home.label ? (
            <p
              aria-hidden
              className="pointer-events-none absolute -translate-x-full pr-1 font-serif text-[11px] italic leading-none text-[#6B5E4E] sm:text-[12px]"
              style={pct({ x: home.x - 4, y: home.y + 2 })}
            >
              {home.label}
            </p>
          ) : null}

          {last && words.next ? (
            <p
              aria-hidden
              className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-[130%] whitespace-nowrap font-serif text-[12px] italic text-[#6B5E4E] sm:block"
              style={pct(drawing.next)}
            >
              {words.next}
            </p>
          ) : null}

          {/* Clicks pass through the empty map to what's underneath (like the SF house); only the pins catch them. */}
          <ol className="pointer-events-none absolute inset-0">
            {stops.map((stop, k) => {
              const entry = byId.get(stop.id);
              if (!entry) return null;
              const side = sides[k] ?? "right";
              return (
                <li key={stop.id} className="pointer-events-auto absolute" style={pct(stop)}>
                  <button
                    type="button"
                    onClick={() => visit(k)}
                    aria-label={`${entry.place ?? entry.title}${entry.dek ? ` — ${entry.dek.replace(/\.$/, "")}` : ""}. Travel there and open`}
                    aria-current={k === current ? "location" : undefined}
                    className="ooo-atlas-stop absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#9A3A28]"
                  >
                    <span aria-hidden className="ooo-atlas-pin block" />
                    <span
                      aria-hidden
                      ref={(el) => {
                        labelRefs.current[k] = el;
                      }}
                      className={`ooo-atlas-label absolute whitespace-nowrap ${
                        side === "right"
                          ? "left-[calc(100%+6px)] top-1/2 -translate-y-1/2 text-left"
                          : side === "left"
                            ? "right-[calc(100%+6px)] top-1/2 -translate-y-1/2 text-right"
                            : "left-1/2 top-[calc(100%+5px)] -translate-x-1/2 text-center"
                      }`}
                    >
                      <span className="font-sc block text-[11px] leading-none text-[#2A2520] sm:text-[13px]">
                        <span className="mr-1 font-mono text-[8px] text-[#8C7D63] sm:text-[9px]">
                          {String(k + 1).padStart(2, "0")}
                        </span>
                        {entry.place ?? entry.title}
                      </span>
                      {entry.dek ? (
                        <span className="mt-0.5 hidden font-serif text-[12px] italic leading-tight text-[#6B5E4E] sm:block">
                          {entry.dek}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

        </div>
      </div>

      {drawing.unpinned.length > 0 ? (
        <p className="mt-3 font-mono text-[10px] tracking-[0.06em] text-[#6B6760]">
          Also visited, somewhere off the map: {drawing.unpinned.join(", ")}.
        </p>
      ) : null}
    </div>
  );
}
