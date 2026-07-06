"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Plane, Search, RefreshCcw } from "lucide-react";
import { cn, formatSeoParam } from "@/lib/utils";
import { useBooking } from "@/context/BookingContext";

// Default to a week out so we never show a date in the past
const defaultDate = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
})();
const defaultDateISO = defaultDate.toISOString().split("T")[0];
const defaultDateLabel = defaultDate.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const L = (code: string) => `https://images.kiwi.com/airlines/64x64/${code}.png`;

// Local fallback list (used only if the search API is unreachable)
const MOCK_FLIGHTS = [
  { id: 1,  airline: "IndiGo",    logo: L("6E"), dep: "06:20", arr: "08:50", dur: "2h 30m", stops: "Non Stop", price: 12499 },
  { id: 2,  airline: "SpiceJet",  logo: L("SG"), dep: "05:30", arr: "08:00", dur: "2h 30m", stops: "Non Stop", price: 9890  },
  { id: 3,  airline: "Air India", logo: L("AI"), dep: "07:45", arr: "13:25", dur: "5h 40m", stops: "1 Stop",   price: 13290 },
  { id: 4,  airline: "IndiGo",    logo: L("6E"), dep: "13:10", arr: "15:35", dur: "2h 25m", stops: "Non Stop", price: 10999 },
  { id: 5,  airline: "Vistara",   logo: L("UK"), dep: "09:15", arr: "11:50", dur: "2h 35m", stops: "Non Stop", price: 14210 },
  { id: 6,  airline: "Akasa Air", logo: L("QP"), dep: "11:30", arr: "14:15", dur: "2h 45m", stops: "Non Stop", price: 11990 },
  { id: 7,  airline: "Air India", logo: L("AI"), dep: "18:05", arr: "22:50", dur: "4h 45m", stops: "1 Stop",   price: 13750 },
  { id: 8,  airline: "Vistara",   logo: L("UK"), dep: "16:40", arr: "19:20", dur: "2h 40m", stops: "Non Stop", price: 15600 },
  { id: 9,  airline: "Akasa Air", logo: L("QP"), dep: "22:15", arr: "00:45", dur: "2h 30m", stops: "Non Stop", price: 11250 },
  { id: 10, airline: "SpiceJet",  logo: L("SG"), dep: "20:45", arr: "02:55", dur: "6h 10m", stops: "1 Stop",   price: 12890 },
];

// "2h 30m" -> 150 (minutes), for sorting
const durationToMinutes = (durStr: any) => {
  if (!durStr) return 0;
  const s = String(durStr);
  const h = s.match(/(\d+)\s*h/);
  const m = s.match(/(\d+)\s*m/);
  return (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
};

export default function FlightClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSelectedFlight, resetBooking } = useBooking();

  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState<string | null>(null);

  // Filters state
  const [filterAirline, setFilterAirline] = useState<string[]>([]);
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(25000);
  const [filterStops, setFilterStops] = useState<string[]>([]);
  const [filterMaxDeparture, setFilterMaxDeparture] = useState<number>(24);
  const [filterMaxDuration, setFilterMaxDuration] = useState<number>(30);
  const [sortBy, setSortBy] = useState<string>("price-asc");
  
  const fromParam = formatSeoParam(searchParams.get("from")) || "DEL";
  const toParam = formatSeoParam(searchParams.get("to")) || "BOM";
  const dateParam = searchParams.get("date") || defaultDateLabel;
  const travelersParam = searchParams.get("travelers") || "1 Traveler";
  const cabinParam = searchParams.get("cabin") || "Economy";

  // Mock initial data if API fails
  useEffect(() => {
    resetBooking();
    
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const date = searchParams.get("date") || defaultDateISO;
        const res = await fetch(`/api/search?from=${fromParam}&to=${toParam}&date=${date}&travelers=${encodeURIComponent(travelersParam)}`);
        const searchData = await res.json();
        if (searchData.success && searchData.flights.length > 0) {
          setFlights(searchData.flights);
        } else {
          setFlights(MOCK_FLIGHTS);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setFlights(MOCK_FLIGHTS);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [fromParam, toParam, searchParams, travelersParam, resetBooking]);

  const handleBookFlight = (flight: any) => {
    setIsBooking(flight._id || flight.id);
    setTimeout(() => {
      setIsBooking(null);
      setSelectedFlight(flight);
      router.push(`/flights/${flight._id || flight.id || "123"}`);
    }, 1000);
  };

  const toggleStop = (stopType: string) => {
    setFilterStops(prev => 
      prev.includes(stopType) ? prev.filter(s => s !== stopType) : [...prev, stopType]
    );
  };

  const toggleAirline = (airline: string) => {
    setFilterAirline(prev => 
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  const getStopCategory = (stopsRaw: any) => {
    if (!stopsRaw) return "Non Stop";
    const str = String(stopsRaw).toLowerCase();
    if (str.includes("non")) return "Non Stop";
    if (str.includes("1")) return "1 Stop";
    if (str.includes("2") || str.includes("3") || str.includes("4") || str.includes("5")) return "2+ Stops";
    return "Non Stop";
  };

  const parseDurationHours = (durStr: any) => {
    if (!durStr) return 0;
    const match = String(durStr).match(/(\d+)h/);
    return match ? parseInt(match[1]) : 0;
  };

  const parseDepartureHour = (depStr: any) => {
    if (!depStr) return 0;
    const parts = String(depStr).split(":");
    return parts.length > 0 ? parseInt(parts[0]) : 0;
  };

  const getStopCount = (label: string) => flights.filter(f => getStopCategory(f.stops) === label).length;
  const getAirlineCount = (airline: string) => flights.filter(f => f.airline === airline).length;

  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      // Price
      if (flight.price > filterMaxPrice) return false;
      
      // Airline
      if (filterAirline.length > 0 && !filterAirline.includes(flight.airline)) return false;
      
      // Stops
      if (filterStops.length > 0) {
        const cat = getStopCategory(flight.stops);
        if (!filterStops.includes(cat)) return false;
      }

      // Departure Time (Max Hour)
      const depHour = parseDepartureHour(flight.departureTime || flight.dep);
      if (depHour > filterMaxDeparture) return false;

      // Duration (Max Hours)
      const durHours = parseDurationHours(flight.dur);
      if (durHours > filterMaxDuration) return false;
      
      return true;
    });
  }, [flights, filterMaxPrice, filterAirline, filterStops, filterMaxDeparture, filterMaxDuration]);

  const sortedFlights = useMemo(() => {
    const list = [...filteredFlights];
    switch (sortBy) {
      case "price-desc":
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "duration-asc":
        return list.sort((a, b) => durationToMinutes(a.dur) - durationToMinutes(b.dur));
      case "price-asc":
      default:
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
  }, [filteredFlights, sortBy]);

  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "name": `Flight Search Results from ${fromParam} to ${toParam}`,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": filteredFlights.map((f, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Flight",
            "name": `Flight ${f.airline} from ${fromParam} to ${toParam}`,
            "provider": {
              "@type": "Airline",
              "name": f.airline,
              "image": f.logo
            },
            "departureTime": f.departureTime || f.dep,
            "arrivalTime": f.arrivalTime || f.arr,
            "offers": {
              "@type": "Offer",
              "price": f.price,
              "priceCurrency": "INR"
            }
          }
        }))
      }
    };
  }, [filteredFlights, fromParam, toParam]);

  return (
    <div className="pt-24 pb-16 bg-[#f8f9fa] min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="container max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Top Summary Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 whitespace-nowrap">
              <Search className="w-4 h-4" />
              <span className="font-bold text-slate-800 uppercase">{fromParam} → {toParam}</span>
            </div>
            <div className="text-slate-300">|</div>
            <div className="whitespace-nowrap">{dateParam}</div>
            <div className="text-slate-300">|</div>
            <div className="whitespace-nowrap">{travelersParam}</div>
            <div className="text-slate-300">|</div>
            <div className="whitespace-nowrap">{cabinParam}</div>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="text-primary font-bold text-sm hover:underline mt-4 md:mt-0 whitespace-nowrap"
          >
            Modify Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-8">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-8">
                <span className="font-bold text-sm text-slate-800 block mb-4">Price Range</span>
                <div className="flex justify-between items-center mb-2 text-xs font-medium text-slate-500">
                  <span>₹2,000</span>
                  <span>-</span>
                  <span>₹{filterMaxPrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="25000" 
                  step="500"
                  value={filterMaxPrice}
                  onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>

              {/* Stops Filter */}
              <div className="mb-8">
                <span className="font-bold text-sm text-slate-800 block mb-4">Stops</span>
                <div className="space-y-3">
                  {[
                    { label: "Non Stop", count: getStopCount("Non Stop") },
                    { label: "1 Stop", count: getStopCount("1 Stop") },
                    { label: "2+ Stops", count: getStopCount("2+ Stops") }
                  ].map((stop) => (
                    <label key={stop.label} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={filterStops.includes(stop.label)}
                          onChange={() => toggleStop(stop.label)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary" 
                        />
                        <span className="text-sm font-medium text-slate-600">{stop.label}</span>
                      </div>
                      <span className="text-xs text-slate-400">({stop.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="mb-8">
                <span className="font-bold text-sm text-slate-800 block mb-4">Airlines</span>
                <div className="space-y-3">
                  {[
                    { label: "IndiGo", count: getAirlineCount("IndiGo") },
                    { label: "Air India", count: getAirlineCount("Air India") },
                    { label: "Vistara", count: getAirlineCount("Vistara") },
                    { label: "SpiceJet", count: getAirlineCount("SpiceJet") },
                    { label: "Akasa Air", count: getAirlineCount("Akasa Air") }
                  ].map((airline) => (
                    <label key={airline.label} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={filterAirline.includes(airline.label)}
                          onChange={() => toggleAirline(airline.label)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary" 
                        />
                        <span className="text-sm font-medium text-slate-600">{airline.label}</span>
                      </div>
                      <span className="text-xs text-slate-400">({airline.count})</span>
                    </label>
                  ))}
                </div>
                <button className="text-primary text-xs font-bold mt-4 hover:underline">
                  Show More
                </button>
              </div>

              {/* Departure Time */}
              <div className="mb-8">
                <span className="font-bold text-sm text-slate-800 block mb-4">Departure Time</span>
                <div className="mb-2 text-xs font-medium text-slate-500">
                  <span>Up to {filterMaxDeparture < 10 ? `0${filterMaxDeparture}` : filterMaxDeparture}:00</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="24" 
                  value={filterMaxDeparture}
                  onChange={(e) => setFilterMaxDeparture(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>

              {/* Duration */}
              <div>
                <span className="font-bold text-sm text-slate-800 block mb-4">Duration</span>
                <div className="mb-2 text-xs font-medium text-slate-500">
                  <span>Up to {filterMaxDuration}h</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={filterMaxDuration}
                  onChange={(e) => setFilterMaxDuration(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-sm text-slate-800">{filteredFlights.length} Flights Found</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-bold text-slate-700 outline-none cursor-pointer focus:border-primary"
                >
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                  <option value="duration-asc">Duration Short to Long</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 bg-white rounded-xl">
                <RefreshCcw className="w-10 h-10 animate-spin mb-4 text-primary" />
                <p className="font-bold">Searching the skies...</p>
              </div>
            ) : sortedFlights.length > 0 ? (
              <div className="space-y-4">
                {sortedFlights.map((flight, idx) => {
                  const stopLabel = flight.stops === 0 ? "Non Stop" : (flight.stops || "Non Stop");
                  const isNonStop = String(stopLabel).toLowerCase().includes("non");
                  return (
                  <div key={flight._id || flight.id || idx} className="group bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5">

                    {/* Airline */}
                    <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-2">
                        {flight.logo && String(flight.logo).startsWith("http") ? (
                          <img src={flight.logo} alt={flight.airline} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center font-bold text-primary text-sm">
                            {flight.airline?.charAt(0) || "K"}
                          </div>
                        )}
                      </div>
                      <div className="md:hidden">
                        <div className="font-bold text-sm text-slate-800">{flight.airline}</div>
                        <div className="text-xs text-slate-500">{flight.class || cabinParam}</div>
                      </div>
                    </div>

                    {/* Flight Times & Duration */}
                    <div className="flex items-center justify-between w-full md:w-[55%] px-2 md:px-8">
                      <div className="text-center">
                        <div className="font-bold text-xl text-slate-800">{flight.departureTime || flight.dep || "06:20"}</div>
                        <div className="text-xs font-medium text-slate-500">{fromParam}</div>
                      </div>

                      <div className="flex-1 px-3 md:px-4 flex flex-col items-center justify-center">
                        <div className="text-[11px] font-medium text-slate-400 mb-1">{flight.dur || "2h 30m"}</div>
                        <div className="relative w-full flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <div className="flex-1 h-px bg-slate-200" />
                          <Plane className="w-3.5 h-3.5 text-primary rotate-90 mx-1 transition-transform duration-300 group-hover:translate-x-1" />
                          <div className="flex-1 h-px bg-slate-200" />
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        </div>
                        <div className={cn(
                          "text-[10px] font-bold uppercase tracking-wide mt-1.5 px-2 py-0.5 rounded-full",
                          isNonStop ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"
                        )}>
                          {stopLabel}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-bold text-xl text-slate-800">{flight.arrivalTime || flight.arr || "08:50"}</div>
                        <div className="text-xs font-medium text-slate-500">{toParam}</div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto md:min-w-[150px] border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                        <div className="font-bold text-2xl text-slate-800">
                          ₹{(flight.price || 12499).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">per traveler</div>
                      </div>
                      <button
                        onClick={() => handleBookFlight(flight)}
                        disabled={isBooking === (flight._id || flight.id)}
                        className="bg-primary hover:bg-primary-dark text-white md:w-full px-6 py-2.5 mt-0 md:mt-3 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 disabled:opacity-60"
                      >
                        {isBooking === (flight._id || flight.id) ? (
                          <RefreshCcw className="w-4 h-4 animate-spin" />
                        ) : "View Details"}
                      </button>
                    </div>
                  </div>
                  );
                })}
                <div className="text-center pt-8 pb-4">
                  <p className="text-xs text-slate-400 font-medium">Fares are per person inclusive of taxes</p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
                <Plane className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">No flights found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
