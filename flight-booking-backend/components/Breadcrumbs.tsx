"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://karmana.vercel.app"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `https://karmana.vercel.app${item.href}`
      }))
    ]
  };

  return (
    <nav className="flex items-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl mb-8 w-fit">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      <Link 
        href="/" 
        className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        <span className="hidden md:inline font-bold text-[10px] uppercase tracking-widest">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <Link
            href={item.href}
            className={`font-bold text-[10px] uppercase tracking-widest transition-colors ${
              index === items.length - 1 
                ? "text-accent cursor-default" 
                : "text-slate-400 hover:text-accent"
            }`}
          >
            {item.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
