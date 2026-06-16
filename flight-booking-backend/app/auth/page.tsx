"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Plane, Loader2, ShieldCheck, BadgePercent, Globe2 } from "lucide-react";
=======
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Plane, Loader2, Apple } from "lucide-react";
import { FaFacebook as Facebook } from "react-icons/fa";
>>>>>>> cf568ecb7642200487766cefa91f0ab2fb89a3c5
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const brandPoints = [
  { icon: BadgePercent, text: "Best price guarantee on flights & hotels" },
  { icon: ShieldCheck, text: "Secure, encrypted bookings" },
  { icon: Globe2, text: "500+ airlines, 1,200+ destinations" },
];

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
    <div className="min-h-screen flex bg-slate-50 pt-20">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80"
          alt="Airplane wing above the clouds"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#0A1A3B]/90 via-primary/80 to-primary-dark/90" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <Plane className="w-5 h-5 -rotate-45" />
            </div>
            <span className="text-xl font-black tracking-tight">Kramana</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-5">
              Your journey begins here.
            </h1>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Sign in to manage bookings, unlock member deals, and travel smarter with Kramana.
            </p>

            <div className="space-y-4">
              {brandPoints.map((p) => (
                <div key={p.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <p.icon className="w-4 h-4 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{p.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/50">© {new Date().getFullYear()} Kramana. All rights reserved.</p>
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 py-24 relative">
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Plane className="w-7 h-7 text-primary -rotate-45" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-slate-800 mb-2"
            >
              {isLogin ? "Welcome back" : "Create your account"}
            </motion.h2>
            <p className="text-slate-500 text-sm">
              {isLogin
                ? "Sign in to manage your trips and bookings."
                : "Join Kramana and start booking smarter."}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1.5 mb-8 border border-slate-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                isLogin ? "bg-primary text-white shadow-md" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                !isLogin ? "bg-primary text-white shadow-md" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm font-medium text-center flex items-center justify-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="on" className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group"
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary transition-all font-medium text-sm"
                    placeholder="Full Name"
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary transition-all font-medium text-sm"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary transition-all font-medium text-sm"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-800 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {!isLogin && password && (
              <div className="px-1 grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { ok: password.length >= 8, label: "8+ characters" },
                  { ok: /[A-Z]/.test(password), label: "Uppercase letter" },
                  { ok: /\d/.test(password), label: "Number" },
                  { ok: /[@$!%*?&]/.test(password), label: "Special character" },
                ].map((rule) => (
                  <p key={rule.label} className={`flex items-center gap-2 ${rule.ok ? "text-emerald-600" : "text-slate-400"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${rule.ok ? "bg-emerald-500" : "bg-slate-300"}`} />
                    {rule.label}
                  </p>
                ))}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-primary" />
                  <span className="text-sm font-medium text-slate-500">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                  Forgot password?
                </Link>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>

            <p className="text-center text-xs text-slate-400 mt-4">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-slate-600 hover:text-slate-900 underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-slate-600 hover:text-slate-900 underline">Privacy Policy</Link>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
