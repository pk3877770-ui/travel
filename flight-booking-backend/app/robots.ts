import { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://flight-booking-backend-gold.vercel.app";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/profile/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
