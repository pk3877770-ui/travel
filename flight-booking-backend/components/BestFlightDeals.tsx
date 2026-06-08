"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1508009603885-50cf7cbf1c80?w=600&q=80",
  },
  {
    city: "London",
    price: "₹ 24,999",
    image: "https://images.unsplash.com/photo-1513635269975-59693e0cd156?w=600&q=80",
  }
];

const TopDestinations = () => {
  return (
    <section className="py-12 bg-white pb-12">
      <div className="container max-w-[1000px] mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Popular Destinations</h2>
          <Link href="/flights" className="text-primary font-bold flex items-center gap-1 hover:underline text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-32 w-full">
                <Image
                  src={dest.image}
                  alt={dest.city}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-slate-800 mb-1">{dest.city}</h3>
                <span className="text-sm font-bold text-red-500">{dest.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
