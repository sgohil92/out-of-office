/**
 * Invites: the ticket pinned at the top of the main page.
 *
 * Add one to invite people along. It disappears by itself after its `until`
 * date, and the whole strip hides when there are no invites.
 */

/** Where RSVPs go. Tapping RSVP opens an email to this address. */
export const RSVP_EMAIL = "shwetagohil9@gmail.com";

export type Invite = {
  id: string;
  /** The plan, in a few words. */
  title: string;
  /** When, however you'd say it: "Sat 9.27 · 9am". */
  when: string;
  where: string;
  /** One line of extra detail. Optional. */
  note?: string;
  /** Last day to show it, MM.DD.YYYY. It hides the day after. */
  until: string;
  /** Optional: a link instead of email, like a Partiful or text link. */
  rsvpLink?: string;
  /** true = shows on your computer, hidden on the live site. */
  draft?: boolean;
};

export const INVITES: Invite[] = [
  {
    // A sample so you can see the design. Replace it with a real one, or delete it.
    id: "sample-farmers-market",
    title: "Farmers market, then I cook",
    when: "Sat 9.27 · 9am",
    where: "Ferry Building",
    note: "Help me pick the week's produce. Lunch is on me, results not guaranteed.",
    until: "09.27.2026",
    draft: true,
  },
];
