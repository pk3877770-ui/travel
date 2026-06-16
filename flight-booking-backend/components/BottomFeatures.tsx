import React from "react";
import { Plane, CheckCircle2, DollarSign, Users } from "lucide-react";
import Link from "next/link";

const bottomFeatures = [
  {
    icon: Plane,
    title: "Wide Range of Flights",
    desc: "1000+ airlines",
    color: "text-blue-600",
    bg: "bg-blue-50",
    link: "/flights",
  },
  {
    icon: CheckCircle2,
    title: "Easy Booking",
    desc: "Book in few clicks",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    desc: "Get the best deals",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "Customer Satisfaction",
    desc: "Trusted by millions",
    color: "text-purple-600",
    bg: "bg-purple-50",
    link: "/about",
  },
];

const BottomFeatures = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-slate-800">Why Choose Kramana</h2>
          <p className="text-sm text-slate-500 mt-1">Everything you need for a seamless journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomFeatures.map((item, idx) => {
            const CardInner = (
              <>
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
              </>
            );

            const cardClass =
              "group bg-white border border-slate-100 rounded-2xl p-7 flex flex-col items-center text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5";

            return item.link ? (
              <Link key={idx} href={item.link} data-aos="fade-up" data-aos-delay={idx * 100} className={cardClass}>
                {CardInner}
              </Link>
            ) : (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} className={cardClass}>
                {CardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BottomFeatures;
