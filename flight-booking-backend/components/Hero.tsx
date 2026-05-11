"use client";

import React from "react";
import { Compass, Play, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-40 md:pt-52 pb-20 md:pb-32 overflow-hidden mesh-gradient">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-primary-dark/80 to-primary-dark z-10" />
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=80"
            alt="Karmana Luxury Private Jet Aviation - Sovereign Excellence Travel"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-3xl border border-white/10 px-4 md:px-6 py-2 md:py-3 rounded-2xl mb-8 md:mb-12 shadow-2xl">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent animate-pulse" />
              <span className="text-white font-black text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase">
                The Sovereign Standard
              </span>
            </div>

            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-[1] md:leading-[0.75] mb-8 md:mb-14 tracking-tighter">
              Sovereign <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-rose-500 italic font-medium pr-6">
                Excellence
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-3xl text-slate-300 mb-12 md:mb-20 leading-relaxed max-w-3xl font-medium opacity-80">
              Beyond standard travel. We engineer bespoke aviation experiences and private itineraries for the world's most discerning voyagers.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent text-primary-dark px-10 md:px-16 py-6 md:py-8 rounded-[2rem] md:rounded-[2.5rem] font-black text-sm md:text-base uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all shadow-[0_30px_70px_-10px_rgba(245,158,11,0.6)] group w-full sm:w-auto"
              >
                <Compass className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-180 transition-transform duration-700" />
                Initialize Search
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-3xl border border-white/10 text-white px-10 md:px-16 py-6 md:py-8 rounded-[2rem] md:rounded-[2.5rem] font-black text-sm md:text-base uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all hover:bg-white/10 w-full sm:w-auto"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/20 flex items-center justify-center">
                  <Play className="w-6 h-6 md:w-7 md:h-7 fill-accent text-accent" />
                </div>
                The Experience
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating UI Elements - Hidden on mobile for better focus */}
      <div className="absolute bottom-20 right-20 hidden lg:block z-30">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3.5rem] shadow-2xl"
        >
          <div className="flex items-center gap-5 mb-5">
            <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center">
              <Crown className="w-7 h-7 text-accent" />
            </div>
            <div>
              <div className="text-[13px] font-black text-slate-500 uppercase tracking-widest">Active Leads</div>
              <div className="text-4xl font-black text-white tracking-tighter">4,290+</div>
            </div>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "85%" }}
              transition={{ duration: 2.5, delay: 1 }}
              className="h-full bg-accent shadow-[0_0_15px_#f59e0b]"
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 md:h-96 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent z-10" />
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <div className="w-7 h-11 md:w-8 md:h-12 rounded-full border-2 border-white/20 flex justify-center p-2.5">
          <motion.div 
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 md:w-1.5 h-2.5 md:h-3 bg-accent rounded-full" 
          />
        </div>
      </motion.div>
    </section>

  );
};

export default Hero;
