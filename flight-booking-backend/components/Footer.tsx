import React from "react";
import Link from "next/link";
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Plane className="w-6 h-6 text-accent" />
              </div>
              <span className="text-2xl font-bold font-outfit">Karmana</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Experience the ultimate in travel luxury. From seamless flight bookings to bespoke holiday packages, Karmana is your passport to the world's most exquisite destinations.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold font-outfit mb-8">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Holiday Packages", href: "/holiday-packages" },
                { name: "Hotel Booking", href: "/hotel-booking" },
                { name: "Flight Booking", href: "/flight-booking" },
                { name: "About Karmana", href: "/about" },
                { name: "Subscribe", href: "/subscribe" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-accent flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold font-outfit mb-8">Support</h4>
            <ul className="space-y-4">
              {[
                { name: "Help Center", href: "/help-center" },
                { name: "Ticket Inquiry", href: "/ticket-inquiry" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Refund Policy", href: "/refund" },
                { name: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-accent flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold font-outfit mb-8">Get in Touch</h4>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <span className="text-slate-300">concierge@karmana.com</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <span className="text-slate-300">+91 (22) 6789 0123</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <span className="text-slate-300">
                  World Trade Center, Cuffe Parade,<br />Mumbai, MH 400005
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-slate-500 text-sm">
          <p>© 2026 Karmana Travel Concierge. Crafted for the discerning traveler.</p>
          <div className="flex gap-6 grayscale opacity-50">
            {["Visa", "Mastercard", "Amex"].map((card) => (
              <span key={card} className="font-bold tracking-widest">{card.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
