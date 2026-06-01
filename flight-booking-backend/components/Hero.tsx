import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden mesh-gradient">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-primary-dark/80 to-primary-dark z-10" />
        <div className="absolute inset-0 opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=60"
            alt="Kramana Luxury Private Jet Aviation - Sovereign Excellence Travel"
            fill
            priority
            quality={60}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-3xl border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl mb-5 md:mb-7 shadow-2xl">
            <span className="text-white font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase">
              The Sovereign Standard
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] md:leading-[0.9] mb-5 md:mb-8 tracking-tighter">
            Sovereign <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-rose-500 italic font-medium pr-4">
              Excellence
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 md:mb-12 leading-relaxed max-w-2xl font-medium opacity-80">
            Beyond standard travel. We engineer bespoke aviation experiences and private itineraries for the world's most discerning voyagers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link
              href="#search-section"
              className="bg-accent text-primary-dark px-7 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_-10px_rgba(245,158,11,0.5)] group w-full sm:w-auto"
            >
              <span className="w-4 h-4 md:w-5 md:h-5 text-accent">→</span>
              Initialize Search
            </Link>
            <button
              className="bg-white/5 backdrop-blur-3xl border border-white/10 text-white px-7 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-white/10 w-full sm:w-auto"
            >
              <span className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent">▶</span>
              </span>
              The Experience
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent z-10" />
    </section>
  );
};

export default Hero;
