"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Ticket, Smartphone, Plane, Calendar, User, Layout, DoorOpen, Briefcase, IndianRupee, Download, CheckCircle, XCircle, Clock, Check } from "lucide-react";

export default function TicketInquiry() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({ pnr: "", mobile: "", airline: "" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.pnr.length !== 6) return alert("Please enter a valid 6-digit PNR");
    
    setLoading(true);
    setResult(null);

    // Simulate API lookup
    setTimeout(() => {
      setLoading(false);
      setResult({
        pnr: form.pnr,
        status: "Confirmed",
        statusType: "success",
        passenger: "RAHUL KUMAR",
        flight: `${form.airline}672`,
        route: "DEL → BOM",
        date: "15 Dec 2024",
        time: "14:30",
        seat: "12A (Window)",
        gate: "B12",
        baggage: "15kg Included",
        amount: "₹4,299"
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-24">
      {/* Hero */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[100px]" />
        </div>
        <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-black font-outfit mb-6 flex items-center justify-center gap-4">
               <Search className="w-10 h-10 text-accent" /> Ticket Inquiry
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Track your PNR status, manage seat selections, and access your luxury travel documentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            <h2 className="text-3xl font-bold font-outfit mb-10 text-center text-primary dark:text-white">Retrieve Your Booking</h2>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">PNR Number</label>
                  <div className="relative">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. ABC123"
                      className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold uppercase"
                      value={form.pnr}
                      onChange={(e) => setForm({...form, pnr: e.target.value.toUpperCase()})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Registered Mobile</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50" />
                    <input
                      type="text"
                      maxLength={10}
                      required
                      placeholder="9876543210"
                      className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold"
                      value={form.mobile}
                      onChange={(e) => setForm({...form, mobile: e.target.value.replace(/\D/g, '')})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Airlines Partnership</label>
                <div className="relative">
                  <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-50" />
                  <select
                    required
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold appearance-none cursor-pointer"
                    value={form.airline}
                    onChange={(e) => setForm({...form, airline: e.target.value})}
                  >
                    <option value="">Select Airline</option>
                    <option value="AI">Air India (AI)</option>
                    <option value="6E">IndiGo (6E)</option>
                    <option value="SG">SpiceJet (SG)</option>
                    <option value="UK">Vistara (UK)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary-light transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
              >
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                       <Clock className="w-6 h-6" />
                    </motion.div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6" /> Track status
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Area */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-16"
              >
                <div className="bg-gradient-to-br from-primary to-primary-light text-white rounded-[2.5rem] p-8 md:p-12 shadow-3xl overflow-hidden relative">
                   {/* Ticket Background Pattern */}
                   <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                      <Plane className="w-64 h-64" />
                   </div>

                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                           <CheckCircle className="w-6 h-6 text-emerald-400" />
                           <h3 className="text-2xl font-bold font-outfit uppercase">Booking Confirmed</h3>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 inline-block text-lg font-black tracking-widest">
                           {result.status} (CNF)
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                         <p className="text-slate-400 text-sm font-black uppercase tracking-widest">Booking ID</p>
                         <p className="text-3xl font-black text-accent">KAR-{result.pnr}</p>
                      </div>
                   </div>

                   <div className="text-center mb-12 relative z-10">
                      <div className="text-4xl md:text-6xl font-black font-outfit mb-4">{result.route}</div>
                      <div className="inline-block bg-accent text-primary px-6 py-2 rounded-xl font-black">
                         {result.flight}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-10">
                      {[
                        { icon: Calendar, label: "Travel Date", val: result.date },
                        { icon: Clock, label: "Departure", val: result.time },
                        { icon: User, label: "Passenger", val: result.passenger },
                        { icon: Layout, label: "Seat", val: result.seat },
                        { icon: DoorOpen, label: "Gate", val: result.gate },
                        { icon: Briefcase, label: "Baggage", val: result.baggage },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                           <item.icon className="w-6 h-6 text-accent shrink-0" />
                           <div>
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.label}</p>
                              <p className="font-bold text-sm md:text-base">{item.val}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-wrap gap-4 justify-center relative z-10">
                      <button className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:-translate-y-1">
                         <Check className="w-5 h-5" /> Web Check-in
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl font-bold flex items-center gap-2 border border-white/20 transition-all hover:-translate-y-1">
                         <Download className="w-5 h-5" /> eTicket PDF
                      </button>
                      <button className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-8 py-4 rounded-xl font-bold flex items-center gap-2 border border-rose-500/30 transition-all hover:-translate-y-1">
                         <XCircle className="w-5 h-5" /> Cancel Reservation
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
