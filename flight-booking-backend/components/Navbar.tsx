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
  const { data: session } = useSession();

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
            <div className="relative w-48 h-12">
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
          <div className="hidden lg:flex items-center justify-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold h-full flex items-center relative transition-colors",
                    isActive ? "text-primary" : "text-slate-500 hover:text-primary"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-sm" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            {/* Currency */}
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              INR <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* Language */}
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              EN <ChevronDown className="w-4 h-4" />
            </button>

            {/* Login / Register / Profile */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-primary text-sm font-bold border-2 border-primary px-5 py-2 rounded-md hover:bg-primary/5 transition-colors">
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
                className="flex items-center gap-2 text-primary text-sm font-bold border-2 border-primary px-5 py-2 rounded-md hover:bg-primary/5 transition-colors"
              >
                <User className="w-4 h-4" />
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
                  <button className="flex-1 flex justify-between items-center bg-slate-50 text-slate-800 px-4 py-3 rounded-md border border-slate-200">
                    EN <ChevronDown className="w-4 h-4" />
                  </button>
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
