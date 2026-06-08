import React from "react";
import { Award, HeadphonesIcon, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Best Price Guarantee",
    desc: "Get the best deals",
    color: "text-red-500",
    borderColor: "border-red-200",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    desc: "We are here to help",
    color: "text-blue-500",
    borderColor: "border-blue-200",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% secure payment",
    color: "text-blue-600",
    borderColor: "border-blue-200",
  }
];

const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-[1000px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full border-2 ${item.borderColor} flex items-center justify-center shrink-0`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-0.5">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
