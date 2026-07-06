"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HelpSidebar from "@/components/HelpSidebar";

export default function HelpCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  
  // Simple slug formatting
  const formattedCategory = resolvedParams.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[#fafbfe] font-sans pb-20 pt-28">
      <div className="container max-w-[1200px] mx-auto px-4">
        
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/help" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Help Center
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
              <div className="mb-8">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Category</span>
                <h1 className="text-3xl font-black text-slate-800 mt-2 mb-4">
                  {formattedCategory}
                </h1>
                <p className="text-slate-600 leading-relaxed">
                  Browse all articles, guides, and policies related to {formattedCategory.toLowerCase()}. Select a topic below to find detailed answers to your questions.
                </p>
              </div>
              
              <div className="space-y-6 mt-10">
                <h3 className="text-xl font-bold text-slate-800">Articles in this Category</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Dummy content for presentation */}
                  <Link href={`/help/topic/${resolvedParams.slug}-guide`} className="block border border-slate-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all group">
                    <h4 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Complete Guide to {formattedCategory}</h4>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">Everything you need to know about {formattedCategory.toLowerCase()}, including tips, best practices, and detailed walkthroughs to get you started.</p>
                    <span className="text-sm font-semibold text-blue-600">Read Article &rarr;</span>
                  </Link>
                  
                  <Link href={`/help/topic/${resolvedParams.slug}-faq`} className="block border border-slate-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all group">
                    <h4 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Frequently Asked Questions about {formattedCategory}</h4>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">Find quick answers to the most common questions our users have regarding {formattedCategory.toLowerCase()}.</p>
                    <span className="text-sm font-semibold text-blue-600">Read Article &rarr;</span>
                  </Link>
                </div>

                <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Still need help?</h4>
                    <p className="text-sm text-slate-600">Our support team is available 24/7 to assist you.</p>
                  </div>
                  <Link href="/contact" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1">
            <HelpSidebar />
          </div>

        </div>
      </div>
    </main>
  );
}
