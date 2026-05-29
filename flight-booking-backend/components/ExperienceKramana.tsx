"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, ShieldCheck, Headphones } from "lucide-react";

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

const ExperienceKramana = () => {
  return (
    <section className="py-14 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-black font-outfit mb-4 leading-tight">
              The Architecture of <span className="text-accent">Sovereign</span> Travel
            </h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
              We curate more than just destinations; we engineer the absolute orchestration of elite global logistics. From private aviation corridors to bespoke estate residencies, every Kramana journey is a masterpiece of precision, discretion, and unparalleled luxury.
            </p>

            <div className="space-y-6">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center group-hover:bg-accent transition-colors shrink-0">
                    <perk.icon className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-outfit mb-1">{perk.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{perk.desc}</p>
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
            <div className="rounded-[2rem] overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80"
                alt="Kramana Luxury Travel Orchestration and Bespoke Experiences"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 bg-white/90 backdrop-blur-md p-3 md:p-5 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 border border-white/50">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white object-cover"
                      alt="Reviewer"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-black text-primary text-xs leading-tight">Join 50k+ Happy Travelers</p>
                  <p className="text-[10px] text-slate-500">Elite experiences provided globally</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceKramana;
