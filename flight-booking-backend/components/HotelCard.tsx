import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Heart, Wifi, Coffee, Map } from "lucide-react";

interface HotelCardProps {
  hotel: any;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const minPrice = hotel.rooms?.length > 0 ? Math.min(...hotel.rooms.map((r: any) => r.price)) : 0;
  
  // Calculate rating word based on score
  let ratingWord = "Good";
  if (hotel.rating >= 4.5) ratingWord = "Excellent";
  else if (hotel.rating >= 4.0) ratingWord = "Very Good";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row">
      
      {/* Image Section */}
      <div className="relative w-full sm:w-[280px] h-[220px] sm:h-auto overflow-hidden shrink-0 p-4 pb-0 sm:pr-0">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"}
            alt={hotel.name}
            fill
            className="object-cover"
          />
          {hotel.rating >= 4.5 && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Best Seller
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          
          {/* Main Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-slate-800 leading-tight">{hotel.name}</h3>
              <button className="text-slate-400 hover:text-red-500 transition-colors ml-2 mt-1">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} />
              ))}
              <span className="text-xs text-slate-500 ml-2">{hotel.rating >= 4.5 ? "Luxury Hotel" : hotel.rating >= 4.0 ? "Upscale Hotel" : "Mid-range Hotel"}</span>
            </div>
            
            <div className="flex items-center gap-1 text-slate-500 text-xs font-medium mb-4">
              <MapPin className="w-3.5 h-3.5" />
              {hotel.location.address}, {hotel.location.city} • <span className="text-slate-400 font-normal">2.1 km from center</span>
            </div>

            {/* Amenities Preview */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 mb-3">
              {hotel.amenities?.slice(0, 4).map((amenity: string, idx: number) => (
                <span key={idx} className="flex items-center gap-1.5">
                  {amenity.toLowerCase().includes("wifi") && <Wifi className="w-3.5 h-3.5 text-slate-400" />}
                  {amenity.toLowerCase().includes("breakfast") && <Coffee className="w-3.5 h-3.5 text-slate-400" />}
                  {amenity.toLowerCase().includes("tour") && <Map className="w-3.5 h-3.5 text-slate-400" />}
                  {amenity}
                </span>
              ))}
            </div>

            <div className="text-xs font-bold text-green-600">
              Breakfast included
            </div>
          </div>

          {/* Rating Box */}
          <div className="flex flex-col items-end text-right shrink-0">
            <div className="bg-blue-600 text-white font-bold text-lg px-2.5 py-1 rounded shadow-sm mb-1">
              {hotel.rating.toFixed(1)}
            </div>
            <div className="text-sm font-bold text-slate-800">{ratingWord}</div>
            <div className="text-xs text-slate-500">{hotel.reviewsCount?.toLocaleString()} reviews</div>
          </div>
        </div>

        {/* Pricing & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between sm:justify-end mt-4 pt-4 sm:pt-0 border-t border-slate-100 sm:border-0 gap-4 sm:gap-0">
          <div className="text-left sm:text-right w-full sm:w-auto">
            <div className="text-2xl font-black text-slate-800 mb-0.5">₹ {minPrice.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mb-3">for 2 nights</div>
            <Link
              href={`/hotels/${hotel._id}`}
              className="block sm:inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg text-sm font-bold transition-colors text-center w-full sm:w-auto"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
