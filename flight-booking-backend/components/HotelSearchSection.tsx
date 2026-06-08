"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const HotelSearchSection = () => {
  const [location, setLocation] = useState("New Delhi");
  const [checkIn, setCheckIn] = useState("2025-05-24");
  const [checkOut, setCheckOut] = useState("2025-05-26");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                <div className="flex items-center gap-2 justify-between">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-sm font-medium text-slate-800 outline-none bg-transparent appearance-none"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 pointer-events-none hidden md:block" />
                </div>
              </div>

              {/* Check-out */}
              <div className="flex-[0.7] w-full border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors">
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Check-out
                </label>
                <div className="flex items-center gap-2 justify-between">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-sm font-medium text-slate-800 outline-none bg-transparent appearance-none"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 pointer-events-none hidden md:block" />
                </div>
              </div>

              {/* Guests & Rooms */}
              <div className="flex-1 w-full border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors relative cursor-pointer">
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Guests & Rooms
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">
                    {guests} {guests === 1 ? 'Guest' : 'Guests'}, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
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

export default HotelSearchSection;
