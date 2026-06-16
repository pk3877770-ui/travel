"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Star, Plane, Globe2, ShieldCheck, BadgePercent } from "lucide-react";
import SearchSection from "@/components/SearchSection";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Star, value: "4.8/5", label: "Traveler Rating" },
  { icon: Plane, value: "500+", label: "Airlines" },
  { icon: Globe2, value: "1,200+", label: "Destinations" },
];

const trustPoints = [
  { icon: BadgePercent, label: "Best Price Guarantee" },
  { icon: ShieldCheck, label: "100% Secure Booking" },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax: background drifts down slower than the page scrolls
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-primary"
    >
      {/* Background Image (parallax layer — oversized so the drift never reveals edges) */}
      <div ref={bgRef} className="absolute -inset-x-0 -top-[15%] h-[130%] z-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Airplane flying over mountains"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-[#0A1A3B]/60" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="max-w-2xl">
          {/* Badge */}
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              India&apos;s Trusted Flight Booking Platform
            </span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight"
          >
            Find Best Flights<br />
            For Your Journey
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-base md:text-lg text-white/90 leading-relaxed font-medium italic mb-8"
          >
            Search and compare the best flights from<br className="hidden md:block" />
            hundreds of airlines and travel sites.
          </p>

          {/* Trust points */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10"
          >
            {trustPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-2">
                <point.icon className="w-5 h-5 text-yellow-300 shrink-0" />
                <span className="text-sm font-semibold text-white/90">{point.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-aos="zoom-in"
                data-aos-delay={400 + i * 100}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-3 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
              >
                <stat.icon className="w-6 h-6 text-yellow-300 shrink-0" />
                <div>
                  <div className="text-xl font-bold text-white leading-none">{stat.value}</div>
                  <div className="text-xs font-medium text-white/70 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Right: search form */}
          <div data-aos="fade-left" data-aos-delay="200" className="w-full lg:max-w-[520px] lg:ml-auto">
            <SearchSection vertical />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
