# Adding something to the site

Edit files in this folder. You do not need to touch `app/`.

Save the file, and the local site refreshes. Photos go in `public/`, then you point at them with a path that starts with `/`.

## Where each thing lives

| What you want to change | File |
| --- | --- |
| About drawer (the three paragraphs) | `content/about.ts` |
| Section titles and the sentence under them | `content/sections.ts` |
| A trip, a mood note, a wish, a book | `content/entries.ts` |
| Photos | `public/` — see below |

## Add a trip (Destinations)

Stops appear left to right in the order they appear in `entries.ts`. Copy a block, give it a new `id`, and put it with the other `section: "destinations"` entries.

```ts
{
  id: "mexico",
  section: "destinations",
  index: "01.05",
  date: "10.02.2026",
  place: "Oaxaca",
  title: "Oaxaca",
  dek: "",
  body: "A short note.\n\nA second paragraph after a blank line.",
  images: ["/destinations/mexico/01.jpg", "/destinations/mexico/02.jpg"],
  imageAlts: ["Market stall", "Courtyard"],
  imageAspects: ["landscape", "portrait"],
  tags: [],
},
```

Drop the files in `public/destinations/mexico/`. `portrait` is taller (you in the frame). `landscape` is wider (a view).

## Play

Each `section: "play"` entry sits on one object on the table. Set `hobby` to `"dance"`, `"painting"`, `"cooking"`, or `"writing"` to choose which. Change `title` and `body` to write about it.

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

## Current mood

The newest `section: "mood"` entry (last one in the list) is the handwritten line at the top, if its `body` is a real sentence and not `[ Entry forthcoming. ]`. Older ones stay in Ponderings.

## What's next

Each `section: "next"` entry is one line on the ruled paper. `title` is the line. `body` is what opens in the drawer.

## Drafts

Anything with `draft: true` (including every `placeholder(...)` line) shows while you preview on your computer but is hidden on the live site. When an entry is ready, replace the placeholder with a full block, or remove `draft: true`.

## Photos and videos

Resize photos before you add them: longest side about 1600 pixels, JPEG or WebP. Phone photos straight off the camera will make the site feel heavy.

Videos: export at 720p (on a Mac, in Finder right-click the file → Encode Selected Video Files → 720p). Aim for under 10 MB per clip.

## The passphrase

The passphrase is not in the code. On your computer it lives in `.env.local` as `SITE_PASSWORD=...`. On the live site, set `SITE_PASSWORD` in the host's environment variable settings. Changing it signs everyone out.
