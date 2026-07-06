"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HelpSidebar from "@/components/HelpSidebar";

export default function HelpTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  
  // Simple slug formatting
  const formattedSlug = resolvedParams.slug
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
              <h1 className="text-3xl font-black text-slate-800 mb-6">
                {formattedSlug}
              </h1>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6">
                  Here you can find all the information related to {formattedSlug.toLowerCase()}. We are continuously updating our help center to provide you with the most accurate and helpful information.
                </p>
                
                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  {/* Dummy content for presentation */}
                  <div className="border border-slate-100 rounded-xl p-5 hover:border-blue-100 transition-colors cursor-pointer">
                    <h4 className="font-bold text-slate-800 mb-2">How do I manage my {formattedSlug.toLowerCase()}?</h4>
                    <p className="text-sm text-slate-500">You can manage your {formattedSlug.toLowerCase()} by logging into your account and navigating to the relevant section in your dashboard.</p>
                  </div>
                  
                  <div className="border border-slate-100 rounded-xl p-5 hover:border-blue-100 transition-colors cursor-pointer">
                    <h4 className="font-bold text-slate-800 mb-2">What are the policies regarding {formattedSlug.toLowerCase()}?</h4>
                    <p className="text-sm text-slate-500">Our policies are designed to be fair and transparent. Please refer to our detailed terms and conditions for specific scenarios.</p>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-slate-800 mb-2">Still need help?</h4>
                  <p className="text-sm text-slate-600 mb-4">If you couldn't find the answer to your question, our support team is available 24/7.</p>
                  <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors">
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
