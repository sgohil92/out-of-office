import { geoGraticule, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import countries110m from "world-atlas/countries-110m.json";
import countries50m from "world-atlas/countries-50m.json";
import land110m from "world-atlas/land-110m.json";
import land50m from "world-atlas/land-50m.json";
import type { Entry, Pin, Travel } from "../content/types";

/**
 * Turns the destination pins into a drawn map. Runs when the site is built,
 * so visitors download the finished drawing, not the world's coastlines.
 */

export const ATLAS_W = 640;
export const ATLAS_H = 420;

/** Room kept clear around the stops for labels, and for the compass bottom-right. */
const FRAME: [[number, number], [number, number]] = [
  [64, 56],
  [ATLAS_W - 64, ATLAS_H - 64],
];
/** Stops closer than this never zoom the map in past city level. */
const MAX_SCALE = 2600;
/** Zoomed out further than this, the lighter coastline looks the same and keeps the page small. */
const DETAIL_SCALE = 900;

export type AtlasStop = { id: string; x: number; y: number; arrive: Travel };
export type AtlasDoodle = {
  kind: "bone" | "ball" | "nap" | "label";
  x: number;
  y: number;
  text?: string;
  note?: string;
};
export type AtlasDrawing = {
  width: number;
  height: number;
  land: string;
  borders: string;
  graticule: string;
  home: { x: number; y: number; label: string };
  stops: AtlasStop[];
  /** Destinations without a pin: listed under the map instead. */
  unpinned: string[];
  doodles: AtlasDoodle[];
  /** Where the "next: ?" pencil line ends. */
  next: { x: number; y: number };
};

type Countries = Topology<{ countries: GeometryCollection }>;
type Land = Topology<{ land: GeometryCollection }>;

function centerLongitude(lngs: number[]) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const x = lngs.reduce((sum, l) => sum + Math.cos(rad(l)), 0);
  const y = lngs.reduce((sum, l) => sum + Math.sin(rad(l)), 0);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

const round = (n: number) => Math.round(n * 10) / 10;

export function drawAtlas(
  destinations: Entry[],
  home: { label: string; pin: Pin },
  doodles: { kind: AtlasDoodle["kind"]; pin: Pin; text?: string; note?: string }[],
): AtlasDrawing {
  const pinned = destinations.filter((d) => d.pin);
  const pins: Pin[] = [home.pin, ...pinned.map((d) => d.pin as Pin)];
  const lnglat = (p: Pin): [number, number] => [p[1], p[0]];

  const projection = geoNaturalEarth1()
    .rotate([-centerLongitude(pins.map((p) => p[1])), 0])
    .fitExtent(FRAME, { type: "MultiPoint", coordinates: pins.map(lnglat) });

  if (projection.scale() > MAX_SCALE) {
    const [[x0, y0], [x1, y1]] = FRAME;
    const [cx, cy] = [(x0 + x1) / 2, (y0 + y1) / 2];
    const center = projection.invert?.([cx, cy]);
    projection.scale(MAX_SCALE);
    if (center) {
      const [px, py] = projection(center) ?? [cx, cy];
      const [tx, ty] = projection.translate();
      projection.translate([tx + cx - px, ty + cy - py]);
    }
  }

  projection.clipExtent([
    [-20, -20],
    [ATLAS_W + 20, ATLAS_H + 20],
  ]);
  const path = geoPath(projection).digits(1);
  const at = (p: Pin) => {
    const [x, y] = projection(lnglat(p)) ?? [0, 0];
    return { x: round(x), y: round(y) };
  };

  const detailed = projection.scale() >= DETAIL_SCALE;
  const landTopo = (detailed ? land50m : land110m) as unknown as Land;
  const countryTopo = (detailed ? countries50m : countries110m) as unknown as Countries;

  const stops = pinned.map((d) => ({
    id: d.id,
    arrive: d.arrive ?? "drive",
    ...at(d.pin as Pin),
  }));

  const inside = ({ x, y }: { x: number; y: number }) =>
    x > 24 && x < ATLAS_W - 24 && y > 24 && y < ATLAS_H - 24;

  // The pencil "next: ?" line heads from the newest stop into the emptiest nearby space.
  const last = stops[stops.length - 1] ?? at(home.pin);
  const others = [at(home.pin), ...stops.slice(0, -1)];
  let next = { x: last.x, y: last.y };
  let best = -Infinity;
  for (let deg = 0; deg < 360; deg += 20) {
    const r = (deg * Math.PI) / 180;
    const x = last.x + Math.cos(r) * 80;
    const y = last.y + Math.sin(r) * 80;
    if (x < 70 || x > ATLAS_W - 70 || y < 40 || y > ATLAS_H - 70) continue;
    const room = Math.min(...others.map((o) => Math.hypot(o.x - x, o.y - y)));
    // Labels sit to the right of pins, so leave that side alone.
    const score = room - (Math.abs(y - last.y) < 20 && x > last.x ? 60 : 0);
    if (score > best) {
      best = score;
      next = { x: round(x), y: round(y) };
    }
  }

  return {
    width: ATLAS_W,
    height: ATLAS_H,
    land: path(feature(landTopo, landTopo.objects.land)) ?? "",
    borders:
      path(
        mesh(countryTopo, countryTopo.objects.countries, (a, b) => a !== b),
      ) ?? "",
    graticule: path(geoGraticule().step([10, 10])()) ?? "",
    home: { label: home.label, ...at(home.pin) },
    stops,
    unpinned: destinations.filter((d) => !d.pin).map((d) => d.place ?? d.title),
    doodles: doodles
      .map((d) => ({ kind: d.kind, text: d.text, note: d.note, ...at(d.pin) }))
      .filter(inside),
    next,
  };
}
