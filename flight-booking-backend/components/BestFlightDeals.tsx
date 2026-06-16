"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";

const destinations = [
  {
    city: "Dubai",
    price: "₹ 12,499",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  },
  {
    city: "Singapore",
    price: "₹ 14,999",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
  },
  {
    city: "Bangkok",
    price: "₹ 9,999",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
  },
  {
    city: "London",
    price: "₹ 24,999",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80",
  },
];

const usRoutes = [
  { fromCode: "JFK", fromCity: "New York", toCode: "LAX", toCity: "Los Angeles", airline: "Delta", duration: "6h 15m", price: "$189" },
  { fromCode: "LAX", fromCity: "Los Angeles", toCode: "SFO", toCity: "San Francisco", airline: "United", duration: "1h 30m", price: "$79" },
  { fromCode: "ORD", fromCity: "Chicago", toCode: "LGA", toCity: "New York", airline: "American", duration: "2h 25m", price: "$129" },
  { fromCode: "ATL", fromCity: "Atlanta", toCode: "MIA", toCity: "Miami", airline: "Delta", duration: "2h 05m", price: "$99" },
  { fromCode: "DFW", fromCity: "Dallas", toCode: "DEN", toCity: "Denver", airline: "Southwest", duration: "2h 15m", price: "$119" },
  { fromCode: "SEA", fromCity: "Seattle", toCode: "LAS", toCity: "Las Vegas", airline: "Alaska", duration: "2h 40m", price: "$109" },
  { fromCode: "BOS", fromCity: "Boston", toCode: "DCA", toCity: "Washington", airline: "JetBlue", duration: "1h 35m", price: "$89" },
  { fromCode: "IAH", fromCity: "Houston", toCode: "MCO", toCity: "Orlando", airline: "United", duration: "2h 20m", price: "$139" },
];

const TopDestinations = () => {
  return (
    <section className="py-12 bg-white pb-12">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Popular Destinations */}
        <div className="flex justify-between items-center mb-6" data-aos="fade-up">
          <h2 className="text-xl font-bold text-slate-800">Popular Destinations</h2>
          <Link href="/flights" className="text-primary font-bold flex items-center gap-1 hover:underline text-sm group">
            View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <Link
              href={`/flights?to=${dest.city.toLowerCase()}`}
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group bg-white border border-slate-100 rounded-xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.city}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-red-500 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {dest.price}
                </span>
                <h3 className="absolute bottom-3 left-3 font-bold text-base text-white drop-shadow">
                  {dest.city}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular US Domestic Routes */}
        <div className="flex justify-between items-center mt-16 mb-6" data-aos="fade-up">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Popular US Domestic Routes</h2>
            <p className="text-sm text-slate-500 mt-1">Lowest nonstop fares across America</p>
          </div>
          <Link href="/flights" className="text-primary font-bold flex items-center gap-1 hover:underline text-sm group shrink-0">
            View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {usRoutes.map((route, idx) => (
            <Link
              href={`/flights?from=${route.fromCode}&to=${route.toCode}`}
              key={idx}
              data-aos="fade-up"
              data-aos-delay={(idx % 4) * 100}
              className="group bg-white border border-slate-100 rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/30"
            >
              {/* Airline + nonstop badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500">{route.airline}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Nonstop
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-800 leading-none">{route.fromCode}</div>
                  <div className="text-xs text-slate-500 mt-1">{route.fromCity}</div>
                </div>

                <div className="flex-1 flex items-center px-2">
                  <div className="h-px flex-1 bg-slate-200" />
                  <Plane className="w-4 h-4 text-primary mx-1 rotate-90 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800 leading-none">{route.toCode}</div>
                  <div className="text-xs text-slate-500 mt-1">{route.toCity}</div>
                </div>
              </div>

              {/* Footer: duration + price */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-400">{route.duration}</span>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block leading-none">from</span>
                  <span className="text-lg font-bold text-primary">{route.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
