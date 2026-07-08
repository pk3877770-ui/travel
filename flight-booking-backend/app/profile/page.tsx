"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Plane, Calendar } from "lucide-react";

export default function ProfileDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/user/profile").then(res => res.json()),
      fetch("/api/user/bookings").then(res => res.json())
    ])
    .then(([profileData, bookingsData]) => {
      if (profileData.success) setProfile(profileData.profile);
      if (bookingsData.success) setBookings(bookingsData.bookings);
    })
    .finally(() => setLoading(false));
  }, []);

  const sidebarLinks = [
    { name: "Dashboard", href: "/profile", active: true },
    { name: "My Bookings", href: "/profile/bookings" },
    { name: "My Profile", href: "/profile/settings" },
    { name: "Saved Travelers", href: "/profile/travelers" },
    { name: "Payment Methods", href: "/profile/payments" },
    { name: "Offers", href: "/offers" },
    { name: "Logout", href: "#", isLogout: true },
  ];

  const upcomingBookings = bookings.filter(b => b.status !== "cancelled" && new Date(b.flight.date) >= new Date());

  return (
    <div className="pt-24 pb-16 bg-[#001233] min-h-screen font-sans flex justify-center">
      <div className="container max-w-[1000px] mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg grid md:grid-cols-[240px_1fr] overflow-hidden min-h-[600px]">
          
          {/* Sidebar */}
          <div className="border-b md:border-b-0 md:border-r border-slate-100 p-6 flex flex-col gap-2 h-full">
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
          <div className="flex-1 p-8 md:p-10 relative">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0A58CA] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome back, {profile?.name || "Traveler"}!</h1>
                <p className="text-sm text-slate-500 mb-8">Manage your bookings, travelers, and profile preferences here.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Plane className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Total Trips</p>
                      <h3 className="text-2xl font-black text-slate-800">{bookings.length}</h3>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Upcoming Trips</p>
                      <h3 className="text-2xl font-black text-slate-800">{upcomingBookings.length}</h3>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 mb-4">Your Next Trip</h3>
                {upcomingBookings.length > 0 ? (
                  <div className="border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <div className="font-bold text-lg text-[#0A58CA]">{upcomingBookings[0].flight.from} → {upcomingBookings[0].flight.to}</div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(upcomingBookings[0].flight.date).toLocaleDateString()} | {upcomingBookings[0].flight.airline}</div>
                    </div>
                    <Link href="/profile/bookings" className="bg-[#0A58CA] text-white px-5 py-2 rounded text-xs font-bold hover:bg-blue-700 transition-colors">
                      View Booking
                    </Link>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl p-8 text-center bg-slate-50">
                    <p className="text-sm text-slate-500 mb-4">No upcoming trips. It's time to plan your next adventure!</p>
                    <Link href="/flights" className="bg-[#0A58CA] text-white px-6 py-2 rounded text-xs font-bold hover:bg-blue-700 transition-colors">
                      Search Flights
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
