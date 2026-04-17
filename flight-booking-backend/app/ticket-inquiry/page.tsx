import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import TicketClient from './TicketClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/ticket-inquiry');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return <TicketClient />;
}
