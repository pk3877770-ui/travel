import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';

const SearchSection = dynamicImport(() => import('@/components/SearchSection'));
const Features = dynamicImport(() => import('@/components/Features'));
const BestFlightDeals = dynamicImport(() => import('@/components/BestFlightDeals'));
const PopularAirlines = dynamicImport(() => import('@/components/PopularAirlines'));
const BottomFeatures = dynamicImport(() => import('@/components/BottomFeatures'));

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <SearchSection />
      <Features />
      <BestFlightDeals />
      <PopularAirlines />
      <BottomFeatures />
    </main>
  );
}
