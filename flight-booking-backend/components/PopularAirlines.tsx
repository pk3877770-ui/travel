import React from "react";

const airlines = [
  { name: "IndiGo", logo: "https://images.kiwi.com/airlines/64x64/6E.png" },
  { name: "Air India", logo: "https://images.kiwi.com/airlines/64x64/AI.png" },
  { name: "Akasa Air", logo: "https://images.kiwi.com/airlines/64x64/QP.png" },
  { name: "SpiceJet", logo: "https://images.kiwi.com/airlines/64x64/SG.png" },
  { name: "Vistara", logo: "https://images.kiwi.com/airlines/64x64/UK.png" },
  { name: "Emirates", logo: "https://images.kiwi.com/airlines/64x64/EK.png" },
];

const PopularAirlines = () => {
  return (
    <section className="py-12 bg-white pb-16">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-slate-800">Popular Airlines</h2>
          <p className="text-sm text-slate-500 mt-1">Book with the world&apos;s most trusted carriers</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {airlines.map((airline, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 75}
              className="group bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:border-primary/30"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent-light">
                <img
                  src={airline.logo}
                  alt={airline.name}
                  className="max-h-8 max-w-[2.5rem] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-primary transition-colors">
                {airline.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAirlines;
