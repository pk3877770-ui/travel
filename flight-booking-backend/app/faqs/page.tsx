import FaqBanner from "./components/FaqBanner";
import PopularTopics from "./components/PopularTopics";
import FaqSidebar from "./components/FaqSidebar";
import FaqAccordion from "./components/FaqAccordion";
import FaqContactSection from "./components/FaqContactSection";
import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";


export async function generateMetadata() {
  const seo = await getSEOMetadata("/faqs");
  return mapSEOToMetadata(seo);
}

import { Suspense } from "react";

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <FaqBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 pb-12">
        <PopularTopics />
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading FAQs...</div>}>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <FaqSidebar />
            <FaqAccordion />
          </div>
        </Suspense>
      </div>

      <FaqContactSection />
    </div>
  );
}
