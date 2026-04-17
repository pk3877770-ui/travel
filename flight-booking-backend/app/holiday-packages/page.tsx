import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import HolidayPackagesClient from './HolidayPackagesClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/holiday-packages');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <HolidayPackagesClient />;
}
