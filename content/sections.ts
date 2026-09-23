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
    rubric: "",
  },
  {
    id: "bookshelf",
    title: "SHELF",
    rubric:
      "Seeing where each conversation with friends and strangers takes me. Tell me what to read or listen to next.",
  },
  {
    id: "next",
    title: "WHAT'S NEXT",
    rubric:
      "Places, skills, invitations, and experiments still untried.",
  },
];
