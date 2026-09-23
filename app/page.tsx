import { ATLAS } from "../content/atlas";
import { ABOUT } from "../content/about";
import { ENTRIES } from "../content/entries";
import { INVITES, RSVP_EMAIL } from "../content/invites";
import { SECTIONS } from "../content/sections";
import { drawAtlas } from "../lib/atlas";
import Archive from "./components/Archive";

/** Drafts show while you preview on your computer, and stay hidden on the live site. */
const showDrafts = process.env.NODE_ENV !== "production";

/** The site's publish date, for the "Last updated" stamp. */
function today() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getMonth() + 1)}.${pad(d.getDate())}.${d.getFullYear()}`;
}

export default function Home() {
  const entries = showDrafts ? ENTRIES : ENTRIES.filter((entry) => !entry.draft);
  const { home, doodles, ...words } = ATLAS;
  // Stops are listed newest first; Truffles travels them oldest first.
  const drawing = drawAtlas(
    entries.filter((entry) => entry.section === "destinations").reverse(),
    home,
    doodles,
  );
  return (
    <Archive
      about={ABOUT}
      entries={entries}
      sections={SECTIONS}
      atlas={{ drawing, words }}
      updated={today()}
      invites={{
        list: showDrafts ? INVITES : INVITES.filter((invite) => !invite.draft),
        email: RSVP_EMAIL,
      }}
    />
  );
}
