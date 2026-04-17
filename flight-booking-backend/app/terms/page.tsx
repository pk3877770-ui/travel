import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import TermsClient from './TermsClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/terms');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <TermsClient />;
}
