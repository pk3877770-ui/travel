"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, CreditCard, Plane, Briefcase, ChevronDown, Phone, MessageSquare, Mail, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const helpCategories = [
  { icon: Calendar, title: "Booking & Cancellation", desc: "Ticket booking, cancellation, date changes", count: "12 Articles" },
  { icon: CreditCard, title: "Payment & Refund", desc: "Payment issues, refund status, wallet problems", count: "8 Articles" },
  { icon: Plane, title: "Flight Status", desc: "Live flight tracking, delays, gate information", count: "6 Articles" },
  { icon: Briefcase, title: "Baggage & Check-in", desc: "Baggage allowance, web check-in, airport guide", count: "10 Articles" },
];

const faqs = [
  {
    question: "How do I cancel my ticket?",
    answer: "Go to \"My Bookings\" with your booking ID → Select cancel option → Refund process will begin automatically.",
  },
  {
    question: "How long does refund take?",
    answer: "Domestic flights: 7-10 working days. International flights: 10-15 working days. You can check the current status on our Refund Status tracking page.",
  },
  {
    question: "When does web check-in start?",
    answer: "Web check-in is typically available 48 hours before departure. We recommend completing it as early as possible to secure your preferred seating.",
  },
  {
    question: "How to check PNR status?",
    answer: "Use the \"Track PNR\" option on our homepage or enter your PNR in the dedicated inquiry section of our app for real-time status updates.",
  },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-24">
      {/* Hero Header */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-[100px] -ml-20 -mt-20" />
        </div>
        <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-black font-outfit mb-6">How can we <span className="text-accent">help?</span></h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Get comprehensive support for your Karmana bookings. Find answers to flights, payments, and premium services.
            </p>

            {/* Premium Search Box */}
            <div className="max-w-2xl mx-auto relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors w-6 h-6" />
              <input
                type="text"
                placeholder="Search for help articles (e.g. refund status)..."
                className="w-full bg-white dark:bg-slate-800 border-none py-6 pl-16 pr-8 rounded-full text-primary dark:text-white text-lg shadow-2xl focus:ring-4 focus:ring-accent/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent text-primary p-3 rounded-full hover:bg-accent-hover transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center hover:bg-white dark:hover:bg-slate-800 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 group"
              >
                <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors">
                  <cat.icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold font-outfit mb-2">{cat.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{cat.desc}</p>
                <span className="bg-accent/10 text-accent text-xs font-black py-2 px-4 rounded-full uppercase tracking-widest group-hover:bg-accent group-hover:text-primary transition-colors">
                  {cat.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-outfit mb-4">Common Questions</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="text-xl font-bold font-outfit pr-8">{faq.question}</span>
                  <ChevronDown className={cn("w-6 h-6 text-accent transition-transform", openFaq === idx && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-slate-500 dark:text-slate-400 leading-relaxed text-lg border-t border-slate-50 dark:border-slate-700 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Channels Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-black font-outfit mb-6">Still need help?</h2>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto">24/7 dedicated travel support is available across all global regions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: "Customer Care", val: "+91 (22) 6789 0123", action: "Call Now", link: "tel:+912267890123" },
              { icon: MessageSquare, title: "Live Chat", val: "Available Now", action: "Start Chat", link: "#" },
              { icon: Mail, title: "Email Support", val: "concierge@karmana.com", action: "Send Email", link: "mailto:concierge@karmana.com" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[2.5rem] text-center text-white flex flex-col items-center group hover:bg-white/20 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-outfit mb-2">{item.title}</h3>
                <p className="text-slate-300 mb-8">{item.val}</p>
                <a href={item.link} className="bg-white text-primary px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-accent transition-colors">
                  {item.action}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
