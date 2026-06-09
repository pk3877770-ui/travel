"use client";

import React from "react";
import Script from "next/script";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from "lucide-react";



export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "url": "https://www.kramana.com/contact",
        "name": "Contact Us - Kramana",
        "description": "Have a question about your booking, need help planning a trip, or just want to say hello? Our team is here and ready to help."
      },
      {
        "@type": "LocalBusiness",
        "name": "Kramana",
        "image": "https://www.kramana.com/kramana-logo.png",
        "email": "hello@kramana.com",
        "telephone": "+91-800-123-4567",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sandhu Business Center, A-1, Transport Nagar, Subhash Nagar, Sewla Khurd",
          "addressLocality": "Dehradun",
          "addressRegion": "Uttarakhand",
          "postalCode": "248001",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#fafbfe] font-sans pb-20">
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* 1. Hero Header */}
      <div className="bg-slate-900 pt-32 pb-24 px-4 text-center">
        <div className="container max-w-[800px] mx-auto">
          <span className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4 inline-block">
            CONTACT US
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-300 font-medium">
            Have a question about your booking, need help planning a trip, or just want to say hello? Our team is here and ready to help.
          </p>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 -mt-12 relative z-10">
        
        {/* 2. Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Email Address</h2>
            <p className="text-slate-500 mb-4 text-sm">Drop us a line anytime. We usually reply within 24 hours.</p>
            <a href="mailto:hello@kramana.com" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
              hello@kramana.com
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Phone Number</h2>
            <p className="text-slate-500 mb-4 text-sm">Call us directly. Our support team is available 24/7.</p>
            <a href="tel:+918001234567" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
              +91 (800) 123-4567
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-slate-800 text-lg mb-2">Office Address</h2>
            <p className="text-slate-500 mb-4 text-sm">Come visit our headquarters for a cup of coffee.</p>
            <span className="font-bold text-slate-800 text-sm">
              Sandhu Business Center, A-1, Transport Nagar, Subhash Nagar, Dehradun, Sewla Khurd, Uttarakhand 248001
            </span>
          </div>

        </div>

        {/* 3. Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Send us a Message</h2>
            <p className="text-slate-500 mb-8 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help you?" 
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Write your message here..." 
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-600/20">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

          {/* Right: Support Info & Map */}
          <div className="space-y-8">
            
            {/* Customer Support Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" /> Customer Support
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Lightning Fast Replies</h4>
                    <p className="text-slate-500 text-sm mt-1">Our dedicated support team aims to respond to all inquiries within 2 hours during regular business hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Secure Booking Assistance</h4>
                    <p className="text-slate-500 text-sm mt-1">Having trouble completing a payment? We provide priority support for all active checkout sessions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 overflow-hidden h-[300px]">
              <iframe
                title="Office Location Map"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "0.75rem" }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Sandhu%20Business%20Center,%20Dehradun,%20Uttarakhand&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
