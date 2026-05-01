"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Hotel, Box, Ship, Search, Calendar, Users, MapPin, Loader2, ArrowRight, Check, Sparkles, TrendingUp } from "lucide-react";
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
      const destination = activeTab === "hotels" ? "/hotel-booking" : "/flight-booking";
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
    
    router.push(`/flight-booking?${params.toString()}`);
  };

  return (
    <section id="search-section" className="relative z-30 -mt-40 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-[40px] rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] p-10 md:p-14 border border-white/20 dark:border-white/5"
        >
          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 mb-12 bg-slate-100/50 dark:bg-white/5 p-2 rounded-3xl w-fit hscroll-hide overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-sm transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-white dark:bg-white/10 text-primary-dark dark:text-white shadow-xl shadow-black/5"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                )}
              >
                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-accent" : "text-slate-400")} />
                {tab.label}
                {tab.promo && (
                  <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black tracking-tighter">
                    {tab.promo}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-6 items-end"
          >
            <div className="lg:col-span-3 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Departure</label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  type="text"
                  name="from"
                  placeholder="Where from?"
                  defaultValue="Delhi"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-5 pl-14 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold text-slate-800 dark:text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Destination</label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  type="text"
                  name="to"
                  placeholder="Where to?"
                  defaultValue="Mumbai"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-5 pl-14 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold text-slate-800 dark:text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Departure Date</label>
              <div className="relative group">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  type="date"
                  name="date"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-5 pl-14 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold dark:text-white appearance-none"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Travelers</label>
              <div className="relative group">
                <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <select 
                  name="travelers"
                  className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-5 pl-14 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold dark:text-white appearance-none cursor-pointer"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full h-[64px] bg-primary-dark text-white rounded-[2rem] font-black flex items-center justify-center transition-all shadow-2xl shadow-black/10 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : <Search className="w-7 h-7" />}
              </motion.button>
            </div>
          </form>

          {/* Quick Picks */}
          <div className="mt-8 flex items-center gap-6 overflow-x-auto hscroll-hide pb-2">
            <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Trending:
            </span>
            {trending.map((city) => (
              <button 
                key={city}
                className="text-[11px] font-bold text-slate-500 hover:text-accent transition-colors whitespace-nowrap px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/5"
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
                  <h3 className="text-3xl font-black font-outfit">Sovereign Results</h3>
                  <div className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-black tracking-widest">
                    <Sparkles className="w-4 h-4" /> {flights.length} ELITE OPTIONS
                  </div>
                </div>

                <div className="grid gap-6">
                  {flights.map((flight, idx) => (
                    <motion.div
                      key={flight._id || idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-10 hover:bg-slate-50 dark:hover:bg-white/[0.08] transition-all hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="flex items-center gap-8 w-full lg:w-auto">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plane className="w-10 h-10 text-accent -rotate-45" />
                        </div>
                        <div>
                          <div className="font-black text-2xl font-outfit">{flight.airline || "Karmana Air"}</div>
                          <div className="text-slate-400 text-xs font-black tracking-[0.2em] uppercase">{flight.flightNumber || `KA-${100+idx}`} • {flight.class || "Business"}</div>
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
;
