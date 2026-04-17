"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Hotel, Box, Ship, Search, Calendar, Users, MapPin } from "lucide-react";
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
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    
    formData.forEach((value, key) => {
      if (value) params.append(key, value.toString());
    });

    const destination = activeTab === "hotels" ? "/hotel-booking" : "/flight-booking";
    router.push(`${destination}?${params.toString()}`);
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
                  defaultValue="New Delhi (DEL)"
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
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-light transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95"
              >
                <Search className="w-6 h-6" />
                Search
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
