/**
 * The reading-room pass.
 *
 * The passphrase lives in the SITE_PASSWORD environment variable (in
 * `.env.local` on your computer, and in the host's settings when deployed).
 * After someone enters it, their browser gets a cookie holding a signature
 * derived from the passphrase — never the passphrase itself. Changing
 * SITE_PASSWORD changes the signature, which signs everyone out.
 */

export const PASS_COOKIE = "ooo-pass";
export const PASS_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();

async function sign(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(mac), (b) => b.toString(16).padStart(2, "0")).join("");
}

function sameText(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function sitePassword() {
  return process.env.SITE_PASSWORD?.trim() || null;
}

/** The cookie value a signed-in reader holds. Null when no passphrase is configured. */
export async function passToken() {
  const password = sitePassword();
  return password ? sign(password, "otherwise-occupied/reader") : null;
}

export async function isValidPass(token: string | undefined) {
  const expected = await passToken();
  return Boolean(expected && token && sameText(token, expected));
}

export async function isCorrectPassphrase(attempt: string) {
  const password = sitePassword();
  if (!password) return false;
  // Compare signatures rather than raw strings so timing reveals nothing.
  const [a, b] = await Promise.all([
    sign(password, attempt.trim().toLowerCase()),
    sign(password, password.toLowerCase()),
  ]);
  return sameText(a, b);
}
