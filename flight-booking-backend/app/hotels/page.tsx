"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import HotelSearchSection from "@/components/HotelSearchSection";
import HotelCard from "@/components/HotelCard";
import HotelSidebar from "@/components/HotelSidebar";
import Pagination from "@/components/Pagination";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [priceMax, setPriceMax] = useState<number>(50000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedGuestRatings, setSelectedGuestRatings] = useState<number[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<number[]>([]);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Filter Toggle Functions
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const toggleGuestRating = (rating: number) => {
    setSelectedGuestRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const togglePropertyType = (type: number) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setPriceMax(50000);
    setSelectedAmenities([]);
    setSelectedGuestRatings([]);
    setSelectedPropertyTypes([]);
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Client-Side Filtering
  const filteredHotels = useMemo(() => {
    const results = hotels.filter(hotel => {
      // 1. Price Filter (Hotel's minimum room price must be <= priceMax)
      const minRoomPrice = hotel.rooms?.length > 0 ? Math.min(...hotel.rooms.map((r: any) => r.price)) : 0;
      if (minRoomPrice > priceMax) return false;

      // 2. Guest Rating Filter (Hotel rating must be >= the lowest selected required rating)
      if (selectedGuestRatings.length > 0) {
        const minRatingRequired = Math.min(...selectedGuestRatings);
        if (hotel.rating < minRatingRequired) return false;
      }

      // 3. Property Type Filter
      if (selectedPropertyTypes.length > 0) {
        let starRating = 2; // Default to Budget
        if (hotel.rating >= 4.8) starRating = 5; // Luxury
        else if (hotel.rating >= 4.5) starRating = 4; // Upscale
        else if (hotel.rating >= 4.0) starRating = 3; // Mid-range
        
        if (!selectedPropertyTypes.includes(starRating)) return false;
      }

      // 4. Amenities Filter (Hotel must have ALL selected amenities)
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          hotel.amenities?.some((a: string) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
    
    // Reset to page 1 whenever filters change and results change
    return results;
  }, [hotels, priceMax, selectedAmenities, selectedGuestRatings, selectedPropertyTypes]);

  // Reset pagination when filter results change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredHotels.length]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const currentHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                {filteredHotels.length} {filteredHotels.length === 1 ? "Hotel" : "Hotels"} found {location ? `in ${location}` : ""}
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
            ) : filteredHotels.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {currentHotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm mt-8">
                <div className="text-4xl mb-4">🏨</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Hotels Match Your Filters</h3>
                <p className="text-slate-500">Try adjusting your filters or search criteria to see more results.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-6 bg-blue-50 text-blue-600 font-bold px-6 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <HotelSidebar 
              onOpenMap={() => setIsMapOpen(true)}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              selectedAmenities={selectedAmenities}
              toggleAmenity={toggleAmenity}
              selectedGuestRatings={selectedGuestRatings}
              toggleGuestRating={toggleGuestRating}
              selectedPropertyTypes={selectedPropertyTypes}
              togglePropertyType={togglePropertyType}
              clearAll={clearAllFilters}
            />
          </div>

        </div>

      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMapOpen(false)}
          />
          <div className="relative bg-white w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Map View</h3>
                <p className="text-sm text-slate-500">{filteredHotels.length} hotels in {location || 'this area'}</p>
              </div>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-100">
              <iframe
                title="Interactive Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(location || 'India')}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              />
              {/* To make it fully working without any API key, we replace the iframe src with OpenStreetMap */}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
