"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Hotel, Box, Ship, Search, Calendar, Users, MapPin, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "bundles", label: "Bundles", icon: Box, promo: "-20%" },
  { id: "cruises", label: "Cruises", icon: Ship },
];

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [flights, setFlights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const from = formData.get("from")?.toString() || "";
    const to = formData.get("to")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const travelers = formData.get("travelers")?.toString() || "";

    // Save lead for all types of searches
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          date,
          travelers,
          type: activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + " Search"
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

  return (
    <section className="relative z-30 -mt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-8 md:p-12 border border-slate-100 dark:border-slate-800"
        >
          {/* Tabs */}
          <div className="flex gap-4 md:gap-8 mb-10 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto hscroll-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative pb-4 flex items-center gap-3 font-bold text-lg transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-primary dark:text-white"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                )}
              >
                <tab.icon className={cn("w-6 h-6", activeTab === tab.id ? "text-accent" : "text-slate-300")} />
                {tab.label}
                {tab.promo && (
                  <span className="bg-emerald-100 text-emerald-600 text-xs px-2 py-1 rounded-lg">
                    {tab.promo}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabSearch"
                    className="absolute bottom-[-1px] left-0 right-0 h-1 bg-accent rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end"
          >
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Departure</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                <input
                  type="text"
                  name="from"
                  placeholder="From where?"
                  defaultValue="Delhi"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Destination</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                <input
                  type="text"
                  name="to"
                  placeholder="Where to?"
                  defaultValue="Mumbai"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Dates</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                <input
                  type="date"
                  name="date"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium appearance-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Travelers</label>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                <select 
                  name="travelers"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium appearance-none cursor-pointer"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-light transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {/* Results Section */}
          <AnimatePresence>
            {hasSearched && flights.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 p-8 text-center bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700"
              >
                <Box className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No flights available</h3>
                <p className="text-slate-400">We couldn't find any flights matching your search. Try different cities or dates.</p>
              </motion.div>
            )}
            {flights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold font-outfit">Available Flights</h3>
                  <span className="text-slate-400 font-medium">{flights.length} flights found</span>
                </div>
                <div className="grid gap-6">
                  {flights.map((flight, idx) => (
                    <motion.div
                      key={flight._id || idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 hover:border-accent/30 transition-all hover:shadow-lg group"
                    >
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                          <Plane className="w-8 h-8 text-accent -rotate-45" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{flight.airline || "Karmana Air"}</div>
                          <div className="text-slate-400 text-sm font-medium">{flight.flightNumber || "KA-102"}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-12 flex-1 justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-black">{flight.departureTime || "10:00"}</div>
                          <div className="text-slate-400 font-bold text-sm tracking-tighter uppercase">{flight.from}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2 flex-1 max-w-[120px]">
                          <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700 relative">
                            <motion.div 
                              animate={{ left: ["0%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" 
                            />
                          </div>
                          <div className="text-[10px] items-center font-black text-slate-300 uppercase tracking-widest">Non-stop</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black">{flight.arrivalTime || "12:00"}</div>
                          <div className="text-slate-400 font-bold text-sm tracking-tighter uppercase">{flight.to}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-6 md:pt-0">
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Starting from</div>
                          <div className="text-3xl font-black text-primary dark:text-white">₹{flight.price || "4,499"}</div>
                        </div>
                        <button className="bg-accent hover:bg-accent-hover text-primary p-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20">
                          <ArrowRight className="w-6 h-6" />
                        </button>
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
