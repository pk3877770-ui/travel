import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import PageClient from './PageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <PageClient />;
}
