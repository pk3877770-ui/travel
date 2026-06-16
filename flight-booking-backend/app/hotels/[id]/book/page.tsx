"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";

export default function HotelBookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const hotelId = params.id as string;
  const roomId = searchParams.get("roomId");
  
  const [hotel, setHotel] = useState<any>(null);
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "2026-06-15",
    checkOut: "2026-06-20",
    adults: 2,
    children: 0,
  });

  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const fetchHotelAndRoom = async () => {
      try {
        const res = await fetch(`/api/hotels/${hotelId}`);
        const data = await res.json();
        if (data.success) {
          setHotel(data.data);
          const foundRoom = data.data.rooms?.find((r: any) => r.id === roomId);
          if (foundRoom) setRoom(foundRoom);
        }
      } catch (err) {
        console.error("Failed to fetch hotel details", err);
      } finally {
        setLoading(false);
      }
    };
    if (hotelId && roomId) fetchHotelAndRoom();
  }, [hotelId, roomId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateNights = () => {
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("submitting");

    const payload = {
      hotel: hotel._id,
      hotelName: hotel.name,
      room: {
        id: room.id,
        name: room.name,
        price: room.price,
      },
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: {
        adults: Number(formData.adults),
        children: Number(formData.children),
      },
      guestDetails: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      totalAmount: room.price * calculateNights(),
      // Mocking user ID for now since we're bypassing auth
      user: "647b2c9e78216b2341234567" 
    };

    try {
      const res = await fetch("/api/hotels/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setBookingStatus("success");
        setTimeout(() => router.push("/profile/bookings"), 2000);
      } else {
        setBookingStatus("error");
      }
    } catch (err) {
      setBookingStatus("error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hotel || !room) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-bold mb-4">Room details could not be found.</h1>
        <Link href={`/hotels/${hotelId}`} className="text-primary font-bold hover:underline">
          Return to Hotel
        </Link>
      </div>
    );
  }

  const nights = calculateNights();
  const totalAmount = room.price * nights;

  return (
    <main className="min-h-screen bg-[#fafbfe] pt-24 pb-20 font-sans">
      <div className="container max-w-[1100px] mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-8">
          <Link href="/hotels" className="hover:text-primary transition-colors">Hotels</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/hotels/${hotelId}`} className="hover:text-primary transition-colors truncate max-w-[200px]">{hotel.name}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800">Secure Booking</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Form) */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">Secure Your Stay</h1>

            {bookingStatus === "success" ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
                <p className="text-green-700">Your reservation has been successfully placed. Redirecting to your bookings...</p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-8">
                {/* Guest Details */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Primary Guest Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-2">Full Name</label>
                      <input 
                        type="text" name="name" required value={formData.name} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-800"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-2">Email Address</label>
                        <input 
                          type="email" name="email" required value={formData.email} onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-800"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-2">Phone Number</label>
                        <input 
                          type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-800"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={bookingStatus === "submitting"}
                    className="bg-[#0A58CA] hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-md shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {bookingStatus === "submitting" ? "Processing..." : "Complete Booking"}
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
                {bookingStatus === "error" && (
                  <div className="text-red-500 text-right font-medium">An error occurred while placing the booking.</div>
                )}
              </form>
            )}
          </div>

          {/* Right Column (Summary) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-28">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Booking Summary</h3>
              
              <div className="mb-6">
                <div className="font-bold text-slate-800 mb-1">{hotel.name}</div>
                <div className="text-sm text-slate-500">{hotel.location.city}, {hotel.location.country}</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                <div className="font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2">{room.name}</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 text-sm">Check-in</span>
                  <span className="text-slate-800 font-bold text-sm">{formData.checkIn}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 text-sm">Check-out</span>
                  <span className="text-slate-800 font-bold text-sm">{formData.checkOut}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Guests</span>
                  <span className="text-slate-800 font-bold text-sm">{formData.adults} Adults, {formData.children} Children</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="text-slate-500">{nights} {nights === 1 ? 'night' : 'nights'} @ ₹{room.price.toLocaleString()}</span>
                  <span className="text-slate-800 font-medium">₹{(room.price * nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-slate-500">Taxes & Fees</span>
                  <span className="text-green-600 font-medium">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800">Total Price</span>
                  <span className="text-2xl font-black text-[#0A58CA]">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
