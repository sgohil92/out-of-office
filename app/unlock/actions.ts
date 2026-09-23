"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PASS_COOKIE, PASS_MAX_AGE, isCorrectPassphrase, passToken } from "../../lib/auth";

export async function unlock(_prev: { error: boolean }, formData: FormData) {
  const attempt = String(formData.get("passcode") ?? "");
  const token = await passToken();

  if (!token || !(await isCorrectPassphrase(attempt))) {
    // A short pause makes guessing thousands of passphrases impractical.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: true };
  }

  (await cookies()).set(PASS_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PASS_MAX_AGE,
  });
  redirect("/");
}
