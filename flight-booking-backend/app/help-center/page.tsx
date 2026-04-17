import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import HelpClient from './HelpClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/help-center');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <HelpClient />;
}
