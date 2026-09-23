"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ArchiveEntry } from "./types";
import "./sections.css";

type Point = { x: number; y: number };

const VIEW_W = 640;
const VIEW_H = 292;
const ROUTE_START: Point = { x: 8, y: 146 };
const ROUTE_END: Point = { x: 634, y: 158 };
const STOP_Y = [208, 134, 200, 128, 212, 140];

function stopPoints(count: number): Point[] {
  if (count <= 1) return [{ x: VIEW_W / 2, y: 150 }];
  const left = 88;
  const right = 556;
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(left + ((right - left) * i) / (count - 1)),
    y: STOP_Y[i % STOP_Y.length],
  }));
}

function curveSegments(points: Point[]) {
  const r = (n: number) => Math.round(n * 10) / 10;
  const segs: string[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    segs.push(
      `C ${r(p1.x + (p2.x - p0.x) / 6)} ${r(p1.y + (p2.y - p0.y) / 6)} ${r(
        p2.x - (p3.x - p1.x) / 6,
      )} ${r(p2.y - (p3.y - p1.y) / 6)} ${p2.x} ${p2.y}`,
    );
  }
  return segs;
}

const COAT = "#1A1714";
const CREAM = "#EAE5D9";
const TOBACCO = "#A07E55";
const BONE =
  "M -8.27 -2.15 A 5.2 5.2 0 1 0 -15.92 0 A 5.2 5.2 0 1 0 -8.27 2.15 H 8.27 A 5.2 5.2 0 1 0 15.92 0 A 5.2 5.2 0 1 0 8.27 -2.15 Z";

function Limb({ d }: { d: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke={CREAM} strokeWidth="7.2" strokeLinecap="round" />
      <path d={d} fill="none" stroke={COAT} strokeWidth="5.1" strokeLinecap="round" />
    </g>
  );
}

function LabHead({
  ear,
  tongue,
}: {
  ear: number;
  tongue?: boolean;
}) {
  return (
    <g transform="translate(10 -30)">
      <circle cx="0" cy="0" r="15.6" fill={COAT} stroke={CREAM} strokeWidth="2.2" />
      <ellipse
        cx="10.2"
        cy="6.2"
        rx="7.6"
        ry="5.8"
        fill={COAT}
        stroke={CREAM}
        strokeWidth="1.9"
      />
      <ellipse
        cx="-18"
        cy="6"
        rx="7.2"
        ry="11.5"
        transform="rotate(32 -10 -6)"
        fill={COAT}
        stroke={CREAM}
        strokeWidth="1.8"
      />
      <ellipse
        cx="17"
        cy="8"
        rx="7.4"
        ry="12.2"
        transform={`rotate(${-28 + ear} 10 -6)`}
        fill={COAT}
        stroke={CREAM}
        strokeWidth="1.8"
      />
      <ellipse cx="-3.6" cy="-1.8" rx="5" ry="5.4" fill={CREAM} />
      <ellipse cx="5.2" cy="-2" rx="5.5" ry="5.9" fill={CREAM} />
      <circle cx="-2.8" cy="-1.2" r="2" fill="#0C0B0A" />
      <circle cx="6.2" cy="-1.4" r="2.15" fill="#0C0B0A" />
      <circle cx="-3.7" cy="-2.4" r="0.7" fill="#F4EFE4" />
      <circle cx="5.3" cy="-2.6" r="0.75" fill="#F4EFE4" />
      <ellipse cx="16.4" cy="5.1" rx="2.55" ry="1.95" fill="#0C0B0A" />
      <circle cx="17.1" cy="4.5" r="0.5" fill="#F4EFE4" />
      <path
        d="M 8.2 9.4 Q 11.8 11.8 15 8.6"
        fill="none"
        stroke={CREAM}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {tongue ? (
        <ellipse
          cx="12"
          cy="12.6"
          rx="2.4"
          ry="2.9"
          fill="#C9897A"
          stroke={CREAM}
          strokeWidth="0.6"
        />
      ) : null}
    </g>
  );
}

function LabBody({
  lift = 0,
  stretchX = 1,
  stretchY = 1,
  tail,
}: {
  lift?: number;
  stretchX?: number;
  stretchY?: number;
  tail: number;
}) {
  return (
    <g transform={`translate(0 ${lift}) scale(${stretchX} ${stretchY})`}>
      <path
        transform={`rotate(${tail} -16 -15)`}
        d="M -16 -15 Q -30 -18 -26 -34"
        fill="none"
        stroke={CREAM}
        strokeWidth="5.6"
        strokeLinecap="round"
      />
      <path
        transform={`rotate(${tail} -16 -15)`}
        d="M -16 -15 Q -30 -18 -26 -34"
        fill="none"
        stroke={COAT}
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <ellipse
        cx="-4"
        cy="-14"
        rx="15"
        ry="9.4"
        fill={COAT}
        stroke={CREAM}
        strokeWidth="2.15"
      />
    </g>
  );
}

const RUN: {
  legs: [string, string, string, string];
  lift: number;
  stretchX: number;
  stretchY: number;
  ear: number;
  tail: number;
  tongue: boolean;
}[] = [
  {
    legs: [
      "M -12 -8 C -16 -4 -18 0 -16 2",
      "M -4 -8 C -5 -4 -6 0 -5 2",
      "M 8 -8 C 12 -4 16 0 17 2",
      "M 12 -8 C 11 -4 10 0 11 2",
    ],
    lift: 0,
    stretchX: 1.08,
    stretchY: 0.92,
    ear: 18,
    tail: -16,
    tongue: true,
  },
  {
    legs: [
      "M -10 -10 C -11 -6 -9 -2 -8 1",
      "M -3 -10 C 0 -6 2 -2 2 1",
      "M 8 -10 C 7 -6 6 -2 7 1",
      "M 13 -10 C 15 -6 16 -2 14 1",
    ],
    lift: -4,
    stretchX: 0.94,
    stretchY: 1.08,
    ear: -10,
    tail: 18,
    tongue: true,
  },
  {
    legs: [
      "M -10 -8 C -6 -4 -3 0 -2 2",
      "M -5 -8 C -10 -4 -15 0 -16 2",
      "M 10 -8 C 7 -4 5 0 5 2",
      "M 13 -8 C 16 -4 19 0 19 2",
    ],
    lift: -1,
    stretchX: 1.05,
    stretchY: 0.95,
    ear: 12,
    tail: -6,
    tongue: false,
  },
  {
    legs: [
      "M -12 -8 C -14 -4 -15 0 -13 2",
      "M -4 -8 C -3 -4 -2 0 -3 2",
      "M 9 -8 C 11 -4 12 0 11 2",
      "M 12 -8 C 10 -4 8 0 9 2",
    ],
    lift: 0,
    stretchX: 1,
    stretchY: 1,
    ear: 4,
    tail: 10,
    tongue: true,
  },
];

function LabRunFrame({ pose }: { pose: (typeof RUN)[number] }) {
  return (
    <g>
      <ellipse cx="0" cy="3" rx="18" ry="2.8" fill="#000" opacity="0.38" />
      <Limb d={pose.legs[0]} />
      <Limb d={pose.legs[1]} />
      <LabBody
        lift={pose.lift}
        stretchX={pose.stretchX}
        stretchY={pose.stretchY}
        tail={pose.tail}
      />
      <Limb d={pose.legs[2]} />
      <Limb d={pose.legs[3]} />
      <g transform={`translate(0 ${pose.lift})`}>
        <LabHead ear={pose.ear} tongue={pose.tongue} />
      </g>
    </g>
  );
}

function LabSit() {
  return (
    <g>
      <ellipse cx="-2" cy="3" rx="14" ry="2.5" fill="#000" opacity="0.34" />
      <Limb d="M -13 -6 C -16 -2 -14 2 -11 2" />
      <Limb d="M -6 -6 C -5 -1 -3 2 -1 2" />
      <path
        d="M -16 -12 Q -26 -8 -22 1"
        fill="none"
        stroke={CREAM}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M -16 -12 Q -26 -8 -22 1"
        fill="none"
        stroke={COAT}
        strokeWidth="3.3"
        strokeLinecap="round"
      />
      <ellipse
        cx="-4"
        cy="-12"
        rx="13.5"
        ry="11.5"
        fill={COAT}
        stroke={CREAM}
        strokeWidth="2.15"
      />
      <Limb d="M 5 -7 C 6 -3 6 1 5 2" />
      <Limb d="M 10 -7 C 12 -3 12 1 11 2" />
      <g transform="translate(-4 3)">
        <LabHead ear={-4} />
      </g>
    </g>
  );
}

/** Four-pose run cycle plus a still sit. Facing +x, paws on y = 0. */
function RunningLab() {
  return (
    <g transform="scale(1.82)">
      <g className="ooo-lab-bounce">
        <g className="ooo-lab-sit">
          <LabSit />
        </g>
        {RUN.map((pose, i) => (
          <g key={i} className={`ooo-lab-f ooo-lab-f${i}`}>
            <LabRunFrame pose={pose} />
          </g>
        ))}
      </g>
    </g>
  );
}

export default function DestinationsRoute<E extends ArchiveEntry>({
  entries,
  onOpen,
}: {
  entries: E[];
  onOpen: (entry: E) => void;
}) {
  const points = useMemo(() => stopPoints(entries.length), [entries.length]);
  const { route, prefixes } = useMemo(() => {
    const segs = curveSegments([ROUTE_START, ...points, ROUTE_END]);
    const move = `M ${ROUTE_START.x} ${ROUTE_START.y}`;
    return {
      route: `${move} ${segs.join(" ")}`,
      prefixes: points.map((_, k) => `${move} ${segs.slice(0, k + 1).join(" ")}`),
    };
  }, [points]);

  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const routeRef = useRef<SVGPathElement>(null);
  const prefixRefs = useRef<(SVGPathElement | null)[]>([]);
  const lensRef = useRef<number[]>([]);
  const labRef = useRef<SVGGElement>(null);
  const distRef = useRef(0);
  const facingRef = useRef(1);
  const rafRef = useRef(0);
  const gaitRaf = useRef(0);
  const poseRef = useRef(0);

  const place = useCallback((dist: number) => {
    const path = routeRef.current;
    const lab = labRef.current;
    if (!path || !lab) return;
    const total = path.getTotalLength();
    const p = path.getPointAtLength(dist);
    const a = path.getPointAtLength(Math.max(0, dist - 2));
    const b = path.getPointAtLength(Math.min(total, dist + 2));
    const slope = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    const angle = Math.max(-28, Math.min(28, slope));
    lab.setAttribute(
      "transform",
      `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${angle.toFixed(
        2,
      )}) scale(${facingRef.current} 1)`,
    );
    distRef.current = dist;
  }, []);

  useEffect(() => {
    lensRef.current = prefixRefs.current
      .slice(0, points.length)
      .map((p) => p?.getTotalLength() ?? 0);
    place(lensRef.current[currentRef.current] ?? 0);
    const lab = labRef.current;
    if (
      lab &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      lab.classList.remove("is-trotting");
      lab.classList.add("is-still");
      return () => cancelAnimationFrame(rafRef.current);
    }
    let last = 0;
    const gait = (now: number) => {
      const node = labRef.current;
      if (!node || node.classList.contains("is-still")) {
        gaitRaf.current = requestAnimationFrame(gait);
        return;
      }
      const gap = node.classList.contains("is-running") ? 70 : 130;
      if (now - last >= gap) {
        poseRef.current = (poseRef.current + 1) % 4;
        node.setAttribute("data-pose", String(poseRef.current));
        last = now;
      }
      gaitRaf.current = requestAnimationFrame(gait);
    };
    lab?.setAttribute("data-pose", "0");
    gaitRaf.current = requestAnimationFrame(gait);
    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(gaitRaf.current);
    };
  }, [points, prefixes, place]);

  const runTo = useCallback(
    (k: number) => {
      const target = lensRef.current[k];
      const lab = labRef.current;
      if (target === undefined || !lab) return;
      cancelAnimationFrame(rafRef.current);
      const from = distRef.current;
      const delta = target - from;
      if (Math.abs(delta) < 0.5) return;
      facingRef.current = delta > 0 ? 1 : -1;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        lab.classList.add("is-still");
        lab.classList.remove("is-running", "is-trotting");
        place(target);
        return;
      }
      const duration = Math.min(2600, Math.max(800, Math.abs(delta) * 6));
      const start = performance.now();
      lab.classList.add("is-running");
      lab.classList.remove("is-trotting", "is-still");
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
        place(from + delta * eased);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
        else {
          lab.classList.remove("is-running");
          lab.classList.add("is-trotting");
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [place],
  );

  const select = (k: number) => {
    currentRef.current = k;
    setCurrent(k);
    runTo(k);
  };

  const start = points[0] ?? ROUTE_START;

  return (
    <div>
      <div className="ooo-map relative w-full min-w-0 border border-[#242220]">
        <div
          className="relative w-full"
          style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <pattern
                id="ooo-map-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="#EAE5D9"
                  strokeOpacity="0.045"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width={VIEW_W} height={VIEW_H} fill="url(#ooo-map-grid)" />

            <g transform="translate(598 38) rotate(-22)" opacity="0.6">
              <path
                d={BONE}
                fill="none"
                stroke={TOBACCO}
                strokeWidth="1.15"
                strokeLinejoin="round"
              />
              <path
                d={BONE}
                fill="none"
                stroke={CREAM}
                strokeWidth="0.55"
                strokeLinejoin="round"
              />
            </g>

            <g transform="translate(22 268)" className="font-mono" opacity="0.7">
              <path
                d="M 0 0 H 72 M 0 -3 V 3 M 24 -2 V 2 M 48 -2 V 2 M 72 -3 V 3"
                stroke="#8E8E93"
                strokeWidth="0.8"
              />
              <text x="82" y="3" fontSize="7" letterSpacing="1.4" fill="#8E8E93">
                NOT TO SCALE
              </text>
            </g>

            <path
              d={route}
              fill="none"
              stroke="#A07E55"
              strokeOpacity="0.14"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              ref={routeRef}
              d={route}
              fill="none"
              stroke="#EAE5D9"
              strokeOpacity="0.5"
              strokeWidth="1.3"
              strokeDasharray="5 6"
              strokeLinecap="round"
            />
            {prefixes.map((d, k) => (
              <path
                key={d}
                ref={(el) => {
                  prefixRefs.current[k] = el;
                }}
                d={d}
                fill="none"
                stroke="none"
              />
            ))}

            <g
              ref={labRef}
              className="ooo-lab is-trotting"
              transform={`translate(${start.x} ${start.y})`}
            >
              <RunningLab />
            </g>
          </svg>

          <ol className="absolute inset-0">
            {entries.map((entry, k) => {
              const pt = points[k];
              if (!pt) return null;
              const isCurrent = k === current;
              return (
                <li
                  key={entry.id}
                  className="absolute"
                  style={{
                    left: `${(pt.x / VIEW_W) * 100}%`,
                    top: `${(pt.y / VIEW_H) * 100}%`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => onOpen(entry)}
                    onMouseEnter={() => select(k)}
                    onFocus={() => select(k)}
                    aria-label={`Stop ${entry.index}, ${entry.date}: ${entry.place ?? entry.title}. Open entry`}
                    aria-current={isCurrent ? "location" : undefined}
                    className="ooo-stop group flex -translate-x-1/2 -translate-y-[7px] flex-col items-center gap-1 px-1 pb-1 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#A07E55]"
                  >
                    <span aria-hidden className="ooo-stop-pin" />
                    <span
                      aria-hidden
                      className="ooo-stop-label flex flex-col items-center gap-1"
                    >
                      <span className="font-sc whitespace-nowrap text-[10px] leading-none text-[#EAE5D9] sm:text-[12px]">
                        {entry.place ?? `Stop ${entry.index}`}
                      </span>
                      <span className="hidden whitespace-nowrap font-mono text-[8px] leading-none tracking-[0.16em] text-[#8E8E93] sm:block">
                        {entry.date}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
