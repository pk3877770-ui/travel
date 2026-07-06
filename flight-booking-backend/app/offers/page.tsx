"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Plane, CreditCard, BedDouble, Tag, Copy, Check, Sparkles, Loader2 } from "lucide-react";

const themes: Record<string, { bg: string; border: string; text: string; chip: string; icon: any }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", chip: "bg-blue-100 text-blue-700", icon: Plane },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", chip: "bg-amber-100 text-amber-700", icon: Plane },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", chip: "bg-purple-100 text-purple-700", icon: Tag },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", chip: "bg-emerald-100 text-emerald-700", icon: CreditCard },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600", chip: "bg-indigo-100 text-indigo-700", icon: CreditCard },
  rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-600", chip: "bg-rose-100 text-rose-700", icon: CreditCard },
  teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600", chip: "bg-teal-100 text-teal-700", icon: BedDouble },
};

const themeKeys = Object.keys(themes);

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers");
        const data = await res.json();
        if (data.success) {
          setOffers(data.offers);
        }
      } catch (err) {
        console.error("Failed to fetch offers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white font-sans">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mt-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-accent-light text-primary rounded-full px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Exclusive Deals
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Best Offers for You</h1>
          <p className="text-slate-500 text-base font-medium">Grab the best deals and discounts on your next booking</p>
        </div>

        {/* Offer Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">
            No active offers at the moment. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {offers.map((offer, idx) => {
              // Assign a stable pseudo-random theme based on index
              const t = themes[themeKeys[idx % themeKeys.length]];
              const Icon = t.icon;
              const copied = copiedId === offer._id;
              
              const validTill = new Date(offer.validUntil).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

              return (
                <div
                  key={offer._id}
                  className={cn(
                    "group relative rounded-2xl p-7 flex flex-col border border-dashed shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg",
                    t.bg,
                    t.border
                  )}
                >
                  {/* Top row: icon + discount chip */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={cn("w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm", t.text)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={cn("text-xs font-black px-3 py-1 rounded-full", t.chip)}>{offer.discountPercentage}% OFF</span>
                  </div>

                  <h3 className={cn("text-2xl font-black tracking-wide mb-4", t.text)}>{offer.code}</h3>

                  <div className="flex flex-col gap-2 flex-1 mb-6">
                    <div className="text-sm font-bold text-slate-800">{offer.title}</div>
                    {offer.description && <div className="text-sm font-medium text-slate-500">{offer.description}</div>}
                    <div className="text-xs font-medium text-slate-400 mt-1">Valid till {validTill}</div>
                  </div>

                  <button
                    onClick={() => handleCopy(offer._id, offer.code)}
                    className={cn(
                      "w-full bg-white border py-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md active:scale-95",
                      t.border,
                      copied ? "text-green-600 border-green-300" : t.text
                    )}
                  >
                    {copied ? (
                      <><Check className="w-4 h-4" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Code</>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Newsletter Section */}
        <div className="bg-linear-to-r from-[#e0f2fe] to-[#ccfbf1] rounded-3xl p-10 md:p-14 text-center shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Get Exclusive Offers in Your Inbox</h2>
          <p className="text-slate-600 text-sm md:text-base font-medium mb-8">Subscribe to our newsletter and never miss any deals!</p>

          <div className="max-w-md mx-auto bg-white rounded-xl p-2 flex shadow-sm border border-slate-100">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-medium text-slate-700"
            />
            <button className="bg-[#0A58CA] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
