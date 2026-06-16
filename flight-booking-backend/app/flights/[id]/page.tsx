"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Plane, ChevronRight, Briefcase, Coffee, RefreshCcw } from "lucide-react";
import { cn, formatSeoParam } from "@/lib/utils";

const dateFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};
const departureDefault = dateFromNow(7);
const departureDefaultLabel = departureDefault.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const returnDefaultLabel = dateFromNow(14).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  weekday: "short",
});

export default function FlightDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedFlight } = useBooking();

  const [selectedReturnDate, setSelectedReturnDate] = useState(returnDefaultLabel);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<number | null>(1);

  const fromParam = formatSeoParam(searchParams.get("from")) || "DEL";
  const toParam = formatSeoParam(searchParams.get("to")) || "BOM";
  const dateParam = searchParams.get("date") || departureDefaultLabel;
  const travelersParam = searchParams.get("travelers") || "1 Traveler";
  const cabinParam = searchParams.get("cabin") || "Economy";

  useEffect(() => {
    if (!selectedFlight) {
      // Allow previewing the page without selected flight for mockup purposes
      // router.push("/flights");
    }
  }, [selectedFlight, router]);

  const dates = [
    { label: "24 May", day: "Sat" },
    { label: "25 May", day: "Sun" },
    { label: "26 May", day: "Mon" },
    { label: "27 May", day: "Tue" },
    { label: "28 May", day: "Wed" },
    { label: "29 May", day: "Thu" },
    { label: "30 May", day: "Fri" },
  ];

  const returnFlights = [
    { id: 1, airline: "IndiGo", logo: "https://images.kiwi.com/airlines/64x64/6E.png", flightNum: "6E-5341", dep: "19:20", arr: "21:55", dur: "2h 30m", stops: "Non Stop", price: 12390 },
    { id: 2, airline: "Air India", logo: "https://images.kiwi.com/airlines/64x64/AI.png", flightNum: "AI-232", dep: "20:45", arr: "22:25", dur: "2h 40m", stops: "Non Stop", price: 14100 },
    { id: 3, airline: "Vistara", logo: "https://images.kiwi.com/airlines/64x64/UK.png", flightNum: "UK-902", dep: "22:10", arr: "00:40", dur: "2h 30m", stops: "Non Stop", price: 15990, arrDay: "+1" },
  ];

  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `Flight from ${fromParam} to ${toParam}`,
      "description": `Flight tickets from ${fromParam} to ${toParam} departing on ${dateParam}`,
      "category": "Flight Tickets",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": 12390,
        "highPrice": 15990,
        "offerCount": returnFlights.length
      }
    };
  }, [fromParam, toParam, dateParam, returnFlights.length]);

  return (
    <div className="pt-24 pb-16 bg-[#f8f9fa] min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        
        {/* Top Summary Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
            <span className="font-bold text-slate-800 uppercase">{fromParam} → {toParam}</span>
            <div className="text-slate-300">|</div>
            <span>{dateParam}</span>
            <div className="text-slate-300">|</div>
            <span>{travelersParam}</span>
            <div className="text-slate-300">|</div>
            <span>{cabinParam}</span>
          </div>
        </div>

        {/* Selected Flight Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="p-8">
            
            {/* Airline Header */}
            <div className="flex items-center gap-3 mb-8">
              <img src="https://images.kiwi.com/airlines/64x64/6E.png" alt="IndiGo" className="h-6 object-contain" />
              <span className="text-sm font-medium text-slate-500">6E-5324</span>
            </div>

            {/* Flight Times */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-center w-32">
                <div className="font-bold text-2xl text-slate-800">06:20</div>
                <div className="text-sm font-medium text-slate-500">{fromParam}</div>
                <div className="text-xs text-slate-400 mt-1">Tue, 20 May</div>
              </div>
              
              <div className="flex-1 px-2 sm:px-8 flex flex-col items-center justify-center relative">
                <div className="text-xs font-medium text-slate-400 mb-2">2h 30m</div>
                <div className="w-full relative flex items-center justify-center">
                  <div className="h-px bg-slate-200 w-full" />
                  <ChevronRight className="w-4 h-4 text-slate-300 absolute right-0 -translate-y-1/2 top-1/2 translate-x-2" />
                </div>
                <div className="text-xs font-medium text-slate-400 mt-2">Non Stop</div>
              </div>

              <div className="text-center w-24 sm:w-32">
                <div className="font-bold text-2xl text-slate-800">08:50</div>
                <div className="text-sm font-medium text-slate-500">{toParam}</div>
                <div className="text-xs text-slate-400 mt-1">Tue, 20 May</div>
              </div>
            </div>

          </div>
          
          {/* Details Footer */}
          <div className="border-t border-slate-100 p-6 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-12 w-full md:w-auto">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                  <Briefcase className="w-3 h-3" /> Baggage
                </div>
                <div className="text-sm font-medium text-slate-700">15 kg check-in</div>
                <div className="text-sm font-medium text-slate-700">7 kg cabin</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                  <Coffee className="w-3 h-3" /> Meal
                </div>
                <div className="text-sm font-medium text-slate-700">Complimentary</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                  <RefreshCcw className="w-3 h-3" /> Refundable
                </div>
                <div className="text-sm font-medium text-slate-700">Partially Refundable</div>
              </div>
            </div>
            
            <button className="text-primary font-bold text-sm hover:underline w-full md:w-auto text-left md:text-right">
              Flight Details
            </button>
          </div>
        </div>

        {/* Select Return Flight Section */}
        <div>
          <h2 className="font-bold text-lg text-slate-800 mb-6">Select Return Flight</h2>
          
          {/* Date Carousel */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-500 shrink-0">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            
            {dates.map((date, idx) => {
              const isSelected = `${date.label} ${date.day}` === selectedReturnDate;
              return (
                <button 
                  key={idx}
                  onClick={() => setSelectedReturnDate(`${date.label} ${date.day}`)}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-6 rounded-lg border transition-colors shrink-0",
                    isSelected 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-primary/50"
                  )}
                >
                  <span className={cn("text-sm font-bold", isSelected ? "text-white" : "text-slate-800")}>{date.label}</span>
                  <span className={cn("text-xs font-medium mt-1", isSelected ? "text-blue-100" : "text-slate-400")}>{date.day}</span>
                </button>
              );
            })}

            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-500 shrink-0">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Return Flight List */}
          <div className="space-y-4">
            {returnFlights.map((flight) => {
              const isSelected = selectedReturnFlight === flight.id;
              return (
                <div key={flight.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between">
                  
                  <div className="flex items-center gap-3 w-full md:w-1/4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded border border-slate-100 flex items-center justify-center p-2">
                      <img src={flight.logo} alt={flight.airline} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-xs font-medium text-slate-400">{flight.flightNum}</span>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-[50%] px-4 md:px-12 mb-6 md:mb-0">
                    <div className="text-center">
                      <div className="font-bold text-lg text-slate-800">{flight.dep}</div>
                      <div className="text-xs font-medium text-slate-500">{toParam}</div>
                    </div>
                    
                    <div className="flex-1 px-4 flex flex-col items-center justify-center relative">
                      <div className="text-[10px] font-medium text-slate-400 mb-1">{flight.dur}</div>
                      <div className="w-full relative flex items-center justify-center">
                        <div className="h-px bg-slate-200 w-full" />
                      </div>
                      <div className="text-[10px] font-medium text-slate-400 mt-1">{flight.stops}</div>
                    </div>

                    <div className="text-center relative">
                      <div className="font-bold text-lg text-slate-800">
                        {flight.arr}
                        {flight.arrDay && <span className="text-xs text-primary ml-1 absolute -right-4 top-1">{flight.arrDay}</span>}
                      </div>
                      <div className="text-xs font-medium text-slate-500">{fromParam}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                    <div className="font-bold text-lg text-slate-800">
                      ₹{flight.price.toLocaleString()}
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedReturnFlight(flight.id);
                        setTimeout(() => {
                          router.push("/booking/passenger");
                        }, 500);
                      }}
                      className={cn(
                        "px-8 py-2 rounded font-bold text-sm transition-colors",
                        isSelected 
                          ? "bg-primary text-white" 
                          : "bg-white border border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
                      )}
                    >
                      Select
                    </button>
                  </div>
                  
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
