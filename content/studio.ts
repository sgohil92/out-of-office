/**
 * The studio wall: what opens when someone taps the painting on the Play table.
 * No dates. Add paintings and notes whenever, newest at the top of each list.
 *
 * Photos go in public/studio/. Shoot each painting straight on in daylight;
 * a phone photo is fine.
 */

export type Painting = {
  id: string;
  /** Path under /public, like "/studio/cafe-front.jpg". */
  src: string;
  /** Describes the painting for people who can't see it. */
  alt: string;
  /** Optional name, shown when it's opened. */
  title?: string;
  /** Optional, like "Watercolor + ink". */
  medium?: string;
  /** Your caption, shown in pencil when it's opened. */
  note?: string;
};

export type StudioNote = {
  /** A thought, a lesson, whatever's on your mind. Paragraphs separated by a blank line. */
  text: string;
  /** Optional photo alongside the note. */
  image?: string;
  imageAlt?: string;
};

export const PAINTINGS: Painting[] = [
  {
    id: "embarcadero-walk",
    src: "/studio/embarcadero-walk.jpg",
    alt: "Watercolor of the Embarcadero waterfront: a lamppost with two hanging flower baskets in the foreground, a railing, blue bay water, and the shoreline fading into the distance",
    title: "Embarcadero walk",
    medium: "Watercolor + pencil",
    note: "Working on depth and perspective. Also, this is one of my favorite walks along the Embarcadero. It reminds me a bit of Europe.",
  },
  {
    id: "market-dahlias",
    src: "/studio/market-dahlias.jpg",
    alt: "Watercolor and ink bouquet: two pink dahlias with deep crimson centers, a magenta plume, violet blooms, golden and pink grasses, stems drawn inside a glass vase left as an ink outline",
    title: "Market dahlias",
    medium: "Watercolor + ink",
    note: "This is a joint effort: Kaushal sketched, and I painted. We have very different styles (him more measured and detailed, me more fluid and abstract), but they came together to create an intriguing look.",
  },
  {
    id: "rincon-park",
    src: "/studio/rincon-park.jpg",
    alt: "Watercolor and ink of Rincon Park on the Embarcadero: the pink Cupid's Span bow and arrow in the grass, the Hills Bros Coffee building behind, the Bay Bridge overhead, and a few small ink figures along the waterfront",
    title: "Rincon Park",
    medium: "Watercolor + ink",
    note: "And this is why I love my SF walks, such a beautiful city. Started playing with ink sketches of humans!",
  },
  {
    id: "fuchsia-botanical",
    src: "/studio/fuchsia-botanical.jpg",
    alt: "Watercolor and ink fuchsia botanical: pink and purple blooms hanging from a branching stem above a brown pot, with a pale pink-washed sky",
    title: "Fuchsia botanical",
    medium: "Watercolor + ink",
    note: "Love how adding ink changes the feel of the painting. And yes I know the flowerpot shape is off, oh well. I was chatting with a friend and she didn't believe that i don't erase when I sketch... imperfection makes it more me",
  },
];

export const STUDIO_NOTES: StudioNote[] = [
  {
    text: "Gradually learning the different watercolor techniques and improving. My two favorites are the cafe front and fuchsia botanicals because they're with a lighter hand. I have noticed I lean into the mood of what I'm capturing rather than precisely capturing what is in front of me.",
    image: "/studio/the-table.jpg",
    imageAlt:
      "Paintings spread across a table: fuchsia botanicals, a tree on the coast, a café front sketched in ink and wash, purple flowers from Mendocino, and a green hill over water",
  },
];
