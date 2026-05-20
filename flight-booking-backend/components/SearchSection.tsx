"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Loader2, PlaneTakeoff, Sparkles, ArrowRight, ArrowLeftRight, Waypoints, Plus, Trash2, Box, Plane, Hotel, Ship, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "bundles", label: "Bundles", icon: Box, promo: "-20%" },
  { id: "cruises", label: "Cruises", icon: Ship },
];

const trending = ["Maldives", "Paris", "Dubai", "Swiss Alps", "Kyoto"];

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [flights, setFlights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();
  const [fromValue, setFromValue] = useState("Delhi");
  const [toValue, setToValue] = useState("Mumbai");
  const [tripType, setTripType] = useState("one-way");
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: "Delhi", to: "Mumbai", date: "" },
    { from: "Mumbai", to: "Paris", date: "" }
  ]);

  const addMultiCityRow = () => {
    if (multiCityFlights.length < 5) {
      const lastTo = multiCityFlights[multiCityFlights.length - 1].to;
      setMultiCityFlights([...multiCityFlights, { from: lastTo || "", to: "", date: "" }]);
    }
  };

  const removeMultiCityRow = (index: number) => {
    if (multiCityFlights.length > 2) {
      setMultiCityFlights(multiCityFlights.filter((_, i) => i !== index));
    }
  };

  const handleMultiCityChange = (index: number, field: string, value: string) => {
    const updated = [...multiCityFlights];
    updated[index] = { ...updated[index], [field]: value };
    setMultiCityFlights(updated);
  };

  const handleMultiCitySwap = (index: number) => {
    const updated = [...multiCityFlights];
    const temp = updated[index].from;
    updated[index].from = updated[index].to;
    updated[index].to = temp;
    setMultiCityFlights(updated);
  };

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleTrendingClick = (city: string) => {
    if (activeTab === "flights" && tripType === "multi-city") {
      const updated = [...multiCityFlights];
      const emptyIndex = updated.findIndex(f => !f.to);
      const targetIndex = emptyIndex !== -1 ? emptyIndex : updated.length - 1;
      updated[targetIndex].to = city;
      if (targetIndex < updated.length - 1) {
        updated[targetIndex + 1].from = city;
      }
      setMultiCityFlights(updated);
    } else {
      setToValue(city);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let from = fromValue;
    let to = toValue;
    let date = formData.get("date")?.toString() || "";
    const travelers = formData.get("travelers")?.toString() || "";

    if (activeTab === "flights" && tripType === "multi-city") {
      from = multiCityFlights.map(f => f.from).join(" -> ");
      to = multiCityFlights.map(f => f.to).join(" -> ");
      date = multiCityFlights.map(f => f.date).join(" , ");
    }

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          date,
          travelers,
          type: (activeTab === "flights" ? `Flight (${tripType === "one-way" ? "One Way" : tripType === "round-trip" ? "Round Trip" : "Multi-city"})` : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)) + " Search"
        }),
      });
    } catch (error) {
      console.error("Failed to save lead:", error);
    }

    if (activeTab !== "flights") {
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        if (value) params.append(key, value.toString());
      });
      const destination = activeTab === "hotels" ? "/hotels" : "/flights";
      router.push(`${destination}?${params.toString()}`);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setFlights([]);

    try {
      let searchUrl = `/api/search?from=${from}&to=${to}&date=${date}&travelers=${travelers}`;
      if (tripType === "multi-city") {
        const firstLeg = multiCityFlights[0];
        searchUrl = `/api/search?from=${firstLeg.from}&to=${firstLeg.to}&date=${firstLeg.date}&travelers=${travelers}`;
      }
      const res = await fetch(searchUrl);
      const data = await res.json();
      if (data.success) {
        setFlights(data.flights);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookFlight = (flight: any) => {
    const params = new URLSearchParams();
    params.append("book", "true");
    params.append("airline", flight.airline || "Kramana Air");
    params.append("from", flight.from);
    params.append("to", flight.to);
    params.append("price", flight.price || "4499");
    params.append("date", flight.date || "");
    
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <section id="search-section" className="relative z-30 -mt-12 md:-mt-24 px-4 md:px-6">
      <div className="max-w-[1140px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-[40px] rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] p-4 md:p-5 border border-white/20 dark:border-white/10 noise-overlay relative overflow-hidden"
        >
          <div className="absolute inset-0 mesh-gradient opacity-5 dark:opacity-20 pointer-events-none" />

          {/* Tabs */}
          <div className="relative z-10 flex gap-1 md:gap-2 mb-3 md:mb-4 bg-slate-100/50 dark:bg-white/5 p-1 rounded-xl md:rounded-2xl w-full sm:w-fit hscroll-hide overflow-x-auto border border-slate-200/50 dark:border-white/5 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 font-bold text-[11px] md:text-sm transition-all whitespace-nowrap overflow-hidden flex-shrink-0",
                  activeTab === tab.id
                    ? "text-primary-dark dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white dark:bg-white/10 shadow-xl shadow-black/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={cn("relative z-10 w-4 h-4 md:w-5 md:h-5", activeTab === tab.id ? "text-accent" : "text-slate-400")} />
                <span className="relative z-10">{tab.label}</span>
                {tab.promo && (
                  <span className="relative z-10 bg-emerald-500 text-white text-[10px] md:text-[12px] px-1.5 md:px-2 py-0.5 rounded-full font-black tracking-tighter">
                    {tab.promo}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Trip Type Selector (Only for Flights) */}
          {activeTab === "flights" && (
            <div className="relative z-10 flex gap-1 md:gap-2 mb-3 bg-slate-100/30 dark:bg-white/[0.02] p-0.5 rounded-lg md:rounded-xl w-full sm:w-fit border border-slate-200/20 dark:border-white/5">
              {[
                { id: "one-way", label: "One Way", icon: ArrowRight },
                { id: "round-trip", label: "Round Trip", icon: ArrowLeftRight },
                { id: "multi-city", label: "Multi-city", icon: Waypoints },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTripType(type.id)}
                  className={cn(
                    "relative px-3 md:px-4 py-1.5 rounded-md md:rounded-lg flex items-center gap-1.5 font-bold text-[10px] md:text-xs transition-all whitespace-nowrap overflow-hidden flex-shrink-0 uppercase tracking-wider",
                    tripType === type.id
                      ? "text-primary-dark dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  )}
                >
                  {tripType === type.id && (
                    <motion.div
                      layoutId="active-trip-type"
                      className="absolute inset-0 bg-white dark:bg-white/10 shadow-lg shadow-black/5"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <type.icon className={cn("relative z-10 w-3.5 h-3.5 md:w-4 md:h-4", tripType === type.id ? "text-accent" : "text-slate-400")} />
                  <span className="relative z-10">{type.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Form */}
          {activeTab === "flights" && tripType === "multi-city" ? (
            <form onSubmit={handleSearch} className="relative z-10 space-y-3">
              <div className="space-y-3">
                {multiCityFlights.map((flight, index) => {
                  const showRemove = index >= 2;
                  return (
                    <div 
                      key={index} 
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/30 dark:border-white/5 p-3 rounded-[1.5rem] relative"
                    >
                      {/* Flight leg label */}
                      <div className="absolute top-2 left-4 bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest">
                        Flight {index + 1}
                      </div>
                      
                      <div className="md:col-span-4 space-y-1 pt-5 relative">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4 opacity-80">Departure</label>
                        <div className="relative group">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                          <input
                            type="text"
                            placeholder="Where from?"
                            value={flight.from}
                            onChange={(e) => handleMultiCityChange(index, "from", e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-10 pr-4 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-bold text-sm text-slate-800 dark:text-white placeholder:text-slate-500"
                          />
                          
                          {/* Swap Button for Multi-city Leg */}
                          <motion.button
                            type="button"
                            onClick={() => handleMultiCitySwap(index)}
                            whileHover={{ scale: 1.15, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="absolute z-20 left-1/2 top-[calc(100%+8px)] -translate-x-1/2 -translate-y-1/2 md:left-[calc(100%+8px)] md:top-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-colors cursor-pointer shadow-md"
                            title="Swap departure and destination"
                          >
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4 opacity-80">Destination</label>
                        <div className="relative group">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                          <input
                            type="text"
                            placeholder="Where to?"
                            value={flight.to}
                            onChange={(e) => handleMultiCityChange(index, "to", e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-10 pr-4 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-bold text-sm text-slate-800 dark:text-white placeholder:text-slate-500"
                          />
                        </div>
                      </div>

                      <div className={cn("space-y-1", showRemove ? "md:col-span-3" : "md:col-span-4")}>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4 opacity-80">Departure Date</label>
                        <div className="relative group">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                          <input
                            type="date"
                            value={flight.date}
                            onChange={(e) => handleMultiCityChange(index, "date", e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-10 pr-3 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-bold text-sm dark:text-white appearance-none"
                          />
                        </div>
                      </div>

                      {showRemove && (
                        <div className="md:col-span-1 flex justify-center pb-2">
                          <motion.button
                            type="button"
                            onClick={() => removeMultiCityRow(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-[1.2rem] bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
                            title="Remove Flight Leg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Actions row: Add Leg & Travelers */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                {multiCityFlights.length < 5 ? (
                  <motion.button
                    type="button"
                    onClick={addMultiCityRow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent font-black uppercase text-xs tracking-widest hover:bg-accent hover:text-primary-dark transition-all cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Add Flight Leg
                  </motion.button>
                ) : (
                  <div />
                )}

                <div className="w-full sm:w-56 space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-3 opacity-80">Travelers</label>
                  <div className="relative group">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                    <select 
                      name="travelers"
                      className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-10 pr-4 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-black text-sm dark:text-white appearance-none cursor-pointer"
                    >
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>Family</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-1 md:mt-2">
                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 md:py-4 bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-primary-dark rounded-[1.2rem] md:rounded-[1.8rem] font-black text-sm md:text-base uppercase tracking-[0.4em] flex items-center justify-center gap-3 md:gap-4 shadow-[0_15px_30px_rgba(245,158,11,0.35)] disabled:opacity-70 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-125 transition-transform" />
                      <span className="text-glow">Search Sovereign Flights</span>
                      <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          ) : (
            <form 
              onSubmit={handleSearch}
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-3"
            >
              <div className={cn("space-y-1 relative", activeTab === "flights" && tripType === "round-trip" ? "lg:col-span-2" : "lg:col-span-3")}>
                <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-3 opacity-80">Departure</label>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <input
                    type="text"
                    name="from"
                    placeholder="Where from?"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-9 pr-4 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-black text-sm text-slate-800 dark:text-white placeholder:text-slate-500"
                  />

                  {/* Swap Button */}
                  <motion.button
                    type="button"
                    onClick={handleSwap}
                    whileHover={{ scale: 1.15, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute z-20 left-1/2 top-[calc(100%+8px)] -translate-x-1/2 -translate-y-1/2 lg:left-[calc(100%+8px)] lg:top-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-colors cursor-pointer shadow-md shadow-black/10"
                    title="Swap departure and destination"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>

              <div className={cn("space-y-1", activeTab === "flights" && tripType === "round-trip" ? "lg:col-span-2" : "lg:col-span-3")}>
                <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-3 opacity-80">Destination</label>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <input
                    type="text"
                    name="to"
                    placeholder="Where to?"
                    value={toValue}
                    onChange={(e) => setToValue(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-9 pr-4 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-black text-sm text-slate-800 dark:text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-1">
                <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-3 opacity-80">Dep. Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <input
                    type="date"
                    name="date"
                    className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-9 pr-2 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-black text-sm dark:text-white appearance-none"
                  />
                </div>
              </div>

              {activeTab === "flights" && tripType === "round-trip" && (
                <div className="lg:col-span-2 space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-3 opacity-80">Return Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                    <input
                      type="date"
                      name="returnDate"
                      className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-9 pr-2 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-black text-sm dark:text-white appearance-none"
                    />
                  </div>
                </div>
              )}

              <div className="lg:col-span-2 space-y-1">
                <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-3 opacity-80">Travelers</label>
                <div className="relative group">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <select 
                    name="travelers"
                    className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-3 pl-9 pr-2 rounded-[1.2rem] focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all font-black text-sm dark:text-white appearance-none cursor-pointer"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>Family</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-10 mt-1 md:mt-2">
                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 md:py-4 bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-primary-dark rounded-[1.2rem] md:rounded-[1.8rem] font-black text-sm md:text-base uppercase tracking-[0.4em] flex items-center justify-center gap-3 md:gap-4 shadow-[0_15px_30px_rgba(245,158,11,0.35)] disabled:opacity-70 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-125 transition-transform" />
                      <span className="text-glow">Search Sovereign Flights</span>
                      <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}


          {/* Quick Picks */}
          <div className="mt-3 md:mt-4 flex items-center gap-3 md:gap-6 overflow-x-auto hscroll-hide pb-1">
            <span className="flex items-center gap-2 text-xs md:text-sm font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Trending:
            </span>
            {trending.map((city) => (
              <button 
                type="button"
                key={city}
                onClick={() => handleTrendingClick(city)}
                className="text-xs md:text-sm font-black text-slate-500 hover:text-accent transition-all whitespace-nowrap px-3 md:px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg md:rounded-xl border border-white/10 hover:scale-105"
              >
                {city}
              </button>
            ))}
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {hasSearched && flights.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-16 p-12 text-center bg-slate-50/50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10"
              >
                <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Plane className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black mb-3">Sovereign Flights Not Found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your dates or destinations to access our elite aviation network.</p>
              </motion.div>
            )}
            
            {flights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 space-y-10"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black font-outfit tracking-tighter">Sovereign Results</h3>
                  <div className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase">
                    <Sparkles className="w-3 h-3" /> {flights.length} Elite Options
                  </div>
                </div>

                <div className="grid gap-6">
                  {flights.map((flight, idx) => (
                    <motion.div
                      key={flight._id || idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 hover:bg-slate-50 dark:hover:bg-white/[0.08] transition-all hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="flex items-center gap-8 w-full lg:w-auto">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plane className="w-10 h-10 text-accent -rotate-45" />
                        </div>
                        <div className="relative">
                          <div className="font-black text-2xl font-outfit">{flight.airline || "Kramana Air"}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase">{flight.flightNumber || `KA-${100+idx}`} • {flight.class || "Business"}</span>
                            <span className="bg-accent/10 text-accent text-[8px] font-black px-2 py-0.5 rounded-full border border-accent/20 tracking-widest uppercase">Sovereign Tier</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-10 md:gap-20 flex-1 justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-black">{flight.departureTime || "10:00"}</div>
                          <div className="text-slate-400 font-black text-[10px] tracking-widest uppercase mt-2">
                            {activeTab === "flights" && tripType === "multi-city" ? multiCityFlights[0].from : flight.from}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 flex-1 max-w-[160px]">
                            <div className="w-full h-px bg-slate-200 dark:bg-white/10 relative">
                                <motion.div 
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                                />
                            </div>
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
                              {activeTab === "flights" && tripType === "multi-city" ? `${multiCityFlights.length - 1} Stops` : "Non-stop"}
                            </span>
                        </div>

                        <div className="text-center">
                          <div className="text-3xl font-black">{flight.arrivalTime || "12:00"}</div>
                          <div className="text-slate-400 font-black text-[10px] tracking-widest uppercase mt-2">
                            {activeTab === "flights" && tripType === "multi-city" ? multiCityFlights[multiCityFlights.length - 1].to : flight.to}
                          </div>
                        </div>
                      </div>

                      {/* Flight Perks Icons */}
                      <div className="hidden xl:flex items-center gap-4 text-slate-300">
                        <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                            <Box className="w-4 h-4" />
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-tighter">Baggage</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                            <Users className="w-4 h-4" />
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-tighter">Priority</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-8 lg:pt-0">
                        <div className="text-right">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting from</div>
                          <div className="text-4xl font-black text-primary-dark dark:text-white">₹{flight.price || "4,499"}</div>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBookFlight(flight)}
                          className={cn(
                            "w-16 h-16 rounded-[1.5rem] font-bold transition-all shadow-xl flex items-center justify-center",
                            bookingSuccess === (flight._id || idx) 
                              ? "bg-emerald-500 text-white" 
                              : "bg-accent text-primary-dark shadow-accent/20"
                          )}
                        >
                          <ArrowRight className="w-7 h-7" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
