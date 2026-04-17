import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/contact');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <ContactClient />;
}
