"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Plane, Menu, X, User, ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const { data: session } = useSession();

  // On mount, check if there's a google translate cookie to set the initial language state
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1]) {
        setLanguage(match[1].toUpperCase());
      }
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode.toUpperCase());
    // Set the translation cookie for Google Translate
    document.cookie = `googtrans=/en/${langCode.toLowerCase()}; path=/`;
    document.cookie = `googtrans=/en/${langCode.toLowerCase()}; domain=${window.location.hostname}; path=/`;
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Flights", href: "/flights" },
    { name: "Hotels", href: "/hotels" },
    { name: "Offers", href: "/offers" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative w-48 h-12 transition-transform duration-300 ease-out group-hover:scale-105">
              <Image
                src="/kramana-logo.png"
                alt="Kramana Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links - Center */}
          <div className="hidden lg:flex items-center justify-center gap-2 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "group relative text-sm font-semibold flex items-center px-4 py-2 rounded-full transition-colors duration-200",
                    isActive ? "text-primary" : "text-slate-500 hover:text-primary"
                  )}
                >
                  {/* Colour pop background */}
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full bg-accent-light origin-center transition-all duration-300 ease-out",
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                    )}
                  />
                  <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            {/* Currency */}
            <button className="group flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              INR <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Language */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors py-2">
                {language} <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="w-36 bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden py-1">
                  <button onClick={() => handleLanguageChange("en")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors font-medium">English (EN)</button>
                  <button onClick={() => handleLanguageChange("hi")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors font-medium">Hindi (HI)</button>
                  <button onClick={() => handleLanguageChange("fr")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors font-medium">French (FR)</button>
                  <button onClick={() => handleLanguageChange("es")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors font-medium">Spanish (ES)</button>
                </div>
              </div>
            </div>

            {/* Login / Register / Profile */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-primary text-sm font-bold border-2 border-primary px-5 py-2 rounded-md transition-all duration-200 hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20 active:translate-y-0 active:scale-95">
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{session.user?.name || 'Account'}</span>
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="w-48 bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800 truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">My Profile</Link>
                    <Link href="/profile/bookings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">My Bookings</Link>
                    <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth"
                className="group flex items-center gap-2 text-primary text-sm font-bold border-2 border-primary px-5 py-2 rounded-md transition-all duration-200 hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 active:scale-95"
              >
                <User className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-slate-700 hover:text-primary py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex gap-4">
                  <button className="flex-1 flex justify-between items-center bg-slate-50 text-slate-800 px-4 py-3 rounded-md border border-slate-200">
                    INR <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="flex-1 relative">
                    <select 
                      value={language.toLowerCase()}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="w-full appearance-none bg-slate-50 text-slate-800 px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:border-primary font-medium"
                    >
                      <option value="en">English (EN)</option>
                      <option value="hi">Hindi (HI)</option>
                      <option value="fr">French (FR)</option>
                      <option value="es">Spanish (ES)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                  </div>
                </div>
                {session ? (
                  <div className="flex flex-col gap-2">
                    <Link 
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 text-slate-700 font-semibold border border-slate-200 px-5 py-3 rounded-md"
                    >
                      <User className="w-4 h-4" />
                      {session.user?.name || 'My Profile'}
                    </Link>
                    <button 
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 text-red-600 font-semibold border border-red-200 bg-red-50 px-5 py-3 rounded-md"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 text-white font-semibold bg-primary px-5 py-3 rounded-md"
                  >
                    <User className="w-4 h-4" />
                    Login / Register
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
