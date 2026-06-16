"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Plane, X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TravelersPopover from "@/components/TravelersPopover";

// Future-dated defaults so the form never opens on a past date
const isoDateFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};
const dayName = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { weekday: "long" }) : "";

const SearchSection = ({ vertical = false }: { vertical?: boolean }) => {
  const [tripType, setTripType] = useState("round-trip");

  // Single trip state
  const [fromValue, setFromValue] = useState("DEL");
  const [fromCity, setFromCity] = useState("New Delhi, India");
  const [toValue, setToValue] = useState("BOM");
  const [toCity, setToCity] = useState("Mumbai, India");
  const [departureDate, setDepartureDate] = useState(isoDateFromNow(7));
  const [returnDate, setReturnDate] = useState(isoDateFromNow(14));

  // Multi city state
  const [multiFlights, setMultiFlights] = useState([
    { id: 1, fromValue: "DEL", fromCity: "New Delhi, India", toValue: "BOM", toCity: "Mumbai, India", date: isoDateFromNow(7) },
    { id: 2, fromValue: "BOM", fromCity: "Mumbai, India", toValue: "", toCity: "", date: "" }
  ]);
  
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState("Economy");
  
  const router = useRouter();

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSwapMulti = (id: number) => {
    setMultiFlights(flights => flights.map(f => {
      if (f.id === id) {
        return { ...f, fromValue: f.toValue, toValue: f.fromValue, fromCity: f.toCity, toCity: f.fromCity };
      }
      return f;
    }));
  };

  const updateMultiFlight = (id: number, field: string, value: string) => {
    setMultiFlights(flights => flights.map(f => {
      if (f.id === id) {
        return { ...f, [field]: value };
      }
      return f;
    }));
  };

  const addFlight = () => {
    if (multiFlights.length < 5) {
      const lastFlight = multiFlights[multiFlights.length - 1];
      setMultiFlights([...multiFlights, {
        id: Date.now(),
        fromValue: lastFlight.toValue,
        fromCity: lastFlight.toCity,
        toValue: "",
        toCity: "",
        date: ""
      }]);
    }
  };

  const removeFlight = (id: number) => {
    setMultiFlights(flights => flights.filter(f => f.id !== id));
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (tripType === "multi-city") {
      params.append("type", "multi-city");
      params.append("flights", JSON.stringify(multiFlights));
    } else {
      params.append("from", fromValue);
      params.append("to", toValue);
      params.append("date", departureDate);
      if (tripType === "round-trip") params.append("return", returnDate);
    }
    
    params.append("travelers", `${adults} Adults, ${children} Children, ${infants} Infants`);
    params.append("cabin", cabinClass);
    
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <section id="search-section" className={cn(vertical ? "relative z-30 w-full" : "relative z-30 -mt-24 px-4 md:px-8")}>
      <div className={cn(vertical ? "w-full" : "max-w-[1100px] mx-auto")}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Trip Type Tabs (Floating on top-left) */}
          <div className="flex flex-wrap gap-y-3 bg-white w-full sm:w-fit rounded-t-2xl px-4 sm:px-6 py-4 shadow-sm border-b border-slate-100">
            {[
              { id: "round-trip", label: "Round Trip", icon: Plane },
              { id: "one-way", label: "One Way" },
              { id: "multi-city", label: "Multi City" },
            ].map((type) => {
              const isActive = tripType === type.id;
              return (
                <label
                  key={type.id}
                  className="flex items-center gap-2 cursor-pointer group mr-6 sm:mr-8 last:mr-0"
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                    isActive ? "border-primary text-primary" : "border-slate-300 text-transparent"
                  )}>
                    {isActive ? (
                      type.icon ? <type.icon className="w-3 h-3 fill-primary" /> : <div className="w-2 h-2 bg-primary rounded-full" />
                    ) : null}
                  </div>
                  <span className={cn(
                    "text-sm font-bold",
                    isActive ? "text-primary" : "text-slate-400"
                  )}>{type.label}</span>
                  <input
                    type="radio"
                    name="tripType"
                    value={type.id}
                    checked={isActive}
                    onChange={() => setTripType(type.id)}
                    className="hidden"
                  />
                </label>
              );
            })}
          </div>

          {/* Main Search Card */}
          <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-xl p-8 relative">
            <form onSubmit={handleSearch}>
              
              {tripType === "multi-city" ? (
                // Multi City UI
                <div className="flex flex-col w-full">
                  {multiFlights.map((flight, index) => (
                    <div key={flight.id} className={cn(
                      "flex items-stretch w-full mb-4 pb-4 border-b border-slate-100 last:border-b-0 last:mb-0 last:pb-0",
                      vertical ? "flex-col gap-4" : "flex-col lg:flex-row lg:items-center"
                    )}>

                      {/* From & To Row */}
                      <div className={cn(
                        "flex flex-col sm:flex-row w-full relative",
                        vertical ? "" : "lg:w-[60%] border-b lg:border-b-0 lg:border-r border-slate-200"
                      )}>
                        <div className="flex-1 pb-4 sm:pb-6 lg:pb-0 lg:pr-8 border-b sm:border-b-0 border-slate-100">
                          <label className="text-xs text-slate-500 font-medium block mb-1">From</label>
                          <input
                            type="text"
                            value={flight.fromValue}
                            onChange={(e) => updateMultiFlight(flight.id, "fromValue", e.target.value)}
                            className="w-full font-bold text-2xl text-slate-800 outline-none uppercase mb-1"
                          />
                          <div className="text-sm text-slate-500 truncate">{flight.fromCity || "Select City"}</div>
                        </div>

                        <button 
                          type="button"
                          aria-label="Swap departure and destination"
                          onClick={() => handleSwapMulti(flight.id)}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-sm z-10 hover:bg-slate-50"
                        >
                          <ArrowLeftRight className="w-4 h-4 rotate-90 sm:rotate-0 transition-transform" />
                        </button>

                        <div className="flex-1 pt-4 sm:pt-6 lg:pt-0 lg:pl-12">
                          <label className="text-xs text-slate-500 font-medium block mb-1">To</label>
                          <input
                            type="text"
                            value={flight.toValue}
                            onChange={(e) => updateMultiFlight(flight.id, "toValue", e.target.value)}
                            className="w-full font-bold text-2xl text-slate-800 outline-none uppercase mb-1"
                          />
                          <div className="text-sm text-slate-500 truncate">{flight.toCity || "Select City"}</div>
                        </div>
                      </div>

                      {/* Date Row */}
                      <div className="flex-1 min-w-0 pt-6 pb-6 lg:pt-0 lg:pb-0 lg:px-5 flex items-center justify-between">
                        <div className="flex-1">
                          <label className="text-xs text-slate-500 font-medium block mb-1">Departure</label>
                          <input
                            type="date"
                            value={flight.date}
                            onChange={(e) => updateMultiFlight(flight.id, "date", e.target.value)}
                            className="w-full font-bold text-lg text-slate-800 outline-none bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full cursor-pointer relative"
                          />
                        </div>
                        
                        {index >= 2 && (
                          <button 
                            type="button" 
                            onClick={() => removeFlight(flight.id)} 
                            className="ml-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex-shrink-0"
                            aria-label="Remove flight"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Multi City Bottom Controls */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-slate-100 gap-6 sm:gap-0">
                    <button 
                      type="button" 
                      onClick={addFlight}
                      disabled={multiFlights.length >= 5}
                      className="text-[#0A58CA] font-bold text-sm hover:text-blue-700 flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Plus className="w-4 h-4" /> Add another flight
                    </button>

                    <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
                      <div>
                        <label className="text-xs text-slate-500 font-medium block mb-1">Travelers</label>
                        <TravelersPopover
                          adults={adults} setAdults={setAdults}
                          childrenCount={children} setChildrenCount={setChildren}
                          infants={infants} setInfants={setInfants}
                          className="!p-0 !border-0 !bg-transparent text-lg font-bold text-slate-800 !w-auto"
                        />
                      </div>
                      <div className="w-px h-8 bg-slate-200" />
                      <div>
                        <label className="text-xs text-slate-500 font-medium block mb-1">Class</label>
                        <select
                          aria-label="Cabin Class"
                          value={cabinClass}
                          onChange={(e) => setCabinClass(e.target.value)}
                          className="outline-none bg-transparent text-sm font-bold text-slate-800 cursor-pointer"
                        >
                          <option value="Economy">Economy</option>
                          <option value="Business">Business</option>
                          <option value="First">First</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                // Single/Round Trip UI
                <div className={cn(vertical ? "flex flex-col gap-6" : "flex flex-col lg:flex-row items-stretch lg:items-center")}>

                  {/* From & To Row */}
                  <div className={cn(
                    "flex flex-col sm:flex-row w-full relative",
                    vertical ? "" : "lg:w-[42%] border-b lg:border-b-0 lg:border-r border-slate-200"
                  )}>
                    <div className="flex-1 pb-4 sm:pb-6 lg:pb-0 lg:pr-8 border-b sm:border-b-0 border-slate-100">
                      <label htmlFor="from-input" className="text-xs text-slate-500 font-medium block mb-1">From</label>
                      <input
                        id="from-input"
                        type="text"
                        value={fromValue}
                        onChange={(e) => setFromValue(e.target.value)}
                        className="w-full font-bold text-2xl text-slate-800 outline-none uppercase mb-1"
                      />
                      <div className="text-sm text-slate-500 truncate">{fromCity}</div>
                    </div>

                    <button 
                      type="button"
                      aria-label="Swap departure and destination"
                      onClick={handleSwap}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-sm z-10 hover:bg-slate-50"
                    >
                      <ArrowLeftRight className="w-4 h-4 rotate-90 sm:rotate-0 transition-transform" />
                    </button>

                    <div className="flex-1 pt-4 sm:pt-6 lg:pt-0 lg:pl-12">
                      <label htmlFor="to-input" className="text-xs text-slate-500 font-medium block mb-1">To</label>
                      <input
                        id="to-input"
                        type="text"
                        value={toValue}
                        onChange={(e) => setToValue(e.target.value)}
                        className="w-full font-bold text-2xl text-slate-800 outline-none uppercase mb-1"
                      />
                      <div className="text-sm text-slate-500 truncate">{toCity}</div>
                    </div>
                  </div>

                  {/* Dates Row */}
                  <div className={cn(
                    "flex flex-col sm:flex-row w-full",
                    vertical ? "gap-4 pt-0 pb-0" : "lg:w-[38%] border-b lg:border-b-0 lg:border-r border-slate-200 pt-6 pb-6 lg:pt-0 lg:pb-0 lg:px-5"
                  )}>
                    <div className="flex-1 min-w-0">
                      <label htmlFor="departure-date" className="text-xs text-slate-500 font-medium block mb-1">Departure</label>
                      <input
                        id="departure-date"
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full font-bold text-lg text-slate-800 outline-none bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full cursor-pointer relative"
                      />
                      <div className="text-xs text-slate-400 mt-1">{dayName(departureDate)}</div>
                    </div>
                    {tripType === "round-trip" && (
                      <div className="flex-1 min-w-0 pl-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-slate-100 mt-4 pt-4 sm:mt-0 sm:pt-0 sm:ml-4">
                        <label htmlFor="return-date" className="text-xs text-slate-500 font-medium block mb-1">Return</label>
                        <input
                          id="return-date"
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full font-bold text-lg text-slate-800 outline-none bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full cursor-pointer relative"
                        />
                        <div className="text-xs text-slate-400 mt-1">{dayName(returnDate)}</div>
                      </div>
                    )}
                  </div>

                  {/* Travelers & Class */}
                  <div className={cn(
                    "w-full flex flex-col justify-between",
                    vertical ? "" : "flex-1 pt-6 lg:pt-0 lg:pl-8 h-full"
                  )}>
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1">Travelers & Class</label>
                      <div className="flex flex-col items-start">
                        <TravelersPopover
                          adults={adults} setAdults={setAdults}
                          childrenCount={children} setChildrenCount={setChildren}
                          infants={infants} setInfants={setInfants}
                          className="!p-0 !border-0 !bg-transparent !w-auto"
                        />
                        <select
                          aria-label="Cabin Class"
                          value={cabinClass}
                          onChange={(e) => setCabinClass(e.target.value)}
                          className="outline-none bg-transparent cursor-pointer text-sm font-medium text-slate-500 mt-1"
                        >
                          <option value="Economy">Economy</option>
                          <option value="Business">Business</option>
                          <option value="First">First</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Search Button */}
              <div className={cn("mt-8 flex", vertical ? "justify-center" : "justify-center lg:justify-end")}>
                <button
                  type="submit"
                  className={cn(
                    "bg-[#0A58CA] hover:bg-blue-700 text-white px-10 py-3.5 rounded-lg font-bold transition-all duration-200 shadow-md shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95",
                    vertical ? "w-full" : "w-full sm:w-auto"
                  )}
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
