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
  Map,
  Search,
  Tag,
  Percent
} from "lucide-react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaTwitter as Twitter, FaYoutube as Youtube } from "react-icons/fa";

const BlogSidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      
      {/* 1. Search Articles Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Search Articles</h3>
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 2. Categories Widget */}
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
      </div>

      {/* 3. Featured Destinations Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-6">Featured Destinations</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80" },
            { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e907a5ea82c?w=200&q=80" },
            { name: "Tokyo", img: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=200&q=80" },
            { name: "Rome", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&q=80" },
          ].map((dest, idx) => (
            <Link key={idx} href={`/blog?destination=${dest.name}`} className="relative h-24 rounded-lg overflow-hidden group">
              <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-wide">{dest.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Popular Posts Widget */}
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
                  <span className="text-[10px]">📅</span> {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>



      {/* 7. Travel Deals Widget */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 relative h-[300px] flex items-end p-6 group">
        <Image 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80" 
          alt="Travel Deal" 
          fill 
          className="object-cover z-0 group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
        <div className="relative z-20 w-full text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white mb-3 shadow-lg">
            <Percent className="w-6 h-6" />
          </div>
          <h3 className="font-black text-white text-xl mb-2">Summer Sale!</h3>
          <p className="text-white/80 text-xs font-medium mb-4">Get up to 30% off on all international flights.</p>
          <Link href="/offers" className="block w-full bg-white text-slate-800 font-bold py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
            View Deal
          </Link>
        </div>
      </div>

      {/* 8. Subscribe Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative">
        <h3 className="font-bold text-slate-800 text-lg mb-2">Subscribe to Newsletter</h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Get the latest travel stories, tips and exclusive offers straight to your inbox.
        </p>
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm">
            Subscribe
          </button>
        </form>
      </div>

      {/* 9. Follow Us Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Follow Us</h3>
        <div className="flex flex-wrap items-center gap-3">
          <a href="https://facebook.com/kramana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#1877F2]/30">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/kramana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#bc1888]/30">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/kramana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#1DA1F2]/30">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://youtube.com/kramana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#FF0000]/30">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="https://pinterest.com/kramana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-sm shadow-[#E60023]/30">
            <Map className="w-5 h-5" />
          </a>
        </div>
      </div>

    </div>
  );
};

export default BlogSidebar;
