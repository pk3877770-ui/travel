import React from "react";
import Link from "next/link";
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-14 pb-8 overflow-hidden relative noise-overlay">
      <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
                <Plane className="w-5 h-5 text-accent -rotate-45" />
              </div>
              <span className="text-xl font-black font-outfit tracking-tighter">KRAMANA</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm font-medium opacity-80 text-sm">
              The world's premier travel concierge. From seamless sovereign flights to bespoke private estates, we craft journeys for the discerning few.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Travel Services */}
          <div>
            <h4 className="text-sm font-bold font-outfit mb-5">Travel Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Sovereign Flights", href: "/flights" },
                { name: "Luxury Hotels", href: "/hotels" },
                { name: "Holiday Itineraries", href: "/holiday-packages" },
                { name: "Bespoke Services", href: "/services" },
                { name: "About the Brand", href: "/about" },
                { name: "Contact Concierge", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-accent flex items-center gap-1.5 transition-colors group font-medium text-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Support */}
          <div>
            <h4 className="text-sm font-bold font-outfit mb-5">Guest Support</h4>
            <ul className="space-y-3">
              {[
                { name: "Member Help Center", href: "/help-center" },
                { name: "Flight Status & PNR", href: "/ticket-inquiry" },
                { name: "Refund & Cancellation", href: "/refund" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Privacy & Data", href: "/privacy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-accent flex items-center gap-1.5 transition-colors group font-medium text-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold font-outfit mb-5">Get in Touch</h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <span className="text-slate-300 text-sm">concierge@kramana.com</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span className="text-slate-300 text-sm">+91 (22) 6789 0123</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span className="text-slate-300 text-sm">
                  World Trade Center, Cuffe Parade,<br />Mumbai, MH 400005
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-slate-500 text-xs">
          <p>© 2026 Kramana Travel Concierge. Crafted for the discerning traveler.</p>
          <div className="flex gap-4 grayscale opacity-50">
            {["Visa", "Mastercard", "Amex"].map((card) => (
              <span key={card} className="font-bold tracking-widest text-xs">{card.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
