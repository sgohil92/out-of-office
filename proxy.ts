import { NextResponse, type NextRequest } from "next/server";
import { PASS_COOKIE, isValidPass } from "./lib/auth";

/**
 * The door to the reading room. Every request — the page, photos, videos —
 * must carry a valid pass cookie, or it is sent to /unlock.
 */
export async function proxy(request: NextRequest) {
  if (await isValidPass(request.cookies.get(PASS_COOKIE)?.value)) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Everything except the gate itself, the site's code/styles, live-reload
    // while previewing, and the favicon + robots file.
    "/((?!unlock|_next/static|_next/hmr|_next/webpack-hmr|__nextjs|favicon.ico|robots.txt).*)",
  ],
};
