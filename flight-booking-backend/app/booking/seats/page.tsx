"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { cn } from "@/lib/utils";

export default function SeatsSelectionPage() {
  const router = useRouter();
  const { selectedFlight, selectedSeat, setSelectedSeat, passenger } = useBooking();

  const [seatMap] = useState(() => {
    const map = [];
    for (let r = 1; r <= 12; r++) {
      const row = [];
      for (const col of ['A', 'B', 'C', 'D', 'E', 'F']) {
        // Mock specific layout from image
        let occupied = false;
        let available = true;
        
        // Mock some occupied seats (gray)
        if (
          (r === 1 && (col === 'A' || col === 'D' || col === 'E' || col === 'F')) ||
          (r === 3 && (col === 'D' || col === 'E' || col === 'F')) ||
          (r === 6 && (col === 'A' || col === 'B' || col === 'D' || col === 'E' || col === 'F')) ||
          (r === 7) ||
          (r === 8) ||
          (r === 9) ||
          (r === 12 && (col === 'E' || col === 'F'))
        ) {
          occupied = true;
        }

        row.push({
          id: `${r}${col}`,
          occupied,
          type: col === 'A' || col === 'F' ? 'Window' : col === 'C' || col === 'D' ? 'Aisle' : 'Middle'
        });
      }
      map.push({ rowNumber: r, seats: row });
    }
    return map;
  });

  useEffect(() => {
    if (!selectedFlight) {
      // router.push("/flights");
    }
  }, [selectedFlight, router]);

  const steps = [
    { num: 1, name: "Search", status: "completed" },
    { num: 2, name: "Passenger", status: "completed" },
    { num: 3, name: "Seat", status: "current" },
    { num: 4, name: "Payment", status: "upcoming" },
    { num: 5, name: "Confirmation", status: "upcoming" }
  ];

  // Using 6A as default selected for mockup match if none selected
  const activeSeat = selectedSeat || "6A";

  const getSeatIcon = (color: string) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color}>
      <path d="M4 18v-5a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v5" />
      <path d="M12 19v-10" />
      <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
      <path d="M2 18h20" />
    </svg>
  );

  return (
    <div className="pt-24 pb-16 bg-[#f8f9fa] min-h-screen font-sans">
      <div className="container max-w-[900px] mx-auto px-4">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          
          {/* Top Stepper */}
          <div className="flex items-center justify-center py-6 px-8 border-b border-slate-100">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                    step.status === "current" 
                      ? "bg-primary text-white" 
                      : "bg-white border border-slate-300 text-slate-400"
                  )}>
                    {step.num}
                  </div>
                  <span className={cn(
                    "text-xs font-bold",
                    step.status === "current" ? "text-primary" : "text-slate-500"
                  )}>
                    {step.name}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-8 md:w-12 h-[1px] bg-slate-200 mx-2 md:mx-4 border-t border-dashed border-slate-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="p-8">
            
            {/* Flight Header */}
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 bg-[#001b94] rounded-lg flex items-center justify-center p-2 shrink-0">
                <span className="text-white font-bold text-xs">IndiGo</span>
              </div>
              <div>
                <div className="font-bold text-sm text-slate-800 mb-1">IndiGo <span className="font-medium text-slate-500 ml-1">6E-5324</span></div>
                <div className="text-xs font-medium text-slate-500">DEL → BOM <span className="mx-2">|</span> 20 May, 2025</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 justify-center">
              
              {/* Seat Map Area */}
              <div className="border border-slate-100 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden bg-white max-w-[400px] mx-auto md:mx-0">
                
                {/* Airplane body shape outline background */}
                <div className="absolute inset-0 top-16 bottom-16 left-6 right-6 bg-slate-50 rounded-t-[100px] rounded-b-[40px] z-0"></div>

                <div className="relative z-10">
                  {/* Column Headers */}
                  <div className="flex justify-between items-center mb-6 text-xs font-bold text-slate-500 px-4">
                    <div className="flex gap-4 w-[110px] justify-between">
                      <span>A</span><span>B</span><span>C</span>
                    </div>
                    <div className="w-8 text-center text-slate-300">|</div>
                    <div className="flex gap-4 w-[110px] justify-between">
                      <span>D</span><span>E</span><span>F</span>
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="flex flex-col gap-3 mb-10">
                    {seatMap.map((row) => (
                      <div key={row.rowNumber} className="flex justify-between items-center px-4">
                        <div className="flex gap-2 w-[110px] justify-between">
                          {row.seats.slice(0, 3).map(seat => {
                            const isSelected = activeSeat === seat.id;
                            return (
                              <button
                                key={seat.id}
                                disabled={seat.occupied}
                                onClick={() => setSelectedSeat(seat.id)}
                                className={cn(
                                  "w-7 h-7 rounded-t-lg rounded-b-sm flex items-center justify-center font-bold text-[10px] transition-colors border",
                                  seat.occupied 
                                    ? "bg-white border-slate-300 text-slate-300 cursor-not-allowed" 
                                    : isSelected 
                                      ? "bg-[#0A58CA] border-[#0A58CA] text-white" 
                                      : "bg-white border-[#22c55e] text-[#22c55e] hover:bg-green-50"
                                )}
                              >
                                {isSelected ? getSeatIcon("text-white") : seat.occupied ? "" : getSeatIcon("text-[#22c55e]")}
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="w-8 text-center text-slate-800 font-bold text-xs">
                          {row.rowNumber}
                        </div>
                        
                        <div className="flex gap-2 w-[110px] justify-between">
                          {row.seats.slice(3, 6).map(seat => {
                            const isSelected = activeSeat === seat.id;
                            return (
                              <button
                                key={seat.id}
                                disabled={seat.occupied}
                                onClick={() => setSelectedSeat(seat.id)}
                                className={cn(
                                  "w-7 h-7 rounded-t-lg rounded-b-sm flex items-center justify-center font-bold text-[10px] transition-colors border",
                                  seat.occupied 
                                    ? "bg-white border-slate-300 text-slate-300 cursor-not-allowed" 
                                    : isSelected 
                                      ? "bg-[#0A58CA] border-[#0A58CA] text-white" 
                                      : "bg-white border-[#22c55e] text-[#22c55e] hover:bg-green-50"
                                )}
                              >
                                {isSelected ? getSeatIcon("text-white") : seat.occupied ? "" : getSeatIcon("text-[#22c55e]")}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-6 mt-8">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <div className="w-3 h-3 border border-[#22c55e] rounded-sm bg-[#22c55e]/10"></div> Available
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <div className="w-3 h-3 bg-[#0A58CA] rounded-sm"></div> Selected
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <div className="w-3 h-3 border border-slate-300 rounded-sm bg-slate-50"></div> Occupied
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Panel */}
              <div className="flex flex-col w-full max-w-[280px]">
                
                <div className="bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-8 mb-6 text-center">
                  <h3 className="text-xs font-bold text-slate-800 mb-6">Selected Seat</h3>
                  
                  <div className="text-4xl font-bold text-[#22c55e] mb-2">{activeSeat}</div>
                  <div className="text-xs text-slate-400 mb-8">Aisle Seat</div>
                  
                  <div className="border-t border-slate-100 pt-6 flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-500">Price</span>
                    <span className="text-xl font-bold text-slate-900">₹ 350</span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push("/booking/payment")}
                  className="w-full bg-[#0A58CA] hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm shadow-md transition-colors"
                >
                  Continue
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
