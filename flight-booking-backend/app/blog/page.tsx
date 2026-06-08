"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import BlogCard, { BlogPost } from "@/components/BlogCard";
import BlogSidebar from "@/components/BlogSidebar";
import Pagination from "@/components/Pagination";

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Most Beautiful Places to Visit in Maldives",
    category: "DESTINATIONS",
    excerpt: "From crystal-clear waters to luxury resorts, explore the most beautiful places that make Maldives a perfect tropical getaway.",
    date: "May 20, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", // Maldives tropical
    author: {
      name: "Ananya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
    }
  },
  {
    id: "2",
    title: "A Complete Travel Guide to Greece in 2025",
    category: "TRAVEL GUIDES",
    excerpt: "Everything you need to know before visiting Greece — visa, best time, places, food, budget and travel tips.",
    date: "May 18, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", // Greece Santorini
    author: {
      name: "Rohit Verma",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80"
    }
  },
  {
    id: "3",
    title: "Solo Travel Tips for a Safe and Memorable Journey",
    category: "TRAVEL TIPS",
    excerpt: "Planning your first solo trip? Here are some essential tips to ensure a safe, fun and unforgettable experience.",
    date: "May 15, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80", // Solo traveler
    author: {
      name: "Priya Nair",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
    }
  },
  {
    id: "4",
    title: "Top 7 Things to Do in Japan for First-Time Visitors",
    category: "DESTINATIONS",
    excerpt: "From temples to technology, explore the best experiences and attractions Japan has to offer.",
    date: "May 12, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", // Japan Fuji/Cherry blossoms
    author: {
      name: "Karan Malhotra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    }
  }
];

// Generate enough mock posts to make pagination functional
const allPosts: BlogPost[] = Array.from({ length: 44 }).map((_, i) => ({
  ...mockPosts[i % mockPosts.length],
  id: String(i + 1),
  title: `${mockPosts[i % mockPosts.length].title} (Post ${i + 1})`
}));

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allPosts.length / itemsPerPage);

  const currentPosts = allPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-[#fafbfe] pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="relative w-full h-[450px]">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80" // Travel landscape
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
            
            <div className="flex flex-col gap-8">
              {currentPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
