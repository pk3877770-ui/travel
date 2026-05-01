"use client";

import React from "react";
import { Compass, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Cinematic Scale */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary/80 to-transparent z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Luxury Flight"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Sparkles for Atmosphere */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -100,
              x: Math.random() * 100 - 50 
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute text-accent/30"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-md border border-accent/20 px-4 py-2 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-black text-[10px] tracking-[0.3em] uppercase">
                Premium Travel Concierge
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              The Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 italic font-light">Sovereign Travel</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-inter font-medium opacity-80">
              From private island escapes to bespoke alpine retreats, we curate travel experiences that transcend the ordinary. Your journey to the extraordinary begins here.
            </p>

            <div className="flex flex-wrap gap-6">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent hover:bg-accent-hover text-primary-dark px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-4 transition-all shadow-[0_20px_50px_rgba(245,158,11,0.3)] group"
              >
                <Compass className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                Explore Destinations
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-4 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-5 h-5 fill-white" />
                </div>
                The Experience
              </motion.button>
            </div>
          </motion.div>
        </div>
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
