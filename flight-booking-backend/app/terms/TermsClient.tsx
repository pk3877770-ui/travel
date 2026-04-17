"use client";

import React, { useState } from "react";
import { Scroll, Plane, CreditCard, Ban, Gavel, UserCheck, Lock, Globe, Check } from "lucide-react";

const TermsClient = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="bg-white font-inter">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-24 text-center text-white px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black font-outfit mb-6 italic tracking-tight">Terms of Service</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Read our terms and conditions for luxury travel bookings and concierge services. By using Karmana, you agree to these terms.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="bg-white/15 backdrop-blur-md px-6 py-2.5 rounded-full font-bold border border-white/10">Effective: April 9, 2026</div>
            <div className="bg-white/15 backdrop-blur-md px-6 py-2.5 rounded-full font-bold border border-white/10">Version: 3.0</div>
            <div className="bg-white/15 backdrop-blur-md px-6 py-2.5 rounded-full font-bold border border-white/10">Governing Law: India</div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4 pb-4 border-b-4 border-accent italic">
              <Scroll className="text-accent w-8 h-8" /> 1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              By accessing and using Karmana's luxury travel concierge services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <div className="bg-orange-50 p-8 rounded-3xl border-l-[6px] border-accent shadow-sm">
              <h3 className="text-xl font-black font-outfit text-primary mb-4 italic tracking-tight">⚠️ Important Notice</h3>
              <p className="text-primary/80 font-bold mb-0">You must be 18 years or older to use our services. Minors require parental supervision.</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4 pb-4 border-b-4 border-accent italic">
              <Plane className="text-accent w-8 h-8" /> 2. Booking Terms
            </h2>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-black font-outfit text-primary italic">2.1 Booking Confirmation</h3>
              <ul className="space-y-4">
                {[
                  "Bookings are confirmed upon successful payment",
                  "E-tickets are sent via email and SMS",
                  "PNR generation may take 5-10 minutes"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-600 font-medium">
                    <Check className="text-accent w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black font-outfit text-primary italic">2.2 Cancellation Policy</h3>
              <ul className="space-y-4">
                {[
                  "Free cancellation: 24 hours before departure",
                  "Cancellation fee: ₹500 - ₹3000 (depending on fare type)",
                  "Refund processing: 7-15 working days"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-600 font-medium">
                    <Check className="text-accent w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4 pb-4 border-b-4 border-accent italic">
              <CreditCard className="text-accent w-8 h-8" /> 3. Payment Terms
            </h2>
            <p className="text-slate-600 text-lg font-medium">All payments are processed through secure payment gateways:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Credit/Debit cards accepted",
                "UPI, Netbanking, Wallets",
                "3D Secure authentication",
                "Convenience fees apply"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-600 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Check className="text-accent w-5 h-5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="bg-slate-900 text-white p-8 rounded-3xl border-l-[6px] border-accent shadow-xl">
              <h3 className="text-xl font-black font-outfit mb-4 text-accent italic tracking-tight">💳 Payment Safety</h3>
              <p className="opacity-80 font-bold mb-0">PCI DSS Level 1 compliant. We never store your card details on our servers.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4 pb-4 border-b-4 border-accent italic">
              <Ban className="text-accent w-8 h-8" /> 4. Prohibited Activities
            </h2>
            <p className="text-red-600 font-black uppercase tracking-wider mb-6">The following activities are strictly prohibited:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Creating multiple accounts",
                "Making fake bookings",
                "Automated scraping or bots",
                "Cancellation abuse",
                "Unauthorized resale"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-red-50 text-red-700 font-bold border border-red-100">
                  <Ban className="w-5 h-5" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black font-outfit text-primary flex items-center gap-4 pb-4 border-b-4 border-accent italic">
              <Gavel className="text-accent w-8 h-8" /> 5. Liability
            </h2>
            <div className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] space-y-4">
               <p className="text-slate-600 font-bold italic">Karmana acts as a booking facilitator only:</p>
               <ul className="space-y-3">
                  {["Not responsible for airline delays", "Not liable for weather issues", "Limited to booking amount"].map((point, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-500 font-medium">
                       <Check className="text-accent w-5 h-5" /> {point}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-black font-outfit text-primary flex items-center gap-4 pb-2 border-b-2 border-accent italic">
                <UserCheck className="text-accent w-6 h-6" /> 6. Duties
              </h2>
              <p className="text-slate-600 text-sm font-bold">Provide accurate info, carry ID, follow baggage rules, and meet check-in deadlines.</p>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-black font-outfit text-primary flex items-center gap-4 pb-2 border-b-2 border-accent italic">
                <Lock className="text-accent w-6 h-6" /> 7. Accounts
              </h2>
              <p className="text-slate-600 text-sm font-bold">Security is your responsibility. Report issues. Inactive accounts may be deleted.</p>
            </div>
          </div>

          <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center space-y-4">
            <h2 className="text-2xl font-black font-outfit text-primary flex items-center justify-center gap-4 italic underline decoration-accent/20">
              <Globe className="text-accent w-8 h-8" /> Contact & Law
            </h2>
            <p className="text-slate-600 font-bold italic">Governing Law: Indian laws. Mumbai courts jurisdiction.</p>
            <p className="text-primary font-black text-lg">concierge@karmana.com | +91 (22) 6789 0123</p>
          </div>
        </div>
      </section>

      {/* Acceptance Section */}
      <section className="bg-primary py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-black font-outfit italic tracking-tight">Accept the Terms</h2>
          <p className="text-xl opacity-80 font-medium max-w-xl mx-auto">Please confirm that you have read and agree to our policies before continuing with your booking.</p>
          
          <div className="flex flex-col items-center gap-8">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div 
                className={`w-10 h-10 rounded-xl border-4 transition-all flex items-center justify-center ${
                  agreed ? "bg-accent border-accent scale-110 shadow-lg shadow-accent/40" : "bg-white/10 border-white/20 hover:border-white"
                }`}
                onClick={() => setAgreed(!agreed)}
              >
                {agreed && <Check className="w-6 h-6 text-primary stroke-[4]" />}
              </div>
              <span className="text-lg font-bold group-hover:text-accent transition-colors">
                I accept the <span className="underline decoration-accent/30 italic">Terms of Service</span> and <span className="underline decoration-accent/30 italic">Privacy Policy</span>
              </span>
            </label>
            
            <button 
              className={`px-12 py-5 rounded-full font-black text-lg transition-all transform ${
                agreed ? "bg-accent text-primary shadow-2xl hover:-translate-y-1 active:scale-95" : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
              }`}
              disabled={!agreed}
            >
              Continue with Karmana
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsClient;
