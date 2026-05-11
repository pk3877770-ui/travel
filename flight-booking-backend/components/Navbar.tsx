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
    { name: "Hotels", href: "/hotels" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  if (!isMounted) return null;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled ? "py-3 px-3 md:py-4 md:px-10" : "py-6 px-4 md:py-8 md:px-10"
      )}
    >
      <div className="max-w-[1440px] mx-auto">
        <nav className={cn(
          "flex items-center justify-between transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] px-5 md:px-8 py-3 md:py-4 border border-white/5 shadow-2xl",
          isScrolled 
            ? "bg-slate-900/95 backdrop-blur-3xl" 
            : "bg-primary-dark/40 backdrop-blur-xl"
        )}>
          {/* Section 1: Logo */}
          <div className="flex-shrink-0 relative z-[120]">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-accent flex items-center justify-center shadow-2xl shadow-accent/20 transition-transform group-hover:rotate-12">
                <Plane className="w-5 h-5 md:w-6 md:h-6 text-primary-dark -rotate-45" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-outfit uppercase">
                Karmana
              </span>
            </Link>
          </div>

          {/* Section 2: Desktop Links - Center Aligned */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-10 xl:gap-14 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-200 hover:text-accent font-black text-[12px] uppercase tracking-[0.25em] transition-all relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Section 3: Actions - Right Aligned */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 relative z-[120]">
            <div className="hidden sm:flex items-center">
              {user ? (
                <Link href="/profile" className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-white font-black text-[11px] uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link href="/auth">
                  <button className="text-white font-black text-[11px] uppercase tracking-[0.2em] hover:text-accent transition-colors px-6 py-2 rounded-xl hover:bg-white/5">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 rounded-xl md:rounded-2xl border border-white/10 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
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
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[110] bg-slate-950 flex flex-col p-8 md:p-12 lg:hidden"
          >
            <div className="mt-20 flex flex-col h-full">
              <div className="space-y-6 md:space-y-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl md:text-5xl font-black text-white hover:text-accent transition-colors font-outfit tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto pt-10 border-t border-white/10">
                {user ? (
                  <div className="flex flex-col gap-6">
                    <Link 
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 text-2xl font-black text-white"
                    >
                      <User className="text-accent" /> My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-2xl font-black text-rose-500 uppercase tracking-widest text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-6 bg-accent text-primary-dark rounded-[1.5rem] font-black text-2xl uppercase tracking-widest text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
