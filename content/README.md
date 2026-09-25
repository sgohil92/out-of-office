# Adding something to the site

Edit files in this folder. You do not need to touch `app/`.

Save the file, and the local site refreshes. Photos go in `public/`, then you point at them with a path that starts with `/`.

## Where each thing lives

| What you want to change | File |
| --- | --- |
| The backstory (About drawer) | `content/about.ts` |
| Section titles and the sentence under them | `content/sections.ts` |
| A trip, a pondering, a wish, a book | `content/entries.ts` |
| This week's Current Mood (and past weeks) | `content/mood.ts` |
| The road atlas title, jokes, and dog's name | `content/atlas.ts` |
| An invite on the main page | `content/invites.ts` |
| A painting or a studio note | `content/studio.ts` |
| Photos | `public/` — see below |

## Add a trip (Destinations)

The road atlas draws itself from your stops and zooms to fit them, so a stop anywhere in the world works. Stops are listed **newest at the top**. On the map they're numbered in the order you traveled (your first trip is 01), and Truffles travels them in that order, starting from home. Copy a block, give it a new `id`, put it **at the top** of the `section: "destinations"` entries, and give it the next `index` number (after 01.04 comes 01.05).

```ts
{
  id: "lisbon",
  section: "destinations",
  index: "01.05",
  date: "10.2026",
  place: "Lisbon",
  title: "Lisbon",
  dek: "Tiles and custard tarts.",
  body: "A short note.\n\nA second paragraph after a blank line.",
  pin: [38.7223, -9.1393],
  arrive: "fly",
  images: ["/destinations/lisbon/01.jpg", "/destinations/lisbon/02.jpg"],
  imageAlts: ["Tram on a hill", "Courtyard"],
  imageAspects: ["landscape", "portrait"],
  tags: [],
},
```

- **Home base** (San Francisco) is the entry with `homeBase: true`. It isn't a numbered stop: it opens from the little house marked SF on the map. Add local outings to its `body` as `* ` lines, newest first.
- `pin` is where it sits on the map: `[latitude, longitude]`. In Google Maps, right-click the spot; the numbers at the top of the menu are the pin. Click them to copy.
- `arrive` is how Truffles gets there from the stop before it in time (the one listed just below it): `"drive"` (roadster), `"paddle"` (paddleboard) or `"fly"` (biplane).
- `dek` shows in pencil next to the place name on the map.
- `imageCaptions` (optional) puts a short line under each photo, like where it was taken. Same order as `images`; use `""` to skip one.
- In `body`, a paragraph whose lines start with `* ` becomes a bulleted list.
- `featured` (optional) shows a photo big and pinned, between the story and the rest, with an optional red stamp: `featured: [{ src: "/destinations/colombia/colombia-08.jpg" }]`. Add `stamp: "SOME WORDS"` if you ever want one.
- Photos go in `public/destinations/lisbon/`. `portrait` is taller (you in the frame). `landscape` is wider (a view).

The map's title, home pin and optional doodles (bone, ball, nap zone, ocean label) live in `content/atlas.ts`. Change the map's name with `title` there.

## Invites

Each entry in `content/invites.ts` shows as a ticket at the top of the main page, with an RSVP button that opens an email to you. Set `until` to the last day it should show (`MM.DD.YYYY`); it disappears on its own the day after. To use a link instead of email (Partiful, a group chat), set `rsvpLink`. No invites = no ticket strip. To park one without deleting it, add `hidden: true` (remove that line to bring it back).

## Play

Each `section: "play"` entry sits on one object on the table. Set `hobby` to `"dance"`, `"painting"`, `"market"` (farmer's market), or `"writing"` to choose which. Change `title` and `body` to write about it.

### Painting: the studio wall

Tapping the painting on the table opens your studio wall, a running portfolio with no dates. In `content/studio.ts`:

- **A painting:** copy a block in `PAINTINGS` and put it at the top. `note` is your caption, shown right under the painting on the wall. Photos go in `public/studio/`.
- **A studio note:** add a `text` to `STUDIO_NOTES`, newest at the top. A note doesn't need to go with a painting; it's your running stream of thoughts. It can have an `image` if you like.

### Dance videos

Put the video files in `public/play/`, then add them to the dance entry:

```ts
videos: [
  { src: "/play/dance-01.mp4", caption: "Salsa, week two", aspect: "portrait" },
  { src: "/play/dance-02.mp4", aspect: "portrait" },
],
```

They play in the drawer when someone clicks the record. Use `"portrait"` for phone videos filmed upright. Keep each file under about 10 MB (see Photos and videos below).

## Shelf (books + podcasts)

Every `section: "bookshelf"` entry is a book spine on the top shelf. The spine shows `title`, or `spine` if you set it (use it for a shorter version).

Add `format: "podcast"` and it goes on the iPod instead (bottom shelf). Picking one shows "Now Playing" with your `body` as a note and a LISTEN → button for `link`. Right now the iPod plays one show at a time: the others have `hidden: true`, which keeps them in the file without showing them anywhere. To swap, move `hidden: true` from the new favorite to the old one. With just one show, tapping the iPod opens straight to Now Playing.

```ts
{
  id: "some-podcast",
  section: "bookshelf",
  format: "podcast",
  index: "03.07",
  date: "",
  title: "Episode or show name",
  dek: "Host name",
  body: "Why I loved it.",
  link: "https://…",
  tags: [],
},
```

### "Recommend a book or podcast" slip

It opens from the "+ recommend a book or podcast" line just under the bookcase. Recommendations are emailed to the address in `content/contact.ts` through Resend (resend.com), a free email-sending service. To switch it on:

1. Make a free account at resend.com with that same email address, and create an API key.
2. On your computer, add a line to `.env.local`: `RESEND_API_KEY=re_...` (then restart the preview).
3. On the live site, add `RESEND_API_KEY` in the host's environment variable settings.

Until then, the slip says it couldn't file automatically and offers "Email it" and "Copy it" instead, so nothing gets lost.

## Current mood

The quiet note under the site title lives in `content/mood.ts`. Add each new week at the **top** of `MOODS` (`week` like "Week of 9/28", and `text`). The newest one shows on the page; all of them, this week included, open from the "ARCHIVE →" link under it.

Ponderings, the longer essays, are the `section: "mood"` entries in `entries.ts`. They open from the typed page on the Play table. The list sorts itself: pieces still brewing (no `date` yet) come first, then finished pieces by their month (`date: "09.2026"`), newest first. A topic you haven't written yet gets `future: true` and sits under "Future topics"; remove that line once you start writing it.

## What's next

Each `section: "next"` entry is one line in the journal. `title` is the line (keep it short, it's one line). `body` is what opens when someone taps it; leave it `""` and the line just sits in the journal (not tappable). Add `done: true` when you've done it: it gets a pencil check mark and a strike-through, and the "done" count goes up. Long lines wrap onto the next ruled line.

The last line of the journal lets friends "suggest something for me to try". Suggestions are emailed to you the same way as book recommendations (needs the same `RESEND_API_KEY`).

## Drafts

Anything with `draft: true` shows while you preview on your computer but is hidden on the live site. When an entry is ready, remove `draft: true`.

## Photos and videos

Resize photos before you add them: longest side about 1600 pixels, JPEG or WebP. Phone photos straight off the camera will make the site feel heavy.

Videos: export at 720p (on a Mac, in Finder right-click the file → Encode Selected Video Files → 720p). Aim for under 10 MB per clip.

## The passphrase

The passphrase is not in the code. On your computer it lives in `.env.local` as `SITE_PASSWORD=...`. On the live site, set `SITE_PASSWORD` in the host's environment variable settings. Changing it signs everyone out.
