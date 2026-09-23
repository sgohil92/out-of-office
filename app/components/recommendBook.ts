"use server";

import { cookies } from "next/headers";
import { CONTACT_EMAIL } from "../../content/contact";
import { PASS_COOKIE, isValidPass } from "../../lib/auth";

export type Slip = { title: string; author: string; why: string; name: string; website?: string };

export type RecommendResult =
  | { ok: true }
  /** "not-set-up": no RESEND_API_KEY yet. "failed": the email service said no. */
  | { ok: false; reason: "invalid" | "not-set-up" | "failed" };

const LIMITS = { title: 200, author: 200, why: 2000, name: 100 };

/**
 * Emails a book recommendation to CONTACT_EMAIL through Resend (resend.com).
 * Needs RESEND_API_KEY in .env.local on your computer and in the host's settings.
 */
export async function recommendBook(slip: Slip): Promise<RecommendResult> {
  // Only signed-in readers can send; the gate doesn't cover form posts on its own.
  if (!(await isValidPass((await cookies()).get(PASS_COOKIE)?.value))) {
    return { ok: false, reason: "invalid" };
  }
  // A hidden field real people never fill in; bots do.
  if (slip.website) return { ok: true };

  const clean = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);
  const title = clean(slip.title, LIMITS.title);
  const author = clean(slip.author, LIMITS.author);
  const why = clean(slip.why, LIMITS.why);
  const name = clean(slip.name, LIMITS.name);
  if (!title) return { ok: false, reason: "invalid" };

  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { ok: false, reason: "not-set-up" };

  const text = [
    `Title: ${title}`,
    `Author: ${author || "—"}`,
    "",
    "Why you should read it:",
    why || "—",
    "",
    `— ${name || "A visitor to the reading room"}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Otherwise Occupied <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        subject: `Book recommendation: ${title}`,
        text,
      }),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
