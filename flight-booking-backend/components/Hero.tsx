"use client";

import React from "react";
import { Compass, Play, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden mesh-gradient">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 via-primary-dark/80 to-primary-dark z-10" />
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=80"
            alt="Luxury Aviation"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-20">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-3xl border border-white/10 px-6 py-3 rounded-2xl mb-12 shadow-2xl">
              <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              <span className="text-white font-black text-[10px] tracking-[0.5em] uppercase">
                The Sovereign Standard
              </span>
            </div>

            <h1 className="text-7xl md:text-[9.5rem] font-black text-white leading-[0.8] mb-12 tracking-tighter">
              Sovereign <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-rose-500 italic font-light pr-4">
                Excellence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-16 leading-relaxed max-w-3xl font-medium opacity-80">
              Beyond standard travel. We engineer bespoke aviation experiences and private itineraries for the world's most discerning voyagers.
            </p>

            <div className="flex flex-wrap gap-8">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent text-primary-dark px-14 py-7 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center gap-4 transition-all shadow-[0_30px_60px_-15px_rgba(245,158,11,0.5)] group"
              >
                <Compass className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                Initialize Search
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-3xl border border-white/10 text-white px-14 py-7 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center gap-4 transition-all hover:bg-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Play className="w-6 h-6 fill-accent text-accent" />
                </div>
                The Experience
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute bottom-20 right-20 hidden xl:block z-30">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Leads</div>
              <div className="text-2xl font-black text-white">4,290+</div>
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "85%" }}
              transition={{ duration: 2, delay: 1 }}
              className="h-full bg-accent"
            />
          </div>
        </motion.div>
      </div>


      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
