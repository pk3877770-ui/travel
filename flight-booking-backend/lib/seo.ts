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

/**
 * Saves SEO metadata. Tries MongoDB first.
 * If MongoDB is unavailable and we're NOT in production, it saves to public/seo-data.json.
 * If we're in production and MongoDB is unavailable, it returns the updated registry for virtual sync.
 */
export async function updateSEOData(pagePath: string, data: SEOData): Promise<{ success: boolean; target: 'mongodb' | 'json' | 'virtual' | 'none'; fullData?: Record<string, any>; error?: string }> {
  // Try MongoDB first
  try {
    const dbConnect = (await import('./mongodb')).default;
    const SeoMeta = (await import('@/models/SeoMeta')).default;
    await dbConnect();
    
    await SeoMeta.findOneAndUpdate(
      { pagePath },
      { ...data, pagePath },
      { upsert: true }
    );
    return { success: true, target: 'mongodb' };
  } catch (mongoError: any) {
    // Read the current JSON fallback to mix with the new change
    let registry: SEORegistry = {};
    try {
      const filePath = path.join(process.cwd(), 'public', 'seo-data.json');
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        registry = JSON.parse(fileContent);
      }
    } catch (e) {}

    registry[pagePath] = data;

    // If MongoDB failed, check if we can save to JSON
    // We only force 'virtual' mode if we are actually deployed on Vercel
    if (process.env.VERCEL === '1') {
       // On Vercel, we return 'virtual' so the user can download the JSON
       return { success: true, target: 'virtual', fullData: registry };
    }

    try {
      const filePath = path.join(process.cwd(), 'public', 'seo-data.json');
      fs.writeFileSync(filePath, JSON.stringify(registry, null, 2));
      return { success: true, target: 'json', fullData: registry };
    } catch (jsonError: any) {
      return { success: false, target: 'none', error: `Both MongoDB and JSON storage failed. JSON Error: ${jsonError.message}`, fullData: registry };
    }
  }
}
