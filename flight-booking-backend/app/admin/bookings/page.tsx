"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Briefcase, Users, Plane, UserPlus, Tag, BarChart3, Settings, LogOut, Menu, 
  Search, Edit, XCircle, RefreshCw, CheckCircle2, Ticket
} from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reissueModalOpen, setReissueModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  
  // Reissue Form State
  const [newDate, setNewDate] = useState("");
  const [newAirline, setNewAirline] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Bookings", icon: Briefcase, href: "/admin/bookings", active: true },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Flights", icon: Plane, href: "#" },
    { name: "Leads", icon: UserPlus, href: "/admin/leads" },
    { name: "Offers", icon: Tag, href: "#" },
    { name: "Reports", icon: BarChart3, href: "/admin/reports" },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = async (bookingId: string, action: string, payload?: any) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, action, payload })
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings(); // refresh list
        if (action === "reissue") {
          setReissueModalOpen(false);
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  const openReissueModal = (booking: any) => {
    setSelectedBooking(booking);
    setNewDate(booking.flight.date);
    setNewAirline(booking.flight.airline);
    setNewFrom(booking.flight.from);
    setNewTo(booking.flight.to);
    setReissueModalOpen(true);
  };

  const submitReissue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    
    handleAction(selectedBooking._id, "reissue", {
      flight: {
        date: newDate,
        airline: newAirline,
        from: newFrom,
        to: newTo
      }
    });
  };

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
            <h1 className="text-2xl font-bold text-slate-800">Booking Management</h1>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search PNR or Name..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-10">
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                    <th className="p-4">PNR</th>
                    <th className="p-4">Passenger</th>
                    <th className="p-4">Route</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Refund</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">Loading bookings...</td>
                    </tr>
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">No bookings found.</td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-800">
                          {b.bookingReference}
                          {b.isReissued && <span className="block text-[10px] text-blue-600 uppercase bg-blue-50 w-fit px-1.5 py-0.5 rounded mt-1">Reissued</span>}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-800">{b.passengerDetails?.name || "N/A"}</p>
                          <p className="text-xs text-slate-500">{b.passengerDetails?.email || "N/A"}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-700">{b.flight.from} &rarr; {b.flight.to}</p>
                          <p className="text-xs text-slate-500">{b.flight.date} | {b.flight.airline}</p>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-bold",
                            b.status === "confirmed" ? "bg-green-100 text-green-700" :
                            b.status === "cancelled" ? "bg-red-100 text-red-700" :
                            "bg-orange-100 text-orange-700"
                          )}>
                            {b.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                           {b.status === "cancelled" && b.refundStatus === "pending" && (
                             <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">Pending</span>
                           )}
                           {b.refundStatus === "processed" && (
                             <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/> Processed</span>
                           )}
                           {b.refundStatus === "none" && <span className="text-slate-400 text-xs">-</span>}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {b.status === "confirmed" && (
                              <>
                                <button onClick={() => openReissueModal(b)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Reissue Ticket">
                                  <Ticket className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleAction(b._id, "cancel")} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Cancel Booking">
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {b.status === "cancelled" && b.refundStatus === "pending" && (
                               <button onClick={() => handleAction(b._id, "process_refund")} className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 flex items-center gap-1">
                                 <RefreshCw className="w-3 h-3"/> Process Refund
                               </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Reissue Modal */}
      {reissueModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Reissue Ticket</h3>
              <button onClick={() => setReissueModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={submitReissue} className="p-6 space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg mb-4 text-sm">
                PNR: <strong className="font-mono">{selectedBooking.bookingReference}</strong><br/>
                Passenger: <strong>{selectedBooking.passengerDetails?.name}</strong>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">From</label>
                  <input type="text" value={newFrom} onChange={e => setNewFrom(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">To</label>
                  <input type="text" value={newTo} onChange={e => setNewTo(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-500" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                <input type="text" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-500" required />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Airline</label>
                <input type="text" value={newAirline} onChange={e => setNewAirline(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-500" required />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setReissueModalOpen(false)} className="flex-1 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" className="flex-1 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">Reissue Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
