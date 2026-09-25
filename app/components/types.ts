export type { Entry as ArchiveEntry } from "../../content/types";

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

/**
 * One way to show a date everywhere.
 * "08.28.2026" → "08.28.2026" (postmark: "08·28·2026")
 * "06.2026"    → "JUNE 2026"  (postmark: "JUNE · 2026")
 * "07-08.2026" → "JUL–AUG 2026"
 */
export function formatDate(date: string, style: "stamp" | "postmark" | "short" = "stamp") {
  if (!date) return "";
  const parts = date.split(".");
  const month = (m: string) => {
    const name = MONTHS[Number(m) - 1] ?? m;
    return style === "short" ? name.slice(0, 3) : name;
  };
  const year = style === "postmark" ? ` · ${parts[parts.length - 1]}` : ` ${parts[parts.length - 1]}`;
  if (parts.length === 3) return style === "postmark" ? parts.join("·") : date;
  if (parts.length !== 2) return date;
  const [from, to] = parts[0].split("-");
  return to ? `${month(from).slice(0, 3)}–${month(to).slice(0, 3)}${year}` : `${month(from)}${year}`;
}
