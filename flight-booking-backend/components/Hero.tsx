"use client";

import React from "react";
import Image from "next/image";
import { Compass, Play, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden mesh-gradient">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-primary-dark/80 to-primary-dark z-10" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 opacity-60"
        >
          <Image
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=80"
            alt="Kramana Luxury Private Jet Aviation - Sovereign Excellence Travel"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-4xl">
          {/* Badge — decorative, can animate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-3xl border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl mb-5 md:mb-7 shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span className="text-white font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase">
                The Sovereign Standard
              </span>
            </div>
          </motion.div>

          {/* LCP elements — rendered immediately, no opacity:0 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] md:leading-[0.9] mb-5 md:mb-8 tracking-tighter">
            Sovereign <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-rose-500 italic font-medium pr-4">
              Excellence
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 md:mb-12 leading-relaxed max-w-2xl font-medium opacity-80">
            Beyond standard travel. We engineer bespoke aviation experiences and private itineraries for the world's most discerning voyagers.
          </p>

          {/* Buttons — decorative, can animate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent text-primary-dark px-7 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_-10px_rgba(245,158,11,0.5)] group w-full sm:w-auto"
            >
              <Compass className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-700" />
              Initialize Search
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 text-white px-7 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-white/10 w-full sm:w-auto"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-accent/20 flex items-center justify-center">
                <Play className="w-4 h-4 md:w-4.5 md:h-4.5 fill-accent text-accent" />
              </div>
              The Experience
            </motion.button>
          </motion.div>
        </div>
      </div>


      {/* Floating UI Elements */}
      <div className="absolute bottom-28 right-16 hidden lg:block z-30">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-[1.8rem] shadow-2xl w-48"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-accent/20 rounded-xl flex items-center justify-center">
              <Crown className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Leads</div>
              <div className="text-lg font-black text-white tracking-tighter">4,290+</div>
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "85%" }}
              transition={{ duration: 2.5, delay: 1 }}
              className="h-full bg-accent shadow-[0_0_10px_#f59e0b]"
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent z-10" />
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <div className="w-6 h-9 md:w-7 md:h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <motion.div 
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-accent rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
