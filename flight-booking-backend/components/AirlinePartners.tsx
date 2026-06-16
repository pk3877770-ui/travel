"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  { name: "AIR INDIA", color: "#E31837" },
  { name: "IndiGo", color: "#001B94" },
  { name: "SpiceJet", color: "#F9A01B" },
  { name: "Vistara", color: "#5C2D91" },
  { name: "Emirates", color: "#D71920" },
  { name: "QATAR", color: "#8A1538" },
  { name: "Akasa Air", color: "#FF6F00" },
  { name: "Lufthansa", color: "#05164D" },
  { name: "Singapore Airlines", color: "#F99F1C" },
  { name: "British Airways", color: "#075AAA" },
  { name: "Etihad", color: "#BD8B13" },
  { name: "Thai Airways", color: "#4B286D" },
];

const AirlinePartners = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 240);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 pb-20">
      <h3 className="text-center font-bold text-slate-800 text-xl mb-10">Our Airline Partners</h3>

      <div className="flex items-center gap-4">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous partners"
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-12 overflow-x-auto hscroll-hide scroll-smooth px-2 snap-x"
        >
          {partners.map((p) => (
            <div
              key={p.name}
              style={{ color: p.color }}
              className="font-black text-xl whitespace-nowrap shrink-0 snap-start opacity-70 hover:opacity-100 transition-opacity cursor-default"
            >
              {p.name}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Next partners"
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AirlinePartners;
