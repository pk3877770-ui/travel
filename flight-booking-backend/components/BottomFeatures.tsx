import React from "react";
import { Plane, CheckCircle2, DollarSign, Users } from "lucide-react";

const bottomFeatures = [
  {
    icon: Plane,
    title: "Wide Range of Flights",
    desc: "1000+ airlines",
  },
  {
    icon: CheckCircle2,
    title: "Easy Booking",
    desc: "Book in few clicks",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    desc: "Get the best deals",
  },
  {
    icon: Users,
    title: "Customer Satisfaction",
    desc: "Trusted by millions",
  }
];

const BottomFeatures = () => {
  return (
    <section className="py-12 bg-white pb-20 border-b-8 border-slate-900">
      <div className="container max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {bottomFeatures.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-slate-800 text-xs mb-1">{item.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BottomFeatures;
