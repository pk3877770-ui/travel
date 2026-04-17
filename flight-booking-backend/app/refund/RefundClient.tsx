"use client";

import React, { useState } from "react";
import { CreditCard, Globe, Settings, FileText, Phone, MessageSquare, Mail, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const RefundClient = () => {
  const [activeTab, setActiveTab] = useState("domestic");

  const tabs = [
    { id: "domestic", label: "Domestic Flights", icon: <Globe className="w-4 h-4" /> },
    { id: "international", label: "International", icon: <Globe className="w-4 h-4" /> },
    { id: "process", label: "Refund Process", icon: <Settings className="w-4 h-4" /> },
    { id: "status", label: "Track Status", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-24 px-6 font-inter">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <section className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-[2rem] p-12 text-center shadow-xl shadow-slate-200/50">
          <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent/20">
            <CreditCard className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-outfit text-primary mb-6 italic tracking-tight">Refund Policy</h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Understand refund rules, fees, and processing times. Transparent policy across all luxury flight bookings.
          </p>
        </section>

        {/* Policy Content */}
        <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap bg-gradient-to-br from-primary to-accent p-2 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 min-w-[160px] py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all",
                  activeTab === tab.id 
                    ? "bg-white text-primary shadow-lg scale-[1.02]" 
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-10 md:p-16">
            {activeTab === "domestic" && (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="space-y-8">
                  <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4">
                    <span className="text-accent underline decoration-accent/20">Domestic</span> Flight Refunds
                  </h2>
                  <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Cancellation Time</th>
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Refundable Fare</th>
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Cancellation Fee</th>
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Processing Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { time: "24+ hours before", fare: "95% of base fare", fee: "₹1,500 or 10%", pTime: "7-10 days" },
                          { time: "12-24 hours before", fare: "75% of base fare", fee: "₹2,500 or 15%", pTime: "7-10 days" },
                          { time: "3-12 hours before", fare: "50% of base fare", fee: "₹3,500 or 25%", pTime: "10-12 days" },
                          { time: "0-3 hours before", fare: "Non-refundable", fee: "100% fee", pTime: "No refund" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                            <td className="p-6 font-bold text-primary group-hover:text-accent transition-colors">{row.time}</td>
                            <td className="p-6 text-slate-600 font-medium">{row.fare}</td>
                            <td className="p-6 text-slate-600 font-medium">{row.fee}</td>
                            <td className="p-6 text-slate-600 font-semibold text-accent">{row.pTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-gradient-to-r from-accent/10 to-transparent p-6 rounded-2xl border-l-[6px] border-accent flex items-start gap-4">
                    <Info className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <p className="font-bold text-primary">
                      Pro Tip: <span className="font-normal text-slate-600">Cancel early for maximum refundable fare on domestic flights. 24 hours se pehle cancel karne par best refund milta hai!</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "international" && (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="space-y-8">
                  <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4">
                    <span className="text-accent underline decoration-accent/20">International</span> Flight Refunds
                  </h2>
                  <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Cancellation Time</th>
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Refundable Fare</th>
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Cancellation Fee</th>
                          <th className="p-6 font-bold uppercase text-xs tracking-widest">Processing Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { time: "48+ hours before", fare: "90% of base fare", fee: "$25 or 12%", pTime: "10-15 days" },
                          { time: "24-48 hours before", fare: "70% of base fare", fee: "$40 or 20%", pTime: "10-15 days" },
                          { time: "12-24 hours before", fare: "50% of base fare", fee: "$60 or 30%", pTime: "12-18 days" },
                          { time: "Less than 12 hrs", fare: "Non-refundable", fee: "100% fee", pTime: "No refund" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                            <td className="p-6 font-bold text-primary group-hover:text-accent transition-colors">{row.time}</td>
                            <td className="p-6 text-slate-600 font-medium">{row.fare}</td>
                            <td className="p-6 text-slate-600 font-medium">{row.fee}</td>
                            <td className="p-6 text-slate-600 font-semibold text-accent">{row.pTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "process" && (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="space-y-12">
                  <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4">
                    Refund <span className="text-accent underline decoration-accent/20">Process</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { step: "1️⃣", title: "Cancel Ticket", detail: "My Bookings → Select → Cancel → Confirm" },
                      { step: "2️⃣", title: "Refund Initiated", detail: "Refund request airline ko forward (24 hrs mein)" },
                      { step: "3️⃣", title: "Money Credited", detail: "Original payment method mein (7-15 days)" },
                    ].map((step, i) => (
                      <div key={i} className="bg-slate-50 rounded-[2rem] p-10 text-center border border-slate-100 group hover:bg-primary transition-all duration-500 hover:-translate-y-2">
                        <div className="text-5xl mb-6 group-hover:scale-125 transition-transform">{step.step}</div>
                        <h3 className="text-xl font-black font-outfit mb-4 group-hover:text-accent underline decoration-accent/20">{step.title}</h3>
                        <p className="text-slate-500 group-hover:text-white/80 transition-colors font-medium">{step.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 flex items-center gap-4">
                    <CheckCircle className="w-8 h-8 text-primary shrink-0" />
                    <p className="font-bold text-primary text-lg">
                      Eligible Refunds: <span className="font-medium text-slate-600">Refundable tickets only | No name changes | Medical emergency proof required.</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "status" && (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="space-y-12">
                  <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4">
                    Track <span className="text-accent underline decoration-accent/20">Status</span>
                  </h2>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <span className="px-6 py-2.5 bg-yellow-400/20 text-yellow-700 rounded-full font-bold border border-yellow-400/30">Processing (5 days)</span>
                    <span className="px-6 py-2.5 bg-green-500/20 text-green-700 rounded-full font-bold border border-green-500/30">Refund Completed</span>
                    <span className="px-6 py-2.5 bg-red-500/20 text-red-700 rounded-full font-bold border border-red-500/30">Refund Rejected</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { icon: "🔍", title: "Track Refund", label: "Booking ID se live status check kariye" },
                      { icon: "📄", title: "Refund Receipt", label: "Download refund details PDF" },
                      { icon: "📞", title: "Refund Support", label: "24/7 dedicated helpline" },
                    ].map((action, i) => (
                      <div key={i} className="bg-gradient-to-br from-primary to-primary-light p-10 rounded-[2rem] text-center text-white shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-white/10 group">
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{action.icon}</div>
                        <h3 className="text-xl font-black font-outfit mb-2 text-accent italic">{action.title}</h3>
                        <p className="text-white/70 font-medium">{action.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[3rem] p-12 text-white shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black font-outfit mb-4 italic tracking-tight">Refund Problem?</h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium">Immediate help available 24/7. Don't worry, we're here to help.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/15 backdrop-blur-md rounded-[2.5rem] p-8 text-center border border-white/20 flex flex-col items-center group hover:bg-white transition-all duration-500">
              <Phone className="w-12 h-12 text-white group-hover:text-accent mb-6" />
              <h3 className="text-xl font-black font-outfit mb-4 group-hover:text-primary transition-colors">Refund Helpline</h3>
              <p className="text-lg font-bold group-hover:text-primary transition-colors">+91 1800-419-XXXX</p>
              <span className="text-sm opacity-80 group-hover:text-slate-500 transition-colors mt-2">24x7 Available</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-[2.5rem] p-8 text-center border border-white/20 flex flex-col items-center group hover:bg-white transition-all duration-500">
              <MessageSquare className="w-12 h-12 text-white group-hover:text-accent mb-6" />
              <h3 className="text-xl font-black font-outfit mb-4 group-hover:text-primary transition-colors">WhatsApp</h3>
              <p className="text-lg font-bold group-hover:text-primary transition-colors">+91 98765-XXXXX</p>
              <span className="text-sm opacity-80 group-hover:text-slate-500 transition-colors mt-2">Instant Reply</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-[2.5rem] p-8 text-center border border-white/20 flex flex-col items-center group hover:bg-white transition-all duration-500">
              <Mail className="w-12 h-12 text-white group-hover:text-accent mb-6" />
              <h3 className="text-xl font-black font-outfit mb-4 group-hover:text-primary transition-colors">Email</h3>
              <p className="text-lg font-bold group-hover:text-primary transition-colors">refund@karmana.com</p>
              <span className="text-sm opacity-80 group-hover:text-slate-500 transition-colors mt-2">Reply in 2 hrs</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RefundClient;
