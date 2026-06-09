import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Lightbulb, 
  Compass, 
  Hotel, 
  Plane, 
  Newspaper, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Map 
} from "lucide-react";

const BlogSidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Categories Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-6">Categories</h3>
        <div className="space-y-4">
          {[
            { label: "Destinations", icon: <MapPin className="w-4 h-4" />, count: 25 },
            { label: "Travel Tips", icon: <Lightbulb className="w-4 h-4" />, count: 20 },
            { label: "Travel Guides", icon: <Compass className="w-4 h-4" />, count: 18 },
            { label: "Hotel Guides", icon: <Hotel className="w-4 h-4" />, count: 12 },
            { label: "Flight Tips", icon: <Plane className="w-4 h-4" />, count: 10 },
            { label: "News & Updates", icon: <Newspaper className="w-4 h-4" />, count: 8 },
          ].map((cat, idx) => (
            <Link key={idx} href={`/blog?category=${encodeURIComponent(cat.label.toLowerCase())}`} className="flex items-center justify-between group">
              <div className="flex items-center gap-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                {cat.icon}
                <span className="text-sm font-medium">{cat.label}</span>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-blue-600">({cat.count})</span>
            </Link>
          ))}
        </div>
        <Link href="/blog" className="inline-block mt-6 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
          View All Categories &rarr;
        </Link>
      </div>

      {/* Popular Posts Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-6">Popular Posts</h3>
        <div className="space-y-5">
          {[
            { 
              title: "Best Hill Stations in India for Summer Vacation", 
              date: "May 10, 2025", 
              img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=150&q=80" 
            },
            { 
              title: "How to Find Cheap Flights: Tips & Tricks", 
              date: "May 08, 2025", 
              img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=150&q=80" 
            },
            { 
              title: "Top 5 Budget International Destinations", 
              date: "May 05, 2025", 
              img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=150&q=80" 
            },
            { 
              title: "Packing Checklist for International Travel", 
              date: "May 01, 2025", 
              img: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=150&q=80" 
            },
          ].map((post, idx) => (
            <Link key={idx} href={`/blog/${idx + 1}`} className="flex items-start gap-4 group">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  {/* tiny calendar icon is not explicitly needed but looks nice, skipping to match exactly */}
                  <span className="text-[10px]">📅</span> {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Subscribe Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative">
        <h3 className="font-bold text-slate-800 text-lg mb-2">Subscribe to Newsletter</h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Get the latest travel stories, tips and exclusive offers straight to your inbox.
        </p>
        <form className="flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm">
            Subscribe
          </button>
        </form>
        {/* Decorative arrow mock */}
        <div className="absolute -bottom-4 right-10 text-blue-300 text-2xl rotate-45 pointer-events-none opacity-50 hidden lg:block">
          &#10549;
        </div>
      </div>

      {/* Follow Us Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Follow Us</h3>
        <div className="flex items-center gap-3">
          <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#1877F2]/30">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#bc1888]/30">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#1DA1F2]/30">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#FF0000]/30">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#E60023]/30">
            <Map className="w-5 h-5" /> {/* Using Map as Pinterest proxy since lucide doesn't have Pinterest */}
          </a>
        </div>
      </div>

    </div>
  );
};

export default BlogSidebar;
