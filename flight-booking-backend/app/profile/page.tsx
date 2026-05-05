"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, MapPin, CreditCard, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking? This action cannot be fully undone online and may incur cancellation fees.")) return;
    
    setIsCancelling(bookingId);
    try {
      const res = await fetch("/api/user/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, action: "cancel" })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: "cancelled" } : b));
        alert("Booking has been successfully cancelled.");
      } else {
        alert("Failed to cancel booking. Please try again.");
      }
    } catch (e) {
      alert("An error occurred while cancelling your booking.");
    } finally {
      setIsCancelling(null);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) {
          router.push("/auth");
          return;
        }
        const userData = await userRes.json();
        setUser(userData.user);

        const bookingsRes = await fetch("/api/user/bookings");
        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setBookings(bookingsData.bookings);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="animate-pulse-slow w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50">
          <Plane className="w-8 h-8 text-accent animate-float" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-primary-dark pt-32 pb-20 px-6 font-inter overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full mesh-gradient opacity-30 pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4"
          >
            Welcome, <span className="text-gradient">{user?.name}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl"
          >
            Manage your premium travel portfolio and view your upcoming itineraries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-dark premium-border rounded-3xl p-8 sticky top-32">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold text-accent mb-6 border border-white/10">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-outfit font-bold text-white mb-2">{user?.name}</h2>
              <p className="text-white/60 mb-6">{user?.email}</p>
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Member Status</span>
                  <span className="text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full uppercase tracking-wider text-xs">Premium</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40">Total Trips</span>
                  <span className="text-white font-medium">{bookings.length}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bookings List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-outfit font-bold text-white mb-6">My Bookings</h3>

            {bookings.length === 0 ? (
              <div className="glass-dark rounded-3xl p-12 text-center border border-white/10">
                <Plane className="w-16 h-16 text-white/20 mx-auto mb-6" />
                <h4 className="text-xl font-outfit font-bold text-white mb-2">No upcoming trips</h4>
                <p className="text-white/60 mb-8">Ready to explore the world in luxury?</p>
                <button 
                  onClick={() => router.push('/flight-booking')}
                  className="bg-accent text-primary-dark font-bold py-3 px-8 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all uppercase tracking-wider text-sm"
                >
                  Book a Flight
                </button>
              </div>
            ) : (
              bookings.map((booking, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  key={booking._id}
                  className="glass-dark hover:bg-white/5 transition-colors border border-white/10 rounded-3xl p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/5 pb-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        {booking.status}
                      </span>
                      <p className="text-white/40 text-sm flex items-center gap-2">
                        Booking Ref: <span className="text-white font-mono">{booking.bookingReference}</span>
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-white/40 text-sm">Total Amount</p>
                      <p className="text-2xl font-outfit font-bold text-gradient">₹{booking.totalAmount}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-3xl font-outfit font-bold text-white">{booking.flight.from}</h4>
                      <p className="text-white/60 text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
                        <Clock className="w-3 h-3" /> {booking.flight.departureTime || "10:00 AM"}
                      </p>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center px-4 w-full">
                      <div className="w-full flex items-center justify-center gap-2">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-accent/50" />
                        <Plane className="w-6 h-6 text-accent shrink-0" />
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/20 to-accent/50" />
                      </div>
                      <p className="text-white/40 text-xs mt-2 text-center uppercase tracking-widest">{booking.flight.airline}</p>
                    </div>

                    <div className="flex-1 text-center md:text-right">
                      <h4 className="text-3xl font-outfit font-bold text-white">{booking.flight.to}</h4>
                      <p className="text-white/60 text-sm mt-1 flex items-center justify-center md:justify-end gap-1">
                        <Clock className="w-3 h-3" /> {booking.flight.arrivalTime || "12:00 PM"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center text-sm">
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-4 h-4 text-accent" />
                        {new Date(booking.flight.date).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="w-4 h-4 text-accent" />
                        {booking.travelers} Traveler(s)
                        {booking.passengerDetails && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hidden md:inline-block">
                            {booking.passengerDetails.name} ({booking.passengerDetails.passport})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <button 
                        onClick={() => setExpandedBookingId(expandedBookingId === booking._id ? null : booking._id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        {expandedBookingId === booking._id ? "Hide Details" : "View Details"}
                      </button>
                      {booking.status !== "cancelled" && (
                        <button 
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={isCancelling === booking._id}
                          className="flex-1 md:flex-none px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                          {isCancelling === booking._id ? "Wait..." : "Cancel"}
                        </button>
                      )}
                    </div>
                  </div>

                  {expandedBookingId === booking._id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <div>
                        <h5 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-accent">Passenger Information</h5>
                        {booking.passengerDetails ? (
                          <div className="space-y-2 text-sm text-white/60">
                            <p><span className="text-white/40">Name:</span> <span className="text-white">{booking.passengerDetails.name}</span></p>
                            <p><span className="text-white/40">Email:</span> <span className="text-white">{booking.passengerDetails.email}</span></p>
                            <p><span className="text-white/40">Passport:</span> <span className="text-white">{booking.passengerDetails.passport}</span></p>
                          </div>
                        ) : (
                          <p className="text-sm text-white/60">No additional passenger details provided.</p>
                        )}
                      </div>
                      <div>
                        <h5 className="text-white font-bold mb-4 uppercase tracking-widest text-xs text-accent">Payment Summary</h5>
                        <div className="space-y-2 text-sm text-white/60">
                          <div className="flex justify-between"><span className="text-white/40">Base Fare ({booking.travelers}x)</span> <span className="text-white">₹{booking.flight.price * booking.travelers}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">Taxes & Fees</span> <span className="text-white">Included</span></div>
                          <div className="flex justify-between border-t border-white/10 pt-2 mt-2 font-bold text-white">
                            <span>Total Paid</span> <span className="text-accent text-lg">₹{booking.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
