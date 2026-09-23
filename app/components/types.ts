export type { Entry as ArchiveEntry } from "../../content/types";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/** Splits an `MM.DD.YYYY` entry date into postmark parts. */
export function postmark(date: string) {
  const [m = "", d = "", y = ""] = date.split(".");
  return { month: MONTHS[Number(m) - 1] ?? m, day: d, year: y };
}
