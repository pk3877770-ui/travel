"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Art of Sovereign Aviation: Private Jets Redefined",
    excerpt: "Explore the latest trends in luxury private aviation and how Kramana is setting new standards.",
    date: "May 15, 2026",
    author: "Alexis Vance",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a75c3?w=600&q=80",
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

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen pt-32 pb-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-black tracking-[0.3em] text-sm uppercase"
          >
            Insights & Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-outfit mt-4 mb-6 tracking-tighter text-white"
          >
            The Kramana Journal
          </motion.h1>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none group hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-6 left-6 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider text-primary dark:text-accent">
                  {post.category}
                </div>
                <Image
                  src={post.image}
                  alt={`Kramana Journal: ${post.title} - ${post.category} Insights`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-outfit mb-3 group-hover:text-accent transition-colors text-white">
                  {post.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed text-sm flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary dark:text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm"
                  >
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
