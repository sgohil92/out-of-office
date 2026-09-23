import type { SectionId } from "./types";

/** Section titles and the sentence under each one. Order here is the page order. */
export const SECTIONS: {
  id: SectionId;
  title: string;
  rubric: string;
}[] = [
  {
    id: "destinations",
    title: "DESTINATIONS",
    rubric:
      "Traveling without too much structure—following recommendations and whimsy.",
  },
  {
    id: "play",
    title: "PLAY",
    rubric: "Let my brain wander somewhere new—or forgotten.",
  },
  {
    id: "bookshelf",
    title: "BOOKSHELF",
    rubric:
      "Seeing where each conversation with friends and strangers takes me. Tell me what to read next.",
  },
  {
    id: "mood",
    title: "CURRENT MOOD",
    rubric: "How I'm feeling, and how that's changing.",
  },
  {
    id: "next",
    title: "WHAT'S NEXT",
    rubric:
      "A living wish-list: places, skills, invitations, and experiments still untried.",
  },
];
