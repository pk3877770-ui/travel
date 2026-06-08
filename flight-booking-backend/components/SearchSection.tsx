"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TravelersPopover from "@/components/TravelersPopover";

const SearchSection = () => {
  const [tripType, setTripType] = useState("round-trip");
  const [fromValue, setFromValue] = useState("DEL");
  const [fromCity, setFromCity] = useState("New Delhi, India");
  const [toValue, setToValue] = useState("BOM");
  const [toCity, setToCity] = useState("Mumbai, India");
  const [departureDate, setDepartureDate] = useState("2025-05-20");
  const [returnDate, setReturnDate] = useState("2025-05-27");
  
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState("Economy");
  
  const router = useRouter();

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("from", fromValue);
    params.append("to", toValue);
    params.append("date", departureDate);
    if (tripType === "round-trip") params.append("return", returnDate);
    params.append("travelers", `${adults} Adults, ${children} Children, ${infants} Infants`);
    params.append("cabin", cabinClass);
    
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <section id="search-section" className="relative z-30 -mt-24 px-4 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Trip Type Tabs (Floating on top-left) */}
          <div className="flex bg-white w-fit rounded-t-2xl px-6 py-4 shadow-sm border-b border-slate-100">
            {[
              { id: "round-trip", label: "Round Trip", icon: Plane },
              { id: "one-way", label: "One Way" },
              { id: "multi-city", label: "Multi City" },
            ].map((type) => {
              const isActive = tripType === type.id;
              return (
                <label
                  key={type.id}
                  className="flex items-center gap-2 cursor-pointer group mr-8 last:mr-0"
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                    isActive ? "border-primary text-primary" : "border-slate-300 text-transparent"
                  )}>
                    {isActive ? (
                      type.icon ? <type.icon className="w-3 h-3 fill-primary" /> : <div className="w-2 h-2 bg-primary rounded-full" />
                    ) : null}
                  </div>
                  <span className={cn(
                    "text-sm font-bold",
                    isActive ? "text-primary" : "text-slate-400"
                  )}>{type.label}</span>
                  <input
                    type="radio"
                    name="tripType"
                    value={type.id}
                    checked={isActive}
                    onChange={() => setTripType(type.id)}
                    className="hidden"
                  />
                </label>
              );
            })}
          </div>

          {/* Main Search Card */}
          <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-xl p-8 relative">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col lg:flex-row items-center">
                
                {/* From & To Row */}
                <div className="flex w-full lg:w-[45%] relative border-b lg:border-b-0 lg:border-r border-slate-200">
                  <div className="flex-1 pb-6 lg:pb-0 lg:pr-8">
                    <label className="text-xs text-slate-500 font-medium block mb-1">From</label>
                    <input
                      type="text"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                      className="w-full font-bold text-2xl text-slate-800 outline-none uppercase mb-1"
                    />
                    <div className="text-sm text-slate-500 truncate">{fromCity}</div>
                  </div>

                  <button 
                    type="button"
                    onClick={handleSwap}
                    className="absolute left-1/2 lg:left-auto lg:top-1/2 lg:right-0 -translate-x-1/2 lg:translate-x-1/2 top-1/2 lg:-translate-y-1/2 w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-sm z-10 hover:bg-slate-100"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>

                  <div className="flex-1 pt-6 lg:pt-0 lg:pl-12">
                    <label className="text-xs text-slate-500 font-medium block mb-1">To</label>
                    <input
                      type="text"
                      value={toValue}
                      onChange={(e) => setToValue(e.target.value)}
                      className="w-full font-bold text-2xl text-slate-800 outline-none uppercase mb-1"
                    />
                    <div className="text-sm text-slate-500 truncate">{toCity}</div>
                  </div>
                </div>

                {/* Dates Row */}
                <div className="flex w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-slate-200 pt-6 pb-6 lg:pt-0 lg:pb-0 lg:px-8">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 font-medium block mb-1">Departure</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full font-bold text-lg text-slate-800 outline-none bg-transparent"
                    />
                    <div className="text-xs text-slate-400 mt-1">Tuesday</div>
                  </div>
                  {tripType === "round-trip" && (
                    <div className="flex-1 pl-4">
                      <label className="text-xs text-slate-500 font-medium block mb-1">Return</label>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full font-bold text-lg text-slate-800 outline-none bg-transparent"
                      />
                      <div className="text-xs text-slate-400 mt-1">Tuesday</div>
                    </div>
                  )}
                </div>

                {/* Travelers & Class */}
                <div className="flex-1 w-full pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between h-full">
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1">Travelers & Class</label>
                    <div className="font-bold text-lg text-slate-800 flex items-center">
                      <TravelersPopover
                        adults={adults} setAdults={setAdults}
                        childrenCount={children} setChildrenCount={setChildren}
                        infants={infants} setInfants={setInfants}
                        className="!p-0 !border-0 !bg-transparent inline text-lg text-slate-800 !w-auto"
                      />
                      <span className="mx-2 text-slate-300">|</span>
                      <select
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value)}
                        className="outline-none bg-transparent cursor-pointer text-sm font-medium text-slate-500"
                      >
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Search Button positioned at bottom right */}
              <div className="mt-8 flex justify-end">
                <button 
                  type="submit"
                  className="bg-[#0A58CA] hover:bg-blue-700 text-white px-10 py-3.5 rounded-lg font-bold transition-colors shadow-md shadow-blue-500/30"
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
