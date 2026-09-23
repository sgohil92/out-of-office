import { ATLAS } from "../content/atlas";
import { ABOUT } from "../content/about";
import { ENTRIES } from "../content/entries";
import { INVITES, RSVP_EMAIL } from "../content/invites";
import { CURRENT_MOOD } from "../content/mood";
import { SECTIONS } from "../content/sections";
import { PAINTINGS, STUDIO_NOTES } from "../content/studio";
import { drawAtlas } from "../lib/atlas";
import Archive from "./components/Archive";

/** Drafts show while you preview on your computer, and stay hidden on the live site. */
const showDrafts = process.env.NODE_ENV !== "production";

export default function Home() {
  const entries = showDrafts ? ENTRIES : ENTRIES.filter((entry) => !entry.draft);
  const { home, doodles, ...words } = ATLAS;
  // Stops are listed newest first; Truffles travels them oldest first.
  const drawing = drawAtlas(
    entries.filter((entry) => entry.section === "destinations" && !entry.homeBase).reverse(),
    home,
    doodles,
  );
  return (
    <Archive
      about={ABOUT}
      entries={entries}
      sections={SECTIONS}
      atlas={{ drawing, words }}
      studio={{ paintings: PAINTINGS, notes: STUDIO_NOTES }}
      mood={CURRENT_MOOD}
      invites={{
        list: showDrafts ? INVITES : INVITES.filter((invite) => !invite.draft),
        email: RSVP_EMAIL,
      }}
    />
  );
}
