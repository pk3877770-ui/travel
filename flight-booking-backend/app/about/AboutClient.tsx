"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Tags, Headset, ShieldCheck, Zap, Smartphone, Receipt, Crown, Rocket, Globe, Globe2, Users } from "lucide-react";

const stats = [
  { icon: Plane, label: "Flights Booked", value: "50K+", target: 50 },
  { icon: Users, label: "Satisfaction", value: "99.9%", target: 99.9 },
  { icon: Globe, label: "Airlines", value: "400+", target: 400 },
  { icon: Globe2, label: "Destinations", value: "5K+", target: 5000 },
];

const timeline = [
  { year: "2020", title: "Founded in Mumbai", desc: "Born from the frustration of expensive flight tickets, Karmana started with a mission to make air travel accessible to everyone." },
  { year: "2021", title: "Mobile App Launch", desc: "Our award-winning mobile app revolutionized how Indians book flights, reaching 1M downloads in first year." },
  { year: "2023", title: "10M Bookings Milestone", desc: "Crossed 10 million bookings, expanded to international routes, partnered with world's top airlines." },
  { year: "2025", title: "Global Expansion", desc: "Full international rollout with AI-powered recommendations and hotel bundles in 100+ countries." },
];

const features = [
  { icon: Tags, title: "Best Prices", desc: "Lowest fares across 400+ airlines with transparent pricing. No hidden fees." },
  { icon: Headset, title: "24/7 Support", desc: "Round-the-clock assistance. Phone, chat, email - we're always here for you." },
  { icon: ShieldCheck, title: "100% Secure", desc: "SSL encryption, PCI compliant payments, GDPR privacy protection." },
  { icon: Zap, title: "Instant Confirm", desc: "E-tickets delivered in seconds. No waiting, start your trip immediately." },
  { icon: Smartphone, title: "Mobile App", desc: "Manage bookings, check-ins, and get updates on your phone anytime." },
  { icon: Receipt, title: "No Hidden Fees", desc: "What you see is what you pay. Full transparency on every booking." },
];

const team = [
  { name: "John Doe", role: "Founder & CEO", image: "https://randomuser.me/api/portraits/men/32.jpg", bio: "20+ years in aviation industry. Passionate about making travel accessible to every Indian family." },
  { name: "Sarah Smith", role: "CTO", image: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Built our AI recommendation engine. Ex-Google engineer powering smart search." },
  { name: "David Lee", role: "Head of Operations", image: "https://randomuser.me/api/portraits/men/65.jpg", bio: "Manages partnerships with 400+ airlines. Ensures seamless customer experience." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-blue-900/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1350&q=80"
            alt="About Hero"
            className="w-full h-full object-cover grayscale-[0.5]"
          />
        </div>
        <div className="container max-w-4xl mx-auto px-6 relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black font-outfit text-white mb-6"
          >
            Our Story, Your <span className="text-accent">Journey</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 leading-relaxed font-inter"
          >
            Your trusted partner for seamless flight booking worldwide. Smart search. Best deals. Happy travels.
          </motion.p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit mt-4 mb-8">Why Millions Trust Karmana</h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Karmana is a premium flight booking service designed to simplify travel planning. Our mission is to deliver affordable fares, reliable customer support, and a smooth booking experience for every journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-accent/30 transition-all group">
                    <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold font-outfit mb-2">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="sticky top-32">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[2rem] bg-primary text-white text-center flex flex-col items-center gap-4 shadow-2xl"
                  >
                    <stat.icon className="w-10 h-10 text-accent" />
                    <div className="text-4xl font-black font-outfit">{stat.value}</div>
                    <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mt-4">Karmana's Growth Story</h2>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-20">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-10 relative",
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="flex-1 text-center md:text-right">
                    {idx % 2 === 0 ? (
                      <div>
                        <span className="text-accent text-5xl font-black font-outfit mb-4 block">{item.year}</span>
                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ) : (
                      <div className="md:invisible" />
                    )}
                  </div>
                  
                  {/* Dot */}
                  <div className="w-6 h-6 rounded-full bg-accent border-4 border-white dark:border-slate-900 shadow-xl z-10 shrink-0" />
                  
                  <div className="flex-1 text-center md:text-left">
                    {idx % 2 !== 0 ? (
                      <div>
                        <span className="text-accent text-5xl font-black font-outfit mb-4 block">{item.year}</span>
                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ) : (
                      <div className="md:invisible" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-accent font-black tracking-[0.3em] text-sm uppercase">Meet the Founders</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mt-4">Elite Leadership Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-10 text-center border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all"
              >
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <div className="absolute inset-0 bg-accent rounded-full blur-[20px] opacity-20" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800 relative z-10"
                  />
                </div>
                <h3 className="text-2xl font-bold font-outfit mb-1">{member.name}</h3>
                <div className="text-accent font-black text-xs uppercase tracking-widest mb-6">{member.role}</div>
                <p className="text-slate-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black font-outfit text-primary mb-8 tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto font-medium">
            Find the best flights at unbeatable prices. Book now and save!
          </p>
          <button className="bg-primary text-white hover:bg-black px-12 py-6 rounded-2xl font-black text-xl transition-all hover:-translate-y-1 shadow-2xl flex items-center gap-3 mx-auto">
            <Plane className="w-8 h-8" />
            Find My Flight Now
          </button>
        </div>
      </section>
    </div>
  );
}

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
