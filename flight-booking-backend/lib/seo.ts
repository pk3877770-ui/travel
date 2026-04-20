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
 * Try to connect to MongoDB and read SEO data.
 * Returns null if MongoDB is unavailable.
 */
async function tryMongoRead(routePath: string): Promise<SEOData | null> {
  try {
    const dbConnect = (await import('./mongodb')).default;
    const SeoMeta = (await import('@/models/SeoMeta')).default;
    await dbConnect();
    const doc = await SeoMeta.findOne({ pagePath: routePath }).lean();
    if (!doc) return null;
    return {
      title: doc.title || '',
      description: doc.description || '',
      keywords: doc.keywords || '',
      canonical: doc.canonical || '',
      og_url: doc.og_url || '',
      publisher: doc.publisher || '',
      robots: doc.robots || 'index, follow',
    };
  } catch {
    return null;
  }
}

/**
 * Read SEO data from the JSON file fallback.
 */
function readJsonFile(routePath: string): SEOData | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'seo-data.json');
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const registry: SEORegistry = JSON.parse(fileContent);
    return registry[routePath] || null;
  } catch {
    return null;
  }
}

/**
 * Fetches SEO metadata. Tries MongoDB first, falls back to JSON file.
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

  // Try MongoDB first
  const mongoData = await tryMongoRead(routePath);
  if (mongoData) return { ...defaultSEO, ...mongoData };

  // Fallback to JSON file
  const jsonData = readJsonFile(routePath);
  if (jsonData) return { ...defaultSEO, ...jsonData };

  return defaultSEO;
}

/**
 * Reads all SEO entries. Tries MongoDB first, falls back to JSON file.
 */
export async function getAllSEOData(): Promise<Record<string, any>> {
  try {
    const dbConnect = (await import('./mongodb')).default;
    const SeoMeta = (await import('@/models/SeoMeta')).default;
    await dbConnect();
    const allDocs = await SeoMeta.find({}).lean();
    const map: Record<string, any> = {};
    allDocs.forEach((doc: any) => {
      map[doc.pagePath] = doc;
    });
    return map;
  } catch {
    // Fallback to JSON file
    try {
      const filePath = path.join(process.cwd(), 'public', 'seo-data.json');
      if (!fs.existsSync(filePath)) return {};
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch {
      return {};
    }
  }
}

/**
 * Checks if MongoDB is available
 */
export async function isMongoAvailable(): Promise<boolean> {
  try {
    const dbConnect = (await import('./mongodb')).default;
    await dbConnect();
    return true;
  } catch {
    return false;
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
