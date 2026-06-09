"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";

export default function ProfilePaymentsPage() {
  const sidebarLinks = [
    { name: "Dashboard", href: "/profile" },
    { name: "My Bookings", href: "/profile/bookings" },
    { name: "My Profile", href: "/profile/settings" },
    { name: "Saved Travelers", href: "/profile/travelers" },
    { name: "Payment Methods", href: "/profile/payments", active: true },
    { name: "Offers", href: "/offers" },
    { name: "Logout", href: "#", isLogout: true },
  ];

  return (
    <div className="pt-24 pb-16 bg-[#001233] min-h-screen font-sans flex justify-center">
      <div className="container max-w-[1000px] mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden min-h-[600px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-[240px] border-r border-slate-100 p-6 flex flex-col gap-2 shrink-0">
            {sidebarLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-xs font-medium transition-colors",
                  link.active 
                    ? "bg-[#f1f5f9] text-[#0A58CA] font-bold" 
                    : link.isLogout
                      ? "text-slate-600 hover:bg-slate-50 mt-auto"
                      : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 md:p-10 relative flex flex-col">
            <h1 className="text-xl font-bold text-slate-800 mb-6">Payment Methods</h1>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center text-[#0A58CA] mb-6">
                <CreditCard className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black text-slate-800 mb-2">No Saved Cards</h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                You haven't saved any payment methods yet. Save a card during your next flight or hotel booking for faster checkouts.
              </p>
              
              <button disabled className="bg-slate-100 text-slate-400 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest cursor-not-allowed">
                Add New Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
