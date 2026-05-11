"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, Star, Crown, Heart, Clock, ShieldCheck, ArrowRight, Loader2, Check, Plane, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import Script from "next/script";

const hotelServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Karmana Hotel Collection",
  "description": "Exclusive access to the world's most celebrated Five-Star properties and private estates.",
  "url": "https://karmana.vercel.app/hotels",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressCountry": "IN"
  }
};

const hotelCollection = [
  {
    id: 1,
    name: "Azure Sands Resort",
    location: "North Goa",
    reviews: "1,247",
    rating: "4.9",
    price: "₹2,999",
    oldPrice: "₹4,500",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    alt: "Azure Sands Resort - Luxury Beachfront Property by Karmana",
    tags: ["TOP RATED", "Beachfront"],
  },
  {
    id: 2,
    name: "The Majestic Palace",
    location: "Mumbai",
    reviews: "2,563",
    rating: "5.0",
    price: "₹8,999",
    oldPrice: "₹12,000",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    alt: "The Majestic Palace - Sea View Luxury Estate by Karmana",
    tags: ["LEGENDARY", "Sea View"],
  },
  {
    id: 3,
    name: "Lumina Gardens",
    location: "New Delhi",
    reviews: "892",
    rating: "4.7",
    price: "₹1,999",
    oldPrice: "₹3,500",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
    tags: ["MODERN", "Urban Boutique"],
  },
];

const perks = [
  {
    icon: Crown,
    title: "VVIP Status",
    desc: "Automatic upgrades and preferred treatment across our partner properties.",
  },
  {
    icon: Heart,
    title: "Curated Perks",
    desc: "Complimentary breakfast, resort credits, and bespoke welcome amenities.",
  },
  {
    icon: Clock,
    title: "Flexible Check",
    desc: "Guaranteed early check-in and late check-out for our elite members.",
  },
  {
    icon: ShieldCheck,
    title: "Assured Rates",
    desc: "Access to unpublished private rates and price-match guarantee.",
  },
];

export default function HotelBooking() {
  const router = useRouter();

  const [isSearching, setIsSearching] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState<number | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState<number | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    
    const formData = new FormData(e.currentTarget);
    const destination = formData.get("destination")?.toString() || "";
    const checkin = formData.get("checkin")?.toString() || "";
    const checkout = formData.get("checkout")?.toString() || "";
    const travelers = formData.get("travelers")?.toString() || "";

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Anywhere",
          to: destination,
          date: `${checkin} to ${checkout}`.trim() === 'to' ? 'Flexible' : `${checkin} to ${checkout}`,
          travelers: travelers,
          type: "Hotel Booking"
        }),
      });
      
      // Simulate search delay for UX
      setTimeout(() => {
        setIsSearching(false);
      }, 1500);
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewDetails = (hotel: any) => {
    setSelectedHotel(hotel);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 selection:bg-accent/30">
      <Script
        id="hotel-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelServiceSchema) }}
      />
      
      <AnimatePresence mode="wait">
        {selectedHotel ? (
          <motion.section
            key="hotel-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32 pb-24 px-6 md:px-12 noise-overlay"
          >
            <div className="w-full max-w-[1440px] mx-auto">
              <button 
                onClick={() => setSelectedHotel(null)}
                className="mb-12 flex items-center gap-3 text-slate-400 hover:text-accent font-black uppercase tracking-[0.2em] text-[10px] transition-all group"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" /> Back to Collection
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Visuals */}
                <div className="space-y-8">
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl premium-border">
                    <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-white/10">
                      <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80" className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-white/10">
                      <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80" className="w-full h-full object-cover opacity-80" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-10">
                  <div>
                    <span className="bg-accent/10 text-accent px-4 py-1 rounded-full text-[10px] font-black tracking-[0.3em] border border-accent/20 mb-6 inline-block uppercase">
                      {selectedHotel.tags[0]}
                    </span>
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-black font-outfit mb-6 tracking-tighter leading-tight">{selectedHotel.name}</h2>
                    <p className="text-xl text-slate-400 font-medium flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-accent" /> {selectedHotel.location}
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 space-y-8 shadow-2xl noise-overlay relative overflow-hidden">
                    <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />
                    <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] mb-3">Preferred Member Rate</p>
                        <p className="text-5xl font-black text-primary dark:text-white font-outfit tracking-tighter">{selectedHotel.price}<span className="text-lg font-normal text-slate-500">/night</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-accent font-black text-2xl flex items-center gap-2 justify-end text-glow">
                          <Star className="w-7 h-7 fill-accent" /> {selectedHotel.rating}
                        </p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{selectedHotel.reviews} reviews</p>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-5">
                      <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-400">Amenities & Perks</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {["24/7 Concierge", "Private Pool", "Spa & Wellness", "Gourmet Dining"].map(perk => (
                          <div key={perk} className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                            <Check className="w-5 h-5 text-emerald-500" /> {perk}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-primary-dark space-y-8 shadow-2xl shadow-accent/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-3xl font-black font-outfit relative z-10 tracking-tight">Request a Reservation</h3>
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const btn = e.currentTarget.querySelector('button');
                        if (btn) btn.disabled = true;
                        
                        await fetch("/api/leads", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            from: "Anywhere",
                            to: selectedHotel.name,
                            date: "TBD",
                            travelers: "2 Adults",
                            type: `HOTEL RESERVATION: ${selectedHotel.name}`
                          }),
                        });
                        
                        alert("Your reservation request for " + selectedHotel.name + " has been sent to our concierge.");
                        setSelectedHotel(null);
                      }}
                      className="space-y-4 relative z-10"
                    >
                      <input type="text" placeholder="Full Name" required className="w-full bg-black/5 border border-black/10 p-5 rounded-2xl text-primary-dark placeholder:text-primary-dark/40 focus:outline-none focus:border-primary-dark/30 font-bold" />
                      <input type="email" placeholder="Email Address" required className="w-full bg-black/5 border border-black/10 p-5 rounded-2xl text-primary-dark placeholder:text-primary-dark/40 focus:outline-none focus:border-primary-dark/30 font-bold" />
                      <button className="w-full bg-primary-dark text-white py-5 rounded-2xl font-black text-lg transition-all hover:-translate-y-1 shadow-xl uppercase tracking-[0.2em]">
                        Request Availability
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <>
      <section className="relative min-h-[85vh] flex items-center pt-44 pb-20 overflow-hidden noise-overlay">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/40 to-white dark:to-slate-950 z-10" />
          <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
            alt="Karmana Luxury Hotel Sanctuary and Private Estate Reservations"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-20 text-center">
          <Breadcrumbs items={[{ name: "Hotels", href: "/hotels" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-md text-accent px-6 py-2 rounded-full font-black text-[12px] tracking-[0.4em] mb-8 border border-white/10 shadow-xl">
              LUXURY RESIDENCIES
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-black font-outfit text-white mb-10 leading-[0.85] tracking-tighter">
              Your Sanctuary of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-orange-600 italic font-medium pr-4">
                Grace
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-16 max-w-2xl mx-auto font-inter leading-relaxed opacity-80">
              Preferred access to the world's most celebrated Five-Star properties and private estates.
            </p>

            {/* Specialized Hotel Search */}
            <div className="max-w-6xl mx-auto bg-white/80 dark:bg-slate-900/60 backdrop-blur-[40px] rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] p-6 md:p-14 text-left border border-white/20 dark:border-white/10 noise-overlay">
              <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-end">
                <div className="lg:col-span-4 space-y-4">
                  <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 opacity-80">Destination or Property</label>
                  <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                    <input
                      type="text"
                      name="destination"
                      placeholder="e.g. Kyoto, Maldives, St. Regis..."
                      defaultValue="Goa, India"
                      className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg dark:text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 opacity-80">Check-in</label>
                  <div className="relative group">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                    <input
                      type="date"
                      name="checkin"
                      className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg dark:text-white appearance-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 opacity-80">Check-out</label>
                  <div className="relative group">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                    <input
                      type="date"
                      name="checkout"
                      className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg dark:text-white appearance-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 opacity-80">Travelers</label>
                  <div className="relative group">
                    <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                    <select 
                      name="travelers"
                      className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 py-6 pl-16 pr-6 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-black text-lg dark:text-white appearance-none cursor-pointer"
                    >
                      <option>2 Adults, 0 Children</option>
                      <option>1 Adult</option>
                      <option>Family (2+2)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 lg:col-span-4">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full bg-gradient-to-r from-accent via-orange-500 to-accent text-primary-dark py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-right transition-all duration-500 shadow-2xl shadow-accent/40 active:scale-[0.98] disabled:opacity-70 group"
                  >
                    {isSearching ? <Loader2 className="w-8 h-8 animate-spin" /> : <Search className="w-8 h-8 group-hover:scale-125 transition-transform" />}
                    <span className="text-glow">{isSearching ? "Finding Sancturies..." : "Find Stays"}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Signature Hotel Collection */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Hand-picked Gems</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mt-4 mb-6">Signature Hotel Collection</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {hotelCollection.map((hotel, idx) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute top-6 right-6 z-10 bg-accent text-primary px-4 py-2 rounded-full font-black text-xs">
                    {hotel.tags[0]}
                  </div>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-accent font-bold text-sm flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent" /> {hotel.rating} ({hotel.reviews} Reviews)
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs px-3 py-1 rounded-full">
                      {hotel.tags[1]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-outfit mb-2">{hotel.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{hotel.location} | Private Beach | World-Class Spa</p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 text-sm line-through block">{hotel.oldPrice}</span>
                      <span className="text-2xl font-black text-primary dark:text-accent">
                        {hotel.price}
                        <span className="text-slate-400 text-xs font-normal ml-1">/night</span>
                      </span>
                    </div>
                    <button 
                      onClick={() => handleViewDetails(hotel)}
                      className={cn(
                        "px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 min-w-[140px]",
                        inquirySuccess === hotel.id
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "border-2 border-primary dark:border-accent text-primary dark:text-accent hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary"
                      )}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Perks */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">The Karmana Advantage</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mt-4 mb-6">Elevating Your Stay Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-10 rounded-[2rem] text-center border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all"
              >
                <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mx-auto mb-8">
                  <perk.icon className="w-10 h-10 text-accent" />
                </div>
                <h4 className="text-2xl font-bold font-outfit mb-4">{perk.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereign Skies Section */}
      <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16">
            <div className="max-w-xl">
              <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Arrive in Style</span>
              <h2 className="text-4xl md:text-5xl font-black font-outfit mt-4 mb-6 leading-tight">
                Sovereign <span className="text-accent">Skies</span> Await
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed">
                Your luxury stay deserves an equally exquisite arrival. Access unpublished private rates and priority routing across 500+ global airlines with Karmana's aviation desk.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => router.push('/flights')}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <Plane className="w-6 h-6 text-accent" /> Book Elite Flights
                </button>
                <button 
                  onClick={() => router.push('/holiday-packages')}
                  className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <Map className="w-6 h-6" /> Curated Packages
                </button>
              </div>
            </div>
            <div className="relative group w-full max-w-2xl">
              <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl premium-border">
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1000&q=80" 
                  alt="Private Jet Interior" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Collection CTA */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black font-outfit mb-8">Ready for True Sanctuary?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Our members enjoy priority access to seasonal openings and unpublished private estate rates.
          </p>
          <button className="bg-accent hover:bg-accent-hover text-primary px-12 py-6 rounded-full font-black text-xl transition-all hover:-translate-y-2 shadow-2xl hover:shadow-accent/40 flex items-center gap-4 mx-auto">
            Access Private Collection <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
