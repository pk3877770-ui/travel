"use client";

import React, { useState, useRef, useEffect } from "react";
import { Users, Plus, Minus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TravelersPopoverProps {
  adults: number;
  setAdults: (val: number) => void;
  childrenCount: number;
  setChildrenCount: (val: number) => void;
  infants: number;
  setInfants: (val: number) => void;
  cabinClass?: string;
  className?: string;
}

export default function TravelersPopover({
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  infants,
  setInfants,
  cabinClass,
  className
}: TravelersPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalTravelers = adults + childrenCount + infants;

  return (
    <div className={cn("relative group", className)} ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 focus:outline-none transition-all font-bold text-sm lg:text-xl text-slate-800 outline-none bg-transparent"
      >
        <span className="truncate">
          {totalTravelers} {totalTravelers === 1 ? "Traveler" : "Travelers"}
        </span>
        <ChevronDown className={cn("w-4 h-4 transition-transform flex-shrink-0 text-slate-400", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-[calc(100%+8px)] left-0 w-full min-w-[260px] p-5 rounded-xl border border-slate-200 bg-white shadow-xl space-y-5"
          >
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-800">Adults</div>
                <div className="text-xs text-slate-500">12+ years</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={adults <= 1}
                  onClick={() => setAdults(adults - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-accent transition-colors disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold w-5 text-center text-base text-slate-800">{adults}</span>
                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-accent transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-800">Children</div>
                <div className="text-xs text-slate-500">2–11 years</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={childrenCount <= 0}
                  onClick={() => setChildrenCount(childrenCount - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-accent transition-colors disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold w-5 text-center text-base text-slate-800">{childrenCount}</span>
                <button
                  type="button"
                  onClick={() => setChildrenCount(childrenCount + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-accent transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-800">Infants</div>
                <div className="text-xs text-slate-500">Under 2 years</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={infants <= 0}
                  onClick={() => setInfants(infants - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-accent transition-colors disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold w-5 text-center text-base text-slate-800">{infants}</span>
                <button
                  type="button"
                  onClick={() => setInfants(infants + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-accent transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hidden inputs for form submission */}
            <input type="hidden" name="travelers" value={`${adults} Adults, ${childrenCount} Children, ${infants} Infants`} />
            {cabinClass && <input type="hidden" name="cabin" value={cabinClass} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
