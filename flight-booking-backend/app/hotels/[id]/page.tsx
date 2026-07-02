"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Star, Wifi, Coffee, Map, Car, Wind, Tv } from "lucide-react";
import Link from "next/link";
import RoomCard from "@/components/RoomCard";
import ReviewSection from "@/components/ReviewSection";

export default function HotelDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`/api/hotels/${id}`);
        const data = await res.json();
        if (data.success) {
          setHotel(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch hotel details", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchHotel();
  }, [id]);

  const schemaData = useMemo(() => {
    if (!hotel) return null;
    return {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": hotel.name,
      "description": hotel.description,
      "image": hotel.images?.[0] || "",
      "starRating": {
        "@type": "Rating",
        "ratingValue": hotel.rating
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": hotel.location?.address,
        "addressLocality": hotel.location?.city,
        "addressCountry": hotel.location?.country || "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": hotel.rating,
        "reviewCount": hotel.reviewsCount || 1
      }
    };
  }, [hotel]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pt-20 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Hotel Not Found</h1>
        <p className="text-slate-500">The hotel you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafbfe] pt-24 pb-20 font-sans">
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <div className="container max-w-[1100px] mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1 text-slate-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                <MapPin className="w-4 h-4 text-primary" />
                {hotel.location.address}, {hotel.location.city}, {hotel.location.country}
              </span>
              <span className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-yellow-700">{hotel.rating.toFixed(1)}</span>
                <span className="text-yellow-600/70">({hotel.reviewsCount} Reviews)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[300px] md:h-[400px]">
          <div className="md:col-span-3 relative h-full rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"}
              alt={hotel.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={hotel.images?.[1] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"}
                alt={`${hotel.name} Interior`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={hotel.images?.[2] || "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80"}
                alt={`${hotel.name} Room`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Description & Amenities) */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">About this Hotel</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {hotel.description}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                {hotel.amenities?.map((amenity: string, idx: number) => {
                  const label = amenity.toLowerCase();
                  let Icon = CheckCircle2;
                  if (label.includes("wifi")) Icon = Wifi;
                  else if (label.includes("breakfast") || label.includes("coffee")) Icon = Coffee;
                  else if (label.includes("tour")) Icon = Map;
                  else if (label.includes("parking")) Icon = Car;
                  else if (label.includes("air")) Icon = Wind;
                  else if (label.includes("tv")) Icon = Tv;

                  return (
                    <div key={idx} className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      <Icon className="w-5 h-5 text-primary" />
                      {amenity}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Rooms</h2>
              <div className="flex flex-col gap-6">
                {hotel.rooms?.map((room: any) => (
                  <RoomCard key={room.id} hotelId={hotel._id} room={room} />
                ))}
                {(!hotel.rooms || hotel.rooms.length === 0) && (
                  <div className="bg-slate-50 p-6 rounded-xl text-center text-slate-500">
                    No rooms currently available.
                  </div>
                )}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Guest Reviews</h2>
              <ReviewSection reviews={hotel.reviews} />
            </section>
          </div>

          {/* Right Column (Sticky Summary Box) */}
          <div className="relative">
            <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Book?</h3>
              <p className="text-slate-500 text-sm mb-6">Select a room from the list to continue with your reservation.</p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 font-medium">Check-in</span>
                  <span className="text-slate-800 font-bold">15 Jun 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Check-out</span>
                  <span className="text-slate-800 font-bold">20 Jun 2026</span>
                </div>
              </div>
              
              {hotel.rooms && hotel.rooms.length > 0 ? (
                <Link 
                  href={`/hotels/${hotel._id}/book?roomId=${hotel.rooms[0].id}`}
                  className="block w-full text-center bg-[#0A58CA] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-blue-500/30 mb-4"
                >
                  Book Now
                </Link>
              ) : (
                <button disabled className="block w-full text-center bg-slate-300 text-slate-500 px-6 py-3 rounded-xl font-bold mb-4 cursor-not-allowed">
                  No Rooms Available
                </button>
              )}

              <div className="text-center text-xs text-slate-400">
                You won't be charged yet.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Ensure CheckCircle2 is imported if missing from lucide-react above
import { CheckCircle2 } from "lucide-react";
