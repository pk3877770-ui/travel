import React from "react";
import Link from "next/link";
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/contact-info";

const exploreLinks = [
  { name: "Flights", href: "/flights" },
  { name: "Hotels", href: "/hotels" },
  { name: "Holiday Packages", href: "/holiday-packages" },
  { name: "Premium Services", href: "/services" },
  { name: "The Journal", href: "/blog" },
  { name: "About Kramana", href: "/about" },
];

const supportLinks = [
  { name: "Help Center", href: "/help-center" },
  { name: "FAQs", href: "/faq" },
  { name: "Ticket Inquiry", href: "/ticket-inquiry" },
  { name: "Refunds & Cancellations", href: "/refund" },
  { name: "Contact Concierge", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

function FooterLinkList({
  title,
  items,
}: {
  title: string;
  items: { name: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-black font-outfit mb-4 uppercase tracking-[0.2em] text-accent">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors group font-medium text-sm"
            >
              <ChevronRight className="w-3.5 h-3.5 text-accent opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white pt-12 pb-6 overflow-hidden relative noise-overlay border-t border-white/5">
      <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">
                <Plane className="w-5 h-5 text-primary-dark -rotate-45" />
              </div>
              <span className="text-xl font-black font-outfit tracking-tighter uppercase">
                Kramana
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
              Premium flights, luxury stays, and curated journeys — crafted for travelers who expect more.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/flights"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent text-primary-dark text-xs font-black uppercase tracking-widest hover:bg-accent-hover transition-colors"
              >
                Book Flights
              </Link>
              <Link
                href="/hotels"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Find Hotels
              </Link>
            </div>
            <div className="flex gap-2.5 pt-1">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-primary-dark transition-all hover:-translate-y-0.5"
                  aria-label={`Kramana on ${label}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterLinkList title="Explore" items={exploreLinks} />
          </div>

          <div className="lg:col-span-2">
            <FooterLinkList title="Support" items={supportLinks} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black font-outfit mb-4 uppercase tracking-[0.2em] text-accent">
              Concierge Desk
            </h4>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-start gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <span className="text-slate-300 text-sm group-hover:text-accent transition-colors pt-1.5 break-all">
                  {CONTACT_EMAIL}
                </span>
              </a>
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span className="text-slate-300 text-sm group-hover:text-accent transition-colors pt-1.5">
                  {CONTACT_PHONE_DISPLAY}
                </span>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <address className="text-slate-300 text-sm not-italic leading-relaxed pt-1.5">
                  {CONTACT_ADDRESS.placeName}
                  <br />
                  {CONTACT_ADDRESS.street}
                  <br />
                  {CONTACT_ADDRESS.city}, {CONTACT_ADDRESS.state} {CONTACT_ADDRESS.postalCode}
                  <br />
                  {CONTACT_ADDRESS.country}
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-slate-500 text-xs">
              © {year} Kramana Travel Concierge. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-500 hover:text-accent text-xs font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 text-slate-600">
              {["Visa", "Mastercard", "Amex"].map((card) => (
                <span key={card} className="font-bold tracking-widest text-[10px] uppercase">
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
