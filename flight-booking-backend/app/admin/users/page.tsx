"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Briefcase, Users, Plane, UserPlus, Tag, BarChart3, Settings, LogOut, Menu, 
  Search, ShieldAlert, ShieldCheck, Ticket, XCircle
} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Bookings", icon: Briefcase, href: "/admin/bookings" },
    { name: "Users", icon: Users, href: "/admin/users", active: true },
    { name: "Flights", icon: Plane, href: "#" },
    { name: "Leads", icon: UserPlus, href: "/admin/leads" },
    { name: "Offers", icon: Tag, href: "#" },
    { name: "Reports", icon: BarChart3, href: "/admin/reports" },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async (userId: string, currentStatus: boolean) => {
    try {
      const action = currentStatus ? "unblock" : "block";
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action })
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers(); // Refresh list
      }
    } catch (err) {
      console.error("Block toggle failed", err);
    }
  };

  const openBookingsModal = async (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
    setLoadingBookings(true);
    try {
      const res = await fetch(`/api/admin/users/${user._id}/bookings`);
      const data = await res.json();
      if (data.success) {
        setUserBookings(data.bookings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#001233] text-white flex flex-col fixed h-full z-20">
        <div className="p-8 pt-10 mb-2">
          <span className="text-xl font-bold tracking-tight text-white">FlyBook Admin</span>
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
            <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
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
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">Loading users...</td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No users found.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-slate-800">{user.name}</p>
                          <p className="text-[10px] text-slate-400">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="p-4 font-medium text-slate-600">{user.email}</td>
                        <td className="p-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                            user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"
                          )}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          {user.isBlocked ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                              <ShieldAlert className="w-3 h-3" /> Blocked
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                              <ShieldCheck className="w-3 h-3" /> Active
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => openBookingsModal(user)} 
                              className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 flex items-center gap-1"
                            >
                              <Ticket className="w-3 h-3" /> Bookings
                            </button>
                            <button 
                              onClick={() => handleBlockToggle(user._id, user.isBlocked)} 
                              className={cn(
                                "px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors",
                                user.isBlocked ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"
                              )}
                            >
                              {user.isBlocked ? "Unblock" : "Block"}
                            </button>
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

      {/* Booking History Modal */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Booking History</h3>
                <p className="text-xs text-slate-500">{selectedUser.name} ({selectedUser.email})</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {loadingBookings ? (
                <div className="text-center py-12 text-slate-500 font-medium">Loading itinerary history...</div>
              ) : userBookings.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-medium">This user has not made any bookings yet.</div>
              ) : (
                <div className="space-y-4">
                  {/* Summary Metric */}
                  <div className="flex justify-between items-center bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
                    <div>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Total Bookings</p>
                      <p className="text-xl font-bold text-slate-800">{userBookings.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Lifetime Revenue</p>
                      <p className="text-xl font-bold text-slate-800">
                        ₹{userBookings.filter(b => b.status === "confirmed").reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Booking List */}
                  {userBookings.map(b => (
                    <div key={b._id} className="border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-sm transition-all">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-sm text-slate-800">{b.bookingReference}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            b.status === "confirmed" ? "bg-green-100 text-green-700" :
                            b.status === "cancelled" ? "bg-red-100 text-red-700" :
                            "bg-orange-100 text-orange-700"
                          )}>
                            {b.status}
                          </span>
                        </div>
                        <p className="font-bold text-slate-700">{b.flight.from} &rarr; {b.flight.to}</p>
                        <p className="text-xs text-slate-500">{b.flight.date} • {b.flight.airline}</p>
                      </div>
                      <div className="text-right flex items-center justify-between md:flex-col md:items-end">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">Amount Paid</span>
                        <span className="font-black text-slate-800 text-lg">₹{b.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 text-right">
              <button onClick={() => setModalOpen(false)} className="px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-900 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
