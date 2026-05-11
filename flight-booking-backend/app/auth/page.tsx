"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed. Please try again.");
      }

      // Success
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-float" />

      <div className="absolute top-10 left-10 z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-dark premium-border rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Noise Overlay */}
          <div className="noise-overlay absolute inset-0 rounded-[2.5rem] pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Logo area */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                <Plane className="w-8 h-8 text-accent -rotate-45" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <motion.h2
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-outfit font-black text-white mb-3"
              >
                {isLogin ? "Welcome Back" : "Start Journey"}
              </motion.h2>
              <p className="text-white/50 font-inter text-sm tracking-wide">
                {isLogin
                  ? "Access your sovereign travel portfolio."
                  : "Join the elite circle of world travelers."}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-white/5 backdrop-blur-md rounded-2xl p-1.5 mb-10 border border-white/10 shadow-inner">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  isLogin
                    ? "bg-accent text-primary-dark shadow-lg shadow-accent/20"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={toggleMode}
                className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  !isLogin
                    ? "bg-accent text-primary-dark shadow-lg shadow-accent/20"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-8 text-sm font-bold text-center flex items-center justify-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name-input"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="relative group"
                  >
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-white/20 group-focus-within:text-accent transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-14 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/50 transition-all font-medium text-sm"
                      placeholder="Full Name"
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/20 group-focus-within:text-accent transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-14 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/50 transition-all font-medium text-sm"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/20 group-focus-within:text-accent transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-14 pr-14 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/50 transition-all font-medium text-sm"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {isLogin && (
                <div className="flex items-center justify-end px-1">
                  <a
                    href="#"
                    className="text-xs font-black uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
                  >
                    Forgot Credentials?
                  </a>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-accent text-primary-dark font-black py-5 px-8 rounded-2xl shadow-xl shadow-accent/10 hover:shadow-accent/30 transition-all uppercase tracking-[0.2em] text-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Access Account" : "Confirm Identity"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[10px]">
                  <span className="px-4 bg-transparent text-white/30 font-black uppercase tracking-widest">
                    Elite Integrations
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 w-full py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all font-bold text-sm uppercase tracking-widest group">
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-3 w-full py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all font-bold text-sm uppercase tracking-widest group">
                  <svg className="w-4 h-4 text-white transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

