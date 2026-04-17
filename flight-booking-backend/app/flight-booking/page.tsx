import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import FlightClient from './FlightClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/flight-booking');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <FlightClient />;
}
