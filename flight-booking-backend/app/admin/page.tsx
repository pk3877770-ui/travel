"use client";

import React, { useState, useEffect } from "react";
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
  X,
  ArrowUp,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "./login/actions";

const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin", active: true },
  { name: "Bookings", icon: Briefcase, href: "/admin/bookings" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Flights", icon: Plane, href: "/flights" },
  { name: "Leads", icon: UserPlus, href: "/admin/leads" },
  { name: "Offers", icon: Tag, href: "/offers" },
  { name: "Reports", icon: BarChart3, href: "/admin/reports" },
  { name: "Settings", icon: Settings, href: "/admin/seo" },
];

const donutColors = ["#0A58CA", "#3D8BFD", "#22c55e", "#f59e0b", "#94a3b8"];

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<any>({
    bookings: 0,
    revenue: 0,
    users: 0,
    leads: 0,
    weekly: [],
    topRoutes: [],
    recentBookings: [],
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData((d: any) => ({ ...d, ...res.stats }));
      })
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    { title: "Total Bookings", value: data.bookings.toLocaleString(), icon: Briefcase },
    { title: "Revenue", value: `₹ ${data.revenue.toLocaleString()}`, icon: IndianRupee },
    { title: "Users", value: data.users.toLocaleString(), icon: Users },
    { title: "Inquiry Leads", value: data.leads.toLocaleString(), icon: UserPlus },
  ];

  // Line chart geometry
  const weekly: { label: string; count: number }[] = data.weekly || [];
  const W = 1000, H = 210;
  const maxCount = Math.max(...weekly.map((d) => d.count), 1);
  const points = weekly.map((d, i) => {
    const x = weekly.length <= 1 ? 0 : (i / (weekly.length - 1)) * W;
    const y = H - 10 - (d.count / maxCount) * (H - 30);
    return [x, y] as [number, number];
  });
  const linePath = points.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(0)} ${p[1].toFixed(0)}`).join(" ");
  const areaPath = points.length ? `${linePath} L ${W} ${H} L 0 ${H} Z` : "";

  // Donut geometry
  const topRoutes: { name: string; value: number }[] = data.topRoutes || [];
  const C = 2 * Math.PI * 35;
  let acc = 0;
  const segments = topRoutes.map((r, i) => {
    const len = (r.value / 100) * C;
    const seg = { len, offset: acc, color: donutColors[i % donutColors.length] };
    acc += len;
    return seg;
  });

  return (
    <>
        
        {/* Top Header */}
        <header className="h-24 px-10 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <button className="text-slate-600 hover:text-slate-800">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8">

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUp className="w-3 h-3" strokeWidth={3} /> Live
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-400 mb-1">{stat.title}</div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-slate-800 text-sm">Booking Overview</h3>
              </div>
              <span className="text-xs font-bold text-slate-400">Last 7 days</span>
            </div>

            <div className="relative h-[240px] w-full flex">
              <div className="flex flex-col justify-between h-full text-[10px] font-bold text-slate-400 pr-6 pb-[30px] shrink-0 text-right w-12">
                <span>{maxCount}</span>
                <span>{Math.round(maxCount * 0.75)}</span>
                <span>{Math.round(maxCount * 0.5)}</span>
                <span>{Math.round(maxCount * 0.25)}</span>
                <span>0</span>
              </div>

              <div className="flex-1 relative h-[210px]">
                <div className="absolute inset-0 flex flex-col justify-between z-0">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-slate-50 w-full h-0" />
                  ))}
                </div>

                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full relative z-10 overflow-visible">
                  <defs>
                    <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(10, 88, 202, 0.2)" />
                      <stop offset="100%" stopColor="rgba(10, 88, 202, 0)" />
                    </linearGradient>
                  </defs>
                  {areaPath && <path d={areaPath} fill="url(#blueGradient)" />}
                  {linePath && <path d={linePath} fill="none" stroke="#3D8BFD" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />}
                </svg>

                <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-[10px] font-bold text-slate-400">
                  {weekly.map((d, i) => (
                    <span key={i}>{d.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Donut */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h3 className="font-bold text-slate-800 text-sm mb-8">Top Routes</h3>
              <div className="flex items-center justify-between gap-4">
                <div className="relative w-40 h-40 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {segments.map((s, i) => (
                      <circle
                        key={i}
                        cx="50" cy="50" r="35" fill="transparent"
                        stroke={s.color} strokeWidth="22"
                        strokeDasharray={`${s.len.toFixed(2)} ${(C - s.len).toFixed(2)}`}
                        strokeDashoffset={(-s.offset).toFixed(2)}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-slate-800">{data.bookings.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-slate-400">Total</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pl-6 border-l border-slate-50 w-full">
                  {topRoutes.map((route, idx) => (
                    <div key={idx} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: donutColors[idx % donutColors.length] }} />
                        <span className="text-xs font-bold text-slate-500">{route.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{route.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h3 className="font-bold text-slate-800 text-sm mb-6">Recent Bookings</h3>
              <div className="flex flex-col gap-4 mt-2">
                {(data.recentBookings || []).map((booking: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 w-1/2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">
                        {booking.name?.charAt(0) || "G"}
                      </div>
                      <span className="text-xs font-bold text-slate-700 truncate">{booking.name}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 text-center flex-1">{booking.route}</div>
                    <div className="text-xs font-bold text-slate-800 text-right w-1/4">₹ {Number(booking.price).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
    </>
  );
}
