"use client";

import React from "react";
import { Compass, Play } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Luxury Flight"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-accent/20 text-accent px-6 py-2 rounded-full font-bold text-sm tracking-widest mb-6 border border-accent/20">
              PREMIUM TRAVEL CONCIERGE
            </span>
            <h1 className="text-6xl md:text-8xl font-bold font-outfit text-white leading-tight mb-6">
              Discover the <span className="text-gradient">Unseen</span> World in Luxury
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-inter">
              From private island escapes to bespoke alpine retreats, we curate travel experiences that transcend the ordinary. Your journey to the extraordinary begins here.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-accent hover:bg-accent-hover text-primary px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all shadow-2xl hover:shadow-accent/40 hover:-translate-y-1">
                <Compass className="w-6 h-6" />
                Explore Destinations
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all hover:-translate-y-1">
                <Play className="w-6 h-6 fill-white" />
                Experience Karmana
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
