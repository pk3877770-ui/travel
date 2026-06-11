import React from "react";
import Image from "next/image";
import { Map } from "lucide-react";

interface HotelSidebarProps {
  onOpenMap: () => void;
  priceMin: number;
  setPriceMin: (val: number) => void;
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
  selectedGuestRatings: number[];
  toggleGuestRating: (rating: number) => void;
  selectedPropertyTypes: number[];
  togglePropertyType: (type: number) => void;
  clearAll: () => void;
  hotels: any[];
  allHotels: any[];
}

const HotelSidebar = ({
  onOpenMap,
  priceMin,
  setPriceMin,
  selectedAmenities,
  toggleAmenity,
  selectedGuestRatings,
  toggleGuestRating,
  selectedPropertyTypes,
  togglePropertyType,
  clearAll,
  hotels,
  allHotels
}: HotelSidebarProps) => {

  const passesFilters = (hotel: any, ignoreCategory: 'propertyType' | 'guestRating' | 'amenities') => {
    // 1. Price is always applied
    const minRoomPrice = hotel.rooms?.length > 0 ? Math.min(...hotel.rooms.map((r: any) => r.price)) : 0;
    if (minRoomPrice < priceMin) return false;

    // 2. Guest Rating
    if (ignoreCategory !== 'guestRating' && selectedGuestRatings.length > 0) {
      const minRatingRequired = Math.min(...selectedGuestRatings);
      if (hotel.rating < minRatingRequired) return false;
    }

    // 3. Property Type
    if (ignoreCategory !== 'propertyType' && selectedPropertyTypes.length > 0) {
      let starRating = 1;
      if (hotel.rating >= 4.8) starRating = 5;
      else if (hotel.rating >= 4.0) starRating = 4;
      else if (hotel.rating >= 3.0) starRating = 3;
      else if (hotel.rating >= 2.0) starRating = 2;
      if (!selectedPropertyTypes.includes(starRating)) return false;
    }

    // 4. Amenities
    if (ignoreCategory !== 'amenities' && selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every(amenity => 
        hotel.amenities?.some((a: string) => a.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  };

  const getPropertyTypeCount = (star: number) => {
    return allHotels.filter(hotel => {
      if (!passesFilters(hotel, 'propertyType')) return false;
      let starRating = 1;
      if (hotel.rating >= 4.8) starRating = 5;
      else if (hotel.rating >= 4.0) starRating = 4;
      else if (hotel.rating >= 3.0) starRating = 3;
      else if (hotel.rating >= 2.0) starRating = 2;
      return starRating === star;
    }).length;
  };

  const getGuestRatingCount = (minRating: number) => {
    return allHotels.filter(hotel => {
      if (!passesFilters(hotel, 'guestRating')) return false;
      return hotel.rating >= minRating;
    }).length;
  };

  const getAmenityCount = (amenity: string) => {
    return allHotels.filter(hotel => {
      if (!passesFilters(hotel, 'amenities')) return false;
      return hotel.amenities?.some((a: string) => a.toLowerCase().includes(amenity.toLowerCase()));
    }).length;
  };

  // Pre-defined random-ish positions for up to 5 hotel pins on the static map image
  const pinPositions = [
    { top: "10%", left: "10%" },
    { top: "60%", left: "15%" },
    { top: "50%", right: "20%" },
    { bottom: "40%", left: "33%" },
    { bottom: "25%", right: "25%" },
  ];
  return (
    <div className="flex flex-col gap-6">
      
      {/* Map Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="relative h-[200px] w-full bg-slate-100">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
            alt="Interactive map preview of hotel locations"
            fill
            className="object-cover opacity-60"
          />
          {/* Dynamic Price tags on map */}
          {hotels.slice(0, 5).map((hotel, index) => {
            const minRoomPrice = hotel.rooms?.length > 0 ? Math.min(...hotel.rooms.map((r: any) => r.price)) : 0;
            return (
              <div 
                key={hotel._id}
                className="absolute bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md cursor-pointer hover:bg-blue-700 hover:scale-105 transition-transform"
                style={pinPositions[index]}
              >
                ₹{minRoomPrice.toLocaleString()}
              </div>
            );
          })}
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button 
              onClick={onOpenMap}
              className="pointer-events-auto bg-slate-900 text-white flex items-center gap-2 px-4 py-2 rounded font-medium text-sm hover:bg-slate-800 transition-colors shadow-lg"
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
          <h4 className="font-bold text-sm text-slate-800 mb-3">Min Price per night</h4>
          <div className="text-xs text-slate-500 mb-2 font-medium text-blue-600">From ₹{priceMin.toLocaleString()}</div>
          <div className="relative mt-4">
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="500"
              value={priceMin}
              onChange={(e) => setPriceMin(parseInt(e.target.value))}
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
              { label: "5 Stars", val: 5, count: getPropertyTypeCount(5) },
              { label: "4 Stars", val: 4, count: getPropertyTypeCount(4) },
              { label: "3 Stars", val: 3, count: getPropertyTypeCount(3) },
              { label: "2 Stars", val: 2, count: getPropertyTypeCount(2) },
              { label: "1 Star", val: 1, count: getPropertyTypeCount(1) },
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
              { label: "4.5 & above", val: 4.5, count: getGuestRatingCount(4.5) },
              { label: "4.0 & above", val: 4.0, count: getGuestRatingCount(4.0) },
              { label: "3.5 & above", val: 3.5, count: getGuestRatingCount(3.5) },
              { label: "3.0 & above", val: 3.0, count: getGuestRatingCount(3.0) },
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
              { label: "Free WiFi", val: "Free WiFi", count: getAmenityCount("Free WiFi") },
              { label: "Breakfast Included", val: "Breakfast Included", count: getAmenityCount("Breakfast Included") },
              { label: "Pool", val: "Pool", count: getAmenityCount("Pool") },
              { label: "Free Cancellation", val: "Free Cancellation", count: getAmenityCount("Free Cancellation") },
              { label: "Airport Shuttle", val: "Airport Shuttle", count: getAmenityCount("Airport Shuttle") },
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
