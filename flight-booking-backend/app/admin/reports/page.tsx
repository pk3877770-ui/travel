"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Briefcase, Users, Plane, UserPlus, Tag, BarChart3, Settings, LogOut, 
  TrendingUp, TrendingDown, IndianRupee, Target, CalendarDays, Map
} from "lucide-react";

export default function AdminReportsPage() {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>({
    dailySales: [],
    monthlyRevenue: [],
    popularRoutes: [],
    conversions: { inquiries: 0, bookings: 0, rate: 0 }
  });

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Bookings", icon: Briefcase, href: "/admin/bookings" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Flights", icon: Plane, href: "#" },
    { name: "Leads", icon: UserPlus, href: "/admin/leads" },
    { name: "Offers", icon: Tag, href: "#" },
    { name: "Reports", icon: BarChart3, href: "/admin/reports", active: true },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/admin/reports");
        const json = await res.json();
        if (json.success) {
          setReportData(json.data);
        }
      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const totalYtdRevenue = reportData.monthlyRevenue.reduce((sum: number, r: any) => sum + r.revenue, 0);

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
        <header className="h-24 px-10 flex items-center justify-between shrink-0 bg-white border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-10">
          
          {loading ? (
            <div className="py-32 text-center text-slate-500 font-medium animate-pulse">Aggregating Global Analytics...</div>
          ) : (
            <div className="space-y-8">
              
              {/* Highlight Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">YTD Revenue</p>
                    <p className="text-4xl font-black text-slate-800 tracking-tight">₹{totalYtdRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <IndianRupee className="w-8 h-8" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Conversion Rate</p>
                    <p className="text-4xl font-black text-slate-800 tracking-tight">{reportData.conversions.rate}%</p>
                    <p className="text-xs font-medium text-slate-500 mt-2">
                      Based on {reportData.conversions.inquiries} inquiries vs {reportData.conversions.bookings} bookings.
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Target className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Monthly Revenue Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-slate-500" />
                    <h3 className="font-bold text-slate-800">Monthly Revenue</h3>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-100">
                          <th className="pb-3 font-medium">Month</th>
                          <th className="pb-3 font-medium text-center">Bookings</th>
                          <th className="pb-3 font-medium text-right">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.monthlyRevenue.length === 0 && (
                          <tr><td colSpan={3} className="py-4 text-center text-slate-500">No revenue data.</td></tr>
                        )}
                        {reportData.monthlyRevenue.map((m: any, idx: number) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                            <td className="py-4 font-bold text-slate-700">{m.month}</td>
                            <td className="py-4 text-center text-slate-600 font-medium">{m.bookings}</td>
                            <td className="py-4 text-right font-black text-slate-800">₹{m.revenue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Popular Routes */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <Map className="w-5 h-5 text-slate-500" />
                    <h3 className="font-bold text-slate-800">Top Popular Routes</h3>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
                    <div className="space-y-4">
                      {reportData.popularRoutes.length === 0 && (
                        <p className="text-center text-slate-500">No route data.</p>
                      )}
                      {reportData.popularRoutes.map((route: any, idx: number) => {
                        // Visual bar width logic based on relative max count
                        const maxCount = reportData.popularRoutes[0]?.count || 1;
                        const widthPct = Math.max(10, (route.count / maxCount) * 100);
                        
                        return (
                          <div key={idx} className="relative">
                            <div className="flex justify-between items-end mb-1">
                              <span className="text-xs font-bold text-slate-700">{route.route}</span>
                              <span className="text-xs font-bold text-blue-600">{route.count} flights</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                style={{ width: `${widthPct}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Sales Trends */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-slate-500" />
                  <h3 className="font-bold text-slate-800">Daily Sales (Last 30 Days)</h3>
                </div>
                <div className="p-6 overflow-x-auto">
                  <div className="flex gap-2 items-end min-h-[150px] min-w-[600px]">
                    {reportData.dailySales.length === 0 && (
                      <p className="text-center w-full text-slate-500">No daily sales data.</p>
                    )}
                    {reportData.dailySales.map((day: any, idx: number) => {
                      const maxRevenue = Math.max(...reportData.dailySales.map((d:any) => d.revenue), 1);
                      const heightPct = Math.max(5, (day.revenue / maxRevenue) * 100);
                      
                      return (
                        <div key={idx} className="flex flex-col items-center flex-1 group">
                          {/* Tooltip on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded mb-2 whitespace-nowrap z-10 font-bold pointer-events-none">
                            {day._id}<br/>
                            {day.sales} Bookings<br/>
                            ₹{day.revenue.toLocaleString()}
                          </div>
                          {/* Bar */}
                          <div 
                            className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t-sm transition-all duration-300"
                            style={{ height: `${heightPct}%`, minHeight: '10px' }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
