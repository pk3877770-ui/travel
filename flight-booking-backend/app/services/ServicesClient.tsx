"use client";

import React from "react";
import Link from "next/link";
import { Plane, Hotel, Map, Headset, Shield, Car, Check } from "lucide-react";

const ServicesClient = () => {
  const services = [
    {
      title: "Global Aviation",
      icon: <Plane className="w-8 h-8 text-accent" />,
      desc: "First-class and private jet charters with seamless airport transfers and executive lounge access worldwide.",
      features: ["Private Jet Charter", "Priority Boarding", "VIP Lounges"]
    },
    {
      title: "Elite Residencies",
      icon: <Hotel className="w-8 h-8 text-accent" />,
      desc: "Exclusive partnerships with Five-Star hospitality groups and private villa curators across seven continents.",
      features: ["Luxury Suite Upgrades", "Early Check-in/Late Out", "Resort Credits"],
      featured: true
    },
    {
      title: "Curated Journeys",
      icon: <Map className="w-8 h-8 text-accent" />,
      desc: "Meticulously planned holiday packages that focus on authentic experiences without sacrificing comfort.",
      features: ["Bespoke Itineraries", "Private Local Guides", "Culinary Experiences"]
    },
    {
      title: "24/7 Concierge",
      icon: <Headset className="w-8 h-8 text-accent" />,
      desc: "A dedicated lifestyle manager available globally to handle shifting plans, last-minute bookings, and local needs.",
      features: ["Lifestyle Management", "Itinerary Changes", "Local Arrangements"]
    },
    {
      title: "Total Protection",
      icon: <Shield className="w-8 h-8 text-accent" />,
      desc: "Elite travel insurance and medical assistance coverage ensuring your well-being in any part of the world.",
      features: ["Medical Assistance", "Cancellation Cover", "Global Guard"]
    },
    {
      title: "Ground Logistics",
      icon: <Car className="w-8 h-8 text-accent" />,
      desc: "Chauffeur-driven luxury vehicles and exotic car rentals awaiting your arrival at every destination.",
      features: ["Chauffeur Service", "Airport Transfers", "Exotic Rentals"]
    }
  ];

  return (
    <main className="bg-white">
      {/* Inner Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600&q=80"
          alt="Services Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 text-center px-6">
          <div className="animate-fade-in-up">
            <span className="inline-block bg-accent text-primary px-4 py-1.5 mb-6 rounded-full font-bold text-sm tracking-wider">
              EXCELLENCE DEFINED
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white font-outfit leading-tight mb-4">
              Bespoke <span className="text-accent underline decoration-accent/30">Travel</span> Solutions
            </h1>
          </div>
        </div>
      </section>

      {/* Services Intro */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black font-outfit text-primary">Comprehensive Luxury Management</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              We go beyond simple bookings, providing a complete ecosystem of travel services designed for the modern elite traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`p-10 rounded-[2.5rem] border-2 transition-all duration-500 hover:-translate-y-2 group ${
                  service.featured 
                    ? "border-accent shadow-2xl shadow-accent/10 bg-white" 
                    : "border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black font-outfit text-primary mb-4 italic tracking-tight">{service.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">{service.desc}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-400">
                      <Check className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black font-outfit text-white leading-tight italic">
            Ready to Elevate Your Perspective?
          </h2>
          <p className="text-white/60 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Disconnect from the noise and reconnect with the soul of the world through our curated experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link 
              href="/contact" 
              className="bg-accent hover:bg-accent-dark text-primary font-black px-10 py-5 rounded-full text-lg shadow-2xl hover:shadow-accent/20 transition-all transform hover:-translate-y-1"
            >
              Request a Consultation
            </Link>
            <Link 
              href="/" 
              className="bg-transparent border-2 border-white/20 hover:border-white text-white font-black px-10 py-5 rounded-full text-lg transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesClient;
