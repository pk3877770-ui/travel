"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import FeaturedOffers from "@/components/FeaturedOffers";
import ExperienceKarmana from "@/components/ExperienceKarmana";
import { Send, CheckCircle2, Loader2, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus("loading");
  //   // Emulated API call
  //   setTimeout(() => {
  //     setStatus("success");
  //     setEmail("");
  //   }, 1500);
  // };
  // ✅ REAL API CONNECTED VERSION
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email) return;

  setStatus("loading");

  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      alert(data.message || "Something went wrong");
      setStatus("idle");
    }
  } catch (error) {
    alert("Server error");
    setStatus("idle");
  }
};

  return (
    <main className="min-h-screen">
      <Hero />
      <SearchSection />
      
      <div className="bg-white dark:bg-slate-950">
        <FeaturedOffers />
        <ExperienceKarmana />
        
        {/* Newsletter Section */}
        <section id="newsletter" className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[100px] -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-[100px] -ml-20 -mb-20" />
          </div>
          
          <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-white text-4xl md:text-5xl font-black font-outfit mb-6">
              Join the Karmana <span className="text-gradient">Elite</span>
            </h2>
            <p className="text-slate-300 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-inter">
              Subscribe to our private list for secret deals, luxury travel tips, and early access to our most exclusive signature journeys.
            </p>
            
            <div className="max-w-lg mx-auto relative h-20">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-accent/20 backdrop-blur-xl rounded-full border border-accent/30 text-accent font-bold gap-2"
                  >
                    <div className="flex items-center gap-3 text-xl">
                      <CheckCircle2 className="w-6 h-6" /> Welcome to the Elite!
                    </div>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-white/60 text-xs hover:text-white uppercase tracking-widest transition-colors font-medium"
                    >
                      Subscribe another email
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 w-full"
                  >
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-full text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all font-medium"
                    />
                    <button 
                      disabled={status === "loading"}
                      className="bg-accent hover:bg-accent-hover text-primary px-10 py-5 rounded-full font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-70 min-w-[180px]"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" /> Join Today
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
