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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/holiday-packages" },
    { name: "Hotels", href: "/hotel-booking" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        (isScrolled || !isHome) 
          ? "bg-primary/95 backdrop-blur-md py-3 shadow-xl border-b border-white/5" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Plane className="w-6 h-6 text-accent" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-outfit">
            Karmana
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-end flex-1 gap-6 xl:gap-10">
          <div className="flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-accent font-bold text-[11px] xl:text-xs uppercase tracking-widest transition-colors relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
            
            {/* Fail-safe Auth Section inside the same loop/div */}
            {user ? (
              <>
                <Link href="/profile" className="text-white/80 hover:text-accent font-bold text-[10px] uppercase tracking-widest whitespace-nowrap ml-4">
                  My Bookings
                </Link>
                <Link href="/profile" className="text-white font-medium text-xs flex items-center gap-2 hover:text-accent whitespace-nowrap border-l border-white/10 pl-4">
                  <User className="w-4 h-4 text-accent" />
                  {user.name || "Account"}
                </Link>
                <button onClick={handleLogout} className="text-white/60 hover:text-red-400 font-bold text-[10px] uppercase tracking-widest">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth" className="ml-4">
                <button className="text-white/90 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all px-5 py-2.5 rounded-xl border border-white/10 hover:border-accent/50 hover:bg-white/5 backdrop-blur-sm whitespace-nowrap">
                  Sign In
                </button>
              </Link>
            )}
            
            <button className="bg-accent text-primary-dark px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-accent/20 whitespace-nowrap">
              Concierge
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-primary-dark/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl text-white/90 hover:text-accent flex items-center justify-between group"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="mt-4 border-t border-white/10 pt-4 flex flex-col gap-4">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl text-white/90 hover:text-accent flex items-center justify-between group"
                >
                  My Bookings
                </Link>
                <span className="text-xl text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" />
                  Hi, {user.name}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl text-red-400/80 hover:text-red-400 text-left w-full transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl text-white/90 hover:text-accent flex items-center justify-between group mt-4 border-t border-white/10 pt-4"
              >
                Sign In / Sign Up
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
