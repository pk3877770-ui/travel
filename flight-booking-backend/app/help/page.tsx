"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Plane, 
  Ticket, 
  RefreshCcw, 
  Luggage, 
  ArrowRight, 
  ChevronRight,
  PlaneTakeoff,
  Sofa,
  Briefcase,
  UserCheck,
  CreditCard,
  Repeat,
  Wallet,
  Award,
  FileText,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import HelpSidebar from "@/components/HelpSidebar";
import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";


export async function generateMetadata() {
  const seo = await getSEOMetadata("/help");
  return mapSEOToMetadata(seo);
}

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-[#fafbfe] font-sans pb-20">
      
      {/* 1. Hero Section */}
      <div className="relative w-full bg-[#11244e] pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Graphic (Airplane wing overlay) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80" 
            alt="Mountains" 
            fill 
            className="object-cover" 
          />
        </div>
        
        <div className="container max-w-[1000px] mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
            How can we help you?
          </h1>
          <p className="text-lg text-white/80 font-medium mb-10">
            Find answers to all your questions and manage your bookings easily.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-xl flex items-center shadow-lg mb-8 max-w-3xl">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search for help articles, topics or questions..." 
                className="w-full bg-transparent outline-none text-slate-700 text-sm font-medium py-2"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors shadow-sm">
              Search
            </button>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-white/60 font-medium mr-2">Popular Searches:</span>
            {["Cancel Flight", "Refund Status", "Baggage Allowance", "Change Booking", "Check-in"].map((tag, idx) => (
              <Link 
                key={idx} 
                href={`/help?q=${tag.toLowerCase().replace(' ', '+')}`} 
                className="border border-white/20 text-white/90 bg-white/5 hover:bg-white/20 px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            
            {/* Popular Topics */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Popular Topics</h2>
                <Link href="#topics" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View all topics <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <Link href="/help/topic/flight-booking" className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Plane className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Flight Booking</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">Learn about flight reservations, payments and confirmations.</p>
                  <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link href="/help/topic/manage-booking" className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Ticket className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Manage Booking</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">Modify or cancel your bookings, select seats and more.</p>
                  <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link href="/help/topic/refunds" className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <RefreshCcw className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Refunds & Cancellations</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">Check refund status, policies and how cancellations work.</p>
                  <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link href="/help/topic/baggage" className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Luggage className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Baggage Information</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">Learn about baggage allowance, extra baggage and charges.</p>
                  <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

              </div>
            </section>

            {/* Browse Help By Category */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Browse Help By Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Before You Fly", desc: "Travel documents, visas, check-in and more.", icon: PlaneTakeoff, color: "text-blue-600", bg: "bg-blue-50" },
                  { title: "At The Airport", desc: "Airport guide, lounges, security and more.", icon: Sofa, color: "text-indigo-600", bg: "bg-indigo-50" },
                  { title: "Baggage", desc: "Baggage allowance, rules and fees.", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
                  { title: "During Your Flight", desc: "In-flight services, meals, entertainment & more.", icon: UserCheck, color: "text-sky-600", bg: "bg-sky-50" },
                  { title: "Booking & Payments", desc: "Payment methods, failed payments and invoices.", icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
                  { title: "Changes & Cancellations", desc: "Change flight, cancel booking and policies.", icon: Repeat, color: "text-blue-600", bg: "bg-blue-50" },
                  { title: "Refunds", desc: "Refund process, timelines and FAQs.", icon: Wallet, color: "text-blue-600", bg: "bg-blue-50" },
                  { title: "Kramana Rewards", desc: "Earn points, redeem rewards and more.", icon: Award, color: "text-blue-600", bg: "bg-blue-50" },
                ].map((item, idx) => (
                  <Link key={idx} href={`/help/category/${item.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Guides & Policies */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Guides & Policies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Terms & Conditions", desc: "Read our terms and conditions.", icon: FileText },
                  { title: "Privacy Policy", desc: "Learn how we protect your data.", icon: ShieldCheck },
                  { title: "Cancellation Policy", desc: "Understand our cancellation policy.", icon: FileText },
                  { title: "Refund Policy", desc: "Know our refund rules and timelines.", icon: FileText },
                ].map((doc, idx) => (
                  <Link key={idx} href={`/${doc.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                      <doc.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{doc.title}</h4>
                    <p className="text-[10px] text-slate-500 mb-4">{doc.desc}</p>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      View More <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Still Need Help? Banner */}
            <section className="bg-blue-50 rounded-2xl overflow-hidden relative border border-blue-100 flex items-center justify-between p-8 md:p-12">
              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl font-black text-slate-800 mb-2">Still Need Help?</h2>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Our customer support team is here to help you 24/7.
                </p>
                <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm shadow-blue-600/20 text-center">
                  Contact Support
                </Link>
              </div>
              
              {/* Illustration placeholder (using an icon since we don't have the exact illustration) */}
              <div className="hidden md:flex items-center justify-center w-40 h-40 relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
                <div className="relative bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg border border-blue-100">
                  <MessageSquare className="w-10 h-10 text-blue-600" />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border-2 border-white">
                    24/7
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1">
            <HelpSidebar />
          </div>

        </div>
      </div>
    </main>
  );
}
