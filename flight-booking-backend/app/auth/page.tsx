"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Plane, Loader2, Apple, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }
      } else {
        // Password strength validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          throw new Error("Password must be at least 8 characters long and include uppercase letters, numbers, and special characters.");
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Registration failed. Please try again.");
        }

        // Auto login after successful registration
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }
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
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden border border-slate-100">
          {/* Noise Overlay */}
          <div className="noise-overlay absolute inset-0 rounded-[2.5rem] pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Logo area */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                <Plane className="w-8 h-8 text-[#0A58CA] -rotate-45" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <motion.h2
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-outfit font-black text-slate-800 mb-3"
              >
                {isLogin ? "Welcome Back" : "Start Journey"}
              </motion.h2>
              <p className="text-slate-500 font-inter text-sm tracking-wide">
                {isLogin
                  ? "Access your sovereign travel portfolio."
                  : "Join the elite circle of world travelers."}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-slate-50 rounded-2xl p-1.5 mb-10 border border-slate-200 shadow-inner">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  isLogin
                    ? "bg-[#0A58CA] text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-800"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={toggleMode}
                className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  !isLogin
                    ? "bg-[#0A58CA] text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-800"
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
            <form onSubmit={handleSubmit} autoComplete="on" className="space-y-6">
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
                      <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#0A58CA] transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-14 pr-5 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0A58CA] transition-all font-medium text-sm"
                      placeholder="Full Name"
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#0A58CA] transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-14 pr-5 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0A58CA] transition-all font-medium text-sm"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#0A58CA] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-14 pr-14 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0A58CA] transition-all font-medium text-sm"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-800 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {!isLogin && password && (
                <div className="px-1 text-xs space-y-1 mt-2 mb-4">
                  <p className={password.length >= 8 ? "text-emerald-500 flex items-center gap-2" : "text-white/30 flex items-center gap-2"}>
                    <span className={`w-1 h-1 rounded-full ${password.length >= 8 ? "bg-emerald-500" : "bg-white/30"}`} />
                    8+ characters
                  </p>
                  <p className={/[A-Z]/.test(password) ? "text-emerald-500 flex items-center gap-2" : "text-white/30 flex items-center gap-2"}>
                    <span className={`w-1 h-1 rounded-full ${/[A-Z]/.test(password) ? "bg-emerald-500" : "bg-white/30"}`} />
                    Uppercase letter
                  </p>
                  <p className={/\d/.test(password) ? "text-emerald-500 flex items-center gap-2" : "text-white/30 flex items-center gap-2"}>
                    <span className={`w-1 h-1 rounded-full ${/\d/.test(password) ? "bg-emerald-500" : "bg-white/30"}`} />
                    Number
                  </p>
                  <p className={/[@$!%*?&]/.test(password) ? "text-emerald-500 flex items-center gap-2" : "text-white/30 flex items-center gap-2"}>
                    <span className={`w-1 h-1 rounded-full ${/[@$!%*?&]/.test(password) ? "bg-emerald-500" : "bg-white/30"}`} />
                    Special character (@$!%*?&)
                  </p>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-200" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Remember Me</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-black uppercase tracking-widest text-[#0A58CA] hover:text-blue-800 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-[#0A58CA] text-white font-black py-5 px-8 rounded-2xl shadow-xl hover:bg-blue-700 transition-all uppercase tracking-[0.2em] text-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    {isLogin ? "Access Account" : "Confirm Identity"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {isLogin && (
                <p className="text-center text-sm text-slate-500 mt-6">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-[#0A58CA] font-bold hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              )}

              <div className="text-center text-xs text-slate-500 mt-6">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-slate-700 hover:text-slate-900 underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-slate-700 hover:text-slate-900 underline">Privacy Policy</Link>.
              </div>
            </form>

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-[10px]">
                  <span className="px-4 bg-white text-slate-400 font-black uppercase tracking-widest">
                    Elite Integrations
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Google */}
                <button 
                  onClick={() => {
                    setGoogleLoading(true);
                    signIn("google", { callbackUrl: "/" });
                  }}
                  disabled={googleLoading || appleLoading || facebookLoading}
                  className="flex items-center justify-center gap-2 w-full py-4 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 hover:bg-slate-100 transition-all font-bold text-xs uppercase tracking-widest group disabled:opacity-50"
                >
                  {googleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  Google
                </button>

                {/* Apple */}
                <button 
                  onClick={() => {
                    setAppleLoading(true);
                    signIn("apple", { callbackUrl: "/" });
                  }}
                  disabled={googleLoading || appleLoading || facebookLoading}
                  className="flex items-center justify-center gap-2 w-full py-4 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 hover:bg-slate-100 transition-all font-bold text-xs uppercase tracking-widest group disabled:opacity-50"
                >
                  {appleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Apple className="w-4 h-4 text-slate-800 transition-transform group-hover:scale-110" />
                  )}
                  Apple
                </button>

                {/* Facebook */}
                <button 
                  onClick={() => {
                    setFacebookLoading(true);
                    signIn("facebook", { callbackUrl: "/" });
                  }}
                  disabled={googleLoading || appleLoading || facebookLoading}
                  className="flex items-center justify-center gap-2 w-full py-4 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 hover:bg-slate-100 transition-all font-bold text-xs uppercase tracking-widest group disabled:opacity-50"
                >
                  {facebookLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Facebook className="w-4 h-4 text-[#1877F2] transition-transform group-hover:scale-110" />
                  )}
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


