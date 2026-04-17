'use server'

import { promises as fs } from 'fs';
import path from 'path';

export async function saveSeoData(prevState: any, formData: FormData) {
    const pageKey = formData.get('page_key') as string;
    if (!pageKey) return { message: 'Page key is missing', status: 'error', timestamp: Date.now() };

    const dataFile = path.join(process.cwd(), 'public', 'seo-data.json');
    let seoData: Record<string, any> = {};
    try {
      const fileData = await fs.readFile(dataFile, 'utf8');
      seoData = JSON.parse(fileData);
    } catch(e) {
      // If it doesn't exist, we'll create a new object
      seoData = {};
    }

    // Merge the new data in
    seoData[pageKey] = {
        title: formData.get('title') as string || '',
        description: formData.get('description') as string || '',
        keywords: formData.get('keywords') as string || '',
        canonical: formData.get('canonical') as string || '',
        og_url: formData.get('og_url') as string || '',
        publisher: formData.get('publisher') as string || '',
        robots: formData.get('robots') as string || 'index, follow'
    };

    try {
        await fs.writeFile(dataFile, JSON.stringify(seoData, null, 4));
        return { message: `Metadata for ${pageKey} updated successfully!`, status: 'success', timestamp: Date.now() };
    } catch (e) {
        return { message: `Error: Could not write to seo-data.json. Check file permissions.`, status: 'error', timestamp: Date.now() };
    }
}
