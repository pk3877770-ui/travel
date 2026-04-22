"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Menu, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/holiday-packages" },
    { name: "Hotels", href: "/hotel-booking" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Subscribe", href: "/subscribe" },
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
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Plane className="w-6 h-6 text-accent" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-outfit">
            Karmana
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-accent font-medium transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="bg-accent hover:bg-accent-hover text-primary px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-accent/20"
          >
            <Send className="w-4 h-4" />
            Subscribe
          </Link>
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
                <div className="w-0 h-0.5 bg-accent transition-all group-hover:w-4" />
              </Link>
            ))}
            <Link
              href="/subscribe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-accent text-primary p-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Subscribe to Newsletter
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
