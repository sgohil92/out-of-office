/**
 * Current Mood: the quiet note under the site title.
 * Add a new week at the TOP of the list. The newest shows on the page;
 * every week (including this one) is kept in the Archive link under it.
 */
export type Mood = {
  /** Small label, like "Week of 9/21". */
  week: string;
  text: string;
};

export const MOODS: Mood[] = [
  {
    week: "Week of 9/21",
    text: "Feeling a bit indulgent and excited for the Symphony, community dinner, and a new cocktail bar (Bar Crenn). SF has to have a swankier side, right?",
  },
];
