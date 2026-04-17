import { unstable_noStore as noStore } from 'next/cache';
import dbConnect from './mongodb';
import SeoMeta from '@/models/SeoMeta';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  og_url?: string;
  publisher?: string;
  robots?: string;
}

export interface SEORegistry {
  [key: string]: SEOData;
}

/**
 * Fetches SEO metadata from MongoDB
 * @param routePath The current route (e.g., '/', '/about')
 * @returns SEOData object with defaults if not found
 */
export async function getSEOMetadata(routePath: string): Promise<SEOData> {
  noStore();
  
  const defaultSEO: SEOData = {
    title: "Karmana | Luxury Travel Redefined",
    description: "Experience the art of travel with Karmana's premium concierge services.",
    keywords: "luxury travel, concierge, flights, hotels",
    canonical: "https://karmana.com" + routePath,
    og_url: "https://karmana.com" + routePath,
    publisher: "https://karmana.com",
    robots: "index, follow"
  };

  try {
    await dbConnect();
    const doc = await SeoMeta.findOne({ pagePath: routePath }).lean();

    if (!doc) {
      return defaultSEO;
    }

    return {
      title: doc.title || defaultSEO.title,
      description: doc.description || defaultSEO.description,
      keywords: doc.keywords || defaultSEO.keywords,
      canonical: doc.canonical || defaultSEO.canonical,
      og_url: doc.og_url || defaultSEO.og_url,
      publisher: doc.publisher || defaultSEO.publisher,
      robots: doc.robots || defaultSEO.robots,
    };
  } catch (error) {
    console.error('Error reading SEO metadata from DB:', error);
    return defaultSEO;
  }
}

/**
 * Maps the internal SEO data format to the Next.js Metadata object
 */
export function mapSEOToMetadata(seo: SEOData): any {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      url: seo.og_url || seo.canonical,
    },
    other: {
      'publisher': seo.publisher || '',
    }
  };
}
