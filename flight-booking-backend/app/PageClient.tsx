"use client";

import React from "react";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import FeaturedOffers from "@/components/FeaturedOffers";
import ExperienceKarmana from "@/components/ExperienceKarmana";
import { Send, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [newsletterStatus, setNewsletterStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Hero />
      <SearchSection />
      
      <div className="relative overflow-hidden space-y-40 mb-40">
        <FeaturedOffers />
        <ExperienceKarmana />
        
        {/* Newsletter Section - The Sovereign List */}
        <section id="newsletter" className="py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-primary-dark -z-10" />
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-accent rounded-full blur-[160px] animate-pulse-slow" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
          </div>
          
          <div className="container max-w-5xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 px-6 py-2 rounded-full mb-8 relative z-10">
                <Crown className="w-4 h-4 text-accent" />
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">The Sovereign List</span>
              </div>

              <h2 className="text-white text-5xl md:text-7xl font-black font-outfit mb-8 tracking-tighter leading-tight relative z-10">
                Join the <span className="shimmer-text italic">Karmana Elite</span>
              </h2>
              
              <p className="text-slate-400 text-xl mb-14 max-w-2xl mx-auto leading-relaxed font-medium opacity-80 relative z-10">
                Subscribe to our private network for secret itineraries, luxury aviation insights, and priority access to our signature journeys.
              </p>
              
              <div className="max-w-2xl mx-auto relative z-10">
                {newsletterStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 bg-accent/10 border border-accent/20 rounded-[2rem] text-center"
                  >
                    <Sparkles className="w-12 h-12 text-accent mx-auto mb-4 animate-pulse" />
                    <h3 className="text-3xl font-black text-white mb-2">Welcome to the Elite</h3>
                    <p className="text-slate-400">Your invitation has been accepted. Expect our first transmission shortly.</p>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                      
                      setNewsletterStatus("loading");

                      try {
                        const res = await fetch("/api/newsletter", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }),
                        });
                        const data = await res.json();
                        if (data.success) {
                          setNewsletterStatus("success");
                          form.reset();
                        } else {
                          setNewsletterStatus("error");
                          setTimeout(() => setNewsletterStatus("idle"), 3000);
                        }
                      } catch (err) {
                        setNewsletterStatus("error");
                        setTimeout(() => setNewsletterStatus("idle"), 3000);
                      }
                    }}
                    className="flex flex-col md:flex-row gap-4 w-full"
                  >
                    <div className="flex-1 relative group">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Your elite email address"
                        required
                        disabled={newsletterStatus === "loading"}
                        className="w-full bg-white/5 border border-white/10 px-10 py-6 rounded-[2rem] text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold text-lg disabled:opacity-50"
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={newsletterStatus === "loading"}
                      className="bg-accent hover:bg-accent-hover text-primary-dark px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-accent/20 flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {newsletterStatus === "loading" ? (
                        <Sparkles className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {newsletterStatus === "loading" ? "Verifying..." : "Request Access"}
                    </motion.button>
                  </form>
                )}
                
                {newsletterStatus === "error" && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-red-400 font-bold text-sm"
                  >
                    Access denied. Please check your credentials.
                  </motion.p>
                )}

                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-accent" /> Non-Disclosure Agreement Applies
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
