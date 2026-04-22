"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Crown, Zap, Gift, ShieldCheck, Rocket, Plane, Bell, Star, Send } from "lucide-react";

const benefits = [
  { 
    icon: Crown, 
    title: "Priority Access", 
    desc: "Be the first to know about private package releases and limited-time elite airline rates.",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  { 
    icon: Bell, 
    title: "Concierge Insights", 
    desc: "Weekly curated guides from our on-the-ground experts covering hidden gems and new luxury openings.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  { 
    icon: Gift, 
    title: "Member Privileges", 
    desc: "Receive exclusive upgrades and member-only amenities at our partner five-star properties.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  { 
    icon: ShieldCheck, 
    title: "Secure Alerts", 
    desc: "100% private. We never share your data. Only premium travel opportunities in your inbox.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  { 
    icon: Zap, 
    title: "Instant Rates", 
    desc: "Get price drop notifications for your favorite routes before seats are gone.",
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
  { 
    icon: Star, 
    title: "Elite Status", 
    desc: "Unlock badges and loyalty multipliers that give you even more value on every booking.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  }
];

export default function SubscribePage() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Emulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 bg-[#030712] relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-8"
          >
            <Crown className="w-3 h-3" />
            The Elite Circle
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black font-outfit text-white mb-8 tracking-tight leading-[0.9]"
          >
            Elevate Your <span className="text-amber-500 italic">Experience</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-inter leading-relaxed"
          >
            Subscribe to receive private invitations to bespoke journeys, 
            first-access to elite rates, and curated travel inspiration from our global concierge team.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Rocket className="w-8 h-8" />
                </div>
                <div className="text-2xl font-outfit">Welcome to the Elite Circle</div>
                <p className="text-sm font-medium opacity-70">A verification link has been sent to your inbox. Stay inspired.</p>
                <button onClick={() => setStatus("idle")} className="text-xs uppercase tracking-widest hover:underline mt-4">Back to main</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-3 rounded-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex-1 relative group">
                  <Mail className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your elite email..."
                    className="w-full bg-transparent border-0 pl-16 pr-6 py-5 text-white text-lg focus:outline-none placeholder:text-slate-700 font-medium"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="px-12 py-5 rounded-full bg-[#f59e0b] hover:bg-[#fbbf24] text-[#030712] font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(245,158,11,0.3)] min-w-[220px]"
                >
                  {status === "loading" ? "Processing..." : "Subscribe"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${benefit.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <h3 className="text-2xl font-bold font-outfit text-white mb-4">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="h-64 bg-gradient-to-t from-[#030712] to-transparent relative z-10" />
    </div>
  );
}
