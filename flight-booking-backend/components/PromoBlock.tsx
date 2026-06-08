"use client";

import React from "react";
import Image from "next/image";
import { Plane, IndianRupee, MessageCircle, ShieldCheck, Play } from "lucide-react";

const benefits = [
  {
    icon: Plane,
    title: "Wide Range of Flights",
    desc: "Choose from 1000+ airlines",
    iconColor: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: IndianRupee,
    title: "Affordable Prices",
    desc: "Get the best prices",
    iconColor: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    icon: MessageCircle,
    title: "Customer Satisfaction",
    desc: "Trusted by millions",
    iconColor: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: ShieldCheck,
    title: "Secure & Easy Booking",
    desc: "Book with confidence",
    iconColor: "text-blue-500",
    bg: "bg-blue-50"
  }
];

const PromoBlock = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=80"
                alt="Woman relaxing on a flight"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
              <button className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center text-accent shadow-lg hover:scale-105 transition-transform">
                <Play className="w-5 h-5 ml-1" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <h4 className="text-accent text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="text-accent">›</span> WHY CHOOSE US
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-4">
              We Make Your Travel<br />More Comfortable
            </h2>
            <p className="text-slate-500 mb-10 max-w-md text-sm leading-relaxed">
              We offer the best flight deals, easy bookings, and 24/7 support to make your journey smooth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoBlock;
