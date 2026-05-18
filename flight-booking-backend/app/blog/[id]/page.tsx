"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Art of Sovereign Aviation: Private Jets Redefined",
    excerpt: "Explore the latest trends in luxury private aviation and how Kramana is setting new standards.",
    date: "May 15, 2026",
    author: "Alexis Vance",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80",
    category: "Aviation",
  },
  {
    id: 2,
    title: "Hidden Gems of the Maldives: Beyond the Resorts",
    excerpt: "Discover the untouched atolls and exclusive experiences that await the discerning traveler.",
    date: "May 10, 2026",
    author: "Elena Rostova",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    category: "Destinations",
  },
  {
    id: 3,
    title: "Culinary Journeys: Bespoke Dining at 30,000 Feet",
    excerpt: "How world-class chefs are transforming the in-flight dining experience for our members.",
    date: "May 05, 2026",
    author: "Marcus Chen",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    category: "Lifestyle",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id;
  
  const post = posts.find(p => p.id.toString() === id);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center bg-[#020617]">
        <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-accent hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen pt-32 pb-20">
      <div className="container max-w-4xl mx-auto px-6">
        <Link href="/blog" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        
        <div className="relative h-96 rounded-[2rem] overflow-hidden mb-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="text-white">
          <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black font-outfit mt-4 mb-6 tracking-tighter text-white">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>
          
          <p className="text-slate-400 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <p className="text-slate-400 leading-relaxed">
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin nisl. Integer placerat tristique nisl. Mauris quis tortor ut risus egestas egestas. Sed dictum mollis augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </div>
      </div>
    </div>
  );
}
