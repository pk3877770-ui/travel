"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Briefcase, Users, Plane, UserPlus, Tag, BarChart3, Settings, LogOut
} from "lucide-react";

import { logoutAction } from "@/app/admin/login/actions";

export default function AdminSidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Bookings", icon: Briefcase, href: "/admin/bookings" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Flights", icon: Plane, href: "/admin/flights" },
    { name: "Leads", icon: UserPlus, href: "/admin/leads" },
    { name: "Offers", icon: Tag, href: "/admin/offers" },
    { name: "Reports", icon: BarChart3, href: "/admin/reports" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="w-64 bg-[#001233] text-white flex flex-col fixed h-full z-20">
      <div className="p-8 pt-10 mb-2">
        <span className="text-xl font-bold tracking-tight text-white">Kramana Admin</span>
      </div>
      
      <div className="flex-1 px-4 space-y-2 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors font-medium",
                active 
                  ? "bg-[#1a2b4c] text-white" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 px-4 pb-8">
        <form action={logoutAction}>
          <button type="submit" className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
