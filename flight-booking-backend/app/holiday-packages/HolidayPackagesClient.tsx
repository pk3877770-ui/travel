"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Search, Compass, Ship, Plane, Utensils, Snowflake, Car, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const signatureJourneys = [
  {
    id: 1,
    title: "Azure Goa Heritage",
    price: "₹22,999",
    oldPrice: "₹35,000",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    badge: "SIGNATURE",
    perks: [
      { icon: Plane, label: "Airfare" },
      { icon: Utensils, label: "Full Board" },
    ],
  },
  {
    id: 2,
    title: "Whispering Palms Kerala",
    price: "₹39,999",
    oldPrice: "₹55,000",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    badge: "ROMANTIC",
    perks: [
      { icon: Ship, label: "Private Boat" },
      { icon: Snowflake, label: "Spa Stay" },
    ],
  },
  {
    id: 3,
    title: "Northern Alpine Heights",
    price: "₹18,999",
    oldPrice: "₹28,000",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a22?w=600&q=80",
    badge: "ADVENTURE",
    perks: [
      { icon: Car, label: "Luxury SUV" },
      { icon: Snowflake, label: "Ski Pass" },
    ],
  },
];

const globalEscapes = [
  { name: "Maldives", price: "₹45,999", image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80" },
  { name: "Dubai", price: "₹52,999", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
  { name: "Thailand", price: "₹38,999", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
];

export default function HolidayPackages() {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    
    const formData = new FormData(e.currentTarget);
    const destination = formData.get("destination")?.toString() || "";
    const duration = formData.get("duration")?.toString() || "";

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Anywhere", // Not specified in form
          to: destination,
          date: duration, // We'll store duration in the date field
          travelers: "2 Adults", // Default assumption for holiday packages
          type: "Holiday Package"
        }),
      });
      
      // Simulate search delay for UX
      setTimeout(() => {
        setIsSearching(false);
        // You can add routing here to a results page if needed
      }, 1500);
    } catch (error) {
      console.error("Failed to save holiday lead:", error);
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-white dark:to-slate-950 z-10" />
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt="Holiday Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-accent/20 text-accent px-6 py-2 rounded-full font-bold text-sm tracking-widest mb-6 border border-accent/20">
              CURATED EXPERIENCES
            </span>
            <h1 className="text-6xl md:text-8xl font-bold font-outfit text-white mb-6 leading-tight">
              Journeys of a <span className="text-accent">Lifetime</span>
            </h1>
            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto font-inter leading-relaxed">
              Skip-the-ordinary with all-inclusive signatures encompassing flights, elite hotels, and private transfers.
            </p>

            {/* Specialized Package Search */}
            <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-left border border-slate-100 dark:border-slate-800">
               <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  <div className="lg:col-span-2 space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Destination</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50" />
                      <select name="destination" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium appearance-none cursor-pointer">
                        <option>Maldives Over-water Experience</option>
                        <option>Kerala Backwaters & Luxury</option>
                        <option>Manali Swiss-Chalet Adventure</option>
                        <option>Dubai Desert Splendor</option>
                        <option>Thailand Private Island Hopping</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Duration</label>
                    <div className="relative group">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50" />
                      <select name="duration" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium appearance-none cursor-pointer">
                        <option>4-5 Nights</option>
                        <option>6-8 Nights</option>
                        <option>10-14 Nights</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="w-full bg-accent text-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSearching ? <Loader2 className="w-6 h-6 animate-spin" /> : <Compass className="w-6 h-6" />}
                      {isSearching ? "Exploring..." : "Explore"}
                    </button>
                  </div>
               </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Journeys */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Member Favorites</span>
            <h2 className="text-4xl md:text-6xl font-black font-outfit mt-4 mb-6">Signature Journeys</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {signatureJourneys.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute top-6 right-6 z-10 bg-primary text-accent px-4 py-2 rounded-full font-black text-xs">
                    {pkg.badge}
                  </div>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold font-outfit mb-4">{pkg.title}</h3>
                  <div className="flex gap-4 mb-8">
                    {pkg.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                        <perk.icon className="w-4 h-4 text-accent" />
                        {perk.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 text-sm line-through block">{pkg.oldPrice}</span>
                      <span className="text-2xl font-black text-primary dark:text-accent">
                        {pkg.price}
                        <span className="text-slate-400 text-xs font-normal ml-1">/pp</span>
                      </span>
                    </div>
                    <button className="bg-primary hover:bg-primary-light text-white p-4 rounded-2xl transition-all shadow-lg">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Destinations */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Global Horizons</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mt-4 mb-6">Trending International Escapes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {globalEscapes.map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative h-96 rounded-[2.5rem] overflow-hidden group cursor-pointer"
              >
                <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex justify-between items-center">
                   <div>
                     <h4 className="text-white text-2xl font-bold font-outfit">{loc.name}</h4>
                     <p className="text-accent font-bold">From {loc.price}</p>
                   </div>
                   <ArrowRight className="text-white w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
