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
    text: "Feeling a bit indulgent and bored with the city, so trying to find its swankier side. Has to exist, right? Let's try the SF Symphony and Bar Crenn. Although if anyone tries to talk productivity or AI to me, I will not-so-politely pull an Irish goodbye.",
  },
];
