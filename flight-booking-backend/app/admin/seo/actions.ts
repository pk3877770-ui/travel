'use server'

import dbConnect from '@/lib/mongodb';
import SeoMeta from '@/models/SeoMeta';

export async function saveSeoData(prevState: any, formData: FormData) {
    const pageKey = formData.get('page_key') as string;
    if (!pageKey) return { message: 'Page key is missing', status: 'error', timestamp: Date.now() };

    try {
        await dbConnect();

        await SeoMeta.findOneAndUpdate(
            { pagePath: pageKey },
            {
                pagePath: pageKey,
                title: formData.get('title') as string || '',
                description: formData.get('description') as string || '',
                keywords: formData.get('keywords') as string || '',
                canonical: formData.get('canonical') as string || '',
                og_url: formData.get('og_url') as string || '',
                publisher: formData.get('publisher') as string || '',
                robots: formData.get('robots') as string || 'index, follow'
            },
            { upsert: true, new: true }
        );

        return { message: `Metadata for ${pageKey} updated successfully!`, status: 'success', timestamp: Date.now() };
    } catch (e: any) {
        return { message: `Error: Could not save SEO data. Details: ${e.message}`, status: 'error', timestamp: Date.now() };
    }
}
