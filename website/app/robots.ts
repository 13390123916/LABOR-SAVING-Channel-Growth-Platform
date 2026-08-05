import type { MetadataRoute } from "next";
import { siteBaseUrl } from "./site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/"
    },
    sitemap: new URL("/sitemap.xml", siteBaseUrl).toString(),
    host: siteBaseUrl
  };
}
