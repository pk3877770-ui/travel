"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Stepper, { Step } from "@/components/Stepper";

export default function PassengerDetailsPage() {
  const router = useRouter();
  const { selectedFlight, passenger, setPassenger } = useBooking();
  const [addBaggage, setAddBaggage] = useState(false);

  useEffect(() => {
    if (!selectedFlight) {
      // Allow previewing the page without selected flight for mockup purposes
      // router.push("/flights");
    }
  }, [selectedFlight, router]);

  const handleContinue = () => {
    // Basic validation could go here
    router.push("/booking/seats");
  };

  const steps: Step[] = [
    { name: "Search", status: "completed" },
    { name: "Passenger", status: "current" },
    { name: "Seat", status: "upcoming" },
    { name: "Payment", status: "upcoming" },
    { name: "Confirmation", status: "upcoming" }
  ];

  return (
    <div className="pt-24 pb-16 bg-[#f8f9fa] min-h-screen font-sans">
      <div className="container max-w-[800px] mx-auto px-4">
        
        <Stepper steps={steps} />
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">

          <div className="p-8">
            {/* Contact Details */}
            <div className="mb-10">
              <h2 className="font-bold text-slate-800 text-lg mb-6">Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Rahul Sharma"
                    className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800" 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="rahulsharma@email.com"
                    className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue="+91 98765 43210"
                    className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800" 
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100 mb-10"></div>

            {/* Passenger 1 */}
            <div className="mb-10">
              <h2 className="font-bold text-slate-800 text-lg mb-6">Passenger 1</h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                <div className="col-span-1 md:col-span-3">
                  <label className="text-xs font-medium text-slate-500 block mb-2">Title</label>
                  <select className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800 bg-white cursor-pointer">
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500 block mb-2">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Rahul"
                    className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800" 
                  />
                </div>
                <div className="col-span-1 md:col-span-5">
                  <label className="text-xs font-medium text-slate-500 block mb-2">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Sharma"
                    className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="text-xs font-medium text-slate-500 block mb-2">Date of Birth</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="12/05/1995"
                      className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800" 
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-2">Gender</label>
                  <select className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800 bg-white cursor-pointer">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-2">Nationality</label>
                  <select className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-primary text-sm font-medium text-slate-800 bg-white cursor-pointer">
                    <option>Indian</option>
                    <option>American</option>
                    <option>British</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100 mb-10"></div>

            {/* Add Baggage */}
            <div className="mb-10">
              <h2 className="font-bold text-slate-800 text-lg mb-6">Add Baggage</h2>
              <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    checked={addBaggage}
                    onChange={(e) => setAddBaggage(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary accent-primary" 
                  />
                  <span className="text-sm font-medium text-slate-600">15 kg Check-in Baggage</span>
                </div>
                <span className="font-bold text-sm text-slate-800">₹ 1,200</span>
              </label>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleContinue}
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-lg font-bold text-sm shadow-md transition-colors"
            >
              Save & Continue
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
