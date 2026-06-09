"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Lock, RefreshCcw, XCircle, Cookie, ChevronRight, Headphones } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const navigation = [
  { name: "Terms & Conditions", href: "/terms", icon: FileText },
  { name: "Privacy Policy", href: "/privacy", icon: Lock },
  { name: "Refund Policy", href: "/refund", icon: RefreshCcw },
  { name: "Cancellation Policy", href: "/cancellation", icon: XCircle },
  { name: "Cookie Policy", href: "/cookie", icon: Cookie },
];

export default function LegalSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
      {/* Navigation Menu */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-4">
        <h3 className="font-bold text-slate-900 text-lg mb-4 px-2 pt-2">Legal Pages</h3>
        <div className="h-px bg-slate-100 mb-4 w-full"></div>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={twMerge(
                  clsx(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group text-sm font-medium",
                    isActive
                      ? "bg-blue-50/80 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={clsx(
                      "w-5 h-5",
                      isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                  {item.name}
                </div>
                <ChevronRight
                  className={clsx(
                    "w-4 h-4 transition-transform duration-200",
                    isActive ? "text-blue-600" : "text-slate-300 group-hover:text-slate-400"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Need Help Card */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100/50 rounded-full flex items-center justify-center shrink-0">
            <Headphones className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Need Help?</h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              If you have any questions regarding our policies, feel free to contact us.
            </p>
            <Link
              href="/contact"
              className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              Contact Support <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
