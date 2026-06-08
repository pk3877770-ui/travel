"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Plane, 
  UserPlus, 
  Tag, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  ArrowUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin", active: true },
    { name: "Bookings", icon: Briefcase, href: "/admin/bookings" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Flights", icon: Plane, href: "#" },
    { name: "Leads", icon: UserPlus, href: "/admin/leads" },
    { name: "Offers", icon: Tag, href: "#" },
    { name: "Reports", icon: BarChart3, href: "/admin/reports" },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  const [dashboardStats, setDashboardStats] = useState({
    bookings: 0,
    revenue: 0,
    users: 0,
    leads: 0,
  });

  React.useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDashboardStats(data.stats);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    { title: "Total Bookings", value: dashboardStats.bookings.toLocaleString(), trend: "Live" },
    { title: "Revenue", value: `₹ ${dashboardStats.revenue.toLocaleString()}`, trend: "Live" },
    { title: "Users", value: dashboardStats.users.toLocaleString(), trend: "Live" },
    { title: "Inquiry Leads", value: dashboardStats.leads.toLocaleString(), trend: "Live" },
  ];

  const recentBookings = [
    { name: "Rahul Sharma", route: "DEL - BOM", price: "₹ 14,049" },
    { name: "Neha Singh", route: "BOM - DEL", price: "₹ 15,390" },
    { name: "Amit Verma", route: "DEL - BLR", price: "₹ 6,280" },
    { name: "Pooja Patel", route: "DEL - HYD", price: "₹ 5,120" },
    { name: "Vikram Joshi", route: "BLR - DEL", price: "₹ 7,450" },
  ];

  const topRoutes = [
    { name: "DEL - BOM", value: "35%", color: "bg-[#0A58CA]" },
    { name: "DEL - BLR", value: "25%", color: "bg-[#3D8BFD]" },
    { name: "BOM - DEL", value: "20%", color: "bg-[#22c55e]" },
    { name: "DEL - HYD", value: "10%", color: "bg-[#f59e0b]" },
    { name: "Others", value: "10%", color: "bg-[#94a3b8]" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#001233] text-white flex flex-col fixed h-full z-20">
        <div className="p-8 pt-10 mb-2">
          <h1 className="text-xl font-bold tracking-tight text-white">FlyBook Admin</h1>
        </div>
        
        <div className="flex-1 px-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors font-medium",
                link.active 
                  ? "bg-[#1a2b4c] text-white" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="p-4 px-4 pb-8">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-[#fafbfe]">
        
        {/* Top Header */}
        <header className="h-24 px-10 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <button className="text-slate-600 hover:text-slate-800">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-10 pb-10">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
                <div className="text-[10px] font-bold text-slate-400 mb-2">{stat.title}</div>
                <div className="text-2xl font-bold text-slate-800 mb-3">{stat.value}</div>
                <div className="flex items-center gap-1 text-[#22c55e] text-[10px] font-bold">
                  <ArrowUp className="w-3 h-3" strokeWidth={3} /> {stat.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Line Chart Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800 text-sm">Booking Overview</h3>
              <select className="bg-white border border-slate-200 rounded px-3 py-1 text-xs font-bold text-slate-600 outline-none cursor-pointer hover:border-slate-300">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            
            <div className="relative h-[240px] w-full flex">
              {/* Y Axis */}
              <div className="flex flex-col justify-between h-full text-[10px] font-bold text-slate-400 pr-6 pb-[30px] shrink-0 text-right w-12">
                <span>250</span>
                <span>200</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>
              
              {/* Chart Area */}
              <div className="flex-1 relative h-[210px]">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between z-0">
                  <div className="border-t border-slate-50 w-full h-0"></div>
                  <div className="border-t border-slate-50 w-full h-0"></div>
                  <div className="border-t border-slate-50 w-full h-0"></div>
                  <div className="border-t border-slate-50 w-full h-0"></div>
                  <div className="border-t border-slate-100 w-full h-0"></div>
                </div>
                
                {/* SVG Line Chart */}
                <svg viewBox="0 0 1000 210" preserveAspectRatio="none" className="w-full h-full relative z-10 overflow-visible">
                  <defs>
                    <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(10, 88, 202, 0.2)" />
                      <stop offset="100%" stopColor="rgba(10, 88, 202, 0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Path coordinates mimicking the curved flow in the image */}
                  <path d="M 0 150 C 50 80, 100 80, 200 90 C 250 90, 280 20, 320 30 C 370 50, 400 140, 450 140 C 500 140, 550 50, 600 60 C 650 80, 700 120, 750 120 C 800 120, 850 50, 900 30 C 950 10, 1000 20, 1000 20 L 1000 210 L 0 210 Z" fill="url(#blueGradient)" />
                  <path d="M 0 150 C 50 80, 100 80, 200 90 C 250 90, 280 20, 320 30 C 370 50, 400 140, 450 140 C 500 140, 550 50, 600 60 C 650 80, 700 120, 750 120 C 800 120, 850 50, 900 30 C 950 10, 1000 20, 1000 20" fill="none" stroke="#3D8BFD" strokeWidth="3" />
                </svg>
                
                {/* X Axis */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-[10px] font-bold text-slate-400">
                  <span>13 May</span>
                  <span>14 May</span>
                  <span>15 May</span>
                  <span>16 May</span>
                  <span>17 May</span>
                  <span>18 May</span>
                  <span>19 May</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Top Routes Donut Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm mb-8">Top Routes</h3>
              
              <div className="flex items-center justify-between mt-4">
                {/* Donut Graphic */}
                <div className="relative w-40 h-40 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#0A58CA" strokeWidth="25" strokeDasharray="219.9" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#3D8BFD" strokeWidth="25" strokeDasharray="219.9" strokeDashoffset="77" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#22c55e" strokeWidth="25" strokeDasharray="219.9" strokeDashoffset="132" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#f59e0b" strokeWidth="25" strokeDasharray="219.9" strokeDashoffset="176" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#94a3b8" strokeWidth="25" strokeDasharray="219.9" strokeDashoffset="198" />
                  </svg>
                  {/* Inner white circle for donut hole */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex flex-col gap-4 pl-8 border-l border-slate-50 w-full">
                  {topRoutes.map((route, idx) => (
                    <div key={idx} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2.5 h-2.5 rounded-sm", route.color)} />
                        <span className="text-[10px] font-bold text-slate-500">{route.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-700">{route.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Bookings List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
              <h3 className="font-bold text-slate-800 text-sm mb-6">Recent Bookings</h3>
              <div className="flex flex-col gap-5 mt-4">
                {recentBookings.map((booking, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-5 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="text-xs font-bold text-slate-600 w-1/3">{booking.name}</div>
                    <div className="text-xs font-bold text-slate-800 text-center w-1/3">{booking.route}</div>
                    <div className="text-xs font-bold text-slate-600 text-right w-1/3">{booking.price}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
