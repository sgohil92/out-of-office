export type SectionId =
  | "about"
  | "mood"
  | "destinations"
  | "play"
  | "bookshelf"
  | "next";

export type PhotoAspect = "landscape" | "portrait";

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
  tags: string[];
  stamp?: string;
};
