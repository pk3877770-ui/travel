"use client";

import dynamic from "next/dynamic";

const SearchSection = dynamic(() => import("@/components/SearchSection"), {
  loading: () => <div className="min-h-[520px]" />,
  ssr: false,
});
const FeaturedOffers = dynamic(() => import("@/components/FeaturedOffers"), {
  loading: () => <div className="min-h-[320px]" />,
  ssr: false,
});
const ExperienceKramana = dynamic(() => import("@/components/ExperienceKramana"), {
  loading: () => <div className="min-h-[320px]" />,
  ssr: false,
});
const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  loading: () => <div className="min-h-[320px]" />,
  ssr: false,
});

export default function HomeInteractiveShell() {
  return (
    <>
      <SearchSection />
      <div className="relative overflow-hidden space-y-24 mb-24">
        <FeaturedOffers />
        <ExperienceKramana />
        <BlogSection />
      </div>
    </>
  );
}
