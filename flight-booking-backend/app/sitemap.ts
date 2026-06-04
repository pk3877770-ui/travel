import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";

const baseUrl = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://flight-booking-backend-gold.vercel.app";

export const dynamic = "force-dynamic";

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
  const publicSitemap = PUBLIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogSitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...publicSitemap, ...blogSitemap];
}
