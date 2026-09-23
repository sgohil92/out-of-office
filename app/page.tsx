import { ATLAS } from "../content/atlas";
import { ABOUT } from "../content/about";
import { ENTRIES } from "../content/entries";
import { SECTIONS } from "../content/sections";
import { drawAtlas } from "../lib/atlas";
import Archive from "./components/Archive";

/** Drafts show while you preview on your computer, and stay hidden on the live site. */
const showDrafts = process.env.NODE_ENV !== "production";

export default function Home() {
  const entries = showDrafts ? ENTRIES : ENTRIES.filter((entry) => !entry.draft);
  const { home, doodles, ...words } = ATLAS;
  const drawing = drawAtlas(
    entries.filter((entry) => entry.section === "destinations"),
    home,
    doodles,
  );
  return (
    <Archive
      about={ABOUT}
      entries={entries}
      sections={SECTIONS}
      atlas={{ drawing, words }}
    />
  );
}
