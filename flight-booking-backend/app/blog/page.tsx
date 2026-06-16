"use client";

import React, { useMemo, Suspense, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import BlogCard, { BlogPost } from "@/components/BlogCard";
import BlogSidebar from "@/components/BlogSidebar";
import { useSearchParams } from "next/navigation";

import { allPosts } from "@/lib/mockBlogData";

function BlogContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category')?.toUpperCase();
  const [currentPage, setCurrentPage] = useState(1);

  // If filter changes, reset to page 1
  React.useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

  const filteredPosts = useMemo(() => {
    if (!categoryFilter) return allPosts;
    return allPosts.filter(post => post.category === categoryFilter);
  }, [categoryFilter]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-8">
      {categoryFilter && (
        <div className="bg-white px-6 py-3 rounded-lg border border-slate-200 shadow-sm inline-block w-fit mb-2">
          <span className="text-slate-500 font-medium text-sm">Showing <span className="font-bold text-blue-600">{filteredPosts.length}</span> posts for <span className="font-bold text-slate-800">"{categoryFilter}"</span></span>
        </div>
      )}
      <div className="flex flex-col gap-8">
        {currentPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 border-t border-slate-200 pt-8">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors font-medium"
          >
            &larr;
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
                    currentPage === page 
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30" 
                      : "bg-white border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="text-slate-400 px-1">...</span>;
            }
            return null;
          })}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors font-medium"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Kramana Travel Blog",
      "description": "Travel Stories, Tips & Inspiration from around the world.",
      "publisher": {
        "@type": "Organization",
        "name": "Kramana"
      },
      "blogPost": allPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author.name
        }
      }))
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fafbfe] pb-20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* Hero Section */}
      <div className="relative w-full h-[450px]">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          alt="Travel Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 container max-w-[1200px] mx-auto px-4 pt-36 h-full flex flex-col justify-center">
          <span className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Travel Blog</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight max-w-2xl leading-tight">
            Travel Stories, Tips & Inspiration
          </h1>
          <p className="text-lg text-white/90 font-medium max-w-md mb-8">
            Discover amazing destinations, travel tips, guides and stories from around the world.
          </p>
          
          {/* Inline Search Bar */}
          <div className="flex items-center bg-slate-900/50 backdrop-blur-md border border-white/20 rounded-xl p-2 max-w-xl">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-white/50" />
              <input 
                type="text" 
                placeholder="Search for destinations, tips, guides..." 
                className="w-full bg-transparent outline-none text-white placeholder-white/50 text-sm font-medium"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-bold transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-200 pb-4">
              Latest Articles
            </h2>
            
            <Suspense fallback={<div className="font-bold text-slate-500 animate-pulse">Loading articles...</div>}>
              <BlogContent />
            </Suspense>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>

        </div>
      </div>

    </main>
  );
}
