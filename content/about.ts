import type { Entry } from "./types";

/** The [ 00 / ABOUT ] drawer. Edit the words here; photo lives in public/about.jpg */
export const ABOUT: Entry = {
  id: "manifesto",
  section: "about",
  index: "00",
  date: "",
  title: "Why I'm doing this",
  dek: "",
  // One paragraph per line, in quotes, each ending with a comma.
  // The first one is the welcome line under the site title; the About drawer starts from the second.
  body: [
    "On pause from standard orbits to focus on reflection, curiosity, and creative flow.",
    "Y'all know I quit my job end of June-ish and turned down another one in July because something just felt misaligned. I went from degree to degree, climbed the ladder, did everything “right”… and one day I didn't recognize myself.",
    "When I was little and people asked what I wanted to be, I said a Renaissance woman. So that's what I'm doing now: painting, dancing, cooking my way through the farmers market, writing, and letting myself be the free-spirited kid I used to be. I wonder what awe-inspiring experiences and new passions I'll uncover along the way.",
    "Since I don't have any social media, this is a more personal digital journal of sorts, a way to capture the transition in real time. Honestly, I have no idea what's next. But I have full conviction I made the right choice, and that whatever comes will be beautiful.",
    "I'll probably update this once a week. If you see an invite up top, come along! Thanks for being part of my life. I appreciate you, friends :)",
  ].join("\n\n"),
  image: "/about.jpg",
  imageAlt: "Portrait at a vineyard, glass of red wine in hand",
  imageAspect: "portrait",
  tags: [],
  stamp: "[ 00 / ABOUT ]",
};
