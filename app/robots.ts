import type { MetadataRoute } from "next";

/** A private site: ask search engines not to list any of it. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
