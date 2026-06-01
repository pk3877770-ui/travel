/** Canonical site origin for sitemaps, robots, and SEO metadata. */
const FALLBACK_SITE_URL = "https://flight-booking-backend-gold.vercel.app";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  return FALLBACK_SITE_URL;
}
