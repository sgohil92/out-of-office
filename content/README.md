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

The table always shows the **first four** `section: "play"` entries, in this order: dance, painting, cooking, writing. Change `title` and `body` on those four. The objects on the table stay the same.

## Bookshelf

Every `section: "bookshelf"` entry is a spine, top shelf first, then the bottom shelf. The title shows up when someone opens the book.

## Current mood

The newest `section: "mood"` entry (last one in the list) is the handwritten line at the top, if its `body` is a real sentence and not `[ Entry forthcoming. ]`. Older ones stay in Ponderings.

## What's next

Each `section: "next"` entry is one line on the ruled paper. `title` is the line. `body` is what opens in the drawer.

## Photos

Resize before you add them: longest side about 1600 pixels, JPEG or WebP. Phone photos straight off the camera will make the site feel heavy.
