import React from "react";
import Image from "next/image";
import { Map } from "lucide-react";

interface HotelSidebarProps {
  onOpenMap: () => void;
  priceMax: number;
  setPriceMax: (val: number) => void;
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
  selectedGuestRatings: number[];
  toggleGuestRating: (rating: number) => void;
  selectedPropertyTypes: number[];
  togglePropertyType: (type: number) => void;
  clearAll: () => void;
}

const HotelSidebar = ({
  onOpenMap,
  priceMax,
  setPriceMax,
  selectedAmenities,
  toggleAmenity,
  selectedGuestRatings,
  toggleGuestRating,
  selectedPropertyTypes,
  togglePropertyType,
  clearAll
}: HotelSidebarProps) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Map Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="relative h-[200px] w-full bg-slate-100">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
            alt="Map"
            fill
            className="object-cover opacity-60"
          />
          {/* Price tags on map */}
          <div className="absolute top-10 left-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">₹5,199</div>
          <div className="absolute top-24 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">₹7,299</div>
          <div className="absolute top-20 right-8 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">₹14,999</div>
          <div className="absolute bottom-16 left-1/3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">₹3,199</div>
          <div className="absolute bottom-10 right-1/4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">₹9,499</div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={onOpenMap}
              className="bg-slate-900 text-white flex items-center gap-2 px-4 py-2 rounded font-medium text-sm hover:bg-slate-800 transition-colors shadow-lg"
            >
              <Map className="w-4 h-4" /> View on Map
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Filter Results</h3>
          <button 
            onClick={clearAll}
            className="text-sm font-bold text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>

        {/* Price Slider */}
        <div className="mb-8">
          <h4 className="font-bold text-sm text-slate-800 mb-3">Max Price per night</h4>
          <div className="text-xs text-slate-500 mb-2 font-medium text-blue-600">Up to ₹{priceMax.toLocaleString()}</div>
          <div className="relative mt-4">
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="500"
              value={priceMax}
              onChange={(e) => setPriceMax(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        <hr className="border-slate-100 mb-6" />

        {/* Property Type */}
        <div className="mb-8">
          <h4 className="font-bold text-sm text-slate-800 mb-4">Property Type</h4>
          <div className="space-y-3">
            {[
              { label: "Luxury (5 Stars)", val: 5, count: 120 },
              { label: "Upscale (4 Stars)", val: 4, count: 95 },
              { label: "Mid-range (3 Stars)", val: 3, count: 70 },
              { label: "Budget (1-2 Stars)", val: 2, count: 27 },
            ].map((item, idx) => (
              <label key={idx} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={selectedPropertyTypes.includes(item.val)}
                    onChange={() => togglePropertyType(item.val)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs text-slate-400">({item.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Guest Rating */}
        <div className="mb-8">
          <h4 className="font-bold text-sm text-slate-800 mb-4">Guest Rating</h4>
          <div className="space-y-3">
            {[
              { label: "4.5 & above", val: 4.5, count: 85 },
              { label: "4.0 & above", val: 4.0, count: 140 },
              { label: "3.5 & above", val: 3.5, count: 210 },
              { label: "3.0 & above", val: 3.0, count: 260 },
            ].map((item, idx) => (
              <label key={idx} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={selectedGuestRatings.includes(item.val)}
                    onChange={() => toggleGuestRating(item.val)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs text-slate-400">({item.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Popular Amenities */}
        <div>
          <h4 className="font-bold text-sm text-slate-800 mb-4">Popular Amenities</h4>
          <div className="space-y-3">
            {[
              { label: "Free WiFi", val: "Free WiFi", count: 290 },
              { label: "Breakfast Included", val: "Breakfast Included", count: 200 },
              { label: "Pool", val: "Pool", count: 120 },
              { label: "Free Cancellation", val: "Free Cancellation", count: 180 },
              { label: "Airport Shuttle", val: "Airport Shuttle", count: 90 },
            ].map((item, idx) => (
              <label key={idx} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes(item.val)}
                    onChange={() => toggleAmenity(item.val)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs text-slate-400">({item.count})</span>
              </label>
            ))}
          </div>
          <button className="text-sm font-medium text-blue-600 mt-4 hover:underline">Show more +</button>
        </div>

      </div>
    </div>
  );
};

export default HotelSidebar;
