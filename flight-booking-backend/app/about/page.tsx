import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import AboutClient from './AboutClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/about');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <AboutClient />;
}
