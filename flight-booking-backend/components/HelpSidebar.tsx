"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MessageCircle, 
  PhoneCall, 
  Mail, 
  ClipboardList, 
  ChevronRight, 
  ChevronDown,
  ArrowRight
} from "lucide-react";

export default function HelpSidebar() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    { q: "How do I cancel my flight booking?", a: "You can cancel your flight by navigating to Manage Booking, entering your PNR, and clicking the Cancel button." },
    { q: "How can I check my refund status?", a: "Enter your Booking Reference in the Check Your Refund Status box above to see real-time updates." },
    { q: "Can I change my flight date?", a: "Yes, date changes are subject to airline availability and fare differences. Go to Manage Booking to proceed." },
    { q: "What is the baggage allowance?", a: "Baggage allowance varies by airline and fare class. Please check your e-ticket for specific details." },
    { q: "How do I check-in online?", a: "Web check-in opens 48 hours before departure. Visit the airline's website with your PNR to check in." },
    { q: "What happens if my flight is delayed?", a: "We will notify you via email and SMS. In case of significant delays, airlines provide compensation or rebooking." }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Contact Support */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-1">Contact Support</h3>
          <p className="text-xs text-slate-500">Choose the best way to reach us.</p>
        </div>
        
        <div className="flex flex-col">
          <Link href="/contact?mode=chat" className="flex items-center justify-between p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">Live Chat</h4>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Online</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Chat with our support team</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
          </Link>

          <a href="tel:+911234567890" className="flex items-center justify-between p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">Call Us</h4>
                <p className="text-xs font-bold text-slate-700 mt-0.5">+91 1234 567 890</p>
                <p className="text-[10px] text-slate-500">Available 24/7</p>
              </div>
            </div>
          </a>

          <a href="mailto:support@kramana.com" className="flex items-center justify-between p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">Email Us</h4>
                <p className="text-xs font-bold text-slate-700 mt-0.5">support@kramana.com</p>
                <p className="text-[10px] text-slate-500">We usually reply in 2 hours</p>
              </div>
            </div>
          </a>

          <Link href="/contact" className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">Raise a Request</h4>
                <p className="text-xs text-slate-500 mt-0.5">Submit your query and we will get back to you</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
          </Link>
        </div>
      </div>

      {/* Check Refund Status */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-2">Check Your Refund Status</h3>
        <p className="text-xs text-slate-500 mb-6">Enter your booking reference to check refund status.</p>
        
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Enter Booking Reference" 
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm">
            Check Status
          </button>
        </form>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Frequently Asked Questions</h3>
          <Link href="/faqs" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
            View all FAQs <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-slate-50 last:border-b-0">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-bold text-slate-700">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openFaqIndex === index && (
                <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
