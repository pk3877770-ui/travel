"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user/bookings")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBookings(data.bookings);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const downloadPDF = async (booking: any) => {
    const element = document.getElementById(`ticket-${booking._id}`);
    if (!element) return;
    
    // Temporarily show the ticket for capturing
    element.style.display = "block";
    
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Kramana_Ticket_${booking.bookingReference}.pdf`);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      // Hide again
      element.style.display = "none";
    }
  };

  const sidebarLinks = [
    { name: "Dashboard", href: "/profile" },
    { name: "My Bookings", href: "/profile/bookings", active: true },
    { name: "My Profile", href: "/profile/settings" },
    { name: "Saved Travelers", href: "/profile/travelers" },
    { name: "Payment Methods", href: "/profile/payments" },
    { name: "Offers", href: "/offers" },
    { name: "Logout", href: "#", isLogout: true },
  ];

  const filteredBookings = bookings.filter(b => {
    if (activeTab === "Upcoming") return b.status !== "cancelled" && new Date(b.flight.date) >= new Date();
    if (activeTab === "Completed") return b.status !== "cancelled" && new Date(b.flight.date) < new Date();
    if (activeTab === "Cancelled") return b.status === "cancelled";
    return true;
  });

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
          <div className="flex-1 p-8 md:p-10 flex flex-col relative">
            <h1 className="text-xl font-bold text-slate-800 mb-6">My Bookings</h1>
            
            <div className="flex border-b border-slate-100 mb-8">
              {["Upcoming", "Completed", "Cancelled"].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-3 text-xs font-bold transition-colors relative",
                    activeTab === tab ? "text-[#0A58CA]" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A58CA]" />
                  )}
                </button>
              ))}
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0A58CA] rounded-full animate-spin"></div>
              </div>
            ) : filteredBookings.length === 0 ? (
               <div className="text-center py-12 text-slate-500 text-sm">
                 No {activeTab.toLowerCase()} bookings found.
               </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const isCancelled = booking.status === "cancelled";
                  const statusColor = isCancelled ? "bg-red-50 text-red-500 border-red-100" : "bg-blue-50 text-blue-500 border-blue-100";

                  return (
                    <div key={booking._id} className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <div className="font-bold text-sm text-slate-800">{booking.flight.from} → {booking.flight.to}</div>
                          <div className="text-[10px] font-medium text-slate-500">{new Date(booking.flight.date).toLocaleDateString()} | {booking.flight.airline}</div>
                          <div className="text-[10px] font-medium text-slate-500">PNR: {booking.bookingReference}</div>
                        </div>

                        <div className="flex flex-col items-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                          <div className={cn("px-3 py-1 rounded text-[10px] font-bold border capitalize", statusColor)}>
                            {booking.status}
                          </div>
                          <button 
                            onClick={() => setExpandedId(expandedId === booking._id ? null : booking._id)}
                            className="bg-white border border-[#0A58CA] text-[#0A58CA] hover:bg-blue-50 px-6 py-1.5 rounded text-xs font-bold transition-colors"
                          >
                            {expandedId === booking._id ? "Hide Details" : "View Details"}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedId === booking._id && (
                        <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-3">
                              <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Passenger</p>
                                <p className="text-xs font-medium text-slate-800">{booking.passengerDetails?.name || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Total Amount</p>
                                <p className="text-xs font-bold text-slate-800">₹{booking.totalAmount}</p>
                              </div>
                            </div>
                            {!isCancelled && (
                              <button 
                                onClick={() => downloadPDF(booking)}
                                className="bg-[#0A58CA] text-white hover:bg-blue-700 px-4 py-2 rounded text-xs font-bold transition-colors shadow-md"
                              >
                                Download Ticket PDF
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Hidden Ticket for PDF generation */}
                      <div id={`ticket-${booking._id}`} style={{ display: 'none', padding: '40px', backgroundColor: '#fff', width: '800px', fontFamily: 'sans-serif' }}>
                        <div style={{ borderBottom: '2px solid #001233', paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h1 style={{ color: '#0A58CA', margin: 0, fontSize: '32px' }}>Kramana Ticket</h1>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Booking Reference</p>
                            <h2 style={{ margin: 0, color: '#001233' }}>{booking.bookingReference}</h2>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                          <div>
                            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Passenger Name</p>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{booking.passengerDetails?.name || 'N/A'}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Date of Issue</p>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{new Date(booking.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>From</p>
                              <h3 style={{ fontSize: '24px', margin: 0, color: '#001233' }}>{booking.flight.from}</h3>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                              <div style={{ borderBottom: '2px dashed #cbd5e1', position: 'relative', top: '-10px' }}></div>
                              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0A58CA', backgroundColor: '#f8fafc', padding: '0 10px' }}>{booking.flight.airline}</span>
                            </div>
                            <div style={{ flex: 1, textAlign: 'right' }}>
                              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>To</p>
                              <h3 style={{ fontSize: '24px', margin: 0, color: '#001233' }}>{booking.flight.to}</h3>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>Date & Time</p>
                              <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{new Date(booking.flight.date).toLocaleDateString()} | 10:00 AM</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>Status</p>
                              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981', margin: 0, textTransform: 'capitalize' }}>{booking.status}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ marginTop: '40px', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
                          <p>This is a computer-generated document. No signature is required.</p>
                          <p>© {new Date().getFullYear()} Kramana. All rights reserved.</p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer Support Text */}
            <div className="mt-auto pt-8 border-t border-slate-50 text-center">
              <p className="text-[10px] text-slate-500 font-medium">
                Can't find your booking? <Link href="/contact" className="text-[#0A58CA] font-bold hover:underline">Contact Support</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
