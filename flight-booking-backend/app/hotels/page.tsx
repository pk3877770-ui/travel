"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HotelSearchSection from "@/components/HotelSearchSection";
import HotelCard from "@/components/HotelCard";
import HotelSidebar from "@/components/HotelSidebar";
import Pagination from "@/components/Pagination";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/hotels${location ? `?location=${location}` : ""}`);
        const data = await res.json();
        if (data.success) {
          setHotels(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch hotels", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [location]);

  return (
    <main className="min-h-screen bg-[#fafbfe] pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1542314831-c6a4d1409e54?w=1920&q=80"
          alt="Luxury Hotel Room"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container max-w-[1200px] mx-auto px-4 pt-32 h-full">
          <div className="flex items-center text-sm text-white/80 mb-6 gap-2 font-medium">
            <span>Home</span>
            <span className="text-white/40">{'>'}</span>
            <span className="text-white">Hotels</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Find the Perfect Stay</h1>
          <p className="text-lg text-white/90 font-medium max-w-md">Discover and book amazing hotels at the best prices</p>
        </div>
      </div>

      <HotelSearchSection />

      <div className="container max-w-[1200px] mx-auto px-4 mt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                {hotels.length} {hotels.length === 1 ? "Hotel" : "Hotels"} found {location ? `in ${location}` : ""}
              </h2>
              
              <div className="flex items-center gap-3 mt-4 sm:mt-0 text-sm">
                <span className="text-slate-500">Sorted by:</span>
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50">
                  Recommended <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : hotels.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>
                <Pagination />
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                <div className="text-4xl mb-4">🏨</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Hotels Found</h3>
                <p className="text-slate-500">Try adjusting your search criteria or explore a different destination.</p>
              </div>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <HotelSidebar />
          </div>

        </div>

      </div>
    </main>
  );
}
