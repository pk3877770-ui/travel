"use client";

import React from "react";
import { Shield, Lock, Cookie, Eye, Clock, Globe, Mail, CheckCircle } from "lucide-react";

const PrivacyClient = () => {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-20 text-center text-white px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-6">Privacy Policy</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect and handle your personal data when you book with Karmana.
          </p>
          <div className="bg-white/20 px-6 py-2.5 rounded-full inline-block font-medium">
            Last Updated: April 9, 2026
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
              <Lock className="text-accent w-8 h-8" /> 1. Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Karmana is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our luxury travel concierge services.
            </p>
            <div className="bg-gradient-to-br from-accent to-accent-hover p-8 rounded-2xl border-l-[5px] border-primary text-white">
              <p className="text-xl font-bold mb-0 flex items-center gap-3">
                <CheckCircle className="w-6 h-6" /> Important: We never sell your personal data to third parties!
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
              <Shield className="text-accent w-8 h-8" /> 2. Information We Collect
            </h2>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Personal Information:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Full name, email, phone number",
                  "Passport/ID details (for international travel)",
                  "Payment information (securely encrypted)",
                  "Billing and travel addresses"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="text-accent w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Usage Data:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Travel search history and preferences",
                  "Device and browser information",
                  "IP address and location data",
                  "Website interaction and booking patterns"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="text-accent w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
              <Eye className="text-accent w-8 h-8" /> 3. How We Use Your Data
            </h2>
            <ul className="space-y-4">
              {[
                "Process and confirm your travel bookings",
                "Provide personalized travel recommendations",
                "Deliver exceptional customer support",
                "Improve our services and website experience",
                "Prevent fraud and ensure security"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <CheckCircle className="text-accent w-5 h-5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
              <Cookie className="text-accent w-8 h-8" /> 4. Cookies & Tracking
            </h2>
            <p className="text-slate-600">We use cookies and similar technologies to enhance your experience:</p>
            
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-5 font-semibold">Cookie Type</th>
                    <th className="p-5 font-semibold">Purpose</th>
                    <th className="p-5 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-50">
                  <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                    <td className="p-5 font-medium text-primary">Essential</td>
                    <td className="p-5 text-slate-600">Website functionality</td>
                    <td className="p-5 text-slate-600">Session</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                    <td className="p-5 font-medium text-primary">Analytics</td>
                    <td className="p-5 text-slate-600">Usage tracking</td>
                    <td className="p-5 text-slate-600">2 years</td>
                  </tr>
                  <tr className="hover:bg-slate-100 transition-colors">
                    <td className="p-5 font-medium text-primary">Marketing</td>
                    <td className="p-5 text-slate-600">Personalized offers</td>
                    <td className="p-5 text-slate-600">90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-primary">
              <p className="font-bold text-primary">Cookie Settings: <span className="font-normal text-slate-600">You can manage cookies through your browser settings.</span></p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
              <Lock className="text-accent w-8 h-8" /> 5. Data Security
            </h2>
            <ul className="space-y-4">
              {[
                "256-bit SSL encryption for all data transmission",
                "PCI DSS compliant payment processing",
                "Regular security audits and monitoring",
                "GDPR and data protection law compliance"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <CheckCircle className="text-accent w-5 h-5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
                <Shield className="text-accent w-8 h-8" /> 6. Your Rights
              </h2>
              <ul className="space-y-3">
                {["Access data", "Request deletion", "Opt-out marketing", "Data portability"].map((right, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="text-accent w-5 h-5 shrink-0" /> {right}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
                <Clock className="text-accent w-8 h-8" /> 7. Retention
              </h2>
              <div className="space-y-3 text-slate-600">
                <p><strong>Booking data:</strong> 7 years</p>
                <p><strong>Marketing data:</strong> Until unsubscribe</p>
                <p><strong>Analytics data:</strong> Max 2 years</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-outfit text-primary flex items-center gap-4 pb-4 border-b-3 border-accent">
              <Mail className="text-accent w-8 h-8" /> 8. Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-slate-600 mb-2">For privacy-related questions:</p>
                <a href="mailto:privacy@karmana.com" className="text-primary font-bold hover:text-accent transition-colors">privacy@karmana.com</a>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-lg mb-2">Global HQ</h3>
                <p className="text-slate-600">World Trade Center, Cuffe Parade, Mumbai, 400005</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">Questions? Contact Our Privacy Team</h2>
          <p className="text-xl opacity-90 mb-10">24/7 privacy support and data protection assistance available</p>
          <a 
            href="mailto:privacy@karmana.com" 
            className="inline-block bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
          >
            Contact Privacy Team
          </a>
        </div>
      </section>
    </main>
  );
};

export default PrivacyClient;
