"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SavedTravelersPage() {
  const [loading, setLoading] = useState(true);
  const [travelers, setTravelers] = useState<any[]>([]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTraveler, setNewTraveler] = useState({
    name: "",
    email: "",
    phone: "",
    passport: "",
    dob: "",
  });

  const fetchTravelers = () => {
    setTimeout(() => setLoading(true), 0);
    fetch("/api/user/travelers")
      .then(res => res.json())
      .then(data => {
        if (data.success) setTravelers(data.travelers);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTravelers();
  }, []);

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/user/travelers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTraveler),
      });
      if (res.ok) {
        setShowAddForm(false);
        setNewTraveler({ name: "", email: "", phone: "", passport: "", dob: "" });
        fetchTravelers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this traveler?")) return;
    try {
      const res = await fetch(`/api/user/travelers?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchTravelers();
    } catch (e) {
      console.error(e);
    }
  };

  const sidebarLinks = [
    { name: "Dashboard", href: "/profile" },
    { name: "My Bookings", href: "/profile/bookings" },
    { name: "My Profile", href: "/profile/settings" },
    { name: "Saved Travelers", href: "/profile/travelers", active: true },
    { name: "Payment Methods", href: "/profile/payments" },
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
          <div className="flex-1 p-8 md:p-10 relative">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-slate-800">Saved Travelers</h1>
              {!showAddForm && (
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#0A58CA] hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors"
                >
                  + Add Traveler
                </button>
              )}
            </div>
            
            {showAddForm && (
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Add New Traveler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" value={newTraveler.name} onChange={e => setNewTraveler({...newTraveler, name: e.target.value})} className="border rounded-lg px-3 py-2 text-sm outline-none" />
                  <input type="email" placeholder="Email" value={newTraveler.email} onChange={e => setNewTraveler({...newTraveler, email: e.target.value})} className="border rounded-lg px-3 py-2 text-sm outline-none" />
                  <input type="text" placeholder="Phone" value={newTraveler.phone} onChange={e => setNewTraveler({...newTraveler, phone: e.target.value})} className="border rounded-lg px-3 py-2 text-sm outline-none" />
                  <input type="text" placeholder="Passport Number" value={newTraveler.passport} onChange={e => setNewTraveler({...newTraveler, passport: e.target.value})} className="border rounded-lg px-3 py-2 text-sm outline-none" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded">Cancel</button>
                  <button onClick={handleAdd} className="bg-[#0A58CA] text-white px-4 py-2 text-xs font-bold rounded hover:bg-blue-700">Save Traveler</button>
                </div>
              </div>
            )}

            {loading && !showAddForm ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0A58CA] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {travelers.length === 0 && !showAddForm ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No saved travelers yet. Add one to speed up your bookings!
                  </div>
                ) : (
                  travelers.map((t) => (
                    <div key={t._id} className="bg-white border border-slate-200 rounded-xl p-5 flex justify-between items-center shadow-sm">
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">{t.name}</h4>
                        <div className="text-[10px] text-slate-500 flex gap-4 mt-1">
                          <span>Passport: <span className="font-semibold">{t.passport || "N/A"}</span></span>
                          <span>Email: <span className="font-semibold">{t.email || "N/A"}</span></span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(t._id)}
                        className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
