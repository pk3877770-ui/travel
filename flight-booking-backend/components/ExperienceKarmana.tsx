"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, ShieldCheck, Headphones, Map } from "lucide-react";

const perks = [
  {
    icon: Crown,
    title: "Exclusively Curated",
    desc: "Every destination is hand-picked by our elite travel experts for quality and luxury.",
  },
  {
    icon: ShieldCheck,
    title: "Elite Protection",
    desc: "Comprehensive travel insurance and 24/7 global support for total peace of mind.",
  },
  {
    icon: Headphones,
    title: "Personal Concierge",
    desc: "Direct access to a dedicated travel consultant who knows your preferences inside out.",
  },
];

const ExperienceKarmana = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black font-outfit mb-8 leading-tight">
              The Architecture of <span className="text-accent">Sovereign</span> Travel
            </h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
              We curate more than just destinations; we engineer the absolute orchestration of elite global logistics. From private aviation corridors to bespoke estate residencies, every Karmana journey is a masterpiece of precision, discretion, and unparalleled luxury.
            </p>

            <div className="space-y-10">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center group-hover:bg-accent transition-colors shrink-0">
                    <perk.icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold font-outfit mb-2">{perk.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80"
                alt="Karmana Luxury Travel Orchestration and Bespoke Experiences"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/90 backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl flex items-center gap-4 md:gap-6 border border-white/50">
                <div className="flex -space-x-3 md:-space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-white object-cover"
                      alt="Reviewer"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-black text-primary text-[10px] md:text-base leading-tight">Join 50k+ Happy Travelers</p>
                  <p className="text-[8px] md:text-sm text-slate-500">Elite experiences provided globally</p>
                </div>
              </div>
            </div>
            {/* Background Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceKarmana;
