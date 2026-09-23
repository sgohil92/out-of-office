import type { Entry } from "./types";

/**
 * Every post on the site.
 * Add a new object to this list. See content/README.md for which section does what.
 * Order inside a section is the order on the page.
 */

function placeholder(
  id: string,
  section: Entry["section"],
  index: string,
  date: string,
): Entry {
  return {
    id,
    section,
    index,
    date,
    title: `Untitled — Entry ${index}`,
    spine: "Untitled",
    dek: "Awaiting dispatch.",
    body: "[ Entry forthcoming. ]",
    tags: [],
    draft: true,
  };
}

export const ENTRIES: Entry[] = [
  {
    id: "mexico-city",
    section: "destinations",
    index: "01.01",
    date: "",
    place: "Mexico City",
    title: "Mexico City",
    dek: "Mostly for food.",
    body: "[ Entry forthcoming. ]",
    pin: [19.4326, -99.1332],
    arrive: "fly",
    tags: [],
  },
  {
    id: "colombia",
    section: "destinations",
    index: "01.02",
    date: "09.20.2026",
    place: "Colombia",
    title: "Colombia",
    dek: "Where I learned to salsa.",
    body: "[ Entry forthcoming. ]",
    pin: [4.6, -74.1],
    arrive: "fly",
    tags: [],
  },
  {
    id: "hawaii",
    section: "destinations",
    index: "01.03",
    date: "09.16.2026",
    place: "Hawaii",
    title: "Hawaii",
    dek: "Nature and movement.",
    pin: [22.2, -159.5],
    arrive: "paddle",
    body: "[ Entry forthcoming. ]",
    images: [
      "/hawaii/hawaii-01.jpg",
      "/hawaii/hawaii-02.jpg",
      "/hawaii/hawaii-03.jpg",
      "/hawaii/hawaii-04.jpg",
      "/hawaii/hawaii-05.jpg",
      "/hawaii/hawaii-06.jpg",
    ],
    imageAlts: [
      "Paddleboarding off a green headland",
      "Standing in shallow water beside an outrigger canoe",
      "Rooftop garden facing a sunset coast",
      "Night beach with a palm and kayaks",
      "On a catamaran under a yellow sail",
      "Feet toward a beach tree and the horizon",
    ],
    imageAspects: [
      "portrait",
      "landscape",
      "landscape",
      "portrait",
      "portrait",
      "portrait",
    ],
    tags: [],
  },
  {
    id: "mendocino",
    section: "destinations",
    index: "01.04",
    date: "09.04.2026",
    place: "Mendocino",
    title: "Mendocino",
    dek: "Nature and movement.",
    body: "[ Entry forthcoming. ]",
    pin: [39.3077, -123.7995],
    arrive: "drive",
    tags: [],
  },

  { ...placeholder("ink-study-01", "play", "02.01", "09.06.2026"), hobby: "dance" },
  {
    // Opens the studio wall. Add paintings and notes in content/studio.ts.
    id: "studio",
    section: "play",
    hobby: "painting",
    index: "02.02",
    date: "",
    title: "The studio wall",
    dek: "",
    body: "",
    tags: [],
  },

  { ...placeholder("botanical-field", "play", "02.03", "09.14.2026"), hobby: "cooking" },
  { ...placeholder("contact-sheet", "play", "02.04", "09.18.2026"), hobby: "writing" },

  placeholder("plato-republic", "bookshelf", "03.01", "09.05.2026"),
  placeholder("socratic-method", "bookshelf", "03.02", "09.10.2026"),
  placeholder("aristotle-ethics", "bookshelf", "03.03", "09.15.2026"),
  placeholder("canon-shelf", "bookshelf", "03.04", "09.19.2026"),
  placeholder("bookshelf-05", "bookshelf", "03.05", "09.20.2026"),
  placeholder("bookshelf-06", "bookshelf", "03.06", "09.20.2026"),
  placeholder("bookshelf-07", "bookshelf", "03.07", "09.21.2026"),
  placeholder("bookshelf-08", "bookshelf", "03.08", "09.21.2026"),
  placeholder("bookshelf-09", "bookshelf", "03.09", "09.22.2026"),
  placeholder("bookshelf-10", "bookshelf", "03.10", "09.22.2026"),

  placeholder("mood-log-01", "mood", "04.01", "09.07.2026"),
  placeholder("mood-log-02", "mood", "04.02", "09.13.2026"),
  placeholder("mood-log-03", "mood", "04.03", "09.18.2026"),
  placeholder("mood-log-04", "mood", "04.04", "09.22.2026"),

  placeholder("on-leaving", "next", "05.01", "09.03.2026"),
  placeholder("trajectories", "next", "05.02", "09.12.2026"),
  placeholder("unlearning", "next", "05.03", "09.17.2026"),
  placeholder("after-the-year", "next", "05.04", "09.21.2026"),
];
