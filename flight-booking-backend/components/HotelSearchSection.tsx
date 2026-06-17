"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const isoDateFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const HotelSearchSectionInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState("New Delhi");
  const [checkIn, setCheckIn] = useState(isoDateFromNow(7));
  const [checkOut, setCheckOut] = useState(isoDateFromNow(9));
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  useEffect(() => {
    if (searchParams.has("location")) setLocation(searchParams.get("location") || "New Delhi");
    if (searchParams.has("checkIn")) setCheckIn(searchParams.get("checkIn") || isoDateFromNow(7));
    if (searchParams.has("checkOut")) setCheckOut(searchParams.get("checkOut") || isoDateFromNow(9));
    if (searchParams.has("guests")) setGuests(parseInt(searchParams.get("guests") || "2", 10));
    // rooms aren't saved in URL, but we could sync it if we want
  }, [searchParams]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowGuestDropdown(false);
    const params = new URLSearchParams();
    params.append("location", location);
    params.append("checkIn", checkIn);
    params.append("checkOut", checkOut);
    params.append("guests", guests.toString());
    
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <div className="relative z-30 -mt-20 px-4 md:px-8 mb-16">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 relative"
        >
          <form onSubmit={handleSearch}>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              
              {/* Destination */}
              <div className="flex-1 w-full border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors">
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Destination
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city, hotel or area"
                    className="w-full text-sm font-medium text-slate-800 outline-none bg-transparent placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="flex-[0.7] w-full border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors">
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Check-in
                </label>
                <div className="flex items-center gap-2 justify-between relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-sm font-medium text-slate-800 outline-none bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full cursor-pointer relative z-10"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 pointer-events-none hidden md:block absolute right-0 z-0" />
                </div>
              </div>

              {/* Check-out */}
              <div className="flex-[0.7] w-full border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors">
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Check-out
                </label>
                <div className="flex items-center gap-2 justify-between relative">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-sm font-medium text-slate-800 outline-none bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full cursor-pointer relative z-10"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 pointer-events-none hidden md:block absolute right-0 z-0" />
                </div>
              </div>

              {/* Guests & Rooms */}
              <div 
                className="flex-1 w-full border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors relative cursor-pointer"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              >
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Guests & Rooms
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">
                    {guests} {guests === 1 ? 'Guest' : 'Guests'}, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
                
                {showGuestDropdown && (
                  <div 
                    className="absolute top-[110%] left-0 w-full min-w-[240px] bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-sm text-slate-700">Rooms</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">-</button>
                        <span className="text-sm font-bold w-4 text-center">{rooms}</span>
                        <button type="button" onClick={() => setRooms(rooms + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-slate-700">Guests</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">-</button>
                        <span className="text-sm font-bold w-4 text-center">{guests}</span>
                        <button type="button" onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button 
                type="submit"
                className="bg-[#0A58CA] hover:bg-blue-700 text-white px-8 h-[60px] rounded-lg text-sm font-bold transition-colors whitespace-nowrap lg:ml-2 shadow-sm"
              >
                Search Hotels
              </button>

            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const HotelSearchSection = () => {
  return (
    <Suspense fallback={<div className="h-[100px]" />}>
      <HotelSearchSectionInner />
    </Suspense>
  );
};

export default HotelSearchSection;
