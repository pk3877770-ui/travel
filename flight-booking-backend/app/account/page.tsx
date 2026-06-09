"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  Heart, 
  User, 
  Users, 
  CreditCard, 
  Star, 
  Bell, 
  Settings, 
  LogOut,
  Plane,
  Building2,
  HelpCircle,
  MessageCircle,
  PhoneCall,
  ChevronRight,
  ArrowRight
} from "lucide-react";

export default function AccountDashboard() {
  return (
    <main className="min-h-screen bg-[#fafbfe] font-sans pt-28 pb-20">
      <div className="container max-w-[1400px] mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* =========================================
              LEFT SIDEBAR: NAVIGATION
          ========================================= */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
            
            {/* User Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-slate-200">
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" 
                  alt="Priya Sharma" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-sm">Priya Sharma</h2>
                <p className="text-xs text-slate-500 mb-1">priya.sharma@email.com</p>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Level 2</span>
                  <span className="text-xs font-bold text-slate-600">1,250 pts</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 py-4 flex-1">
              <nav className="flex flex-col space-y-1 px-4">
                <Link href="/account" className="flex items-center gap-3 bg-blue-50 text-blue-600 font-bold px-4 py-3 rounded-xl transition-colors">
                  <Home className="w-5 h-5" /> Dashboard
                </Link>
                
                <div className="group">
                  <Link href="/profile/bookings" className="flex items-center justify-between text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> My Bookings
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                  </Link>
                  <div className="flex flex-col pl-12 pr-4 py-1 space-y-2">
                    <Link href="/profile/bookings?type=flights" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-slate-300 before:rounded-full">
                      Flights
                    </Link>
                    <Link href="/profile/bookings?type=hotels" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-slate-300 before:rounded-full">
                      Hotels
                    </Link>
                  </div>
                </div>

                <Link href="/profile/saved" className="flex items-center gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors group">
                  <Heart className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Saved Items
                </Link>
                <Link href="/profile" className="flex items-center gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors group">
                  <User className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> My Profile
                </Link>
                <Link href="/profile/travelers" className="flex items-center gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors group">
                  <Users className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Saved Travelers
                </Link>
                <Link href="/profile/payments" className="flex items-center gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors group">
                  <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Payment Methods
                </Link>
                <Link href="/profile/rewards" className="flex items-center gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors group">
                  <Star className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Kramana Rewards
                </Link>
                <Link href="/profile/notifications" className="flex items-center gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Notifications
                </Link>
                <Link href="/profile/settings" className="flex items-center gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium px-4 py-3 rounded-xl transition-colors group">
                  <Settings className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> Settings
                </Link>
              </nav>

              <div className="mt-8 px-4 pt-4 border-t border-slate-100">
                <Link href="/" className="flex items-center gap-3 text-red-500 hover:bg-red-50 font-bold px-4 py-3 rounded-xl transition-colors">
                  <LogOut className="w-5 h-5" /> Log Out
                </Link>
              </div>
            </div>

          </div>

          {/* =========================================
              CENTER: MAIN CONTENT
          ========================================= */}
          <div className="flex-1 flex flex-col gap-8 min-w-0">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-black text-slate-800 mb-1 flex items-center gap-2">
                Welcome back, Priya! <span className="text-2xl">👋</span>
              </h1>
              <p className="text-sm text-slate-500">Manage your bookings, profile and preferences all in one place.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-800 mb-1">12</div>
                <p className="text-xs font-bold text-slate-600 mb-4">Total Bookings</p>
                <Link href="/profile/bookings" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View all bookings <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                  <Plane className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-800 mb-1">8</div>
                <p className="text-xs font-bold text-slate-600 mb-4">Flight Bookings</p>
                <Link href="/profile/bookings?type=flights" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-800 mb-1">4</div>
                <p className="text-xs font-bold text-slate-600 mb-4">Hotel Bookings</p>
                <Link href="/profile/bookings?type=hotels" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                  <Star className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-800 mb-1">1,250</div>
                <p className="text-xs font-bold text-slate-600 mb-4">Reward Points</p>
                <Link href="/profile/rewards" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View rewards <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>

            {/* Upcoming Trips */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Upcoming Trips</h3>
                <Link href="/profile/bookings" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View all bookings <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-4">
                
                {/* Flight Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex overflow-hidden">
                  <div className="w-12 bg-blue-600 flex items-center justify-center shrink-0">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">New Delhi (DEL) <span className="text-slate-400 mx-1">→</span> Mumbai (BOM)</h4>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Wed, 29 May 2025 • 1 Adult • Economy</p>
                      </div>
                      <span className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">Confirmed</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="w-10 h-10 rounded-lg bg-[#001B94] flex items-center justify-center text-white text-[10px] font-black tracking-tight shrink-0">
                          IndiGo
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">IndiGo</p>
                          <p className="text-xs text-slate-500">6E 527</p>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-row items-center justify-center w-full min-w-[200px] px-4 md:px-8">
                        <div className="text-center">
                          <p className="font-black text-slate-800 text-lg">10:30</p>
                          <p className="text-xs font-bold text-slate-500">DEL</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center px-4 relative">
                          <span className="text-[10px] font-bold text-slate-400 mb-1">2h 15m</span>
                          <div className="w-full h-[2px] border-b-2 border-dashed border-slate-200 relative flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-slate-300 absolute left-0"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-300 absolute right-0"></div>
                            <Plane className="w-4 h-4 text-slate-300 absolute" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 mt-1">Non-stop</span>
                        </div>
                        <div className="text-center">
                          <p className="font-black text-slate-800 text-lg">12:45</p>
                          <p className="text-xs font-bold text-slate-500">BOM</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center w-full md:w-auto mt-4 md:mt-0 gap-3">
                        <div className="text-xs text-center">
                          <span className="text-slate-500">PNR: </span>
                          <span className="font-bold text-slate-800">ABCD12</span>
                        </div>
                        <button className="w-full md:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-4 py-2 rounded-lg text-xs transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotel Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex overflow-hidden">
                  <div className="w-12 bg-purple-500 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">The Leela Palace, New Delhi</h4>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Fri, 14 Jun 2025 - Sun, 16 Jun 2025 • 2 Nights • 1 Room</p>
                      </div>
                      <span className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">Confirmed</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="relative w-32 h-20 rounded-xl overflow-hidden shrink-0">
                          <Image 
                            src="https://images.unsplash.com/photo-1542314831-c6a4d14b4b5b?w=400&q=80" 
                            alt="Hotel" 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex gap-10">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Check-in</p>
                            <p className="font-bold text-slate-800 text-sm">14 Jun 2025</p>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">02:00 PM</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Check-out</p>
                            <p className="font-bold text-slate-800 text-sm">16 Jun 2025</p>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">11:00 AM</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center w-full md:w-auto mt-4 md:mt-0 gap-3 ml-auto">
                        <div className="text-xs text-center">
                          <span className="text-slate-500">Booking ID</span>
                          <p className="font-bold text-slate-800">HTL87236</p>
                        </div>
                        <button className="w-full md:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-4 py-2 rounded-lg text-xs transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Access */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Access</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                
                {[
                  { icon: User, label: "Edit Profile", href: "/profile/settings" },
                  { icon: Users, label: "Saved Travelers", href: "/profile/travelers" },
                  { icon: CreditCard, label: "Payment Methods", href: "/profile/payments" },
                  { icon: Briefcase, label: "My Bookings", href: "/profile/bookings" },
                  { icon: Bell, label: "Notifications", href: "/profile/notifications" },
                  { icon: HelpCircle, label: "Help Center", href: "/help" },
                ].map((item, idx) => (
                  <Link key={idx} href={item.href} className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col items-center text-center hover:border-blue-200 hover:shadow-sm transition-all group">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
                      <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">{item.label}</span>
                  </Link>
                ))}

              </div>
            </div>

          </div>

          {/* =========================================
              RIGHT SIDEBAR: WIDGETS
          ========================================= */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            
            {/* Rewards Card */}
            <div className="bg-blue-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-600/20">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div>
                  <h3 className="font-bold text-white/90 text-sm mb-1">Kramana Rewards</h3>
                  <p className="text-xs text-white/70">Available Points</p>
                  <div className="text-3xl font-black mt-1">1,250 <span className="text-sm font-medium opacity-80">pts</span></div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#FFD700] text-blue-800 flex items-center justify-center shadow-lg shadow-[#FFD700]/30 shrink-0">
                  <Star className="w-6 h-6 fill-current" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between text-[10px] font-bold text-white/80 mb-2">
                  <span>200 pts to reach Level 3</span>
                </div>
                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-white rounded-full w-[85%]"></div>
                </div>

                <Link href="/profile/rewards" className="w-full bg-white text-blue-700 hover:bg-slate-50 font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                  View Rewards <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 text-base mb-5">Account Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Name</span>
                  <span className="font-bold text-slate-800">Priya Sharma</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Email</span>
                  <span className="font-bold text-slate-800 text-right max-w-[150px] truncate">priya.sharma@email.com</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phone</span>
                  <span className="font-bold text-slate-800">+91 98765 43210</span>
                </div>
              </div>

              <Link href="/profile/settings" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                Manage Profile <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Need Help? */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 text-base mb-1">Need Help?</h3>
              <p className="text-xs text-slate-500 mb-6">We're here to help you 24/7</p>
              
              <div className="flex flex-col gap-5">
                <Link href="/help" className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-blue-600 group-hover:text-blue-800 transition-colors">Visit Help Center</span>
                </Link>
                
                <Link href="/contact?mode=chat" className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-blue-600 group-hover:text-blue-800 transition-colors">Live Chat</span>
                </Link>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-blue-100 text-blue-600 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Call Us</span>
                    <a href="tel:+911234567890" className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors">+91 1234 567 890</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="rounded-2xl overflow-hidden relative h-40 shadow-sm group">
              <Image 
                src="https://images.unsplash.com/photo-1506905925224-dd94bfaf337c?w=600&q=80" 
                alt="Promo" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
                <h4 className="text-white font-bold text-sm mb-3">Explore the world with exclusive deals</h4>
                <Link href="/offers" className="inline-block self-start bg-white text-slate-800 hover:bg-slate-50 font-bold px-4 py-1.5 rounded text-xs transition-colors shadow-sm">
                  View Offers
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
