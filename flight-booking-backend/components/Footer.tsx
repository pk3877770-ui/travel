import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plane, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#001233] text-white pt-20 pb-8 relative overflow-hidden font-sans mt-auto">
      
      {/* Huge faded airplane graphic in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 pointer-events-none opacity-5 z-0 hidden md:block">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>

      <div className="container max-w-[1000px] mx-auto px-4 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="w-full md:w-1/3">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="relative w-48 h-12">
                <Image 
                  src="/kramana-logo.png" 
                  alt="Kramana Logo" 
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Your trusted travel partner.<br/><br/>
              Find the best flights, hotels and<br/>
              travel deals with us.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-[#1a2b4c] flex items-center justify-center text-slate-300 hover:bg-[#3D8BFD] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1a2b4c] flex items-center justify-center text-slate-300 hover:bg-[#3D8BFD] hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1a2b4c] flex items-center justify-center text-slate-300 hover:bg-[#3D8BFD] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1a2b4c] flex items-center justify-center text-slate-300 hover:bg-[#3D8BFD] hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns Container */}
          <div className="w-full md:w-2/3 flex flex-wrap md:flex-nowrap justify-between gap-8 md:pl-12 pt-2">
            
            {/* Company */}
            <div className="w-[45%] md:w-auto">
              <h3 className="font-bold text-white mb-6 text-base tracking-wide">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">About Us</Link></li>
                <li><Link href="/careers" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Careers</Link></li>
                <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Blog</Link></li>
                <li><Link href="/press" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Press</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Contact Us</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="w-[45%] md:w-auto">
              <h3 className="font-bold text-white mb-6 text-base tracking-wide">Support</h3>
              <ul className="space-y-4">
                <li><Link href="/help" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Help Center</Link></li>
                <li><Link href="/faqs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">FAQs</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link></li>
                <li><Link href="/cancellation" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Cancellation Policy</Link></li>
              </ul>
            </div>

            {/* Top Routes */}
            <div className="w-[45%] md:w-auto">
              <h3 className="font-bold text-white mb-6 text-base tracking-wide">Top Routes</h3>
              <ul className="space-y-4">
                <li><Link href="/flights?from=delhi&to=mumbai" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Delhi to Mumbai</Link></li>
                <li><Link href="/flights?from=delhi&to=bangalore" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Delhi to Bangalore</Link></li>
                <li><Link href="/flights?from=mumbai&to=goa" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Mumbai to Goa</Link></li>
                <li><Link href="/flights?from=delhi&to=dubai" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Delhi to Dubai</Link></li>
                <li><Link href="/flights?from=mumbai&to=singapore" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Mumbai to Singapore</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm font-medium">
            © 2025 FlyBook. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="bg-white w-9 h-6 rounded flex items-center justify-center text-[8px] font-black text-blue-900">VISA</div>
            <div className="bg-white w-9 h-6 rounded flex items-center justify-center relative overflow-hidden">
              <div className="w-3 h-3 rounded-full bg-red-500 absolute left-1.5 opacity-90"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 absolute right-1.5 opacity-90 mix-blend-multiply"></div>
            </div>
            <div className="bg-white w-9 h-6 rounded flex items-center justify-center text-[7px] font-bold text-blue-900 italic">RuPay</div>
            <div className="bg-white w-9 h-6 rounded flex items-center justify-center text-[8px] font-black text-slate-800 border border-slate-200">UPI</div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
