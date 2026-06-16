"use client";

import { MessageSquare, Plane, CalendarDays, CreditCard, RefreshCcw, XCircle, Briefcase, UserCheck, FileText, HeartHandshake, Headphones } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const categories = [
  { name: "All FAQs", icon: MessageSquare, count: 68 },
  { name: "Flight Booking", icon: Plane, count: 14 },
  { name: "Manage Booking", icon: CalendarDays, count: 10 },
  { name: "Payments", icon: CreditCard, count: 9 },
  { name: "Refunds", icon: RefreshCcw, count: 8 },
  { name: "Cancellations", icon: XCircle, count: 9 },
  { name: "Baggage Information", icon: Briefcase, count: 6 },
  { name: "Check-in & Boarding", icon: UserCheck, count: 5 },
  { name: "Travel Documents", icon: FileText, count: 4 },
  { name: "Special Assistance", icon: HeartHandshake, count: 3 },
];

export default function FaqSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const activeCategory = searchParams.get('category') || "All FAQs";

  const handleCategoryClick = (name: string) => {
    const params = new URLSearchParams(searchParams);
    if (name === "All FAQs") {
      params.delete('category');
    } else {
      params.set('category', name);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-4">
        <h3 className="font-bold text-slate-900 text-lg mb-4 px-2 pt-2">Categories</h3>
        <nav className="space-y-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-blue-50/80 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-blue-600" : "text-slate-400"
                    }`}
                  />
                  {cat.name}
                </div>
                <span className={`text-xs ${isActive ? "text-blue-600 font-bold" : "text-slate-400"}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-[#f8fafc] rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-bold text-slate-900 mb-2">Still need help?</h4>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-[200px]">
            Our support team is here 24/7 to assist you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#0A58CA] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            Contact Support
          </Link>
        </div>
        <Headphones className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-600/10 pointer-events-none" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
           <Headphones className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
