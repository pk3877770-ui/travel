"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plane, Hotel, Map, Headset, Shield, Car, Check, ArrowRight, Sparkles, X, RefreshCcw } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Global Aviation",
    desc: "First-class and private jet charters with seamless airport transfers and executive lounge access worldwide.",
    features: ["Private Jet Charter", "Priority Boarding", "VIP Lounges"]
  },
  {
    icon: Hotel,
    title: "Elite Residencies",
    desc: "Exclusive partnerships with Five-Star hospitality groups and private villa curators across seven continents.",
    features: ["Luxury Suite Upgrades", "Early Check-in/Late Out", "Resort Credits"],
    highlight: true
  },
  {
    icon: Map,
    title: "Curated Journeys",
    desc: "Meticulously planned holiday packages that focus on authentic experiences without sacrificing comfort.",
    features: ["Bespoke Itineraries", "Private Local Guides", "Culinary Experiences"]
  },
  {
    icon: Headset,
    title: "24/7 Concierge",
    desc: "A dedicated lifestyle manager available globally to handle shifting plans, last-minute bookings, and local needs.",
    features: ["Personal Manager", "Lifestyle Support", "Emergency Changes"]
  },
  {
    icon: Shield,
    title: "Total Protection",
    desc: "Elite travel insurance and medical assistance coverage ensuring your well-being in any part of the world.",
    features: ["Global Coverage", "Medical Support", "Trip Cancellation"]
  },
  {
    icon: Car,
    title: "Ground Logistics",
    desc: "Chauffeur-driven luxury vehicles and exotic car rentals awaiting your arrival at every destination.",
    features: ["Private Chauffeur", "Luxury Vehicle Fleet", "Exotic Rentals"]
  }
];

export default function ServicesPage() {
  const router = useRouter();
  const [showConsultForm, setShowConsultForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConsultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      type: "Service Consultation"
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Services Page",
          to: "Consultation Request",
          date: new Date().toLocaleDateString(),
          travelers: data.name,
          type: `CONSULTATION: ${data.message}`
        }),
      });
      alert("Your consultation request has been received. Our manager will reach out shortly.");
      setShowConsultForm(false);
    } catch (error) {
      console.error("Failed to send consultation:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-20 bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-blue-900/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1600&q=80"
            alt="Services Hero"
            className="w-full h-full object-cover grayscale-[0.3]"
          />
        </div>
        <div className="container max-w-4xl mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent text-primary text-xs font-black tracking-widest uppercase"
          >
            Excellence Defined
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black font-outfit text-white mb-6"
          >
            Bespoke <span className="text-accent underline decoration-4 underline-offset-8">Travel</span> Solutions
          </motion.h1>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">Comprehensive Luxury Management</h2>
            <p className="text-lg text-slate-500">We go beyond simple bookings, providing a complete ecosystem of travel services designed for the modern elite traveler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[3rem] ${service.highlight ? 'bg-primary text-white border-2 border-accent/20' : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800'} transition-all hover:shadow-2xl group relative overflow-hidden`}
              >
                {service.highlight && (
                    <div className="absolute top-8 right-8">
                        <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                    </div>
                )}
                
                <div className={`w-16 h-16 rounded-2xl ${service.highlight ? 'bg-accent/20' : 'bg-white dark:bg-slate-800 shadow-sm'} flex items-center justify-center mb-8`}>
                  <service.icon className="w-8 h-8 text-accent" />
                </div>

                <h3 className="text-2xl font-bold font-outfit mb-4">{service.title}</h3>
                <p className={`text-sm mb-8 leading-relaxed ${service.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                  {service.desc}
                </p>

                <ul className="space-y-3 mb-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                      <Check className="w-4 h-4 text-accent" />
                      <span className={service.highlight ? 'text-slate-100' : 'text-slate-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl transform -rotate-12 scale-150" />
        <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black font-outfit text-white mb-8 tracking-tight"
          >
            Ready to Elevate Your Perspective?
          </motion.h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Disconnect from the noise and reconnect with the soul of the world through our curated experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowConsultForm(true)}
              className="bg-accent text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20"
            >
              Request a Consultation
            </button>
            <button 
              onClick={() => router.push('/flight-booking')}
              className="bg-transparent border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              See All Offerings
            </button>
          </div>

          {/* Consultation Form Modal */}
          {showConsultForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-primary/80 backdrop-blur-md" onClick={() => setShowConsultForm(false)} />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/10"
              >
                <button onClick={() => setShowConsultForm(false)} className="absolute top-8 right-8 text-slate-400 hover:text-primary">
                  <X className="w-8 h-8" />
                </button>
                <h3 className="text-3xl font-black font-outfit mb-4">Personal Consultation</h3>
                <p className="text-slate-500 mb-8">Share your vision, and our lifestyle managers will curate the perfect journey for you.</p>
                <form onSubmit={handleConsultSubmit} className="space-y-6">
                  <input type="text" name="name" placeholder="Full Name" required className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" />
                  <input type="email" name="email" placeholder="Email Address" required className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium" />
                  <textarea name="message" placeholder="What are you dreaming of?" required className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-accent font-medium h-32 resize-none" />
                  <button 
                    disabled={loading}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : "Send Request"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
