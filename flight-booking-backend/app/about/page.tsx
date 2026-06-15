import React from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";
import { 
  ShieldCheck, 
  User, 
  Globe, 
  Heart, 
  Smile, 
  Plane, 
  Building2, 
  Globe2,
  BadgeCheck,
  HeadphonesIcon,
  Mail,
  ChevronLeft,
  ChevronRight,
  Award
} from "lucide-react";
import { FaLinkedin as Linkedin, FaTwitter as Twitter } from "react-icons/fa";


export async function generateMetadata() {
  const seo = await getSEOMetadata("/about");
  return mapSEOToMetadata(seo);
}

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://www.kramana.com/about",
    "name": "About Us - Kramana",
    "description": "Kramana was founded with a simple mission — to make travel accessible for everyone.",
    "publisher": {
      "@type": "Organization",
      "name": "Kramana",
      "foundingDate": "2018"
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans pb-20">
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* 1. Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80" // Airplane wing
          alt="Airplane wing over clouds"
          fill
          className="object-cover"
          priority
        />
        {/* Semi-transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
        
        <div className="relative z-10 container max-w-[1200px] mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <span className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4 inline-block">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              Making Travel Easy, Affordable & Memorable
            </h1>
            <p className="text-lg text-white/90 font-medium">
              Kramana was founded with a simple mission — to make travel accessible for everyone. From flights to hotels, we bring you the best deals and a seamless booking experience.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Our Story Section */}
      <div className="container max-w-[1200px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80" // People looking at map
              alt="Travelers looking at map"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Content */}
          <div>
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 inline-block">
              OUR STORY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Your Journey, Our Passion
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Established in 2018, Kramana has grown to become one of the most trusted online travel platforms, serving millions of customers across the globe.
            </p>
            <p className="text-slate-600 mb-10 leading-relaxed">
              We believe every journey is unique and meaningful. That's why we work hard to offer the best options, prices and customer support for a hassle-free travel experience.
            </p>
            
            {/* Features List */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Trusted by Millions</h3>
                <p className="text-xs text-slate-500">Over 2 million happy travelers worldwide.</p>
              </div>
              <div className="flex-1">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Plane className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Best Price Guarantee</h3>
                <p className="text-xs text-slate-500">Get the best deals on flights and hotels.</p>
              </div>
              <Link href="/help" className="flex-1 block group hover:bg-slate-50 p-3 -m-3 rounded-xl transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <HeadphonesIcon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">24/7 Customer Support</h3>
                <p className="text-xs text-slate-500">We're always here to help you.</p>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Our Values Section */}
      <div className="container max-w-[1200px] mx-auto px-4 py-10 pb-20">
        <div className="text-center mb-12">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 inline-block">
            OUR VALUES
          </span>
          <h2 className="text-3xl font-bold text-slate-800">
            What Drives Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Trust & Transparency", text: "We believe in honest pricing and transparent services.", icon: ShieldCheck },
            { title: "Customer First", text: "Our customers are at the heart of everything we do.", icon: User },
            { title: "Explore More", text: "We inspire people to explore new places and cultures.", icon: Globe },
            { title: "Commitment", text: "We are committed to making your travel seamless.", icon: Heart },
          ].map((val, idx) => (
            <div key={idx} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <val.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-slate-800 mb-3">{val.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{val.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Statistics Section */}
      <div className="bg-blue-50 py-16">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-blue-200">
            
            <div className="flex items-center justify-center gap-4 pt-6 sm:pt-0">
              <Smile className="w-10 h-10 text-blue-600" />
              <div>
                <div className="text-3xl font-black text-blue-600">2M+</div>
                <div className="text-sm font-bold text-slate-700">Happy Customers</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-6 sm:pt-0">
              <Plane className="w-10 h-10 text-blue-600" />
              <div>
                <div className="text-3xl font-black text-blue-600">500+</div>
                <div className="text-sm font-bold text-slate-700">Airlines Worldwide</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-6 sm:pt-0">
              <Building2 className="w-10 h-10 text-blue-600" />
              <div>
                <div className="text-3xl font-black text-blue-600">200K+</div>
                <div className="text-sm font-bold text-slate-700">Hotels Worldwide</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-6 sm:pt-0">
              <Globe2 className="w-10 h-10 text-blue-600" />
              <div>
                <div className="text-3xl font-black text-blue-600">100+</div>
                <div className="text-sm font-bold text-slate-700">Countries Covered</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. Our Team Section */}
      <div className="container max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 inline-block">
            OUR TEAM
          </span>
          <h2 className="text-3xl font-bold text-slate-800">
            Meet the People Behind Kramana
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Amit Verma", role: "CEO & Co-Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
            { name: "Neha Sharma", role: "COO & Co-Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
            { name: "Rohit Mehta", role: "CTO", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
            { name: "Pooja Singh", role: "Head of Customer Experience", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
          ].map((member, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 bg-slate-100">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{member.name}</h3>
              <p className="text-xs text-slate-500 mb-6">{member.role}</p>
              
              <div className="flex items-center justify-center gap-3 w-full border-t border-slate-100 pt-5">
                <Link href={`https://linkedin.com/in/${member.name.toLowerCase().replace(' ', '')}`} target="_blank" className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link href={`https://twitter.com/${member.name.toLowerCase().replace(' ', '')}`} target="_blank" className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link href="mailto:hello@kramana.com" className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Airline Partners Section */}
      <div className="container max-w-[1200px] mx-auto px-4 pb-20">
        <h3 className="text-center font-bold text-slate-800 text-xl mb-10">Our Airline Partners</h3>
        
        <div className="flex items-center justify-between gap-4">
          <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1 flex items-center justify-around overflow-hidden gap-8 px-4">
            {/* Airline Logos - Using text as placeholders since I don't have actual logo assets, styling them to look like logos */}
            <div className="font-black text-xl text-[#E31837] whitespace-nowrap">AIR INDIA</div>
            <div className="font-black text-xl text-[#001B94] whitespace-nowrap">IndiGo</div>
            <div className="font-black text-xl text-[#F9A01B] whitespace-nowrap">SpiceJet</div>
            <div className="font-black text-xl text-[#5C2D91] whitespace-nowrap">Vistara</div>
            <div className="font-black text-xl text-[#D71920] whitespace-nowrap">Emirates</div>
            <div className="font-black text-xl text-[#8A1538] whitespace-nowrap hidden lg:block">QATAR</div>
          </div>

          <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </main>
  );
}
