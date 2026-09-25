import type { Pin } from "./types";

/**
 * The Destinations road atlas: the jokes, the home pin, and the little
 * doodles. The stops themselves are the `section: "destinations"` entries in
 * entries.ts. The map zooms to fit all of them, so a stop anywhere works.
 */
export const ATLAS = {
  /** The map's name, in the cream band across the top. */
  title: "Following the Whim",
  /** A pencil note trailing off the newest stop, like "next: ? (ask Truffles)". "" hides it. */
  next: "",
  /**
   * The next trip, sketched in pencil: a hollow pin with a dotted line from the newest stop.
   * It doesn't open anything. Once you've been, add it as a real stop in entries.ts and set this to null.
   */
  upcoming: { place: "Mandarina", when: "Oct–Nov", pin: [20.98, -105.35] as Pin } as {
    place: string;
    when: string;
    pin: Pin;
  } | null,
  /** Where the trip starts. `label` is optional pencil text by the house; "" hides it. */
  home: { label: "", pin: [37.7749, -122.4194] as Pin },

  /**
   * Doodles on the map. A doodle only shows if its spot is inside the map,
   * so ones near old stops quietly disappear if the map moves.
   * kind: "bone" | "ball" | "nap" | "label"
   */
  doodles: [
    { kind: "label", text: "PACIFIC OCEAN", note: "(one very large bath)", pin: [9, -141] },
  ] as { kind: "bone" | "ball" | "nap" | "label"; pin: Pin; text?: string; note?: string }[],
};
