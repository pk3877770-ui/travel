import { updateSEOData, SEOData } from '@/lib/seo';
import { revalidatePath } from 'next/cache';

export async function saveSeoData(prevState: any, formData: FormData) {
    const pageKey = formData.get('page_key') as string;
    if (!pageKey) return { message: 'Page key is missing', status: 'error', timestamp: Date.now() };

    const data: SEOData = {
        title: formData.get('title') as string || '',
        description: formData.get('description') as string || '',
        keywords: formData.get('keywords') as string || '',
        canonical: formData.get('canonical') as string || '',
        og_url: formData.get('og_url') as string || '',
        publisher: formData.get('publisher') as string || '',
        robots: formData.get('robots') as string || 'index, follow'
    };

    try {
        const result = await updateSEOData(pageKey, data);

        if (result.success) {
            let targetName = 'Cloud Database';
            if (result.target === 'json') targetName = 'Local JSON Cache';
            if (result.target === 'virtual') targetName = 'Session Memory (Virtual Sync)';

            revalidatePath('/admin/seo');

            return { 
                message: `Success: Metadata for ${pageKey} updated via ${targetName}!`, 
                status: 'success', 
                timestamp: Date.now(),
                target: result.target,
                fullData: result.fullData // Return the updated data registry for virtual sync
            };
        } else {
            return { 
                message: `Failure: ${result.error || 'Unknown error occurred during sync.'}`, 
                status: 'error', 
                timestamp: Date.now(),
                fullData: result.fullData
            };
        }
    } catch (e: any) {
        return { message: `Critical Error: ${e.message}`, status: 'error', timestamp: Date.now() };
    }
}
