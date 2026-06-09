"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";
import BlogSidebar from "@/components/BlogSidebar";

// Mock data getter for a single post (since we don't have a real DB yet)
const getMockPost = (id: string) => {
  const images = [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80",
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
  ];
  
  return {
    id,
    title: `Amazing Travel Destination (Post ${id})`,
    category: "TRAVEL GUIDES",
    date: "May 25, 2025",
    readTime: "8 min read",
    image: images[parseInt(id) % images.length] || images[0],
    author: {
      name: "Travel Expert",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
    },
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>Why You Should Visit</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <blockquote>"Traveling – it leaves you speechless, then turns you into a storyteller." – Ibn Battuta</blockquote>
      
      <h3>Top Things to Do</h3>
      <ul>
        <li>Explore the historic downtown and local markets.</li>
        <li>Try the authentic street food and local delicacies.</li>
        <li>Take a guided tour of the main attractions.</li>
        <li>Watch the sunset from the highest viewpoint.</li>
      </ul>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `
  };
};

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching post data
    setPost(getMockPost(params.id));
  }, [params.id]);

  if (!post) {
    return <div className="min-h-screen bg-[#fafbfe] flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-[#fafbfe] pb-20 font-sans pt-28">
      <div className="container max-w-[1200px] mx-auto px-4">
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": [post.image],
              "datePublished": new Date(post.date).toISOString(),
              "author": {
                "@type": "Person",
                "name": post.author.name,
                "url": "https://www.kramana.com/about"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Kramana",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.kramana.com/kramana-logo.png"
                }
              }
            })
          }}
        />

        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2">
            
            {/* Article Header */}
            <div className="mb-8">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200">
                {/* Author & Meta */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                      <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{post.author.name}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-0.5">
                        <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</div>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-blue-600 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-blue-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-sm">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-slate max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Share Footer */}
            <div className="flex items-center justify-between py-6 border-t border-slate-200 mt-12">
              <span className="font-bold text-slate-800">Share this article:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

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
