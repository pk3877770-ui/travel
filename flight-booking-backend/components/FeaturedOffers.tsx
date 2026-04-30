"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, Calendar, Plane } from "lucide-react";
import Script from "next/script";

const offers = [
  {
    id: 1,
    title: "Maldives Escape",
    price: "$2,499",
    description: "7 Nights in an over-water villa with private pool and all-inclusive dining.",
    image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=600&q=80",
    badge: "HOT DEAL",
    icon: Clock,
    foot: "Limited Time",
  },
  {
    id: 2,
    title: "Santorini Sunsets",
    price: "$1,850",
    description: "Boutique hotel stay with caldera views and private island hopping tour.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
    badge: "POPULAR",
    icon: Calendar,
    foot: "Flexible Booking",
  },
  {
    id: 3,
    title: "Paris Art & Soul",
    price: "$1,299",
    description: "Skip-the-line museum tickets and a luxury stay near the Champs-Élysées.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    badge: "NEW",
    icon: Plane,
    foot: "Flight Included",
  },
];

const FeaturedOffers = () => {
  const router = useRouter();

  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Featured Travel Offers",
    "itemListElement": offers.map((offer, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Offer",
        "name": offer.title,
        "description": offer.description,
        "price": offer.price.replace('$', ''),
        "priceCurrency": "USD",
        "url": `https://karmana.vercel.app/flight-booking`
      }
    }))
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <Script
        id="offers-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }}
      />
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-black tracking-[0.3em] text-sm uppercase"
          >
            Chosen for you
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-outfit mt-4 mb-6"
          >
            Exclusive Seasonal Offers
          </motion.h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-6 right-6 z-10 bg-accent text-primary px-4 py-2 rounded-full font-black text-xs">
                  {offer.badge}
                </div>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold font-outfit">{offer.title}</h3>
                  <span className="text-2xl font-black text-gradient">{offer.price}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                  {offer.description}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <offer.icon className="w-4 h-4" />
                    {offer.foot}
                  </div>
                  <button 
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.append("book", "true");
                      params.append("airline", "Karmana Signature");
                      params.append("from", "Exclusive Route");
                      params.append("to", offer.title);
                      params.append("price", offer.price.replace('$', '').replace(',', ''));
                      params.append("type", "Holiday Package");
                      router.push(`/flight-booking?${params.toString()}`);
                    }}
                    className="text-primary dark:text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
