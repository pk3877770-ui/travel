"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Search, ArrowRight, ShieldCheck, Crown, RefreshCcw, HandCoins, MapPin, Calendar, Users, Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const flightDeals = [
  { from: "New Delhi", to: "Goa", basePrice: "4,500", dealPrice: "2,999", type: "Direct Flight", tag: "SAVE 30%", icon: Plane },
  { from: "Mumbai", to: "Dubai", basePrice: "12,000", dealPrice: "8,499", type: "International", tag: "BEST SELLER", icon: Globe },
  { from: "Bangalore", to: "London", basePrice: "65,000", dealPrice: "48,999", type: "Direct | British Airways", tag: "ELITE", icon: Crown },
];

const trustPillars = [
  { icon: ShieldCheck, title: "Sovereign Safety", desc: "Comprehensive protection for every mile traveled." },
  { icon: Crown, title: "Priority Concierge", desc: "Skip wait times with a dedicated travel manager." },
  { icon: RefreshCcw, title: "Absolute Fluidity", desc: "Hassle-free elite cancellation and rescheduling." },
  { icon: HandCoins, title: "Price Excellence", desc: "Exclusive negotiated rates for our distinguished members." },
];

export default function FlightBookingPage() {
  const router = useRouter();
  const [flights, setFlights] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isBooking, setIsBooking] = React.useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = React.useState<string | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [selectedFlight, setSelectedFlight] = React.useState<any>(null);

  React.useEffect(() => {
    // Handle incoming booking from homepage
    const params = new URLSearchParams(window.location.search);
    if (params.get("book") === "true") {
      setSelectedFlight({
        airline: params.get("airline"),
        from: params.get("from"),
        to: params.get("to"),
        price: params.get("price"),
        date: params.get("date"),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const data: any = {};
    
    formData.forEach((value, key) => {
      if (value) {
        params.append(key, value.toString());
        data[key] = value.toString();
      }
    });

    // Lead capture is now handled server-side in /api/search to prevent duplicates

    setLoading(true);
    setHasSearched(true);
    setFlights([]);

    try {
      const res = await fetch(`/api/search?from=${data.from}&to=${data.to}&date=${data.departure}&travelers=1`);
      const searchData = await res.json();
      if (searchData.success) {
        setFlights(searchData.flights);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }

    router.push(`/flight-booking?${params.toString()}`, { scroll: false });
  };

  const handleBookFlight = (flight: any) => {
    setSelectedFlight(flight);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20">
      {/* Hero Search Area */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt="Aviation Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-20">
          <AnimatePresence mode="wait">
            {selectedFlight ? (
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
              >
                <div className="bg-primary p-10 text-white flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold font-outfit mb-2">Complete Your Booking</h2>
                    <p className="text-slate-400">Finalize your sovereign journey with {selectedFlight.airline}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedFlight(null)}
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
                  >
                    <ArrowRight className="w-6 h-6 rotate-180" />
                  </button>
                </div>
                
                <div className="p-10 md:p-14">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-6">
                      <h3 className="text-lg font-black text-accent uppercase tracking-widest">Passenger Details</h3>
                      <div className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" />
                        <input type="email" placeholder="Email Address" className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" />
                        <input type="tel" placeholder="Passport Number" className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-lg font-black text-accent uppercase tracking-widest">Flight Summary</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-slate-400 font-bold">Route</span>
                          <span className="font-black">{selectedFlight.from} → {selectedFlight.to}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-slate-400 font-bold">Date</span>
                          <span className="font-black">{selectedFlight.date || "TBD"}</span>
                        </div>
                        <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                          <span className="text-slate-400 font-bold">Total Fare</span>
                          <span className="text-3xl font-black text-primary dark:text-white">₹{selectedFlight.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={async () => {
                      setLoading(true);
                      // Capture Lead
                      await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          from: selectedFlight.from,
                          to: selectedFlight.to,
                          date: selectedFlight.date,
                          travelers: "1 Adult",
                          type: `CONFIRMED BOOKING: ${selectedFlight.airline}`
                        }),
                      });
                      setTimeout(() => {
                        setLoading(false);
                        alert("Your sovereign flight has been successfully reserved!");
                        setSelectedFlight(null);
                      }, 2000);
                    }}
                    disabled={loading}
                    className="w-full bg-primary text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
                    {loading ? "Processing..." : "Confirm & Pay Now"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block bg-accent/20 text-accent px-6 py-2 rounded-full font-black text-sm tracking-[0.2em] mb-6 border border-accent/20">
                ELEVATED AVIATION
              </span>
              <h1 className="text-5xl md:text-8xl font-black font-outfit text-white mb-6">
                Sovereign <span className="text-accent">Skies</span> Await
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto font-inter">
                Access unpublished rates and priority routing across 500+ global airlines.
              </p>
            </motion.div>
          </div>

          {/* Specialized Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-10 md:p-14 border border-slate-100 dark:border-slate-800"
          >
            <form onSubmit={handleSearch} className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-end">
                <div className="lg:col-span-3 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Leaving From</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                    <input
                      type="text"
                      name="from"
                      placeholder="City or Airport"
                      defaultValue="Delhi (DEL)"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="hidden lg:flex lg:col-span-1 justify-center pb-2">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-pointer transition-colors">
                    <RefreshCcw className="w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Going To</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                    <input
                      type="text"
                      name="to"
                      placeholder="City or Airport"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Cabin Class</label>
                  <select 
                    name="cabin"
                    className="w-full bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent transition-all font-medium cursor-pointer"
                  >
                    <option>Business Class</option>
                    <option>First Class</option>
                    <option>Premium Economy</option>
                    <option>Economy</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="date" 
                      name="departure"
                      className="w-full bg-slate-50 dark:bg-slate-800 px-12 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium dark:text-white" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Return</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="date" 
                      name="return"
                      className="w-full bg-slate-50 dark:bg-slate-800 px-12 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium dark:text-white" 
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
                  {loading ? "Searching..." : "Find Flights"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {hasSearched && flights.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-12 text-center bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10"
              >
                <Plane className="w-16 h-16 text-slate-500 mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-bold text-white mb-3">No sovereign flights found</h3>
                <p className="text-slate-400 max-w-md mx-auto">Our concierge is sourcing exclusive rates. Try adjusting your departure or destination for elite availability.</p>
              </motion.div>
            )}
            
            {flights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-6"
              >
                <div className="flex items-center justify-between px-6 mb-8">
                  <h3 className="text-2xl font-bold text-white font-outfit">Available Sovereign Flights</h3>
                  <span className="bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-black tracking-widest border border-accent/20">
                    {flights.length} ELITE OPTIONS FOUND
                  </span>
                </div>

                <div className="grid gap-6">
                  {flights.map((flight, idx) => (
                    <motion.div
                      key={flight._id || idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-10 hover:bg-white/10 transition-all hover:border-accent/30 group relative overflow-hidden"
                    >
                      <div className="flex items-center gap-8 w-full lg:w-auto">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-white/10 flex items-center justify-center shadow-inner">
                          <Plane className="w-10 h-10 text-accent -rotate-45" />
                        </div>
                        <div>
                          <div className="font-bold text-2xl text-white font-outfit">{flight.airline || "Karmana Air"}</div>
                          <div className="text-slate-400 text-sm font-black tracking-widest uppercase opacity-60">
                            {flight.flightNumber || `KA-${100 + idx}`} • {flight.class || "Business"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-16 flex-1 justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-black text-white">{flight.departureTime || "10:00"}</div>
                          <div className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase mt-2">{flight.from}</div>
                        </div>
                        <div className="flex flex-col items-center gap-3 flex-1 max-w-[200px]">
                          <div className="w-full h-[2px] bg-white/10 relative">
                            <motion.div 
                              animate={{ left: ["0%", "100%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.8)]" 
                            />
                          </div>
                          <div className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Direct Flight</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-white">{flight.arrivalTime || "12:00"}</div>
                          <div className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase mt-2">{flight.to}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-10 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/5 pt-8 lg:pt-0">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fare starts at</p>
                          <p className="text-4xl font-black text-white font-outfit">₹{flight.price || "4,499"}</p>
                        </div>
                        <button 
                          onClick={() => handleBookFlight(flight)}
                          disabled={isBooking === (flight._id || idx) || bookingSuccess === (flight._id || idx)}
                          className={cn(
                            "px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3",
                            bookingSuccess === (flight._id || idx) 
                              ? "bg-emerald-500 text-white" 
                              : "bg-accent hover:bg-accent-hover text-primary hover:-translate-y-1"
                          )}
                        >
                          {isBooking === (flight._id || idx) ? (
                            <RefreshCcw className="w-6 h-6 animate-spin" />
                          ) : bookingSuccess === (flight._id || idx) ? (
                            <>
                              <Check className="w-6 h-6" /> Confirmed
                            </>
                          ) : (
                            <>
                              Book Now <ArrowRight className="w-6 h-6" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  </div>
      </section>

      {/* Signature Routes */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Signature Routes</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mt-4">Exclusive Aviation Offers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {flightDeals.map((deal, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center">
                    <deal.icon className="w-8 h-8 text-accent" />
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black tracking-widest",
                    deal.tag === "SAVE 30%" ? "bg-emerald-100 text-emerald-600" : "bg-primary text-white"
                  )}>
                    {deal.tag}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold font-outfit mb-2 flex items-center gap-3">
                  {deal.from} <ArrowRight className="w-5 h-5 text-slate-300" /> {deal.to}
                </h3>
                <p className="text-slate-400 text-sm mb-8 font-medium tracking-wide">{deal.type}</p>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-slate-400 line-through text-sm mb-1">₹{deal.basePrice}</p>
                    <p className="text-3xl font-black text-primary dark:text-white font-outfit">
                      ₹{deal.dealPrice}<span className="text-sm font-normal text-slate-400 ml-1">/pp</span>
                    </p>
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                    Book
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-24 bg-primary text-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {trustPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full border border-white/10 mx-auto flex items-center justify-center mb-8 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  <pillar.icon className="w-10 h-10 text-accent group-hover:text-primary transition-all duration-500" />
                </div>
                <h3 className="text-xl font-bold font-outfit mb-4">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper for conditional classes (Removed duplicated local function as it is now imported from @/lib/utils)
