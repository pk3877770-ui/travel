"use client";

import React, { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mail, Phone, MapPin, Send, Headset, Landmark, Loader2 } from "lucide-react";

const ContactClient = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || ""
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white">
      {/* Inner Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="container relative z-20 text-center px-6">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
          <div className="animate-fade-in-up">
            <span className="inline-block bg-accent text-primary px-4 py-1.5 mb-6 rounded-full font-bold text-sm">
              ALWAYS AVAILABLE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white font-outfit leading-tight mb-4">
              Connect with the <span className="text-accent underline decoration-accent/30">Elite</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 md:p-12 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-primary mb-6">Send an Inquiry</h2>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Provide your details and a brief description of your travel requirements. A personal concierge will contact you within the hour.
              </p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className="w-full bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all" 
                      placeholder="e.g. Alexander Vance" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all" 
                      placeholder="e.g. alex@vance.com" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                  <select name="subject" className="w-full bg-white text-slate-900 border border-slate-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none cursor-pointer">
                    <option>Bespoke Journey Consultation</option>
                    <option>Boutique Hotel Inquiry</option>
                    <option>Private Aviation Request</option>
                    <option>Corporate Travel Services</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detailed Message</label>
                  <textarea 
                    name="message"
                    className="w-full bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all min-h-[180px] resize-none" 
                    placeholder="Tell us about your dream destination..."
                    required
                  ></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent-dark text-primary font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-accent/20 disabled:opacity-70 disabled:hover:translate-y-0">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </button>
                {success && (
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold border border-emerald-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Your inquiry has been sent to our concierge team.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Details */}
            <div className="lg:pl-10 flex flex-col justify-center">
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4">GLOBAL CONCIERGE</span>
              <h2 className="text-4xl md:text-5xl font-black font-outfit text-primary mb-8 leading-tight">Exquisite Support 24/7</h2>
              <p className="text-slate-600 mb-12 text-lg leading-relaxed">
                Our global network ensures that no matter where you are in the world, Karmana's excellence is just a communication away.
              </p>
              
              <div className="space-y-10 group">
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:scale-110 transition-transform">
                    <Headset className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl font-outfit text-primary">Live Assistance</h4>
                    <p className="text-slate-500 mb-1">24/7 Global Concierge Hotline</p>
                    <a href="tel:+912267890123" className="text-primary font-black text-lg hover:text-accent transition-colors">+91 (22) 6789 0123</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl font-outfit text-primary">Elite Correspondence</h4>
                    <p className="text-slate-500 mb-1">Direct Digital Channels</p>
                    <a href="mailto:concierge@karmana.com" className="text-primary font-black text-lg hover:text-accent transition-colors">concierge@karmana.com</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:scale-110 transition-transform">
                    <Landmark className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl font-outfit text-primary">Global HQ</h4>
                    <p className="text-slate-500 mb-1">World Trade Center, Mumbai</p>
                    <p className="text-slate-600 font-medium">Personal meetings available by invitation only.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto overflow-hidden shadow-2xl rounded-[3rem] h-[450px] border border-slate-100 relative">
           <iframe 
            src="https://maps.google.com/maps?q=World%20Trade%20Center%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            loading="lazy" 
            className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default ContactClient;
