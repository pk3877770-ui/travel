import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import SubscribeClient from './SubscribeClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/subscribe');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <SubscribeClient />;
}
