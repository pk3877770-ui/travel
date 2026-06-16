"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfileSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    fetch("/api/user/profile")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.profile) {
          setProfile({
            ...data.profile,
            dateOfBirth: data.profile.dateOfBirth ? new Date(data.profile.dateOfBirth).toISOString().split('T')[0] : "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) setSuccess(true);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const sidebarLinks = [
    { name: "Dashboard", href: "/profile" },
    { name: "My Bookings", href: "/profile/bookings" },
    { name: "My Profile", href: "/profile/settings", active: true },
    { name: "Saved Travelers", href: "/profile/travelers" },
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
            <h1 className="text-xl font-bold text-slate-800 mb-6">Profile Management</h1>
            
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0A58CA] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-6 max-w-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0A58CA]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={profile.email}
                      disabled
                      className="w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2 text-sm text-slate-500 cursor-not-allowed"
                    />
                    <span className="text-[10px] text-slate-400">Email cannot be changed online.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0A58CA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      name="dateOfBirth"
                      value={profile.dateOfBirth}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0A58CA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0A58CA]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {success && <span className="text-xs font-bold text-green-600">Profile updated successfully.</span>}
                  {!success && <span></span>}
                  
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#0A58CA] hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-xs font-bold transition-colors disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
