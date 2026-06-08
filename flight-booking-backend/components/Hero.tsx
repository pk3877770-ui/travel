import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-48 md:pt-40 md:pb-56 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
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

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight">
            Find Best Flights<br />
            For Your Journey
          </h1>

          <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium italic">
            Search and compare the best flights from<br className="hidden md:block" />
            hundreds of airlines and travel sites.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
