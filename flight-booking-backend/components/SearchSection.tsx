"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Loader2, PlaneTakeoff, Sparkles, ArrowRight, Box, Plane, Hotel, Ship, TrendingUp } from "lucide-react";
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

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const from = formData.get("from")?.toString() || "";
    const to = formData.get("to")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const travelers = formData.get("travelers")?.toString() || "";

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          date,
          travelers,
          type: (activeTab === "flights" ? "Flight" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)) + " Search"
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
      const res = await fetch(`/api/search?from=${from}&to=${to}&date=${date}&travelers=${travelers}`);
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
    params.append("airline", flight.airline || "Karmana Air");
    params.append("from", flight.from);
    params.append("to", flight.to);
    params.append("price", flight.price || "4499");
    params.append("date", flight.date || "");
    
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <section id="search-section" className="relative z-30 -mt-20 md:-mt-40 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-[40px] rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] p-6 md:p-14 border border-white/20 dark:border-white/10 noise-overlay relative overflow-hidden"
        >
          <div className="absolute inset-0 mesh-gradient opacity-5 dark:opacity-20 pointer-events-none" />

          {/* Tabs */}
          <div className="relative z-10 flex gap-2 md:gap-4 mb-8 md:mb-12 bg-slate-100/50 dark:bg-white/5 p-1.5 md:p-2 rounded-2xl md:rounded-3xl w-full sm:w-fit hscroll-hide overflow-x-auto border border-slate-200/50 dark:border-white/5 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 font-bold text-[12px] md:text-base transition-all whitespace-nowrap overflow-hidden flex-shrink-0",
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


          {/* Form */}
          <form 
            onSubmit={handleSearch}
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 items-end"
          >
            <div className="lg:col-span-3 space-y-4">
              <label className="text-[12px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 opacity-80">Departure</label>
              <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                <input
                  type="text"
                  name="from"
                  placeholder="Where from?"
                  defaultValue="Delhi"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg text-slate-800 dark:text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <label className="text-[12px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 opacity-80">Destination</label>
              <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                <input
                  type="text"
                  name="to"
                  placeholder="Where to?"
                  defaultValue="Mumbai"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg text-slate-800 dark:text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <label className="text-[12px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 opacity-80">Departure Date</label>
              <div className="relative group">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                <input
                  type="date"
                  name="date"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg dark:text-white appearance-none"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <label className="text-[12px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 opacity-80">Travelers</label>
              <div className="relative group">
                <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                <select 
                  name="travelers"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg dark:text-white appearance-none cursor-pointer"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-10 mt-6 md:mt-10">
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-6 md:py-8 bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-primary-dark rounded-[1.5rem] md:rounded-[2.5rem] font-black text-lg md:text-xl uppercase tracking-[0.4em] flex items-center justify-center gap-4 md:gap-6 shadow-[0_30px_60px_rgba(245,158,11,0.5)] disabled:opacity-70 group"
              >
                {isLoading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <>
                    <Search className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-125 transition-transform" />
                    <span className="text-glow">Search Sovereign Flights</span>
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                  </>
                )}
              </motion.button>
            </div>
          </form>


          {/* Quick Picks */}
          <div className="mt-8 md:mt-12 flex items-center gap-6 md:gap-10 overflow-x-auto hscroll-hide pb-2">
            <span className="flex items-center gap-3 md:gap-4 text-sm md:text-lg font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
              <TrendingUp className="w-5 h-5 md:w-7 md:h-7 text-emerald-500" /> Trending:
            </span>
            {trending.map((city) => (
              <button 
                key={city}
                className="text-sm md:text-xl font-black text-slate-500 hover:text-accent transition-all whitespace-nowrap px-6 md:px-8 py-3 md:py-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl border border-white/10 hover:scale-105"
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
                          <div className="font-black text-2xl font-outfit">{flight.airline || "Karmana Air"}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase">{flight.flightNumber || `KA-${100+idx}`} • {flight.class || "Business"}</span>
                            <span className="bg-accent/10 text-accent text-[8px] font-black px-2 py-0.5 rounded-full border border-accent/20 tracking-widest uppercase">Sovereign Tier</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-10 md:gap-20 flex-1 justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-black">{flight.departureTime || "10:00"}</div>
                          <div className="text-slate-400 font-black text-[10px] tracking-widest uppercase mt-2">{flight.from}</div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 flex-1 max-w-[160px]">
                            <div className="w-full h-px bg-slate-200 dark:bg-white/10 relative">
                                <motion.div 
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                                />
                            </div>
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Non-stop</span>
                        </div>

                        <div className="text-center">
                          <div className="text-3xl font-black">{flight.arrivalTime || "12:00"}</div>
                          <div className="text-slate-400 font-black text-[10px] tracking-widest uppercase mt-2">{flight.to}</div>
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
