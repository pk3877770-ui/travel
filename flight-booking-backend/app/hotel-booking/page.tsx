import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import HotelClient from './HotelClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/hotel-booking');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <HotelClient />;
}
