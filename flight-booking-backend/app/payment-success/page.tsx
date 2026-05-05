import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Plane } from "lucide-react";

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ ref?: string, from?: string, to?: string }> }) {
  const { ref, from, to } = await searchParams;

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center relative overflow-hidden font-inter pt-20 px-6">
      {/* Cinematic Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full mesh-gradient opacity-30 pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-xl w-full">
        <div className="glass-dark border border-emerald-500/30 rounded-[3rem] p-10 md:p-14 text-center shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] relative overflow-hidden">
          {/* Success Indicator */}
          <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30 shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)]">
            <Check className="w-12 h-12" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black font-outfit text-white mb-4 tracking-tight">Payment Successful</h1>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Your sovereign flight booking has been confirmed and securely processed.
          </p>

          {ref && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-20 h-20 text-white" />
              </div>
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black block mb-1">Booking Reference</span>
                <span className="font-mono text-2xl font-black text-emerald-400 tracking-wider">{ref}</span>
              </div>
              {(from && to) && (
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black block mb-1">Route</span>
                  <span className="font-black text-white text-lg flex items-center gap-2">
                    {from} <Plane className="w-4 h-4 text-accent" /> {to}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <Link 
              href="/profile" 
              className="w-full bg-emerald-500 text-primary-dark py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              View Digital Ticket <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/" 
              className="w-full bg-white/5 text-white py-5 rounded-2xl font-black text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
