"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Search, ArrowRight, ShieldCheck, Crown, RefreshCcw, HandCoins, MapPin, Calendar, Users, Globe, Check, Hotel, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import Script from "next/script";

const flightServiceSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Karmana Flight Booking",
  "description": "Premium flight booking service with access to exclusive rates and priority routing.",
  "url": "https://karmana.vercel.app/flights",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New Delhi",
    "addressCountry": "IN"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Flight Booking Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Domestic Flight Booking"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "International Flight Booking"
        }
      }
    ]
  }
};

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
  const [passenger, setPassenger] = React.useState({ name: "", email: "", passport: "" });
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState<"idle" | "processing" | "success">("idle");
  const [paymentGateway, setPaymentGateway] = React.useState<"razorpay" | "stripe">("razorpay");
  
  // Filters state
  const [filterAirline, setFilterAirline] = React.useState<string>("All");
  const [filterClass, setFilterClass] = React.useState<string>("All");
  const [filterMaxPrice, setFilterMaxPrice] = React.useState<number>(100000);
  const [filterTime, setFilterTime] = React.useState<string>("All");

  // Derive unique airlines and classes from current search results
  const availableAirlines = React.useMemo(() => {
    const airlines = flights.map(f => f.airline || "Karmana Air");
    return ["All", ...Array.from(new Set(airlines))];
  }, [flights]);

  const availableClasses = React.useMemo(() => {
    const classes = flights.map(f => f.class || "Business");
    return ["All", ...Array.from(new Set(classes))];
  }, [flights]);

  const filteredFlights = React.useMemo(() => {
    return flights.filter(f => {
      const flightAirline = f.airline || "Karmana Air";
      const flightClass = f.class || "Business";
      const flightPrice = f.price || 4499;

      if (filterAirline !== "All" && flightAirline !== filterAirline) return false;
      if (filterClass !== "All" && flightClass !== filterClass) return false;
      if (flightPrice > filterMaxPrice) return false;
      
      if (filterTime !== "All") {
        const timeStr = f.departureTime || "10:00";
        let hours = 10;
        if (timeStr.includes("AM") || timeStr.includes("PM")) {
          const [t, modifier] = timeStr.split(" ");
          let [h, m] = t.split(":");
          if (h === "12") h = "00";
          if (modifier === "PM") h = (parseInt(h, 10) + 12).toString();
          hours = parseInt(h, 10);
        } else {
          hours = parseInt(timeStr.split(":")[0], 10);
        }
        
        if (filterTime === "Morning" && (hours < 5 || hours >= 12)) return false;
        if (filterTime === "Afternoon" && (hours < 12 || hours >= 18)) return false;
        if (filterTime === "Evening" && (hours >= 5 && hours < 18)) return false;
      }
      
      return true;
    });
  }, [flights, filterAirline, filterClass, filterMaxPrice, filterTime]);

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
        type: params.get("type") || "Flight",
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
    if (data.cabin) setFilterClass(data.cabin);

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

    router.push(`/flights?${params.toString()}`, { scroll: false });
  };

  const handleBookFlight = (flight: any) => {
    setSelectedFlight(flight);
    setShowPaymentModal(false);
    setPaymentStatus("idle");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const processPaymentAndBook = async () => {
    setPaymentStatus("processing");
    
    // Simulate secure payment processing gateway delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      const res = await fetch("/api/user/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flight: {
            from: selectedFlight.from,
            to: selectedFlight.to,
            date: selectedFlight.date || new Date().toISOString(),
            airline: selectedFlight.airline || "Karmana Air",
            price: selectedFlight.price,
            departureTime: selectedFlight.departureTime,
            arrivalTime: selectedFlight.arrivalTime
          },
          travelers: 1,
          passengerDetails: passenger
        }),
      });
      
      if (res.status === 401) {
        alert("Please sign in to complete your booking.");
        router.push("/auth");
        return;
      }
      
      if (!res.ok) throw new Error("Booking failed");

      const responseData = await res.json();
      
      setPaymentStatus("success");
      setBookingSuccess(selectedFlight._id || "success");
      setTimeout(() => {
        router.push(`/payment-success?ref=${responseData.booking.bookingReference}&from=${selectedFlight.from}&to=${selectedFlight.to}`);
      }, 1500);
    } catch (error) {
      alert("Payment failed. Please try again.");
      setPaymentStatus("idle");
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="pt-20">
      <Script
        id="flight-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(flightServiceSchema) }}
      />
      {/* Hero Search Area */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt="Karmana Luxury Aviation - Sovereign Skies International Flight Search"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-20">
          <Breadcrumbs items={[{ name: "Flights", href: "/flights" }]} />
          <AnimatePresence mode="wait">
            {selectedFlight ? (
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
              >
                <div className="bg-primary p-6 md:p-10 text-white flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold font-outfit mb-2">
                      {selectedFlight.type === "Holiday Package" ? "Finalize Your Escape" : "Complete Your Booking"}
                    </h2>
                    <p className="text-slate-400">
                      {selectedFlight.type === "Holiday Package" ? `Reserve your signature journey: ${selectedFlight.to}` : `Finalize your sovereign journey with ${selectedFlight.airline}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedFlight(null)}
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
                  >
                    <ArrowRight className="w-6 h-6 rotate-180" />
                  </button>
                </div>
                
                <div className="p-6 md:p-14">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-6">
                      <h3 className="text-lg font-black text-accent uppercase tracking-widest">Passenger Details</h3>
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          value={passenger.name}
                          onChange={(e) => setPassenger({...passenger, name: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" 
                        />
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          value={passenger.email}
                          onChange={(e) => setPassenger({...passenger, email: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" 
                        />
                        <input 
                          type="text" 
                          placeholder="Passport Number" 
                          value={passenger.passport}
                          onChange={(e) => setPassenger({...passenger, passport: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" 
                        />
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
                    onClick={() => {
                      if (!passenger.name || !passenger.email || !passenger.passport) {
                        alert("Please fill in all passenger details before confirming your booking.");
                        return;
                      }
                      setShowPaymentModal(true);
                    }}
                    disabled={loading}
                    className="w-full bg-primary text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    <ShieldCheck className="w-6 h-6" />
                    Proceed to Secure Payment
                  </button>
                </div>

                {/* Payment Gateway Modal */}
                <AnimatePresence>
                  {showPaymentModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-sm"
                    >
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-12 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 relative"
                      >
                        {paymentStatus === "idle" && (
                          <>
                            <button 
                              onClick={() => setShowPaymentModal(false)}
                              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                            >
                              <ArrowRight className="w-6 h-6 rotate-180" />
                            </button>
                            <div className="mb-8">
                              <h3 className="text-2xl font-black font-outfit text-primary dark:text-white mb-2">Secure Checkout</h3>
                              <p className="text-slate-500 text-sm">Select your preferred payment gateway</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                              <button 
                                onClick={() => setPaymentGateway("razorpay")}
                                className={cn(
                                  "p-4 rounded-2xl border-2 text-left transition-all",
                                  paymentGateway === "razorpay" 
                                    ? "border-blue-500 bg-blue-500/10" 
                                    : "border-slate-200 dark:border-slate-800 hover:border-blue-500/50"
                                )}
                              >
                                <h4 className="font-bold text-white mb-1">Razorpay</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">India Friendly</p>
                                <p className="text-xs text-slate-500 mt-2">UPI, RuPay, NetBanking</p>
                              </button>
                              <button 
                                onClick={() => setPaymentGateway("stripe")}
                                className={cn(
                                  "p-4 rounded-2xl border-2 text-left transition-all",
                                  paymentGateway === "stripe" 
                                    ? "border-indigo-500 bg-indigo-500/10" 
                                    : "border-slate-200 dark:border-slate-800 hover:border-indigo-500/50"
                                )}
                              >
                                <h4 className="font-bold text-white mb-1">Stripe</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Global Pay</p>
                                <p className="text-xs text-slate-500 mt-2">Intl Cards, Apple Pay</p>
                              </button>
                            </div>

                            {paymentGateway === "stripe" ? (
                              <div className="space-y-4 mb-8">
                                <input type="text" placeholder="Card Number" defaultValue="4242 4242 4242 4242" className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 font-mono text-sm tracking-widest" />
                                <div className="grid grid-cols-2 gap-4">
                                  <input type="text" placeholder="MM/YY" defaultValue="12/28" className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 font-mono text-sm" />
                                  <input type="text" placeholder="CVC" defaultValue="123" className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 font-mono text-sm" />
                                </div>
                                <input type="text" placeholder="Name on Card" defaultValue={passenger.name || "CARDHOLDER"} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 font-medium uppercase text-sm" />
                              </div>
                            ) : (
                              <div className="space-y-4 mb-8">
                                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                                  </div>
                                  <p className="text-white font-bold mb-1">Razorpay Secure Interface</p>
                                  <p className="text-sm text-slate-400">You will be redirected to Razorpay to complete your UPI or NetBanking transaction.</p>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                              <span className="text-slate-500 font-bold">Total Due</span>
                              <span className="text-3xl font-black text-primary dark:text-white">₹{selectedFlight.price}</span>
                            </div>

                            <button 
                              onClick={processPaymentAndBook}
                              className={cn(
                                "w-full text-primary-dark py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2",
                                paymentGateway === "razorpay" ? "bg-blue-500 shadow-blue-500/20 text-white" : "bg-indigo-500 shadow-indigo-500/20 text-white"
                              )}
                            >
                              <ShieldCheck className="w-6 h-6" />
                              Pay ₹{selectedFlight.price} with {paymentGateway === "razorpay" ? "Razorpay" : "Stripe"}
                            </button>
                          </>
                        )}

                        {paymentStatus === "processing" && (
                          <div className="py-12 text-center flex flex-col items-center">
                            <RefreshCcw className="w-16 h-16 text-accent animate-spin mb-6" />
                            <h3 className="text-2xl font-black text-white mb-2">Processing Payment</h3>
                            <p className="text-slate-400">Please do not close this window...</p>
                          </div>
                        )}

                        {paymentStatus === "success" && (
                          <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="py-12 text-center flex flex-col items-center"
                          >
                            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                              <Check className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">Payment Successful!</h3>
                            <p className="text-slate-400">Your sovereign flight is confirmed.</p>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              <h1 className="text-3xl sm:text-5xl md:text-8xl font-black font-outfit text-white mb-6">
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
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl p-6 md:p-14 border border-slate-100 dark:border-slate-800"
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
                <div className="flex flex-col md:flex-row items-center justify-between px-6 mb-8 gap-4">
                  <h3 className="text-2xl font-bold text-white font-outfit">Available Sovereign Flights</h3>
                  <span className="bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-black tracking-widest border border-accent/20">
                    {filteredFlights.length} ELITE OPTIONS FOUND
                  </span>
                </div>

                {/* Filters Section */}
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 mb-8 mx-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Airline</label>
                    <select
                      value={filterAirline}
                      onChange={(e) => setFilterAirline(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-accent"
                    >
                      {availableAirlines.map(airline => (
                        <option key={airline} value={airline}>{airline}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Cabin Class</label>
                    <select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-accent"
                    >
                      {availableClasses.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Departure</label>
                    <select
                      value={filterTime}
                      onChange={(e) => setFilterTime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-accent"
                    >
                      <option value="All">Any Time</option>
                      <option value="Morning">Morning (5AM - 12PM)</option>
                      <option value="Afternoon">Afternoon (12PM - 6PM)</option>
                      <option value="Evening">Evening (6PM+)</option>
                    </select>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Max Price</label>
                      <span className="text-sm font-bold text-accent">₹{filterMaxPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={filterMaxPrice}
                      onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>

                <div className="grid gap-6">
                  {filteredFlights.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-400">No flights match your selected filters.</p>
                      <button 
                        onClick={() => {
                          setFilterAirline("All");
                          setFilterClass("All");
                          setFilterMaxPrice(100000);
                          setFilterTime("All");
                        }}
                        className="mt-4 text-accent font-bold hover:underline"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : filteredFlights.map((flight, idx) => (
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

      {/* Complementary Services Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 mesh-gradient opacity-5 pointer-events-none" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Complete Your Journey</span>
              <h2 className="text-4xl md:text-5xl font-black font-outfit mt-4 mb-6 leading-tight">
                Luxury Stays & <span className="text-accent">Curated</span> Escapes
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed">
                A sovereign flight is only the beginning. Experience the world's most celebrated five-star properties and bespoke holiday itineraries curated by our global concierge.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => router.push('/hotels')}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <Hotel className="w-6 h-6" /> Explore Luxury Hotels
                </button>
                <button 
                  onClick={() => router.push('/holiday-packages')}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <Map className="w-6 h-6 text-accent" /> Holiday Packages
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-square w-full max-w-[450px] rounded-[3rem] overflow-hidden shadow-2xl premium-border">
                <img 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" 
                  alt="Karmana Luxury Hotel Collection - Complementary Guest Accommodations" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
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
