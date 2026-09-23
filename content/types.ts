export type SectionId =
  | "about"
  | "mood"
  | "destinations"
  | "play"
  | "bookshelf"
  | "next";

export type PhotoAspect = "landscape" | "portrait";

/** Which object a Play entry sits on: the record, the ink wash, the cookbook, or the typed page. */
export type Hobby = "dance" | "painting" | "cooking" | "writing";

/** How the dog gets to a stop on the Destinations map. */
export type Travel = "drive" | "paddle" | "fly";

/** A place on the map: [latitude, longitude]. In Google Maps, right-click a spot and click the numbers to copy them. */
export type Pin = [number, number];

export type Video = {
  /** Path under /public, like "/play/dance-01.mp4". */
  src: string;
  /** A still shown before it plays, like "/play/dance-01.jpg". Optional. */
  poster?: string;
  /** One line under the video. Optional. */
  caption?: string;
  /** "portrait" for phone videos filmed upright. Defaults to "landscape". */
  aspect?: PhotoAspect;
};

/**
 * One journal entry. Copy this shape when you add a post.
 * Photos are paths under /public, written without the word "public".
 * Example: public/destinations/hawaii/01.jpg → "/destinations/hawaii/01.jpg"
 */
export type Entry = {
  id: string;
  section: SectionId;
  /** Display number, like "01.03". Order on the page follows the array, not this number. */
  index: string;
  /** Shown as a stamp. Use MM.DD.YYYY, or MM.YYYY if you only know the month. */
  date: string;
  place?: string;
  title: string;
  /** One-line subtitle. Leave "" to hide it. */
  dek: string;
  /** Paragraphs separated by a blank line. Lines starting with "* " become a bulleted list. */
  body: string;
  image?: string;
  images?: string[];
  imageAlt?: string;
  imageAlts?: string[];
  imageAspect?: PhotoAspect;
  imageAspects?: PhotoAspect[];
  /** A short line under each photo, like where it was taken. Same order as `images`. */
  imageCaptions?: string[];
  /** Videos shown in the drawer, above the text. */
  videos?: Video[];
  tags: string[];
  stamp?: string;
  /** Destinations only: where the stop sits on the map. */
  pin?: Pin;
  /** Destinations only: how the dog arrives here from the stop before it in time (the one listed below it). Defaults to "drive". */
  arrive?: Travel;
  /** Play only: which object on the table this entry belongs to. */
  hobby?: Hobby;
  /** What's Next only: true = checked off on the notepad. */
  done?: boolean;
  /** Bookshelf only: a short title for the spine. Falls back to `title`. */
  spine?: string;
  /** true = shows on your computer, hidden on the live site. */
  draft?: boolean;
};
