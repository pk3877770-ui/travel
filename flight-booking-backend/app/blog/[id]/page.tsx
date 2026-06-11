"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";
import BlogSidebar from "@/components/BlogSidebar";

import { getPostById } from "@/lib/mockBlogData";

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const [post, setPost] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Simulate fetching post data
    setPost(getPostById(unwrappedParams.id));
    
    const saved = JSON.parse(localStorage.getItem('saved_blogs') || '[]');
    if (saved.includes(unwrappedParams.id)) {
      setIsSaved(true);
    }
  }, [unwrappedParams.id]);

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('saved_blogs') || '[]');
    if (isSaved) {
      const newSaved = saved.filter((id: string) => id !== unwrappedParams.id);
      localStorage.setItem('saved_blogs', JSON.stringify(newSaved));
      setIsSaved(false);
      showToast("Removed from saved blogs");
    } else {
      saved.push(unwrappedParams.id);
      localStorage.setItem('saved_blogs', JSON.stringify(saved));
      setIsSaved(true);
      showToast("Blog saved successfully!");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: url
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard!");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  if (!post) {
    return <div className="min-h-screen bg-[#fafbfe] flex items-center justify-center font-bold text-slate-500">Blog post not found!</div>;
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
                  <button 
                    onClick={handleSave}
                    title={isSaved ? "Remove from saved" : "Save this blog"}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isSaved ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-600'}`}
                  >
                    <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={handleShare}
                    title="Share this blog"
                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-blue-600 transition-colors"
                  >
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
                <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.kramana.com/blog/${unwrappedParams.id}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=https://www.kramana.com/blog/${unwrappedParams.id}&text=Check out this article on Kramana`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.kramana.com/blog/${unwrappedParams.id}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm">
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
      
      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-50 font-medium text-sm transition-all duration-300 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {toastMessage}
      </div>
    </main>
  );
}
