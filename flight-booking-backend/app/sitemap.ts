import { MetadataRoute } from "next";

const baseUrl = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://flight-booking-backend-gold.vercel.app";

export const dynamic = "force-static";

const PUBLIC_ROUTES = [
  "",
  "/flights",
  "/hotels",
  "/holiday-packages",
  "/services",
  "/about",
  "/contact",
  "/faq",
  "/blog",
  "/help-center",
  "/ticket-inquiry",
  "/refund",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
