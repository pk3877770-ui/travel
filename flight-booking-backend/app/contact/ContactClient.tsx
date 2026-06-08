"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const ContactClient = () => {
  return (
    <main className="bg-[#fafbfe] min-h-screen pt-24 pb-20 font-sans">
      <div className="container max-w-[500px] mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-8 px-2">
          <Link href="/" className="hover:text-[#0A58CA] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-slate-600">Contact Us</span>
        </div>

        {/* Header */}
        <div className="px-2 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Get in Touch</h1>
          <p className="text-sm font-medium text-slate-500">We are here to help you!</p>
        </div>
        
        {/* Contact Details Box */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col gap-8 mb-6">
          
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-[#0A58CA] shrink-0 mt-0.5" strokeWidth={2.5} />
            <div>
              <div className="text-base font-bold text-slate-800 mb-1">Email Us</div>
              <div className="text-sm font-medium text-slate-500">support@flybook.com</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-[#0A58CA] shrink-0 mt-0.5" strokeWidth={2.5} />
            <div>
              <div className="text-base font-bold text-slate-800 mb-1">Call Us</div>
              <div className="text-sm font-medium text-slate-500">+91 98765 43210</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-[#0A58CA] shrink-0 mt-0.5" strokeWidth={2.5} />
            <div>
              <div className="text-base font-bold text-slate-800 mb-1">Office Address</div>
              <div className="text-sm font-medium text-slate-500 leading-relaxed max-w-[200px]">
                123, Travel Street,<br />New Delhi - 110001
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-[#0A58CA] shrink-0 mt-0.5" strokeWidth={2.5} />
            <div>
              <div className="text-base font-bold text-slate-800 mb-1">Working Hours</div>
              <div className="text-sm font-medium text-slate-500">Mon - Sat (9 AM - 7 PM)</div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <button className="w-full bg-[#0A58CA] hover:bg-blue-700 text-white py-3.5 rounded-lg text-sm font-bold shadow-md transition-colors">
          Send Message
        </button>

      </div>
    </main>
  );
};

export default ContactClient;
