import type { Pin } from "./types";

/**
 * The Destinations road atlas: the jokes, the home pin, and the little
 * doodles. The stops themselves are the `section: "destinations"` entries in
 * entries.ts. The map zooms to fit all of them, so a stop anywhere works.
 */
export const ATLAS = {
  /** Shows in the title as "<dogName>'s Official Road Atlas". */
  dogName: "Truffles",
  edition: "Sabbatical Edition · 2026",
  tagline: "Revised at every snack stop.",
  /** A pencil note trailing off the newest stop, like "next: ? (ask Truffles)". "" hides it. */
  next: "",
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
