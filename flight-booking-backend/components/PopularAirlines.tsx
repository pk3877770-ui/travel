import React from "react";
import Image from "next/image";

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
    <section className="py-8 bg-white pb-12">
      <div className="container max-w-[1000px] mx-auto px-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Popular Airlines</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {airlines.map((airline, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow h-16">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={airline.logo}
                  alt={airline.name}
                  className="max-h-8 max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAirlines;
