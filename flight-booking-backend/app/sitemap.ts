import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const PUBLIC_ROUTES = [
  "",
  "/flights",
  "/hotels",
  "/holiday-packages",
  "/services",
  "/about",
  "/contact",
  "/blog",
  "/help-center",
  "/ticket-inquiry",
  "/refund",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
