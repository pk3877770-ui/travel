"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plane, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, [pathname]);

  // Refetch when pathname changes, so login/logout updates nav

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/holiday-packages" },
    { name: "Hotels", href: "/hotel-booking" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  if (!isMounted) return null;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <nav className={cn(
          "relative flex items-center justify-between transition-all duration-500 rounded-[2.5rem] px-10 py-5",
          isScrolled 
            ? "bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl" 
            : "bg-transparent"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-2xl shadow-accent/20 transition-transform group-hover:rotate-12">
              <Plane className="w-7 h-7 text-primary-dark -rotate-45" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white font-outfit uppercase">
              Karmana
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-accent font-black text-[11px] uppercase tracking-[0.3em] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center">
              {user ? (
                <Link href="/profile" className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-white font-black text-[10px] uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link href="/auth">
                  <button className="text-white font-black text-[10px] uppercase tracking-[0.3em] hover:text-accent transition-colors">
                    Sovereign Sign In
                  </button>
                </Link>
              )}
            </div>
            
            <button className="bg-accent hover:bg-orange-400 text-primary-dark px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:-translate-y-1">
              Concierge
            </button>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[110] bg-primary-dark flex flex-col p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-3xl font-black text-white font-outfit uppercase tracking-tighter">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black text-white hover:text-accent transition-colors font-outfit"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-black text-red-400 uppercase tracking-widest pt-10 border-t border-white/10 text-left"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/auth" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black text-accent uppercase tracking-widest pt-10 border-t border-white/10"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


export default Navbar;
