"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Briefcase, Users, Plane, UserPlus, Tag, BarChart3, Settings, LogOut, 
  Search, MessageSquare, PlaneTakeoff, Mail
} from "lucide-react";

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState<"contacts" | "inquiries" | "subscribers">("contacts");
  const [loading, setLoading] = useState(true);
  
  const [contacts, setContacts] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Bookings", icon: Briefcase, href: "/admin/bookings" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Flights", icon: Plane, href: "#" },
    { name: "Leads", icon: UserPlus, href: "/admin/leads", active: true },
    { name: "Offers", icon: Tag, href: "#" },
    { name: "Reports", icon: BarChart3, href: "/admin/reports" },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/admin/leads");
        const json = await res.json();
        if (json.success) {
          setContacts(json.data.contacts);
          setInquiries(json.data.inquiries);
          setSubscribers(json.data.subscribers);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

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
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-800">Lead Management</h1>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-10">
          
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab("contacts")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
                activeTab === "contacts" ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              <MessageSquare className="w-4 h-4" /> Contact Forms ({contacts.length})
            </button>
            <button 
              onClick={() => setActiveTab("inquiries")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
                activeTab === "inquiries" ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              <PlaneTakeoff className="w-4 h-4" /> Flight Inquiries ({inquiries.length})
            </button>
            <button 
              onClick={() => setActiveTab("subscribers")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
                activeTab === "subscribers" ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              <Mail className="w-4 h-4" /> Newsletter Subscribers ({subscribers.length})
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 text-center text-slate-500 font-medium">Loading leads data...</div>
              ) : (
                <>
                  {/* Contacts Tab Content */}
                  {activeTab === "contacts" && (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                          <th className="p-4 w-1/4">Name & Email</th>
                          <th className="p-4 w-1/4">Subject</th>
                          <th className="p-4 w-2/4">Message</th>
                          <th className="p-4 text-right">Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {contacts.length === 0 ? (
                          <tr><td colSpan={4} className="p-8 text-center text-slate-500">No contact forms submitted.</td></tr>
                        ) : contacts.map(c => (
                          <tr key={c._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-slate-800">{c.name}</p>
                              <p className="text-xs text-slate-500">{c.email}</p>
                            </td>
                            <td className="p-4 font-bold text-slate-700">{c.subject}</td>
                            <td className="p-4 text-slate-600 text-xs leading-relaxed">{c.message}</td>
                            <td className="p-4 text-right text-xs text-slate-400 font-medium">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Inquiries Tab Content */}
                  {activeTab === "inquiries" && (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                          <th className="p-4">Route Searched</th>
                          <th className="p-4">Travel Date</th>
                          <th className="p-4">Travelers</th>
                          <th className="p-4 text-right">Search Time</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {inquiries.length === 0 ? (
                          <tr><td colSpan={4} className="p-8 text-center text-slate-500">No flight inquiries logged.</td></tr>
                        ) : inquiries.map(i => (
                          <tr key={i._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-slate-800">{i.from} &rarr; {i.to}</p>
                              <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{i.type}</span>
                            </td>
                            <td className="p-4 font-bold text-slate-700">{i.date}</td>
                            <td className="p-4 text-slate-600">{i.travelers}</td>
                            <td className="p-4 text-right text-xs text-slate-400 font-medium">
                              {new Date(i.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Subscribers Tab Content */}
                  {activeTab === "subscribers" && (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                          <th className="p-4">Email Address</th>
                          <th className="p-4 text-right">Subscription Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {subscribers.length === 0 ? (
                          <tr><td colSpan={2} className="p-8 text-center text-slate-500">No subscribers yet.</td></tr>
                        ) : subscribers.map(s => (
                          <tr key={s._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-slate-800">{s.email}</td>
                            <td className="p-4 text-right text-xs text-slate-400 font-medium">
                              {new Date(s.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
