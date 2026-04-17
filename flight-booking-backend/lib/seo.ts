import { unstable_noStore as noStore } from 'next/cache';
import fs from 'fs';
import path from 'path';

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
 * Fetches SEO metadata from the shared JSON file
 * @param routePath The current route (e.g., '/', '/about')
 * @returns SEOData object with defaults if not found
 */
export async function getSEOMetadata(routePath: string): Promise<SEOData> {
  noStore();
  const filePath = path.join(process.cwd(), 'public', 'seo-data.json');
  
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
    if (!fs.existsSync(filePath)) {
      return defaultSEO;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const seoRegistry: SEORegistry = JSON.parse(fileContent);

    return seoRegistry[routePath] || defaultSEO;
  } catch (error) {
    console.error('Error reading SEO metadata:', error);
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
