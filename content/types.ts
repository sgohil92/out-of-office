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
  /** Shown as a stamp. Use MM.DD.YYYY. */
  date: string;
  place?: string;
  title: string;
  /** One-line subtitle. Leave "" to hide it. */
  dek: string;
  /** Paragraphs separated by a blank line. */
  body: string;
  image?: string;
  images?: string[];
  imageAlt?: string;
  imageAlts?: string[];
  imageAspect?: PhotoAspect;
  imageAspects?: PhotoAspect[];
  /** Videos shown in the drawer, above the text. */
  videos?: Video[];
  tags: string[];
  stamp?: string;
  /** Play only: which object on the table this entry belongs to. */
  hobby?: Hobby;
  /** Bookshelf only: a short title for the spine. Falls back to `title`. */
  spine?: string;
  /** true = shows on your computer, hidden on the live site. */
  draft?: boolean;
};
