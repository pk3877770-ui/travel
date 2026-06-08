"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("Flight Offers");

  const offers = [
    {
      id: 1,
      title: "FLYBOOK10",
      discount: "Get 10% Instant Discount",
      condition: "On Domestic Flights",
      minBooking: "Min. Booking ₹ 2,000",
      validity: "Valid till 31 May 2025",
      theme: {
        bg: "bg-[#f0f7ff]",
        border: "border-[#bfdbfe]",
        text: "text-[#2563eb]",
        buttonBorder: "border-[#2563eb]"
      }
    },
    {
      id: 2,
      title: "FLYBOOK15",
      discount: "Get 15% Instant Discount",
      condition: "On International Flights",
      minBooking: "Min. Booking ₹ 10,000",
      validity: "Valid till 15 Jun 2025",
      theme: {
        bg: "bg-[#fffbeb]",
        border: "border-[#fde68a]",
        text: "text-[#d97706]",
        buttonBorder: "border-[#d97706]"
      }
    },
    {
      id: 3,
      title: "WELCOME500",
      discount: "Flat ₹500 OFF",
      condition: "On Your First Booking",
      minBooking: "Min. Booking ₹ 4,000",
      validity: "Valid till 30 May 2025",
      theme: {
        bg: "bg-[#faf5ff]",
        border: "border-[#e9d5ff]",
        text: "text-[#9333ea]",
        buttonBorder: "border-[#9333ea]"
      }
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white font-sans">
      <div className="container max-w-[900px] mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mt-8 mb-12">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Best Offers for You</h1>
          <p className="text-slate-500 text-xs font-medium">Grab the best deals and discounts on your next booking</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-slate-100 mb-12">
          {["All Offers", "Flight Offers", "Bank Offers"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 text-xs font-bold transition-colors relative min-w-[120px] text-center",
                activeTab === tab ? "text-[#2563eb]" : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563eb]" />
              )}
            </button>
          ))}
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className={cn(
                "rounded-xl p-8 flex flex-col items-center text-center border border-dashed shadow-sm transition-transform hover:-translate-y-1",
                offer.theme.bg,
                offer.theme.border
              )}
            >
              <h3 className={cn("text-lg font-black mb-8 tracking-wide", offer.theme.text)}>
                {offer.title}
              </h3>
              
              <div className="flex flex-col gap-4 w-full flex-1 mb-8">
                <div className="text-xs font-bold text-slate-800">
                  {offer.discount}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  {offer.condition}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  {offer.minBooking}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  {offer.validity}
                </div>
              </div>

              <button 
                className={cn(
                  "w-full bg-white border py-3 rounded-lg text-xs font-bold transition-colors hover:bg-slate-50",
                  offer.theme.buttonBorder,
                  offer.theme.text
                )}
              >
                Copy Code
              </button>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#ccfbf1] rounded-xl p-10 text-center shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Get Exclusive Offers in Your Inbox</h2>
          <p className="text-slate-600 text-xs font-medium mb-8">Subscribe to our newsletter and never miss any deals!</p>
          
          <div className="max-w-md mx-auto bg-white rounded-lg p-2 flex shadow-sm border border-slate-100">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-transparent border-none outline-none px-4 text-xs font-medium text-slate-700"
            />
            <button className="bg-[#0A58CA] hover:bg-blue-700 text-white px-6 py-2.5 rounded text-xs font-bold transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
