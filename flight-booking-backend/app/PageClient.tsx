"use client";

import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import FeaturedOffers from "@/components/FeaturedOffers";
import ExperienceKarmana from "@/components/ExperienceKarmana";
import { Send } from "lucide-react";

export default function Home() {
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
            
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-fill text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all rounded-full"
              />
              <button className="bg-accent hover:bg-accent-hover text-primary px-10 py-5 rounded-full font-black text-lg transition-all hover:-translate-y-1 shadow-2xl shadow-accent/20 flex items-center justify-center gap-3">
                <Send className="w-5 h-5" /> Join Today
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
