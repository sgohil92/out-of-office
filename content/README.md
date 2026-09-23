# Adding something to the site

Edit files in this folder. You do not need to touch `app/`.

Save the file, and the local site refreshes. Photos go in `public/`, then you point at them with a path that starts with `/`.

## Where each thing lives

| What you want to change | File |
| --- | --- |
| About drawer, and the welcome line under the title (its first paragraph) | `content/about.ts` |
| Section titles and the sentence under them | `content/sections.ts` |
| A trip, a mood note, a wish, a book | `content/entries.ts` |
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

- `pin` is where it sits on the map: `[latitude, longitude]`. In Google Maps, right-click the spot; the numbers at the top of the menu are the pin. Click them to copy.
- `arrive` is how Truffles gets there from the stop before it in time (the one listed just below it): `"drive"` (roadster), `"paddle"` (paddleboard) or `"fly"` (biplane).
- `dek` shows in pencil next to the place name on the map.
- `imageCaptions` (optional) puts a short line under each photo, like where it was taken. Same order as `images`; use `""` to skip one.
- In `body`, a paragraph whose lines start with `* ` becomes a bulleted list.
- `featured` (optional) shows a photo big and pinned, between the story and the rest, with an optional red stamp: `featured: [{ src: "/destinations/colombia/colombia-08.jpg" }]`. Add `stamp: "SOME WORDS"` if you ever want one.
- Photos go in `public/destinations/lisbon/`. `portrait` is taller (you in the frame). `landscape` is wider (a view).

The map's title, jokes, home pin and doodles (bone, ball, nap zone, ocean label) live in `content/atlas.ts`. Put your dog's name in `dogName` there.

## Invites

Each entry in `content/invites.ts` shows as a ticket at the top of the main page, with an RSVP button that opens an email to you. Set `until` to the last day it should show (`MM.DD.YYYY`); it disappears on its own the day after. To use a link instead of email (Partiful, a group chat), set `rsvpLink`. No invites = no ticket strip.

## Play

Each `section: "play"` entry sits on one object on the table. Set `hobby` to `"dance"`, `"painting"`, `"market"` (farmer's market), or `"writing"` to choose which. Change `title` and `body` to write about it.

### Painting: the studio wall

Tapping the painting on the table opens your studio wall, a running portfolio with no dates. In `content/studio.ts`:

- **A painting:** copy a block in `PAINTINGS` and put it at the top. `note` is your caption (shown in pencil when it's opened). `favorite: true` gives it a pin. Photos go in `public/studio/`.
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

## Bookshelf

Every `section: "bookshelf"` entry is a spine, top shelf first, then the bottom shelf. The spine shows `title`, or `spine` if you set it; use `spine` for a shorter version when the title is long.

### "Recommend a book" slip

Recommendations are emailed to the address in `content/contact.ts` through Resend (resend.com), a free email-sending service. To switch it on:

1. Make a free account at resend.com with that same email address, and create an API key.
2. On your computer, add a line to `.env.local`: `RESEND_API_KEY=re_...` (then restart the preview).
3. On the live site, add `RESEND_API_KEY` in the host's environment variable settings.

Until then, the slip says it couldn't file automatically and offers "Email it" and "Copy it" instead, so nothing gets lost.

## Current mood

The newest `section: "mood"` entry (last one in the list) is the handwritten line at the top, if its `body` is a real sentence and not `[ Entry forthcoming. ]`. Older ones stay in Ponderings.

## What's next

Each `section: "next"` entry is one line on the yellow notepad. `title` is the line (keep it short, it's one line). `body` is what opens when someone taps it; leave it `""` and the line just sits on the pad (not tappable). Add `done: true` when you've done it: it gets a pencil check mark and a strike-through, and the "done" count goes up. Long lines wrap onto the next ruled line.

At the bottom of the pad, friends can "suggest something for me to try". Suggestions are emailed to you the same way as book recommendations (needs the same `RESEND_API_KEY`).

## Drafts

Anything with `draft: true` (including every `placeholder(...)` line) shows while you preview on your computer but is hidden on the live site. When an entry is ready, replace the placeholder with a full block, or remove `draft: true`.

## Photos and videos

Resize photos before you add them: longest side about 1600 pixels, JPEG or WebP. Phone photos straight off the camera will make the site feel heavy.

Videos: export at 720p (on a Mac, in Finder right-click the file → Encode Selected Video Files → 720p). Aim for under 10 MB per clip.

## The passphrase

The passphrase is not in the code. On your computer it lives in `.env.local` as `SITE_PASSWORD=...`. On the live site, set `SITE_PASSWORD` in the host's environment variable settings. Changing it signs everyone out.
